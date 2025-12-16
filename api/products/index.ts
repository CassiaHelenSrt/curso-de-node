import { Api } from "../../core/utils/abstract.ts";
import { RouteError } from "../../core/utils/route-erro.ts";

export class ProductsApi extends Api {
    tables(): void {
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS "products" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "name" TEXT,
                "slug" TEXT NOT NULL UNIQUE,
                "price" INTEGER
            );

            INSERT OR IGNORE INTO "products"
            ("name", "slug", "price") VALUES
            ('Notebook', 'notebook', 30000);
        `);
    }

    routes(): void {
        this.router.get("/products/:slug", (req, res) => {
            const { slug } = req.params;

            const product = this.db
                .prepare(`SELECT * FROM "products" WHERE "slug" = ?`)
                .get(slug);

            if (!product) {
                throw new RouteError(404, "Produto não encontrado");
            }

            res.status(200).json(product);
        });
    }
}
