import React, { useEffect, useState,useContext  } from 'react';
import { Dimensions ,StyleSheet, Text, View,ImageBackground ,SafeAreaView,Platform ,StatusBar,Image,Button,TextInput,Pressable} from 'react-native';

import { WellcomeContext } from '../../components/CredintailsContext';
import {UserContext} from '../../components/CredintailsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../config/colors';

function Secondslide({navigation,route}) {

    //context
    const {storeWellcome,setStoreWellcome} = useContext(WellcomeContext)
    const {testCredentials,setTestCredentials} = useContext(UserContext)

    let screenWidth= Dimensions.get('window').width;
    let screenHight= Dimensions.get('window').height;

    const persistWellcome = (credentials) =>{
        
        AsyncStorage.setItem('qwikmedicwellcome3page', JSON.stringify(credentials))
        .then(()=>{
            // handleMessage(message)
            setStoreWellcome(credentials)
            navigation.navigate("Login")
        })
        .catch((error) => {
            // console.log(error)
            handleMessage('persisting login failed')
        })
    }

    const persistUser = (credentials) =>{
        
        AsyncStorage.setItem('checkuserid', JSON.stringify(credentials))
        .then(()=>{
            // handleMessage(message)
            setTestCredentials(credentials)
            persistWellcome({wellcome: true})
        })
        .catch((error) => {
            // console.log(error)
            handleMessage('persisting login failed')
        })
    }


    const [lan,setLan] = useState(true) // false = bangla , true = eng
    let login ="  house-owner"
    const changelan = (value)=>{
        setLan(value)
    }
    // useEffect(()=>{
    // }, []);

    const skip = () =>{
      
        persistUser({userid:0,notify:false,lan:true,raddress: "",cartbuy:[],productsave:[],cartrent:[],flatsave:[]})

    }


    return (


        <SafeAreaView style={{width:'100%',height:'100%'}}>

               
        <View style={[styles.MainContainer]}>

        <StatusBar
         animated={true}
         backgroundColor="#005A12"
         // barStyle={statusBarStyle}
         
         />
                
                
               <View style={{marginTop:0,alignItems:'center',width:'100%',height:screenHight,justifyContent:'flex-start',top:40}}>
                   
                    <View style={{top:0,justifyContent:'center',alignItems:'center'}}>
                        <View style={{marginTop:60,justifyContent:'center',alignItems:'center',width:'100%'}}>
                            <Text style={{fontSize:25,color:'#00646B',letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>Online Consultation</Text>
                            
                        </View>
                        <View style={{marginTop:16,justifyContent:'center',alignItems:'center',height:42}}>
                            <Text style={{fontWeight:'400',fontSize:14,color:'#5B8B8E',letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>Too busy to visit a Doctor? Try</Text>
                            <Text style={{fontWeight:'400',fontSize:14,color:'#5B8B8E',top:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>consulting one online</Text>
                        </View>

                        
                    </View>
                 


                    
                 

                    <Pressable style={{width:100,height:50,top:50,justifyContent:'center',alignItems:'center',backgroundColor:colors.blue}} onPress={() => navigation.navigate("Thirdslide")}>
                            <Text style={{color:colors.white}}>Next</Text>
                    </Pressable>
                    
                </View>
                </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    MainContainer:{
        flex:1,
        backgroundColor: colors.white,       
        alignItems:'center',
    },

    ImgContainer:{

        width:"100%",
        height:209,
        // top:182
       
    },

    language:{
        flex:1,
        
        backgroundColor:"#3C709E",
        justifyContent: "center",
        alignItems:'center',  
        borderRadius: 5,
        width:75,
        height:30


    },
    tuchabluebutton:{
        width:"35%",
        height:34,
        borderRadius:2,
         backgroundColor:colors.black,
         justifyContent: "center",
       alignItems:'center',
    }

})

export default Secondslide;
