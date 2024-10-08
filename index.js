// ------------------part 7 --------------------------
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    console.log("file", files);
    res.render("index", { files: files });
  });
});


app.get("/files/:filename", (req, res) => {
fs.readFile(`./files/${req.params.filename}`,'utf-8', function (err, filedata) {
  console.log('filedata',filedata);
  
   res.render('show',{
    filename: req.params.filename,
    filedata:filedata
   })
})
});

app.get("/edit/:filename", (req, res) => {
 res.render('edit',{
    filename: req.params.filename
 })
});


app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function (err){
     res.redirect("/")
    })
});

app.post("/edit", (req, res) => {
fs.rename( `./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
  err ? console.log('error', err) :  res.redirect('/')
  

})
});

app.listen(3000);

// -------------------------------------------------------- part 6--------------------------------
// const express = require("express");
// const app = express();
// const path = require("path");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
// app.set("view engine", "ejs");

// app.get("/", function (req, res) {
//   res.render("index");
// });

// app.get("/profile/:username", function (req, res) {
//   res.send(`Wel-come ,  ${req.params.username}`);
// });

// app.get("/profile/:username/:age", function (req, res) {
//   res.send(`Wel-come ,${req.params.username} age : ${req.params.age}`);
// });

// app.listen(3000, function () {
//   console.log("Server is running on port 3000");
// });
