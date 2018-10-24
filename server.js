let express = require('express');
let path = require('path');

let app = express();

const PORT = 4000;
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


let characters = [{
    routeName: "captainamerica",
    name: "Captain America",
    role: "Saving the World",
    age: 100,
    strengthPoints: 1000
}, {
    routeName: "ironman",
    name: "Iron Man",
    role: "Saving Cap and the World",
    age: 50,
    strengthPoints: 10000
}, {
    routeName: "hawkeye",
    name: "Hawkeye",
    role: "Man with the Bow",
    age: 42,
    strengthPoints: 100
}];


app.get('/', function (req, res) { //function(request, response
    res.sendFile(path.join(__dirname, "view.html")); //;  __dirname + "view.html"); //.send("Welcome to Avengers page!");
});

app.get('/add', function(req, res){
    res.sendFile(path.join(__dirname, "add.html"));
});

app.listen(PORT, function () {
    console.log(`Avengers Servers listening on port ${PORT}`)
});

app.get("/api/v1/characters", function (req, res) {
    return res.json(characters);
});

app.get("/api/v1/characters/:characterId", function (req, res) {
    let characterId = req.params.characterId;
    console.log(characterId);
    return res.json(characters.filter(x => {
        return x.routeName === characterId;
    }));
});

app.post('/api/v1/characters', function (req, res) {
    //console.log(req);
    

    let newCharacter = req.body;
    //console.log(newCharacter);
    if(characters.find(x => {return x.routeName === newCharacter.routeName}) === newCharacter.routeName){
        
    return res.json("Dupe");
    }
    characters.push(newCharacter);


    return res.json("Done");
});

