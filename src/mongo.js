const mongourl = 'mongodb://jordi:jordi!@localhost:27017/EOS'

//var MongoClient = require('mongodb').MongoClient;
//import mongoc from 'mongodb'
//simple database client
//blocks and transactions are returned in descending order of their creation time, so we get the latest ones.

export function getBlockList(limit){
    mongoc.connect(mongourl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("EOS");
        dbo.collection("Blocks").find({}).limit(limit).sort( { block_num: -1 } ).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          return result
        });
      });
}
export function getTransactionList(limit){
    mongoc.connect(mongourl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("EOS");
        dbo.collection("Transactions").find({}).limit(limit).sort( { block_num: -1 } ).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          return result
        });
      });
}
export function getAccountList(limit){
    mongoc.connect(mongourl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("EOS");
        dbo.collection("Accounts").find({}).limit(limit).sort( { block_num: -1 } ).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          return result
        });
      });
}

export function getTransactionInfo(transactionID){
  mongoc.connect(mongourl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("EOS");
    dbo.collection("Transactions").find({transaction_id: transactionID}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      return result
    });
  });
}
export function getBlockInfo(blockNum){
  mongoc.connect(mongourl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("EOS");
    dbo.collection("Blocks").find({block_num: blockNum}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      return result
    });
  });
}
export function getAccountInfo(accountName){
  mongoc.connect(mongourl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("EOS");
    dbo.collection("Transactions").find({name: accountName}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      return result
    });
  });
}