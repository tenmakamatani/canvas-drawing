"use strict";

const canvas = document.getElementById("drawCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// もしブラウザがcanvasに対応していなければ処理を終了
let ctx;
if (canvas.getContext) {
    ctx = canvas.getContext("2d");
} else {
    alert("ご使用のブラウザはcanvasに対応していません");
}

// ラインの太さを10に
// Todo 変えられるように
ctx.lineWidth = 1;
ctx.strokeStyle = "black";

/**
 * @param {boolean} isMousePushed マウスが押されているかを表す、押されていない時にmousemoveイベントを発火しないための変数
 * @param {int} beforeX 前回のmousemoveイベントが実行された時のx座標
 * @param {int} beforeY 前回のmousemoveイベントが実行された時のy座標
 * @param {int} currentX 現在のx座標
 * @param {int} currentY 現在のY座標
*/
let isMousePushed = false,
    beforeX = 0,
    beforeY = 0,
    currentX = 0,
    currentY = 0;

canvas.addEventListener("mousedown", (e) => {
    isMousePushed = true;
    const mousePosition = getMousePosition(canvas, e);
    beforeX = mousePosition.x;
    beforeY = mousePosition.y;
});

canvas.addEventListener("mousemove", drawCanvas);

canvas.addEventListener("mouseup", () => {
    // isMousePushedをfalseにし、mousemoveイベントを発火させないように
    isMousePushed = false;
})

function drawCanvas(e) {
    // マウスが押されてなければ何もしない
    if (!isMousePushed) return;

    // 現在のマウスの位置を取得
    const mousePosition = getMousePosition(canvas, e);
    console.log(beforeX, beforeY);
    currentX = mousePosition.x;
    currentY = mousePosition.y;

    // 前回のマウスの位置から線を引く
    ctx.beginPath();
    ctx.moveTo(beforeX, beforeY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
    ctx.closePath();

    // beforeX, beforeY現在の位置に更新
    beforeX = currentX;
    beforeY = currentY;
}

/**
 * @param {Object} e MouseEventを渡す
 */
function getMousePosition(canvas, e) {
    // 現在のマウスの相対的な座標を返す
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}