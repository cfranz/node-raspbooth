#!/usr/bin/python
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
#GPIO.setup(22, GPIO.IN)
#GPIO.setup(22, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(17, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
#GPIO.setup(17, GPIO.OUT)
#GPIO.output(17, GPIO.HIGH)

while 1:
    if GPIO.input(17) == True:
        print "Button pressed: " + str(time.strftime("%H:%M:%S", time.gmtime()))
        print 'listening...'
        print ''
    time.sleep(0.1)
