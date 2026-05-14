import { Vector2 } from "./Vector2.js";

export class Transform {
    private _position: Vector2 = Vector2.zero();
    private _rotation: number = 0;
    private _scale: Vector2 = new Vector2(1, 1);
    private _depth: number = 0;
    private _parent: Transform | null = null;

    private localMatrix: DOMMatrix = new DOMMatrix();
    private localDirty = true;

    readonly children = new Set<Transform>();

    getLocalMatrix(): DOMMatrix {
        if (this.localDirty) {
            this.localMatrix = new DOMMatrix()
                .translate(this._position.x, this._position.y)
                .rotate(this._rotation)
                .scale(this._scale.x, this._scale.y);
            this.localDirty = false;
        }
        return this.localMatrix;
    }

    getWorldMatrix(): DOMMatrix {
        const local = this.getLocalMatrix();
        return this._parent ? this._parent.getWorldMatrix().multiply(local) : local;
    }


    get position(): Vector2 {
        return new Vector2(this._position.x, this._position.y);
    }

    set position(value: Vector2) {
        this._position = new Vector2(value.x, value.y);
        this.localDirty = true;
    }

    get rotation(): number {
        return this._rotation;
    }

    set rotation(value: number) {
        this._rotation = value;
        this.localDirty = true;
    }

    get scale(): Vector2 {
        return new Vector2(this._scale.x, this._scale.y);
    }

    set scale(value: Vector2) {
        this._scale = new Vector2(value.x, value.y);
        this.localDirty = true;
    }

    get depth(): number {
        return this._depth;
    }

    set depth(value: number) {
        this._depth = value;
    }

    get parent(): Transform | null {
        return this._parent;
    }

    set parent(value: Transform | null) {
        if (this._parent === value) return;

        if (this._parent) {
            this._parent.children.delete(this);
        }

        this._parent = value;

        if (this._parent) {
            this._parent.children.add(this);
        }
    }
}
