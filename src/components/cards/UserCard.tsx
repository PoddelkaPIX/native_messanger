import { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Text} from "native-base";
import { useNavigation } from '@react-navigation/native';
import { IChat, IUser } from '../../../types';
import axios from 'axios';
import { useAppSelector } from '../../../store/hooks';
import * as SecureStore from 'expo-secure-store';

const config = require("../../../config.json")

interface Props{
    user: IUser
}

export const UserCard: FC<Props> = ({user}) => {
    let navigation = useNavigation<any>()
    const auth = useAppSelector((state)=>state.auth)

    async function handler(){
        const bodyJsonData = {
            "person_id": auth.user?.id,
            "companion_id": user.id
        }
        let res = await axios.post(config.server_domain+"/api/chats/store", bodyJsonData, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "Authorization": auth.token
            }
        }).then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log("UserCard handler", error);
        });
        if (res.success){
            console.log("res.data", res.data);
            
            navigation.navigate('Home')
        }else{
            alert(res.message)
        }
 
    }
    return (
        <TouchableOpacity style={style.container} onPress={handler}>
            <Avatar 
                bg="amber.500" 
                source={{
                    uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }} 
                size="lg">
                <Avatar.Badge bg={user.status.color} />
            </Avatar>
            <View style={style.chatWrapper}>
                <Text style={style.userName}>{user.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        gap: 10,
    },
    chatWrapper:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        gap: 5,
        paddingBottom: 10,
        borderBottomColor: "#CFCFCF",
        borderStyle: "solid",
        borderBottomWidth: 1,
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold"
    },
    lastMessage: {
        opacity: 0.8,
        height: 30,
    }
})