//deactivate console.log()
console.log = function() {
    return;
}

//get canvas and it's context
const cv = document.querySelector('#cv');
const cx = cv.getContext('2d');

//store window scale
const wh = window.innerHeight;
const ww = window.innerWidth;

//scale of canvas
cv.height = 700;
cv.width = 1000;

class Player {
    constructor(color, x, y, speed) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.line_positions = [];
        this.hit = false;
    } //end of constructor

    move(key) {
        //move blue player
        if(this.color == 'blue') {
            switch(key) {
                case 'w':
                    this.y -= this.speed;
                    break;
                case 'a':
                    this.x -= this.speed;
                    break;
                case 's':
                    this.y += this.speed;
                    break;
                case 'd':
                    this.x += this.speed;
            }
        }

        //move red player
        if(this.color == 'red') {
            switch(key) {
                case 'ArrowUp':
                    this.y -= this.speed;
                    break;
                case 'ArrowLeft':
                    this.x -= this.speed;
                    break;
                case 'ArrowDown':
                    this.y += this.speed;
                    break;
                case 'ArrowRight':
                    this.x += this.speed;
            }
        }

        //save position for line and collision controle
        this.line_positions.push({x: this.x, y: this.y});

        //draw player
        cx.beginPath();
        fillRectCentered(cx, this.x, this.y, 10, 10, this.color);
    } //end of Player.move()

} //end of Player class

//initiate players
var playerBlue = new Player('blue', Math.floor(cv.width / 10), Math.floor(cv.height / 2), 1);
var playerRed = new Player('red', cv.width - (Math.floor(cv.width / 10)), Math.floor(cv.height / 2), 1);

console.log(playerBlue);
console.log(playerRed);

//last pressed buttons
var buttonBlue = 'd';
var buttonRed = 'ArrowLeft'

function play() {
    //check if player hit a line and call winner, get hit -> opponent wins
    if(playerBlue.hit === true) {
        alert('Red won!');
        cancelAnimationFrame(animate);
    } else if(playerRed.hit === true) {
        alert('Blue won!');
        cancelAnimationFrame(animate);
    } else {
        document.addEventListener('keydown', function(e){
            //store button pressed by blue player (w, a, s, d)
            if((e.key == 'w' && buttonBlue != 's') || (e.key == 'a' && buttonBlue != 'd') || (e.key == 's' && buttonBlue != 'w') || (e.key == 'd' && buttonBlue != 'a')) {
                buttonBlue = e.key;
            }

            //store button pressed by red player (arrows)
            if((e.key == 'ArrowUp' && buttonRed != 'ArrowDown') || (e.key == 'ArrowLeft' && buttonRed != 'ArrowRight') || (e.key == 'ArrowDown' && buttonRed != 'ArrowUp') || (e.key == 'ArrowRight' && buttonRed != 'ArrowLeft')) {
                buttonRed = e.key;
            }
        });

        //animation
        var animate = requestAnimationFrame(play);
        cx.clearRect(0, 0, cv.width, cv.height);

        //move players
        playerBlue.move(buttonBlue);
        playerRed.move(buttonRed);

        cx.lineWidth = 10;
        //draw blue line
        cx.beginPath();
        var lastPosition_blue = playerBlue.line_positions.length - 1;
        cx.moveTo(
            playerBlue.line_positions[lastPosition_blue].x,
            playerBlue.line_positions[lastPosition_blue].y
        );

        for(let i=lastPosition_blue; i>=0; i--) {
            let xBlue = playerBlue.line_positions[i].x;
            let yBlue = playerBlue.line_positions[i].y;
            
            cx.lineTo(xBlue, yBlue);           
        }
        
        cx.strokeStyle = 'blue';
        cx.stroke();

        //draw red line
        cx.beginPath();
        var lastPosition_red = playerRed.line_positions.length - 1;
        cx.moveTo(
            playerRed.line_positions[lastPosition_red].x,
            playerRed.line_positions[lastPosition_red].y
        );
        
        for(let i=lastPosition_red; i>=0; i--) {
            let xRed = playerRed.line_positions[i].x;
            let yRed = playerRed.line_positions[i].y;
            
            cx.lineTo(xRed, yRed);           
        }
        
        cx.strokeStyle = 'red';
        cx.stroke();

        //check if hit
        if(playerBlue.x == playerRed.x && playerBlue.y == playerRed.y) { //blue and red hit each other
            alert('Draw!');
            cancelAnimationFrame(animate);
            return;
        }


        for(let i=0; i<playerRed.line_positions.length-1; i++) {
            if(playerRed.line_positions[i].x == playerBlue.x && playerRed.line_positions[i].y == playerBlue.y) { //has blue hit red line?
                playerBlue.hit = true;
                cancelAnimationFrame(animate);
            }

            if(playerRed.line_positions[i].x == playerRed.x && playerRed.line_positions[i].y == playerRed.y) { //has red hit it's own line?
                playerRed.hit = true;
            }
        }


        for(let i=0; i<playerBlue.line_positions.length-1; i++) {
            if(playerBlue.line_positions[i].x == playerRed.x && playerBlue.line_positions[i].y == playerRed.y) { //has red hit blue line?
                playerRed.hit = true;
            }

            if(playerBlue.line_positions[i].x == playerBlue.x && playerBlue.line_positions[i].y == playerBlue.y) { //has blue hit it's own line?
                playerBlue.hit = true;
            }
        }


        if(playerBlue.x < 0 || playerBlue.x > cv.width || playerBlue.y < 0 && playerBlue.y > cv.height) { //has blue hit the border?
            playerBlue.hit = true;
        }

        if(playerRed.x < 0 || playerRed.x > cv.width || playerRed.y < 0 && playerRed.y > cv.height) { //has red hit the border?
            playerRed.hit = true;
        }

    } //end of if...else if...else
    
} //end of play() function

play();

function fillRectCentered(context, x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x - width / 2, y - height / 2, width, height);
}