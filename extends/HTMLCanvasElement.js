/**
 * getContextのエイリアス
 * @returns {CanvasRenderingContext2D} - Canvasに対応するContext
 */
Object.defineProperty(HTMLCanvasElement.prototype, "ctx", {
    get: function () {
        return this.getContext("2d");
    },
});