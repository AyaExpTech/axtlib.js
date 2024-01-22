/**
 * 新たなWorkerを生成します。
 * @param {String} relativePath - Workerとして実行するスクリプトの相対パス
 * @returns {Worker} - 生成された新たなWorker
 */
Worker.create = relativePath => {
    try {
        return new Worker(relativePath);
    } catch (e) {
        return new Worker(URL.createObjectURL(new Blob(['importScripts("' + location.href.replace(/\\/g, '/').replace(/\/[^\/]*$/, '/') + relativePath + '");'], { type: 'text/javascript' })));
    }
};