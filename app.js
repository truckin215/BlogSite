const express = require('express')
const mysql = require ('mysql')
const bodyParser = require('body-parser')

const urlEncoded = bodyParser.urlencoded({extended: false})


// setting up sql
const app = express();
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'admin',
    password : 'student',
    database : 'Blog'
    });

db.connect(function(err){
    if (err) throw err
    console.log("My SQL is connected")
})


// setting template engine
app.set("view engine","ejs");

// use middle ware to serve static files
app.use(express.static('./public'));



// ############### ROUTES ##############

// Get for tasks: returns all tasks
app.get('/Posts', function (req, res) {
    let sql = 'SELECT * FROM Post'
    db.query(sql, function (err, results) {
        if (err) throw err;
        // rendering tasks view and passing taskToDo data
        res.render('Posts', {blogPost: results});
    });
});
// Post for tasks: posting a task
app.post('/Post', urlEncoded, function(req, res){
  // console.log(req.body);
  let incomingItem = {}
  incomingItem.title = req.body.title;
  incomingItem.post = req.body.blog;
  console.log(incomingItem)
  let sql = "INSERT INTO Post SET ?"
    db.query(sql, incomingItem,(err, result) =>{
        if(err) throw err;
        console.log(result);
        res.redirect('/Posts')
    })
});

app.delete("/Posts/:id", function(req, res){
    let sql = 'DELETE FROM Post WHERE ID=' + req.params.id;
    db.query(sql,(err, result) =>{
        if(err) throw err;
        console.log(result);
        res.json(result)
    })
});


app.listen(3000, function(err){
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})
