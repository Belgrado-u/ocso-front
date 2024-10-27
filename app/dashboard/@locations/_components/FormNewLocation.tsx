import { Button, Input } from "@nextui-org/react";
import { createLocation } from "@/actions/locations/create";
import { API_URL, TOKEN_NAME } from "@/constants";
import SelectManager from "./SelectManager";
import { authHeaders } from "@/helpers/authHeaders";
import { Location, Manager } from "@/entities";

export default async function FormNewLocation({store}:{store:string|string[]|undefined}) {
    if(store) return null;
    const  responseManagers=await fetch(`${API_URL}/managers`,{
            headers:{
                ...authHeaders()
            },
            next: {
                tags:["dashboard:managers"]
            }
        }
    )
    const dataManagers: Manager[]= await responseManagers.json()
    const responseLocation=await fetch(`${API_URL}/locations`,{
        headers:{
            ...authHeaders()
        },
        next: {
            tags:["dashboard:locations"]
        }
    })
    const dataLocation:Location[] =await responseLocation.json()
    return (
        <form action={createLocation} className="bg-orange-400 py-2 px-4 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl text-white text-center">Crear Tienda</h1>
            <Input label="Nombre" placeholder="Ocso Juriquilla" name="locationName"/>
            <Input label="Direccion" placeholder="Avenida de la Luz s/n" name="locationAddress"/>
            <Input label="Latitud" placeholder="120" name="locationLat"/>
            <Input label="Longitud" placeholder="20" name="locationLng"/>
            <SelectManager managers={dataManagers} locations={dataLocation}/>
                <Button type="submit" color="primary">Subir</Button>
        </form>
    );
}