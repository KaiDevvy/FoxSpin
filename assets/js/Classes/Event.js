export class Event {
    constructor() {
        this.observers = new Map();
    }
    subscribe(callback) {
        const id = crypto.randomUUID();
        this.observers.set(id, callback);
        return id;
    }
    unsubscribe(id) {
        this.observers.delete(id);
    }
    invoke(data = null) {
        for (const [_, callback] of this.observers) {
            callback(data);
        }
    }
}
//# sourceMappingURL=Event.js.map