import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Employee } from './Types'

const useStyle = makeStyles(theme => ({
    root: {
        '&:hover': {
            background: '#f00',
        },
    }
}))
interface EmployeeProps {
    employee: Employee,
    onClick: (employee: Employee) => void,
}

const View = (props: EmployeeProps) => {
    const classes = useStyle()
    return (
        <tr className={classes.root} onClick={e=>{
            e.preventDefault()
            props.onClick(props.employee)
        }}>
            <td>{props.employee.firstName}</td>
            <td>{props.employee.lastName}</td>
            <td>{props.employee.description}</td>
        </tr>
    )
}

export default View