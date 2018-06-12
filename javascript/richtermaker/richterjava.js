var count = 25 //number of the rectangles
var col = 5 //number of columns
var riwi = 40 // width of the rectangles
var rihei = 40 // height
var vgap = 5 // grid gap of the grid


function changecolor(x){//x is the number of the button from which the function is called

	var field = 'document.getElementById("'+x+'")' ;//building the fitting element selector
	var y = eval(field);
	var z = document.getElementById("color").value
	y.style.backgroundColor = z;//changing color to the selectet value
}

function buttonmaker(){

	var o = document.getElementById('over')//targeting th eoverlay
	var r = document.getElementById('richterbox');//targeting the grid that is visible
	col = Number(document.forms["rsize"]["columns"].value);//inseting the number of columns
	var y = Number(document.forms["rsize"]["rows"].value);//grabbing the size from the form

	if ( col == 0 ){//setting default to 5 rows;columns
		col = 5;
	};
	if ( y == 0 ){
		y = 5;
	};

	var text = "";//text makes up the html that wil be the buttons in the overlay and the visible squares
	var columns = "" ; //writing the styling for the numbe rof columns
	count = col * y; //number of buttons from number of rows/columns
	var width = ( riwi + vgap ) * col - vgap//calculating rquired width and number of squares and the gap
	var columns = ""

	for ( var i=0 ; i < col ; i++){//giving the number of columns to the grids
	  columns += " 1fr";
	}
	r.style.gridTemplateColumns = columns
	o.style.gridTemplateColumns = columns


	r.style.width = width + "px"//giving apropriate width to the grid;overlay doesnt need a width because it follows the wrapper div
		
	for ( var i=0 ; i <count; i++) {//creating numbered buttons that get colored
		text += "<button id='"+i+"'></button>"
	}

	r.innerHTML = text;
	text = ""

	for ( var i=0 ; i <count; i++) {//creating numbered buttons that give their number to the function they call right over the fields i color
		text += "<button id='o"+i+"' onclick='changecolor("+i+")'></button>"
	}
	o.innerHTML = text ;

	if( riwi != 40 || rihei != 40){
		sizechanger();//resizing in case the size isnt the default one
	}
}

function randomizer(){

	for(i=0 ; i < count ; i++){
		var r = Math.floor(Math.random()*256);//random generationg rgb values
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		var color = "rgb(" + r + "," + g + "," + b + ")";//creating a color string
		var field = 'document.getElementById("'+i+'")' ;//selecting each field and filling in the color
		var y = eval(field);
		y.style.backgroundColor = color
	}
}

function randbutton(){//gives the randomize colors button random colors

	for(i=1 ; i < 16 ; i++){
		var r = Math.floor(Math.random()*256);
		var g = Math.floor(Math.random()*256);
		var b = Math.floor(Math.random()*256);
		var color = "rgb(" + r + "," + g + "," + b + ")";
		var field = 'document.getElementById("r'+i+'")' ;
		var y = eval(field);
		y.style.color = color
	}
}

function sizechanger(){

	riwi = Number(document.forms["recsize"]["riwi"].value);
	rihei = Number(document.forms["recsize"]["rihei"].value);

	if ( riwi == 0  ){//checking if there were numbers selectet and setting default if there werent
		riwi = 40
	};

	if (rihei == 0){
		rihei = 40
	};

	for(i=0 ; i<count ; i++){
		var field = 'document.getElementById("'+i+'")' ;//looping through the squares to change sizes similar to random colors
		var y = eval(field);
		y.style.height = rihei + "px";
		y.style.width = riwi + "px" ;
		field = 'document.getElementById("o'+i+'")' ;//looping through the squares to change sizes similar to random colors
		y = eval(field);
		y.style.height = rihei + "px";
		y.style.width = riwi + "px" ;
	};

	var r = document.getElementById('richterbox');
	var width = ( riwi + vgap ) * col - vgap;//resizing the grid to the apropriate size
	r.style.width = width + "px";
};

function gapchanger(){

	vgap = Number(document.forms["gap"]["vgap"].value);
	var hgap = Number(document.forms["gap"]["hgap"].value);
	var r = document.getElementById('richterbox');
	var o = document.getElementById('over');
	o.style.gridGap = hgap + "px " + vgap +"px";
	r.style.gridGap = hgap + "px " + vgap +"px";
	var width = ( riwi + vgap ) * col - vgap;//setting a new grid gap requites resizing of the grid
	r.style.width = width + "px";
};

