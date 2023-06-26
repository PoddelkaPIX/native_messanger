import { FC, useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Text, Pressable} from "react-native";
import { ChatCard } from "../components/cards/ChatCard";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle'
import { useAppSelector } from "../../store/hooks";
import * as SecureStore from 'expo-secure-store';
import { IChat, IUser } from "../../types";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
interface props{
    
}

const config = require("../../config.json")

export const HomeScreen: FC<props> = ({}) => {
    const auth = useAppSelector((state)=>state.auth)
    const user = useAppSelector((state)=>state.auth.user)
    const [chats, set_chats] = useState<IChat[]>([])
    let navigation = useNavigation<any>()

    async function fatch_chats(){
        let res = await axios.get(config.server_domain+"/api/chats/user/"+user?.id, {headers: {
            "Authorization": auth.token
        }}).then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.log("HomeScreen fatch_chats", error);
        });
        if (res.success){
            set_chats(res.data)
        }else{
            alert(res.message)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fatch_chats()
        });
    
        return unsubscribe;
      }, [navigation]);


    return (
        <View style={style.container}>
            <View style={style.addNewChat}>
                <Pressable onPress={()=>navigation.navigate("SearchUser")} >
                    <FontAwesomeIcon icon={faPlusCircle} size={60} color={"#42aaff"}/>
                </Pressable>
            </View>
            <FlatList
                data={chats}
                renderItem={({item, index}) => <ChatCard key={index} chat={item}/>}
            />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "",
    },
    addNewChat:{
        position: "absolute",
        bottom: 20,
        right: 20,
        zIndex: 2,
        backgroundColor: "white",
        borderRadius: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
    },
    chatList:{
        height: "100%"
    }  
})