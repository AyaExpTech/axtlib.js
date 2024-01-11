# `CanvasRenderingContext2D.prototype.axt_draw()`

> - First Appearance : `ver0.2.0`
> - Latest Update : `ver0.2.0`

- Canvasのための汎用描画メソッドです。
- `OffscreenCanvasRenderingContext2D.prototype.axt_draw()`も同様に機能します。
- 以下の図形のうち、第1引数で指定したものを描画します。
    - 長方形(矩形) `rectangle`
    - 楕円 `ellipse`
    - テキスト `text`
    - SVGパスコマンド `path`
- 図形の描画とは別に、影をどのように描画するかも設定できます。

## 引数

`axt_draw()`は、2つの引数をとります。

```js
/**
 * @param {String} kind - 描画する図形の種類 (許可値 : `"rectangle"`(矩形), `"ellipse"`(楕円), `"text"`(テキスト), `"path"`(パス))
 * @param {Object} options - 描画時のオプション
 */
```

どの図形を描画するかによって、`options`に必要なプロパティが変わります。

## 影の描画設定

どの図形を描画するかに関わらず、`options.shadowFill`, `options.shadowStroke`を指定することで影の描画設定を変更することができます。  
以下は、有効な`options.shadowFill`, `options,shadowStroke`の例です。
```js
{
    "x": 0,
    "y": 2,
    "blur": 4,
    "color": "black",
}
```

`axt_draw()`は、`options.shadowFill`, `options.shadowStroke`のプロパティにnullishでない値が指定されている場合に、一時的に描画する図形の影の描画に関する設定を変更します。

| `options.shadowFill`, `options.shadowStroke`のプロパティ名 | コンテキストの対応するプロパティ |
|:----:|:----:|
| `x` | `ctx.shadowOffsetX` |
| `y` | `ctx.shadowOffsetY` |
| `blur` | `ctx.shadowBlur` |
| `color` | `ctx.shadowColor` |

```js
/**
 * 【影の描画設定に関連する引数】
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
 */
```

## 長方形(矩形)

長方形(矩形)を描画する場合、`options`の以下のプロパティの指定が有効です。

```js
/**
 * 【長方形(矩形)の描画で有効な引数】
 *      @param {"rectangle"} kind - 描画する図形の種類
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
 *      @param {Number} options.width - 図形の描画幅
 *      @param {Number} options.height - 図形の描画高さ
 *      @param {Number} options.posX - 基準点のX座標
 *      @param {Number} options.posY - 基準点のY座標
 *      @param {String} [options.align = ""] - 整列方向の一括設定 (許可値 : `""`, `"n"`, `"ne"`, `"e"`, `"se"`, `"s"`, `"sw"`, `"w"`, `"nw"`)
 *  ※以下、`options.stroke`が`"none"`でない場合のみ有効
 *      @param {Number} [options.thickness = 1] - 輪郭の太さ(px)
 */
```

### 例

```js
canvas.ctx.axt_draw("rectangle", {
    "fill": "black",
    "stroke": null,
    "width": 1000,
    "height": 1000,
    "posX": 500,
    "posY": 1000,
    "align": "s"
});
canvas.ctx.axt_draw("rectangle", {
    "fill": "#c77",
    "stroke": "#f99",
    "shadowFill": {
        "x": 0,
        "y": 0,
        "blur": 16,
        "color": "#eee"
    },
    "width": 800,
    "height": 400,
    "posX": 100,
    "posY": 100,
    "align": "nw",
    "thickness": 4
});
```

![](./images/0c57731c-2eda-4838-bf0f-89c187ef5981.png)

## 楕円

楕円を描画する場合、`options`の以下のプロパティの指定が有効です。

```js
/**
 * 【楕円の描画で有効な引数】
 *      @param {"ellipse"} kind - 描画する図形の種類
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
 *      @param {Number} options.width - 図形の描画幅
 *      @param {Number} options.height - 図形の描画高さ
 *      @param {Number} options.posX - 基準点のX座標
 *      @param {Number} options.posY - 基準点のY座標
 *      @param {String} [options.align = ""] - 整列方向の一括設定 (許可値 : `""`, `"n"`, `"ne"`, `"e"`, `"se"`, `"s"`, `"sw"`, `"w"`, `"nw"`)
 *  ※以下、`options.stroke`が`"none"`でない場合のみ有効
 *      @param {Number} [options.thickness = 1] - 輪郭の太さ(px)
 */
```

### 例

