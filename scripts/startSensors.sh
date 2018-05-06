#!/bin/bash
PATH="/usr/local/bin:$PATH"

echo ">> starting sensors app..."

sudo modprobe wire
sudo modprobe w1-gpio
sudo modprobe w1-therm
cd /home/pi/github/sensors
sudo forever stop sensors.js
sudo forever start -l /home/pi/logs/output.log -p /home/pi/github/sensors -a -d sensors.js http://horske.info/

echo ">> running"

