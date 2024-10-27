import { API_URL, TOKEN_NAME } from "@/constants";
import { Employee } from "@/entities";
import { authHeaders } from "@/helpers/authHeaders";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { cookies } from "next/headers";

export default async function EmployeesLocation ({store} : {store:string | string[] | undefined}) {
    if(!store) return"NO hay empleados"
    const response=await fetch(`${API_URL}/employees/location/${store}`,{
        method:"GET",
        headers:{
            ...authHeaders()
        },
        next:{
            tags:["dashboar:locations:employees"]
        }
    });
    const data:Employee[] = await response.json()
    return data.map((employee:Employee)=> {
        const fullname = employee.employeeName + " " + employee.employeeLastName
            return (
            <Card className="mx-10 my-10">
                <CardHeader>
                <p className="w-full">Nombre: <b>{fullname}</b></p>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <p className="w-full">Email: <b>{employee.employeeEmail}</b></p>
                    <p className="w-full">Telefono: <b>{employee.employeePhoneNumber}</b></p>
                </CardBody>
            </Card>
            )
    });
            
}