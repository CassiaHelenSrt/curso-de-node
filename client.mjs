const response = await fetch(
    "http://localhost:3000/produtos?cor=azul&tamanho=g",
    {
        method: "POST",
        headers: {
            "content-Type": "appliacation/json",
        },

        body: JSON.stringify({ username: "andre", password: "123" }),
    }
);

const body = await response.text();

console.log(body);
