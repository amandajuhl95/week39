import 'bootstrap/dist/css/bootstrap.css'

var div = document.getElementById("div")
{
    div.style.textAlign = "center";
}

document.getElementById("btn").onclick = fetchquote;
document.getElementById("East").onclick = hearts;
document.getElementById("West").onclick = hearts;
document.getElementById("South").onclick = hearts;
document.getElementById("North").onclick = hearts;

setInterval(fetchquote(), 3600000);

function fetchquote()
{
    fetch("https://studypoints.info/jokes/api/jokes/period/hour")
    .then(res => res.json()) //in flow1, just do it
    .then(data => {
        document.getElementById("quote").innerHTML = data.id + ". Quote: " + data.joke + " - Reference: " + data.reference;
    
})}

function hearts(event)
{
    document.getElementById("heart").innerHTML = event.currentTarget.id;
}





