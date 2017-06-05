var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var Resource = require('./models/resources')
mongoose.connect('mongodb://localhost/resources')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 4000;
var router = express.Router();

router.use(function(res, req, next) {
    console.log("something is happening");
    next();
});


router.get('/', function(req, res) {
    res.json({ message: "Hooray, welcome to our api!"});
});

//more routes go here

router.route('/resources')

  .post(function(req, res) {
    var resource = new Resource();
    resource.name= req.body.name;
    resource.description = req.body.description;
    resource.website = req.body.website;
    resource.phone = req.body.phone;

    resource.save(function(err) {
      if(err)
        res.send(err)
      res.json({ message: "Resource created!"});

    })
  })

  .get(function(req, res) {
    Resource.find(function(err, resource) {
      if(err)
        res.send(err)
      res.json(resource)
    })
  })

  router.route('/resources/:resource_id')

    .get(function(req, res) {
      Resource.findById(req.params.resource_id, function(err, resource){
        if(err)
          res.send(err)
        res.json(resource)
      })
    })

  .put(function(req,res) {
    Resource.findById(req.params.resource_id, function(err, resource) {
      if(err)
        res.send(err)
      resource.name = req.body.name;
      resource.description = req.body.description;
      resource.website = req.body.website;
      resource.phone = req.body.phone;

      resource.save(function(err) {
        if(err)
          res.send(err);
        res.json({message: "Resource Updated!"})
      })
    })
  })

  .delete(function(req, res){
    Resource.remove({
      _id: req.params.resource_id
    }, function(err, resource) {
      if(err)
        res.send(err)
      res.json({message: "Resource successfully deleted!"});
    });
  });


app.use('/api', router);

app.listen(port);
console.log("magic happens on port " + port);
