/**
 * テキストを描画します。
 * @param {String|CanvasGradient|CanvasPattern} fill - 塗りつぶし色(塗りつぶさない場合は"none"を指定)
 * @param {String|CanvasGradient|CanvasPattern} stroke - 輪郭色(塗りつぶさない場合は"none"を指定)
 * @param {Number} x - 基準点のX座標
 * @param {Number} y - 基準点のY座標
 * @param {String} text - 描画するテキスト
 * @param {String} font - 使用するフォント。CSSの`font`プロパティで有効な値を使用
 * @param {Number} dir - 1〜9(123/456/789)で指定、基準点をどこにするか
 * @param {Number} [thickness=1] - 輪郭の幅
 * @param {Number} [max=0] - 文字の最大描画幅。0だと無視。
 * @returns {Undefined}
 */
OffscreenCanvasRenderingContext2D.prototype.write = function (fill, stroke, x, y, text, font, dir, thickness = 1, max = 0) {
    const predecessor = {
        "fillStyle": this.fillStyle,
        "strokeStyle": this.strokeStyle,
        "lineWidth": this.lineWidth,
        "font": this.font,
        "textAlign": this.textAlign,
        "textBaseline": this.textBaseline
    };
    const align = ["left", "center", "right"][(dir - 1) % 3];
    const baseline = ["top", "middle", "bottom"][Math.floor((dir - 1) / 3)];
    [this.fillStyle, this.strokeStyle] = [fill, stroke];
    this.lineWidth = thickness;
    [this.font, this.textAlign, this.textBaseline] = [font, align, baseline];
    fill === "none" ? void 0 : this.fillText(text, x, y, max || undefined);
    stroke === "none" ? void 0 : this.strokeText(text, x, y, max || undefined);
    [this.fillStyle, this.strokeStyle, this.lineWidth] = [predecessor.fillStyle, predecessor.strokeStyle, predecessor.lineWidth];
    [this.font, this.textAlign, this.textBaseline] = [predecessor.font, predecessor.textAlign, predecessor.textBaseline];
};

/**
 * 長方形を描画します。
 * @param {String|CanvasGradient|CanvasPattern} fill - 塗りつぶし色(塗りつぶさない場合は"none"を指定)
 * @param {String|CanvasGradient|CanvasPattern} stroke - 輪郭色(塗りつぶさない場合は"none"を指定)
 * @param {Number} x - 基準点のX座標
 * @param {Number} y - 基準点のY座標
 * @param {Number} width - 幅
 * @param {Number} height - 高さ
 * @param {Number} dir - 1〜9(123/456/789)で指定、基準点をどこにするか
 * @param {Number} [thickness=1] - 輪郭の幅
 * @returns {Undefined}
 */
OffscreenCanvasRenderingContext2D.prototype.rect = function (fill, stroke, x, y, width, height, dir, thickness = 1) {
    const predecessor = {
        "fillStyle": this.fillStyle,
        "strokeStyle": this.strokeStyle,
        "lineWidth": this.lineWidth
    };
    const leftPos = x - width * (((dir - 1) % 3) / 2);
    const topPos = y - height * (Math.floor((dir - 1) / 3) / 2);
    [this.fillStyle, this.strokeStyle] = [fill, stroke];
    this.lineWidth = thickness;
    fill === "none" ? void 0 : this.fillRect(leftPos, topPos, width, height);
    stroke === "none" ? void 0 : this.strokeRect(leftPos, topPos, width, height);
    [this.fillStyle, this.strokeStyle, this.lineWidth] = [predecessor.fillStyle, predecessor.strokeStyle, predecessor.lineWidth];
};

/**
 * 影の描画設定を変更します。
 * @param {Number} [x = 0] - 影を横方向にずらす距離
 * @param {Number} [y = 0] - 影を縦方向にずらす距離
 * @param {Number} [blur = 0] - 影のぼかし量
 * @param {String} [color = "transparent"] - 影の色
 * @returns {Undefined}
 */
OffscreenCanvasRenderingContext2D.prototype.setShadow = function (x = 0, y = 0, blur = 0, color = "transparent") {
    this.shadowOffsetX = x;
    this.shadowOffsetY = y;
    this.shadowBlur = blur;
    this.shadowColor = color;
    return;
}