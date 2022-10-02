"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colour = void 0;
class Colour {
    constructor(nR = 255, nG = 255, nB = 255, nA = 255) {
        this._nR = nR;
        this._nG = nG;
        this._nB = nB;
        this._nA = nA;
    }
    ///
    /// STATIC
    ///
    static get White() {
        return new Colour(255, 255, 255);
    }
    static get Black() {
        return new Colour(0, 0, 0);
    }
    static get Grey() {
        return new Colour(100, 100, 100);
    }
    static get Red() {
        return new Colour(255, 0, 0);
    }
    static get Green() {
        return new Colour(0, 255, 0);
    }
    static get Blue() {
        return new Colour(0, 0, 255);
    }
    ///
    /// PUBLIC
    ///
    toString() {
        return "rgba(" + this._nR + ", " + this._nG + ", " + this._nB, +", " + this._nA + ")";
        //return String.format("rgba({0}, {1}, {2}, {3}", this._nR, this._nG, this._nB, this._nA);
    }
    ///
    /// PROPERTIES
    ///
    get r() {
        return this._nR;
    }
    set r(nR) {
        this._nR = nR;
    }
    get g() {
        return this._nG;
    }
    set g(nG) {
        this._nG = nG;
    }
    get b() {
        return this._nB;
    }
    set b(nB) {
        this._nB = nB;
    }
    get a() {
        return this._nA;
    }
    set a(nA) {
        this._nA = nA;
    }
}
exports.Colour = Colour;
