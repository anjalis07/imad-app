//importing library
var express = require('express');//to create webs erver - port and handling hhtp connection
var morgan = require('morgan');//to help output log of server
var path = require('path');
var crypto=require("crypto");
// database purpose
var Pool=require("pg").Pool;

var config={
    user: 'anjalisat7',
    database : 'anjalisat7',
    host :'db.imad.hasura-app.io',
    port : '5432',
    password: process.env.DB_PASSWORD
   };


var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// newly added by me
app.get('/profile', function(req,res){
   res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

app.get('/article-two', function(req,res){
    res.send('This sis article 2');
});

app.get('/article-three', function(req,res){
    res.send('This is article 3');
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

// DATABASE CONNECTIVITY
var pool=new Pool(config);
app.get('/test-db', function(req,res){
    // make a select req and respond
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
            
        
    });
});




// Hash the password

function hash(input,salt){
    var hashed= crypto.pbkdf2Sync('input','salt',10000,512,'sha512');
    return hashed.toString("hex");
}

app.get('/hash/:input',function(req,res){
    var hashedString= hash(req.params.input, "this-is-anjali");
    res.send(hashedString);
});