import { useNavigation, useRoute } from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import { View, TextInput, Text, FlatList, StyleSheet, ImageBackground} from "react-native";
import type { RouteProp } from '@react-navigation/native';
import { ChatHeader } from "../components/headers/ChatHeader";
import { Button, IconButton, Input } from "native-base";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IChat, IMessage } from "../../types";
import {MessageCard} from "../components/cards/MessageCard"
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { useAppSelector } from "../../store/hooks";

type ParamList = { Detail: {chat: IChat };};

export const ChatScreen: FC = () => {
    const route = useRoute<RouteProp<ParamList, 'Detail'>>()
    const navigation = useNavigation()
    const config = require("../../config.json")
    const auth = useAppSelector((state)=>state.auth)

    const [message, set_message] = useState<string>("")
    const [messages, set_messages] = useState<IMessage[]>([])

    async function fatch_get_messages(){
        let res = await axios.get(config.server_domain+"/api/messages/chat/"+route.params.chat.id, {headers: {
            "Authorization": auth.token
        }}).then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log("xxxx", error);
        });
        if (res.success){
            set_messages(res.data)
        }else{
            alert(res.message)
        }
    }

    async function submit_message(){
        let bodyData = {
            'chat': route.params.chat.id,
            'user': auth,
            "message": message
        }
        let res = await axios.post(config.server_domain+"/api/message", bodyData, {headers: {
            "Authorization": auth.token
        }}).then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log("xxxx", error);
        });
        if (res.success){
            set_messages(res.data)
        }else{
            alert(res.message)
        }
    }

    useEffect(()=>{
        fatch_get_messages()
    }, [])
    
    useEffect(()=>{
        navigation.setOptions({headerTitle: () => <ChatHeader chat={route.params.chat}/>});
    }, [])
    
    return (
        <View style={style.container}>
            <ImageBackground source={require('../../assets/background-chat-light.jpg')} resizeMode="cover" style={style.image}></ImageBackground>
            <FlatList
            style={style.chat}
                data={messages}
                renderItem={({item, index}) => <MessageCard message={item}/>}
            />
            <Input style={style.inputMessage} variant="rounded" placeholder="Сообщение" onChange={(e)=>set_message(e.nativeEvent.text)} InputRightElement={<Button onPress={submit_message}>
            <FontAwesomeIcon icon={faArrowRight} size={30} color={"#42aaff"}/>
            </Button>}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
       flex: 1,
       padding: 5,
       gap: 10,
    },
    inputMessage: {
        backgroundColor: "white",
        fontSize: 18,
        paddingLeft: 20,
    },
    chat:{
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    image: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
})