"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const canvas_1 = require("../core/canvas/canvas");
class Client {
    constructor() {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        this._canvas = new canvas_1.Canvas(context);
    }
}
exports.Client = Client;
setTimeout(() => {
    const client = new Client();
}, 1000);
