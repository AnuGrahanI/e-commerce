import EmployeeList from './child';
import React, { useState } from 'react';

const employees = [
  { "id": 11, "name": "Abhinav", "salary": 75000 },
  { "id": 2131, "name": "Gaurav", "salary": 62000 },
  { "id": 3012, "name": "Raj", "salary": 32000 }
];

function Employeeslist() {
    const [lowerSalaryNames, setLowerSalaryNames] = useState();

  const lowsalary = (employee) => {
    const lowerSalaryEmployees = employees.filter(e => e.salary < employee.salary);
    const names = lowerSalaryEmployees.map(e => e.name);
    setLowerSalaryNames(names.join(', '));
  };
  return (
    <div>
      <h1>employees</h1>
      <EmployeeList employees={employees} lowsalary={lowsalary} lowerSalaryNames={lowerSalaryNames}  />
    </div>
  );
}

export default Employeeslist;
