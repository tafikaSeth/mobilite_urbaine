import { useEffect } from "react";
import { fetchParkingFromApi } from "../api/parking";
import { getAllParking } from "../database/parkingModel";
import { useNetwork } from "./useNetwork";

export const useAsync = () => {
    const isConnected = useNetwork()

    useEffect(()=>{
        const asyncData = async () => {

            if(!isConnected) {
                console.log("Pas de connexion");
                const localData = await getAllParking()
                console.log(localData);   
            }
            console.log("Connexion detecté");
            const res = await fetchParkingFromApi()
            console.log("Data depuis API", res);
        }

        asyncData()

    }, [isConnected])
}