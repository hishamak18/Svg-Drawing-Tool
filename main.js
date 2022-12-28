const svgPath = document.querySelector('#svgGrid')
const drawPath = document.querySelector('#drawPaths')
const dotsGroup = document.querySelector('#dotsGroup')
const penTool = document.querySelector('#penTool')
const dragTool = document.querySelector('#dragTool')
const squareTool = document.querySelector('#squareTool')
const sqGroup = document.querySelector('#sqGroup')
const circlesDraw = document.querySelector('#circleTool')
const circleGroup = document.querySelector('#circleGroup')
const clearbtn = document.querySelector('#clr')




let path = [];
let d;
let flagPen = 0;
let flagDrag = 0;
let flagSquare = 0;
let flagCircle =0;
let squares = []
let ciecleArray =[]

// -------------------------penToolSection-------------------------------------
penTool.addEventListener('click', () => {
    flagDrag = 0
    flagSquare = 0
    flagPen = 2
    console.log('you clicked pen');
})
svgPath.addEventListener('click', drawPaths);
function drawPaths(e) {
    if (flagPen == 2) {
        const points = {
            x: Math.round(300 / svgPath.clientHeight * e.x),
            y: Math.round(300 / svgPath.clientWidth * e.y)

        }
        path.push(points)

        drawSvg()
    }
}
// ---------------------End of----penToolSection-------------------------------------
function clear(){
    clearbtn.addEventListener('click',function(){
      location.reload ()
    })
    }
    clear()
// -------------------------dragToolSection-------------------------------------
dragTool.addEventListener('click', () => {
    flagPen = 0
    flagDrag = 2
    flagSquare = 0
    flagCircle=0
    console.log('you selected drag')
})

svgPath.addEventListener('click', draging)
function draging(e) {
    if (flagDrag == 2) {
        svgPath.addEventListener('mousedown', onSelect)
        svgPath.addEventListener('mousemove', onMove)
        svgPath.addEventListener('mouseup', () => circleId = 'undefined')


        let circleId

        function onSelect(evt) {
            circleId = evt.target.id;
            if (!/c\d/.test(circleId)) 
                return


            


            circleId = circleId.replace('c', "")
            console.log(circleId)
            onMove(evt)
        }
        function onMove(e) {
            if (!(circleId >= 0)) 
                return


            


            let actualPoint = {
                x: Math.round(300 / svgPath.clientHeight * e.x),
                y: Math.round(300 / svgPath.clientWidth * e.y)
            }


            path[circleId] = actualPoint
            drawSvg()

        }
    }
}
// ---------------------End of----dragToolSection-------------------------------------

// -------------------------squareToolSection-------------------------------------

squareTool.addEventListener('click', () => {
    flagSquare = 2;
    flagPen = 0;
    flagDrag = 0;
    flagCircle=0;
    console.log("Rectangle clicked");
    svgPath.addEventListener('mousedown',drawRect)

})
// svgPath.addEventListener('click', drawRect)
function drawRect(e) {
    let rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    if (flagSquare == 2) {
        let actualPoint = {
            x: Math.round(300 / svgPath.clientHeight * e.x),
            y: Math.round(300 / svgPath.clientWidth * e.y)
        }

        squares.unshift(actualPoint)
        rectangle.setAttribute('x',squares[0].x)
        rectangle.setAttribute('y', squares[0].y)
        rectangle.setAttribute('stroke', 'red')
        rectangle.setAttribute('stroke-width', 1)
        rectangle.setAttribute('fill', 'none')
        
        
        svgPath.appendChild(rectangle)
        
    }
    svgPath.addEventListener('mousemove',function(e){
        if(flagSquare==2){
        let actualPoint1 = {
               x: Math.round(300 / svgPath.clientHeight * e.x),
               y: Math.round(300 / svgPath.clientWidth * e.y)
           }
           squares.push(actualPoint1)
           let width=Math.abs(squares[squares.length-1].x-squares[0].x)
           let height =Math.abs(squares[squares.length-1].y-squares[0].y)
           rectangle.setAttribute('width',width)
           rectangle.setAttribute('height',height)
   }})
   svgPath.addEventListener('mouseup',function(e){
    console.log('flaged');
    // sq=2
    flagSquare=0
   })
}

// circle drag----------------------------------------------------------------------
circleTool.addEventListener('click', () => {
    flagPen = 0
    flagDrag = 0
    flagSquare = 0
    flagCircle=2
    console.log("circleBtn clicked");
    svgPath.addEventListener('mousedown',drawCirc)

})
function drawCirc(e) {
    let circ = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    if (flagCircle == 2) {
        let actualPoint = {
            x: Math.round(300 / svgPath.clientHeight * e.x),
            y: Math.round(300 / svgPath.clientWidth * e.y)
        }

        ciecleArray.unshift(actualPoint)
        circ.setAttribute('cx',ciecleArray[0].x)
        circ.setAttribute('cy', ciecleArray[0].y)
        circ.setAttribute('stroke', 'red')
        circ.setAttribute('stroke-width', 1)
        circ.setAttribute('fill', 'none')
        
        
        svgPath.appendChild(circ)
        
    }
    svgPath.addEventListener('mousemove',function(e){
        if(flagCircle==2){
        let actualPoint1 = {
               x: Math.round(300 / svgPath.clientHeight * e.x),
               y: Math.round(300 / svgPath.clientWidth * e.y)
           }
           ciecleArray.push(actualPoint1)
           let width=Math.abs(ciecleArray[ciecleArray.length-1].x-ciecleArray[0].x)
           let height =Math.abs(ciecleArray[ciecleArray.length-1].y-ciecleArray[0].y)
           circ.setAttribute('r',width)
        //    circ.setAttribute('height',height)
   }})
   svgPath.addEventListener('mouseup',function(e){
    console.log('flaged');
    // sq=2
    flagCircle=0
   })
}
   
// draw svg-----------------------------------------------------------------------------------------
function drawSvg() {
    dotsGroup.innerHTML = ""
    for (let i = 0; i < path.length; i++) {
        if (i == 0) {
            d = `M ${
                path[i].x
            } ${
                path[i].y
            }`
        } else {
            d += ` L ${
                path[i].x
            } ${
                path[i].y
            }`
        } drawCircle(path[i].x, path[i].y, i)

    }
    // d+='z'
    drawPath.setAttribute('d', d)
    // console.log(circleGroup)
}
function drawCircle(x, y, e) {

    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('id', `c${e}`)
    circle.setAttribute('cx', x)
    circle.setAttribute('cy', y)
    circle.setAttribute('r', 1)
    circle.setAttribute('stroke-width', 1);
    circle.setAttribute('fill', 'red')
    dotsGroup.appendChild(circle)
    if (e === path.length - 1) {
        circle.setAttribute('fill', 'red');
        circle.setAttribute('stroke', 'yellow');
    }
    circle.classList.add('circle-dot')
   
} function closing(){
    d+='Z'
    drawPath.setAttribute('d',d)
    let lastCircle=document.querySelector(`#c${path.length-1}`)
    lastCircle.style.fill='none'
  }