function padchanger(){

	var pad = Number(document.forms["pad"]["pad"].value);
	var o = document.getElementById('over');
	var r = document.getElementById('richterbox');
	r.style.padding = pad + "px";
	o.style.padding = pad + "px";

};

function background(){

	var r = document.getElementById('richterbox');
	var z = document.getElementById("color").value;
	var bg = "linear-gradient("+z+","+z+")"//needs to change the background gradient because the gradient overwrites background color
	r.style.background = bg;
};

function bgradient(){

	var gr = document.forms["grad"]["grad"].value;//radio to pick which kind of gradient
	var r = document.getElementById('richterbox');
	var y = document.getElementById("color2").value;
	var z = document.getElementById("color").value;
	var bg

	if(gr=="tb"){//picking out the option for the background
		bg = "linear-gradient("+z+","+y+")"
	}
	else if(gr=="lr"){
		bg = "linear-gradient(to right,"+z+","+y+")"
	}
	else if(gr=="dia"){
		bg = "linear-gradient(to bottom right,"+z+","+y+")"
	}
	else if(gr=="adia"){
		bg = "linear-gradient(to bottom left,"+z+","+y+")"
	}
	else{
		bg = "radial-gradient("+z+","+y+")"
	}

	r.style.background = bg;
};


function over(){

	var r = document.getElementById('over');
	var z = document.getElementById("ocol").value;
	var bg = "linear-gradient("+z+","+z+")"//needs to change the background gradient because the gradient overwrites background color
	r.style.background = bg;
};

function ovgr(){

	var gr = document.forms["ogr"]["ogr"].value;//radio to pick which kind of gradient
	var r = document.getElementById('over');
	var y = document.getElementById("ocol").value;
	var z = document.getElementById("ocol2").value;
	var bg

	if(gr=="tb"){//picking out the option for the background
		bg = "linear-gradient("+z+","+y+")"
	}
	else if(gr=="lr"){
		bg = "linear-gradient(to right,"+z+","+y+")"
	}
	else if(gr=="dia"){
		bg = "linear-gradient(to bottom right,"+z+","+y+")"
	}
	else if(gr=="adia"){
		bg = "linear-gradient(to bottom left,"+z+","+y+")"
	}
	else{
		bg = "radial-gradient("+z+","+y+")"
	}

	r.style.background = bg;
};

function opa(){

		var opa = document.forms["ogr"]["opa"].value;
		var r = document.getElementById('over');
		r.style.opacity = opa
}

function def(){//used to reset the page to defaukt values and apply them to the picture
 	
	var bcol = "#eeeeee"

	document.forms["ogr"].reset()
	document.forms["weight"].reset()
 	document.forms["gap"].reset()
 	document.forms["pad"].reset()
	document.forms["recsize"].reset()
 	document.forms["rsize"].reset()
 	document.forms["grad"].reset()

 	document.getElementById("color2").value=bcol;
 	document.getElementById("color").value=bcol;
	document.getElementById("ocol").value=bcol;
	document.getElementById("ocol2").value=bcol;

 	background();
 	padchanger();
 	gapchanger();
 	buttonmaker();
 	sizechanger();
 	opa();

 	for(i=1 ; i < 16 ; i++){//making the letters of the random button black
		var field = 'document.getElementById("r'+i+'")' ;
		var y = eval(field);
		var color = "rgb(0,0,0)"
		y.style.color =  color;
	};
};

