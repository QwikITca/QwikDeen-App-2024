import React, { useEffect, useState,useContext } from 'react';
import {Dimensions , StyleSheet, Text, View,ImageBackground ,SafeAreaView,Platform ,StatusBar,Image,Button,TextInput,Pressable} from 'react-native';

import colors from '../config/colors';


import { WellcomeContext } from '../../components/CredintailsContext';
import {UserContext} from '../../components/CredintailsContext';

import AsyncStorage from '@react-native-async-storage/async-storage';



function Firstslider({navigation,route,props}) {
   
        //context
        const {storeWellcome,setStoreWellcome} = useContext(WellcomeContext)
        const {testCredentials,setTestCredentials} = useContext(UserContext)

        let screenWidth= Dimensions.get('window').width;
        let screenHight= Dimensions.get('window').height;
        


    const [lan,setLan] = useState(true) // false = bangla , true = eng
    let login ="  house-owner"
    const changelan = (value)=>{
        setLan(value)
    }


    const skip = () =>{
        persistUser({userid:0,notify:false,lan:true,raddress: "",cartbuy:[],productsave:[],cartrent:[],flatsave:[]})
    }

   
    return (
        <SafeAreaView style={{width:'100%',height:'100%'}}>

               
               <View style={[styles.MainContainer]}>
               <StatusBar
                animated={true}
                backgroundColor="#00335A"
                // barStyle={statusBarStyle}
                
                />
               <View style={styles.navbar}>                
                    
                    <Text style={{left:55,top:17,color:colors.black,fontSize:16,display : lan ? 'none' : 'flex'}} >  বিস্তারিত</Text>                 
                    <Text style={{left:55,top:17,color:colors.black,fontSize:16,display : lan ? 'flex' : 'none',letterSpacing:.9,fontFamily: 'Poppins_500Medium'}} >  MY ORDERS</Text>                 
                     
    
                </View>
                <View style={{alignItems:'center',width:'100%',height:screenHight,justifyContent:'flex-start',top:40}}>
                    <View style={{width:'100%',top:10,backgroundColor:colors.white,justifyContent:'flex-end',alignItems:'flex-end',right:30}} onPress={() => skip()}>
                            <Text style={{color:'#4A90E2',fontSize:14,display : lan ? 'none' : 'flex'}}>বাসা অনসন্ধান করুন</Text>
                            {/* <Text style={{color:'#4A90E2',fontSize:14,display : lan ? 'flex' : 'none',letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}  onPress={()=> console.log("hello")}>Skip</Text> */}
                    </View>   
                    <View style={{top:0,justifyContent:'center',alignItems:'center'}}>
                        <View style={{marginTop:60,justifyContent:'center',alignItems:'center',width:'100%'}}>
                            <Text style={{fontSize:25,color:'#4A90E2',letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>Order Medicine Online</Text>
                            
                        </View>
                        <View style={{marginTop:16,justifyContent:'center',alignItems:'center',height:42}}>
                            <Text style={{fontWeight:'400',fontSize:14,color:'#4A90E2',letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>Upload your prescription or buy any</Text>
                            <Text style={{fontWeight:'400',fontSize:14,color:'#4A90E2',top:2,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>medicine right from the app</Text>
                        </View>

                       

                    </View>

                  


                    <Pressable style={{width:100,height:50,top:50,justifyContent:'center',alignItems:'center',backgroundColor:colors.blue}} onPress={() => navigation.navigate("Secondslide")}>
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
    },navbar:{
  
        // backgroundColor: colors.white,
        // width:'100%',
        // height:45,

        backgroundColor: colors.white,
        width:'100%',
        height:0,

        shadowColor: '#000',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity:  0.8,
        shadowRadius: 5,
        elevation: 6,

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

export default Firstslider;

