# `LayerableOffscreenCanvas`

> 継承 : `OffscreenCanvas`

## `.prototype.layer`

- 各レイヤーの内容を表す画像などの配列です。
    - 各要素は、`OffscreenCanvasRenderingContext2d.prototype.drawImage()`が受け付けるオブジェクトである必要があります。

```js
/**
 * @type {(HTMLImageElement|SVGImageElement|HTMLVideoElement|HTMLCanvasElement|ImageBitmap|OffscreenCanvas|VideoFrame)[]}
 */
```

## `.prototype.composite()`

- このキャンバスの内容を、`.prototype.layer`を順番に描画した結果にします。
    - 配列の先頭が下のレイヤー、末尾が上のレイヤーです。
- 描画後の内容を表す画像オブジェクトを返します。
    - 引数に`true`を指定した場合、`ImageBitmap`で解決する`Promise`を返します。
    - 引数に`false`を指定するか引数を指定しなかった場合、`OffscreenCanvas`を返します。

```js
/**
 * @param {Boolean} [needBitmap = false] - 返り値にImageBitmapを使うか(falseならOffscreenCanvas)
 * @returns {OffscreenCanvas|Promise<ImageBitmap>} - 全レイヤーの合成結果のImageBitmapかOffscreenCanvas
 */
```