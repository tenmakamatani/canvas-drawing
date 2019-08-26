"use strict";

const deleteAllCanvas = () => {
    tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}