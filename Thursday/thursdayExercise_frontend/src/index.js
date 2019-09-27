import 'bootstrap/dist/css/bootstrap.css'

var div = document.getElementById("div");
div.style.textAlign = "center";

document.getElementById("getUser").onclick = getUser;
document.getElementById("addUser").onclick = addUser;
document.getElementById("editUser").onclick = editUser;
document.getElementById("deleteUser").onclick = deleteUser;

fetchAll();

function fetchAll()
{
    fetch('http://localhost:8080/thusdayEercise/api/person/all')
    .then(res => res.json()) 
    .then(data => {
        var users = data.map(user => "<tr> <td>" + user.name + "</td></tr>");

    document.getElementById("tablebody").innerHTML = users.join("\n");
})};

function getUser()
{
    var name = document.getElementById("name").value;
    fetch('http://localhost:8080/thusdayEercise/api/person/' + name)
    .then(res => res.json()) 
    .then(data => 
    {
        var user = "<tr> <td>" + data.name + "</td></tr>";
        document.getElementById("tablebody").innerHTML = user;
    });
    
}

function makeOptions(method, body) 
{
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
}

function addUser()
{
    var Uname = document.getElementById("name").value;
    
    const data = {name: Uname};
    const options = makeOptions("POST",data);
    fetch("http://localhost:8080/thusdayEercise/api/person/add/",options)
    .then(fetchAll);
    
}

function editUser()
{
    var oldname = document.getElementById("name").value;
    var Uname = document.getElementById("newName").value;
    
    const data = {name: Uname};
    const options = makeOptions("PUT",data);
    fetch("http://localhost:8080/thusdayEercise/api/person/edit/" + oldname,options)
    .then(fetchAll);

}

function deleteUser()
{
    var name = document.getElementById("name").value;
    const options = makeOptions("DELETE");
    fetch("http://localhost:8080/thusdayEercise/api/person/delete/" + name,options)
    .then(fetchAll);
    
}


