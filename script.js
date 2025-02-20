 const boxes = document.querySelectorAll(".box")
 const gameInfo = document.querySelector(".game-info")
 const newGameBtn = document.querySelector(".btn")

 let currentPlayer;
 let gameGrid;

 const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];

//lets create  a function to initialse the game
 function initGame(){
       currentPlayer = "X";
      gameGrid = ["","","","","","","","",""];
//UI pr empty bhi krna pdega boxes ko
boxes.forEach((box,index)=>{
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //initialise box with css properties again     (remove green background after win)
    box.classList=`box box${index+1}` 
})


    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}`
 }
 
   initGame();

 function swapTurn() {
    if(currentPlayer === "X") {
       currentPlayer = "O";
     }
      else {
       currentPlayer = "X";
    }
    //UI update
     gameInfo.innerText = `Current player - ${currentPlayer}`
 }

 function cheakGameOver(){
    let answer = "";

     winningPositions.forEach((position)=>{
      //all three boxes should be non-empty and exectly same in value
            if( (gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
      && (gameGrid[position[0]] === gameGrid[position[1]])&&(gameGrid[position[1]]=== gameGrid[position[2]])){
   //check if winner is X
   if(gameGrid[position[0]] === "X")
       answer = "X" ;
      else 
      answer = "O"

      //disable pointer events
      boxes.forEach((box)=>{
         box.style.pointerEvents = "none"
      //now we know X or O is winner

    
})

         boxes[position[0]].classList.add("win");
         boxes[position[1]].classList.add("win");
         boxes[position[2]].classList.add("win");


         }
   })

    

      if(answer !==""){
         gameInfo.innerText = `Winner Player - ${answer}`;
         newGameBtn.classList.add("active")
         return;
      }

//when there is no winner and all boxes are filled
let fillcount = 0;
   gameGrid.forEach((box)=>{
   if(box !=="")
   fillcount++;
})
      //board is filled ,game is tied
      if(fillcount === 9){
      gameInfo.innerText = "Game Tied!";
     newGameBtn.classList.add("active")
}


 }

 function handleClick(index){
    if(gameGrid[index] === "" ) {
        boxes [index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //for swap turn
        swapTurn();
        
        //cheak if any win..
        cheakGameOver();
    }
 }

  boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
        
    })
  }); 


  newGameBtn.addEventListener("click",()=>{
   initGame()
  })
