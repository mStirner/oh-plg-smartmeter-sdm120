const net = require("net");

const registers = new Set();
require("./registers.js")(registers);

const stream = net.connect(502, "climate.lan", {
    keepAlive: true
});

stream.once("connect", () => {
    console.log("Connected to tcp://climate.lan:502");
});

stream.once("close", () => {
    console.log("Disconnected from tcp://climate.lan:502");
});

stream.once("error", (err) => {
    console.error("Connection error:", err);
});




let transactionId = 1; // Globaler Zähler für Transaction IDs

let wrapper = (register) => {
    return new Promise((resolve, reject) => {
        console.log("Query register:", register.name);

        // Modbus PDU (Function Code + Data)
        const pdu = Buffer.from([
            0x04,                // Function Code (Read Input Registers)
            ...register.address, // Start Address (2 Bytes)
            0x00, 0x02           // Quantity of Registers (2 Bytes)
        ]);

        // Modbus-TCP Header
        const transactionIdBuffer = Buffer.alloc(2);
        transactionIdBuffer.writeUInt16BE(transactionId); // Transaction Identifier

        const protocolIdBuffer = Buffer.from([0x00, 0x00]); // Protocol Identifier (always 0x0000)
        const lengthBuffer = Buffer.alloc(2);
        lengthBuffer.writeUInt16BE(pdu.length + 1); // Length (Unit Identifier + PDU)

        const unitIdBuffer = Buffer.from([0x02]); // Unit Identifier (Slave Address)

        // Full Modbus-TCP Message
        const message = Buffer.concat([
            transactionIdBuffer,
            protocolIdBuffer,
            lengthBuffer,
            unitIdBuffer,
            pdu
        ]);

        console.log("Sending Modbus-TCP message:", message.toString("hex"));

        stream.write(message, (err) => {
            if (err) {
                console.error("Error writing message:", err);
                reject(err);
            } else {
                console.log("Message sent:", message.toString("hex"));

                stream.once("data", (chunk) => {
                    console.log("Received response:", chunk.toString("hex"));
                    console.log("");
                    resolve(chunk);
                });
            }
        });

        // Transaction ID inkrementieren, mit Überlauf auf 0xFFFF
        transactionId = (transactionId + 1) & 0xFFFF;

    });
};



let queries = Array.from(registers).reduce((chain, register, index) => {
    return chain.then((results) => {
        return new Promise((resolve) => {
            // Wait 100ms between queries
            setTimeout(resolve, 100);
            //resolve();
        }).then(() => {
            // Query register
            return wrapper(register, index + 1);
        }).then((result) => {
            // Save result
            results.push(result);
            return results;
        });
    });
}, Promise.resolve([]));


queries.then((values) => {

    console.log(values);
    stream.end();

}).catch((err) => {

    console.log("err", err)

});
