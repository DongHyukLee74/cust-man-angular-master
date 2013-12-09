var fs = require ("fs");

var pictureUrl = __dirname+"../../public/pics/";

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('custdb', server, {safe: true});

db.open(function(err, db) {
  if(!err) {
    console.log("Connected to 'custdb' database");
    db.collection('custman', {safe:true}, function(err, collection) {
      if(err) {
        console.log("The 'custman' collection doesn't exist. Creating it with sample data...");
        customerDB();
      }
    });
  }
});

// GET
exports.findAll = function (req, res) {
  db.collection('custman', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.json({
        custman: items
      });
    });
  });
};
exports.findById = function (req, res) {
  var id = req.params.id;
  console.log('Retrieving content: ' + id);
  db.collection('custman', function(err, collection) {
    collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
      res.json({
        cust: item
      });
    });
  });
};

// POST
exports.addCust = function (req, res) {
    var cust = req.body;
    console.log('Adding Customer: ' + JSON.stringify(cust));
    db.collection('custman', function(err, collection) {
        collection.insert(cust, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]._id));
                res.redirect('/custman');
            }
        });
    });
};

exports.updateCust = function(req, res) {
    var id = req.params.id;
    var cust = req.body;
    delete cust._id;
    console.log('Updating Customer: ' + id);
    console.log(JSON.stringify(cust));
    //res.send(JSON.stringify(cust));
    db.collection('custman', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, cust, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating Customer: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.redirect('/custman');
            }
        });
    });
};

exports.deleteCust = function(req, res) {
    var id = req.params.id;
    console.log('Deleting Customer: ' + id);
    db.collection('custman', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            }
            else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

var customerDB = function() {

    var custman = [
    {
        age: 11,
        name: "leedong1",
        sex: true,
        address: "Seoul Nowon Sanggye",
        telnum: "02-123-4567",
        hpnum: "010-1234-5678",
        picture: null
    },
    {
        age: 22,
        name: "leedong2",
        sex: false,
        address: "Inchon Wolmi",
        telnum: "032-123-4567",
        hpnum: "010-2341-5678",
        picture: null
    },
    {
        age: 33,
        name: "leedong3",
        sex: true,
        address: "KyoungGi Pochon",
        telnum: "031-231-4567",
        hpnum: "010-3412-5678",
        picture: null
    },
    {
        age: 44,
        name: "leedong4",
        sex: false,
        address: "KwangJu Dongsung",
        telnum: "062-231-4567",
        hpnum: "010-4123-5678",
        picture: null
    },
    {
        age: 55,
        name: "leedong5",
        sex: true,
        address: "DaeGu Dalsung",
        telnum: "053-231-4567",
        hpnum: "010-4123-6785",
        picture: null
    },
    {
        age: 66,
        name: "leedong6",
        sex: false,
        address: "DaeJun",
        telnum: "042-231-4567",
        hpnum: "010-4123-7856",
        picture: null
    },
    {
        age: 77,
        name: "leedong7",
        sex: true,
        address: "Busan Sasang",
        telnum: "051-231-4567",
        hpnum: "010-4123-8567",
        picture: null
    }];

    db.collection('custman', function(err, collection) {
        collection.insert(custman, {safe:true}, function(err, result) {});
    });

};