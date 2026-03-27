// Snake Game JavaScript Code

// Select the game board element from the DOM
let Board=document.querySelector(".Board");

// Define block dimensions (height and width in pixels)
 const blockheight=40;
    const blockwidth=40;

// Array to store references to all block elements for easy access
const blocks =[];

// Calculate the number of columns and rows based on board size and block size
    const cols=Math.floor(Board.clientWidth/blockwidth);
    const rows=Math.floor(Board.clientHeight/blockheight);

// Initial snake position as an array of objects with x (row) and y (column) coordinates
    const snake=[{x:5,y:5}]

// Initial direction of the snake movement
let direction='down';

// Create a grid of block elements and store them in the blocks array
    for(let row=0; row<rows; row++){
      for(let col=0; col<cols; col++){
        
        let block=document.createElement('div');
        block.classList.add("block");
        Board.appendChild(block);
        // block.innerText=`${row}-${col}`; // Optional: Uncomment to show coordinates on blocks
        blocks[`${row}-${col}`]=block;
      }
    }

// Function to render the snake on the board by adding 'fill' class to snake segments
    function render(){

      snake.forEach(segment=>{
        console.log(segment);
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
        
        
      })

      }

// Game loop that runs every 500ms to move the snake
   setInterval(()=>{
    let head=null

    // Determine the new head position based on current direction
    if (direction==='left'){
      head={x:snake[0].x,y:snake[0].y-1}

    }else if(direction==='right'){
      head={x:snake[0].x,y:snake[0].y+1}
    }
    else if (direction==='down'){
      head={x:snake[0].x+1,y:snake[0].y}
    }else if (direction==='up'){
head={x:snake[0].x-1,y:snake[0].y}
    }

// Remove 'fill' class from current snake positions before moving
    snake.forEach(segment => {
      blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    });

// Add new head to the front of the snake
    snake.unshift(head);
// Remove the tail to maintain snake length
    snake.pop();
    
// Render the updated snake
render();
   },500)     