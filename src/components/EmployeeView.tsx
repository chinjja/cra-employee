import React from 'react'
import { Employee } from './Types'

interface EmployeeProps {
    employee: Employee
}

const View = (props: EmployeeProps) => {
    return (
        <tr>
            <td>{props.employee.firstName}</td>
            <td>{props.employee.lastName}</td>
            <td>{props.employee.description}</td>
        </tr>
    )
}

export default View