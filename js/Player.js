class Player extends Sprite {
    constructor({
        position, velocity, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites,
        attackBox = { offset: {}, width: undefined, height: undefined }
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.position = position
        this.framesElapsed = 0
        this.framesHold = 10
        this.framesCurrent = 0
        this.velocity = velocity
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: attackBox.width,
            height: attackBox.height,
            offset: attackBox.offset
        }
        this.isAttacking
        this.sprites = sprites
        this.health = 100
        this.dead = false

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image()
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc
        }

        console.log(this.sprites)
    }

    update() {
        this.draw();
        if (!this.dead) {
            this.framesElapsed++
            if (this.framesElapsed % this.framesHold === 0) {
                if (this.framesCurrent < this.framesMax - 1)
                    this.framesCurrent++;
                else
                    this.framesCurrent = 0;
            }
        }
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y
        if (this.position.y + this.velocity.y > 0)
            this.position.y += this.velocity.y
        if (this.position.x + this.velocity.x + (this.image.width / this.framesMax) < canvas.width && this.position.x + this.velocity.x > 0)
            this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height - (canvas.height * 0.13)) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity
        }
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 700)
    }

    switchAnimation(sprite) {

        if (this.image === this.sprites.dead.image) {
            if (this.framesCurrent === this.sprites.dead.framesMax - 1) this.dead = true
            return
        }
        if (this.image === this.sprites.dead1.image) {
            if (this.framesCurrent === this.sprites.dead.framesMax - 1) this.dead = true
            return
        }
        if (this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax - 1) return
        if (this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack.framesMax - 1) return
        if (this.image === this.sprites.hit.image && this.framesCurrent < this.sprites.hit.framesMax - 1) return
        if (this.image === this.sprites.hit1.image && this.framesCurrent < this.sprites.hit1.framesMax - 1) return
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack':
                if (this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'hit':
                if (this.image !== this.sprites.hit.image) {
                    this.image = this.sprites.hit.image
                    this.framesMax = this.sprites.hit.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'dead':
                if (this.image !== this.sprites.dead.image) {
                    this.image = this.sprites.dead.image
                    this.framesMax = this.sprites.dead.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'idle1':
                if (this.image !== this.sprites.idle1.image) {
                    this.image = this.sprites.idle1.image
                    this.framesMax = this.sprites.idle1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run1':
                if (this.image !== this.sprites.run1.image) {
                    this.image = this.sprites.run1.image
                    this.framesMax = this.sprites.run1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump1':
                if (this.image !== this.sprites.jump1.image) {
                    this.image = this.sprites.jump1.image
                    this.framesMax = this.sprites.jump1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall1':
                if (this.image !== this.sprites.fall1.image) {
                    this.image = this.sprites.fall1.image
                    this.framesMax = this.sprites.fall1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'hit1':
                if (this.image !== this.sprites.hit1.image) {
                    this.image = this.sprites.hit1.image
                    this.framesMax = this.sprites.hit1.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'dead1':
                if (this.image !== this.sprites.dead1.image) {
                    this.image = this.sprites.dead1.image
                    this.framesMax = this.sprites.dead1.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}