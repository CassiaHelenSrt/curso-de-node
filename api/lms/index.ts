import { Api } from "../../core/utils/abstract.ts";
import { RouteError } from "../../core/utils/route-erro.ts";
import { LmsQuery } from "./query.ts";

import { lmsTables } from "./tables.ts";

export class LmsApi extends Api {
    query = new LmsQuery(this.db);
    handlers = {
        postCourses: (req, res) => {
            const { slug, title, description, lessons, hours } = req.body;

            const writeResult = this.query.insertCourse(
                slug,
                title,
                description,
                lessons,
                hours
            );

            /*quando ja existe este curso criado retorna esse error*/
            if (writeResult.changes === 0) {
                throw new RouteError(400, "Curso já existe ou erro ao criar");
            }

            res.status(201).json({
                id: writeResult.lastInsertRowid,
                changes: writeResult.changes,
                title: "curso criado",
            });
        },

        postLessons: (req, res) => {
            const {
                courseSlug,
                slug,
                title,
                seconds,
                video,
                description,
                order,
                free,
            } = req.body;

            const writeResult = this.db
                .prepare(
                    /*sql*/ `
            INSERT INTO "lessons"
            (
                "course_id",
                "slug",
                "title",
                "seconds",
                "video",
                "description",
                "order",
                "free"
            )
            VALUES (
                (SELECT "id" FROM "courses" WHERE "slug" = ?),
                ?, ?, ?, ?, ?, ?, ?
            )
            `
                )
                .run(
                    courseSlug,
                    slug,
                    title,
                    seconds,
                    video,
                    description,
                    order,
                    free
                );

            if (writeResult.changes === 0) {
                throw new RouteError(400, "Erro ao criar aula");
            }

            res.status(201).json({
                id: writeResult.lastInsertRowid,
                title: "Aula criada com sucesso",
            });
        },
    } satisfies Api["handlers"];

    tables(): void {
        this.db.exec(lmsTables);
    }

    routes(): void {
        this.router.post("/lms/courses", this.handlers.postCourses);
        this.router.post("/lms/lessons", this.handlers.postLessons);
    }
}
