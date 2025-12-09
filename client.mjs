const base = "http://localhost:3000";

setTimeout(async () => {
    const reponse1 = await fetch(base + "/curso/javascript/pegar");
    console.log(reponse1.ok, reponse1.status);
    // await fetch(base + "/curso/javascript/teste");
    const reponse2 = await fetch(base + "/");
    console.log(reponse2.ok, reponse2.status);
}, 200);
