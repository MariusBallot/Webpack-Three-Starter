export default class Canvas {
  constructor() {
    this.bind()

    this.can = document.createElement('canvas')
    this.can.classList.add('tex')
    this.ctx = this.can.getContext('2d')


    console.log(this.ctx)

    this.init();
  }

  bind() {
    this.update = this.update.bind(this)
    this.draw = this.draw.bind(this)
    this.init = this.init.bind(this)
  }

  init() {
    this.can.width = 400;
    this.can.height = 400;
    document.body.appendChild(this.can);

    this.update()
  }

  update() {
    requestAnimationFrame(this.update)
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.can.width, this.can.height)
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(10, 10, 100, 100)

    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(20, 20, 100, 100)
  }
}