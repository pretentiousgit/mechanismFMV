# Mechanism

This is a display face for the screenPerfect (http://www.github.com/pretentiousgit/screenperfect-dev) multi-screen FMV engine. It serves serves paired client-control video via a NodeJS server installation to Chrome on desktop, and Android 4.1+ devices. This will also work on iOS, in which case you will need to supply it with *.webm video.

### Documentation

Mechanism is a repo at the end of time! It's built to display on a private server with content available to people connected to that server. It is based on work from Eyebeam NYC in 2013 - the idea that people behave differently in private is a pretty strong one, I like game arcades that don't require huge amounts of technology to be supplied by the gallery, etc.

### What It Does
This loads a list of videos from place A into memory on a client device, place B. It also loads a touch layer over those videos, making any of them qualify as a type of FMV experience. When the videos have loaded, the touch layer lets you select between them using a socket server.

### Improvements I'd Make Now

- Actually stream video from server
- a more clever video load system - at the moment, this tries to stream an unlimited amount of video on page load. It works best with small videos and/or GIF/Vinealikes.

### Contributing

This is a repo at the end of time! It's basically the supporting code for a thesis project, designed in concert with OCADu's game::play lab in 2014. This is the most finished version of it.

### Possible Directions

All anyone wants from this is to hook it to Vimeo. There's your next startup idea. Make a random awesome-video-selector for Vimeo.

### Where's The Content?

Protected by an academic research requirement, so you can't have it, but /tmp/gamedata.json probably has some things that will be useful to tell you how this works.