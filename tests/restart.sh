#!/bin/sh

echo "Killing the Server"
sudo kill $(ps -eopid,cmd | grep -m 1 "sudo node /opt/raspbooth/app.js" | cut -d " " -f2 | awk '{print $1}')

echo "Starting the server"
sudo node /opt/raspbooth/app.js &

echo "Restarting the Browser"
sudo kill $(ps -eopid,cmd | grep -m 1 "midori -e Fullscreen -a http://localhost:8080" | cut -d " " -f2 | awk '{print $1}')

