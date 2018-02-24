var rows = 6;
var columns = 8;
var board = new GameBoard(rows,columns);

board.set(0,1,true);
board.set(1,1,true);
board.set(2,1,true);




board.printBoard();



$(document).ready(function(){
	var table = '';
	for (var i = 0; i < board.rows; i++){
		table += '<tr>';
		for (var j = 0; j < board.columns; j++){
			if (board.get(i,j)){
				table +='<td data-alive="true"></td>';
			} else {
				table +='<td data-alive="false"></td>';
			}
		}
		table += '</tr>';
	}
	$('#board').append(table);
});

