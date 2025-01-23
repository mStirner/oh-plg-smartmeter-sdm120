module.exports = (registers) => {

    // VOLTAGE
    registers.add({
        name: "Voltage",
        alias: "VOLTAGE",
        type: "number",
        max: 250,
        address: Buffer.from([0x00, 0x00])
    });

    // AMPERE
    registers.add({
        name: "Ampere",
        alias: "CURRENT",
        type: "number",
        max: 16,
        address: Buffer.from([0x00, 0x06])
    });

    // WATT
    registers.add({
        name: "Power",
        alias: "POWER",
        type: "number",
        max: 3680, // 230V * 16A = 3680W
        address: Buffer.from([0x00, 0x12])
    });

    // MISC
    registers.add({
        name: "Frequency",
        alias: "FREQUENZ",
        type: "number",
        max: 60,
        address: Buffer.from([0x00, 0x46])
    });

    registers.add({
        name: "Import active energy",
        alias: "ENERGY_TOTAL",
        type: "number",
        max: Number.MAX_SAFE_INTEGER,
        address: Buffer.from([0x00, 0x48])
    });

};