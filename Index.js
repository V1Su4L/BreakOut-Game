const grid = document.querySelector(".grid")

//Block + Grid Settings
const blockHeight = 20
const blockWidth = 100
const ballDiameter = 20
const boardWidth = 560
const boardHight = 300

//User Initial Settings
const userStart = {x:230, y:10}
let currentPosition = userStart

//Ball Initial Settings
const ballStart = {x:270, y:40}
let ballCurrentPosition = ballStart

let xDirection = 2
let yDirection = 2

let timerId
let isGameStarted = false

//Block Class
class Block
{
    constructor(x,y)
    {
        this.x = x 
        this.y = y
    }
}

//All my blocks
const blocksStart = 
[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]
let blocks = blocksStart

//Adding Block
function addBlocks()
{
    for(i=0; i < blocks.length; i++)
    {
        const block = document.createElement('div')
        block.classList.add('block')
        block.id = blocks[i].id = i
        block.style.left = blocks[i].x + 'px'
        block.style.bottom = blocks[i].y + 'px'
        block.style.width = blockWidth + 'px'
        block.style.height = blockHeight + 'px'
        var r = Math.floor(Math.random() * 256)
        var g = Math.floor(Math.random() * 256)
        var b = Math.floor(Math.random() * 256)
        var bgColor = "rgb(" + r + "," + g + "," + b + ")"; 
        block.style.background = bgColor
        grid.appendChild(block)
    }
} 


//Draw User
function drawUser()
{
    const old_user = document.getElementById("user")
    if (old_user != null)
        old_user.remove()
    const user = document.createElement('div')
    user.classList.add('user')
    user.id = "user"
    user.style.left = currentPosition.x + 'px'
    user.style.bottom = currentPosition.y + 'px'
    user.style.width = blockWidth + 'px'
    user.style.height = blockHeight + 'px'
    grid.appendChild(user)
}


//Draw Ball
function drawBall()
{
    const old_ball = document.getElementById("ball")
    if (old_ball != null)
        old_ball.remove()
    const ball = document.createElement('div')
    ball.classList.add('ball')
    ball.id = "ball"
    ball.style.left = ballCurrentPosition.x + 'px'
    ball.style.bottom = ballCurrentPosition.y + 'px'
    grid.appendChild(ball)
}


//Move User
function moveUser(e)
{
    if (!isGameStarted) return
    switch(e.key)
    {
        case 'ArrowLeft':
            if(currentPosition.x > 0)
            {
                currentPosition.x -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if(currentPosition.x < boardWidth - blockWidth)
            {
                currentPosition.x += 10
                drawUser()
            }
            break;
    }
}

//Move Ball
function moveBall()
{
    ballCurrentPosition.x += xDirection
    ballCurrentPosition.y += yDirection
    drawBall()
    checkForCollisions()
}

//Check Collisions
function checkForCollisions()
{
    //Wall Colisions
    if(
        boardWidth <= ballCurrentPosition.x + ballDiameter || 
        boardHight <= ballCurrentPosition.y + ballDiameter ||
        ballCurrentPosition.x <= 0
        )
    {
        changeDirection()
    }
     //Check for Game Over
     if(ballCurrentPosition.y <= 0)
     {
         GameOver()
     }
    //User Collisions
    if(
        ((currentPosition.x <= ballCurrentPosition.x && ballCurrentPosition.x <= currentPosition.x + blockWidth) &&
        (currentPosition.y <= ballCurrentPosition.y && ballCurrentPosition.y <= currentPosition.y + blockHeight)) ||
        ((currentPosition.x <= ballCurrentPosition.x + ballDiameter && ballCurrentPosition.x + ballDiameter <= currentPosition.x + blockWidth) &&
        (currentPosition.y <= ballCurrentPosition.y && ballCurrentPosition.y <= currentPosition.y + blockHeight)) ||
        ((currentPosition.x <= ballCurrentPosition.x && ballCurrentPosition.x <= currentPosition.x + blockWidth) &&
        (currentPosition.y <= ballCurrentPosition.y + ballDiameter && ballCurrentPosition.y + ballDiameter <= currentPosition.y + blockHeight)) ||
        ((currentPosition.x <= ballCurrentPosition.x + ballDiameter && ballCurrentPosition.x + ballDiameter <= currentPosition.x + blockWidth) &&
        (currentPosition.y <= ballCurrentPosition.y + ballDiameter && ballCurrentPosition.y + ballDiameter <= currentPosition.y + blockHeight))      
        )
    {
        changeDirection()
    }
    //Block Collision
    for(i=0; i < blocks.length; i++)
    {
        if(
            ((blocks[i].x <= ballCurrentPosition.x && ballCurrentPosition.x <= blocks[i].x + blockWidth) &&
            (blocks[i].y <= ballCurrentPosition.y && ballCurrentPosition.y <= blocks[i].y + blockHeight)) ||
            ((blocks[i].x <= ballCurrentPosition.x + ballDiameter && ballCurrentPosition.x + ballDiameter <= blocks[i].x + blockWidth) &&
            (blocks[i].y <= ballCurrentPosition.y && ballCurrentPosition.y <= blocks[i].y + blockHeight)) ||
            ((blocks[i].x <= ballCurrentPosition.x && ballCurrentPosition.x <= blocks[i].x + blockWidth) &&
            (blocks[i].y <= ballCurrentPosition.y + ballDiameter && ballCurrentPosition.y + ballDiameter <= blocks[i].y + blockHeight)) ||
            ((blocks[i].x <= ballCurrentPosition.x + ballDiameter && ballCurrentPosition.x + ballDiameter <= blocks[i].x + blockWidth) &&
            (blocks[i].y <= ballCurrentPosition.y + ballDiameter && ballCurrentPosition.y + ballDiameter <= blocks[i].y + blockHeight))
        )
        {
            let id = blocks[i].id
            document.getElementById(id + "").remove();
            blocks = blocks.filter(block => block.id != id)            
            changeDirection()
            break
        }
    }

    
}

//Change Direction
function changeDirection()
{
    if(xDirection === 2 && yDirection === 2)
    {
        yDirection = -2
        return
    }
    if(xDirection === 2 && yDirection === -2)
    {
        xDirection = -2
        return
    }
    if(xDirection === -2 && yDirection === -2)
    {
        yDirection = 2
        return
    }
    if(xDirection === -2 && yDirection === 2)
    {
        xDirection = 2
        return
    }
}


//          y
//          ^
//          |  [] [] []
//          |  [] [] []
//          |  [] [] []
//          |     O
//          |    [==]
//          +--------------> x


function drawGame()
{
    addBlocks()
    drawUser()
    drawBall()
}
drawGame()

function startGame(e)
{
    switch(e.key)
    {
        case ' ':{
            document.addEventListener('keydown', moveUser)
            isGameStarted = true
            timerId = setInterval(moveBall, 30)
            break
        }

    }
}

function GameOver()
{
    document.removeEventListener('keydown',moveUser)
    document.removeEventListener('keydown',startGame)
    isGameStarted = false
    clearInterval(timerId)
    console.log("Game Over!")
}

document.addEventListener('keydown', startGame)