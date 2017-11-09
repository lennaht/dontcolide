const cv = document.querySelector('#cv');
const cx = cv.getContext('2d');

const wh = window.innerHeight;
const ww = window.innerWidth;

cv.height = 700;
cv.width = 700;

class Player {
    constructor(color, x, y, speed) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.line_positions = [];
    }

    move(key) {
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

        this.line_positions.push({x: this.x, y: this.y});
        c.beginPath();
        c.rect(this.x, this.y, 10, 10);
        c.fillStyle = this.color;
        c.fill();
    }

}