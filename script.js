let snakeDir = {x: 0, y: 0}
let bgmSound = new Audio("./Assests/Sound Effects/Snake Music.mp3")
let gameoverSound = new Audio("./Assests/Sound Effects/Gameover.mp3")
let eatingSound = new Audio("./Assests/Sound Effects/food sound.mp3")
let moveSound = new Audio("./Assests/Sound Effects/eating sound 1.mp3")
let speed = 4
let lastPaintTime = 0
let snakeArr = [
    {
        x:9, y:10
    }
]
food = {x:12,y:13}
let score = 0
let scoreContainer = document.querySelector('#score')
console.log(scoreContainer)
// game functions

function main (ctime){
    window.requestAnimationFrame(main)
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return
    }
    lastPaintTime = ctime
    gameEngine()
}

function isCollapse(snake) {
    // case 1: if snake eats itself

    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }   
    }

    // case 2: if it gets collided into the wall

    if (snake[0].x >= 18 || snake[0].x <=0 ||
        snake[0].y >= 18 || snake[0].y <=0) {
        return true
    }

    
}

function gameEngine(){
    // updating the snake


    // case 1: if snake has collided
    if (isCollapse(snakeArr)) {
       score = 0
       gameoverSound.play() 
       bgmSound.pause()
       snakeDir = {x: 0, y: 0}
       swal({
            title: "Opps!!! Game over!",
            text: "Do you want to restart the game?",
            button: "Restart",
        });
       snakeArr = [{x:9, y:10}]
    }

    // case 2: if snake has eaten the food

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        eatingSound.play()
        score += 1
        scoreContainer.innerHTML = `Score: ${score}`
        snakeArr.unshift({x: snakeArr[0].x + snakeDir.x, y: snakeArr[0].y + snakeDir.y} )
        let a=2
        let b=16
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}
    }

    // moving the snake 

    for (let i = snakeArr.length -2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]}
    }

    snakeArr[0].x += snakeDir.x
    snakeArr[0].y += snakeDir.y

    // displaying the snake

    playground.innerHTML = ""
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add('head')           
        }
        else{
            snakeElement.classList.add('snake')
        }
        playground.appendChild(snakeElement)
    })

    // displaying the food 

    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    playground.appendChild(foodElement) 

}

// main logic

window.requestAnimationFrame(main)

window.addEventListener('keydown',e => {
    snakeDir = {x:0,y:1}
    moveSound.play()
    switch (e.key) {
        case 'ArrowUp':
            console.log('ArrowUp');
            snakeDir.x = 0
            snakeDir.y = -1
            break;
        case 'ArrowDown':
            console.log('ArrowDown');
            snakeDir.x = 0
            snakeDir.y = +1
            break;
        case 'ArrowRight':
            console.log('ArrowRight');
            snakeDir.x = +1
            snakeDir.y = 0
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft');
            snakeDir.x = -1
            snakeDir.y = 0
            break;
        default:
            break;
    }
})

