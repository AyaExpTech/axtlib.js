# `DatabaseStorage`

Web Storage APIの`LocalStorage`に近いコードで`IndexedDB`を利用するためのメソッドを提供します。

> - `DatabaseStorage`のメソッドはすべて静的メソッドです。
> - `DatabaseStorage`のメソッドはすべて非同期(Promise)です。
>     - async function内で`await`とともに利用するか、`.then()`チェーンをつないでください。

## `.delete()`

- 現在存在しているdatabase storageを消去します。

> - 引数は不要です。

```js
/**
 * @returns {Promise<Undefined>}
 */
```

## `.initialize()`

- database storageを初期化します。

> - 引数は不要です。
> - そのオリジンで初めてdatabase storageを使うときは、先に`.initialize()`を実行する必要があります。

```js
/**
 * @returns {Promise<Undefined>}
 */
```

## `.getMap()`

- 現在database storageに保存されているすべての値の一覧を`Map`で取得します。

> - 引数は不要です。

```js
/**
 * @returns {Promise<Map>}
 */
```

## `.getItem()`

- キーの名称を渡し、そのキーに対応する値を返します。

```js
/**
 * @param {any} key - 取得する値のキー
 * @returns {Promise<any>}
 */
```

## `.setItem()`

- キーの名前と値を渡し、ストレージにキーを追加・更新します。

```js
/**
 * @param {any} key - 挿入する値に対応するキー名称
 * @param {any} value - 挿入する値
 * @returns {Promise<Undefined>}
 */
```

## `.removeItem()`

- キーの名前を渡し、database storageからキーと値を削除します。

```js
/**
 * @param {any} key - 削除する値のキー
 * @returns {Promise<Undefined>}
 */
```

## `.clear()`

- database storageに格納されているすべてのキーを消去します。

> - 引数は不要です。

```js
/**
 * @returns {Promise<Undefined>}
 */
```

## `.key()`

- 数値を渡し、database storage内でn番目のキーの名称を返します。

> - キーの順序は代入した順番と同じになります。

```js
/**
 * @param {any} n - 何番目のキー名称を取得するか
 * @returns {Promise<any>}
 */
```