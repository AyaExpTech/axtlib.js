export default class DatabaseStorage {
    /**
     * @returns {Promise<Undefined>}
     */
    static async delete() {
        const deleteRequest = globalThis.indexedDB.deleteDatabase("axtlib.js");
        deleteRequest.onsuccess = event => {
            return;
        }
        deleteRequest.onerror = event => {
            throw new Error("database error");
        }
    }
    /**
     * @returns {Promise<Undefined>}
     */
    static async initialize() {
        /* ==== リセットリクエスト ==== */
        await DatabaseStorage.delete();
        /* ==== open ==== */
        const openRequest = globalThis.indexedDB.open("axtlib.js");
        /* ==== 失敗時はErrorをぶん投げる ==== */
        openRequest.onerror = event => {
            throw new Error("database error");
        }
        /* ==== 成功時はストアとオブジェクトを作る ==== */
        openRequest.onupgradeneeded = event => {
            const database = event.target.result;
            const store = database.createObjectStore("DatabaseStorage", { keyPath: 'key' });
            store.createIndex("value", "value", { "unique": false });
            store.transaction.oncomplete = event => {
                const objStore = database.transaction("DatabaseStorage", "readwrite").objectStore("DatabaseStorage");
                objStore.add({
                    "key": "data",
                    "value": new Map()
                });
                return;
            };
        }
    }
    /**
     * @returns {Promise<Map>}
     */
    static getMap() {
        return new Promise((resolve, reject) => {
            /* ==== open ==== */
            const openRequest = globalThis.indexedDB.open("axtlib.js");
            /* ==== 失敗時はErrorをぶん投げる ==== */
            openRequest.onerror = event => {
                reject(new Error("database error"));
            }
            /* ==== 成功時はストアからオブジェクトを取得 ==== */
            openRequest.onsuccess = event => {
                const database = event.target.result;
                const transaction = database.transaction("DatabaseStorage", 'readwrite')
                const getRequest = transaction.objectStore("DatabaseStorage").get("data");
                getRequest.onsuccess = event => {
                    resolve(structuredClone(event.target.result.value));
                }
            }
        })
    }
    /**
     * @param {Map} map - 挿入するMap
     * @returns {Promise<Undefined>}
     */
    static #setAll(map) {
        return new Promise((resolve, reject) => {
            /* ==== open ==== */
            const openRequest = globalThis.indexedDB.open("axtlib.js");
            /* ==== 失敗時はErrorをぶん投げる ==== */
            openRequest.onerror = event => {
                reject(new Error("database error"));
            }
            /* ==== 成功時はストアからオブジェクトを取得 ==== */
            openRequest.onsuccess = event => {
                const database = event.target.result;
                const transaction = database.transaction("DatabaseStorage", 'readwrite')
                transaction.objectStore("DatabaseStorage").put({
                    "key": "data",
                    "value": structuredClone(map)
                });
                transaction.oncomplete = event => {
                    resolve(true);
                }
            }
        })
    }
    /**
     * @param {any} key - 取得する値のキー
     * @returns {Promise<any>}
     */
    static getItem(key) {
        return new Promise((resolve, reject) => {
            DatabaseStorage.getMap().then(map => resolve(map.get(key)), err => reject(err));
        })
    }
    /**
     * @param {any} key - 挿入する値に対応するキー名称
     * @param {any} value - 挿入する値
     * @returns {Promise<Undefined>}
     */
    static setItem(key, value) {
        return new Promise((resolve, reject) => {
            DatabaseStorage.getMap().then(
                map => {
                    map.set(key, value);
                    DatabaseStorage.#setAll(map).then(
                        () => resolve(),
                        err => reject(err)
                    )
                },
                err => reject(err)
            );
        })
    }
    /**
     * @param {any} key - 削除する値のキー
     * @returns {Promise<Undefined>}
     */
    static removeItem(key) {
        return new Promise((resolve, reject) => {
            DatabaseStorage.getMap().then(
                map => {
                    map.delete(key);
                    DatabaseStorage.#setAll(map).then(
                        () => resolve(),
                        err => reject(err)
                    )
                },
                err => reject(err)
            );
        })
    }
    /**
     * @returns {Promise<Undefined>}
     */
    static async clear() {
        await DatabaseStorage.initialize();
        return;
    }
    /**
     * @param {any} n - 何番目のキー名称を取得するか
     * @returns {Promise<any>}
     */
    static async key(n) {
        const map = await DatabaseStorage.getMap();
        return Array.from(map)[n][0];
    }
}