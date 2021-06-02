import React, { useEffect, useState } from 'react'
import api, { loadFromServer } from './Api';
import { useHistory } from 'react-router';
import EmployeeView from './EmployeeView'
import { Employee } from './Types';


const View = () => {
    const history = useHistory()
    const [employees, setEmployees] = useState<Employee[]>([])
    
    useEffect(() => {
        api.get('/employees?size=3')
        .then(res => {
            setEmployees(res.data._embedded.employees)
        })
        .catch(reason => {
            if(reason.response.status === 401) {
                history.push('/login')
            }
        })
    }, [history]);

    const employee_list = employees.map((emp, idx) => 
        <EmployeeView key={idx} employee={emp} onClick={e=>console.log(e)}/>
    )
    return (
        <div>
            <table>
                <thead>
                    <tr style={{
                        backgroundColor: 'skyblue',
                    }}>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {employee_list}
                </tbody>
            </table>
            <button onClick={e=>{
                loadFromServer()
            }}>Load</button>
        </div>
    )
}

export default View;