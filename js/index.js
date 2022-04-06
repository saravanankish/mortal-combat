let canvas = document.querySelector('#myCanvas');
let c = canvas.getContext('2d');

const width = window.innerWidth
const height = window.innerHeight
const gravity = 0.7
const player1AttackBoxOffset = 150
const GAME_TIME = 60
const healthBarContainer = document.getElementById('health-bar-container')
let timerTimeout;
let time = GAME_TIME
let gameStarted = false;
let listOfElementToHide = ['mask', 'start-game', 'result-container', 'instructions']
let background
let player1
let player2

canvas.width = window.innerWidth
canvas.height = window.innerHeight
let timer = document.getElementById('timer');
timer.innerText = time

window.onbeforeunload = () => {
    if (gameStarted) {
        return 'Do you want to leave?'
    }
}


function runTimer() {
    let timer = document.getElementById('timer');
    timer.innerText = time
    clearTimeout(timerTimeout)
    timerTimeout = setTimeout(() => {
        time--
        timer.innerText = time
        if (time > 0) {
            runTimer()
        } else {
            clearTimeout(timerTimeout)
            endGame()
        }
    }, 1000)
}

c.fillRect(0, 0, canvas.width, canvas.height);

function initGame() {
    background = new Sprite({
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: './images/background.png',
        width: window.innerWidth,
        height: window.innerHeight,
        useImageDimension: true,
    })

    player1 = new Player({
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
        attackBox: {
            offset: {
                x: player1AttackBoxOffset,
                y: 20
            },
            width: 185,
            height: 80
        },
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
            },
            idle1: {
                imageSrc: './images/wizard1/Idle.png',
                framesMax: 4,
            },
            run1: {
                imageSrc: './images/wizard1/Run.png',
                framesMax: 8,
            },
            jump1: {
                imageSrc: './images/wizard1/Jump.png',
                framesMax: 2,
            },
            fall1: {
                imageSrc: './images/wizard1/Fall.png',
                framesMax: 2,
            },
            attack1: {
                imageSrc: './images/wizard1/Attack1.png',
                framesMax: 4,
            },
            dead1: {
                imageSrc: './images/wizard1/Death.png',
                framesMax: 7,
            },
            hit1: {
                imageSrc: './images/wizard1/Take hit.png',
                framesMax: 3,
            }
        }
    })

    player2 = new Player({
        position: {
            x: window.innerWidth - 200,
            y: 0
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
        attackBox: {
            offset: {
                x: -150,
                y: 20
            },
            width: 185,
            height: 80
        },
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
            },
            idle1: {
                imageSrc: './images/warrior1/Idle.png',
                framesMax: 8,
            },
            run1: {
                imageSrc: './images/warrior1/Run.png',
                framesMax: 8,
            },
            jump1: {
                imageSrc: './images/warrior1/Jump.png',
                framesMax: 2,
            },
            fall1: {
                imageSrc: './images/warrior1/Fall.png',
                framesMax: 2,
            },
            attack1: {
                imageSrc: './images/warrior1/Attack1.png',
                framesMax: 6,
            },
            dead1: {
                imageSrc: './images/warrior1/Death.png',
                framesMax: 6,
            },
            hit1: {
                imageSrc: './images/warrior1/Take Hit - white silhouette.png',
                framesMax: 4,
            }
        },
    })
}

initGame();

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

