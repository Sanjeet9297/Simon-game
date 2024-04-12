let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

//sound effect--------------------------
let endSound = document.querySelector(".endSound");
let gameOverSound = function () {
  endSound.play();
};
let btnsSound = document.querySelector(".btnSound");
let btnSound = function () {
  btnsSound.play();
};
let sbtnSound = document.querySelector(".sbtnSound");
let startbtnSound = function () {
  sbtnSound.play();
};

//start game----------------
let startbtn = document.querySelector(".start");
startbtn.addEventListener("click", function () {
  if (started == false) {
    console.log("game is started");
    started = true;
    startbtn.innerText = "End";
    startbtn.style.backgroundColor = "red";
    levelUp();
    startbtnSound();
  } else {
    startbtn.style.backgroundColor = "blue";
    startbtn.innerText = "Start";
    startbtnSound();
    reset();
  }
});

//flaxh buttons & level up ----------------------
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(() => {
    btn.classList.remove("userFlash");
  }, 200);
  btnSound();
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);

  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);

  gameFlash(randBtn);
}
let currlevel = 0;
function checkAns(idx) {
  // console.log(`curr level : ${level}`);
  if (userSeq[idx] === gameSeq[idx]) {
    // console.log("same value");
    if (userSeq.length == gameSeq.length) {
      setTimeout(() => levelUp(), 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>Press Start Button To Start`;
    document.querySelector("body").style.backgroundColor = "red";
    startbtn.style.backgroundColor = "blue";

    gameOverSound();

    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "black";
    }, 100);
    // document.querySelector("body").style.backgroundColor  = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "red";
    }, 200);
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "black";
    }, 300);
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "red";
    }, 400);
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "black";
    }, 500);

    let highScore = document.querySelector("h1.highscore");

    if (currlevel >= level) {
      highScore.innerText = `Your High Score is ${currlevel}.`;
    } else {
      highScore.innerText = `Your High Score is ${level}.`;
      currlevel = level;
    }
    reset();
  }
}

//button event listeners ------------------------
function btnPress() {
  // console.log("btn was pressed");
  // console.log(this);
  let btn = this;
  userFlash(btn);
  // let userColor = this.id;
  let userColor = this.getAttribute("id");
  console.log(userColor);
  userSeq.push(userColor);
  console.log(userSeq);

  checkAns(userSeq.length - 1);
}
let allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  startbtn.innerText = "Start";

  // highScore.innerText ="";
}
