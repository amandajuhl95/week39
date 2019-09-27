

var names = ["Lars", "Peter", "Jan", "Bo"];
var persons = [{name: "Lars", phone: "1234567"}, {name: "Peter", phone: "675843"},
    {name: "Jan", phone: "98547"}, {name: "Bo", phone: "79345"}];

aref(names);
table(persons);

// b) Use map() to create the <a>’s for a navigation set
function aref(array)
{
    var ahrefNames = array.map(name => "<a href=\"\"> " + name + " </a>");
    ahrefNames.unshift("<nav>");
    ahrefNames.push("</nav>");
    var navNames = ahrefNames.join("\n");

    document.getElementById("names").innerHTML = navNames;
}

// c) Use map()+(join + ..) to create to create a string

function table(array)
{
    var personsTable = array.map(person => "<tr><td>" + person.name + "</td><td>"
                + person.phone + "</td></tr>");
    var table = personsTable.join("\n");
    document.getElementById("table").innerHTML = table;
}

// d

document.getElementById("btn").onclick = filterNames;
function filterNames()
{
    const filterN = names.filter(name => name.includes("a"));
    aref(filterN);
    const filterP = persons.filter(person => person.name.includes("a"));
    table(filterP);
}


