import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("./lm.sqlite");

db.exec(`
    PRAGMA foreign_keys = 1;
    PRAGMA journal_mode = WAL;
    PRAGMA synchronous = NORMAL;

    PRAGMA cache_size = 2000;
    PRAGMA busy_timeout = 5000;
    PRAGMA temp_store = MEMORY;
`);

db.exec(/*sql*/ `
   CREATE TABLE IF NOT EXISTS "cursos" (
      "id" INTEGER PRIMARY KEY,
      "slug" TEXT NOT NULL COLLATE NOCASE UNIQUE,
      "nome" TEXT NOT NULL,
      "descricao" TEXT NOT NULL
    ) STRICT;

`);
db.exec(/*sql*/ `
 CREATE TABLE IF NOT EXISTS "aulas" (
      "id" INTEGER PRIMARY KEY,
      "curso_id" INTEGER NOT NULL,
      "slug" TEXT NOT NULL COLLATE NOCASE,
      "nome" TEXT NOT NULL,
      FOREIGN KEY("curso_id") REFERENCES "cursos" ("id"),
      UNIQUE("curso_id", "slug")
    ) STRICT;

`);

export function criarCurso({ slug, nome, descricao }) {
    try {
        db.prepare(
            `
        INSERT OR IGNORE INTO "cursos"("slug", "nome", "descricao")
        VALUES (?, ?, ?)
    `
        ).run(slug, nome, descricao);
    } catch (error) {
        console.log(error);
        return null;
    }
}
