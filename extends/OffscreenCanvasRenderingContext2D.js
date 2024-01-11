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

/**
 * 汎用描画メソッド : 指定した図形を描画します。
 *  【引数の一覧】
 *  ※以下、すべての場合で有効
 *      @param {String} kind - 描画する図形の種類 (許可値 : `"rectangle"`(矩形), `"ellipse"`(楕円), `"text"`(テキスト), `"path"`(パス))
 *      @param {Object} options - 描画時のオプション
 *      @param {String|CanvasGradient|CanvasPattern} options.fill - 塗りつぶし色(塗りつぶさない場合はnullishを指定)
 *      @param {String|CanvasGradient|CanvasPattern} options.stroke - 輪郭色(塗りつぶさない場合はnullishを指定)
 *      @param {Object} [options.shadowFill] - 塗りつぶし部分に対する影の描画に関する設定
 *      @param {Number} [options.shadowFill.x] - 影の右方向ずらし量(px)
 *      @param {Number} [options.shadowFill.y] - 影の下方向ずらし量(px)
 *      @param {Number} [options.shadowFill.blur] - 影のぼかし量(px)
 *      @param {String} [options.shadowFill.color] - 影の色
 *      @param {Object} [options.shadowStroke] - 輪郭部分に対する影の描画に関する設定
 *      @param {Number} [options.shadowStroke.x] - 影の右方向ずらし量(px)
 *      @param {Number} [options.shadowStroke.y] - 影の下方向ずらし量(px)
 *      @param {Number} [options.shadowStroke.blur] - 影のぼかし量(px)
 *      @param {String} [options.shadowStroke.color] - 影の色
 *  
 *  ※以下、`options.stroke`が`"none"`でない場合のみ有効
 *      @param {Number} [options.thickness = 1] - 輪郭の太さ(px)
 *  
 *  ※以下、`kind`が`"rectangle"`・`"ellipse"`の場合のみ有効
 *      @param {Number} options.width - 図形の描画幅
 *      @param {Number} options.height - 図形の描画高さ
 *  
 *  ※以下、`kind`が`"rectangle"`・`"ellipse"`・`"text"`の場合のみ有効
 *      @param {Number} options.posX - 基準点のX座標
 *      @param {Number} options.posY - 基準点のY座標
 *      @param {String} [options.align = ""] - 整列方向の一括設定 (許可値 : `""`, `"n"`, `"ne"`, `"e"`, `"se"`, `"s"`, `"sw"`, `"w"`, `"nw"`)
 *  
 *  ※以下、`kind`が`"text"`の場合のみ有効
 *      @param {String} options.text - 描画するテキスト
 *      @param {Object} options.font - 使用するフォント
 *      @param {String} [options.font.style = ""] - フォントのスタイル (許可値 : `""`, `"normal"`, `"italic"`, `"oblique"`)
 *      @param {String} [options.font.caps = ""] - 大文字の代替字形設定 (許可値 : `""`, "`normal`", `"small-caps"`)
 *      @param {String} [options.font.weight = ""] - フォントの太さ (許可値 : `""`, `"normal"`, `"bold"`, `"lighter"`, `"bolder"`, 1以上1000以下の整数)
 *      @param {String} [options.font.stretch = ""] - フォントの伸縮設定 (許可値 : `""`, `"normal"`, "ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded")
 *      @param {String} [options.font.size = "1em"] - フォントの大きさ
 *      @param {String} [options.font.lineHeight = "1"] - 1行の高さ
 *      @param {String} [options.font.family = "sans-serif"] - 使用するフォントの優先順位
 *      @param {Number?} options.maxWidth - テキストの最大描画幅(px)
 *  
 *  ※以下、`kind`が`"path"`の場合のみ有効
 *      @param {String} options.d - 描かれるパスを、[SVGのd属性](https://developer.mozilla.org/ja/docs/Web/SVG/Attribute/d)と同様の形式で記述する。絶対座標の原点はoptions.posXとoptions.posYに依存
 *      @param {"nonzero"|"evenodd"} [options.fillRule = "nonzero"] - 塗りつぶしルール
 */
