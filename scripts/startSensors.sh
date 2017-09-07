#!/bin/bash
PATH="/usr/local/bin:$PATH"
sudo modprobe wire
sudo modprobe w1-gpio
sudo modprobe w1-therm
cd /home/pi/github/sensors
sudo forever stopall
sudo forever start -l /home/pi/logs/output.log -a app.js http://horske.info/
#sudo forever start -l /home/pi/logs/output.log -a app.js

