let count = 25 ;//number of the rectangles
let col = 5; //number of columns
let riwi = 40 ;// width of the rectangles
let rihei = 40;// height
let vgap = 5 ;// grid gap of the grid
let colcount = 1; //count of colors in the pallet


//always available functions

function hide(x){//function to hide toggle the advanced options

	let field = 'document.getElementById("'+x+'")' ;//made so 1 function can be used for multiple elements
	let y = eval(field)

	if(y.style.display == "block"){
		y.style.display = "none"
	}
	else{
		y.style.display = "block"
	}
}

function changecolor(x){//x is the number of the button from which the function is called

	let pal = document.forms["color"]["pallet"].value//picking out colors from a specific pallet element
	let pick = 'document.forms["color"]["'+pal+'"].value'
	let field = 'document.getElementById("'+x+'")' ;//building the fitting element selector
	
	let y = eval(field);
	let z = eval(pick);
	y.style.backgroundColor = z;//changing color to the selectet value
}

function buttonmaker(){

	let o = document.getElementById('over')//targeting th eoverlay
	let r = document.getElementById('richterbox');//targeting the grid that is visible
	col = Number(document.forms["input"]["columns"].value);//inseting the number of columns
	let y = Number(document.forms["input"]["rows"].value);//grabbing the size from the form

	if ( col == 0 ){//setting default to 5 rows;columns
		col = 5;
	};
	if ( y == 0 ){
		y = 5;
	};

	let text = "";//text makes up the html that wil be the buttons in the overlay and the visible squares
	let columns = "" ; //writing the styling for the numbe rof columns
	count = col * y; //number of buttons from number of rows/columns
	let width = ( riwi + vgap ) * col - vgap//calculating rquired width and number of squares and the gap

	for ( i=0 ; i < col ; i++){//giving the number of columns to the grids

	  columns += " 1fr";
	}
	r.style.gridTemplateColumns = columns
	o.style.gridTemplateColumns = columns


	r.style.width = width + "px"//giving apropriate width to the grid;overlay doesnt need a width because it follows the wrapper div
		
	for ( let i=0 ; i <count; i++) {//creating numbered buttons that get colored

		text += "<button id='"+i+"'></button>"
	}

	r.innerHTML = text;
	text = ""

	for ( let i=0 ; i <count; i++) {//creating numbered buttons that give their number to the function they call right over the fields i color

		text += "<button id='o"+i+"' onclick='changecolor("+i+")'></button>"
	}

	o.innerHTML = text ;

	if( riwi != 40 || rihei != 40){
		sizechanger();//resizing in case the size isnt the default one
	}
}

function randomizer(){

	for(let i=0 ; i < count ; i++){
		let r = Math.floor(Math.random()*256);//random generationg rgb values
		let g = Math.floor(Math.random()*256);
		let b = Math.floor(Math.random()*256);

		let color = "rgb(" + r + "," + g + "," + b + ")";//creating a color string
		let field = 'document.getElementById("'+i+'")' ;//selecting each field and filling in the color

		let y = eval(field);
		y.style.backgroundColor = color
	}
}

function randbutton(){//gives the randomize colors button random colors

	for(let i=1 ; i < 16 ; i++){
		let r = Math.floor(Math.random()*256);
		let g = Math.floor(Math.random()*256);
		let b = Math.floor(Math.random()*256);

		let color = "rgb(" + r + "," + g + "," + b + ")";
		let field = 'document.getElementById("r'+i+'")' ;

		let y = eval(field);
		y.style.color = color;
	}
}

