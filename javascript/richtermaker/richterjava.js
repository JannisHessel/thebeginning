		var count = 0
		var col = 0
		var riwi = 40
		var rihei = 40
		var gap = 5


		function changecolor(x){
			var field = 'document.getElementById("'+x+'")' ;//building the fitting element selector
			var y = eval(field);
			var z = document.getElementById("color").value
			y.style.backgroundColor = z;//changing color to the selectet value
}
		function richtermakermaker(){
			var r = document.getElementById('richterbox');//targeting grid
			col = Number(document.forms["rsize"]["columns"].value);
			var y = Number(document.forms["rsize"]["rows"].value);//grabbing the size from the form
			if ( col == 0 || y == 0){
				alert("Please enter a number of rows and columns between 1 and 50")
			}
			var a = 0;
			var text = "";
			var columns = "" ; 
			count = col * y; 
			var width = ( riwi + gap ) * col - gap//calculating rquired width and number of squared
			var columns = ""
			for ( var i=0 ; i < col ; i++){//giving the number of columns to the grid
			  columns += " 1fr";
			}
			r.style.gridTemplateColumns = columns
			r.style.width = width + "px"//giving apropriate width to the grid

			
			for ( var i=0 ; i <count; i++) {//creating numbered buttons that give their number to the function they call
				
				text += "<button id='"+i+"' onclick='changecolor("+i+")'></button>"
			}

			r.innerHTML = text;
			if( riwi != 40 || rihei != 40){
			sizechanger();
			}
		}

		function ra(){
			for(i=0 ; i < count ; i++){
				var r = Math.floor(Math.random()*256);//random generationg rgb values
				var g = Math.floor(Math.random()*256);
				var b = Math.floor(Math.random()*256);
				var color = "rgb(" + r + "," + g + "," + b + ")";//creating a color string
				var field = 'document.getElementById("'+i+'")' ;//selecting each field and filling in the color
				var y = eval(field);
				y.style.backgroundColor = color
				//document.getElementById("rmm").innerHTML = color 
			}

		}
		function randbutton(){
			for(i=1 ; i < 16 ; i++){
				var r = Math.floor(Math.random()*256);//random generationg rgb values
				var g = Math.floor(Math.random()*256);
				var b = Math.floor(Math.random()*256);
				var color = "rgb(" + r + "," + g + "," + b + ")";//creating a color string
				var field = 'document.getElementById("r'+i+'")' ;//selecting each field and filling in the color
				var y = eval(field);
				y.style.color = color
				//document.getElementById("rmm").innerHTML = color 
			}

		}
		function sizechanger(){
			riwi = Number(document.forms["recsize"]["riwi"].value);
			rihei = Number(document.forms["recsize"]["rihei"].value);
			if ( riwi < 16 ){
				riwi = 40
			};
			if (rihei == 0){
				rihei = 40
			}
			
			for(i=0 ; i<count ; i++){
			var field = 'document.getElementById("'+i+'")' ;
			var y = eval(field);
			y.style.height = rihei + "px";
			y.style.width = riwi + "px" ;
			};

			var r = document.getElementById('richterbox');

			var width = ( riwi + gap ) * col - gap;
			r.style.width = width + "px";
		};
		function gapchanger(){
		gap = Number(document.forms["gap"]["gap"].value);
		var r = document.getElementById('richterbox');
		r.style.gridGap = gap + "px";
		}