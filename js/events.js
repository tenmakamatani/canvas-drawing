"use strict";


function clearAllCanvas() {
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadCanvas() {
    // ダウンロードリンク作成
    const link = document.createElement("a");
    link.href = canvas.toDataURL("iamge/png");

    // yyyy_mm_dd.pngの形でダウンロードさせる
    const date = new Date();
    const fileName = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`;
    link.download = fileName + ".png";
    link.click();
}