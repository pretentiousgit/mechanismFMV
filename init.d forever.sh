#!/bin/bash

### BEGIN INIT INFO
# Provides:             screenperfect
# Required-Start:       $local_fs
# X-UnitedLinux-Should-Start:
# Required-Stop:        $local_fs
# X-UnitedLinux-Should-Stop:
# Default-Start:        2 3 4 5
# Default-Stop:         0 1 6
# Short-Description:    screenperfect
# Description:          screenperfect
### END INIT INFO

case "$1" in
        start)
                su - pi -c "forever start --spinSleepTime 5000 --sourceDir=/hom$
                ;;
        stop)
                su - pi -c "forever stopall"
                forever stopall
                ;;
        restart)
                su - pi -c "forever restartall"
                forever restartall
                ;;
        status)
                su - pi -c "forever list"
                forever list
                ;;
esac

