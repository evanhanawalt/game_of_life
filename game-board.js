class GameBoard {
	/*
	builds a 2D array of size (rows, columns)
	*/
	constructor(rows = 6, columns = 8){
		this.columns = columns;
		this.rows = rows;
		this.board = [];
		for (var i = 0; i < this.rows; i++){
			this.board.push([]);
			for (var j = 0; j < this.columns; j++){
				this.board[i].push(false);
			}
		}
	}
	/*
	set a cell at (row, column) to be alive or dead (status)
	*/
	set(row, column, status){
		this.board[row][column] = status;
	}
	/*
	returns a count of how many neightbors are alive to the cell at (row, column)
	*/
	numberOfLivingNeighbors(row, column){
		var count = 0;
		console.log(this.rows)
		// loop to count all live neighbor cells (distance 1 in both directions)
		for (var i = -1; i <= 1; i++){
			var neighborRow = row + i;
			// skip step if row is out of bounds
			if(neighborRow < 0 || neighborRow >= this.rows){ continue; }

			for (var j = -1; j<=1; j++){
				var neighborColumn = column + j;
				//skip step if column is out of bounds
				if(neighborColumn < 0 || neighborColumn >= this.columns){ continue; }

				if (this.board[neighborRow][neighborColumn]){
					count++;
				}
			}
		}
		return count;
	}
	
	/*
	update the board to the next generation based on the current board
	rules:
		< 2 live neighbors -> dead
		= 2 live neighbors -> no change
		= 3 live neighbors -> alive
		> 3 live neighbors -> dead
	*/
	update(){
		for (var i = 0; i < this.rows; i++){
			for (var j = 0; j < this.columns; j++){
				var liveNeighbors = this.numberOfLivingNeighbors(i,j);
				
				if (liveNeighbors < 2){
					this.set(i,j,false);
				} else if (liveNeighbors > 3){
					this.set(i,j,false);
				} else if (liveNeighbors == 3){
					this.set(i,j,true);
				}
			}
		}
	}

	printBoard(){
		
		for (var i = 0; i < this.rows; i++){
			var line = ''
			for (var j = 0; j < this.columns; j++){
				line += String(this.board[i][j]) + ',';
			}
			console.log(line)
			console.log('');

		}

	}
}