//https://www.geogebra.org/m/ZSbeWGbe

//Constant Values
const WAVELENGTH_MAX_VALUE = 700;
const WAVELENGTH_MIN_VALUE = 400;
const WAVELENGTH_DEFAULT_VALUE = 550;

const SLIT_WIDTH_MAX_VALUE = 10;
const SLIT_WIDTH_MIN_VALUE = 1;
const SLIT_WIDTH_DEFAULT_VALUE = 5;

const DISTANCE_MAX_VALUE = 10;
const DISTANCE_MIN_VALUE = 1;
const DISTANCE_DEFAULT_VALUE = 5;

const CANVAS_WIDTH = 850;
const CANVAS_HEIGHT = 500;
const CANVAS_FONT_SIZE = 16;
const CANVAS_FONT_TYPE = "Times New Roman";
const CANVAS_FONT = CANVAS_FONT_SIZE + "px " + CANVAS_FONT_TYPE;

const GRAPH_PADDING = 35;

const GRAPH_HEIGHT = CANVAS_HEIGHT - (2*GRAPH_PADDING);
const GRAPH_WIDTH =  CANVAS_WIDTH - (2*GRAPH_PADDING);
const GRAPH_TOP = GRAPH_PADDING;
const GRAPH_BOTTOM = CANVAS_HEIGHT - GRAPH_PADDING;  
const GRAPH_LEFT = GRAPH_PADDING;  
const GRAPH_RIGHT = CANVAS_WIDTH - GRAPH_PADDING;

const MAX_LIGHT_INTENSITY = 100;
const MIN_LIGHT_INTENSITY = 0;

//Setting default values for parameters
function onLoad(){
    document.getElementById("wavelengthNumber").max = WAVELENGTH_MAX_VALUE;
    document.getElementById("wavelengthNumber").min = WAVELENGTH_MIN_VALUE;
    document.getElementById("wavelengthNumber").defaultValue = WAVELENGTH_DEFAULT_VALUE;

    document.getElementById("slitWidthNumber").max = SLIT_WIDTH_MAX_VALUE;
    document.getElementById("slitWidthNumber").min = SLIT_WIDTH_MIN_VALUE;
    document.getElementById("slitWidthNumber").defaultValue = SLIT_WIDTH_DEFAULT_VALUE;

    document.getElementById("distanceNumber").max = DISTANCE_MAX_VALUE;
    document.getElementById("distanceNumber").min = DISTANCE_MIN_VALUE;
    document.getElementById("distanceNumber").defaultValue = DISTANCE_DEFAULT_VALUE;

    document.getElementById("intensityGraph").width = CANVAS_WIDTH;
    document.getElementById("intensityGraph").height = CANVAS_HEIGHT
}

function submit(){
    let w = document.getElementById("wavelengthNumber").value;
    let a = document.getElementById("slitWidthNumber").value;
    let L = document.getElementById("distanceNumber").value;

    if (isValidInput(w, a, L) != ""){
        document.getElementById("error").innerHTML = isValidInput(w, a, L);
    } else {
        document.getElementById("wavelength").innerHTML = "Wavelength: " + w + "nm";
        document.getElementById("slitwidth").innerHTML = "Slit Width: " + a + "μm";
        document.getElementById("distance").innerHTML = "Distance to Screen: " + L + "m";

        document.getElementById("selectedParameters").hidden = false;
        document.getElementById("parameters").hidden = true;
        document.getElementById("canvas").hidden = false;

        let c = document.getElementById("intensityGraph");
        let ctx = c.getContext("2d");
        initGraph(ctx);

        let x = anglesDarkFringes(a, w); //return angles
        let y = distanceDarkFringes(x, L); //return distance in (m) - used to graph x axis

        //for (every pixel in width?) {
        //  drawLightIntensity();
        //}

        console.log(x);
        let angle = (x[6]);
        console.log(angle)
        console.log(calculateLightIntensity(angle)); //return intensity at given angle, used inside of drawLightIntensity()
    }
}

function reset(){
    document.getElementById("selectedParameters").hidden = true;
    document.getElementById("parameters").hidden = false;
    document.getElementById("canvas").hidden = true;
}

