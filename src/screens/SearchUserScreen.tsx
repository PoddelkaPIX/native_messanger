import { Input } from "native-base";
import { FC,  useState } from "react";
import { View, FlatList, StyleSheet} from "react-native";
import { useDebounce } from "../../store/hooks";
import { userQuery } from "../../store/slices/common/userSlice/userQuery";
import { UserCard } from "../components/cards/UserCard";

export const SearchUserScreen: FC = () => {
    const [text_search, set_text_search] = useState<string>("")
    const {data: user_list} = userQuery.useSearchByNameQuery(useDebounce(text_search, 200), {refetchOnMountOrArgChange: true})
   
    return (
        <View style={style.container}>
            <Input placeholder="Логин пользователя" variant="rounded" onChange={(e)=>{set_text_search(e.nativeEvent.text)}}/>
            <FlatList
            style={style.chat}
                data={user_list?.data}
                renderItem={({item, index}) => <UserCard key={index} user={item}/>}
            />
        </View>
    )
}
const style = StyleSheet.create({
    container: {
       flex: 1,
       padding: 5,
       gap: 5,
    },
    chat:{
        
    }  
})