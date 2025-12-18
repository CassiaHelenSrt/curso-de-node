console.clear();

const base = "http://localhost:3000";

const functions = {
    async postCourses() {
        const response = await fetch(base + "/lms/courses", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },

            body: JSON.stringify({
                slug: "html-e-css-2",
                title: "HTML e CSS",
                description: "curso de html e css para iniciante",
                lessons: 40,
                hours: 10,
            }),
        });

        const body = await response.json();
        console.table(body);
    },

    async postLesson() {
        const response = await fetch(base + "/lms/lessons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                courseSlug: "html-e-css-2",
                slug: "tecnica-basicas",
                title: "Tecnica Basicas",
                seconds: 200,
                video: "/html/tags-basicas.mp4",
                description: "Aula sobre as tags basicas",
                order: 1,
                free: 1,
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Erro ao criar aula:", error);
            return;
        }

        const body = await response.json();
        console.table(body);
    },
};

const fn = process.argv[2];

if (!functions[fn]) {
    console.error("Função não encontrada:", fn);
    console.log("Funções disponíveis:", Object.keys(functions));
    process.exit(1);
}

functions[fn]();
// functions[process.argv[2]]();
