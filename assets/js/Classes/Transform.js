import { Vector2 } from "./Vector2.js";
export class Transform {
    constructor() {
        this._position = Vector2.zero();
        this._rotation = 0;
        this._scale = new Vector2(1, 1);
        this._depth = 0;
        this._parent = null;
        this.localMatrix = new DOMMatrix();
        this.localDirty = true;
        this.children = new Set();
    }
    getLocalMatrix() {
        if (this.localDirty) {
            this.localMatrix = new DOMMatrix()
                .translate(this._position.x, this._position.y)
                .rotate(this._rotation)
                .scale(this._scale.x, this._scale.y);
            this.localDirty = false;
        }
        return this.localMatrix;
    }
    getWorldMatrix() {
        const local = this.getLocalMatrix();
        return this._parent ? this._parent.getWorldMatrix().multiply(local) : local;
    }
    get position() {
        return new Vector2(this._position.x, this._position.y);
    }
    set position(value) {
        this._position = new Vector2(value.x, value.y);
        this.localDirty = true;
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(value) {
        this._rotation = value;
        this.localDirty = true;
    }
    get scale() {
        return new Vector2(this._scale.x, this._scale.y);
    }
    set scale(value) {
        this._scale = new Vector2(value.x, value.y);
        this.localDirty = true;
    }
    get depth() {
        return this._depth;
    }
    set depth(value) {
        this._depth = value;
    }
    get parent() {
        return this._parent;
    }
    set parent(value) {
        if (this._parent === value)
            return;
        if (this._parent) {
            this._parent.children.delete(this);
        }
        this._parent = value;
        if (this._parent) {
            this._parent.children.add(this);
        }
    }
}
//# sourceMappingURL=Transform.js.map