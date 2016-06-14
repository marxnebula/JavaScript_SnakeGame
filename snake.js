$(document).ready(function(){
    
	// Make the canvas
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	
	// Set the width and height
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	// Snake cells width size
	var cellWidth = 10;
	
	// Direction of the snake
	var direction;
	
	// Food
	var food;
	
	// Score to be displayed
	var score;
	
	
	
	function init()
	{
	    // Set the default direction to right
		direction = "right";
		
		// Set score to 0
		score = 0;
		
		// Call the function creare_snake()
		create_snake();
		
		// Call the function create_food()
		create_food();
		
		
		if(typeof game_loop != "undefined") 
		{
		    clearInterval(game_loop);
		}
		
		// Move the snake using a timer which will trigger the paint function every 60ms
    	game_loop = setInterval(paint, 60);
	}
	
	// Call init()
	init();
	
	/*  Create the snake */
	
	// Array of cells to make up the snake
	var snake_array;
	
	
	// Function for creating the snake
	function create_snake()
	{
	    //Length of the snake
		var length = 5;
		
		//Empty array to start with
		snake_array = [];
		
		// Loop
		for(var i = length-1; i>=0; i--)
		{
			// This will create a horizontal snake starting from the top left
			snake_array.push({x: i, y:0});
		}
	}
	
	
	// Function to create the food
	function create_food()
	{
	    
	    //This will create a cell with x/y between 0-44
		//Because there are 45(450/10) positions accross the rows and columns
		food = {
			x: Math.round(Math.random()*(w-cellWidth)/cellWidth), 
			y: Math.round(Math.random()*(h-cellWidth)/cellWidth), 
		};
		
		
	}
	
	
	
	// Paint the snake
	function paint()
	{
	    
	    
	    // To avoid the snake trail you need to paint the BG on every frame
		// Paint the canvas now
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
	    
	    /* The movement code for the snake to come here.
	     * Remove the tail cell and place it infront of the head cell.
	     */
		
		// Get the head cell
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		
		// Increment it to get the new head position
		// So add proper direction based movement now
		if(direction == "right") 
		{
		    nx++;
		}
		else if(direction == "left")
		{
		    nx--;
		}
		else if(direction == "up") 
		{
		    ny--;
		}
		else if(direction == "down")
		{
		    ny++;
		}
		
		
		// Checks to see if gameover.
		// This will restart the game if the snake hits the wall or
		// if the head of the snake bumps into its body
		if(nx == -1 || nx == w/cellWidth || ny == -1 || ny == h/cellWidth || check_collision(nx, ny, snake_array))
		{
			// Restart the game
			init();
			
			return;
		}
		
		// Code for snake eating the food
		// If the new head position matches with that of the food, then
		// Create a new head instead of moving the tail
		if(nx == food.x && ny == food.y)
		{
		    // Set tail
			var tail = {x: nx, y: ny};
			
			// Add 1 to score
			score++;
			
			// Create the new food
			create_food();
		}
		else
		{
			// Removes the last cell
		    var tail = snake_array.pop();
		
		    // Set the tail.x to nx and tail.y to ny
		    tail.x = nx;
		    tail.y = ny;
		}
		
		
		
		
		
		// Puts back the tail as the first cell
		snake_array.unshift(tail);
		
		
	    
	    // Loop through the snake array
		for(var i = 0; i < snake_array.length; i++)
		{
		    // Current snake index
			var snakeTemp = snake_array[i];
			
			// Call the function paint_cell to paint the snake
			paint_cell(snakeTemp.x, snakeTemp.y);
			
		}
		
		// Call the fucntion paint_cell to paint the food
		paint_cell(food.x, food.y);
		
		// Paint the users score
		var score_text = "Score: " + score;
		ctx.fillText(score_text, 5, h-5);
	}
	
	// Function painting a cell
	function paint_cell(x,y)
	{
	    // Paint blue cells the size of cellWidth variable
		ctx.fillStyle = "blue";
		ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
	}
	
	
	//This function checks if the provided x/y coordinates exist in an array of cells or not
	function check_collision(x, y, array)
	{
	    // Loop through the array
		for(var i = 0; i < array.length; i++)
		{
		    // If the array index i equals x/y
			if(array[i].x == x && array[i].y == y)
			{
			    // Return true
			    return true;
			}
		}
		
		// Return false
		return false;
	}
	
	
	// Function for the keyboard controls
	$(document).keydown(function(e){
	    
	    // Get the key
		var key = e.which;
		
		// If key 37 is down and direction is not right
		if(key == "37" && direction != "right") 
		{
		    // Set direction to left
		    direction = "left";
		}
		// If key 38 is down and direction is not down
		else if(key == "38" && direction != "down") 
		{
		    // Set direction to up
		    direction = "up";
		}
		// If key 39 is down and direction is not left
		else if(key == "39" && direction != "left") 
		{
		    // Set direction to right
		    direction = "right";
		}
		// If key 40 is down and direction is not up
		else if(key == "40" && direction != "up") 
		{
		    // Set direction to down
		    direction = "down";
		}
	})
	
	
	
	
})