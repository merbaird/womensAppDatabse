var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var Glossary = require('./models/glossary')
mongoose.connect('mongodb://localhost/glossary')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;
var router = express.Router();

router.use(function(res, req, next) {
    console.log("something is happening");
    next();
});


router.get('/', function(req, res) {
    res.json({ message: "Hooray, welcome to our api!"});
});

//more routes go here

router.route('/glossary')

  .post(function(req, res) {
    var glossary = new Glossary();
    glossary.term= req.body.term;
    glossary.definition = req.body.definition;

    glossary.save(function(err) {
      if(err)
        res.send(err)
      res.json({ message: "Term created!"});

    })
  })

  .get(function(req, res) {
    Glossary.find(function(err, glossary) {
      if(err)
        res.send(err)
      res.json(glossary)
    })
  })

  router.route('/glossary/:glossary_id')

    .get(function(req, res) {
      Glossary.findById(req.params.glossary_id, function(err, glossary){
        if(err)
          res.send(err)
        res.json(glossary)
      })
    })

  .put(function(req,res) {
    Glossary.findById(req.params.glossary_id, function(err, glossary) {
      if(err)
        res.send(err)
      glossary.term = req.body.term;
      glossary.definition = req.body.definition;
      glossary.save(function(err) {
        if(err)
          res.send(err);
        res.json({message: "Term Updated!"})
      })
    })
  })

  .delete(function(req, res){
    Glossary.remove({
      _id: req.params.glossary_id
    }, function(err, glossary) {
      if(err)
        res.send(err)
      res.json({message: "Term successfully deleted!"});
    });
  });


app.use('/api', router);

app.listen(port);
console.log("magic happens on port " + port);
