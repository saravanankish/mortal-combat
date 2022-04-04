class Sprite {
    constructor({ position, imageSrc, width, height, scale = 1, framesMax = 1, useImageDimension = false, offset = {x: 0, y: 0} }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.imageWidth = width
        this.imageHeight = height
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.scale = scale
        this.useImageDimension = useImageDimension
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    draw() {
        const imageWidth = this.useImageDimension ? this.imageWidth : this.image.width
        const imageHeight = this.useImageDimension ? this.imageHeight : this.image.height
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (imageWidth / this.framesMax) * this.scale,
            imageHeight * this.scale
        );
    }

    update() {
        this.draw();
        if (this.framesCurrent < this.framesMax - 1)
            this.framesCurrent++;
        else
            this.framesCurrent = 0;
    }
}

