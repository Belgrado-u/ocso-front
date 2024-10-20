
'use client';
import { Location } from "@/entities";
import { Select,SelectItem } from "@nextui-org/react";

export default function SelectLocation ({locations} : {locations:Location[]})  {
    return(
        <Select>
            {locations.map((location:Location) =>{
                return(
                <SelectItem key={location.locationId}>
                    {location.locationName}
                </SelectItem>
                );
            })}
        </Select>
    )
}
