//taulell
let board;
let boardWidth = 3000;
let boardHeight = 1000;
let context; 

//jugadors
let playerWidth = 10;
let playerHeight = 100;
let playerVelocityY = 0;

let player1 = {
    x : 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

//pilota
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : 7,
    velocityY : 8
}

//roca
let squareWidth = 10;
let squareHeight = 50;
let square = {
    x : 1750,
    y : 150,
    width: 10,
    height: 200,
}
let square1 = {
    x : 1220,
    y : 650,
    width: 10,
    height: 200,
}
let quadrat = {
    x: 620,
    y: 150,
    width: 200,
    height: 200,
}
let quadrat1 = {
    x: 2250,
    y: 650,
    width: 200,
    height: 200,
}
let quadratX = {
    x: 2245,
    y: 650,
    width: 210,
    height: 200,
}
let quadratY = {
    x: 2250,
    y: 645,
    width: 200,
    height: 210,
}
let quadratX1 = {
    x: 615,
    y: 150,
    width: 210,
    height: 200,
}
let quadratY1 = {
    x: 620,
    y: 145,
    width: 200,
    height: 210,
}

let player1Score = 0;
let player2Score = 0;

let showGoalText = false;
let goalTextTimer;
let winDirection = 0;

window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //es fa servir per pintar el taulell

    //dibujar el personatge1
    context.fillStyle="skyblue";
    context.fillRect(player1.x, player1.y, playerWidth, player1.height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", function(event) {
        //player1
        if (event.code === "KeyW") {
            player1.velocityY = -10;
        } else if (event.code === "KeyS") {
            player1.velocityY = 10;
        }
    
        //player2
        if (event.code === "ArrowUp") {
            player2.velocityY = -10;
        } else if (event.code === "ArrowDown") {
            player2.velocityY = 10;
        }
    });
    
    document.addEventListener("keyup", function(event) {
        //player1
        if (event.code === "KeyW" || event.code === "KeyS") {
            player1.velocityY = 0;
        }
    
        //player2
        if (event.code === "ArrowUp" || event.code === "ArrowDown") {
            player2.velocityY = 0;
        }
    });
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //dibuixar la roca
    context.fillStyle="white";
    context.fillRect(square.x, square.y, square.width, square.height);

    //dibuixar la roca
    context.fillStyle="white";
    context.fillRect(square1.x, square1.y, square1.width, square1.height);

    //dibuixar la roca
    context.fillStyle="white";
    context.fillRect(quadratX.x, quadratX.y, quadratX.width, quadratX.height);

    //dibuixar la roca
    context.fillStyle="white";
    context.fillRect(quadratY.x, quadratY.y, quadratY.width, quadratY.height);
        
    //dibuixar la roca
    context.fillStyle="white";
    context.fillRect(quadratX1.x, quadratX1.y, quadratX1.width, quadratX1.height);
        
    //dibuixar la roca
    context.fillStyle="white";
    context.fillRect(quadratY1.x, quadratY1.y, quadratY1.width, quadratY1.height);
    
    //dibuixar la roca
    context.fillStyle="white";
    context.fillRect(quadrat.x, quadrat.y, quadrat.width, quadrat.height);

    //dibuixar la roca
    context.fillStyle="white";
    context.fillRect(quadrat1.x, quadrat1.y, quadrat1.width, quadrat1.height);
   
    // jugador 1
    context.fillStyle = "skyblue";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, playerWidth, player1.height);

    // jugador 2
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, playerWidth, player2.height);

    // pilota
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.beginPath();
    context.arc(ball.x + ballWidth / 2, ball.y + ballHeight / 2, ballWidth / 2, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    context.ballImage
    if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)) { 
        // si la pilota toca el límit del taulell
        ball.velocityY *= -1; //direcció contraria
    }

    //tornar la pilota
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) { //si la banda esquerra de la pilota toca la part dreta del jugador 1 (pala esquerra)
            ball.velocityX *= -1 * (1 + Math.floor(Math.random()*1.5));   // canvia la direcció
            // ball.velocityY *= -1 * (1 + Math.floor(Math.random()*3));   // canvia la direcció
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) { //si la banda dreta de la pilota toca la part dreta del jugador 2 (pala dreta)
            ball.velocityX *= -1 * (1 + Math.floor(Math.random()*1.5));   // canvia la direcció
            // ball.velocityY *= -1 * (1 + Math.floor(Math.random()*3));   // canvia la direcció
        }
    }

    else if (detectCollision(ball, square)) {
        if (ball.x <= square.x + square.width){ //si la banda esquerra de la pilota toca la part dreta del jugador 1 (pala esquerra)
            ball.velocityX *= -1;   // canvia la direcció
            // ball.velocityY *= -1 * (1 + Math.floor(Math.random()*3));   // canvia la direcció
        }
    }

    else if (detectCollision(ball, square)){
        if (ball.x + ballWidth >= square.x) { //si la banda dreta de la pilota toca la part dreta del jugador 2 (pala dreta)
            ball.velocityX *= -1;
        }
    }

    else if (detectCollision(ball, square1)) {
        if (ball.x <= square1.x + square1.width){ //si la banda esquerra de la pilota toca la part dreta del jugador 1 (pala esquerra)
            ball.velocityX *= -1;   // canvia la direcció
        }
    }

    else if (detectCollision(ball, square1)){
        if (ball.x + ballWidth >= square1.x) { //si la banda dreta de la pilota toca la part dreta del jugador 2 (pala dreta)
            ball.velocityX *= -1;
        }
    }

    //detectar col·lisió amb les roques
    handleSquareCollisionY(ball, quadratY);
    handleSquareCollisionX(ball, quadratX);
    handleSquareCollisionY(ball, quadratY1);
    handleSquareCollisionX(ball, quadratX1);

    //game over
    if (ball.x < 0) {
        winDirection = "left";
        player2Score++;
        player1.height = playerHeight  + (player2Score*20);
        resetGame(1);
        goalScored();
        showGoal();
    }
    else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        player2.height = playerHeight  + (player1Score*20);
        winDirection = "right";
        resetGame(-1);
        goalScored();
        showGoal();
    }

    //marcador
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth*4/5 - 45, 45);
    if(showGoalText == true){
    context.fillText("GOOOL!!!", boardWidth / 2 - 100, boardHeight / 2);
    }

    // línia discontinua al mig del taulell
    for (let i = 10; i < board.height; i += 25) { //i = starting y Position, draw a square every 25 pixels down
        // (x position = half of boardWidth (middle) - 10), i = y position, width = 5, height = 5
        context.fillRect(board.width / 2 - 10, i, 5, 5); 
    }

    
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e) {
    //player1
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }

    //player2
    if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }
}

