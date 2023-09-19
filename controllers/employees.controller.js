const Employee = require('../models/employee.model'); 

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate());
  } catch (err) {
    res.status(500).json({message: err });
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(rand);
    if (!dep) {
      res.status(404).json({ message: 'Not Found' });
    } else {
      res.json(dep);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.getEmployeeId = async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id);
    if (!dep) {
      res.status(404).json({ message: 'Not found'});
    } else {
      res.json(dep);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.addEmpoloyee = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department });
    await newEmployee.save();
    res.json({ message: 'OK'});
    } catch (err) {
      res.status(500).json({ message: err });
    }
}

exports.updateEmployee = async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const dep = await Employee.findById(req.params.id);
    if (dep) {
      await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department: department } });
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.deleteEmployee = async (req, res) => {
  try {
    const dep = await Employee.findById(req.params.id);
    if (dep) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else
      res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}