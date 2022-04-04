class Player extends Sprite {
    constructor({ position, velocity, offset, imageSrc, scale = 1, framesMax = 1 }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
        })
        this.position = position
        this.framesElapsed = 0
        this.framesHold = 5
        this.framesCurrent = 0
    }

    update() {
        this.draw();
    }
}