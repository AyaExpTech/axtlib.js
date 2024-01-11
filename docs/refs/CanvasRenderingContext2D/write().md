# `CanvasRenderingContext2D.prototype.write()`

> - First Appearance : `ver0.1.0`
> - Latest Update : `ver0.1.0`

- テキストを描画します。
    - `OffscreenCanvasRenderingContext2D.prototype.write()`も同様に機能します。
- 第7引数(`dir`)には、以下の通り数値を指定します。
    - `dir = 1` : 左上を基準にする
    - `dir = 2` : 中央上を基準にする
    - `dir = 3` : 右上を基準にする
    - `dir = 4` : 中央左を基準にする
    - `dir = 5` : 中央を基準にする
    - `dir = 6` : 中央右を基準にする
    - `dir = 7` : 左下を基準にする
    - `dir = 8` : 中央下を基準にする
    - `dir = 9` : 右下を基準にする

## JSDoc

```js
/**
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
```