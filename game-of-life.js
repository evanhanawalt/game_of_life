var rows = 20;
var columns = 20;
var board = new GameBoard(rows,columns);
var isRunning = false;
var timerID;

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

function updateBoardHtml(){
	for (var i = 0; i < board.rows; i++){
		for (var j = 0; j < board.columns; j++){
			$('td#'+i+'-'+j).attr('data-alive',board.get(i,j));
		}
	}
}

function updateIsRunningButton(){
	if (isRunning){
		$('#button-start-stop').html('Stop');
	} else {
		$('#button-start-stop').html('Start');
	}
}

function iterateGame(){
	board.update();
	updateBoardHtml();
}
board.update();

//main script
$(document).ready(function(){
	
	//create board of correct dimensions
	createBoardHtml();

	
	//set on click listens for all buttons

	//cell on click listener, toggles alive or dead
	setCellOnClickListeners();

	//'clear' on click listener
	$('#button-clear').click(function(){
		//create new board and update view
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
		
	$('form#form-resize').submit(function( event ) {
		if(isRunning){
			clearInterval(timerID);
			isRunning = false;
			updateIsRunningButton();
		}

		rows = parseInt($('input[name="rows"]' ).val());
		columns = parseInt($('input[name="columns"]').val());
		console.log('rows' + rows);
		console.log('columns' + columns);
		board = new GameBoard(rows, columns, board);
		createBoardHtml();
		setCellOnClickListeners();
		// prevents resetting page
		event.preventDefault();
	});

});

