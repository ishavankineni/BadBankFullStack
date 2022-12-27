const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the users.
recordRoutes.route("/users").get(function (req, res) {
 let db_connect = dbo.getDb("badBankUsers");
 db_connect
   .collection("badBankUsers")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single users by id
recordRoutes.route("/users/:email").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { email: req.params.email };
 db_connect
   .collection("badBankUsers")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/users/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   email: req.body.email,
   password: req.body.password,
   balance: req.body.balance,
 };
 db_connect.collection("badBankUsers").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update the balance of a user by email.
recordRoutes.route("/update/:email").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { email: req.params.email };
 let newvalues = {
   $set: {
     balance: req.body.balance,
   },
 };
 db_connect
   .collection("badBankUsers")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a user
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("badBankUsers").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;