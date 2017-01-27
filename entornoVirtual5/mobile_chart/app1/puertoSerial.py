import serial
class PuertoSerial(object):

	def __init__(self, puerto):
		self.puertoSerial = serial.Serial(puerto)

	def prenderLuzSala(self):
		self.puertoSerial.write('a')

	def apagarLuzSala(self):
		self.puertoSerial.write('b')

	def prenderLuzComedor(self):
		self.puertoSerial.write('c')

	def apagarLuzComedor(self):
		self.puertoSerial.write('d')

	def prenderLuzCocina(self):
		self.puertoSerial.write('e')

	def apagarLuzCocina(self):
		self.puertoSerial.write('f')

	def prenderLuzPatio(self):
		self.puertoSerial.write('g')

	def apagarLuzPatio(self):
		self.puertoSerial.write('h')

	def leerSensor(self):
		self.puertoSerial.write('i')
		valorSensor = self.puertoSerial.readline()
		return valorSensor

	def leerSwitch(self):
		self.puertoSerial.write('j')
		valorSwitch = self.puertoSerial.readline()
		return valorSwitch

	def cerrarPuerto(self):
		self.puertoSerial.close()