function detectCollision({ player1, player2, offset = 60 }) {
    return (
        player1.attackBox.position.x + player1.attackBox.width >= player2.position.x + offset
        && player1.attackBox.position.x + offset <= player2.position.x + player2.width
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

    c.fillStyle = 'rgba(0, 0, 0, 0.25)'
    c.fillRect(0, 0, canvas.width, canvas.height);
    player1.update()
    player2.update()

    if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
        player1.attackBox.offset.x = -player1AttackBoxOffset
        player2.attackBox.offset.x = player1AttackBoxOffset
    } else {
        player1.attackBox.offset.x = player1AttackBoxOffset
        player2.attackBox.offset.x = -player1AttackBoxOffset
    }

    player1.velocity.x = 0
    if (keys.a.pressed && (player1.lastKey === 'a' || player1.lastKey === 'A')) {
        player1.velocity.x = -5;
        if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
            player1.switchAnimation('run1')
        } else
            player1.switchAnimation('run')
    } else if (keys.d.pressed && (player1.lastKey === 'd'|| player1.lastKey === 'D')) {
        player1.velocity.x = 5;
        if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
            player1.switchAnimation('run1')
        } else
            player1.switchAnimation('run')
    } else {
        if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
            player1.switchAnimation('idle1')
        } else
            player1.switchAnimation('idle')
    }

    if (player1.velocity.y < 0) {
        if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
            player1.switchAnimation('jump1')
        } else
            player1.switchAnimation('jump')
    } else if (player1.velocity.y > 0) {
        if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
            player1.switchAnimation('fall1')
        } else
            player1.switchAnimation('fall')
    }

    player2.velocity.x = 0
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -5;
        if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
            player2.switchAnimation('run1')
        }
        else player2.switchAnimation('run')
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5;
        if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
            player2.switchAnimation('run1')
        }
        else player2.switchAnimation('run')
    } else {
        if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
            player2.switchAnimation('idle1')
        } else
            player2.switchAnimation('idle')
    }

    if (player2.velocity.y < 0) {
        if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
            player2.switchAnimation('jump1')
        } else
            player2.switchAnimation('jump')
    } else if (player2.velocity.y > 0) {
        if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
            player2.switchAnimation('fall1')
        } else
            player2.switchAnimation('fall')
    }

    if (player1.dead && player1.framesCurrent === player1.framesMax - 1) {
        endGame()
    }
    if (player2.dead && player2.framesCurrent === player2.framesMax - 1) {
        endGame()
    }

    var rule2 = CSSRulePlugin.getRule("#health-bar-2:after");
    var rule1 = CSSRulePlugin.getRule("#health-bar-1:after");

    if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
        if (detectCollision({ player1, player2, offset: -80 }) && player1.isAttacking && player1.framesCurrent === 2) {
            player1.isAttacking = false
            player2.health -= 10
            if (player2.health <= 0) {
                console.log('player2 dead')
                player2.switchAnimation('dead1')
            } else {
                player2.switchAnimation('hit1')
            }
            gsap.to(rule2, { width: player2.health + '%' });
            console.log('go')
        }
        if (player1.isAttacking && player1.framesCurrent === 2) player1.isAttacking = false;
        if (detectCollision({ player2, player1, offset: -80 }) && player2.isAttacking && player2.framesCurrent === 4) {
            player2.isAttacking = false
            player1.health -= 10
            if (player1.health <= 0) {
                console.log('player1 dead')
                player1.switchAnimation('dead1')
            } else {
                player1.switchAnimation('hit1')
            }
            gsap.to(rule1, { width: player1.health + '%' });
            console.log('go player 2')
        }
        if (player2.isAttacking && player2.framesCurrent === 4) player2.isAttacking = false;
    } else {
        if (detectCollision({ player1, player2 }) && player2.isAttacking && player2.framesCurrent === 4) {
            player2.isAttacking = false
            player1.health -= 10
            if (player1.health <= 0) {
                console.log('player1 dead')
                player1.switchAnimation('dead')
            } else {
                player1.switchAnimation('hit')
            }
            gsap.to(rule1, { width: player1.health + '%' });
            console.log('go player 2')
        }
        if (player2.isAttacking && player2.framesCurrent === 4) player2.isAttacking = false;
        if (detectCollision({ player2, player1 }) && player1.isAttacking && player1.framesCurrent === 2) {
            player1.isAttacking = false
            player2.health -= 10
            if (player2.health <= 0) {
                console.log('player2 dead')
                player2.switchAnimation('dead')
            } else {
                player2.switchAnimation('hit')
            }
            gsap.to(rule2, { width: player2.health + '%' });
            console.log('go ')
        }
        if (player1.isAttacking && player1.framesCurrent === 2) player1.isAttacking = false;
    }

}

window.addEventListener('keydown', (e) => {
    if (!player1.dead && gameStarted) {
        switch (e.key) {
            case 'd':
                keys.d.pressed = true;
                player1.lastKey = e.key
                break
            case 'D':
                keys.d.pressed = true;
                player1.lastKey = e.key
                break
            case 'a':
                keys.a.pressed = true;
                player1.lastKey = e.key
                break
            case 'A':
                keys.a.pressed = true;
                player1.lastKey = e.key
                break
            case 'w':
                player1.velocity.y = -20
                break
            case 'W':
                player1.velocity.y = -20
                break
            case 's':
                if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
                    player1.switchAnimation('attack1')
                } else
                    player1.switchAnimation('attack')
                player1.attack()
                break
            case 'S':
                if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
                    player1.switchAnimation('attack1')
                } else
                    player1.switchAnimation('attack')
                player1.attack()
                break
        }
    }

    if (!player2.dead && gameStarted) {
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
                if (player1.position.x + (player1.image.width / player1.framesMax) - 200 > player2.position.x) {
                    player2.switchAnimation('attack1')
                } else
                    player2.switchAnimation('attack')
                player2.attack()
                break
        }
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            keys.d.pressed = false;
            break
        case 'D':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 'A':
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

function endGame() {
    clearTimeout(timerTimeout);
    let resultContainer = document.getElementById('result-container');
    document.getElementById('mask').style.display = 'block'
    resultContainer.style.display = 'flex';
    let results = document.getElementById('results')
    if (player1.health > player2.health) {
        results.innerHTML = 'Player 1 wins!'
    } else if (player2.health > player1.health) {
        results.innerHTML = 'Player 2 wins!'
    } else {
        results.innerHTML = 'Tie!'
    }
    gameStarted = false
}

function startGame() {
    gameStarted = true;
    initGame()
    var rule2 = CSSRulePlugin.getRule("#health-bar-2:after");
    var rule1 = CSSRulePlugin.getRule("#health-bar-1:after");
    gsap.to(rule1, { width: player2.health + '%' });
    gsap.to(rule2, { width: player2.health + '%' });
    listOfElementToHide.forEach(ele => {
        document.getElementById(ele).style.display = 'none'
    })
    runTimer();
    console.log(player1)
}

function goToMenu() {
    document.getElementById('result-container').style.display = 'none'
    time = GAME_TIME
    player1.dead = false
    player2.dead = false
    player1.health = 100
    player2.health = 100
    document.getElementById('start-game').style.display = 'block'
}

function openInstructions() {
    document.getElementById('instructions').style.display = 'block'
}

function closeInstructions() {
    document.getElementById('instructions').style.display = 'none'
}

document.getElementById('close-btn').addEventListener('click', closeInstructions)

animate()