import { Canvas } from "../core/canvas/canvas";

export class Client {

    ///
    /// PRIVATE
    ///
    private _canvas: Canvas;

    constructor() {
        const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        const context = canvas.getContext("2d") as CanvasRenderingContext2D;

        this._canvas = new Canvas(context);
    }
}

setTimeout(() => {
    const client = new Client();

}, 1000);
