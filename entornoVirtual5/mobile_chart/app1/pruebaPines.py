import RPi.GPIO as GPIO
import time

class Gpio(object):

	def __init__(self):
		GPIO.setmode(GPIO.BCM)
		
		self.__pines = [5, 6, 13, 26]
		GPIO.setup(self.__pines, GPIO.OUT)
		GPIO.output(self.__pines, False)

	def prenderPin(self, pin):
		GPIO.output(pin, True)
		print "pin %d: PRENDIDO" % (pin,)

	def apagarPin(self, pin):
		GPIO.output(pin, False)
		print "pin %d: APAGADO" % (pin,)

	def limpiarPines(self):
		GPIO.cleanup()




