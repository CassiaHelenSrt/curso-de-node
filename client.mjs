const base = "http://localhost:3000";

await fetch(base + "/cursos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        slug: "ruby",
        nome: "ruby",
        descricao: "Introdução rudy",
    }),
});

await fetch(base + "/aulas", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        slug: "indroducao ruby",
        nome: "Indrodução ruby",
        cursoSlug: "ruby",
    }),
});

const aula = await fetch(base + "/aula?curso=javascript&slug=arrays").then(
    (r) => r.json()
);

console.log(aula);

const aulas = await fetch(base + "/aulas?curso=ruby").then((r) => r.json());
console.log("aulas", aulas);

const curso = await fetch(base + "/curso?slug=css").then((r) => r.json());
// console.log(curso);

const cursos = await fetch(base + "/cursos").then((r) => r.json());
// console.log(cursos);
