import axios from 'axios';
import { Employee } from './Types';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
    headers: {
        accept: 'application/hal+json',
    }
})

interface Properties {
    [key: string]: string,
}

interface Links {
    [key: string]: string,
}

interface LoadEmployee {
    links: Links,
    properties: Properties,
    employees: Employee[],
}

export async function loadFromServer(): Promise<LoadEmployee> {
    const result: LoadEmployee = {
        links: {},
        properties: {},
        employees: [],
    }
    const res_employees = await api.get('/employees?size=3')
    for(const key in res_employees.data._links) {
        result.links[key] = res_employees.data._links[key]
    }
    const res_profile = await api.get(res_employees.data._links.profile.href, {
        headers: {
            accept: 'application/schema+json'
        }
    })
    result.properties = res_profile.data.properties
    for(const emp of res_employees.data._embedded.employees) {
        result.employees.push({
            ...emp,
            self: emp._links.self.href
        })
    }
    update_etag(result.employees)
    return result
}

export async function navigate(url: string): Promise<Employee[]> {
    const res = await api.get(url)

    return []
}

async function update_etag(employees: Employee[]) {
    await Promise.all(employees.map(emp => {
        api
        .get(emp.self)
        .then(res => {
            emp.etag = res.headers.etag
        })
    }))
}

export default api