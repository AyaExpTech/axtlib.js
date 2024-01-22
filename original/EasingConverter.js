export default class EasingConverter {
    /**
     * 利用できる関数の一覧を取得します。
     * @param {String} filter - フィルター(一致する文字列が含まれる関数のみ取得)
     * @returns {String[]} - 関数の一覧
     */
    static getList() {
        return [
            "linear",
            "linearIn",
            "linearOut",
            "linearInOut",
            "easeInSine",
            "easeOutSine",
            "easeInOutSine",
            "easeInQuad",
            "easeOutQuad",
            "easeInOutQuad",
            "easeInCubic",
            "easeOutCubic",
            "easeInOutCubic",
            "easeInQuart",
            "easeOutQuart",
            "easeInOutQuart",
            "easeInExpo",
            "easeOutExpo",
            "easeInOutExpo",
            "easeInCirc",
            "easeOutCirc",
            "easeInOutCirc"
        ].filter((v) => v.indexOf(filter) >= 0)
    }
    /**
     * 指定された関数で、0〜1の値をイージングします。
     * @param {String} easing
     * @param {Number} x - 0〜1の値
     * @returns {Number} - イージングされた値
     */
    static convert(easing, x) {
        // 0以下の値は0に、1以上の値は1にする
        if (x <= 0) {
            return 0;
        }
        else if (x >= 1) {
            return 1;
        }
        // 指定された関数でイージングした値を返す
        switch (easing) {
            case "linear":
                return x;
            case "linearIn":
                return x;
            case "linearOut":
                return x;
            case "linearInOut":
                return x;
            case "easeInSine":
                return 1 - Math.cos((x * Math.PI) / 2);
            case "easeOutSine":
                return Math.sin((x * Math.PI) / 2);
            case "easeInOutSine":
                return -(Math.cos(Math.PI * x) - 1) / 2;
            case "easeInQuad":
                return x ** 2;
            case "easeOutQuad":
                return 1 - (1 - x) ** 2;
            case "easeInOutQuad":
                return x < 0.5 ? 2 * x ** 2 : 1 - (-2 * x + 2) ** 2 / 2;
            case "easeInCubic":
                return x ** 3;
            case "easeOutCubic":
                return 1 - (1 - x) ** 3;
            case "easeInOutCubic":
                return x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2;
            case "easeInQuart":
                return x ** 4;
            case "easeOutQuart":
                return 1 - (1 - x) ** 4;
            case "easeInOutQuart":
                return x < 0.5 ? 8 * x ** 4 : 1 - (-2 * x + 2) ** 4 / 2;
            case "easeInExpo":
                return 2 ** (10 * x - 10);
            case "easeOutExpo":
                return 1 - 2 ** (-10 * x);
            case "easeInOutExpo":
                return x < 0.5 ? 2 ** (20 * x - 10) / 2 : (2 - 2 ** (-20 * x + 10)) / 2;
            case "easeInCirc":
                return 1 - Math.sqrt(1 - x ** 2);
            case "easeOutCirc":
                return Math.sqrt(1 - (x - 1) ** 2);
            case "easeInOutCirc":
                return x < 0.5 ? (1 - Math.sqrt(1 - (2 * x) ** 2)) / 2 : (Math.sqrt(1 - (-2 * x + 2) ** 2) + 1) / 2;
            default:
                throw new Error("Easing function not found.");
        }
    }
    /**
     * 指定された関数で、指定範囲の値をイージングします。
     * @param {String} easing
     * @param {Number} x - min〜maxの値
     * @param {Number} min - 最小値
     * @param {Number} max - 最大値
     * @returns {Number} - イージングされた値
     */
    static convertInRange(easing, x, min, max) {
        return this.convert(easing, (x - min) / (max - min)) * (max - min) + min;
    }
    /**
     * 指定された関数の3次ベジェ曲線の制御点の座標を取得します。
     * @param {String} easing
     * @returns {Number[]} - 制御点の座標(x1, y1, x2, y2)
     */
    static getControlPoints(easing) {
        switch (easing) {
            case "linear":
                return [0, 0, 1, 1];
            case "linearIn":
                return [0, 0, 1, 1];
            case "linearOut":
                return [0, 0, 1, 1];
            case "linearInOut":
                return [0, 0, 1, 1];
            case "easeInSine":
                return [0.47, 0, 0.745, 0.715];
            case "easeOutSine":
                return [0.39, 0.575, 0.565, 1];
            case "easeInOutSine":
                return [0.445, 0.05, 0.55, 0.95];
            case "easeInQuad":
                return [0.55, 0.085, 0.68, 0.53];
            case "easeOutQuad":
                return [0.25, 0.46, 0.45, 0.94];
            case "easeInOutQuad":
                return [0.455, 0.03, 0.515, 0.955];
            case "easeInCubic":
                return [0.55, 0.055, 0.675, 0.19];
            case "easeOutCubic":
                return [0.215, 0.61, 0.355, 1];
            case "easeInOutCubic":
                return [0.645, 0.045, 0.355, 1];
            case "easeInQuart":
                return [0.895, 0.03, 0.685, 0.22];
            case "easeOutQuart":
                return [0.165, 0.84, 0.44, 1];
            case "easeInOutQuart":
                return [0.77, 0, 0.175, 1];
            case "easeInExpo":
                return [0.95, 0.05, 0.795, 0.035];
            case "easeOutExpo":
                return [0.19, 1, 0.22, 1];
            case "easeInOutExpo":
                return [0.87, 0, 0.13, 1];
            case "easeInCirc":
                return [0.6, 0.04, 0.98, 0.335];
            case "easeOutCirc":
                return [0.075, 0.82, 0.165, 1];
            case "easeInOutCirc":
                return [0.785, 0.135, 0.15, 0.86];
            default:
                throw new Error("Easing function not found.");
        }
    }
}