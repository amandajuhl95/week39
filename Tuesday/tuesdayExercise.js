
// The magic of callbacks

var names = ["Lars", "Peter", "Jan", "Bo"];

// 1) Using existing functions that takes a callback as an argument

// a) Using the filter method:

const namesWithA = names.filter(names => names.includes("a"));
console.log(namesWithA);

// b) Using the map method: 

const namesReverse = names.map(name => name.split("").reverse().join(""));
console.log(namesReverse);

// 2) Implement user defined functions that take callbacks as an argument

// a) Implement a function: myFilter

function myFilter(array, callback)
{
    var filteredArray = [];
    array.forEach(element => {
        if(callback(element))
        filteredArray.push(element);   
    });

    return filteredArray;
}

function nameHasA(element)
{
    return element.includes("a");
}

console.log(myFilter(names, nameHasA));

// b) Implement a function: myMap

function myMap(array, callback)
{
    var mappedArray = [];
    array.forEach(element => {
        mappedArray.push(callback(element));   
    });

    return mappedArray;
}

function namesReversed(element)
{
    return element.split("").reverse().join("");
}

console.log(myMap(names, namesReversed));

// 3) Using the Prototype property to add new functionality to existing objects

Array.prototype.myFilter = function(callback)
{
    var filteredArray = [];
    this.forEach(element => {
        if(callback(element))
        filteredArray.push(element);   
    });

    return filteredArray;
}

console.log(names.myFilter(nameHasA));

// 4) Getting really comfortable with filter and map

// a) Use map + a sufficient callback to map numbers into [4,8,15,21,11]

var numbers = [1, 3, 5, 10, 11];

const addNumbers = numbers.map((value, index) => mappedNumbers(numbers.length, value, index))

function mappedNumbers(length, value, index)
{
   if(index < length-1) return value + numbers[index + 1];
   else return value;
}

console.log(addNumbers);

// b) Use map() to create the <a>’s for a navigation set

var ahrefNames = names.map(name => "<a href=\"\"> " + name + " </a>");
ahrefNames.unshift("<nav>");
ahrefNames.push("</nav>");
var navNames = ahrefNames.join("\n");
console.log(navNames);

// c) Use map()+(join + ..) to create a two column table

var persons = [{name:"Lars",phone:"1234567"}, {name: "Peter",phone: "675843"}, 
{name: "Jan", phone: "98547"},{name: "Bo", phone: "79345"}];

const personsTable = persons.map(person => "<tr><td>" + person.name + "</td><td>" + person.phone + "</td></tr>");
var table = personsTable.join("\n");
console.log(table);

// 5) Reduce

var all= ["Lars", "Peter", "Jan", "Bo"];

// a) Use join to create a single string with names: comma-, space. and  # - separated.

console.log(all.join(","));
console.log(all.join(" "));
console.log(all.join("#"));

// b) Create a reducer callback that, will return the sum of numbers 

var numbers = [2, 3, 67, 33]; 

var sum = function (total, number)
{
    return total + number;
}

console.log(numbers.reduce(sum, 0));

// c) Create a reducer callback that, will return the average age of all members

var members = [
    {name : "Peter", age: 18},
    {name : "Jan", age: 35},
    {name : "Janne", age: 25},
    {name : "Martin", age: 22}]

var reducer = function(total, member,index,array )
{
    total += member.age;
    if(index === array.length-1) return total/array.length;
    else return total;
}

var avg = members.reduce(reducer, 0);

console.log(avg);

// d) Create a reduce function that will return a single object like {Clinton: 3, Trump: 4, None: 1 }

var votes = [ "Clinton","Trump","Clinton","Clinton","Trump","Trump","Trump","None"];

var voteCounter = function(count, vote) { 

    if (!count[vote]) {
        count[vote] = 1;
    } else {
        count[vote] += 1;
    }
    return count;
}

var result = votes.reduce(voteCounter, {});
console.log(result);

// 6) Hoisting 

// Example 1) - Function declarations are completely hoisted

function hoist() {return "Hello there";}
console.log(hoist());
console.log(hoist2());
function hoist2() {return "Hello back";}

// Example 2) - Var declarations are hoisted

a = 2;
var b;

var testVar = function(a,b) {return a + " " + b;}

console.log(testVar(a,b));
var a; // hoist
b = 1; // not hoist

// To avoid bugs, always declare all variables 
// at the beginning of every scope.

// What is the difference between the keyword var and the ES6 keyword let?

// The difference between var and let is that var is function scoped 
// and global scoped, where let is block scoped (eg. for loop, if statemants)

// 7) "this" in JavaScript

// Example 1) - using call() 

var human = 'Amalie';
var newThis = {human: 'Amanda'};
var anotherThis = {human: 'Laura'};

function WhoIsThis() {
  return this.human;  
}

console.log(WhoIsThis());
console.log(WhoIsThis.call(newThis)); 
console.log(WhoIsThis.call(anotherThis))

// Example 2) - using apply()

console.log(WhoIsThis.apply(newThis)); 

// Example 3) - using bind()
  
var someone = WhoIsThis.bind({human: 'Amalie'});
console.log(someone());
  
var someoneElse= someone.bind({human: 'Laura'}); 
console.log(someoneElse());

// 9) Reusable Modules with Closures 

// 1) Implement and test the Closure Counter Example 

var add = (function () {
    var counter = 0;
    return function () {counter += 1; return counter}
  })();
  
  console.log(add());
  console.log(add());
  console.log(add());

// 2) Implement a reusable function using the Module pattern that should 
// encapsulate information about a person (name, and age) and returns an object

