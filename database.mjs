import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./db.sqlite");

db.exec(`
    PRAGMA foreign_keys = 1;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;

    PRAGMA cache_size = 2000;
    PRAGMA busy_timeout = 5000;
    PRAGMA temp_store = MEMORY;
`);

db.exec(/*sql*/ `
    CREATE TABLE IF NOT EXISTS produtos (
        slug TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        categoria TEXT NOT NULL,
        preco INTEGER NOT NULL
    )
`);

const insert = db.prepare(`
    INSERT INTO produtos (slug, nome, categoria, preco)
    VALUES (?, ?, ?, ?)
`);

// eles estao comentados porque nao pode inserir duas vezes

// insert.run("noteboock", "Noteboock", "eletronicos", 500);
// insert.run("notebook-2", "Notebook", "eletronicos", 500);
// insert.run("mouse", "Mouse", "eletronicos", 50);

const produtos = db.prepare(`SELECT * FROM "produtos"`).all();

const produto = db
    .prepare(`SELECT * FROM produtos WHERE "slug" = ?`)
    .get("mouse");
console.log(produto);
