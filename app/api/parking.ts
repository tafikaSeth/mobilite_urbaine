import { useState } from "react"
import { db } from "../database/database"
import { getAllParking } from "../database/parkingModel"

const API_URL = 'http://192.168.1.45:3004/api/cooperatives'


export const saveParkingToLocal = async (parkings :  any[]) => {
    try {
        const insertQuery = `
            INSERT INTO Cooperatives (id, cooperatives_name, synced) 
            VALUES (?, ?, ?) 
            ON CONFLICT(id) DO UPDATE SET cooperatives_name=excluded.cooperatives_name, synced=1;
        `
    
        for(const parking of parkings) {
            (await db).runAsync(insertQuery, [parking.id, parking.cooperatives_name, 1])
        }
        console.log("Data stocké localement");
        
    } catch (error) {
        console.log("Tena tsy mety le sauve local", error);
        
    }
    
}

export const fetchParkingFromApi = async () => {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        console.log('📡 Données API récupérées :', data);

        if (data && Array.isArray(data.data)) {  // 🔥 Correction ici
          await saveParkingToLocal(data.data); // ✅ On envoie uniquement le tableau de trajets
        } else {
          console.error('❌ API a retourné un format inattendu', data);
        }
    
        return data.data || [];
    } catch (error) {
        console.log("Error lors du recuperation depuis l'API", error);
        return []        
    }
}

