#!/usr/bin/python

import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

GPIO.setup(18, GPIO.OUT)
print "Setting GPIO18 to HIGH"
GPIO.output(18, GPIO.HIGH)

print "Sleeping 2s"
time.sleep(2)

print "Setting GPIO18 to LOW"
GPIO.output(18, GPIO.LOW)

GPIO.cleanup()
