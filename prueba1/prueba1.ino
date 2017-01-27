byte pin1 = 3;
byte pin2 = 4;
byte pin3 = 5;
byte pin4 = 6;
byte pin5 = 2;

void setup(){
  Serial.begin(9600);
  pinMode(pin1, OUTPUT);
  pinMode(pin2, OUTPUT);
  pinMode(pin3, OUTPUT);
  pinMode(pin4, OUTPUT);
  pinMode(pin5, INPUT_PULLUP);
}

void loop(){
  if(Serial.available()){
    char letra = Serial.read();
  
    if(letra == 'a'){
      //Serial.println("Luz sala: PRENDIDA");
      digitalWrite(pin1, HIGH); 
    }else if(letra == 'b'){
      //Serial.println("Luz sala: APAGADA");
      digitalWrite(pin1, LOW); 
    }else if(letra == 'c'){
      //Serial.println("Luz comedor: PRENDIDA");
      digitalWrite(pin2, HIGH); 
    } else if(letra == 'd'){
      //Serial.println("Luz comedor: APAGADA");
      digitalWrite(pin2, LOW); 
    }else if(letra == 'e'){
      //Serial.println("Luz cocina: PRENDIDA");
      digitalWrite(pin3, HIGH); 
    }else if(letra == 'f'){
      //Serial.println("Luz cocina: APAGADA");
      digitalWrite(pin3, LOW); 
    } else if(letra == 'g'){
      //Serial.println("Luz patio: PRENDIDA");
      digitalWrite(pin4, HIGH); 
    } else if(letra == 'h'){
      //Serial.println("Luz patio: APAGADA");
      digitalWrite(pin4, LOW); 
    } else if(letra == 'i'){
      int value = analogRead(0);
      double voltaje = (5.0/1023.0)*value;
      Serial.println(voltaje); 
    } else if(letra == 'j'){
      Serial.println(digitalRead(pin5));
    }   
  } 
}
