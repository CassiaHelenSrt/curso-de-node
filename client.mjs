const base = "http://localhost:3000";

await fetch(base + "/cursos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        slug: "html",
        nome: "html",
        descricao: "Curso html",
    }),
});
