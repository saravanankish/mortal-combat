let canvas = document.querySelector('#myCanvas');
let c = canvas.getContext('2d');

const width = window.innerWidth
const height = window.innerHeight
const gravity = 0.7

canvas.width = window.innerWidth
canvas.height = window.innerHeight
console.log(window.innerWidth, window.innerHeight)

c.fillRect(0, 0, canvas.width, canvas.height);

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './images/background.png',
    width: window.innerWidth,
    height: window.innerHeight,
    useImageDimension: true,
})

const player1 = new Player({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    offset: {
        x: 210,
        y: 235
    },
    imageSrc: './images/wizard/Idle.png',
    framesMax: 4,
    scale: 3,
    sprites: {
        idle: {
            imageSrc: './images/wizard/Idle.png',
            framesMax: 4,
        },
        run: {
            imageSrc: './images/wizard/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './images/wizard/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './images/wizard/Fall.png',
            framesMax: 2,
        },
        attack: {
            imageSrc: './images/wizard/Attack1.png',
            framesMax: 4,
        },
        dead: {
            imageSrc: './images/wizard/Death.png',
            framesMax: 7,
        },
        hit: {
            imageSrc: './images/wizard/Take hit.png',
            framesMax: 3,
        }
    }
})


const player2 = new Player({
    position: {
        x: 400,
        y: 200
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 215,
        y: 210
    },
    imageSrc: './images/warrior/Idle.png',
    framesMax: 8,
    scale: 3,
    sprites: {
        idle: {
            imageSrc: './images/warrior/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './images/warrior/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './images/warrior/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './images/warrior/Fall.png',
            framesMax: 2,
        },
        attack: {
            imageSrc: './images/warrior/Attack1.png',
            framesMax: 6,
        },
        dead: {
            imageSrc: './images/warrior/Death.png',
            framesMax: 6,
        },
        hit: {
            imageSrc: './images/warrior/Take Hit - white silhouette.png',
            framesMax: 4,
        }
    }
})


const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
}

function detectCollision({ player1, player2 }) {
    return (
        player1.attackBox.position.x + player1.attackBox.width >= player2.position.x
        && player1.attackBox.position.x <= player2.position.x + player2.width
        && player1.attackBox.position.y + player1.attackBox.height >= player2.position.y
        && player1.attackBox.position.y <= player2.position.y + player2.height
    )
}


function animate() {
    if (width !== window.innerWidth) {
        canvas.width = window.innerWidth
        location.reload()
        return;
    }
    if (height !== window.innerHeight) {
        canvas.height = window.innerHeight
        location.reload()
        return;
    }
    window.requestAnimationFrame(animate)
    background.update()
    player1.update()
    player2.update()

    player1.velocity.x = 0
    if (keys.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -5;
        player1.switchAnimation('run')
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5;
        player1.switchAnimation('run')
    } else {
        player1.switchAnimation('idle')
    }

    if (player1.velocity.y < 0) {
        player1.switchAnimation('jump')
    } else if (player1.velocity.y > 0) {
        player1.switchAnimation('fall')
    }

    player2.velocity.x = 0
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -5;
        player2.switchAnimation('run')
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5;
        player2.switchAnimation('run')
    }else {
        player2.switchAnimation('idle')
    }

    if (player2.velocity.y < 0) {
        player2.switchAnimation('jump')
    } else if (player2.velocity.y > 0) {
        player2.switchAnimation('fall')
    }



    if (detectCollision({ player1, player2 }) && player1.isAttacking) {
        player1.isAttacking = false
        console.log('go')
    }

    if (detectCollision({ player2, player1 }) && player2.isAttacking) {
        player2.isAttacking = false
        console.log('go player 2')
    }
}

animate()


window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'd':
            keys.d.pressed = true;
            player1.lastKey = e.key
            break
        case 'a':
            keys.a.pressed = true;
            player1.lastKey = e.key
            break
        case 'w':
            player1.velocity.y = -20
            break
        case ' ':
            player1.attack()
            break
    }

    switch (e.key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            player2.lastKey = e.key
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            player2.lastKey = e.key
            break
        case 'ArrowUp':
            player2.velocity.y = -20
            break
        case 'ArrowDown':
            player2.attack()
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case ' ':
            break
    }
})