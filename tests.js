/*
tests.js includes tests of the game board functionality for modeling the game's data.
author: Evan Hanawalt
*/

//helper function to test what cells are alive/dead
//all live cells should be included in liveCells array as strings w/form '<row#>,<column#>'
function boardValuesAreCorrect(board, liveCells = []){
	for(var i = 0; i < board.rows; i++){
		for(var j = 0; j < board.columns; j++){
			var liveCellCheck = i + ',' + j;

			if (liveCells.includes(liveCellCheck)){
				//cell should be alive, if not return false
				if (board.get(i,j) ==false){ return false; }
			} else {
				//cell should be dead, if not return false
				if (board.get(i,j) == true){ return false; }
			}
		}
	}
	return true;
}

//tests small size board creation
QUnit.test( '2X2 Empty Board Creation', function( assert ) {
	var board = new GameBoard(2,2);
	assert.equal(board.board.length, 2, 'Row length correct' );
	assert.equal(board.board[0].length, 2, 'Column length correct' );
	assert.ok(boardValuesAreCorrect(board), 'All cells are dead');
	
});

//tests larger size board creation
QUnit.test( '6X8 Empty Board Creation', function( assert ) {
	var board = new GameBoard(6,8);
	assert.equal(board.board.length, 6, 'Row length correct' );
	assert.equal(board.board[0].length, 8, 'Column length correct' );
	assert.ok(boardValuesAreCorrect(board), 'All cells are dead');
});

//tests 1 update of board
QUnit.test( '6X8 Board With Live Cells and update', function( assert ) {
	var board = new GameBoard(6,8);
	board.set(0,0,true);
	board.set(1,1,true);
	board.set(2,2,true);
	var liveCellsBefore = ['0,0','1,1','2,2'];
	var liveCellsafter = ['1,1'];
	assert.equal(board.board.length, 6, 'Row length correct' );
	assert.equal(board.board[0].length, 8, 'Column length correct' );
	assert.ok(boardValuesAreCorrect(board, liveCellsBefore), 'Cells (0,0),(1,1),(2,2) are alive initially');
	board.update();
	assert.ok(boardValuesAreCorrect(board, liveCellsafter), 'Cell (1,1) is alive after update');
});

//tests multiple updates of board
QUnit.test( '6X8 Board With Live Cells and multiple updates', function( assert ) {
	var board = new GameBoard(6,8);
	board.set(1,0,true);
	board.set(1,1,true);
	board.set(1,2,true);
	var liveCellsBefore = ['1,0','1,1','1,2'];
	var liveCellsafter = ['0,1','1,1','2,1'];
	assert.equal(board.board.length, 6, 'Row length correct' );
	assert.equal(board.board[0].length, 8, 'Column length correct' );
	assert.ok(boardValuesAreCorrect(board, liveCellsBefore), 'Cells (1,0),(1,1),(1,2) are alive initially');
	board.update();
	assert.ok(boardValuesAreCorrect(board, liveCellsafter), 'Cells (0,1),(1,1),(2,1) are alive after 1 update');
	board.update()
	assert.ok(boardValuesAreCorrect(board, liveCellsBefore), 'Cells (1,0),(1,1),(1,2) are alive after 2 updates');
});


//tests functionality of increasing size of board but keeping the same living cells of previous board
QUnit.test( '6X8 Board creation from 2X2 ', function( assert ) {
	var smallBoard = new GameBoard(2,2);
	smallBoard.set(0,0,true);
	smallBoard.set(0,1,true);
	smallBoard.set(1,0,true);
	smallBoard.set(1,1,true);
	var liveCells = ['0,0','0,1','1,0','1,1']
	assert.equal(smallBoard.board.length, 2, '2X2 board row length correct' );
	assert.equal(smallBoard.board[0].length, 2, '2X2 board column length correct' );
	assert.ok(boardValuesAreCorrect(smallBoard,liveCells), 'All cells are alive on 2X2 board');
	var bigBoard = new GameBoard(6,8,smallBoard);
	assert.equal(bigBoard.board.length, 6, '6X8 board row length correct' );
	assert.equal(bigBoard.board[0].length, 8, '6X8 board Column length correct' );
	assert.ok(boardValuesAreCorrect(bigBoard,liveCells), '2X2 grid of cells is alive on 6X8 board');

});


//tests functionality of decreasing size of board but keeping the same living cells of previous board
QUnit.test( '2X2 Board creation from 4X4 board', function( assert ) {
	var bigBoard = new GameBoard(4,4);
	bigBoard.set(0,0,true);
	bigBoard.set(0,1,true);
	bigBoard.set(0,2,true);
	bigBoard.set(0,3,true);
	var liveCells = ['0,0','0,1','0,2','0,3']
	assert.equal(bigBoard.board.length, 4, '4X4 board row length correct' );
	assert.equal(bigBoard.board[0].length, 4, '4X4 board column length correct' );
	assert.ok(boardValuesAreCorrect(bigBoard,liveCells), 'Top row of cells alive on 4X4 Board');
	var smallBoard = new GameBoard(2,2,bigBoard);
	assert.equal(smallBoard.board.length, 2, '2X2 board row length correct' );
	assert.equal(smallBoard.board[0].length, 2, '2X2 board Column length correct' );
	assert.ok(boardValuesAreCorrect(smallBoard,liveCells), 'Top row of cells alive on 2X2 board');

});
