var fs = require('fs')
, http = require('http'),server
, five = require('johnny-five'), board
, firmata = require('firmata')
, repl = require("repl")
, socketio = require('socket.io')
, io = require('socket.io');
var db = require("./DB.js");
var replbo;
var pins;
//https://github.com/scottkellie/Enviromontal
///
///
///
var server = http.createServer(function (req, res)
	{
		res.writeHead(200, { 'Content-type': 'text/html' });
		res.end(fs.readFileSync(__dirname + '/index.html'));
		
	}).listen(8888, function ()
	{
		//create johnny-five arduino connection
		board = new five.Board({port: "com6",repl: repl, pins: pins});
		//pins = board.pins
		//initialize and declare variables related to Arduino
		board.on("ready", function ()
			{
			
				console.log('Board connected');
				console.log('Ready event. Repl instance auto-initialized');
				console.log('detecting pins');
	
				// Create a new `photoresistor` hardware instance.
				//Initialise pins and ports
				// pin mode constants are available on the Pin class
				/* board.pinMode(13, five.Pin.OUTPUT);
				board.pinMode(10, five.Pin.OUTPUT);
				board.pinMode(11, five.Pin.OUTPUT);
				board.pinMode(12, five.Pin.OUTPUT);
				board.pinMode(14, five.Pin.OUTPUT);
				board.pinMode(14, five.Pin.OUTPUT); */
				// lcd1 = new five.LCD({ pins: [12, 11, 5, 4, 3, 2] }),
				// set pin mode to analog input.
				//this.pinMode("A5", five.Pin.INPUT);
  
	in5 = new five.Sensor({pin:"A5",freq:25,samples:20});
				
	in6 = new five.Sensor({pin:"A6",freq:25,samples:20});

	in7 = new five.Sensor({pin:"A7",freq:25,samples:20});
	
	in8 = new five.Sensor({pin:"A8",freq:25,samples:20});
	
	in9 = new five.Sensor({pin:"A9",freq:25,samples:20});

	in10 = new five.Sensor({pin:"A10",freq:25,samples:20});

	led5 = new five.Led(5);
	
	led6 = new five.Led(6);
				
	led7 = new five.Led(7);

	led8 = new five.Led(8);
	
	led9 = new five.Led(9);

	relay1 = new five.Led(10);
	  
	relay2 = new five.Led(11);
		
	relay3 = new five.Led(12);

	led13 = new five.Led(13);

	relay4 = new five.Led(14);
	
	console.log('initialised');
	console.log('Listening at: http://localhost:8888');
	
	socketio.listen(server).on('connection', function (socket)
		{               led5.on();
				setTimeout(initledon, 100);
				function initledon(){
						led7.on(),
						relay1.on(),
						relay2.on();
	}
			   setTimeout(initledoff, 1000);
			   function initledoff(){
						led5.off(),
						led6.off(),
						led7.off();
	}

        setInterval(in5readvalue,10000);
		function in5readvalue ()
		{
		var myStringArray = ['name:'];
		for (var i = 0; i < 2; i++) {
		in5value = in5.value.toString();
		socket.send('5#'+in5value);

        }
            }
		setInterval(inReadValue,10000);
		function inReadValue ()
		{
        
		//if (xx > 500 && xx < 600) {//stuff}
		if (inReadValue > 5000 && inReadValue < 51024)
			{
		for (var i = 0; i < 2; i++) {
		in5value = in5.value.toString();
		socket.send('5'+in5value);
				i++;
				};
			}
        if (inReadValue > 6000 && inReadValue < 61024)
			{
		//var myStringArray = ['name:'];
		for (var i = 0; i < 2; i++) {
		in6value = in6.value.toString();
		socket.send('6'+in6value);
		i++;
		}
			}
			if (inReadValue > 7000 && inReadValue < 71024)
			{

		//var myStringArray = ['name:'];
		for (var i = 0; i < 2; i++) {
		in7value = in7.value.toString();
		socket.send('7'+in7value);
		i++;
		}
			}
			if (inReadValue > 8000 && inReadValue < 81024)
			{

		//var myStringArray = ['name:'];
			for (var i = 0; i < 2; i++) {
			in8value = in8.value.toString();
			socket.send('8'+in8value);
			i++;
	}
	}
			if (inReadValue > 9000 && inReadValue < 91024)
		{
			for (var i = 0; i < 2; i++) 
		{
			in9value = in9.value.toString();
			socket.send('9'+in9value);
			i++;
	}
	}
			if (inReadValue > 10000 && inReadValue < 101024)
		{

			for (var i = 0; i < 2; i++) {
			in10value = in10.value.toString();
			socket.send('10'+in10value);
			i++;
	}
	};
    };
	
			socket.on('command', function (msg)
		{
					console.log(msg);
	});
			socket.on('message', function (msg)
		{
					var inmsg = msg.toString();
					setTimeout(function ()
		{
							console.log(inmsg);
	}, 600);
			if (inmsg >1000 && inmsg <11000)
        {
            inReadValue(inmsg)
    }		
			if(inmsg === "in5:val")
		{
				// "data" get the current reading from the photoresistor
				//in5.on("data", function() {
				console.log( in5.value );
				socket.send('value5:'+in5.value);
				//socket.broadcast.send('value', inmsg)
	}
	
			if (inmsg === "command:relay1:on") 
		{
				relay1.on();
				console.log('command:relay1 on');
				socket.send(inmsg);
	}
			if (inmsg === "command:relay2:on")
		{
				relay2.on();
				console.log('relay2 on');
				socket.send(inmsg);
	}
			if (inmsg === "command:relay3:on") 
		{
				relay3.on();
				console.log('relay3 on');
				socket.send(inmsg);
	}
			   if (inmsg === "command:relay4:on") 
		{
				relay4.on();
				console.log('relay4 on');
				socket.send(inmsg);
	}
			///turn relays off
			if (inmsg === "command:relay1:off") 
		{
				relay1.off();
				console.log('relay1 off');
			socket.send(inmsg);
	}
			if (inmsg === "command:relay2:off") 
		{
				relay2.off();
				console.log('relay2 off');
			socket.send(inmsg);
	}
			if (inmsg === "command:relay3:off") 
		{
				relay3.off();
				console.log('relay3 off');
			socket.send(inmsg);
	}
			if (inmsg === "command:relay4:off") 
		{
				relay4.off();
				console.log('relay4 off');
			socket.send(inmsg);
	}
			if(inmsg == "command:led5:off")
		{
						led5.off();
					socket.send(inmsg);
	}
					if(inmsg == "command:led5:on")
		{
						socket.send(inmsg);
						//led5.strobe(50);
						led5.on();
	}
							if(inmsg == "command:led6:off")
		{
						led6.off();
					socket.send(inmsg);
	}
					if(inmsg == "command:led6:on")
		{
						socket.send(inmsg);
						//led5.strobe(50);
						led6.on();
	}
							if(inmsg == "command:led7:off")
		{
						led7.off();
					socket.send(inmsg);
	}
					if(inmsg == "command:led7:on")
		{
						socket.send(inmsg);
						//led5.strobe(50);
						led7.on();
	}
});
});
});
});




  

