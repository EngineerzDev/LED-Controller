#include <FastLED.h>

#define NUM_LEDS 27
#define LED_PIN 8

CRGB leds[NUM_LEDS];

String onoff;
String red;
String green;
String blue;

void setup() {
  Serial.begin(9600);
  
  FastLED.addLeds<WS2812B, LED_PIN, GRB>(leds, NUM_LEDS);
  //FastLED.setBrightness(100);
}

void loop() {
  while(Serial.available() > 0 ){
    String str = Serial.readString();

    onoff = str.substring(0, 1);
    red = str.substring(1, 4);
    green = str.substring(4, 7);
    blue = str.substring(7, 10);

    Serial.println("on/off? " + onoff);
    Serial.println("Red: " + red);
    Serial.println("Green: " + green);
    Serial.println("Blue: " + blue);
  }
  
  if(onoff.toInt() == 1) {
    for (int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CRGB(red.toInt(), green.toInt(), blue.toInt());
    }  
  }
  else {
    FastLED.clear();
  }

  FastLED.show();
}