```js
canvas.ctx.axt_draw("rectangle", {
    "fill": "black",
    "stroke": null,
    "width": 1000,
    "height": 1000,
    "posX": 500,
    "posY": 1000,
    "align": "s"
});
canvas.ctx.axt_draw("ellipse", {
    "fill": "#c77",
    "stroke": "#f99",
    "shadowFill": {
        "x": 0,
        "y": 0,
        "blur": 16,
        "color": "#eee"
    },
    "width": 1000,
    "height": 1000,
    "posX": 500,
    "posY": 500,
    "align": "",
    "thickness": 4
});
canvas.ctx.axt_draw("ellipse", {
    "fill": "#7c7",
    "stroke": null,
    "width": 800,
    "height": 400,
    "posX": 900,
    "posY": 700,
    "align": "se",
    "thickness": 4
});
```

![](./images/5536e6fc-721e-45bc-bb99-aa750f79947b.png)

## テキスト

テキストを描画する場合、`options`の以下のプロパティの指定が有効です。

```js
/**
 * 【テキストの描画で有効な引数】
 *      @param {"text"} kind - 描画する図形の種類
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
 *      @param {Number} options.posX - 基準点のX座標
 *      @param {Number} options.posY - 基準点のY座標
 *      @param {String} [options.align = ""] - 整列方向の一括設定 (許可値 : `""`, `"n"`, `"ne"`, `"e"`, `"se"`, `"s"`, `"sw"`, `"w"`, `"nw"`)
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
 *  ※以下、`options.stroke`が`"none"`でない場合のみ有効
 *      @param {Number} [options.thickness = 1] - 輪郭の太さ(px)
 */
```

### 例

```js
canvas.ctx.axt_draw("rectangle", {
    "fill": "black",
    "stroke": null,
    "width": 1000,
    "height": 1000,
    "posX": 500,
    "posY": 1000,
    "align": "s"
});
canvas.ctx.axt_draw("ellipse", {
    "fill": "#6d6",
    "width": 10,
    "height": 10,
    "posX": 500,
    "posY": 500,
    "align": ""
});
canvas.ctx.axt_draw("text", {
    "fill": "white",
    "stroke": "null",
    "posX": 500,
    "posY": 500,
    "align": "e",
    "text": "Hello, World!"
});
canvas.ctx.axt_draw("text", {
    "fill": "white",
    "stroke": "red",
    "shadowFill": {
        "x": 0,
        "y": 0,
        "blur": 16,
        "color": "#fff"
    },
    "posX": 500,
    "posY": 500,
    "align": "w",
    "text": "長い文章でもmaxWidthを指定することで指定した幅に収めることができます",
    "font": {
        "style": "italic",
        "caps": "small-caps",
        "weight": "bold",
        "stretch": "normal",
        "size": "2rem",
        "lineHeight": "2",
        "family": "monospace"
    },
    "maxWidth": 500,
    "thickness": 2
});
```

![](./images/e088f29d-9ed7-48b6-b70e-ea4e003eb3ae.png)

## SVGパスコマンド

SVGパスを描画する場合、`options`の以下のプロパティの指定が有効です。

```js
/**
 * 【SVGパスの描画で有効な引数】
 *      @param {"path"} kind - 描画する図形の種類
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
 *      @param {String} options.d - 描かれるパスを、[SVGのd属性](https://developer.mozilla.org/ja/docs/Web/SVG/Attribute/d)と同様の形式で記述する。絶対座標の原点はoptions.posXとoptions.posYに依存
 *      @param {"nonzero"|"evenodd"} [options.fillRule = "nonzero"] - 塗りつぶしルール
 *  ※以下、`options.stroke`が`"none"`でない場合のみ有効
 *      @param {Number} [options.thickness = 1] - 輪郭の太さ(px)
 */
```

### 例

```js
canvas.ctx.axt_draw("rectangle", {
    "fill": "black",
    "width": 1000,
    "height": 1000,
    "posX": 500,
    "posY": 1000,
    "align": "s"
});
canvas.ctx.axt_draw("path", {
    "fill": "green",
    "shadowFill": {
        "x": 0,
        "y": 0,
        "blur": 8,
        "color": "#fff"
    },
    "d": "M 50,0 L 21,90 L 98,35 L 2,35 L 79,90 Z"
});
canvas.ctx.axt_draw("path", {
    "fill": "green",
    "shadowFill": {
        "x": 0,
        "y": 0,
        "blur": 8,
        "color": "#fff"
    },
    "d": "M 150,0 L 121,90 L 198,35 L 102,35 L 179,90 Z",
    "fillRule": "evenodd"
});
canvas.ctx.axt_draw("path", {
    "stroke": "red",
    "shadowStroke": {
        "x": 0,
        "y": 0,
        "blur": 8,
        "color": "#fff"
    },
    "d": "M 100,900 C 300,900 250,100 500,100 S 700,900 900,900",
    "thickness": 4
});
```

![](./images/d847fc18-bdff-48fa-bcc2-83c4aa0af69e.png)

## JSDoc(全体)

```js
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
```