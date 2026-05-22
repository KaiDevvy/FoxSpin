
type SaveData =
{
    spins: number;
    totalSpins: number;
    upgrades: Record<string, number>
}

const freshSave : SaveData =
{
    "spins": 0,
    "totalSpins": 0,
    "upgrades": {}
}

export class GameManager
{
    public static isLoaded: boolean = false;
    public static data: SaveData;
    private static dateStart: Date;

    public static init()
    {
        this.dateStart = new Date();
        this.LoadGame();
    }

    public static getUpgradeCount(name: string) : number
    {
        return this.data.upgrades[name] || 0;
    }

    public static SaveGame()
    {
        const serialized = JSON.stringify(this.data);
        window.localStorage.setItem("savegame", serialized);
        console.log("saved");
    }
    
    public static WipeSave()
    {
        window.localStorage.setItem("savegame", "");
        this.data = freshSave;
        location.reload();
        console.log("save reset");
    }

    public static LoadGame()
    {
        const serialized = window.localStorage.getItem("savegame");
        if (!serialized || serialized == "")
        {
            console.log("No savedata! New user?");
            this.data = freshSave;
            return;
        }
        else
        {
            this.data = JSON.parse(serialized) as SaveData;


        }


        console.log("loaded!");
        console.log(this.data);
    }

    public static get time(): number
    {
        return (Date.now() - this.dateStart.getTime()) / 1000;
    }
}