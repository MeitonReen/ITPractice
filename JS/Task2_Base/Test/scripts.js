
var body = document.querySelector("body");
var SmilesTik = "";

document.getElementById("button").addEventListener("click", (e) =>
{
    var p = document.createElement("p");
    SmilesTik += ")";
    p.textContent = "Тык" + SmilesTik;

    body.appendChild(p);
});

document.getElementById("button").addEventListener("click", (e) =>
{
    var p = document.createElement("p");
    SmilesTik += ")";
    p.textContent = "YUH" + SmilesTik;
    if (e.target.style.backgroundColor === "red" || e.target.style.backgroundColor === "")
    {
        e.target.style.backgroundColor = "chartreuse";
    } else
    {
        e.target.style.backgroundColor = "red";
    }

    body.appendChild(p);
});