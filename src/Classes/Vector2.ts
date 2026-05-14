
export class Vector2
{
    constructor(public x: number, public y: number) { }

    add(other: Vector2): Vector2
    {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vector2): Vector2
    {
        return new Vector2(this.x - other.x, this.y - other.y);
    }
    
    scale(scalar: number): Vector2
    {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    magnitude(): number
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector2
    {
        const mag = this.magnitude();
        if (mag === 0) return new Vector2(0, 0);
        return new Vector2(this.x / mag, this.y / mag);
    }

    distanceTo(other: Vector2): number
    {
        return this.subtract(other).magnitude();
    }

    angleTo(other: Vector2): number
    {
        return Math.atan2(other.y - this.y, other.x - this.x);
    }

    static zero(): Vector2
    {
        return new Vector2(0, 0);
    }

    static fromAngle(angle: number): Vector2
    {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }
}