let currentGame;
let currentCar;
document.getElementById('game-board').style.display = 'none';
const myCanvas = document.getElementById('the-canvas');
const ctx = myCanvas.getContext('2d');
document.getElementById('start-button').onclick = () => {
    startGame();
}
document.onkeydown = (e) => {
    let whereToGo = e.keyCode;
    currentGame.car.moveCar(whereToGo);
}
function startGame() {
    document.getElementById('game-board').style.display = 'block';
    //Instantiate a new game of the game class
    currentGame = new Game();
    //Instantiate a new car
    currentCar = new Car();
    currentGame.car = currentCar;
    currentCar.drawCar();
    updateCanvas();
}

function detectCollision(obstacle) {
    return !((currentCar.y > obstacle.y + obstacle.height) ||
    (currentCar.x + currentCar.width < obstacle.x) ||
    (currentCar.x - currentCar.width > obstacle.x + obstacle.width))
}

let obstaclesFrequency = 0;
function updateCanvas() {
    ctx.clearRect(0, 0, 500, 600); //width and height of the canvas
    currentGame.car.drawCar();
    obstaclesFrequency++;
    if (obstaclesFrequency % 100 === 1) { //more obstacles wanted, make number less than 100!
        //draw obstacle
        let randomObstacleX = Math.floor(Math.random() * 450);
        let randomObstacleY = 0; //it will always appear starting at the top
        let randomObstacleWidth = Math.floor(Math.random() * 50) + 20;
        let randomObstacleHeight = Math.floor(Math.random() * 50) + 20;
        let newObstacle = new Obstacle(randomObstacleX, randomObstacleY, randomObstacleWidth, randomObstacleHeight);

    currentGame.obstacles.push(newObstacle);
    }
    //console.log(currentGame.obstacles); //test to see if you can create new objects into the array. refresh page, console tab shows the array being added to.

    for(let i=0; i<currentGame.obstacles.length; i++) {
        currentGame.obstacles[i].y += 1;
        currentGame.obstacles[i].drawObstacle();
        console.log(currentGame.obstacles);
        if (detectCollision(currentGame.obstacles[i])) {
            alert('YOU DIE!!');
            obstaclesFrequency = 0; //now you need to end the game so no endless loop of alerts
            currentGame.score = 0;
            document.getElementById('score').innerHTML = 0;
            currentGame.obstacles = [];
            document.getElementById('game-board').style.display='none';
        }
        

        if (currentGame.obstacles.length > 0 && currentGame.obstacles[i].y >= 600) { 
            currentGame.obstacles.splice(i, 1);
            currentGame.score++;
            document.getElementById('score').innerHTML = currentGame.score;
        }
    }

    requestAnimationFrame(updateCanvas);
   /* setInterval(() => {
        updateCanvas();
    }, 60);*/
}