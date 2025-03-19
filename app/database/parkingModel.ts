import { db } from "./database";

export const getAllParking = async () => {
    const res = (await db).getAllAsync('SELECT * FROM Cooperatives;')
    console.log("nety eh", res);
    
}