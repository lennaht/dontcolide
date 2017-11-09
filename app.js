//get canvas and it's context
const cv = document.querySelector('#cv');
const cx = cv.getContext('2d');

//store window scale
const wh = window.innerHeight;
const ww = window.innerWidth;

//scale of canvas
cv.height = 700;
cv.width = 700;

class Player {
    constructor(color, x, y, speed) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.line_positions = [];
        this.hit = false;
    }

    move(key) {
        //move blue player
        if(this.color == 'blue') {
            switch(key) {
                case 'w':
                    this.y += speed;
                    break;
                case 'a':
                    this.x -= speed;
                    break;
                case 's':
                    this.y -= speed;
                    break;
                case 'd':
                    this.x += speed;
            }
        }

        //move red player
        if(this.color == 'red') {
            switch(key) {
                case 'ArrowUp':
                    this.y += speed;
                    break;
                case 'ArrowLeft':
                    this.x -= speed;
                    break;
                case 'ArrowDown':
                    this.y -= speed;
                    break;
                case 'ArrowRight':
                    this.x += speed;
            }
        }

        //save position for line and collision controle
        this.line_positions.push({x: this.x, y: this.y});

        //draw player
        cx.beginPath();
        cx.rect(this.x, this.y, 10, 10);
        cx.fillStyle = this.color;
        cx.fill();
    }

}

//initiate players
var playerBlue = new Player('blue', Math.floor(cv.width / 10), cv.width - (Math.floor(cv.height / 2)), 3);
var playerRed = new Player('red', Math.floor(cv.width - (cv.width / 10)), cv.width - (Math.floor(cv.height / 2)), 3);

//last pressed buttons
var buttonBlue = 'd';
var buttonRed = 'ArrowRight'

function play() {
    //check if player hit a line and call winner, get hit -> opponent wins
    if(playerBlue.hit === true) {
        alert('Red won!');
    } else if(playerRed.hit === true) {
        alert('Blue won!');
    } else {
        document.addEventListener('keydown', function(e){
            //store button pressed by blue player (w, a, s, d)
            if(e.key == 'w' || e.key == 'a' || e.key == 's' || e.key == 'd') {
                buttonBlue = e.key;
            }

            //store button pressed by red player (arrows)
            if(e.key == 'ArrowUp' || e.key == 'ArrowLeft' || e.key == 'ArrowDown' || e.key == 'ArrowRight') {
                buttonRed = e.key;
            }
        });

        requestAnimationFrame(play);
        cv.clearRect(0, 0, cv.width, cv.height);

        playerBlue.move(buttonBlue);
        playerRed.move(buttonRed);
    } //end of if...else if...else
    
}