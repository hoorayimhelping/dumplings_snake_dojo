export default class Entity {
  constructor(coords) {
    this.x = coords.x;
    this.y = coords.y;
    this.width = coords.width;
    this.height = coords.height;

    this.speed = 1

    // 1: up, 2: right, 3: down, 4: left
    this.direction = 'right'
  }

  // override
  update() {}

  getCoords() {
    return {
      x: this.x, 
      y: this.y,
      width: this.width,
      height: this.height
    }
  }
}