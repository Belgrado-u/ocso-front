import createProvider from "@/actions/providers/create";
import { Button, Input } from "@nextui-org/react";


export default function FormCreateProvider(){
    return (
        <form action={createProvider} className="flex flex-col gap-2 flex-grow-0">
            <h1 className="text-2xl text-white">Crear Provedor</h1>
            <Input label="Nombre" placeholder="Pecsi" name="providerName"/>
            <Input label="Correo" placeholder="bussines@pecsi.com" name="providerEmail"/>
            <Input label="Numero" placeholder="444XXXXXXX" name="providerPhoneNumber"/>
                <Button color="primary" type="submit">Crear Provedor</Button>
        </form>
    )
}