import Entity from './entity.js'

export default class GameController {
  constructor(canvasElement, width, height) {
    this.canvas = canvasElement;
    this.context = this.canvas.getContext('2d');

    this.update = this.update.bind(this)
    this.render = this.render.bind(this)
    this.changeDirection = this.changeDirection.bind(this)
    this.snake_apple_collided = this.snake_apple_collided.bind(this)


    this.apple = new Entity({
      x: 114,
      y: 111,
      width: 10,
      height: 10
    })

    this.snake = new Entity({
      x: 100,
      y: 100,
      width: 10,
      height: 10
    })

    this.snake.length = 1
    this.snake.direction = 2
    

    this.counter = 0;
    
    this.containerWidth = width;
    this.containerHeight = height;

    this.gameOver = false;

    this.update();
  }

  // 1: up, 2: right, 3: down, 4: left
  changeDirection(event) {
    switch(event.key) {
      case 'ArrowRight': 
        this.snake.direction = 2
        break
      case 'ArrowLeft':
        this.snake.direction = 4
        break
      case 'ArrowUp':
        this.snake.direction = 1
        break
      case 'ArrowDown':
        this.snake.direction = 3
        break
    }
  }

  // snake occupies snake.x + snake.width  
  // snake occupies snake.y + snake.height
  snake_apple_collided () {
    if(this.snake.x < this.snake.x + this.apple.width &&
      this.snake.x + this.snake.width > this.apple.x &&
      this.snake.y < this.apple.y + this.apple.height &&
      this.snake.y + this.apple.y > this.apple.y) {
        console.log('COLLIDE')
        this.snake.length += 1
        this.apple.x = Math.floor(Math.random() * this.canvas.width - this.snake.width)
        this.apple.y = Math.floor(Math.random() * this.canvas.height - this.snake.height)
       } 
  }

  // game world updates go here 
  update() {
    if (this.gameOver) {
      return
    }
    window.requestAnimationFrame(this.update);
    
    this.counter++;
    if (this.counter % 7 !== 0) { return }
    this.snake_apple_collided()
    if (this.snake.x < 0 || this.snake.y < 0 || this.snake.x  > this.canvas.width || this.snake.y > this.canvas.height){
        this.gameOver = true;
    } else {
      switch (this.snake.direction) {
        case 1: {
          this.snake.y -= 1
          break;
        }
        case 2: {
          this.snake.x += 1;
          break;
        }
        case 3: {
          this.snake.y += 1
          break;
        }
        case 4: {
          this.snake.x -= 1
          break;
        }
      }
    }
    this.render();
  }

  // rendering calls go here 
  render() {
    this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

    this.context.fillStyle = 'green'
    this.context.fillRect(this.snake.x, this.snake.y, (this.snake.width * this.snake.length) , this.snake.height)
        
    this.context.fillStyle = 'red'
    this.context.fillRect(this.apple.x, this.apple.y, this.apple.width, this.apple.height)


    
    if (this.gameOver){
      console.log("GAME OVER")
    }
  }
}
