let startSS = 0;
let startDS = 0;

function simulateSS() {
	startSS = 1;
	drawSS();
}

// clear canvas, draw static graph background and draw waves
function drawSS() {
	if (startSS == 1) {
		clearCanvas();
		drawStaticElementsSS();
		drawWaveAndIntensitySS();
	}
}

// clear canvas, set black and white backgrounds
function clearCanvas() {
	let canvas = document.getElementById("diffraction");
	canvas.width = 600;
	canvas.height = 300;
	let ctx = canvas.getContext("2d");
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, 440, 600);
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(440, 0, 600, 600);
}

// draw static graph elements 
function drawStaticElementsSS() {
	let canvas = document.getElementById("diffraction");
	let ctx = canvas.getContext("2d");

	let gap = Number(parseFloat(document.form.gap.value));
	let screen = Number(parseFloat(document.form.L.value));

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(250 - screen * 2, 0, 4, 600);
	ctx.fillRect(380, 0, 3, 600);

	ctx.fillStyle = "#000000";
	ctx.fillRect(250 - screen * 2, 150 - gap, 4, gap * 2);

	ctx.fillRect(450, 150, 140, 2);
	ctx.strokeStyle = "#000000";

	ctx.beginPath();
	ctx.moveTo(590, 151);
	ctx.lineTo(580, 141);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(590, 151);
	ctx.lineTo(580, 161);
	ctx.stroke();

	ctx.fillRect(448, 0, 2, 300);
	ctx.fillRect(445, 10, 10, 1);
	ctx.fillRect(445, 290, 10, 1);

	ctx.font = "16px Arial";
	ctx.fillText("Intensity (α)", 500, 20);

	ctx.font = "10px Arial";
	ctx.fillText("-18cm", 460, 13);
	ctx.fillText("18cm", 460, 294);
	ctx.fillText("0", 440, 150);
}

// draw wave intensity for single slit
function drawWaveAndIntensitySS() {
	let canvas = document.getElementById("diffraction");
	let ctx = canvas.getContext("2d");

	let alpha, I, sin, b, c;
	let lambda = Number(parseFloat(document.form.lambda.value));
	let colours = wavelengthToColor(lambda);
	let screen = Number(parseFloat(document.form.L.value));

	let gap = Number(parseFloat(document.form.gap.value));

	ctx.fillStyle = colours[0];
	ctx.strokeStyle = colours[0];

	ctx.beginPath();
	ctx.moveTo(570, 150);
	c = 1.5 + (screen * 2 - 100) * 0.5 / 50.;

	for (i = 150; i >= 0; i--) {
		b = 0.18 * (1 - (i - 10) / 140.);
		sin = b / Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2));
		alpha = sin * Math.PI * gap * 500. / lambda;
		I = Math.pow(Math.sin(alpha) / alpha, 2);
		ctx.lineTo(sinToCoords(I), i);
		I = Math.pow(I, 1 / 2);
		ctx.fillStyle = rgbToHex(Math.round(colours[1] * I), Math.round(colours[2] * I), Math.round(colours[3] * I));
		ctx.fillRect(383, i, 57, 1);

	}

	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(570, 150);

	for (i = 149; i <= 300; i++) {
		b = 0.18 * (1 - (i - 10) / 140.);
		sin = b / Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2));
		alpha = sin * Math.PI * gap * 500. / lambda;
		I = Math.pow(Math.sin(alpha) / alpha, 2);

		ctx.lineTo(sinToCoords(I), i);
		I = Math.pow(I, 1 / 2);
		ctx.fillStyle = rgbToHex(Math.round(colours[1] * I), Math.round(colours[2] * I), Math.round(colours[3] * I));
		ctx.fillRect(383, i, 57, 1);
	}

	ctx.stroke();
	lambda /= 100;
	ctx.fillStyle = colours[0];

	for (i = 4; i < 250 - screen * 2 - 1; i += 8 * lambda)
		ctx.fillRect(i, 100, 2, 100);

	for (i = 20; i < 280 - (75 - screen) * 2; i += 8 * lambda) {
		ctx.beginPath();
		ctx.arc(250 - screen * 2, 150 - gap, i, 1.75 * Math.PI, 0.25 * Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(250 - screen * 2, 150 + gap, i, 1.75 * Math.PI, 0.25 * Math.PI);
		ctx.stroke();
	}
}

// convert sin(x) inputs to coordinates on the grid
function sinToCoords(x) {
	return 450 + 120 * x;
}

// covert wavelength in nm to rgb colour codes
function wavelengthToColor(wavelength) {
	let r, g, b, alpha, colourSpace;
	let wl = wavelength;

	if (wl >= 380 && wl < 440) {
		r = -1 * (wl - 440) / (440 - 380);
		g = 0;
		b = 1;
	} else if (wl >= 440 && wl < 490) {
		r = 0;
		g = (wl - 440) / (490 - 440);
		b = 1;
	} else if (wl >= 490 && wl < 510) {
		r = 0;
		g = 1;
		b = -1 * (wl - 510) / (510 - 490);
	} else if (wl >= 510 && wl < 580) {
		r = (wl - 510) / (580 - 510);
		g = 1;
		b = 0;
	} else if (wl >= 580 && wl < 645) {
		r = 1;
		g = -1 * (wl - 645) / (645 - 580);
		b = 0.0;
	} else if (wl >= 645 && wl <= 780) {
		r = 1;
		g = 0;
		b = 0;
	} else {
		r = 0;
		g = 0;
		b = 0;
	}

	// intensty is lower at the edges of the visible spectrum.
	if (wl > 780 || wl < 380)
		alpha = 0;
	else if (wl > 700)
		alpha = (780 - wl) / (780 - 700);
	else if (wl < 420)
		alpha = (wl - 380) / (420 - 380);
	else
		alpha = 1;


	colourSpace = ["rgba(" + (r * 100) + "%," + (g * 100) + "%," + (b * 100) + "%, " + 1 + ")", r * 255, g * 255, b * 255, alpha]

	// colourSpace is an array with 5 elements.
	// The first element is the complete code as a string.  
	// Use colourSpace[0] as is to display the desired color.  
	// use the last four elements alone or together to access each of the individual r, g, b and a channels.  

	return colourSpace;
}

// convert rgb to hex
function componentToHex(c) {
	let hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

// convert hex to rgb
function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// live update "A" value on page
function updateTextA(x) {
	document.getElementById("a").value = "a = " + x / 2 + "μm";
}

// live update "d" value on page
function updateTextD(x) {
	document.getElementById("d").value = "d = " + x + "mm";
}

// live update "wavelength" value on page
function updateTextLamb(x) {
	if (x <= 400)
		document.getElementById("lamb").value = "λ = " + x + "nm (ultraviolet)";
	else if (x >= 750)
		document.getElementById("lamb").value = "λ = " + x + "nm (infrared)";
	else
		document.getElementById("lamb").value = "λ = " + x + "nm (visible)";
}

// live update "L" value on page
function updateTextScreen(x) {
	let s = 1.5 + (x * 2 - 100) * 0.5 / 50.;
	document.getElementById("screen").value = "L = " + s + "m";
}