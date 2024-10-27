"use server";

import { API_URL, TOKEN_NAME } from "@/constants";
import { cookies } from "next/headers";
import { authHeaders } from "@/helpers/authHeaders";

export default async function deleteLocation(formData:FormData){
    const locationId=formData.get("deleteValue")
    if(!locationId) return;
    const token=cookies().get(TOKEN_NAME)?.value;
    fetch(`${API_URL}/locations/${locationId}`,{
        method:"DELETE",
        headers:{
            ...authHeaders(),
        }
    })
}