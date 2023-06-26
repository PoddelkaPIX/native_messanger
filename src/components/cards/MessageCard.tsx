import { FC, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { IMessage } from '../../../types';
import { useAppSelector } from '../../../store/hooks';

interface Props{
    message: IMessage
}

export const MessageCard: FC<Props> = ({message}) => {
    const authUser = useAppSelector((state)=>state.auth.user)
    let stylesContainer: any[] = [style.container, style.shadowProp]

    if (authUser?.id == message.user_id){
        stylesContainer.push(style.MyMessage)
    }else{
        stylesContainer.push(style.SomeoneMessage)
    }
    

    return (
        <View style={stylesContainer}>
            <Text style={style.message}>{message.text}</Text>
            <Text style={style.time}>{message.created_at}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        paddingLeft: 20,
        gap: 5,
        maxWidth: "90%",
        borderRadius: 20,
        alignSelf: "flex-start",
        margin: 5,
        borderWidth: 1,
        borderColor: "#cbcbcb"
    },
    message: {
        maxWidth: "89%"
    },
    time: {
        fontSize: 10,
        fontStyle: "italic",
        textAlignVertical: "bottom",
    },
    shadowProp: {
        shadowColor: '#52006A',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 10,
    },
    MyMessage: {
        backgroundColor: "blue",
        alignSelf: "flex-end",
        borderBottomRightRadius: 0,
    },
    SomeoneMessage: {
        backgroundColor: "white",
        borderBottomLeftRadius: 0,
    }
})