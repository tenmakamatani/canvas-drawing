"use strict";

const canvas = document.getElementById("real-canvas");
const canvasContainer = document.getElementById("canvas-container");
canvas.width = canvasContainer.clientWidth;
canvas.height = canvasContainer.clientHeight;

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
canvasContainer.appendChild(tmp_canvas);

// Todo 変えられるように
tmp_ctx.lineWidth = 1;
tmp_ctx.strokeStyle = "black";

//線の結合部分を滑らかにする
tmp_ctx.lineJoin = "round";
tmp_ctx.lineCap = "round";