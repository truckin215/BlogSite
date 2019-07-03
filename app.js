const express = require('express')
const bodyParser = require('body-parser')
const urlEncoded = bodyParser.urlencoded({extended: false})

const dummyData = [{title: "Work on my portfolio", blog: "Stuff" }];

// setting up
const app = express();

// setting template engine
app.set("view engine","ejs");

// use middle ware to serve static files
app.use(express.static('./public'));



// ############### ROUTES ##############

// Get for tasks: returns all tasks
app.get('/Post', function (req, res) {
    console.log("hitting get route");
    res.render('Post', {taskToDo: dummyData});
});

// Post for tasks: posting a task
app.post('/Post', urlEncoded, function(req, res){
  // console.log(req.body);
  let incomingItem = {}
  incomingItem.title = req.body.title;
  incomingItem.blog = req.body.blog;
  dummyData.push(incomingItem)
  res.redirect('/Post')
});

app.delete("/Post/:id", function(req, res){
    // console.log(req.params.id);
    dummyData.splice(req.params.id, 1);
    // console.log(dummyData);
    res.json(dummyData)
});

app.listen(3000, function(err){
    if (err)
        console.log(err)
    console.log('Server is live on port 3000')
})