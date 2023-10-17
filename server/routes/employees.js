import express from 'express';
const router = express.Router();
// import employees from '../data/employees.json';
import employees from '../data/employees.json' assert { type: 'json' };





// 1. Devolver todos los empleados
router.get('/', (req, res) => {
  res.json(employees);
});

// 2. Devolver empleados basados en la paginación
router.get('/page/:pageNumber', (req, res) => {
  const pageNumber = parseInt(req.params.pageNumber);
  const startIndex = 2 * (pageNumber - 1);
  const endIndex = startIndex + 2;
  res.json(employees.slice(startIndex, endIndex));
});


// 3. Devolver el empleado más viejo
router.get('/oldest', (req, res) => {
  const oldestEmployee = employees.reduce((oldest, current) => {
    return (oldest.age > current.age) ? oldest : current;
  });
  res.json(oldestEmployee);
});

// 4. Devolver empleados con privilegios de "user"
router.get('/privileges/user', (req, res) => {
  const userPrivilegeEmployees = employees.filter(employee => employee.privileges === "user");
  res.json(userPrivilegeEmployees);
});

// 5. Añadir un nuevo empleado
router.post('/', (req, res) => {
  const newEmployee = req.body;
  // Validación básica del formato del empleado
  if (!newEmployee.name || !newEmployee.age || !newEmployee.privileges) {
    return res.status(400).json({ "code": "bad_request" });
  }
  employees.push(newEmployee);
  res.json(newEmployee);
});

// 6. Devolver empleados basados en sus insignias
router.get('/badges/:badge', (req, res) => {
  const badge = req.params.badge;
  const employeesWithBadge = employees.filter(employee => employee.badges.includes(badge));
  res.json(employeesWithBadge);
});

// 7. Devolver un empleado basado en su nombre
router.get('/:name', (req, res) => {
  const name = req.params.name;
  const employee = employees.find(emp => emp.name === name);
  if (!employee) {
    return res.status(404).json({ "code": "not_found" });
  }
  res.json(employee);
});

export default router;
