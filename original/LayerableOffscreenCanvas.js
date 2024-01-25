globalThis.LayerableOffscreenCanvas = class LayerableOffscreenCanvas extends OffscreenCanvas {
    /**
     * @type {(HTMLImageElement|SVGImageElement|HTMLVideoElement|HTMLCanvasElement|ImageBitmap|OffscreenCanvas|VideoFrame)[]}
     */
    layer = []
    /**
     * @param {Boolean} [needBitmap = false] - 返り値にImageBitmapを使うか(falseならOffscreenCanvas)
     * @returns {OffscreenCanvas|Promise<ImageBitmap>} - 全レイヤーの合成結果のImageBitmapかOffscreenCanvas
     */
    composite(needBitmap = false) {
        const judgeType = i => (c => c.slice(c.indexOf(" ") + 1, -1))(Object.prototype.toString.call(i));
        /**
         * @type {(HTMLImageElement|SVGImageElement|HTMLVideoElement|HTMLCanvasElement|ImageBitmap|OffscreenCanvas|VideoFrame)[]}
         */
        const validElements = this.layer.filter(element => {
            const validTypes = [
                "HTMLImageElement",
                "SVGImageElement",
                "HTMLVideoElement",
                "HTMLCanvasElement",
                "ImageBitmap",
                "OffscreenCanvas",
                "VideoFrame"
            ];
            return validTypes.includes(judgeType(element));
        });
        this.getContext("2d").reset();
        validElements.forEach(layer => this.getContext("2d").drawImage(layer, 0, 0));
        return needBitmap ? createImageBitmap(this) : this;
    }
}