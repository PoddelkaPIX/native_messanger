import { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar} from "native-base";
import {Text} from "native-base"
import { useNavigation } from '@react-navigation/native';
import { IChat } from '../../../types';
import { useAppSelector } from '../../../store/hooks';

interface Props{
    chat: IChat
}

export const ChatHeader: FC<Props> = ({chat}) => {
    let navigation = useNavigation<any>()
    const auth = useAppSelector((state)=>state.auth.user)

    return (
        <TouchableOpacity style={style.container} onPress={()=>{navigation.navigate('Chat', {chat: chat})}}>
            <Avatar 
                bg="amber.500" 
                source={{
                    uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                }} 
                size="md">
                <Avatar.Badge bg="green.500" />
            </Avatar>
            <View style={style.chatWrapper}>
                <Text style={style.userName}>{chat.companion.name != auth?.name ? chat.companion.name : chat.person.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
    },
    chatWrapper:{
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        gap: 5,
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold"
    },
})