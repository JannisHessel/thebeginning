var count = 25 //number of the rectangles
var col = 5 //number of columns
var riwi = 40 // width of the rectangles
var rihei = 40 // height
var vgap = 5 // grid gap of the grid
var colcount = 1 //count of colors in the pallet


//always available functions

function hide(x){//function to hide toggle the advanced options

	var field = 'document.getElementById("'+x+'")' ;//made so 1 function can be used for multiple elements
	var y = eval(field)

	if(y.style.display == "block"){
		y.style.display = "none"
	}
	else{
		y.style.display = "block"
	}
}

function changecolor(x){//x is the number of the button from which the function is called

	var pal = document.forms["color"]["pallet"].value//picking out colors from a specific pallet element
	var pick = 'document.forms["color"]["'+pal+'"].value'

	var field = 'document.getElementById("'+x+'")' ;//building the fitting element selector
	var y = eval(field);
	var z = eval(pick);
	y.style.backgroundColor = z;//changing color to the selectet value
}

function buttonmaker(){

	var o = document.getElementById('over')//targeting th eoverlay
	var r = document.getElementById('richterbox');//targeting the grid that is visible
	col = Number(document.forms["input"]["columns"].value);//inseting the number of columns
	var y = Number(document.forms["input"]["rows"].value);//grabbing the size from the form

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

function def(){//used to reset the page to defaukt values and apply them to the picture
 	

	document.forms["input"].reset()
	document.getElementById("basecol").value="#eeeeee"

 	bcol();
 	padchanger();
 	gapchanger();
  	buttonmaker();
 	sizechanger();
 	opac();

 	for(i=1 ; i < 16 ; i++){//making the letters of the random button black

		var field = 'document.getElementById("r'+i+'")' ;
		var y = eval(field);
		var color = "rgb(0,0,0)"
		y.style.color =  color;
	};
};





//sizing functions

function sizechanger(){

	riwi = Number(document.forms["input"]["riwi"].value);
	rihei = Number(document.forms["input"]["rihei"].value);

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

	vgap = Number(document.forms["input"]["vgap"].value);
	var hgap = Number(document.forms["input"]["hgap"].value);
	var r = document.getElementById('richterbox');
	var o = document.getElementById('over');

	o.style.gridGap = hgap + "px " + vgap +"px";
	r.style.gridGap = hgap + "px " + vgap +"px";

	var width = ( riwi + vgap ) * col - vgap;//setting a new grid gap requites resizing of the grid
	r.style.width = width + "px";
};

function padchanger(){

	var pad = Number(document.forms["input"]["pad"].value);
	var o = document.getElementById('over');
	var r = document.getElementById('richterbox');

	r.style.padding = pad + "px";
	o.style.padding = pad + "px";

};







//for- and background functions

function bcol(){

	var r = document.getElementById('richterbox');
	var z = document.forms["input"]["bcolor"].value;
	var bg = "linear-gradient("+z+","+z+")"//needs to change the background gradient because the gradient overwrites background color

	r.style.background = bg;

};

function bgradient(){

	var gr = document.forms["input"]["grad"].value;//radio to pick which kind of gradient
	var r = document.getElementById('richterbox');
	var y = document.forms["input"]["bcolor2"].value;
	var z = document.forms["input"]["bcolor"].value;
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
	var z = document.forms["input"]["ocol"].value;
	var bg = "linear-gradient("+z+","+z+")"//needs to change the background gradient because the gradient overwrites background color

	r.style.background = bg;
	opac();

};

function ovgr(){

	var gr = document.forms["input"]["ogr"].value;//radio to pick which kind of gradient
	var r = document.getElementById('over');
	var y = document.forms["input"]["ocol2"].value;
	var z = document.forms["input"]["ocol"].value;
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
	opac();
};

function opac(){

		var opa = document.forms["input"]["opa"].value;
		var r = document.getElementById('over');

		r.style.opacity = opa
}





//colorpallet functions

function colormaker(){
	document.getElementById("colorpallet").insertAdjacentHTML('beforeend', '<div class="colbox"><input type="color" name="col'+colcount+'" id="col'+colcount+'"><input type="radio" name="pallet" value="col'+colcount+'"><button type="button" onclick="colorremover('+colcount+')">X</button></div>')
	colcount ++//adding in single fields with a radio to pick the color
};

function colorremover(x){//removes the xth colorfield made by the function above and remembers colors

	var x
	var helper
	var newinner =""
	var colors =""

	for(i=0; i<colcount ;i++){//reading out all the colors into a string

		if(i != x){

			helper ='document.forms["color"]["col'+i+'"].value'
			colors += eval(helper)
		}
	}

	colcount --

	for(i=0; i<colcount ;i++){//making a new set of buttons which is 1 less

		newinner += '<div class="colbox"><input type="color" name="col'+i+'" id="col'+i+'"><input type="radio" name="pallet" value="col'+i+'"><button type="button" onclick="colorremover('+i+')">X</button></div>'
	}
	

	document.getElementById("colorpallet").innerHTML = newinner

	for(i=0; i<colcount ; i++){//reading out the colors from the string and putting them in the new input fields

		helper = 'document.getElementById("col'+i+'")'
		x = eval(helper)
		helper = colors.substring(7*i,7*(i+1))
		x.value = helper
	}
}

function allcol(){

	var max = count;//counting how many fields are colored for the row/column selection
	var mult = 1 ;//used to multiply the running index so fields are skipped until the one in the same column again
	var start = 0 ;//when coloring rows and columns this is used to start at the right element; defaults of all these are set for coloring everything
	var rowcol = document.forms["color"]["rowcol"].value;//determins wether rows or columns should be colored
	var rownr = Number(document.forms["color"]["rownr"].value);

	var pal = document.forms["color"]["pallet"].value//picking out colors from a specifieg pallet element
	var pick = 'document.forms["color"]["'+pal+'"].value'
	var z = eval(pick);

	if (rowcol == "row"){

		start = col * (rownr-1);
		max = col;
	}
	else if(rowcol == "col"){

		start = rownr - 1;
		mult =col;
		max = count / col;
	}

	for(i=0 ; i < max ; i++){

		var j = start + mult * i
		var field = 'document.getElementById("'+j+'")' ;//building the fitting element selector
		var y = eval(field);
		y.style.backgroundColor = z;//changing color to the selectet value

	}

}

function colorout() {

	var nr
	var color
	var helper
	var pop = "<html><head><title>Your color selection</title><style>";
	pop += ".colorcollection{display:flex;flex-wrap:wrap;justify-content:space-around;}";
	pop += ".color{height:200px;width:150px;text-align:center;font-weight:bold;font-size:20px}";

	for(i=0;i<colcount;i++){

		helper = 'document.forms["color"]["col'+i+'"].value'
		color = eval(helper)
		nr = 0

		if(color.substring(1,2)>"6" || color.substring(3,4)>"6" || color.substring(5,6)>"a"){
			pop += "#c"+i+"{background-color:"+color+";}"
		}
		else{
			pop += "#c"+i+"{background-color:"+color+";color:#fff}"
		}
	}

	pop += "</style></head><body><div class='colorcollection'>"

	for(i=0;i<colcount;i++){

		helper = 'document.forms["color"]["col'+i+'"].value'
		color = eval(helper)
		pop += '<div id="c'+i+'" class="color">'+color+'</div>'
	}

	pop += '</div></body></html>'
	var w = window.open()
	w.document.write(pop)
	w.document.close()
}



//for the advanced randomizer

function wei(){//for creating the weightet colors

	var x = Number(document.forms["input"]["exp"].value);//the exponent used for it
	var color = document.forms["input"]["colour"].value;
	var max = count;//counting how many fields are colored for the row/column selection
	var mult = 1 ;//used to multiply the running index so fields are skipped until the one in the same column again
	var start = 0 ;//when coloring rows and columns this is used to start at the right element; defaults of all these are set for coloring everything
	var rowcol = document.forms["input"]["rowcol"].value;//determins wether rows or columns should be colored
	var rownr = Number(document.forms["input"]["rownr"].value);

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