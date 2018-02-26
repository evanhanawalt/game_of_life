/*
game-of-life.js includes functionality for user interface interactions 
and connects the UI with the GameBoard class which models the game's data
author: Evan Hanawalt
*/



var rows = 20;
var columns = 20;
var board = new GameBoard(rows,columns);
var isRunning = false;
var timerID;

/*
createBoardHtml creates a new board to insert into the UI 
based on the data in the board variable, also used for resizing
*/
function createBoardHtml(){
	var table = '';
	for (var i = 0; i < board.rows; i++){
		table += '<tr>';
		for (var j = 0; j < board.columns; j++){
			if (board.get(i,j)){
				table +='<td id="'+i+'-'+j+'" data-alive="true"></td>';
			} else {
				table +='<td id="'+i+'-'+j+'" data-alive="false"></td>';
			}
		}
		table += '</tr>';
	}
	$('#board').html(table);
}

/*
setCellOnClickListeners sets the listener which toggles cells alive/dead it is 
a separate function so that it can set new listeners when the board is resized
*/
function setCellOnClickListeners(){
	$('td').click(function(){
		if (!isRunning){
			console.log($(this).attr('id'));
			var rowAndColumn = $(this).attr('id').split('-');
			var row = parseInt(rowAndColumn[0]);
			var column = parseInt(rowAndColumn[1]);
			console.log(row);
			console.log(column);
			//updates board data and view
			board.set(row, column, !board.get(row,column));
			updateBoardHtml();
		}
	});
}
/*
updates the board html to match the data model
*/
function updateBoardHtml(){
	for (var i = 0; i < board.rows; i++){
		for (var j = 0; j < board.columns; j++){
			$('td#'+i+'-'+j).attr('data-alive',board.get(i,j));
		}
	}
}

/*
updates the start stop button html
*/
function updateIsRunningButton(){
	if (isRunning){
		$('#button-start-stop').html('Stop');
	} else {
		$('#button-start-stop').html('Start');
	}
}

/*
iterates 1 generation of game and updates view
*/
function iterateGame(){
	board.update();
	updateBoardHtml();
}


//main script
$(document).ready(function(){
	
	createBoardHtml();
	
	//set on click listens for all buttons
	setCellOnClickListeners();

	//'clear' on click listener
	$('#button-clear').click(function(){
		//create new board and update view
		if(isRunning){
			clearInterval(timerID);
			isRunning = false;
			updateIsRunningButton();
		}
		board = new GameBoard(rows,columns);
		updateBoardHtml();
	});

	//'>' on click listener
	$('#button-update-once').click(function(){
		//iterate game and update view
		iterateGame()
	})

	//'start/stop' on click listener
	$('#button-start-stop').click(function(){
		if(isRunning){
			clearInterval(timerID);
		} else {
			timerID = setInterval(iterateGame, 500);
		}
		isRunning = !isRunning;
		updateIsRunningButton();
	})

	//'resize' on click listener
	$('form#form-resize').submit(function( event ) {
		//stop if game is running
		if(isRunning){
			clearInterval(timerID);
			isRunning = false;
			updateIsRunningButton();
		}
		//get new dimensions and create new board
		rows = parseInt($('input[name="rows"]' ).val());
		columns = parseInt($('input[name="columns"]').val());
		board = new GameBoard(rows, columns, board);
		createBoardHtml();
		//set listeners for new cells
		setCellOnClickListeners();
		// prevents resetting page
		event.preventDefault();
	});

});