function def(){//used to reset the page to defaukt values and apply them to the picture
 	

	document.forms["input"].reset()//resetting all the form values
	document.getElementById("basecol").value="#eeeeee"//the functions are going to read the forms so this is enough

 	bcol();//applying all the defaults to the field
 	padchanger();
 	gapchanger();
  	buttonmaker();
 	sizechanger();
 	opac();

 	for(let i=1 ; i < 16 ; i++){//making the letters of the random button black

		let field = 'document.getElementById("r'+i+'")' ;
		let y = eval(field);
		let color = "rgb(0,0,0)"
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

	for(let i=0 ; i<count ; i++){

		let field = 'document.getElementById("'+i+'")' ;//looping through the squares to change sizes similar to random colors
		let y = eval(field);

		y.style.height = rihei + "px";
		y.style.width = riwi + "px" ;

		field = 'document.getElementById("o'+i+'")' ;//looping through the squares to change sizes similar to random colors
		y = eval(field);

		y.style.height = rihei + "px";
		y.style.width = riwi + "px" ;
	};

	let r = document.getElementById('richterbox');
	let width = ( riwi + vgap ) * col - vgap;//resizing the grid to the apropriate size

	r.style.width = width + "px";
};

function gapchanger(){

	vgap = Number(document.forms["input"]["vgap"].value);
	let hgap = Number(document.forms["input"]["hgap"].value);
	let r = document.getElementById('richterbox');
	let o = document.getElementById('over');

	o.style.gridGap = hgap + "px " + vgap +"px";
	r.style.gridGap = hgap + "px " + vgap +"px";

	let width = ( riwi + vgap ) * col - vgap;//setting a new grid gap requites resizing of the grid
	r.style.width = width + "px";
};

function padchanger(){

	let pad = Number(document.forms["input"]["pad"].value);
	let o = document.getElementById('over');
	let r = document.getElementById('richterbox');

	r.style.padding = pad + "px";
	o.style.padding = pad + "px";

};







//for- and background functions

function bcol(){

	let r = document.getElementById('richterbox');
	let z = document.forms["input"]["bcolor"].value;
	let bg = "linear-gradient("+z+","+z+")"//needs to change the background gradient because the gradient overwrites background color

	r.style.background = bg;

};

function bgradient(){

	let gr = document.forms["input"]["grad"].value;//radio to pick which kind of gradient
	let r = document.getElementById('richterbox');
	let y = document.forms["input"]["bcolor2"].value;
	let z = document.forms["input"]["bcolor"].value;
	let bg

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

	let r = document.getElementById('over');
	let z = document.forms["input"]["ocol"].value;
	let bg = "linear-gradient("+z+","+z+")"//needs to change the background gradient because the gradient overwrites background color

	r.style.background = bg;
	opac();

};

function ovgr(){

	let gr = document.forms["input"]["ogr"].value;//radio to pick which kind of gradient
	let r = document.getElementById('over');
	let y = document.forms["input"]["ocol2"].value;
	let z = document.forms["input"]["ocol"].value;
	let bg

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

		let opa = document.forms["input"]["opa"].value;
		let r = document.getElementById('over');

		r.style.opacity = opa
}





//colorpallet functions

function colormaker(){
	document.getElementById("colorpallet").insertAdjacentHTML('beforeend', '<div class="colbox"><input type="color" name="col'+colcount+'" id="col'+colcount+'"><input type="radio" name="pallet" value="col'+colcount+'"><button type="button" onclick="colorremover('+colcount+')">X</button></div>')
	colcount ++//adding in single fields with a radio to pick the color
};

function colorremover(x){//removes the xth colorfield made by the function above and remembers colors

	let newinner =""
	let colors =""

	for(let i=0; i<colcount ;i++){//reading out all the colors into a string

		if(i != x){

			helper ='document.forms["color"]["col'+i+'"].value'
			colors += eval(helper)
		}
	}

	colcount --

	for(let i=0; i<colcount ;i++){//making a new set of buttons which is 1 less

		newinner += '<div class="colbox"><input type="color" name="col'+i+'" id="col'+i+'"><input type="radio" name="pallet" value="col'+i+'"><button type="button" onclick="colorremover('+i+')">X</button></div>'
	}
	

	document.getElementById("colorpallet").innerHTML = newinner

	for(let i=0; i<colcount ; i++){//reading out the colors from the string and putting them in the new input fields

		eval('document.getElementById("col'+i+'")').value = colors.substring(7*i,7*(i+1))
	}
}

function allcol(){

	let max = count;//counting how many fields are colored for the row/column selection
	let mult = 1 ;//used to multiply the running index so fields are skipped until the one in the same column again
	let start = 0 ;//when coloring rows and columns this is used to start at the right element; defaults of all these are set for coloring everything
	let rowcol = document.forms["color"]["rowcol"].value;//determins wether rows or columns should be colored
	let rownr = Number(document.forms["color"]["rownr"].value);

	let pal = document.forms["color"]["pallet"].value//picking out colors from a specifieg pallet element
	let pick = 'document.forms["color"]["'+pal+'"].value'
	let z = eval(pick);

	if (rowcol == "row"){

		start = col * (rownr-1);
		max = col;
	}
	else if(rowcol == "col"){

		start = rownr - 1;
		mult =col;
		max = count / col;
	}

	for(let i=0 ; i < max ; i++){

		let j = start + mult * i
		let field = 'document.getElementById("'+j+'")' ;//building the fitting element selector
		let y = eval(field);
		y.style.backgroundColor = z;//changing color to the selectet value

	}

}

function colorout() {

	let color //value of the color in the pallet
	let helper//letiable to puck out elements of the html
	let pop = "<html><head><title>Your color selection</title><style>";//building the html for the popup
	pop += ".colorcollection{display:flex;flex-wrap:wrap;justify-content:space-around;}";//the colors conna be displayed in a flexbox
	pop += ".color{height:200px;width:150px;text-align:center;font-weight:bold;font-size:20px}";//font and size of the fields with colors

	for(let i=0;i<colcount;i++){

		helper = 'document.forms["color"]["col'+i+'"].value'
		color = eval(helper)

		if(color.substring(1,2)>"7" || color.substring(3,4)>"7"){//evaluating the brightness of the color to determen wether the text needs to be white or black to be readable
			pop += "#c"+i+"{background-color:"+color+";}"
		}
		else{
			pop += "#c"+i+"{background-color:"+color+";color:#fff}"
		}
	}

	pop += "</style></head><body><div class='colorcollection'>"

	for(let i=0;i<colcount;i++){

		helper = 'document.forms["color"]["col'+i+'"].value'
		color = eval(helper)
		pop += '<div id="c'+i+'" class="color">'+color+'</div>'//building the fields with apropriate class id and the hecs color written in it
	}

	pop += '</div></body></html>'
	let w = window.open()
	w.document.write(pop)
	w.document.close()
}



//for the advanced randomizer

function wei(){//for creating the weightet colors

	let x = Number(document.forms["input"]["exp"].value);//the exponent used for it
	let color = document.forms["input"]["colour"].value;
	let max = count;//counting how many fields are colored for the row/column selection
	let mult = 1 ;//used to multiply the running index so fields are skipped until the one in the same column again
	let start = 0 ;//when coloring rows and columns this is used to start at the right element; defaults of all these are set for coloring everything
	let rowcol = document.forms["input"]["rowcol"].value;//determins wether rows or columns should be colored
	let rownr = Number(document.forms["input"]["rownr"].value);

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

		for(let i=0 ; i < max ; i++){

			let j = start + mult * i

			let r = Math.floor(Math.pow(Math.random(),x)*256);//a number moves closet to one if a exponent between 0 and 1 is applied to it so the color value goes closer to 255, and even mor eif the exponent is closer to 0
			let g = Math.floor(Math.pow(Math.random(),x)*256);// and even mor eif the exponent is closer to 0
			let b = Math.floor(Math.pow(Math.random(),x)*256);//making all colors values closer to 255 makes the color close to white

			let color = "rgb(" + r + "," + g + "," + b + ")";
			let field = 'document.getElementById("'+j+'")' ;
			let y = eval(field);

			y.style.backgroundColor = color
		}
	}

	else if (color == "black"){

		for(let i=0 ; i < max ; i++){

			let j = start + mult * i

			let r = Math.floor((1 - Math.pow(Math.random(),x))*256);//-1 a number close to 1 is close to 0 so the color vslue is closer to 0 analog to above
			let g = Math.floor((1 - Math.pow(Math.random(),x))*256);//making all colors close to 0 makes it go closer to black
			let b = Math.floor((1 - Math.pow(Math.random(),x))*256);

			let color = "rgb(" + r + "," + g + "," + b + ")";
			let field = 'document.getElementById("'+j+'")' ;
			let y = eval(field);

			y.style.backgroundColor = color
		}
	}

	else if (color == "red"){

		for(let i=0 ; i < max ; i++){

			let j = start + mult * i

			let r = Math.floor(Math.pow(Math.random(),x)*256);//making the red value closer to 255 and the others closer to 0 makes it red
			let g = Math.floor((1 - Math.pow(Math.random(),x))*256);
			let b = Math.floor((1 - Math.pow(Math.random(),x))*256);

			let color = "rgb(" + r + "," + g + "," + b + ")";
			let field = 'document.getElementById("'+j+'")' ;
			let y = eval(field);

			y.style.backgroundColor = color
		}
	}

	else if (color == "green"){

		for(let i=0 ; i < max ; i++){

			let j = start + mult * i
			let r = Math.floor((1 - Math.pow(Math.random(),x))*256);
			let g = Math.floor(Math.pow(Math.random(),x)*256);
			let b = Math.floor((1 - Math.pow(Math.random(),x))*256);
			let color = "rgb(" + r + "," + g + "," + b + ")";
			let field = 'document.getElementById("'+j+'")' ;
			let y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "blue"){

		for(let i=0 ; i < max ; i++){

			let j = start + mult * i
			let r = Math.floor((1 - Math.pow(Math.random(),x))*256);
			let g = Math.floor((1 - Math.pow(Math.random(),x))*256);
			let b = Math.floor(Math.pow(Math.random(),x)*256);
			let color = "rgb(" + r + "," + g + "," + b + ")";
			let field = 'document.getElementById("'+j+'")' ;
			let y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "yellow"){

		for(let i=0 ; i < max ; i++){

			let j = start + mult * i
			let r = Math.floor(Math.pow(Math.random(),x)*256);
			let g = Math.floor(Math.pow(Math.random(),x)*256);
			let b = Math.floor((1 - Math.pow(Math.random(),x))*256);
			let color = "rgb(" + r + "," + g + "," + b + ")";
			let field = 'document.getElementById("'+j+'")' ;
			let y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "purple"){

		for(let i=0 ; i < max ; i++){

			let j = start + mult * i
			let r = Math.floor(Math.pow(Math.random(),x)*256);
			let g = Math.floor((1 - Math.pow(Math.random(),x))*256);
			let b = Math.floor(Math.pow(Math.random(),x)*256);
			let color = "rgb(" + r + "," + g + "," + b + ")";
			let field = 'document.getElementById("'+j+'")' ;
			let y = eval(field);
			y.style.backgroundColor = color
		}
	}

	else if (color == "tur"){

		for(let i=0 ; i < max ; i++){

			let j = start + mult * i
			let r = Math.floor((1 - Math.pow(Math.random(),x))*256);
			let g = Math.floor(Math.pow(Math.random(),x)*256);
			let b = Math.floor(Math.pow(Math.random(),x)*256);
			let color = "rgb(" + r + "," + g + "," + b + ")";
			let field = 'document.getElementById("'+j+'")' ;
			let y = eval(field);
			y.style.backgroundColor = color
		}
	}
};