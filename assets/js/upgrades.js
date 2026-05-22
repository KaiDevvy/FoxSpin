export const upgrades = {
    "clickforce": {
        "displayName": "Click Force",
        "flavorText": "+5%",
        "baseCost": 1,
        "costMultiplier": 1.1,
        "dependencies": [],
        "max": 100,
        "totalSpinsRequired": 5,
        "showAfterComplete": true
    },
    "minvelocity": {
        "displayName": "Base Velocity",
        "flavorText": "+5%",
        "baseCost": 5,
        "costMultiplier": 1.1,
        "dependencies": [],
        "max": 50,
        "totalSpinsRequired": 10,
        "showAfterComplete": true
    },
    "yapper": {
        "displayName": "Yapper",
        "flavorText": "Spins for you!",
        "baseCost": 50,
        "costMultiplier": 1.0,
        "dependencies": [],
        "max": 1,
        "totalSpinsRequired": 50,
        "showAfterComplete": false
    },
    "yapperfreq": {
        "displayName": "Yap Frequency",
        "flavorText": "Measured in yips per minute.",
        "baseCost": 70,
        "costMultiplier": 1.12,
        "dependencies": ["yapper"],
        "max": 100,
        "totalSpinsRequired": 0,
        "showAfterComplete": false
    },
    "yapperamp": {
        "displayName": "Yap Strength",
        "flavorText": "YAP!",
        "baseCost": 60,
        "costMultiplier": 1.12,
        "dependencies": ["yapper"],
        "max": 100,
        "totalSpinsRequired": 0,
        "showAfterComplete": false
    },
    "spinner": {
        "displayName": "Upgrade Spinner",
        "flavorText": "Reduces friction",
        "baseCost": 100,
        "costMultiplier": 5.0,
        "dependencies": [],
        "max": 2,
        "totalSpinsRequired": 100,
        "showAfterComplete": true
    }
};
//# sourceMappingURL=upgrades.js.map