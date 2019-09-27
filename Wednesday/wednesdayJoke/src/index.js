import 'bootstrap/dist/css/bootstrap.css'
import jokes from "./jokes";

document.getElementById("getJoke").onclick = getJoke;
document.getElementById("addJoke").onclick = addJoke;

const allJokes = jokes.getJokes().map(joke => "<li>"+joke+"</li>");
document.getElementById("jokes").innerHTML = allJokes.join("");

function getJoke()
{
    var jokeId = document.getElementById("jokeId").value;
    if(jokeId == "" || jokeId > jokes.getJokes().length-1)
    {
        document.getElementById("joke").innerHTML = "Is that a joke? Try again";
        document.getElementById("jokeId").value = "";
    } else{
        var getJoke = jokes.getJokeById(jokeId);
        document.getElementById("joke").innerHTML = getJoke;
        document.getElementById("jokeId").value = "";
    }
}

function addJoke()
{
    var newJoke = document.getElementById("newJoke").value;
    if(newJoke == "")
    {
        document.getElementById("joke").innerHTML = "Is that the best joke you got?";
    } else{
        jokes.addJoke(newJoke);
        document.getElementById("newJoke").value = "";

        const allJokes = jokes.getJokes().map(joke => "<li>"+joke+"</li>");
        document.getElementById("jokes").innerHTML = allJokes.join("");
    }
}



