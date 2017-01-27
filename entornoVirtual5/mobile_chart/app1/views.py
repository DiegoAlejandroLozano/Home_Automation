from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_protect
from puertoSerial import PuertoSerial
# Create your views here.
import random

#Variable globales
valorX = 0
puertoSerial = PuertoSerial("/dev/ttyUSB0")
# puertoSerial = PuertoSerial("COM14")

#FUNCIONES DE VISTA---------------------------------------------------
def prueba1(request):
	return render(request, "index.html")

@csrf_protect
def peticionLuces(request):	

	global puertoSerial

	ubicacion = request.POST.get('ubicacionLuz') 
	estado = request.POST.get('estado')

	if str(ubicacion) == "Luz sala":
		if str(estado) == "on":
			# print "Luz sala: PRENDIDA"
			puertoSerial.prenderLuzSala()
		elif str(estado) == "off":
			# print "Luz sala: APAGAR"
			puertoSerial.apagarLuzSala()
	elif str(ubicacion) == "Luz comedor":
		if str(estado) == "on":
			# print "Luz comedor: PRENDIDA"
			puertoSerial.prenderLuzComedor()
		elif str(estado) == "off":
			# print "Luz comedor: APAGADO"
			puertoSerial.apagarLuzComedor()
	elif str(ubicacion) == "Luz cocina":
		if str(estado) == "on":
			# print "Luz cocina: PRENDIDA"
			puertoSerial.prenderLuzCocina()
		elif str(estado) == "off":
			# print "Luz cocina: APAGADA"
			puertoSerial.apagarLuzCocina()
	elif str(ubicacion) == "Luz patio":
		if str(estado) == "on":
			# print "Luz patio: PRENDIDA"
			puertoSerial.prenderLuzPatio()
		elif str(estado) == "off":
			# print "Luz patio: APAGADA"
			puertoSerial.apagarLuzPatio()

	data = {
		'resultado' : "Operacion exitosa..."
	}
	return JsonResponse(data)

@csrf_protect
def peticionAjax(request):

	global valorX
	global puertoSerial

	#Datos para el grafico
	valorX += 1
	valorY = puertoSerial.leerSensor()

	#Estado del switch
	estadoSwitch = puertoSerial.leerSwitch()

	#Datos devueltos a la consulta ajax
	data = {
		'datoX' : valorX,				#numero
		'datoY' : valorY,				#string
		'datoSwitch' : estadoSwitch		#string
	}

	return JsonResponse(data)