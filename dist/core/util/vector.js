"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
class Vector {
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }
    ///
    /// STATIC
    ///
    static DirectionFromRotation(nRotation, nMagnitude = 1) {
        return new Vector(Math.cos(nRotation) * nMagnitude, Math.sin(nRotation) * nMagnitude);
    }
    static get Zero() {
        return new Vector(0, 0);
    }
    static Magnitude(cVector) {
        return Math.sqrt(cVector.X * cVector.X + cVector.Y * cVector.Y);
    }
    static Distance(cVectorA, cVectorB) {
        return Vector.Magnitude(new Vector(cVectorB.X - cVectorA.X, cVectorB.Y - cVectorA.Y));
    }
    static Unit(cVector) {
        let nLength = Vector.Magnitude(cVector);
        let nX = cVector.X / nLength;
        let nY = cVector.Y / nLength;
        return new Vector(nX, nY);
    }
    static DirectionTo(cVectorFrom, cVectorTo) {
        var nX = cVectorTo.X - cVectorFrom.X;
        var nY = cVectorTo.Y - cVectorFrom.Y;
        return Math.atan2(nY, nX);
    }
    ///
    /// PUBLIC
    ///
    add(cVector) {
        return new Vector(this.X + cVector.X, this.Y + cVector.Y);
    }
    subtract(cVector) {
        return new Vector(this.X - cVector.X, this.Y - cVector.Y);
    }
    multiply(nMultiple) {
        return new Vector(this.X * nMultiple, this.Y * nMultiple);
    }
    equals(cVector) {
        if (cVector.X == this.X && cVector.Y == this.Y)
            return true;
        return false;
    }
    reverse() {
        return this.multiply(-1);
    }
    limit(nLimit) {
        if (this.X >= nLimit)
            this.X = nLimit;
        if (this.X <= -nLimit)
            this.X = -nLimit;
        if (this.Y >= nLimit)
            this.Y = nLimit;
        if (this.Y <= -nLimit)
            this.Y = -nLimit;
    }
    ///
    /// PROPERTIES
    ///
    get magnitude() {
        return Math.sqrt(this.X * this.X + this.Y * this.Y);
    }
    get length() {
        return Math.atan2(this.Y, this.X);
    }
}
exports.Vector = Vector;
