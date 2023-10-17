// src/components/EmployeeList.jsx

// import React, { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/employees');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Employee List</h1>
      {error && <p>{error}</p>}
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
