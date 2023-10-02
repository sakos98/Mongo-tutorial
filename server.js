const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

// connects our backend code with the database
mongoose.connect('mongodb://0.0.0.0:27017/companyDB', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

module.exports = server;


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
