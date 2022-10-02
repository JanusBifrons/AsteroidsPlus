"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const colour_1 = require("../util/colour");
const vector_1 = require("../util/vector");
const camera_1 = require("./camera");
class Canvas {
    constructor(cContext) {
        this._cContext = cContext;
        this._cContext.canvas.height = window.innerHeight;
        this._cContext.canvas.width = window.innerWidth;
        camera_1.Camera.INIT(cContext);
        camera_1.Camera.CAMERA().zoomTo(2000);
        window.addEventListener("resize", (e) => {
            this._cContext.canvas.height = window.innerHeight;
            this._cContext.canvas.width = window.innerWidth;
            camera_1.Camera.CAMERA().updateViewport();
        });
    }
    ///
    /// STATIC
    ///
    static get DEFAULT_COLOUR() {
        return colour_1.Colour.White;
    }
    ///
    /// PUBLIC
    ///
    update() {
        camera_1.Camera.CAMERA().update();
    }
    /**
     * Clears the canvas back to the optional colour specified
     * @param cColour The colour you wish the canvas to clear to (default: black)
     */
    clear(cColour = colour_1.Colour.Black) {
        this._cContext.fillStyle = cColour.toString();
        this._cContext.fillRect(0, 0, this._cContext.canvas.width, this._cContext.canvas.height);
    }
    setColour(cColour) {
        this._cContext.fillStyle = cColour.toString();
        this._cContext.strokeStyle = cColour.toString();
    }
    setStrokeColour(cColour) {
        this._cContext.strokeStyle = cColour.toString();
    }
    setFillColour(cColour) {
        this._cContext.fillStyle = cColour.toString();
    }
    changeContext(cPosition, nRotation) {
        camera_1.Camera.CAMERA().changeContext(cPosition, nRotation);
    }
    restoreContext() {
        camera_1.Camera.CAMERA().end();
    }
    moveToWorldSpace() {
        camera_1.Camera.CAMERA().begin();
    }
    moveToScreenSpace() {
        camera_1.Camera.CAMERA().end();
    }
    moveTo(cPosition) {
        camera_1.Camera.CAMERA().moveTo(cPosition);
    }
    drawArc(cPosition, nRadius, nWidth, nStart, nEnd, cColour = Canvas.DEFAULT_COLOUR) {
        this._cContext.strokeStyle = cColour.toString();
        // Change line width
        let nLineWidth = this._cContext.lineWidth;
        this._cContext.lineWidth = nWidth;
        this._cContext.beginPath();
        this._cContext.arc(cPosition.X, cPosition.Y, nRadius, nStart, nEnd);
        this._cContext.stroke();
        this._cContext.closePath();
        // Reset line width
        this._cContext.lineWidth = nLineWidth;
    }
    drawCircle(cPosition, nRadius, cColour = Canvas.DEFAULT_COLOUR) {
        this._cContext.strokeStyle = cColour.toString();
        this._cContext.beginPath();
        this._cContext.arc(cPosition.X, cPosition.Y, nRadius, 0, Math.PI * 2);
        this._cContext.stroke();
        this._cContext.closePath();
    }
    drawText(sText, cPosition, cColour = Canvas.DEFAULT_COLOUR) {
        this._cContext.fillStyle = cColour.toString();
        this._cContext.font = '10px Verdana';
        this._cContext.fillText(sText, cPosition.X, cPosition.Y);
    }
    drawBox(cPosition, nWidth, nHeight, cColour = Canvas.DEFAULT_COLOUR) {
        this._cContext.fillRect(cPosition.X, cPosition.Y, nWidth, nHeight);
    }
    drawPath(liPoints, bFill = true, cColour = Canvas.DEFAULT_COLOUR) {
        this._cContext.fillStyle = cColour.toString();
        this._cContext.beginPath();
        for (let i = 0; i < liPoints.length; i++) {
            if (i === 0) {
                this._cContext.moveTo(liPoints[0].X, liPoints[0].Y);
            }
            else {
                this._cContext.lineTo(liPoints[i].X, liPoints[i].Y);
            }
        }
        this._cContext.closePath();
        this._cContext.stroke();
        if (bFill)
            this._cContext.fill();
    }
    ///
    /// PROPERTIES
    ///
    get context() {
        return this._cContext;
    }
    get canvasWidth() {
        return this._cContext.canvas.width;
    }
    get canvasHeight() {
        return this._cContext.canvas.height;
    }
    get screenCenter() {
        return new vector_1.Vector(this.canvasWidth / 2, this.canvasHeight / 2);
    }
}
exports.Canvas = Canvas;
