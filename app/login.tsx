import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useFonts } from "expo-font";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";

export default function Login() {
    const router = useRouter()

    const [role, setRole] = useState('Client')
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([
        { label: 'Agent', value: 'Agent' },
        { label: 'Chauffeur', value: 'Chauffeur' },
        { label: 'Client', value: 'Client' },
        { label: 'Propriétaire', value: 'Propriétaire' },
    ])
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [fontsLoaded] = useFonts({
        Viga: require('../assets/fonts/Viga-Regular.ttf'),
    })

    if (!fontsLoaded) {
        return null
    }

    const handleLogin = () => {
        if(role==="Client"){
            router.push('/client')
        }else{
            router.push('/parking')
        }
    }

    return(
        <>
        <Stack.Screen options={{ title: "LOGIN" }} />
        <View style = {styles.container}>
            <View style = {styles.content}>
                <Text style = {styles.title}>Bienvenue!</Text>
                <Text style = {styles.text}>Authentifiez-vous pour continuer</Text>
                <View>
                    <Text style = {styles.label}>Role :</Text>
                        <DropDownPicker
                            open={open}
                            value={role}
                            items={items}
                            setOpen={setOpen}
                            setValue={setRole}
                            setItems={setItems}
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                        />
                    <Text style = {styles.label}>Nom d'utilisateur :</Text>
                        <TextInput
                            style = {styles.input}
                            value={name}
                            onChangeText={setName}
                        />
                    <Text style = {styles.label}>Mot de passe :</Text>
                        <TextInput
                            style = {styles.input}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />
                    <Button
                        title="Se connecter"
                        onPress={handleLogin}
                    />
                </View>
            </View>
        </View>
    </>
    )
}
const styles = StyleSheet.create({
    container : {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    content : {
        width: '90%',
        height: '90%',
        // backgroundColor: 'red'
    },
    title : {
        fontFamily: 'Viga',
        fontSize: 40,
    },
    text : {
        fontFamily: 'Viga',
        fontSize: 14,
        color: 'grey',
        left: 3,
        marginBottom: 50
    },
    label: {
        fontSize: 16,
        fontFamily: 'Viga',
        marginBottom: 8,
    },
    dropdown: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        borderColor: '#ccc',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#c90d0d'
    }
})