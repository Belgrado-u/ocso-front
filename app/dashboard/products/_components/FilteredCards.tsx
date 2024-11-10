'use client';
import { Product, Provider } from "@/entities";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";

export default function FilteredCards ({products, providers}: {products:Product[],providers:Provider[]}) {
    const [filtered,setFiltered]= useState<string>("");
    const [provider,setProvider]=useState<string>();
    const [show,setShow]= useState(false);
    const [productsList,setProductsList]=useState<Product[]>(products);
    useEffect (()=>{
        const FilteredProducts= products.filter((product)=>{
            if(
            product.productName.toLowerCase().includes(filtered.toLocaleLowerCase()) && 
            product.provider.providerId==provider
            ){
                return true;
            }else return false;
        });
        setProductsList(FilteredProducts);
        setShow(true);
    }, [filtered,provider, products]);
    return(
        <div className=" max-h-[90vh] min-h-[90vh] overflow-y-auto flex flex-col gap-4 border-r-orange-400 border-r-2 pt-10 px-10">
            <Select label="Proveedor" onChange={(e)=>{
                setProvider(e.target.value);
            }}>
                {providers.map((provider)=>(
                    <SelectItem key={provider.providerId}>
                        {provider.providerName}
                    </SelectItem>
                ))}
            </Select>
            <Input
            autoFocus={true}
            onChange={(e)=>{
                setFiltered(e.target.value)
            }}
            label="Nombre del producto"
            />
            {show && productsList.map((product)=>{
            return(
                <Link
                className="hover:scale-110 transition-transform"
                key={product.productId} 
                href={{pathname:`/dashboard/producrs/${product.productId}`}}>
                    <ProductCard product={product}/>
                </Link>
            );
        })}
        </div>
    );
}