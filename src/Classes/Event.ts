

export class Event
{
    private observers: Map<string, Function> = new Map();

    public subscribe(callback: Function) : string
    {
        const id = crypto.randomUUID();
        this.observers.set(id, callback);
        return id;    
    }

    public unsubscribe(id: string)
    {
        this.observers.delete(id);
    }

    public invoke(data: any | null = null)
    {
        for (const [_, callback] of this.observers)
        {
            callback(data);
        }
    }
}