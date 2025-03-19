import { useState, useEffect } from "react";
import NetInfo from '@react-native-community/netinfo';

export const useNetwork = () => {
    const [isConnected, setIsConnected] = useState<Boolean | null>(null)

    useEffect(()=>{
        const unsubscribe = NetInfo.addEventListener(state =>{
            setIsConnected(state.isConnected)
        })
        return ()=>{
            unsubscribe()
        }
    }, [])
    return isConnected
}