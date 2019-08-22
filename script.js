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

// Todo 変えられるように
ctx.lineWidth = 1;
ctx.strokeStyle = "black";

//線の結合部分を滑らかにする
ctx.lineJoin = "round";
ctx.lineCap = "round";

/**
 * @param {Boolean} isMousePushed マウスが押されているかを表す、押されていない時にmousemoveイベントを発火しないための変数
 * @param {List[Object]} points 前回のmousedownイベントからのマウスの位置を保存しておく
*/
let isMousePushed = false,
    points = [];

canvas.addEventListener("mousedown", (e) => {
    isMousePushed = true;

    // pointsに現在のマウスの位置をpush
    points.push(getMousePosition(canvas, e));
});

canvas.addEventListener("mousemove", drawCanvas);

canvas.addEventListener("mouseup", () => {
    // isMousePushedをfalseにし、mousemoveイベントを発火させないように
    isMousePushed = false;

    // 配列を空に
    points.length = 0;
})

function drawCanvas(e) {
    // マウスが押されてなければ何もしない
    if (!isMousePushed) return;

    points.push(getMousePosition(canvas, e));

    // canvasをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // pointsをもとに二次ベジェ曲線を引いていく
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    let i;
    for (i = 1; i < points.length - 2; i++) {
        const cpx = (points[i].x + points[i + 1].x) / 2;
        const cpy = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cpx, cpy);
    }

    ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    ctx.stroke();
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