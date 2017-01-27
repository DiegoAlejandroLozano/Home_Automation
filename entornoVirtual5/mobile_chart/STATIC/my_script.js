$(document).ready(function(){

	var ejeX = 2;
	var ejeY = 0;
	var estadoGrafico = true;
	var valorInicial;

	var canvas = document.getElementById("myChart");

	var datos = {
		datasets: [
			{
				label: 'Gráfico x-y',
			    fill : true,
			    borderWidth : 3,
			    borderColor  : "#7C75D8",
			    backgroundColor : "rgba(223,150,150,0.5)",
			    pointBorderWidth : 1,
			    pointRadius : 4,
			    pointBackgroundColor : "#93DDCC",
			    pointHoverRadius : 6,
			    pointHoverBorderColor : "#86A7A1",
			    data: [
			    	{
			    		x: 0,
			        	y: 0
			    	}
			    ]
			}
		]
	}

	var opciones = {
		responsive : true,
		scales: {
			xAxes: [
				{
					type: 'linear',
		            position: 'bottom',
		            scaleLabel : {
		            	display : true,
		                fontSize : 16,
		                labelString : "t (segundos)"
		            },
		            gridLines : {
		            	color : "#9A9393"	
		            },
		            ticks: {
		            	stepSize: 1,
		                autoSkip : true,
		                autoSkipPadding : 10,
		                maxRotation : 90
		            }
				}
			],

			yAxes:[
				{
					stacked: true,
		            type: 'linear',
		            position: 'left',
		            scaleLabel : {
		            	display : true,
		                fontSize : 16,
		                labelString : "Y(t)"
		            },
		            gridLines : {
		            	color : "#9A9393"
		            },
		            ticks: {
		            	max: 6,
		                min: 0,
		                stepSize: 1
		            }
				}
			]
		},
		tooltips : {
			callbacks : {
				label : function(tooltipItem, data){
					var x_label = tooltipItem.xLabel;
		        	var y_label = tooltipItem.yLabel;
		        	var cadena = "X: " + x_label + " Y: " + y_label;
		        	return cadena;
				},
				title : function(tooltipItem, data){
					return "";
				}
			}
		},
		animation : {
			easing : 'linear',
		    duration : 50
		},
		legend : {
			labels : {
				usePointStyle : true,
		        boxWidth : 2
			}
		}	        
	}


	var scatterChart = new Chart(canvas, {
		type: 'line',
		data: datos,
		options: opciones
	});	
	
	function peticionAjax(estado, ubicacionLuz){
		$.ajax({
			url : '/peticionLuces/',
			type : "POST",
			data : {
				'ubicacionLuz' : ubicacionLuz,
				'estado' : estado
			},
			dataType : 'json',
			error : function(xhr,status,error){
				alert("Error con la petición")
			}
		})
	}

	$( "#flip-1" ).on( 'slidestop', function( event ) { 
		var texto = "Luz sala: " + $(this).val();
		$("#etiqueta1").text(texto);

		peticionAjax($(this).val(), "Luz sala");
	});

	$( "#flip-2" ).on( 'slidestop', function( event ) { 
		var texto = "Luz comedor: " + $(this).val();
		$("#etiqueta2").text(texto);

		peticionAjax($(this).val(), "Luz comedor");
	});

	$( "#flip-3" ).on( 'slidestop', function( event ) { 
		var texto = "Luz cocina: " + $(this).val();
		$("#etiqueta3").text(texto); 

		peticionAjax($(this).val(), "Luz cocina");
	});

	$( "#flip-4" ).on( 'slidestop', function( event ) { 
		var texto = "Luz patio: " + $(this).val();
		$("#etiqueta4").text(texto) ;

		peticionAjax($(this).val(), "Luz patio");
	});

	$( "#flip-5" ).on( 'slidestop', function( event ){
		var texto = "Manual: " + $(this).val();
		$("#etiqueta5").text(texto) ;
	});

	function agregarDatosgrafico(valorx, valory){
		var valX = parseInt(valorx);
		var valY = parseFloat(valory);


		if(estadoGrafico){
			valorInicial = valorx;
			estadoGrafico = false;
		}

		if(valX > (valorInicial+20)){
			scatterChart.data.datasets[0].data.push({x:valX, y:valY});
			scatterChart.data.datasets[0].data.shift();
			scatterChart.update();
		}else{
			scatterChart.data.datasets[0].data.push({x:valX, y:valY});
			scatterChart.update();
		}
	}

	function estadoPulsador(estado){
		if($("#flip-5").val() == "on"){
			if(parseInt(estado) == 1){
				$("#etiqueta1").text("Luz sala: off");
				peticionAjax("off", "Luz sala");
				$("#flip-1").val("off").slider('refresh');
			}else if(parseInt(estado) == 0){
				$("#etiqueta1").text("Luz sala: on");
				peticionAjax("on", "Luz sala");
				$("#flip-1").val("on").slider('refresh');
			}
		}
	}

	function mostrarVoltaje(voltaje){
		$( "#textoVoltaje" ).val(voltaje + " V");
		$('#textoVoltaje').textinput('disable');
	}

	setInterval(function(){
		$.ajax({
			url : '/peticionAjax/',
			type : 'POST',
			dataType : 'json',
			success : function(datos){
				agregarDatosgrafico(datos.datoX, datos.datoY);				
				estadoPulsador(datos.datoSwitch);
				mostrarVoltaje(datos.datoY);			
			}
		});
	}, 300);

});