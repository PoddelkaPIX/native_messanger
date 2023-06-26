import { FC, useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Pressable, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FormControl, Input, Stack, WarningOutlineIcon } from "native-base";
import axios from "axios";
const config = require("../../config.json")

export const RegistrationScreen: FC = () => {
    const navigation = useNavigation<any>()
    const [login, set_login] = useState("")
    const [password, set_password] = useState("")
    const [copy_password, set_copy_password] = useState("")

    async function submit(){
        let bodyJsonData = {
            "name": login,
            "password": password,
            "copy_password": copy_password
        }
        let res = await axios.post(config.server_domain+"/api/auth/register", bodyJsonData, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            }
        }).then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log("xxxx", error);
        });
        if (res.success){
            navigation.navigate('Authorization')
        }else{
            alert(res.message)
        }
    }

    return (
        <View style={style.container}>
            <Text style={style.title}>Регистрация</Text>
            <View style={style.form}>
                <FormControl isRequired style={style.field}>
                    <Stack mx="4">
                        <FormControl.Label>Логин</FormControl.Label>
                        <Input type="text" placeholder="Логин" onChange={(e)=>{set_login(e.nativeEvent.text);
                        }} />
                    </Stack>
                </FormControl>
                <FormControl isRequired isInvalid={false} style={style.field}>
                    <Stack mx="4">
                        <FormControl.Label>Пароль</FormControl.Label>
                        <Input type="text" placeholder="Пароль" onChange={(e)=>{set_password(e.nativeEvent.text);
                        }}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Должно содержать не менее 6 символов.
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                <FormControl isRequired isInvalid={false} style={style.field}>
                    <Stack mx="4">
                        <FormControl.Label>Повтор пароля</FormControl.Label>
                        <Input type="text" placeholder="Повтор пароля" onChange={(e)=>{set_copy_password(e.nativeEvent.text);
                        }} />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Atleast 6 characters are required.
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                <Text onPress={()=>navigation.navigate("Authorization")} style={style.noAccountLink} >
                    У меня есть аккаунт
                </Text>
            </View>
            <Text style={style.submit} onPress={submit}>Готово</Text>
            
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    form:{
        display: "flex",
        width: "80%",
        marginBottom: 10,
    },
    field: {
        marginTop: 10
    },
    noAccountLink:{
        margin: 10,
        marginLeft: 15,
        height: 20,
        color: "#42aaff"
    },
    submit: {
        padding: 15,
        paddingLeft: 35,
        paddingRight: 35,
        borderRadius: 5,
        backgroundColor: "#42aaff",
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20
    }
})
