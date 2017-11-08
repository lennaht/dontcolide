const cv = document.querySelector('#cv');
const cx = cv.getContext('2d');

const wh = window.innerHeight;
const ww = window.innerWidth;

cv.height = 700;
cv.width = 700;

class Player {
    constructor(color, x, y) {
        this.color = color;
        this.x = x;
        this.y = y;
    }

    move(event) {
        
    }
}