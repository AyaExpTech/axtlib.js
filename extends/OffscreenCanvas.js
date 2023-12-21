/**
 * getContextのエイリアス
 * @returns {CanvasRenderingContext2D} - Canvasに対応するContext
 */
Object.defineProperty(OffscreenCanvas.prototype, "ctx", {
    get: function () {
        return this.getContext("2d");
    },
});