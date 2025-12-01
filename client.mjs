const produtosResp = await fetch("http://localhost:3000/produtos");
const produtos = await produtosResp.json();

console.log(produtosResp);
console.log(produtos);

// const notebookResp = await fetch(
//     "http://localhost:3000/produto?categoria=eletronicos&slug=notebooks"
// );
// const notebook = await notebookResp.json();

// console.log(notebook);

const response = await fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },

    body: JSON.stringify({
        nome: "Notebook",
        slug: "Notebook",
        categoria: "Eletronicos",
        preco: 4000,
    }),
});

const body = await response.text();
console.log(response);

console.log(body);

fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },

    body: JSON.stringify({
        nome: "Mesa",
        slug: "mesa",
        categoria: "moveis",
        preco: 2000,
    }),
});

fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },

    body: JSON.stringify({
        nome: "Mouse",
        slug: "mouse",
        categoria: "eletronicos",
        preco: 50,
    }),
});
