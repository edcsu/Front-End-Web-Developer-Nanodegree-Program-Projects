 
 /** Class representing a game component. */
 class Component {
     /**
     * Create a game component.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} initial_x - The initial x value.
     * @param {number} initial_y - The initial y value.
     * @param {string} sprite - The sprite value.
     * @param {number} width - The width value.
     * @param {number} height - The height value.
     */

    constructor( x, y, sprite, width, height) {
        this.x = x;
        this.y = y;
        this.initial_x = x;
        this.initial_y = y;
        this.sprite = sprite;
        this.width = width,
        this.height = height
    }

    // Update the Component's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
    };

    // re initialise the position of the component
     reset() {
        this.x = this.initial_x;
        this.y = this.initial_y;
    }

    // Draw the Component on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    

} 

// Enemies our player must avoid
/**
 * Class representing an Enemy.
 * @extends Component
 */
class Enemy extends Component {

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += 240 * dt *2;
        if ( this.x > 606 ){
            this.x = -100;
        }
    };
    
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/**
 * Class representing a Player.
 * @extends Component
 */

class Player extends Component {
     /**
     * Create a Player.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} initial_x - The initial x value.
     * @param {number} initial_y - The initial y value.
     * @param {string} sprite - The sprite value.
     * @param {number} width - The width value.
     * @param {number} height - The height value.
     * @param {number} score - The score value.
     * @param {number} lives - The lives value.
     */

    constructor( x, y, sprite, width, height) {
        super(x, y, sprite, width, height);
        this.score = 0;
        this.lives = 5;
    }

    /**
     * Display game winning modal.
     */
    gameWon() {
        if (this.y == 0) {
            $('#gameModalCenter').modal('show');
            let modalBody = document.querySelector(".modal-body");
            modalBody.innerHTML = ` <p class"card-text text-bold">YOU WON!!!! </p>`;
            setTimeout( this.reset(), 1000);
            this.score = 0;
        }
    }
    
    /**
     * Display game losing modal.
     */

    gameLost() {
        $('#gameModalForLoss').modal('show');
        let modalBody = document.querySelector("#gameModalForLossBody");
        modalBody.innerHTML = ` <p class"card-text text-bold text-danger">YOU LOST!!!! </p>`;
        this.score = 0;
        this.lives = 5;
        return false;                       
    }

    /**
     * Handle the player's movement.
     */
    handleInput (step) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        
        // Update and display the score for the game
        let score = document.querySelector("#score");
        score.textContent = player.score;

        switch (step) {
            case 'up': {
                    // ensure player stays on the board after moving up 
                    if ( this.y <= 40) {
                        this.y = 0;
                        setTimeout( this.gameWon(), 500);                       
                    } else {
                        this.y -= 80;
                        if ( this.y <= 180) {
                            this.score += 10;
                        }
                    }
                }
                break;
        
            case 'down': {
                    // ensure player stays on the board after moving down 
                    ( this.y >= 390) ? this.y = 440: this.y += 80;
                }            
                break;
    
            case 'right': {
                    // ensure player stays on the board after moving right 
                    ( this.x >= 360 ) ? this.x = 400 : this.x += 60;            
                }    
                break;
              
            case 'left': {
                    // ensure player stays on the board after moving left 
                    ( this.x <= 40 ) ? this.x = 5 : this.x -= 60;
                }            
                break;    
            default:
                break;
        }
    };

    // re initialise the position of the Component
    reset() {
        super.reset();
        // Update and display the lives left for the player
        (player.lives === 0) ? setTimeout( this.gameLost(), 500) : player.lives--;
        // Update and display the scores for the player if they collide with enemy
        ( this.score === 0) ? this.score = 0: this.score -= 10;        
    }

}; 


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

const enemy1 = new Enemy( -5, 70, 'images/enemy-bug.png', 70, 60);
// allEnemies.push(enemy1);
const enemy2 = new Enemy( -100, 145, 'images/enemy-bug.png', 70, 60);
// allEnemies.push(enemy2);
const enemy3 = new Enemy( -200, 230, 'images/enemy-bug.png', 70, 60);
// allEnemies.push(enemy3);
const enemy4 = new Enemy( -305, 70, 'images/enemy-bug.png', 70, 60);
// allEnemies.push(enemy1);
const enemy5 = new Enemy( -400, 145, 'images/enemy-bug.png', 70, 60);
// allEnemies.push(enemy2);
const enemy6 = new Enemy( -500, 230, 'images/enemy-bug.png', 70, 60);
// allEnemies.push(enemy6);

const allEnemies = [ enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

console.log(allEnemies);
console.log(`**************************`);

// Place the player object in a variable called player
const player = new Player( 200, 440, sprite='images/char-boy.png', 50, 70);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

   player.handleInput(allowedKeys[e.keyCode]);
});