function handleSquareCollision(ball, square){
    if (detectCollision(ball, square)) {
        if (ball.x <= square.x + square.width || ball.x + ballWidth >= square.x) {
            ball.velocityX *= -1; //canvia la direcció horitzontal
        }
        if (ball.y <= square.y + square.height || ball.y + ballHeight >= square.y) {
            ball.velocityY *= -1; //canvia la direcció vertical
        }
    }
}
function handleSquareCollisionX(ball, square){
    if (detectCollision(ball, square)) {
        if (ball.x <= square.x + square.width || ball.x + ballWidth >= square.x) {
            ball.velocityX *= -1; //canvia la direcció horitzontal
        }
       
    }
}
function handleSquareCollisionY(ball, square){
    if (detectCollision(ball, square)) {
        if (ball.y <= square.y + square.height || ball.y + ballHeight >= square.y) {
            ball.velocityY *= -1; //canvia la direcció vertical
        }
    }
}
function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

//Tornar la pilota al mig per seguir jugant
function resetGame(direction) {
    //Reduir la velocitat de la pilota quan es saca
    let initialVelocityX = direction * 0.5; 
    let initialVelocityY = direction * -0.5; 
    ball = {
        x : boardWidth/2,
        y : boardHeight/2,
        width: ballWidth,
        height: ballHeight,
        velocityX : direction,
        velocityY : 5
    }
}

//Cridar GOL cada vegada que marquem un gol i parar el joc
function showGoal() {
    showGoalText = true;
    clearTimeout(goalTextTimer);
    //Establir les velocitats de la pilota com a 0 immediatament
    
    ball.velocityX = 0;
    ball.velocityY = 0;
    //Reiniciar les velocitats després de 3 segons per enviar la pilota en la direcció contrària
    goalTextTimer = setTimeout(function(){
        showGoalText = false;
        
        ball.velocityX = 1; //Amb això el que fem és invertir la direcció horitzontal
        ball.velocityY = -1; //Amb això el que fem és invertir la direcció vertical
            // Reiniciar les propietats de la pilota per reprendre l'animació
            ball.velocityX = 0;
            ball.velocityY = 0;
            setTimeout(function(){
                // Després de 3 segons, reinicia les propietats de la pilota
                if (winDirection == "left"){
                    ball.velocityX = 5; 
                } else  if (winDirection == "right"){
                    ball.velocityX = -5; 
                }
                ball.velocityY = (Math.floor(Math.random() * 4) + 8) * (Math.round(Math.random()) * 2 - 1); 
            }, 3000);
            while (ball.x <= 0 || ball.x + ballWidth >= boardWidth || ball.y <= 0 || ball.y + ballHeight >= boardHeight) {
                ball.x += ball.velocityX;
                ball.y += ball.velocityY;
            }
    }, 2000);
}

//Mostra el text GOL quan marquem
function goalScored(){
    showGoalText = true;
    setTimeout(function(){
        showGoalText = false;
    }, 2000);
}