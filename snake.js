// add borders to the board
// correct bugs
// set thinner snake on the sides if(direction up/down){then snakeCell.width = 8px}else{snakeCell.height = 8px}
// add difficulty model, refractor code
function findPositionFromCoordinates(X,Y){
	position = (X/16)*10 + Y/16
	return position
}
function findCoordinatesFromPosition(position){
	X = Math.floor(position/10) 
	Y = (position % 10) 
	return [X,Y]
}
// Draw the board
var boardCells = [];
var idTable = []; // debugging purposes only to verify uniqueness of each ID
function boardCellCreate(i,j){
	this.id= i *10 + j;
	

};
function drawBoard(){
	for(i=0;i<20;i++){
		for(j=1; j<=10;j++){
			var boardCell = new boardCellCreate(i,j);			
			
		}
	}	
}	

var gameBorders = [];


//draw the snake
var snakeDivs = [];
var snakeCells = [];
function snakeCellCreate(position,i){
// Create snake Cell object array
	this.cellId = i;
	this.position = position;

//push snake cell into snake cell object array
	this.pushCell = function(){
		snakeCells.unshift(this);
	}

	this.drawCell = function(){
// create DOM elements
	var snakeDiv = document.createElement('div');
		snakeDiv.setAttribute("class", "snake-cell");
		snakeDivs.push(snakeDiv);
		document.getElementById("gameSpace").appendChild(snakeDiv)
	}
	this.positionCell = function(i){
		var coordinates = findCoordinatesFromPosition(this.position);
		snakeDivs[i-1].style.left = coordinates[0]+"px";
		snakeDivs[i-1].style.bottom = coordinates[1]+"px";
	}
}

//implement movement
function snakePosition(){
	this.cells = [];
	this.direction = "right";

	this.keyListener = function(){
		document.addEventListener("keydown", function(e){
			switch(e.keyCode){
				case 38:
					if(direction != "down"){
					direction = "up";
					}
					break;
				case 40:
					if(direction != "up"){
					direction = "down";
					}
					break;
				case 37:
					if(direction != "right"){
					direction = "left";
					}
					break;
				case 39:
					if(direction != "left"){
					direction = "right";
					}
					break;
				default:
					direction = "right";
			}
		})	
	}
	this.beginMove = function(direction){		
		switch(direction){	
				case "left":
					coordinates = findCoordinatesFromPosition(snakeCells[0].position-10)
					snakeDivs[0].style.left = coordinates[0]*16+"px";
					break;
				case "right":			
					coordinates = findCoordinatesFromPosition(snakeCells[0].position+10)							
					snakeDivs[0].style.left = coordinates[0]*16+"px";					
					break;
				case "up":
					coordinates = findCoordinatesFromPosition(snakeCells[0].position+1)
					snakeDivs[0].style.bottom = coordinates[1]*16+"px";
					break;
				case "down":
					coordinates = findCoordinatesFromPosition(snakeCells[0].position-1)
					snakeDivs[0].style.bottom = coordinates[1]*16+"px";
					break;
		}
		if(foodDiv.position === snakeCells[0].position){
			var element = document.getElementById("food-cell");
			element.parentNode.removeChild(element);
			foodDiv = new foodCell;
			foodDiv.drawCell();
			new_cell = new snakeCellCreate(-100,snakeCells.length);
			snakeCells.push(new_cell);
			new_cell.drawCell();
			new_cell.positionCell(snakeCells.length);
			console.log(foodDiv)
		}	
		for(i=snakeCells.length-1;i>1;i--){
			if (snakeCells[1].position === snakeCells[i].position){
				clearInterval(interval)
				alert("game over")				
			}
		}
		this.cellMove(1);	
	}
	this.cellMove = function(i){
		//Recursive function first moves i-1 cell to i position then updates i position to where i cell currently is.
		if(i>snakeCells.length-1){
			return true
		}else{
			coordinates = findCoordinatesFromPosition(snakeCells[i-1].position)
			snakeDivs[i].style.left =  coordinates[0]*16+"px";
			snakeDivs[i].style.bottom = coordinates[1]*16+"px";
			snakeCells[i-1].position = findPositionFromCoordinates(parseInt(snakeDivs[i-1].style.left), parseInt(snakeDivs[i-1].style.bottom)); 
			this.cellMove(i+1)
		}
	}
};


//setting up food mechanic
function foodCell(){
	this.position = Math.floor(Math.random()*200);
	
	this.coordinates = findCoordinatesFromPosition(this.position);
	this.drawCell = function(){
		var foodDiv = document.createElement('div');
		foodDiv.setAttribute('id', 'food-cell');
		document.getElementById("gameSpace").appendChild(foodDiv)
		foodDiv.style.left = this.coordinates[0]*16+"px";
		foodDiv.style.bottom = this.coordinates[1]*16+"px";
		console.log(this.coordinates)
	}
}

//setting up game
drawBoard();
for(i=1;i<=6;i++){
	snakeCell = new snakeCellCreate(i*10, 6-i+1);
	snakeCell.pushCell();
	snakeCell.drawCell();
	snakeCell.positionCell(i);
};
console.log(snakeCells)
var direction = "right";
foodDiv = new foodCell;
foodDiv.drawCell();
snakeMovement = new snakePosition();
snakeMovement.keyListener();
var interval = setInterval(function () {snakeMovement.beginMove(direction)},300);



