function info(){
	let content = `
    <h2>Information</h2>
    <p>[definitions and short lesson on waves, diffraction, why interference happens and what the simulation will be about]</p>
    `;

    toArea(content);
}

function single(){
	let content = `
    <h2>Single Slit Simulation</h2>
	<form name = "form">
        <table>
            <tr>
                <th>Slit Width (a)</th>
                <th>Wavelength (λ)</th>
                <th>Distance to Screen (L)</th>
            </tr>
            <tr>
                <td>
                    <input type="range" onchange="drawSS(); updateTextA(this.value);" name="gap" min="2" max = "24"><br>
                    <pre>1μm               12μm</pre>
                </td>
                <td>
                    <input type="range" onchange="drawSS(); updateTextLamb(this.value);" name="lambda" min="380" max = "760"><br>
                    <img src="images/wavelength.png" alt="[Colour Spectrum Image]"></td>
                <td>
                    <input type="range" onchange="drawSS(); updateTextScreen(this.value);" name="L" min="50" max = "75"><br>
                    <pre>1.5m               2m</pre>
                </td>
            </tr>
            <tr>
                <td><input type="text" id="a" readonly value="a = 6.5μm"></td>
                <td><input type="text" id="lamb" readonly value="λ = 570nm" ></td>
                <td><input type="text" id="screen" readonly value="L = 1.75m"></td>
            </tr>
        </table><br>
        <input type="button" onclick="simulateSS()" value="START">
    </form>

	<canvas id="diffraction">Browser Doesn't Support Canvas</canvas>`;

	toArea(content);
}

function toArea(content){
    document.getElementById('area').innerHTML = content;
}