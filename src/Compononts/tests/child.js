import { Button, ThemeProvider } from '@mui/material';
import React from 'react';
import { mytheme } from '../../Theme';

function EmployeeList(props) {
  

  return (
    <div>
      <p>{props.lowerSalaryNames}</p>
      {props.employees.map(employee => (
        <div key={employee.id}>
          <p>{employee.name} Salary: {employee.salary}</p>
          <p></p>
          <ThemeProvider theme={mytheme}>
          <Button variant="contained" backgroundColor='primary.dark' onClick={() => props.lowsalary(employee)}>Show Employees with Lower Salary</Button>
          </ThemeProvider>
        </div>
      ))}
      
    </div>
  );
}

export default EmployeeList;
