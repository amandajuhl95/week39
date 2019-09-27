import 'bootstrap/dist/css/bootstrap.css'

var div = document.getElementById("div");
div.style.textAlign = "center";

document.getElementById("getUser").onclick = getUser;
document.getElementById("addUser").onclick = addUser;
document.getElementById("editUser").onclick = editUser;
document.getElementById("deleteUser").onclick = deleteUser;

fetchAll();

function handleHttpErrors(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
   }
   

function fetchAll()
{
    fetch('http://localhost:3333/api/users')
    .then(res => res.json()) 
    .then(data => {
        var users = data.map(user => "<tr> <td>" + user.id + "</td>" +
                "<td> " + user.name + "</td>" +
                "<td>" + user.age + "</td>" +
                "<td>" + user.gender +
                "<td>" + user.email + "</td></tr>");

    document.getElementById("tablebody").innerHTML = users.join("\n");
})};

function getUser()
{
    var id = document.getElementById("id").value;
    if(id === "")
    {
        id = 0;
    }
    fetch('http://localhost:3333/api/users/' + id)
    .then(handleHttpErrors)
    .then(data => 
    {
        var user = "<tr> <td>" + data.id + "</td>" + "<td> " + data.name + 
        "</td>" + "<td>" + data.age + "</td>" + "<td>" + data.gender + 
        "<td>" + data.email + "</td></tr>";

        document.getElementById("tablebody").innerHTML = user;
    })
    .catch(err =>{
        if(err.status){
          err.fullError.then(e=> document.getElementById("error").innerHTML = "Errorstatus: " + e.msg);
        }
        else{
            document.getElementById("error").innerHTML = "Errorstatus: " + e.msg;
         }
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
    var Uage = document.getElementById("age").value;
    var Ugender = document.getElementById("dropdown").value;
    var Uemail = document.getElementById("email").value;
    
    const data = {name: Uname, age: Uage, gender: Ugender, email: Uemail};
    const options = makeOptions("POST",data);
    fetch("http://localhost:3333/api/users",options)
    .then(handleHttpErrors)
    .then(fetchAll)
    .catch(err =>{
        if(err.status){
          err.fullError.then(e=> document.getElementById("error").innerHTML = "Errorstatus: " + e.msg);
        }
        else{
            document.getElementById("error").innerHTML = "Errorstatus: " + e.msg;
         }
     });
}

function editUser()
{
    var id = document.getElementById("user_id").value;
    var Uname = document.getElementById("name").value;
    var Uage = document.getElementById("age").value;
    var Ugender = document.getElementById("dropdown").value;
    var Uemail = document.getElementById("email").value;
    
    const data = {name: Uname, age: Uage, gender: Ugender, email: Uemail};
    const options = makeOptions("PUT",data);
    fetch("http://localhost:3333/api/users/" + id,options)
    .then(handleHttpErrors)
    .then(fetchAll)
    .catch(err =>{
        if(err.status){
          err.fullError.then(e=> document.getElementById("error").innerHTML = "Errorstatus: " + e.msg);
        }
        else{
            document.getElementById("error").innerHTML = "Errorstatus: " + e.msg;
         }
     });
}

function deleteUser()
{
    var id = document.getElementById("user_id").value;
    const options = makeOptions("DELETE");
    fetch("http://localhost:3333/api/users/" + id,options)
    .then(handleHttpErrors)
    .then(fetchAll)
    .catch(err =>{
        if(err.status){
          err.fullError.then(e=> document.getElementById("error").innerHTML = "Errorstatus: " + e.msg);
        }
        else{
            document.getElementById("error").innerHTML = "Errorstatus: " + e.msg;
         }
     });
}
   

