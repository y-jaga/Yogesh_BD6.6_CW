const express = require('express');
const app = express();
const cors = require('cors');
const { getAllEmployees, getEmployeesById } = require('./controllers/index');

app.use(express.json());
app.use(cors());

//Exercise 1: Retrieve All Employees
//API Call: http://localhost:3000/employees

app.get('/employees', async (req, res) => {
  const employees = getAllEmployees();
  res.json({ employees });
});

//Exercise 2: Retrieve Employee by ID
//API Call: http://localhost:3000/employees/details/1

app.get('/employees/details/:id', async (req, res) => {
  const employee = getEmployeesById(parseInt(req.params.id));

  res.json({
    employee,
  });
});

module.exports = { app };
