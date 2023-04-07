import { Car } from './car.js';
import { Life } from './life.js';
import { Background } from './background.js';

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;

const back = new Background(context, 2000, 1200);
const life = new Life(context, 5, 5);
const car = new Car(context, life);

const gameoverImage = new Image();
gameoverImage.src = 'photos/GAME-OVER.png';
const tryagainImage = new Image();
tryagainImage.src = 'photos/Press-ENTER.png';
const gameoverImage2 = new Image();
gameoverImage2.src = 'photos/GAME-OVER2.png';
const tryagainImage2 = new Image();
tryagainImage2.src = 'photos/Press-ENTER2.png';
const startImage = new Image();
startImage.src = 'photos/Pres-SPACE.png';
const carstartImage = new Image();
carstartImage.src = 'photos/carstart.gif';


const ButtonBackVoise = document.querySelector('.voise1');
const backaudio = document.querySelector('.audio1');
backaudio.volume=0.4;
backaudio.loop = true;

const howToPlayButton = document.querySelector(".HowToPlay");
const shopButton = document.querySelector(".shop");
const leaderButton = document.querySelector(".leader");
let gameStarted = true;
let score = 0;
let Hscore = 0;

//cheat menu
document.addEventListener('keydown', function (event) {
  if(event.key === 'q') {
  life.decrease();   // kill hero
  }
  if (event.key === 'p') { 
    localStorage.removeItem('leaderboard'); //clear ldboard
  }
});

  BackVoise();
  ButtonBackVoise.onclick = BackVoise;

  drawStartMenu();
  howToPlayButton.addEventListener("click", () => {
    if (gameStarted === true) {
      drawHowToPlay();
      gameStarted = false
      howToPlayButton.textContent = "PLAY";
    } else {
      drawStartMenu();
      gameStarted = true;
      howToPlayButton.textContent = "HOW TO PLAY";
    }
  });
  shopButton.addEventListener("click", () => {
    if (gameStarted === true) {
      drawShop();
      gameStarted = false
      shopButton.textContent = "BACK";
    } else {
      drawStartMenu();
      gameStarted = true;
      shopButton.textContent = "SKINS SHOP";
    }
  });
  leaderButton.addEventListener("click", () => {
    if (gameStarted === true) {
      drawLeader();
      gameStarted = false
      leaderButton.textContent = "BACK";
    } else {
      drawStartMenu();
      gameStarted = true;
      leaderButton.textContent = "LEADER BORD:";
    }
  });

//Start screen
function startGame() { 
  score=score+Hscore;

    life.count = 3;
    let timeLeft = document.getElementById("timer").value;
    let time = timeLeft;
    let main = new Main();
  
let timerInterval2 = setInterval(() => {
context.clearRect(0, 0, canvas.width, canvas.height);
if (timeLeft <= 0 || life.count === 0) {
  gameStarted = false;
  drawEndMenu();
  clearInterval(timerInterval2);
  return;
}
main.update();
main.draw();

context.fillStyle = "white";
context.font = "30px Arial";
context.fillText(`Time left: ${timeLeft}`, 400, 40);
}, 1000 / 60);

let timerInterval = setInterval(() => {
  timeLeft -= 1;

  if (timeLeft <= 0 || life.count === 0) {
    gameStarted = false;
    drawEndMenu();
    Hscore=time-timeLeft;
    score = Hscore + score;
    clearInterval(timerInterval);
    return;
  }
}, 1000);
localStorage.setItem('score', score);
  }

//Start Menu screen
function drawStartMenu() {
  const backgroundImage = new Image();
  backgroundImage.src = 'photos/Back_start.jfif';

  backgroundImage.onload = function() {
    context.drawImage(backgroundImage, 0, 0);
    context.drawImage(startImage, 150, 200);
    context.drawImage(carstartImage, 250, 200);
  };

  document.addEventListener('keydown', function (event) {
    if (gameStarted && event.key === ' ') {
    life.count = 3;
    startGame();
    }
    });
}

//Game over screen
function drawEndMenu() {
  let savedScore = localStorage.getItem('score');
if (savedScore > score) {
  score = savedScore;
  localStorage.setItem('score', score);
} else {
  score = score;
}

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      life.count = 3;
      gameStarted = true;
      drawStartMenu();
     }
    });

    const backgroundImage = new Image();
    backgroundImage.src = 'photos/back_die.jpg';
    const backgroundImage2 = new Image();
    backgroundImage2.src = 'photos/back_start2.jfif';
    if(life.count ===0){
      backgroundImage.onload = function() {
        context.drawImage(backgroundImage, 0, 0);
        context.drawImage(gameoverImage, 240, 150);
        context.drawImage(tryagainImage, 240, 250);
      };
    }
    if(life.count > 0){
      backgroundImage.onload = function() {
        context.drawImage(backgroundImage2, 0, 0);
        context.drawImage(gameoverImage2, 240, 150);
        context.drawImage(tryagainImage2, 240, 250);
      };
    }
}

