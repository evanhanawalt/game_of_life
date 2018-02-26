var rows = 20;
var columns = 20;
var board = new GameBoard(rows,columns);
var isRunning = false;
var timerID;

board.set(0,1,true);
board.set(1,1,true);
board.set(2,1,true);


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
	$('#board').append(table);
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

function runGame(){
	board.update();
	updateBoardHtml();
}
board.update();
$(document).ready(function(){
	
	createBoardHtml();

	//Set on click listens for all buttons

	$('td').click(function(){
		console.log($(this).attr('id'));
		var rowAndColumn = $(this).attr('id').split('-');
		var row = parseInt(rowAndColumn[0]);
		var column = parseInt(rowAndColumn[1]);
		console.log(row);
		console.log(column);
		//updates board data and view
		board.set(row, column, !board.get(row,column));
		updateBoardHtml();
	});

	$('#button-clear').click(function(){
		//create new board and update view
		board = new GameBoard(rows,columns);
		updateBoardHtml();
	});

	$('#button-update-once').click(function(){
		//iterate game and update view
		runGame()
	})

	$('#button-start-stop').click(function(){
		if(isRunning){
			clearInterval(timerID);
		} else {
			timerID = setInterval(runGame, 300);
		}
		isRunning = !isRunning;
		updateIsRunningButton();
	})


});

