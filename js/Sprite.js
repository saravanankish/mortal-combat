class Sprite {
    constructor({ position, imageSrc, width, height, scale = 1, framesMax = 1, useImageDimension = false }) {
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
    }

    draw() {
        const imageWidth = this.useImageDimension ? this.imageWidth : this.width
        const imageHeight = this.useImageDimension ? this.imageHeight : this.height
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (imageWidth / this.framesMax) * this.scale,
            imageHeight * this.scale
        );
    }

    update() {
        this.draw();
        if (this.framesCurrent < this.framesMax)
            this.framesCurrent++;
        else
            this.framesCurrent = 0;
    }
}