CanvasRenderingContext2D.prototype.axt_draw = function (kind, options) {
    /** ================================================================
     * 影を設定する
    ================================================================= */
    const shadowPredecessor = {
        "shadowOffsetX": this.shadowOffsetX,
        "shadowOffsetY": this.shadowOffsetY,
        "shadowBlur": this.shadowBlur,
        "shadowColor": this.shadowColor
    }
    const changeShadowSetting_fill = () => {
        this.shadowOffsetX = options?.shadowFill?.x ?? shadowPredecessor.shadowOffsetX;
        this.shadowOffsetY = options?.shadowFill?.y ?? shadowPredecessor.shadowOffsetY;
        this.shadowBlur = options?.shadowFill?.blur ?? shadowPredecessor.shadowBlur;
        this.shadowColor = options?.shadowFill?.color ?? shadowPredecessor.shadowColor;
    };
    const changeShadowSetting_stroke = () => {
        this.shadowOffsetX = options?.shadowStroke?.x ?? shadowPredecessor.shadowOffsetX;
        this.shadowOffsetY = options?.shadowStroke?.y ?? shadowPredecessor.shadowOffsetY;
        this.shadowBlur = options?.shadowStroke?.blur ?? shadowPredecessor.shadowBlur;
        this.shadowColor = options?.shadowStroke?.color ?? shadowPredecessor.shadowColor;
    };
    const intlShadowSetting = () => {
        this.shadowOffsetX = shadowPredecessor.shadowOffsetX;
        this.shadowOffsetY = shadowPredecessor.shadowOffsetY;
        this.shadowBlur = shadowPredecessor.shadowBlur;
        this.shadowColor = shadowPredecessor.shadowColor;
    };

    /** ================================================================
     * alignを解析して水平方向と垂直方向のalignに分割する
    ================================================================= */
    const specifiedAlign = {
        /** @type {"top" | "middle" | "bottom"} - 垂直方向 */
        "vertical": "middle",
        /** @type {"left" | "center" | "right"} - 水平方向 */
        "horizontal": "center"
    };
    if ((options?.align ?? "").includes("s")) {
        specifiedAlign.vertical = "bottom";
    }
    if ((options?.align ?? "").includes("n")) {
        specifiedAlign.vertical = "top";
    }
    if ((options?.align ?? "").includes("e")) {
        specifiedAlign.horizontal = "right";
    }
    if ((options?.align ?? "").includes("w")) {
        specifiedAlign.horizontal = "left";
    }

    /** ================================================================
     * align・posX・posYの値から、描画する図形の左中右のX座標・上中下のY座標を求める
    ================================================================= */
    const specifiedPos = {
        /** @type {Number} - 上 Y座標 */
        "top": NaN,
        /** @type {Number} - 中 Y座標 */
        "middle": NaN,
        /** @type {Number} - 下 Y座標 */
        "bottom": NaN,
        /** @type {Number} - 左 X座標 */
        "left": NaN,
        /** @type {Number} - 中 X座標 */
        "center": NaN,
        /** @type {Number} - 右 X座標 */
        "right": NaN
    }
    /** @type {String[]} - 左中右のX座標・上中下のY座標が必要なkindの一覧 */
    const posNeedTypes = [
        "rectangle",
        "ellipse"
    ];
    if (posNeedTypes.includes(kind)) {
        switch (specifiedAlign.vertical) {
            case "top":
                specifiedPos.top = options.posY;
                specifiedPos.middle = options.posY + options.height / 2;
                specifiedPos.bottom = options.posY + options.height;
                break;
            case "middle":
                specifiedPos.top = options.posY - options.height / 2;
                specifiedPos.middle = options.posY;
                specifiedPos.bottom = options.posY + options.height / 2;
                break;
            case "bottom":
                specifiedPos.top = options.posY - options.height;
                specifiedPos.middle = options.posY - options.height / 2;
                specifiedPos.bottom = options.posY;
                break;
            default:
                break;
        }
        switch (specifiedAlign.horizontal) {
            case "left":
                specifiedPos.left = options.posX;
                specifiedPos.center = options.posX + options.width / 2;
                specifiedPos.right = options.posX + options.width;
                break;
            case "center":
                specifiedPos.left = options.posX - options.width / 2;
                specifiedPos.center = options.posX;
                specifiedPos.right = options.posX + options.width / 2;
                break;
            case "right":
                specifiedPos.left = options.posX - options.width;
                specifiedPos.center = options.posX - options.width / 2;
                specifiedPos.right = options.posX;
            default:
                break;
        }
    }

    /** ================================================================
     * 矩形 ("rectangle")
    ================================================================= */
    if (kind === "rectangle") {
        /* ==== 現時点でのfillStyle・strokeStyle・lineWidthをメモしておく ==== */
        const predecessor = {
            "fillStyle": this.fillStyle,
            "strokeStyle": this.strokeStyle,
            "lineWidth": this.lineWidth
        };
        /* ==== 関係する描画設定プロパティを指定通りに変更する ==== */
        [this.fillStyle, this.strokeStyle, this.lineWidth] = [options.fill, options.stroke, options.thickness];
        /* ==== 矩形を描画する ==== */
        changeShadowSetting_fill();
        options.fill == null ? void 0
            : this.fillRect(specifiedPos.left, specifiedPos.top, options.width, options.height);
        changeShadowSetting_stroke();
        options.stroke == null ? void 0
            : this.strokeRect(specifiedPos.left, specifiedPos.top, options.width, options.height);
        intlShadowSetting();
        /* ==== メモしてあったfillStyle・strokeStyle・lineWidthをもとに戻す ==== */
        [this.fillStyle, this.strokeStyle, this.lineWidth] = [predecessor.fillStyle, predecessor.strokeStyle, predecessor.lineWidth];
        return;
    }

    /** ================================================================
     * 楕円 ("ellipse")
     * (※3次ベジェ曲線による近似を用いて、90度ごとに4分割して描画します)
    ================================================================= */
    if (kind === "ellipse") {
        /* ==== 現時点でのfillStyle・strokeStyle・lineWidthをメモしておく ==== */
        const predecessor = {
            "fillStyle": this.fillStyle,
            "strokeStyle": this.strokeStyle,
            "lineWidth": this.lineWidth
        };
        /* ==== 関係する描画設定プロパティを指定通りに変更する ==== */
        [this.fillStyle, this.strokeStyle, this.lineWidth] = [options.fill, options.stroke, options.thickness];
        /* ==== パスを書く ==== */
        /** @type {Number} - 3次ベジェ曲線による円の描画の制御点の位置(マジックナンバー) */
        const κ_90deg = 4 * (Math.sqrt(2) - 1) / 3;
        const κ_x = options.width / 2 * κ_90deg;
        const κ_y = options.height / 2 * κ_90deg;
        /* -- パスを開始する -- */
        this.beginPath();
        this.moveTo(specifiedPos.right, specifiedPos.middle);
        /* -- 第1象限 -- */
        this.bezierCurveTo(specifiedPos.right, specifiedPos.middle - κ_y, specifiedPos.center + κ_x, specifiedPos.top, specifiedPos.center, specifiedPos.top);
        /* -- 第2象限 -- */
        this.bezierCurveTo(specifiedPos.center - κ_x, specifiedPos.top, specifiedPos.left, specifiedPos.middle - κ_y, specifiedPos.left, specifiedPos.middle);
        /* -- 第3象限 -- */
        this.bezierCurveTo(specifiedPos.left, specifiedPos.middle + κ_y, specifiedPos.center - κ_x, specifiedPos.bottom, specifiedPos.center, specifiedPos.bottom);
        /* -- 第4象限 -- */
        this.bezierCurveTo(specifiedPos.center + κ_x, specifiedPos.bottom, specifiedPos.right, specifiedPos.middle + κ_y, specifiedPos.right, specifiedPos.middle);
        /* -- パスを閉じる -- */
        this.closePath();
        /* ==== 描画する ==== */
        changeShadowSetting_fill();
        options.fill == null ? void 0
            : this.fill();
        changeShadowSetting_stroke();
        options.stroke == null ? void 0
            : this.stroke();
        intlShadowSetting();
        /* ==== メモしてあったfillStyle・strokeStyle・lineWidthをもとに戻す ==== */
        [this.fillStyle, this.strokeStyle, this.lineWidth] = [predecessor.fillStyle, predecessor.strokeStyle, predecessor.lineWidth];
        return;
    }

    /** ================================================================
     * テキスト ("text")
    ================================================================= */
    if (kind === "text") {
        /* ==== 現時点でのfillStyle・strokeStyle・lineWidthをメモしておく ==== */
        const predecessor = {
            "fillStyle": this.fillStyle,
            "strokeStyle": this.strokeStyle,
            "lineWidth": this.lineWidth,
            "textAlign": this.textAlign,
            "textBaseline": this.textBaseline,
            "font": this.font
        };
        /* ==== 関係する描画設定プロパティ(font以外)をoptionsの指定通りに設定する ==== */
        [this.fillStyle, this.strokeStyle, this.lineWidth] = [options.fill, options.stroke, options.thickness];
        [this.textAlign, this.textBaseline] = [specifiedAlign.horizontal, specifiedAlign.vertical];
        /* ==== fontプロパティの文字列をoptions.fontから作成して設定する ==== */
        this.font = `${[options?.font?.style, options?.font?.caps, options?.font?.weight, options?.font?.stretch].filter(v => v && v != "normal").join(" ")} ${options?.font?.size ?? "1rem"}/${options?.font?.lineHeight ?? "1"} ${options?.font?.family ?? "sans-serif"}`.trim();
        /* ==== テキストを描画する ==== */
        changeShadowSetting_fill();
        options.fill == null ? void 0 : this.fillText(options.text, options.posX, options.posY, options.maxWidth || undefined);
        changeShadowSetting_stroke();
        options.stroke == null ? void 0 : this.strokeText(options.text, options.posX, options.posY, options.maxWidth || undefined);
        intlShadowSetting();
        /* ==== メモしてあった各プロパティをもとに戻す ==== */
        [this.fillStyle, this.strokeStyle, this.lineWidth] = [predecessor.fillStyle, predecessor.strokeStyle, predecessor.lineWidth];
        [this.font, this.textAlign, this.textBaseline] = [predecessor.font, predecessor.textAlign, predecessor.textBaseline];
        return;
    }

    /** ================================================================
     * パスコマンド ("path")
    ================================================================= */
    if (kind === "path") {
        /* ==== 現時点でのfillStyle・strokeStyle・lineWidthをメモしておく ==== */
        const predecessor = {
            "fillStyle": this.fillStyle,
            "strokeStyle": this.strokeStyle,
            "lineWidth": this.lineWidth
        };
        /* ==== 関係する描画設定プロパティを指定通りに変更する ==== */
        [this.fillStyle, this.strokeStyle, this.lineWidth] = [options.fill, options.stroke, options.thickness];
        /* ==== パスを宣言する ==== */
        const pathObj = new Path2D(options.d);
        /* ==== 描画する ==== */
        changeShadowSetting_fill();
        options.fill == null ? void 0
            : this.fill(pathObj, options?.fillRule ?? "nonzero");
        changeShadowSetting_stroke();
        options.stroke == null ? void 0
            : this.stroke(pathObj);
        intlShadowSetting();
        /* ==== メモしてあったfillStyle・strokeStyle・lineWidthをもとに戻す ==== */
        [this.fillStyle, this.strokeStyle, this.lineWidth] = [predecessor.fillStyle, predecessor.strokeStyle, predecessor.lineWidth];
        return;
    }
};