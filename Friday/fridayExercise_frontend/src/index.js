import 'bootstrap/dist/css/bootstrap.css'

document.getElementById("div").style.textAlign = "center";
document.getElementById("svg2").onclick = fetchcountry;

function fetchcountry(event)
{
    var id = event.target.id;
    document.getElementById(id).style.fill="red";
    if(id === "svg2")
    {
        document.getElementById("info").innerHTML = "This is the ocean, and not a part of Europe";
        
    } else {
        
        fetch('http://restcountries.eu/rest/v1/alpha?codes=' + id)
        .then(res => res.json()) 
        .then(data => {
            
            var country = data.map(country => "Country: " + country.name + "<br>" + "Population: " 
            + country.population + "<br>" + "Area: " + country.area + "<br>" + "Borders: " 
            + country.borders.join(", "));
            document.getElementById("info").innerHTML = country.join(", ");
            
        }
        )}
    };









