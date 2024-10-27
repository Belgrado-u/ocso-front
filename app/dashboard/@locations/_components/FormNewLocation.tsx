import { Button, Input } from "@nextui-org/react";
import { createLocation } from "@/actions/locations/create";
import { cookies } from "next/headers";
import { API_URL, TOKEN_NAME } from "@/constants";
import axios from "axios";
import SelectManager from "./SelectManager";

export default async function FormNewLocation() {
    const token=cookies().get(TOKEN_NAME)?.value;
    const  responseManagers=await axios.get(`${API_URL}/managers`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    const responseLocation=await axios.get(`${API_URL}/locations`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return (
        <form action={createLocation}>
            <Input label="Nombre" name="locationName"/>
            <Input label="Direccion" name="locationAddress"/>
            <Input label="Latitud" name="locationLat"/>
            <Input label="Longitud" name="locationLng"/>
            <SelectManager managers={responseManagers.data} locations={responseLocation.data}/>
                <Button type="submit">Subir</Button>
        </form>
    );
}