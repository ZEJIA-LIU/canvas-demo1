let canvas = document.querySelector('#canvas')
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight - 50
let ctx = canvas.getContext('2d')
ctx.fillStyle = 'black'
ctx.strokeStyle = 'black'
ctx.lineCap = 'round'
ctx.lineWidth = '3'
let drawing1 = true
let drawing2
let rubber1
let rubber2
let t = 1.5
//防止手机端滑动
function preventBehavior(e) {
    e.preventDefault();
};
document.addEventListener("touchmove", preventBehavior, { passive: false }, false);
//画线
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1 - 50)
    ctx.lineTo(x2, y2 - 50)
    ctx.stroke()
}

//选色盘
let $button = document.querySelector('#button')
let colorPreview = document.querySelector('#color-preview')
let colorRight = document.querySelector('#color-right')
let colorWrapper = true
$button.addEventListener('click', (e) => {
    if (colorWrapper) {
        $button.style.transform = 'rotate(180deg)'
        colorPreview.style.display = 'none'
        colorRight.style.cssText = "border-top-left-radius:50% 5%;border-top-right-radius: 50% 5%;border-bottom-right-radius: 50% 5%;border-bottom-left-radius: 50% 5%;left:0"
        setTimeout(() => {
            colorWrapper = false
        })
    }
    if (colorWrapper === false) {
        $button.style.transform = 'rotate(0deg)'
        colorRight.style.cssText = 'left:100;border-top-right-radius:100% 10%;border - bottom - right - radius: 100 % 10 %'
        colorPreview.style.display = 'flex'
        colorWrapper = true
    }

})
//选色
function color(x1, x2, x3, x4, x5, x6, x7, x8) {
    x1.classList.add('active')
    x2.classList.remove('active')
    x3.classList.remove('active')
    x4.classList.remove('active')
    x5.classList.remove('active')
    x6.classList.remove('active')
    x7.classList.remove('active')
    x8.classList.remove('active')
}
black.addEventListener('click', () => {
    color(black, red, yellow, pink, green, blue, grey, brown)
    ctx.strokeStyle = 'black'
    ctx.fillStyle = 'black'
})

red.addEventListener('click', () => {
    color(red, black, yellow, pink, green, blue, grey, brown)
    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'red'

})
yellow.addEventListener('click', () => {
    color(yellow, red, black, pink, green, blue, grey, brown)
    ctx.strokeStyle = 'yellow'
    ctx.fillStyle = 'yellow'

})
pink.addEventListener('click', () => {
    color(pink, yellow, red, black, green, blue, grey, brown)
    ctx.strokeStyle = 'pink'
    ctx.fillStyle = 'pink'

})
green.addEventListener('click', () => {
    color(green, pink, yellow, red, black, blue, grey, brown)
    ctx.strokeStyle = 'green'
    ctx.fillStyle = 'green'

})
blue.addEventListener('click', () => {
    color(blue, green, pink, yellow, red, black, grey, brown)
    ctx.strokeStyle = 'blue'
    ctx.fillStyle = 'blue'

})
grey.addEventListener('click', () => {
    color(grey, blue, green, pink, yellow, red, black, brown)
    ctx.strokeStyle = 'grey'
    ctx.fillStyle = 'grey'

})
brown.addEventListener('click', () => {
    color(brown, grey, blue, green, pink, yellow, red, black)
    ctx.strokeStyle = 'brown'
    ctx.fillStyle = 'brown'

})

//线宽
lineWidth.addEventListener('input', (e) => {
    if (e.target.value === '1') {
        ctx.lineWidth = '3'
        t = 1.5
    }
    if (e.target.value === '2') {
        ctx.lineWidth = '5'
        t = 2.5
    }
    if (e.target.value === '3') {
        ctx.lineWidth = '7'
        t = 3.5
    }
    if (e.target.value === '4') {
        ctx.lineWidth = '10'
        t = 5
    }
})


//笔
let pen = document.querySelector('#pen')
pen.addEventListener('click', () => {
    pen.classList.add('active2')
    eraser.classList.remove('active2')
    drawing1 = true
    rubber1 = false
    rubber2 = false
})
//橡皮
let eraser = document.querySelector('#eraser')
eraser.addEventListener('click', () => {
    eraser.classList.add('active2')
    pen.classList.remove('active2')
    drawing1 = false
    rubber1 = true
})