function wei(){//for creating the weightet colors

	var x = Number(document.forms["weight"]["exp"].value);//the exponent used for it
	var color = document.forms["weight"]["color"].value;
	var max = count;//counting how many fields are colored for the row/column selection
	var mult = 1 ;//used to multiply the running index so fields are skipped until the one in the same column again
	var start = 0 ;//when coloring rows and columns this is used to start at the right element; defaults of all these are set for coloring everything
	var rowcol = document.forms["weight"]["rowcol"].value;//determins wether rows or columns should be colored
	var rownr = Number(document.forms["weight"]["rownr"].value);

	if (rowcol == "row"){
		start = col * (rownr-1);
		max = col;
	}
	else if(rowcol == "col"){
		start = rownr - 1;
		mult =col;
		max = count / col;
	}


	if(color=="white"){

		for(i=0 ; i < max ; i++){

			var j = start + mult * i
			var r = Math.floor(Math.pow(Math.random(),x)*256);//a number moves closet to one if a exponent between 0 and 1 is applied to it so the color value goes closer to 255, and even mor eif the exponent is closer to 0
			var g = Math.floor(Math.pow(Math.random(),x)*256);// and even mor eif the exponent is closer to 0
			var b = Math.floor(Math.pow(Math.random(),x)*256);//making all colors values closer to 255 makes the color close to white
			var color = "rgb(" + r + "," + g + "," + b + ")";
			var field = 'document.getElementById("'+j+'")' ;
			var y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "black"){

		for(i=0 ; i < max ; i++){

			var j = start + mult * i
			var r = Math.floor((1 - Math.pow(Math.random(),x))*256);//-1 a number close to 1 is close to 0 so the color vslue is closer to 0 analog to above
			var g = Math.floor((1 - Math.pow(Math.random(),x))*256);//making all colors close to 0 makes it go closer to black
			var b = Math.floor((1 - Math.pow(Math.random(),x))*256);
			var color = "rgb(" + r + "," + g + "," + b + ")";
			var field = 'document.getElementById("'+j+'")' ;
			var y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "red"){

		for(i=0 ; i < max ; i++){

			var j = start + mult * i
			var r = Math.floor(Math.pow(Math.random(),x)*256);//making the red value closer to 255 and the others closer to 0 makes it red
			var g = Math.floor((1 - Math.pow(Math.random(),x))*256);
			var b = Math.floor((1 - Math.pow(Math.random(),x))*256);
			var color = "rgb(" + r + "," + g + "," + b + ")";
			var field = 'document.getElementById("'+j+'")' ;
			var y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "green"){

		for(i=0 ; i < max ; i++){

			var j = start + mult * i
			var r = Math.floor((1 - Math.pow(Math.random(),x))*256);
			var g = Math.floor(Math.pow(Math.random(),x)*256);
			var b = Math.floor((1 - Math.pow(Math.random(),x))*256);
			var color = "rgb(" + r + "," + g + "," + b + ")";
			var field = 'document.getElementById("'+j+'")' ;
			var y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "blue"){

		for(i=0 ; i < max ; i++){

			var j = start + mult * i
			var r = Math.floor((1 - Math.pow(Math.random(),x))*256);
			var g = Math.floor((1 - Math.pow(Math.random(),x))*256);
			var b = Math.floor(Math.pow(Math.random(),x)*256);
			var color = "rgb(" + r + "," + g + "," + b + ")";
			var field = 'document.getElementById("'+j+'")' ;
			var y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "yellow"){

		for(i=0 ; i < max ; i++){

			var j = start + mult * i
			var r = Math.floor(Math.pow(Math.random(),x)*256);
			var g = Math.floor(Math.pow(Math.random(),x)*256);
			var b = Math.floor((1 - Math.pow(Math.random(),x))*256);
			var color = "rgb(" + r + "," + g + "," + b + ")";
			var field = 'document.getElementById("'+j+'")' ;
			var y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "purple"){

		for(i=0 ; i < max ; i++){

			var j = start + mult * i
			var r = Math.floor(Math.pow(Math.random(),x)*256);
			var g = Math.floor((1 - Math.pow(Math.random(),x))*256);
			var b = Math.floor(Math.pow(Math.random(),x)*256);
			var color = "rgb(" + r + "," + g + "," + b + ")";
			var field = 'document.getElementById("'+j+'")' ;
			var y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "tur"){

		for(i=0 ; i < max ; i++){

			var j = start + mult * i
			var r = Math.floor((1 - Math.pow(Math.random(),x))*256);
			var g = Math.floor(Math.pow(Math.random(),x)*256);
			var b = Math.floor(Math.pow(Math.random(),x)*256);
			var color = "rgb(" + r + "," + g + "," + b + ")";
			var field = 'document.getElementById("'+j+'")' ;
			var y = eval(field);
			y.style.backgroundColor = color
		}
	}
};