"use strict";

const canvas = document.getElementById("real-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// もしブラウザがcanvasに対応していなければ処理を終了
let ctx;
if (canvas.getContext) {
    ctx = canvas.getContext("2d");
} else {
    alert("ご使用のブラウザはcanvasに対応していません");
}

// 一時的なキャンバスを作り、mouseupイベントの時に本canvasにコピー
// 理由は、drawCanvas関数でclearRectしなければならないので、その時に今まで書いたものを消さないため
const tmp_canvas = document.createElement('canvas');
const tmp_ctx = tmp_canvas.getContext('2d');
tmp_canvas.id = "tmp-canvas";
tmp_canvas.width = canvas.width;
tmp_canvas.height = canvas.height;
document.body.appendChild(tmp_canvas);

// Todo 変えられるように
tmp_ctx.lineWidth = 1;
tmp_ctx.strokeStyle = "black";

//線の結合部分を滑らかにする
tmp_ctx.lineJoin = "round";
tmp_ctx.lineCap = "round";

/**
 * @param {Boolean} isMousePushed マウスが押されているかを表す、押されていない時にmousemoveイベントを発火しないための変数
 * @param {List[Object]} points 前回のmousedownイベントからのマウスの位置を保存しておく
*/
let isMousePushed = false,
    points = [];

tmp_canvas.addEventListener("mousedown", (e) => {
    isMousePushed = true;

    // pointsに現在のマウスの位置をpush
    points.push(getMousePosition(canvas, e));
});

tmp_canvas.addEventListener("mousemove", drawCanvas);

tmp_canvas.addEventListener("mouseup", () => {
    // isMousePushedをfalseにし、mousemoveイベントを発火させないように
    isMousePushed = false;

    // tmp_canvasに描いたものをcanvasにコピー
    ctx.drawImage(tmp_canvas, 0, 0);

    // tmp_canvasをclear
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

    // 配列を空に
    points.length = 0;
})

function drawCanvas(e) {
    // マウスが押されてなければ何もしない
    if (!isMousePushed) return;

    points.push(getMousePosition(canvas, e));

    // canvasをクリア
    tmp_ctx.clearRect(0, 0, canvas.width, canvas.height);

    // もしpointsが3個以上無ければpoints[i+1]を参照できないので円を書いて代用
    if (points.length < 3) {
        const lastMousePosition = points[0];
        tmp_ctx.beginPath();
        tmp_ctx.arc(lastMousePosition.x, lastMousePosition.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
        tmp_ctx.fill();
        tmp_ctx.closePath();

        return;
    }

    // pointsをもとに二次ベジェ曲線を引いていく
    tmp_ctx.beginPath();
    tmp_ctx.moveTo(points[0].x, points[0].y);

    let i;
    for (i = 1; i < points.length - 2; i++) {
        const cpx = (points[i].x + points[i + 1].x) / 2;
        const cpy = (points[i].y + points[i + 1].y) / 2;
        tmp_ctx.quadraticCurveTo(points[i].x, points[i].y, cpx, cpy);
    }

    tmp_ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    tmp_ctx.stroke();
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