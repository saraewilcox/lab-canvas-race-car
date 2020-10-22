// Set the variables
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let frames = 0;
let requestId = 0;
let _car;
let _background;

// Start game
function startGame() {
  obstacles = [];
  _car = new Car(canvas.width);
  requestId = 1;
  update();
}

window.onload = () => {
  window.addEventListener("keydown", event => {
    if (event.key === "ArrowRight") {
      moveRight();
    }
    if (event.key === "ArrowLeft") {
      moveLeft();
    }
  });

  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  _background = new Background(canvas.width, canvas.height);
};

// Background
class Background {
  constructor(canvas_width, canvas_height) {
    this.x = 0;
    this.y = 0;
    this.width = canvas_width;
    this.height = canvas_height;
    this.image = new Image();
    this.image.src = "./images/road.png";
  }

  draw() {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x,
      this.y - this.height,
      this.width,
      this.height
    );
    this.y += 4;
    if (this.y >= this.height) this.y = 0;
  }
}

// Car
class Car {
  constructor(canvas_width) {
    this.x = 250;
    this.y = 520;
    this.width = 70;
    this.height = 170;
    this.canvas_width = canvas_width;
    this.image = new Image();
    this.image.src = "./images/car.png";
  }
  //Move the Car
  draw() {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  moveRight() {
    if (this.x <= this.canvas_width - (this.width + 50)) {
      this.x += 50;
    }
  }

  moveLeft() {
    if (this.x >= 100) {
      this.x -= 50;
    }
  }
}

function moveLeft() {
  if (_car) _car.moveLeft();
}

function moveRight() {
  if (_car) _car.moveRight();
}
//Move the background and car
function update() {
  frames++;
  context.clearRect(0, 0, canvas.width, canvas.height);

  _background.draw();
  _car.draw();
  requestId = requestAnimationFrame(update); 

}