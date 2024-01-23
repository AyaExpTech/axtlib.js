export default class EasingConverter {
    /**
     * 利用できる関数の一覧を取得します。
     * @param {String} filter - フィルター(一致する文字列が含まれる関数のみ取得)
     * @returns {String[]} - 関数の一覧
     */
    static getList() {
        return [
            "linear_In",
            "linear_Out",
            "linear_InOut",
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
            case "linear_In":
                return x;
            case "linear_Out":
                return x;
            case "linear_InOut":
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
            case "linear_In":
                return [0, 0, 1, 1];
            case "linear_Out":
                return [0, 0, 1, 1];
            case "linear_InOut":
                return [0, 0, 1, 1];
            case "Sine_In":
                return [0.47, 0, 0.745, 0.715];
            case "Sine_Out":
                return [0.39, 0.575, 0.565, 1];
            case "Sine_InOut":
                return [0.445, 0.05, 0.55, 0.95];
            case "Quad_In":
                return [0.55, 0.085, 0.68, 0.53];
            case "Quad_Out":
                return [0.25, 0.46, 0.45, 0.94];
            case "Quad_InOut":
                return [0.455, 0.03, 0.515, 0.955];
            case "Cubic_In":
                return [0.55, 0.055, 0.675, 0.19];
            case "Cubic_Out":
                return [0.215, 0.61, 0.355, 1];
            case "Cubic_InOut":
                return [0.645, 0.045, 0.355, 1];
            case "Quart_In":
                return [0.895, 0.03, 0.685, 0.22];
            case "Quart_Out":
                return [0.165, 0.84, 0.44, 1];
            case "Quart_InOut":
                return [0.77, 0, 0.175, 1];
            case "Expo_In":
                return [0.95, 0.05, 0.795, 0.035];
            case "Expo_Out":
                return [0.19, 1, 0.22, 1];
            case "Expo_InOut":
                return [0.87, 0, 0.13, 1];
            case "Circ_In":
                return [0.6, 0.04, 0.98, 0.335];
            case "Circ_Out":
                return [0.075, 0.82, 0.165, 1];
            case "Circ_InOut":
                return [0.785, 0.135, 0.15, 0.86];
            default:
                throw new Error("Easing function not found.");
        }
    }
}