# AyaExpTech JavaScript Extend Library

綾急技研制作の、JavaScript拡張ライブラリです。
既存クラスの拡張、メソッドの追加などを行います。

## 導入方法

### import文を使う場合

module環境に限り、以下のようなコードでインポートできます。  
(バージョン名は適宜変更してください。)
```js
// extends
import "https://cdn.jsdelivr.net/gh/AyaExpTech/axtlib.js@v0.3.0/extends/CanvasRenderingContext2D.js";
// original
import DatabaseStorage from "https://cdn.jsdelivr.net/gh/AyaExpTech/axtlib.js@v0.3.0/original/DatabaseStorage.js";
```

axtlib.jsの既存クラス拡張をすべて読み込む場合は、以下のコードを用いることもできます。  
(バージョン名は適宜変更してください。)
```js
import "https://cdn.jsdelivr.net/gh/AyaExpTech/axtlib.js@v0.3.0/extends/extends/_all.js";
```

### import()を使う場合

module環境でない場合、Dynamic importを使うことができます。

```js
(async () => void await import("./extends/_all.js"))()
```

## License

Copyright (c) 2023- AyaExpTech, Ayasaka-Koto

- 基本的に、これにアクセスできる人であれば自由に使用していただいて構いません。
    - これが役立つのであればぜひ使ってください。
- ただし、以下に示す行為は禁じます。
    1. 日本の法令や公序良俗に反する行為
    2. 著作者を偽り無改変でこれらの著作物を再配布する行為
    3. その他、著作者(AyaExpTech, Ayasaka-Koto)が不適切と判断する行為

> - フォークはフォーク元が見えるのでOKです。
> - 任意ですが再配布などをするときは原本(GitHubのリポジトリ)へのリンクを書いてくれると嬉しいです。
