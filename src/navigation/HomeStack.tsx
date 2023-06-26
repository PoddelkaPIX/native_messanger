import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ChatScreen } from "../screens/ChatScreen"
import {Pressable, Text} from 'react-native'
import { ProfileScreen } from '../screens/ProfileScreen';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser"
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { AuthorizationScreen } from '../screens/AuthorizationScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { SearchUserScreen } from '../screens/SearchUserScreen';
import { fetchAuthentication } from '../../store/slices/common/authSlice/authFetch';
const Stack = createNativeStackNavigator();

export function HomeStack(){
    const dispatch = useAppDispatch()
    const navigation = useNavigation<any>()
    const auth = useAppSelector((state)=>state.auth.is_authorized)
    
    if (auth){
      return (
        <Stack.Navigator initialRouteName='Home' screenOptions={
          {
            headerStyle:{
              backgroundColor: "#42aaff",
            },
            headerTitleStyle : {
              color: 'white'
            },
            headerTintColor: 'white'
          }
        } >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={
              {
                title: "Мессенджер",
                
                headerRight: () => <Pressable onPress={()=>{navigation.navigate('Profile')}} style={{padding: 10, paddingLeft: 20}}>
                  <FontAwesomeIcon icon={faUser} color={"white"} size={20} />
                  </Pressable>
              }
            }
          />
          <Stack.Screen name="Chat"
            component={ChatScreen}
          />
          <Stack.Screen name="Profile"
            component={ProfileScreen}
            options={
              {
                title: "Профиль"
              }
            }
          />
          <Stack.Screen name="SearchUser"
            component={SearchUserScreen}
            options={
              {
                title: "Чаты"
              }
            }
          />
        </Stack.Navigator>
        
      )
    }else{
      dispatch(fetchAuthentication())
      return (
        <Stack.Navigator initialRouteName='Authorization' screenOptions={
          {
            headerStyle:{
              backgroundColor: "#42aaff",
            },
            headerTitleStyle : {
              color: 'white'
            },
            headerTintColor: 'white'
          }
        } >
          <Stack.Screen
            name="Authorization"
            component={AuthorizationScreen}
            options={
              {
                headerShown: false
              }
            }
          />
           <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={
              {
                headerShown: false
              }
            }
          />
        </Stack.Navigator>
      )
    }
  }