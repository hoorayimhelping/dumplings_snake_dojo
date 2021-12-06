import Entity from './entity.js'
import Snake from './snake.js'

export default class GameController {
  constructor(canvasElement, width, height) {
    this.canvas = canvasElement;
    this.context = this.canvas.getContext('2d');

    this.update = this.update.bind(this)
    this.render = this.render.bind(this)
    this.changeDirection = this.changeDirection.bind(this)
    this.snake_apple_collided = this.snake_apple_collided.bind(this) 

    this.tick = 0
    this.counter = 0

    this.segmentSize = 10;

    this.apple = new Entity({
      x: 114,
      y: 111,
      width: this.segmentSize,
      height: this.segmentSize
    })

    this.snake = new Snake(100, 100, this.segmentSize)

    this.snake.length = 1
    this.snake.direction = 'right'
    
    this.containerWidth = width;
    this.containerHeight = height;

    this.gameOver = false;

    this.update();
  }

  // 1: up, 2: right, 3: down, 4: left
  changeDirection(event) {
    this.snake.changedTick = {x: this.snake.segments[0].x, y: this.snake.segments[0].y}
    this.snake.changeDirection()
    switch(event.key) {
      case 'ArrowRight': 
        this.snake.segments[0].direction = 'right'
        break
      case 'ArrowLeft':
        this.snake.segments[0].direction = 'left'
        break
      case 'ArrowUp':
        this.snake.segments[0].direction = 'up'
        break
      case 'ArrowDown':
        this.snake.segments[0].direction = 'down'
        break
    }
  }

  // snake occupies snake.x + snake.width  
  // snake occupies snake.y + snake.height
  snake_apple_collided () {

    const snakeHead = this.snake.segments[0]
    //  console.log('snakeHEad:', snakeHead)
    //  console.log('apple:', this.apple)
    if(snakeHead.x < snakeHead.x + this.apple.width &&
      snakeHead.x + this.snake.width > this.apple.x &&
      snakeHead.y < this.apple.y + this.apple.height &&
      snakeHead.y + this.apple.y > this.apple.y) {
        console.log('COLLIDE')
        this.snake.makeSegment()
        this.apple.x = Math.floor(Math.random() * this.canvas.width - this.snake.width)
        this.apple.y = Math.floor(Math.random() * this.canvas.height - this.snake.height)
       } 
      //  console.log("no collision")
  }

  // game world updates go here 
  update() {
    this.tick++
    //console.log('tick ', this.tick)
    if (this.gameOver) {
      return
    }
    window.requestAnimationFrame(this.update);
    
    this.counter++;
    if (this.counter % 7 !== 0) {
      // return
    }
    this.snake_apple_collided()

    if (this.snake.x < 0 || this.snake.y < 0 || this.snake.x  > this.canvas.width || this.snake.y > this.canvas.height){
        this.gameOver = true;
    } else {
      this.snake.update()
    }
    this.render();
  }

  // rendering calls go here 
  render() {
    this.context.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

    this.context.fillStyle = 'green'
    this.snake.segments.forEach(segment => {
      this.context.fillRect(segment.x, segment.y, this.snake.width, this.snake.height)
    })
        
    this.context.fillStyle = 'red'
    this.context.fillRect(this.apple.x, this.apple.y, this.apple.width, this.apple.height)

    
    
    if (this.gameOver){
      console.log("GAME OVER")
    }
  }
}
