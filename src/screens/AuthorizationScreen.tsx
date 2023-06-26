import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { FormControl, Input, Stack, WarningOutlineIcon } from "native-base";
import { FC, useState } from "react";
import { View, Text, StyleSheet} from "react-native";
import { useAppDispatch } from "../../store/hooks";
import {log_in} from "../../store/slices/common/authSlice/authSlice";

const config = require("../../config.json")

export const AuthorizationScreen: FC = () => {
    const navigation = useNavigation<any>()
    const dispatch = useAppDispatch()
    const [login, set_login] = useState("")
    const [password, set_password] = useState("")

    async function submit(){
        let bodyJsonData = {
            "name": login,
            "password": password,
        }
        let res = await axios.post(config.server_domain+"/api/auth/login", bodyJsonData, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            }
        }).then(function (response) {
            return response.data
        })
        .catch(function (error) {
            return error
        });
        
        if (res.success){
            dispatch(log_in(res.data))
        }else{
            alert(res.message)
        }
    }
    
    return (
        <View style={style.container}>
            <Text style={style.title}>Вход</Text>
            <View style={style.form}>
                <FormControl isRequired style={style.field}>
                    <Stack mx="4">
                        <FormControl.Label>Логин</FormControl.Label>
                        <Input type="text" placeholder="Логин" onChange={(e)=>{set_login(e.nativeEvent.text);
                        }}/>
                    </Stack>
                </FormControl>
                <FormControl isRequired isInvalid={false} style={style.field}>
                    <Stack mx="4">
                        <FormControl.Label>Пароль</FormControl.Label>
                        <Input type="text" placeholder="Пароль" onChange={(e)=>{set_password(e.nativeEvent.text);
                        }}/>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Atleast 6 characters are required.
                        </FormControl.ErrorMessage>
                    </Stack>
                </FormControl>
                <Text onPress={()=>navigation.navigate("Registration")} style={style.noAccountLink} >
                    У меня нет аккаунта
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
    field: {
        marginTop: 10
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20
    }
})
