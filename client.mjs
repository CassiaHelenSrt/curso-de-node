const base = "http://localhost:3000";

setTimeout(async () => {
    const response1 = await fetch(base + "/curso/java");
    console.log(response1.ok, response1.status);
    // await fetch(base + "/curso/javascript/teste");
    const response2 = await fetch(base + "/");
    console.log(response2.ok, response2.status);
}, 200);
