import fs from "node:fs/promises";
import fsCallback from "node:fs";

fsCallback.readFile("./produtos/notebook.json", "utf-8", (error, arquivo) => {
    console.log(arquivo);
});

try {
    await fs.mkdir("./produtos");
} catch (error) {
    console.log("Pasta já existe");
}

// fs.writeFile("./produtos/notebook.json", JSON.stringify({ nome: "Notebook" }));

const dados = await fs.readFile("./produtos/notebook.json", "utf-8");

const dir = await fs.readdir("./produtos");

console.log(dir.filter((file) => file.endsWith(".json")));
console.log(dados);
