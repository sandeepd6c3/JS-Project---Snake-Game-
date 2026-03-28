// Snake Game JavaScript Code

// Select the game board element from the DOM
let Board=document.querySelector(".Board");

const startbutton=document.querySelector(".btn-start")
const modal=document.querySelector(".modal");

const startgamemodal=document.querySelector(".start-game");
const gameovermodal=document.querySelector(".game-over");
const restartbutton=document.querySelector(".btn-restart");


const highscoreElement=document.querySelector("#high-score");
const scoreElement=document.querySelector("#score");
const timeElement=document.querySelector("#time");


let highscore=0; 
let score=0;
let time=`00-00`;

// Define block dimensions (height and width in pixels)
 const blockheight=40;
    const blockwidth=40;
    let setIntervalId=null;

// Array to store references to all block elements for easy access
const blocks =[];

// Calculate the number of columns and rows based on board size and block size
    const cols=Math.floor(Board.clientWidth/blockwidth);
    const rows=Math.floor(Board.clientHeight/blockheight);

// Initial snake position as an array of objects with x (row) and y (column) coordinates
   let  snake=[{x:1,y:3}]

// Initial direction of the snake movement
let direction='right';

let food ={
  x:Math.floor(Math.random()*rows ),
  y:Math.floor(Math.random()*cols),
}

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

       let head=null

  blocks[`${food.x}-${food.y}`].classList.add("food");


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

    if(head.x<0 || head.x>=rows ||head.y<0 || head.y>=cols){
      
      clearInterval(setIntervalId)
      
      modal.style.display="flex"

      startgamemodal.style.display="none";
      gameovermodal.style.display="flex";
      return;
    }

    if(head.x==food.x && head.y==food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food ={
        x:Math.floor(Math.random()*rows ),
           y:Math.floor(Math.random()*cols),
}
 blocks[`${food.x}-${food.y}`].classList.add("food");
 snake.unshift(head);
 score+=10;
 scoreElement.innerText=score;
    }

// Remove 'fill' class from current snake positions before moving
    snake.forEach(segment => {
      blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
    });

// Add new head to the front of the snake
    snake.unshift(head);

    
   
// Remove the tail to maintain snake length
    snake.pop();

      snake.forEach(segment=>{
        console.log(segment);
        blocks[`${segment.x}-${segment.y}`].classList.add('fill');
        
        
      })

      }

// Game loop that runs every 500ms to move the snake
//    setIntervalId=setInterval(()=>{
   
// // Render the updated snake
// render();
//    },200)     

startbutton.addEventListener("click",()=>{
  modal.style.display="none"
    setIntervalId=setInterval(() => {
      render();

    }, 500);
   })


   restartbutton.addEventListener("click",restartgame)

   function restartgame(){
clearInterval(setIntervalId);

     modal.style.display="none";
 
blocks[`${food.x}-${food.y}`].classList.remove("food");

snake.forEach(segment=>{
        console.log(segment);
        blocks[`${segment.x}-${segment.y}`].classList.remove('fill');
        
        
      })

     snake=[{x:1,y:3}]
      direction='right';

     food ={ x:Math.floor(Math.random()*rows ), y:Math.floor(Math.random()*cols),}

     setIntervalId=setInterval(() => {render()}, 500);
   }

   addEventListener("keydown",(event)=>{
   if(event.key=="ArrowUp"){
    direction='up'
   }else if (event.key=="ArrowDown"){
    direction='down'
   }
   else if(event.key=="ArrowLeft"){
    direction='left'
   }
   else if (event.key=="ArrowRight"){
    direction='right'
   }
    
   })

    