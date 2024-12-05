let playerName = prompt("Enter your name:");
if (!playerName) {
 playerName = "Player";
}


document.getElementById("playerName").textContent = playerName;


const images = [
 './icon/apple.png',
 './icon/bananas.png',
 './icon/strawberry.png',
 './icon/cherries.png',
 './icon/orange.png'
];


let attempts = 0;
let gameOver = attempts >= 3 ? true : false;


document.getElementById('startGameButton').addEventListener('click', startGame);
document.getElementById('restartGameButton').addEventListener('click', restartGame);


function getRandomImage(excludeImages = []) {
 const filteredImages = images.filter(image => !excludeImages.includes(image));
 const randomIndex = Math.floor(Math.random() * filteredImages.length);
 return filteredImages[randomIndex];
}


function startGame() {
 if (attempts >= 3) {
   gameOver = true;
 }


 if (gameOver) {
   document.getElementById('resultMessage').textContent = 'You have used all attempts. Click Restart';
   document.getElementById('restartGameButton').style.display = 'block';
   document.getElementById('startGameButton').style.display = 'none';
 } else {
   attempts++;
   document.getElementById('attemptCount').textContent = `Attempts: ${attempts}`


   const rows = document.querySelectorAll('.row');;
   const columnImages = [[], [], []];


   rows.forEach((row) => {
     const items = row.querySelectorAll('.item');
     items.forEach((item, colIndex) => {
       const usedImages = columnImages[colIndex];
       const randomImage = getRandomImage(usedImages);
       usedImages.push(randomImage);
       item.style.backgroundImage = `url(${randomImage})`;
       item.classList.remove('highlight');
     });
   });


   checkWin(rows);
 }
}


function checkWin(rows) {
 for (const row of rows) {
   const items = row.querySelectorAll('.item');
   const firstImage = items[0].style.backgroundImage;


   const allSame = Array.from(items).every(item => item.style.backgroundImage === firstImage);


   if (allSame && firstImage !== "") {
     document.getElementById('resultMessage').textContent = `${playerName}, you won!`;
     document.getElementById('restartGameButton').style.display = 'block';
     document.getElementById('startGameButton').style.display = 'none';
     highlightWinningCells();
   }
 }
}


function highlightWinningCells() {
 const rows = document.querySelectorAll('.row');
 rows.forEach(row => {
   const items = row.querySelectorAll('.item');
   const firstImage = items[0].style.backgroundImage;
   const allSame = Array.from(items).every(item => item.style.backgroundImage === firstImage);


   if (allSame && firstImage !== "") {
     items.forEach(item => {
       item.classList.add('highlight');
     });
   }
 });
}


function restartGame() {
 gameOver = false;
 attempts = 0;
 document.getElementById('attemptCount').textContent = `Attempts: ${attempts}`;
 document.getElementById('startGameButton').disabled = false;
 document.getElementById('startGameButton').style.display = 'block';
 document.getElementById('resultMessage').textContent = '';
 document.getElementById('restartGameButton').style.display = 'none';
 clearBoard();
}


function clearBoard() {
 const rows = document.querySelectorAll('.row');
 rows.forEach(row => {
   const items = row.querySelectorAll('.item');
   items.forEach(item => {
     item.style.backgroundImage = '';
     item.classList.remove('highlight');
   });
 });
}
