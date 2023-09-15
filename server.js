const express = require('express');
const cors = require('cors');
const mongoClient = require('mongodb').MongoClient;
const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

mongoClient.connect('mongodb://0.0.0.0:27017', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully connected to the database');
    const db = client.db('companyDB');
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use((req, res, next) => {
      req.db = db;
      next();
    });
    
    app.use('/api', employeesRoutes);
    app.use('/api', departmentsRoutes);
    app.use('/api', productsRoutes);
    app.use((req, res) => {
      res.status(404).send({ message: 'Not found...' });
    });
    app.listen('8000', () => {
      console.log('Server is running on port: 8000');
    });

    // show collection
    // db.collection('employees').find({ department: 'Testing' }).toArray((err, data) => {
    //   if (!err) console.log(data);
    // });
     
    // add collection
    // db.collection('departments').insertOne({ name: 'Prezes'}, err => {
    //   if(err) console.log('err');
    // });

    // update collection
    // db.collection('employees').updateOne({ department: 'IT' }, { $set: { salary: 6000 }}, err => {
    //   if(err) console.log(err);
    // });

    // delete collection
    // db.collection('departments').deleteOne({ name: 'Prezes'}, (err) => {
    //   if(err) console.log(err);
    // });

  }
});
