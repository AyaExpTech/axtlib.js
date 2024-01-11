# CanvasRenderingContext2D.prototype.setShadow()

> - First Appearance : `ver0.1.0`
> - Latest Update : `ver0.1.0`

- 影の描画設定を一括変更します。
    - 引数を指定しなかった場合、影の描画設定をすべてリセットします。
    - `OffscreenCanvasRenderingContext2D.prototype.setShadow()`も同様に機能します。

## JSDoc

```js
/**
 * @param {Number} [x = 0] - 影を横方向にずらす距離
 * @param {Number} [y = 0] - 影を縦方向にずらす距離
 * @param {Number} [blur = 0] - 影のぼかし量
 * @param {String} [color = "transparent"] - 影の色
 * @returns {Undefined}
 */
```