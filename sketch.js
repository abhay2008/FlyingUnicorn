var unicorn;
var pipes = [];
var score = 0;
var mic;
var sliderTop;
var sliderBottom;
var clapping = false;
var gameStarted = false;
var gameInfo = true;
var gameOver = false;
var gameWon = false;
var backgroundImg;
var jump1, jump2;
var gamewin;
var gameover1, gameover2;
var checkpoint;


function preload() {
  backgroundImg = loadImage('background.jpg');
  jump1 = loadSound("jump1.mp3");
  jump2 = loadSound("jump2.mp3");
  gamewin = loadSound("gamewin.wav");
  gameover1 = loadSound("gameover1.wav");
  gameover2 = loadSound("gameover2.wav");
  checkpoint = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(900, 500);
  mic = new p5.AudioIn();
  mic.start();
  unicorn = new Unicorn();
  sliderTop = createSlider(0, 1, 0.3, 0.1);
  sliderBottom = createSlider(0, 1, 0.1, 0.1);
}

function draw() {
  background(backgroundImg);

  var vol = mic.getLevel();
  fill("lime");
  stroke(255, 0, 250);
  strokeWeight(6);
  textSize(30);
  text('score : ' + score, 360, 40);

  if (gameInfo && !gameStarted && !gameOver) {
    textAlign(CENTER, CENTER);
    fill("yellow");
    stroke("orange");
    strokeWeight(10);
    textSize(70);
    textFont("Algerion");
    text("FLYING UNICORN!!", width / 2, height / 4);
    strokeWeight(5);
    stroke(0);
    text("FLYING UNICORN!!", width / 2 + 5, height / 4 - 1);
    textSize(30);

    stroke(255, 0, 100);
    text('Press "s" key to play the Game!!', width / 2, height / 2);
    stroke("lime");
    fill("forestgreen");
    text("Score 55 points to win the game!", width / 2, height / 2 + 70);
    textSize(23);
    stroke("lime");
    strokeWeight(3);
    fill("red");
    text("do not try to hit the pipes! or you will lose the game!", width / 2, height / 2 + 140);
  }

  if (gameStarted && !gameInfo && !gameOver && !gameWon) {
    for (var i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }
    unicorn.update();
    unicorn.show();

    if (frameCount % 70 === 0) {
      pipes.push(new Pipe());
    }

    if (frameCount % 300 === 0) {
      pipes.push(new Pipe());
    }

    if (frameCount % 220 === 0) {
      score += 5;
      checkpoint.play();
    }

    var thresholdTop = sliderTop.value();
    var thresholdBottom = sliderBottom.value();

    if (vol > thresholdTop && !clapping) {
      unicorn.up();
      if (random(1) < 0.5) {
        jump1.play();
      } else {
        jump2.play();
      }
      clapping = true;
    }

    if (vol > thresholdBottom) {
      clapping = false;
    }

    fill(0, 255, 0);
    var y = map(vol, 0, 1, height, 0);
    rect(width - 50, y, 50, height - y);

    var ty = map(thresholdTop, 0, 1, height, 0);
    stroke(255, 0, 0);
    strokeWeight(4);
    line(width - 50, ty, width, ty);

    var by = map(thresholdBottom, 0, 1, height, 0);
    stroke(0, 0, 255);
    strokeWeight(4);
    line(width - 50, by, width, by);

    for (var i = pipes.length - 1; i >= 0; i--) {
      if (pipes[i].hits(unicorn)) {
        gameStarted = false;
        gameInfo = false;
        gameOver = true;
        gameWon = false;
        pipes.splice(i, 1);
        if (random(1) < 0.5) {
          gameover1.play();
        } else {
          gameover2.play();
        }
      }
    }

  }

  if (gameWon && !gameInfo && !gameOver && !gameStarted) {
    fill("orange");
    textAlign(CENTER, CENTER);
    textSize(80);
    text("YOU WIN !!", width / 2, height / 2);
    textSize(30);
    fill("yellow");
    stroke(255, 0, 100);
    text("Press Enter to play again!!", width / 2, height / 2 + 100);
  }

  if (!gameWon && !gameInfo && gameOver && !gameStarted) {
    fill(255, 0, 0);
    stroke("orange");
    textAlign(CENTER, CENTER);
    textSize(80);
    text("YOU LOSE !!", width / 2, height / 2 - 50);
    textSize(30);
    fill("yellow");
    stroke(255, 0, 100);
    text("Press Enter to play again!!", width / 2, height / 2 + 100);
  }

  if (score >= 55) {
    gameWon = true;
    gameOver = false;
    gameStarted = false;
    gameInfo = false;
    gamewin.play();
  } 

}

function keyPressed() {
  if (key === ' ') {
    unicorn.up();
    if (random(1) < 0.5) {
      jump1.play();
    } else {
      jump2.play();
    }
  }

  if (keyCode === ENTER) {
    gameStarted = false;
    gameInfo = true;
    gameWon = false;
    gameOver = false;
    score = 0;
  }

  if (key === 's') {
    gameStarted = true;
    gameInfo = false;
    gameWon = false;
    gameOver = false;
    score = 0;
  }

}