//Hudba
function BackVoise() {
  if (backaudio.paused) {
    backaudio.play();
    ButtonBackVoise.textContent = 'OFF';
    ButtonBackVoise.style.backgroundImage = "url('photos/sound.png')";
  }else {
    backaudio.pause();
    ButtonBackVoise.textContent = 'ON';
    ButtonBackVoise.style.backgroundImage = "url('photos/mutesound.png')";
  }
}
    
//Howtoplay menu
function drawHowToPlay() {
  const modalX = 0;
  const modalY = 0;
  const modalWidth = 1000;
  const modalHeight = 600;


  context.fillStyle = "green";
  context.fillRect(modalX, modalY, modalWidth, modalHeight);

  context.fillStyle = "white";
  context.font = "bold 24px Verdana";
  context.textAlign = "center";
  context.fillText("How play in this game?", modalX + modalWidth / 2, modalY + 50);

  context.font = "16px Arial";
  context.textAlign = "left";
  context.fillText("⓵ To start the game, write how long you want to play the round in the box on the left.", modalX + 20, modalY + 100);
  context.fillText("⓶ Press the space bar to start the game. The bottom line is very simple. In order to win, you have to live the time you specified before", modalX + 20, modalY + 125);
  context.fillText("you started. Also, if your character dies, you start the game all over again.", modalX + 40, modalY + 150);
  context.fillText("⓷ Before the start of the next round you can spend your earned points in the skin store for the hero, see the leaderboard,", modalX + 20, modalY + 175);
  context.fillText("specify a new time that you want to live.", modalX + 40, modalY + 200);
  context.fillText("⓸ Points for victory are awarded 1 to 1, but for defeat 1 to 1/2", modalX + 20, modalY + 225);

  const image1 = new Image();
  image1.src = "photos/arrows.png";
  image1.onload = function() {
    context.drawImage(image1, modalX + 125, modalY + 350, 160, 160);
    context.fillText("Use the arrow keys on your keyboard to move your character.", modalX + 10, modalY + 520);
  };
  const image2 = new Image();
  image2.src = "photos/shift.png";
  image2.onload = function() {
    context.drawImage(image2, modalX + 400, modalY + 250, 260, 100);
    context.fillText("Use the shift button to speed up your character for 5 seconds", modalX + 300, modalY + 360);
    context.fillText("but remember the cooldown is 10 seconds.", modalX + 350, modalY + 380);
  };
  const image3 = new Image();
  image3.src = "photos/123.jpg";
  image3.onload = function() {
    context.drawImage(image3, modalX + 750, modalY + 350, 160, 160);
    context.fillText("Use buttons 1 , 2 and 3 to use your available bonuses.", modalX + 605, modalY + 525);
  };
}

//Shop menu
function drawShop() {
  context.fillStyle = "green";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "white";
  context.font = "bold 24px Verdana";
  context.textAlign = "center";
  context.fillText("SHOP:", 500,50);

  context.textAlign = "left";
  context.fillText("SOON", 25,100);
}

//Leader Bord
function drawLeader() {

  context.fillStyle = "green";
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  context.fillStyle = "white";
  context.font = "bold 36px Verdana";
  context.textAlign = "center";
  context.fillText("LeaderBord:", 500,50);
  
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  let playerName = document.getElementById("name").value;
  let existingPlayer = leaderboard.find(player => player.name === playerName);
  if (existingPlayer) {
  existingPlayer.score += Hscore;
  existingPlayer.date = new Date();
  } else {
  leaderboard.push({score: Hscore, date: new Date(), name: playerName});
  }
  
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 10);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  
  context.fillStyle = "white";
  context.font = "bold 22px Verdana";
  context.fillText("Date", 150, 100);
  context.fillText("Name", 500, 100);
  context.fillText("Score", 850, 100);
  
  context.fillStyle = "white";
  context.font = "18px Arial";
  for (let i = 0; i < leaderboard.length; i++) {
  context.fillText(leaderboard[i].date.toLocaleString(), 150, 130 + i * 30);
  context.fillText(leaderboard[i].name, 500, 130 + i * 30);
  context.fillText(leaderboard[i].score, 850, 130 + i * 30);
  }
}

//main
class Main {
constructor() {
this.lives = 3;
this.scoreCount = document.querySelector('#scorecount');
}

update() {
this.scoreCount.textContent = `Points: ${score}`;
car.update();
}

draw() {
back.draw(car.x, car.y);
life.draw();
car.draw();
}
}