//################Scratchpad#######################
/*
//Output commands for each different pin TYPE https://github.com/rwaldron/johnny-five/wiki/Board

// Assuming an Led is attached to pin 9, this will turn it on at full brightness
// PWM is the mode used to write ANALOG signals to a digital pin
this.pinMode(9, five.Pin.PWM);
this.analogWrite(9, 255);

// Assuming a sensor is attached to pin "A1"
this.pinMode(1, five.Pin.ANALOG);
this.analogRead(1, function(voltage) {
console.log(voltage);

// Assuming an Led is attached to pin 13, this will turn it on
this.pinMode(13, five.Pin.OUTPUT);
this.digitalWrite(13, 1);

// Assuming a button is attached to pin 9
this.pinMode(9, five.Pin.INPUT);
this.digitalRead(9, function(value) {
console.log(value);
});

// Assuming an Led is attached to pin 13
this.pinMode(13, five.Pin.OUTPUT);

// Turn it on...
this.digitalWrite(13, 1);

this.wait(1000, function() {
// Turn it off...
this.digitalWrite(13, 0);
});

var byte;

// Assuming an Led is attached to pin 13
this.pinMode(13, five.Pin.OUTPUT);

// Homemade strobe
this.loop(500, function() {
this.digitalWrite(13, (byte ^= 0x01));
});
*/