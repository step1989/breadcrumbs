import * as fs from "node:fs";
import {Readable} from 'node:stream';

await (async () => {
    const beforeUsedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
    const res = await fetch("https://github.com/json-iterator/test-data/raw/master/large-file.json");

    const writeStream = fs.createWriteStream("response-second.json");
    writeStream.on("finish", () => {
        const afterUsedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log("before used memory: ", beforeUsedMemory, "Mb", "|", "after used memory: ", afterUsedMemory, "Mb")
    })

    if (res.ok) {
        Readable.fromWeb(res.body).pipe(writeStream);
    }
})();

