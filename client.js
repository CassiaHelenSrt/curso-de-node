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
};
const fn = process.argv[2];

if (!functions[fn]) {
    console.error("Função não encontrada:", fn);
    console.log("Funções disponíveis:", Object.keys(functions));
    process.exit(1);
}

functions[fn]();
// functions[process.argv[2]]();
