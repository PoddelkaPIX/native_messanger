import { FC } from "react";
import { View, StyleSheet, Text} from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Avatar, Button} from "native-base";
import * as SecureStore from 'expo-secure-store';
import { log_out } from "../../store/slices/common/authSlice/authSlice";

export const ProfileScreen: FC = () => {
    const auth = useAppSelector((state)=>state.auth.user)
    const dispatch = useAppDispatch()

    function handler_log_out(){
        SecureStore.deleteItemAsync('access_token')
        dispatch(log_out(null))
    }
    return (
        <View style={style.container}>
            <View style={style.accountWrapper}>
                <View style={style.account}>
                    <Avatar 
                        bg="amber.500" 
                        source={{
                            uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                        }} 
                        size="lg">
                            <Avatar.Badge bg="green.500" />
                    </Avatar>
                    <Text style={style.login}>{auth?.name}</Text>
                </View>
                <View style={style.buttons}>
                    <Button variant="outline" colorScheme={"secondary"} onPress={handler_log_out}>Выйти</Button>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    account: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
    },
    accountWrapper: {
        display: "flex",
        width: "80%",
        gap: 40,
    },
    login: {
        fontSize: 26,
        fontWeight: "bold"
    },
    buttons: {
        display: "flex",
        gap: 10
    },
})