import { Query } from "../../core/utils/abstract.ts";
import { RouteError } from "../../core/utils/route-erro.ts";

type CourseData = {
    id: number;
    slug: string;
    title: string;
    description: string;
    lessons: number;
    hours: number;
    created: string;
};

type LessonData = {
    id: number;
    course_id: number;
    slug: string;
    title: string;
    seconds: number;
    video: string;
    description: string;
    order: number;
    free: number;
    created: string;
};

type CourseCreate = Omit<CourseData, "id" | "created">;
type LessonCreate = Omit<LessonData, "id" | "course_id" | "created"> & {
    courseSlug: string;
};

export class LmsQuery extends Query {
    insertCourse({ slug, title, description, lessons, hours }: CourseCreate) {
        return this.db
            .query(
                /*sql*/ `
                        INSERT OR IGNORE INTO "courses"
                        ("slug", "title", "description","lessons", "hours")
                        VALUES (?, ?, ?, ?, ?)
                        `
            )
            .run(slug, title, description, lessons, hours);
    }

    insertLesson({
        courseSlug,
        slug,
        title,
        seconds,
        video,
        description,
        order,
        free,
    }: LessonCreate) {
        const course = this.db
            .prepare(`SELECT "id" FROM "courses" WHERE "slug" = ?`)
            .get(courseSlug);

        if (!course) {
            throw new RouteError(404, "Curso não encontrado");
        }

        return this.db
            .query(
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
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `
            )
            .run(
                course.id,
                slug,
                title,
                seconds,
                video,
                description,
                order,
                free
            );
    }

    selectCourses() {
        return this.db
            .prepare(
                /*sql*/ `
            SELECT *
            FROM "courses"
            ORDER BY "created" ASC
            LIMIT 100
            `
            )
            .all() as CourseData[];
    }
}