let lastX
let lastY

//兼容移动端
let DownOrStart = ('ontouchstart' in window) ? 'touchstart' : 'mousedown'
let MouseOrTouch = ('ontouchmove' in window) ? 'touchmove' : 'mousemove'
let UpOrEnd = ('ontouchend' in window) ? 'touchend' : 'mouseup'
let X
let Y
let $eraser = document.querySelector('#eraser-wrapper')
let restore = [ctx.getImageData(0, 0, canvas.width, canvas.height)]
canvas.addEventListener(DownOrStart, (e) => {
    if (drawing1) {
        drawing2 = true
        X = e.clientX || e.targetTouches[0].clientX
        Y = e.clientY || e.targetTouches[0].clientY
        lastX = X
        lastY = Y
    }
    if (rubber1) {
        rubber2 = true
        X = e.clientX || e.targetTouches[0].clientX
        Y = e.clientY || e.targetTouches[0].clientY
        $eraser.style.display = 'block'
        $eraser.style.left = X - 110 + 'px'
        $eraser.style.top = Y - 58 + 'px'
        ctx.clearRect(X - 10, Y - 61, 20, 20)
    }
})
let ClickSave = ('ontouchmove' in window) ? true : false
let H
canvas.addEventListener(MouseOrTouch, (e) => {
    if (ClickSave === true) {
        H = false
    }

    if (drawing2) {
        X = e.clientX || e.targetTouches[0].clientX
        Y = e.clientY || e.targetTouches[0].clientY

        drawLine(lastX, lastY, X, Y)
        lastX = X
        lastY = Y
    }
    if (rubber2) {
        X = e.clientX || e.targetTouches[0].clientX
        Y = e.clientY || e.targetTouches[0].clientY
        $eraser.style.display = 'block'
        $eraser.style.left = X - 110 + 'px'
        $eraser.style.top = Y - 58 + 'px'
        ctx.clearRect(X - 10, Y - 61, 20, 20)
    }
})

$eraser.addEventListener(UpOrEnd, (e) => {
    rubber2 = false
    $eraser.style.display = 'none'
    if (restore.length > 0) {
        redo.style.color = 'black'
    } if (ClickSave === false) {
        setTimeout(() => {
            restore[restore.length] = ctx.getImageData(0, 0, canvas.width, canvas.height)
        })
    }
    if (ClickSave === true && H === false) {
        setTimeout(() => {
            restore[restore.length] = ctx.getImageData(0, 0, canvas.width, canvas.height)
            H = true
        })
    }
})

canvas.addEventListener('click', (e) => {
    console.log(ClickSave)
    if (drawing1) {
        let X = e.clientX || e.targetTouches[0].clientX
        let Y = e.clientY || e.targetTouches[0].clientY
        ctx.beginPath()
        ctx.arc(X, Y - 50, t, 0, 2 * Math.PI)
        ctx.fill()
    }
    if (ClickSave === true) {
        setTimeout(() => {
            restore[restore.length] = ctx.getImageData(0, 0, canvas.width, canvas.height)
        })
    }
})


canvas.addEventListener(UpOrEnd, (e) => {
    drawing2 = false
    $eraser.style.display = 'none'
    if (restore.length > 0) {
        redo.style.color = 'black'
    }
    if (ClickSave === false) {
        setTimeout(() => {
            restore[restore.length] = ctx.getImageData(0, 0, canvas.width, canvas.height)
        })
    }
    if (ClickSave === true && H === false) {
        setTimeout(() => {
            restore[restore.length] = ctx.getImageData(0, 0, canvas.width, canvas.height)
            H = true
        })
    }
}
)

//撤回
redo.addEventListener('click', (e) => {
    if (restore.length > 1) {
        ctx.putImageData(restore[restore.length - 2], 0, 0)
        restore.length--

    } if (restore.length <= 1) {
        redo.style.color = 'grey'
    }
})

//清除
clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    restore.length = 1
    redo.style.color = 'grey'
})

//保存
save.addEventListener('click', () => {
    let url = canvas.toDataURL("image/png")
    let a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的作品'
    a.target = '_blank'
    a.click()
})