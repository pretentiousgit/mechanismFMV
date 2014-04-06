var express = require('express'),
    sio = require('socket.io'),
    path = require('path'),
    wrench = require('wrench'),
    exec = require('child_process').exec,
    util = require('util'),    
    fs = require('fs'),
    eavesdropper = 0,
    Files = {}, 
    _hopper,
    _game,
    json, app = express.createServer();

require('sugar')
require('ejs')

//express setup
app.configure(function () {
    app.set('views', __dirname);
    app.set('view engine', 'ejs');    
    app.use(express.bodyParser());
    app.use(express.logger('\033[90m:date :method :url :response-time\\ms\033[0m \033[31m:referrer \033[0m'));
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    app.use(express.static(__dirname + '/public'));
});


// load and pass JSON to front end to load the videos properly
// var gamedata = require(__dirname + '/public/tmp/gamedata.json');
// app.locals.gamefile = JSON.stringify(gamedata);


app.get('/', function (req, res, next) {
    // res.locals.gamedata = req.gamedata
    res.render('_start');
});

app.get('/control', function (req, res, next) {
    res.render('control');
});

app.get('/setup', function (req, res, next) {
    res.render('setup');
});

app.get('/client', function (req, res, next) {
    res.render('client');
});

//socket stuff
var io = sio.listen(app),
    control = false,
    listener; 

//start server
app.listen(3003, function () {
    var addr = app.address();
    console.log('   app is listening on\033[31m http://' + addr.address + ':' + addr.port +'\033[0m');
});

function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200);
            res.end(data);
        });
}

io.sockets.on('connection', function (socket) { 
    //send various events to connected sockets
				
        socket.on('control event', function (e) {
            socket.broadcast.emit('control event', e);
            console.log('control event ' + e);
            _hopper = e;
            return false;
        });

        socket.on('setup event', function (e) {
            socket.broadcast.emit('setup event', e);
            console.log(e);

            var nameOfFile = e[0]; // this needs to be stringified and parsed to get appropriate file id
            fs.writeFile('tmp/' + nameOfFile + ".json", JSON.stringify(e), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(nameOfFile + " Divlist was saved!");
                }
            });
        });

		socket.on('listener', function (listener, e) {
			eavesdropper++;
			console.log('eavesdropper '+ eavesdropper+' connected, _hopper is '+ _hopper);			
		});

        socket.on('load', function(e){
            console.log('load' + e);
            socket.broadcast.emit('load', e);
            _game = e;
            return false;
        });

        socket.on('role', function (role, func) {
            console.log('socket assuming role ' + role); 
            if (control){
             	func(true);
            }
			else {
                control = socket.control = true;
                socket.broadcast.emit('announcement', 'control connected');
                func(false);
            }
            
        });

        //if the control disconnects then tell the clients.
        socket.on('disconnect', function () {
            if (!socket.control) { 
                socket.broadcast.emit('announcement', 'eavesdropper has disconnected');                
                return};
            control = false;
            socket.broadcast.emit('disconnect', 'control disconnected');
        });
});