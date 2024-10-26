import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { Location } from "@/entities";
import { cookies } from "next/headers";
import { API_URL, TOKEN_NAME } from "@/constants";
import axios from "axios";
import Link from "next/link";
import { authHeaders } from "@/helpers/authHeaders";


export default async function LocationCard({store}: {store:string |string[]| undefined}){
    if (!store) return null;
    const {data}= await axios.get<Location>(`${API_URL}/locations/${store}`,{
        headers:{
            ...authHeaders()
        }
    })
    return (
        <Card>
            <CardHeader>
                <b className="w-full text-2xl">{data.locationName}</b>
            </CardHeader>
            <Divider/>
                <CardBody className="flex flex-col w-full items-center ">
                    <p className="w-full">
                        Manager:{" "}
                        <Link href={{pathname:`/dashboard/managers`}}> 
                            <b>{data.manager?.managerFullName}</b>
                        </Link>
                    </p>
                    <p className="w-full">
                        Direccion:<b>{data.locationAdress}</b>
                    </p>
                    
                    <iframe 
                    className="border-2 border-orange-800 rounded-md my-2"
                        width="300"
                        height="200"
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAz0y6dhhUVleZmt7-H4PO1QQWCSEz3LBg
                        &q=${data.locationLatLng[0]},${data.locationLatLng[1]}`}>
                    </iframe>
                </CardBody>
        </Card>
    )
}