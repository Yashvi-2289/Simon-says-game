let gameseq = [];
let userseq = [];
let h2 = document.querySelector("h2");
let btns = ["blue", "pink", "green", "yellow"];
let started = false;
let level = 0;
let highscore = 0;

document.addEventListener("keypress", function () {
    if (!started) {
        document.getElementById("gamestartsound").play();
        let p = document.querySelector("p");
        p.innerHTML = " ";
        started = true;
        levelup();
    }
});

const button = document.querySelector("button");
button.addEventListener("click", function () {
    if (!started) {
        document.getElementById("gamestartsound").play();
        console.log("game is started");
        started = true;
        levelup();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameflash");
    setTimeout(function () {
        btn.classList.remove("gameflash");
        document.getElementById("clicksound").play();
    }, 300);
}

function userFlash(btn) {
    if (started) {
        btn.classList.add("userflash");
        setTimeout(function () {
            btn.classList.remove("userflash");
        }, 300);
    }
}

function checkbtn(idx) {
    console.log(`${level}`);
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        document.getElementById("gameoversound").play();
        if (started) {
            instruction();
            setTimeout(function () {
                lose.innerHTML = "";
            }, 4000);
            setTimeout(reset, 300);
            document.body.style.backgroundColor = "rgba(169, 164, 168, 1)";
            setTimeout(function () {
                document.body.style.backgroundColor = "rgb(11, 32, 61)";
            }, 300);
        }
    }
}

function btnpress() {
    let pressedbtn = this;
    userFlash(pressedbtn);
    let usercolor = pressedbtn.getAttribute("id");
    userseq.push(usercolor);
    checkbtn(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnpress);
}

function levelup() {
    highscorecheck();
    userseq = [];
    level++;
    h2.innerText = `⭐ level ${level}`;
    let ranidx = Math.floor(Math.random() * btns.length);
    let rancolor = btns[ranidx];
    let randbtn = document.querySelector(`#${rancolor}`);
    gameseq.push(rancolor);
    console.log(gameseq);
    gameFlash(randbtn);
}

function reset() {
    gameseq = [];
    userseq = [];
    started = false;
    level = 0;
    h2.innerHTML = `Press Any Key To Start a game or <br> Click The Button`;
    lose.innerHTML = "";
}

function highscorecheck() {
    if (level > highscore) {
        highscore = level;
        console.log(`The highest score is ${highscore}`);
        let h3 = document.querySelector("h3");
        h3.innerHTML = `🏆High Score: <b>${highscore}</b>`;
    }
}

function instruction() {
    let lose = document.getElementById("lose");
    lose.innerHTML = `You Lose the Game! Your Score is <b>${level - 1}</b>.`;
}
