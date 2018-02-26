Game of Life
author: Evan Hanawalt

how to run:
To run the program, open view.html in your web browser. (i tested using firefox)

basic user instructions:
To mark cells as alive, click on them, live cells will display as red.
buttons:
">" will iterate the game 1 generation.
"Start" will start the game.
"Stop" will stop the game.
"Clear" will stop the game and kill all live cells.
"Resize" will stop the game and change your game board to the new dimensions.

how to test:
To run unit tests, open tests.html in your web browser.


features:
* both manual iterating and free running game
* html GUI
* board clearing
* board resizing


discussion:
	First I designed the GameBoard class to model the game's data and implement 
	its updating algorithm to separte the data model from the UI. Next, in 
	game-of-life.js I wrote the controller to insert an html table that would 
	represent the board based on the existing data model. After this, I added 
	the code that would listen for user input from buttons in view.html and act 
	on the data model and view as desired.

	I used the jQuery library for easy html manipulation and listeners, and 
	QUnit for writing unit tests for the data model and manipulations, both 
	of which are included through CDNs so internet connection is required for 
	the program to run properly