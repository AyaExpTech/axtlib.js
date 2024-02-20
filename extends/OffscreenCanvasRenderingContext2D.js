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
 *  @param {String} kind - 描画する図形の種類 (許可値 : `"rectangle"`(矩形), `"ellipse"`(楕円), `"text"`(テキスト), `"path"`(パス), `"image"`(画像))
 *  @param {Object} options - 描画時のオプション
 *  
 *  ※以下、`options.stroke`が`"none"`でない場合のみ有効
 *      @param {Number} [options.thickness = 1] - 輪郭の太さ(px)
 *  
 *  ※以下、`kind`が`"rectangle"`の場合のみ有効
 *     @param {Array} options.corner - 角をどのように描画するか
 *     @param {"C"|"R"} [options.corner[0] = "C"] - 角の描画タイプ。Cで角落とし、Rで角丸
 *     @param {Number} [options.corner[1] = 0] - 角の半径(px)。矩形の短辺の半分を超える値は無効
 *  
 *  ※以下、`kind`が`"rectangle"`・`"ellipse"`・`"image"`の場合のみ有効
 *      @param {Number[]} options.size - 図形の描画幅・高さ(px)。[幅, 高さ]の順で指定する。(imageに限り、指定がない場合は自動設定)
 *  
 *  ※以下、`kind`が`"rectangle"`・`"ellipse"`・`"text"`・`"image"`の場合のみ有効
 *      @param {Number[]} options.pos - [基準点のX座標, 基準点のY座標]
 *      @param {String} [options.align = ""] - 整列方向の一括設定 (許可値 : `""`, `"n"`, `"ne"`, `"e"`, `"se"`, `"s"`, `"sw"`, `"w"`, `"nw"`)
 *  
 *  ※以下、`kind`が`"rectangle"`・`"ellipse"`・`"text"`・`"path"`の場合のみ有効
 *      @param {String|CanvasGradient|CanvasPattern|Array} options.fill - 塗りつぶし色(塗りつぶさない場合はnull) 
 *          ※rectangle・ellipse・pathはグラデーション記法(Array)使用可能。
 *          「[方向(neswを使って指定), [色の位置(0~1), 色], [色の位置(0~1), 色], ……]」で指定する
 *      @param {String|CanvasGradient|CanvasPattern|Array} options.stroke - 塗りつぶし色(塗りつぶさない場合はnull) 
 *          ※rectangle・ellipse・pathはグラデーション記法(Array)使用可能。
 *          「[方向(neswを使って指定), [色の位置(0~1), 色], [色の位置(0~1), 色], ……]」で指定する
 *      @param {(Number|String)[]} [options.shadowFill] - 塗りつぶし部分に対する影の描画に関する設定。[右方向ずらし量(px), 下方向ずらし量(px), ぼかし量(px), 影の色(String)]の順で指定する。省略した場合は影を描画しない。
 *      @param {(Number|String)[]} [options.shadowStroke] - 輪郭部分に対する影の描画に関する設定。[右方向ずらし量(px), 下方向ずらし量(px), ぼかし量(px), 影の色(String)]の順で指定する。省略した場合は影を描画しない。
 *  
 *  ※以下、`kind`が`"rectangle"`・`"ellipse"`・`"path"`の場合のみ有効
 *      @param {Number[]} [options.range = [0, this.canvas.height, 0, this.canvas.width]] - グラデーションの範囲。[上端, 下端, 左端, 右端]の順で指定する。pathでグラデを描く場合指定推奨
 *  
 *  ※以下、`kind`が`"text"`の場合のみ有効
 *      @param {String} options.text - 描画するテキスト
 *      @param {String} options.font - 使用するフォントに関する設定 (CSSの`font`と同じ形式の文字列)
 *      @param {Number?} options.maxWidth - テキストの最大描画幅(px)
 *  
 *  ※以下、`kind`が`"path"`の場合のみ有効
 *      @param {String} options.d - 描かれるパスを、[SVGのd属性](https://developer.mozilla.org/ja/docs/Web/SVG/Attribute/d)と同様の形式で記述する。絶対座標の原点はoptions.posXとoptions.posYに依存
 *      @param {"nonzero"|"evenodd"} [options.fillRule = "nonzero"] - 塗りつぶしルール
 *  
 *  ※以下、`kind`が`"image"`の場合のみ有効
 *      @param {HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas} options.image - 描画する画像リソース
 */
OffscreenCanvasRenderingContext2D.prototype.axt_draw = function (kind, options) {
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
        this.shadowOffsetX = options?.shadowFill?.at(0) ?? shadowPredecessor.shadowOffsetX;
        this.shadowOffsetY = options?.shadowFill?.at(1) ?? shadowPredecessor.shadowOffsetY;
        this.shadowBlur = options?.shadowFill?.at(2) ?? shadowPredecessor.shadowBlur;
        this.shadowColor = options?.shadowFill?.at(3) ?? shadowPredecessor.shadowColor;
    };
    const changeShadowSetting_stroke = () => {
        this.shadowOffsetX = options?.shadowStroke?.at(0) ?? shadowPredecessor.shadowOffsetX;
        this.shadowOffsetY = options?.shadowStroke?.at(1) ?? shadowPredecessor.shadowOffsetY;
        this.shadowBlur = options?.shadowStroke?.at(2) ?? shadowPredecessor.shadowBlur;
        this.shadowColor = options?.shadowStroke?.at(3) ?? shadowPredecessor.shadowColor;
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
    // 別途プロパティで指定されている場合はそれを使う
    {
        specifiedPos.top = options?.range?.at(0) ?? 0;
        specifiedPos.bottom = options?.range?.at(1) ?? this.canvas.height;
        specifiedPos.left = options?.range?.at(2) ?? 0;
        specifiedPos.right = options?.range?.at(3) ?? this.canvas.width;
        specifiedPos.middle = (specifiedPos.top + specifiedPos.bottom) / 2;
        specifiedPos.center = (specifiedPos.left + specifiedPos.right) / 2;
    }
    /** @type {String[]} - 左中右のX座標・上中下のY座標が必要なkindの一覧 */
    const posNeedTypes = [
        "rectangle",
        "ellipse",
        "image"
    ];
    if (kind == "image") {
        options.size = options.size ?? [options.image.width, options.image.height];
    }
    if (posNeedTypes.includes(kind)) {
        switch (specifiedAlign.vertical) {
            case "top":
                specifiedPos.top = options.pos[1];
                specifiedPos.middle = options.pos[1] + options.size[1] / 2;
                specifiedPos.bottom = options.pos[1] + options.size[1];
                break;
            case "middle":
                specifiedPos.top = options.pos[1] - options.size[1] / 2;
                specifiedPos.middle = options.pos[1];
                specifiedPos.bottom = options.pos[1] + options.size[1] / 2;
                break;
            case "bottom":
                specifiedPos.top = options.pos[1] - options.size[1];
                specifiedPos.middle = options.pos[1] - options.size[1] / 2;
                specifiedPos.bottom = options.pos[1];
                break;
            default:
                break;
        }
        switch (specifiedAlign.horizontal) {
            case "left":
                specifiedPos.left = options.pos[0];
                specifiedPos.center = options.pos[0] + options.size[0] / 2;
                specifiedPos.right = options.pos[0] + options.size[0];
                break;
            case "center":
                specifiedPos.left = options.pos[0] - options.size[0] / 2;
                specifiedPos.center = options.pos[0];
                specifiedPos.right = options.pos[0] + options.size[0] / 2;
                break;
            case "right":
                specifiedPos.left = options.pos[0] - options.size[0];
                specifiedPos.center = options.pos[0] - options.size[0] / 2;
                specifiedPos.right = options.pos[0];
            default:
                break;
        }
    }

    /** ================================================================
     * options.fill・options.strokeを解析して、線形グラデーション記法ならばCanvasGradientオブジェクトに変換する
    ================================================================= */
    /* options.fill */
    if (posNeedTypes.includes(kind) || kind === "path") {
        /* プロパティを可能ならJSON文字列として解析する */
        const parsed = (x => { try { return JSON.parse(x) } catch (err) { return x } })(options.fill);
        /* グラデーション記法(Array)の場合 */
        if (parsed instanceof Array) {
            /* 0番目はグラデーションの方向(neswを使って指定)なので取り出す */
            const direction = parsed.shift();
            /* 始点・終点の座標を取得 */
            let startX = specifiedPos.center,
                startY = specifiedPos.middle,
                endX = specifiedPos.center,
                endY = specifiedPos.middle;
            {
                if (direction.includes("n")) {
                    startY = specifiedPos.bottom;
                    endY = specifiedPos.top;
                }
                if (direction.includes("s")) {
                    startY = specifiedPos.top;
                    endY = specifiedPos.bottom;
                }
                if (direction.includes("e")) {
                    startX = specifiedPos.left;
                    endX = specifiedPos.right;
                }
                if (direction.includes("w")) {
                    startX = specifiedPos.right;
                    endX = specifiedPos.left;
                }
            }
            /* グラデーションオブジェクトを作成 */
            const gradient = this.createLinearGradient(startX, startY, endX, endY);
            /* colorStopを追加 */
            parsed.forEach(el => {
                gradient.addColorStop(el[0], el[1]);
            });
            /* options.fillを上書き */
            options.fill = gradient;
        }
    }
    /* options.stroke */
    if (posNeedTypes.includes(kind) || kind === "path") {
        /* プロパティを可能ならJSON文字列として解析する */
        const parsed = (x => { try { return JSON.parse(x) } catch (err) { return x } })(options.stroke);
        /* グラデーション記法(Array)の場合 */
        if (parsed instanceof Array) {
            /* 0番目はグラデーションの方向(neswを使って指定)なので取り出す */
            const direction = parsed.shift();
            /* 始点・終点の座標を取得 */
            let startX = specifiedPos.center,
                startY = specifiedPos.middle,
                endX = specifiedPos.center,
                endY = specifiedPos.middle;
            {
                if (direction.includes("n")) {
                    startY = specifiedPos.bottom;
                    endY = specifiedPos.top;
                }
                if (direction.includes("s")) {
                    startY = specifiedPos.top;
                    endY = specifiedPos.bottom;
                }
                if (direction.includes("e")) {
                    startX = specifiedPos.left;
                    endX = specifiedPos.right;
                }
                if (direction.includes("w")) {
                    startX = specifiedPos.right;
                    endX = specifiedPos.left;
                }
            }
            /* グラデーションオブジェクトを作成 */
            const gradient = this.createLinearGradient(startX, startY, endX, endY);
            /* colorStopを追加 */
            parsed.forEach(el => {
                gradient.addColorStop(el[0], el[1]);
            });
            /* options.strokeを上書き */
            options.stroke = gradient;
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
        /* ==== 角丸めを考慮してパス文字列を作成する ==== */
        const rectCornerType = options.corner?.[0] ?? "C";
        const rectCornerRadius = Math.min(options.corner?.[1] ?? 0, Math.min(options.size[0], options.size[1]) / 2);
        let rectPathStr = "";
        {
            /* ①左上の角の左下側からスタート */
            rectPathStr += `M ${specifiedPos.left} ${specifiedPos.top + rectCornerRadius} `;
            /* ②左上の角の右上側へ */
            switch (rectCornerType) {
                case "R": // 角丸め
                    rectPathStr += `A ${rectCornerRadius} ${rectCornerRadius} 0 0 1 ${specifiedPos.left + rectCornerRadius} ${specifiedPos.top} `; // 左上の角
                    break;
                default: // 角落とし
                    rectPathStr += `L ${specifiedPos.left + rectCornerRadius} ${specifiedPos.top} `; // 左上の角
                    break;
            }
            /* ③右上の角の左上側へ */
            rectPathStr += `L ${specifiedPos.right - rectCornerRadius} ${specifiedPos.top} `;
            /* ④右上の角の右下側へ */
            switch (rectCornerType) {
                case "R": // 角丸め
                    rectPathStr += `A ${rectCornerRadius} ${rectCornerRadius} 0 0 1 ${specifiedPos.right} ${specifiedPos.top + rectCornerRadius} `; // 右上の角
                    break;
                default: // 角落とし
                    rectPathStr += `L ${specifiedPos.right} ${specifiedPos.top + rectCornerRadius} `; // 右上の角
                    break;
            }
            /* ⑤右下の角の右上側へ */
            rectPathStr += `L ${specifiedPos.right} ${specifiedPos.bottom - rectCornerRadius} `;
            /* ⑥右下の角の左下側へ */
            switch (rectCornerType) {
                case "R": // 角丸め
                    rectPathStr += `A ${rectCornerRadius} ${rectCornerRadius} 0 0 1 ${specifiedPos.right - rectCornerRadius} ${specifiedPos.bottom} `; // 右下の角
                    break;
                default: // 角落とし
                    rectPathStr += `L ${specifiedPos.right - rectCornerRadius} ${specifiedPos.bottom} `; // 右下の角
                    break;
            }
            /* ⑦左下の角の右下側へ */
            rectPathStr += `L ${specifiedPos.left + rectCornerRadius} ${specifiedPos.bottom} `;
            /* ⑧左下の角の左上側へ */
            switch (rectCornerType) {
                case "R": // 角丸め
                    rectPathStr += `A ${rectCornerRadius} ${rectCornerRadius} 0 0 1 ${specifiedPos.left} ${specifiedPos.bottom - rectCornerRadius} `; // 左下の角
                    break;
                default: // 角落とし
                    rectPathStr += `L ${specifiedPos.left} ${specifiedPos.bottom - rectCornerRadius} `; // 左下の角
                    break;
            }
            /* ⑨左上の角の左下側へ */
            rectPathStr += `L ${specifiedPos.left} ${specifiedPos.top + rectCornerRadius} `;
            /* ⑩パスを閉じる */
            rectPathStr += `Z`;
        }
        /* ==== パスObjectを作成する ==== */
        const rectPath = new Path2D(rectPathStr);
        /* ==== 矩形を描画する ==== */
        changeShadowSetting_fill();
        options.fill == null ? void 0
            : this.fill(rectPath);
        changeShadowSetting_stroke();
        options.stroke == null ? void 0
            : this.stroke(rectPath);
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
        const κ_x = options.size[0] / 2 * κ_90deg;
        const κ_y = options.size[1] / 2 * κ_90deg;
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
        this.font = options?.font ?? "10px sans-serif";
        /* ==== テキストを描画する ==== */
        changeShadowSetting_fill();
        options.fill == null ? void 0 : this.fillText(options.text, options.pos[0], options.pos[1], options.maxWidth || undefined);
        changeShadowSetting_stroke();
        options.stroke == null ? void 0 : this.strokeText(options.text, options.pos[0], options.pos[1], options.maxWidth || undefined);
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

    /** ================================================================
     * 画像 ("image")
    ================================================================= */
    if (kind === "image") {
        /* ==== 画像の幅と高さ ==== */
        const imgWidth = options.size[0] ?? options.image.width;
        const imgHeight = options.size[1] ?? options.image.height;
        /* ==== 描画する ==== */
        // drawImage(image, dx, dy, dWidth, dHeight)
        this.drawImage(options.image, specifiedPos.left, specifiedPos.top, imgWidth, imgHeight);
        return;
    }
};
