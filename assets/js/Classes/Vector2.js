export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new Vector2(this.x + other.x, this.y + other.y);
    }
    subtract(other) {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    scale(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    normalize() {
        const mag = this.magnitude();
        if (mag === 0)
            return new Vector2(0, 0);
        return new Vector2(this.x / mag, this.y / mag);
    }
    distanceTo(other) {
        return this.subtract(other).magnitude();
    }
    angleTo(other) {
        return Math.atan2(other.y - this.y, other.x - this.x);
    }
    static zero() {
        return new Vector2(0, 0);
    }
    static fromAngle(angle) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }
}
//# sourceMappingURL=Vector2.js.map