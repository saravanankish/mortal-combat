let canvas = document.querySelector('#myCanvas');
let c = canvas.getContext('2d');

const width = window.innerWidth
const height = window.innerHeight

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
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }
})


function animate() {
    if(width !== window.innerWidth){
        canvas.width = window.innerWidth
        location.reload()
        return;
    }
    if(height !== window.innerHeight){
        canvas.height = window.innerHeight
        location.reload()
        return;
    }
    window.requestAnimationFrame(animate)
    background.update()
}

animate()