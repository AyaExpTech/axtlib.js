export default class EasingConverter {
    /**
     * 利用できる関数の一覧を取得します。
     * @param {String} filter - フィルター(一致する文字列が含まれる関数のみ取得)
     * @returns {String[]} - 関数の一覧
     */
    static getList() {
        return [
            "Linear_In",
            "Linear_Out",
            "Linear_InOut",
            "Sine_In",
            "Sine_Out",
            "Sine_InOut",
            "Quad_In",
            "Quad_Out",
            "Quad_InOut",
            "Cubic_In",
            "Cubic_Out",
            "Cubic_InOut",
            "Quart_In",
            "Quart_Out",
            "Quart_InOut",
            "Expo_In",
            "Expo_Out",
            "Expo_InOut",
            "Circ_In",
            "Circ_Out",
            "Circ_InOut"
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
            case "Linear_In":
                return x;
            case "Linear_Out":
                return x;
            case "Linear_InOut":
                return x;
            case "Sine_In":
                return 1 - Math.cos((x * Math.PI) / 2);
            case "Sine_Out":
                return Math.sin((x * Math.PI) / 2);
            case "Sine_InOut":
                return -(Math.cos(Math.PI * x) - 1) / 2;
            case "Quad_In":
                return x ** 2;
            case "Quad_Out":
                return 1 - (1 - x) ** 2;
            case "Quad_InOut":
                return x < 0.5 ? 2 * x ** 2 : 1 - (-2 * x + 2) ** 2 / 2;
            case "Cubic_In":
                return x ** 3;
            case "Cubic_Out":
                return 1 - (1 - x) ** 3;
            case "Cubic_InOut":
                return x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2;
            case "Quart_In":
                return x ** 4;
            case "Quart_Out":
                return 1 - (1 - x) ** 4;
            case "Quart_InOut":
                return x < 0.5 ? 8 * x ** 4 : 1 - (-2 * x + 2) ** 4 / 2;
            case "Expo_In":
                return 2 ** (10 * x - 10);
            case "Expo_Out":
                return 1 - 2 ** (-10 * x);
            case "Expo_InOut":
                return x < 0.5 ? 2 ** (20 * x - 10) / 2 : (2 - 2 ** (-20 * x + 10)) / 2;
            case "Circ_In":
                return 1 - Math.sqrt(1 - x ** 2);
            case "Circ_Out":
                return Math.sqrt(1 - (x - 1) ** 2);
            case "Circ_InOut":
                return x < 0.5 ? (1 - Math.sqrt(1 - (2 * x) ** 2)) / 2 : (Math.sqrt(1 - (-2 * x + 2) ** 2) + 1) / 2;
            default:
                return x;
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
            case "Linear_In":
                return [0, 0, 1, 1];
            case "Linear_Out":
                return [0, 0, 1, 1];
            case "Linear_InOut":
                return [0, 0, 1, 1];
            case "Sine_In":
                return [0.12, 0, 0.39, 0];
            case "Sine_Out":
                return [0.61, 1, 0.88, 1];
            case "Sine_InOut":
                return [0.37, 0, 0.63, 1];
            case "Quad_In":
                return [0.11, 0, 0.5, 0];
            case "Quad_Out":
                return [0.5, 1, 0.89, 1];
            case "Quad_InOut":
                return [0.45, 0, 0.55, 1];
            case "Cubic_In":
                return [0.32, 0, 0.67, 0];
            case "Cubic_Out":
                return [0.33, 1, 0.68, 1];
            case "Cubic_InOut":
                return [0.65, 0, 0.35, 1];
            case "Quart_In":
                return [0.5, 0, 0.75, 0];
            case "Quart_Out":
                return [0.25, 1, 0.5, 1];
            case "Quart_InOut":
                return [0.76, 0, 0.24, 1];
            case "Expo_In":
                return [0.76, 0, 0.24, 1];
            case "Expo_Out":
                return [0.16, 1, 0.3, 1];
            case "Expo_InOut":
                return [0.87, 0, 0.13, 1];
            case "Circ_In":
                return [0.55, 0, 1, 0.45];
            case "Circ_Out":
                return [0, 0.55, 0.45, 1];
            case "Circ_InOut":
                return [0.85, 0, 0.15, 1];
            default:
                throw new Error("Easing function not found.");
        }
    }
}