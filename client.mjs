const response = await fetch("http://localhost:3000/produto/notebook", {
    method: "GET",
    // headers: {
    //     "content-Type": "appliacation/json",
    // },

    // body: JSON.stringify({ username: "andre", password: "123" }),
});

console.log(response);

const body = await response.text();

console.log(body);

// console.log(body);
