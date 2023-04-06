export class Background {
    constructor(context, width, height) {
      this.context = context;
      this.width = width*2;
      this.height = height*2;
      this.back = new Image();
      this.back.src = "photos/backgroung_grass.png";
    }

  draw(carX, carY) {
    const barrierLeft = canvas.width / 10;
    const barrierRight = canvas.width - canvas.width / 10;
    const barrierTop = canvas.height / 10;
    const barrierBottom = canvas.height - canvas.height / 10;

    let shiftX = -carX + canvas.width / 10;
    let shiftY = -carY + canvas.height / 10;

    if (carX < barrierLeft) {
      shiftX = 0;
    }
    else if (carX > barrierRight) {
      shiftX = 0;
    }
    if (carY < barrierTop) {
      shiftY = 0;
    }
    else if (carY > barrierBottom) {
      shiftY = 0;
    }
    this.context.drawImage(this.back, 4*shiftX, 4*shiftY, this.width, this.height);
}

}
