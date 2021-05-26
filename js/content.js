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

    <div class="row">
        <div class="column left">
            <form name = "form">
                <table>
                    <tr>
                        <th>Slit Width (a)</th>
                    </tr>
                    <td>
                        <input type="range" onchange="drawSS(); updateTextA(this.value);" name="gap" min="2" max = "32"><br>
                        <pre>1μm               16μm</pre>
                        <input type="text" id="a" readonly value="a = 8μm">
                    </td>
                </table>

                <table>
                    <tr>
                        <th>Wavelength (λ)</th>
                    </tr>
                    <td>
                        <input type="range" onchange="drawSS(); updateTextLamb(this.value);" name="lambda" min="380" max = "760"><br>
                        <img src="images/wavelength.png" alt="[Colour Spectrum Image]"><br>
                        <input type="text" id="lamb" readonly value="λ = 570nm" >
                    </td>
                </table>

                <table>
                    <tr>
                        <th>Distance to Screen (L)</th>
                    </tr>
                    <td>
                        <input type="range" onchange="drawSS(); updateTextScreen(this.value);" name="L" min="0" max = "100"><br>
                        <pre>0.5m               2.5m</pre>
                        <input type="text" id="screen" readonly value="L = 1.5m">
                    </td>
                </table><br>

                <input type="button" onclick="simulateSS()" value="START">
            </form>
        </div>

        <div class="column middle">
            <br> <br>
            <canvas id="diffraction">Browser Doesn't Support Canvas</canvas>
        </div>

        <div class="column right">
            <h2>How to use simulation</h2>
            <p>
                1. Use the range selectors to choose desired parameters for slit width (a), wavelength of light (λ) and distance to screen (L). <br>
                2. Hit "START" button. <br> <br>

                <i>*if the parameters are changed while the simulation is running, the changes will be reflected live onto the simulation pane.</i>
            
            </p>

            <hr>

            <h2>FAQs</h2>
            
            <p>
            <b>Why are there two wave fronts coming off of the single slit?</b><br>
            The two wave fronts are representant of every single wave front each particle that hits the slit produces. The two wave fronts also show how they interfere with 
            each other further as they propagate towards the screen. <br><br>
        
            <b>Why can you select wavelengths outside of the visible spectrum?</b><br>
            As we know the spectrum of light visible to us is between 400nm and 700nm, which corresponds to the range of colours from violet to red. Although we cannot see
            past the visible spectrum, light will still diffract, so I thought it was interesting to see how a very wide range of light interacts with the single slit and 
            what that may look like on the screen and intensity graphs. <br><br>
        
            <b>Q3</b> <br>
            <br><br>
        
            <b>Q4</b> <br>
            <br><br>
            </p>
        </div>
    </div> 

	

	

    

    `;
	toArea(content);
}

function toArea(content){
    document.getElementById('area').innerHTML = content;
}