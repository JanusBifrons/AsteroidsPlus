"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Camera = void 0;
const utils_1 = require("../util/utils");
const vector_1 = require("../util/vector");
class Camera {
    constructor(cContext) {
        this._nFieldOfView = Math.PI / 4.0;
        this._nAspectRatio = 0;
        this._nDistance = 2000.0;
        this._nDistanceSpeed = 10;
        this._cContext = cContext;
        this._aViewport = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            width: 0,
            height: 0,
            scale: [1.0, 1.0]
        };
        this._cLookAt = new vector_1.Vector(0, 0);
        this._nDesiredDistance = this._nDistance;
        this.updateViewport();
    }
    static CAMERA() {
        return Camera.SINGLETON;
    }
    static INIT(cContext) {
        if ((0, utils_1.hasValue)(Camera.SINGLETON))
            throw new Error("Can only have one instance of Camera");
        Camera.SINGLETON = new Camera(cContext);
    }
    ///
    /// PUBLIC
    ///
    update() {
        let nDistanceDifference = this._nDistance - this._nDesiredDistance;
        if (Math.abs(nDistanceDifference) > 1)
            this._nDistance -= (nDistanceDifference * 0.05);
        else
            this._nDistance = this._nDesiredDistance;
        if (this._nDistance < 500)
            this._nDistance = 500;
        this.updateViewport();
    }
    updateViewport() {
        this._nAspectRatio = this._cContext.canvas.width / this._cContext.canvas.height;
        this._aViewport.width = this._nDistance * Math.tan(this._nFieldOfView);
        this._aViewport.height = this._aViewport.width / this._nAspectRatio;
        this._aViewport.left = this._cLookAt.X - (this._aViewport.width / 2.0);
        this._aViewport.top = this._cLookAt.Y - (this._aViewport.height / 2.0);
        this._aViewport.right = this._aViewport.left + this._aViewport.width;
        this._aViewport.bottom = this._aViewport.top + this._aViewport.height;
        this._aViewport.scale[0] = this._cContext.canvas.width / this._aViewport.width;
        this._aViewport.scale[1] = this._cContext.canvas.height / this._aViewport.height;
    }
    ///
    /// PRIVATE
    ///
    applyScale() {
        this._cContext.scale(this._aViewport.scale[0], this._aViewport.scale[1]);
    }
    applyTranslation() {
        this._cContext.translate(-this._aViewport.left, -this._aViewport.top);
    }
    ///
    /// PUBLIC
    ///
    changeContext(cPosition, nRotation) {
        this._cContext.save();
        this._cContext.translate(cPosition.X, cPosition.Y);
        this._cContext.rotate(nRotation);
    }
    begin() {
        this._cContext.save();
        this.applyScale();
        this.applyTranslation();
    }
    end() {
        this._cContext.restore();
    }
    zoomIn() {
        this._nDesiredDistance -= this._nDistanceSpeed;
    }
    zoomOut() {
        this._nDesiredDistance += this._nDistanceSpeed;
    }
    zoomTo(nZoom) {
        this._nDesiredDistance = nZoom;
    }
    moveTo(cPosition) {
        this._cLookAt.X = cPosition.X;
        this._cLookAt.Y = cPosition.Y;
        this.updateViewport();
    }
    screenToWorld(cPosition) {
        let nX = (cPosition.X / this._aViewport.scale[0]) + this._aViewport.left;
        let nY = (cPosition.Y / this._aViewport.scale[1]) + this._aViewport.top;
        return new vector_1.Vector(nX, nY);
    }
    worldToScreen(cPosition) {
        let nX = (cPosition.X - this._aViewport.left) * (this._aViewport.scale[0]);
        let nY = (cPosition.Y - this._aViewport.top) * (this._aViewport.scale[1]);
        return new vector_1.Vector(nX, nY);
    }
    ///
    /// STATIC
    ///
    static ZoomIn() {
        Camera.CAMERA().zoomIn();
    }
    static ZoomOut() {
        Camera.CAMERA().zoomOut();
    }
    static SetZoom(nZoom) {
        Camera.CAMERA().zoomTo(nZoom);
    }
    static WorldToScreen(cPosition) {
        return Camera.CAMERA().worldToScreen(cPosition);
    }
    static ScreenToWorld(cPosition) {
        return Camera.CAMERA().screenToWorld(cPosition);
    }
}
exports.Camera = Camera;