function isValidInput(w, a, L){
    let error = "";
    if (w <= WAVELENGTH_MAX_VALUE && w >= WAVELENGTH_MIN_VALUE)
        if (a <= SLIT_WIDTH_MAX_VALUE && a >= SLIT_WIDTH_MIN_VALUE)
            if (L <= DISTANCE_MAX_VALUE && L >= DISTANCE_MIN_VALUE)
                return error;
            else
                return error = "Please select a valid distance to screen between " + DISTANCE_MIN_VALUE + "m and " + DISTANCE_MAX_VALUE + "m";
        else
            return error = "Please select a valid slit width between " + SLIT_WIDTH_MIN_VALUE + "μm and " + SLIT_WIDTH_MAX_VALUE + "μm";
    else
        return error = "Please select a valid wavelength between " + WAVELENGTH_MIN_VALUE + "nm and " + WAVELENGTH_MAX_VALUE + "nm";
}

function initGraph(ctx){
    // clear canvas (if another graph was previously drawn)  
    ctx.clearRect( 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT );  

    // draw x axis  
    ctx.beginPath(); 
    ctx.moveTo( GRAPH_LEFT, GRAPH_BOTTOM );  
    ctx.lineTo( GRAPH_RIGHT, GRAPH_BOTTOM );

    //draw y axis
    ctx.moveTo(CANVAS_WIDTH/2, GRAPH_BOTTOM );  
    ctx.lineTo(CANVAS_WIDTH/2, GRAPH_TOP );  
    ctx.stroke();  

    //draw axis titles
    ctx.font = CANVAS_FONT;
    ctx.fillText("Light Intensity", (CANVAS_WIDTH-90)/2, GRAPH_TOP-5);
    ctx.fillText("Position on Screen", (CANVAS_WIDTH-110)/2, CANVAS_HEIGHT-15);

    //draw 25% marking    
    ctx.beginPath();  
    ctx.moveTo( (CANVAS_WIDTH/2)-5, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP );  
    ctx.lineTo( (CANVAS_WIDTH/2)+5, ( GRAPH_HEIGHT ) / 4 * 3 + GRAPH_TOP );  
    ctx.stroke();
    ctx.fillText((MAX_LIGHT_INTENSITY/4) + "%", (CANVAS_WIDTH/2)+5, ( GRAPH_HEIGHT+10 ) / 4 * 3 + GRAPH_TOP);

    //draw 50% marking    
    ctx.beginPath();  
    ctx.moveTo( (CANVAS_WIDTH/2)-5, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP );  
    ctx.lineTo( (CANVAS_WIDTH/2)+5, ( GRAPH_HEIGHT ) / 2 + GRAPH_TOP );  
    ctx.stroke();
    ctx.fillText((MAX_LIGHT_INTENSITY/2) + "%", (CANVAS_WIDTH/2)+5, ( GRAPH_HEIGHT+10 ) / 2 + GRAPH_TOP);

    //draw 75% marking    
    ctx.beginPath();  
    ctx.moveTo( (CANVAS_WIDTH/2)-5, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP );  
    ctx.lineTo( (CANVAS_WIDTH/2)+5, ( GRAPH_HEIGHT ) / 4 + GRAPH_TOP );  
    ctx.stroke();
    ctx.fillText((MAX_LIGHT_INTENSITY/4*3) + "%", (CANVAS_WIDTH/2)+5, ( GRAPH_HEIGHT+10 ) / 4 + GRAPH_TOP);
}

//returns array of angles to +-4 dark fringes
function anglesDarkFringes(a, w){
    //m= +-1, +-2, +-3, +-4
    //a*sin(theta)=m*wavelength
    //want theta

    let slitwidth = toMeters(a, "micro");
    let wavelength = toMeters(w, "nano");
     
    let x = new Array(9); // distances to dark fringes in degrees
    for (let i = 0; i < x.length; i++){
        x[i]=(Math.asin(((i-4)*wavelength)/slitwidth))*180/Math.PI;
    }
    return x;
}

//returns array of distances from central fringe to +-4 dark fringes
function distanceDarkFringes(x, L){
    let y = new Array(9); //distances to dark fringes in meters
    for (let i = 0; i < y.length; i++){
        y[i]=L*Math.tan(x[i]);
    }
    return y;
}

function toMeters(x, prefix){
    let decimal = 0;
        
    if (prefix == "nano") decimal = -9;
    else decimal = -6;
    
    return x*Math.pow(10, decimal);
}

function calculateLightIntensity(alpha) {
    return Math.pow(Math.sin(alpha)/alpha,2);
}