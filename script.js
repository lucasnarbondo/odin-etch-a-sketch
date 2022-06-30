const colorChoice = document.getElementById('colorChoice')
const colorBtn = document.getElementById('colorBtn')
const rainbowBtn = document.getElementById('rainbowBtn')
const clearBtn = document.getElementById('clearBtn')
const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')
const grid = document.getElementById('grid')

colorChoice.oninput = (e) => currentColor = e.target.value
colorBtn.onclick = () => {currentMode = 'color'; activateButton('color')}
rainbowBtn.onclick = () => {currentMode = 'rainbow'; activateButton('rainbow')}
clearBtn.onclick = () => clearGrid()
sizeSlider.onmousemove = (e) => sizeValue.innerHTML = `${e.target.value} x ${e.target.value}`
sizeSlider.onchange = (e) => changeSize(e.target.value)

let currentColor = '#333333'
let currentMode = 'color'
let currentSize = '16'

setupGrid(currentSize)

function clearGrid() {
    grid.innerHTML = '';
    setupGrid(currentSize)
}

function activateButton(value) {
    rainbowBtn.classList.remove('active')
    colorBtn.classList.remove('active')
    if (value === 'rainbow') {
        rainbowBtn.classList.add('active')
    }
    if (value === 'color') {
        colorBtn.classList.add('active')
    }
}

function changeSize(value) {
    currentSize = value
    sizeValue.innerHTML = `${value} x ${value}`
    clearGrid()
    setupGrid(value)
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
    for (let i=0; i<size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement) 
    }
    
}

let stopClick = false;
document.body.onmousedown = () => (stopClick = true)
document.body.onmouseup = () => (stopClick = false)

function changeColor(e){
    if (e.type == 'mouseover' && stopClick)
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
      } else if (currentMode === 'color') {
        e.target.style.backgroundColor = currentColor
      }

}
