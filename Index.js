const grid = document.querySelector(".grid")

//Block + Grid Settings
const blockHeight = 20
const blockWidth = 100
const ballDiameter = 20
const boardWidth = 560
const boardHight = 300

//User Initial Settings
const userStart = [230, 10]
let currentPosition = userStart

//Ball Initial Settings
const ballStart = [270, 40]
let ballCurrentPosition = ballStart
let timerId
let xDirection = 2
let yDirection = 2

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
const blocks = 
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

//Adding Block
function addBlock()
{
    for(i=0; i < blocks.length; i++)
    {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.right = blocks[i].x + 'px'
        block.style.bottom = blocks[i].y + 'px'
        block.style.width = blockWidth + 'px'
        block.style.height = blockHeight + 'px'
        var r = Math.floor(Math.random() * 256)
        var g = Math.floor(Math.random() * 256)
        var b = Math.floor(Math.random() * 256)
        var bgColor = "rgb(" + r + "," + g + "," + b + ")"; 
        block.style.background = bgColor
        grid.appendChild(block)
        console.log(blocks[i])
    }
} 
addBlock()

// Add Player
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//Draw User
function drawUser()
{
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
    user.style.width = blockWidth + 'px'
    user.style.height = blockHeight + 'px'
}

//Add Ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//Draw Ball
function drawBall()
{
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

//Move Ball
function moveBall()
{
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
}

timerId = setInterval(moveBall, 30)


//Move User
function moveUser(e)
{
    switch(e.key)
    {
        case 'ArrowLeft':
            if(currentPosition[0] > 0)
            {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if(currentPosition[0] < boardWidth - blockWidth)
            {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

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

//Check Collisions
function CheckForCollisions()
{
    //Wall Colisions
    if(ballCurrentPosition >= (boardWidth - ballDiameter))
        {
            changeDirection()
            console.log("Changed Direction")
        }
}

//Change Direction Function
function changeDirection()
{
    if(xDirection === 2 && yDirection == 2)
    {
        yDirection = -2
        return
    }   
}