import Entity from './entity.js'

export default class Snake {

//each segment:  has x, y, and next direction

  constructor(x, y, segmentSize) {
    this.x = x;
    this.y = y;
    this.width = segmentSize;
    this.height = segmentSize;

    this.speed = 1

    this.changedTick = 0

    // 1: up, 2: right, 3: down, 4: left
    this.direction = 'right'
    
    this.segments = [{
      x: this.x,
      y: this.y,
      direction: this.direction
    }]

    this.makeSegment = this.makeSegment.bind(this)
    this.update = this.update.bind(this)
  }

  update() {
    this.segments.forEach(segment => {
      // console.log('@update/snake.js : ', this.changedTick)
      switch (segment.direction) {
        case 'up': {
          segment.y -= 1
          break;
        }
        case 'right': {
          segment.x += 1;
          break;
        }
        case 'down': {
          segment.y += 1
          break;
        }
        case 'left': {
          segment.x -= 1
          break;
        }
      }
      if(this.changedTick.x < this.changedTick.x + this.width &&
        this.changedTick.x + this.width > segment.x &&
        this.changedTick.y < segment.y + this.height &&
        this.changedTick.y + segment.y > segment.y) {
          console.log('COLLIDE')
          // this.snake.makeSegment()
          // this.segment.x = Math.floor(Math.random() * this.canvas.width - this.snake.width)
          // this.segment.y = Math.floor(Math.random() * this.canvas.height - this.snake.height)
         } 

    })
  }

  changeDirection() {
    this.segments.forEach(segment => {
      
    })
  }

  makeSegment(x, y, nextDirection) {
    const snakeLength = this.segments.length
    this.segments.push({
      x: this.segments[snakeLength - 1].x,
      y: this.segments[snakeLength - 1].y,
      direction: this.segments[snakeLength - 1].direction
    })
  }


}