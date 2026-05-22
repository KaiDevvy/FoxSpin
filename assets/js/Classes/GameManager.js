const freshSave = {
    "spins": 0,
    "totalSpins": 0,
    "upgrades": {}
};
export class GameManager {
    static init() {
        this.dateStart = new Date();
        this.LoadGame();
    }
    static getUpgradeCount(name) {
        return this.data.upgrades[name] || 0;
    }
    static SaveGame() {
        const serialized = JSON.stringify(this.data);
        window.localStorage.setItem("savegame", serialized);
        console.log("saved");
    }
    static WipeSave() {
        window.localStorage.setItem("savegame", "");
        this.data = freshSave;
        location.reload();
        console.log("save reset");
    }
    static LoadGame() {
        const serialized = window.localStorage.getItem("savegame");
        if (!serialized || serialized == "") {
            console.log("No savedata! New user?");
            this.data = freshSave;
            return;
        }
        else {
            this.data = JSON.parse(serialized);
        }
        console.log("loaded!");
        console.log(this.data);
    }
    static get time() {
        return (Date.now() - this.dateStart.getTime()) / 1000;
    }
}
GameManager.isLoaded = false;
//# sourceMappingURL=GameManager.js.map