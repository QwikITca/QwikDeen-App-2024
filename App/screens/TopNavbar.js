import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {View,Text,Image, Pressable, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';

const TopNavbar =({navigation}) => {
    const [lan,setLan] = useState(true) // false = bangla , true = eng

     const styles=StyleSheet.create({
        navbar:{
  
            backgroundColor: colors.white,
            width:'100%',
            height:55,
    
            shadowColor: '#000',
            shadowOffset: { width: 1.5, height: 1.5 },
            shadowOpacity:  0.8,
            shadowRadius: 5,
            elevation: 6,
    
    
        },
        navbar1:{
      
            backgroundColor: colors.white,
            width:'60%',
            height:40,
            left:50,
        },

     })
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            
            <>
            <StatusBar
                animated={true}
                backgroundColor="#000066"
                // barStyle={statusBarStyle}
               
            />
            <View style={[styles.navbar1]}>
            
                    
            <View style={{width:'100%',height:30,top:8,flexDirection:'row',justifyContent:'flex-end',paddingRight:20}} >

                        <Pressable style={{ width: 22, height: 22,right:15}} onPress={()=> navigation.navigate("Homepage",{reminder:true})} >
                            <Image
                                style={{ width: 22, height: 22,left:0,top:2}}
                                resizeMode='contain'
                                source={require('../assets/2star.jpg')}
                            />
                        </Pressable>

                        <Pressable style={{ width: 22, height: 22,right:0,display: testCredentials.cartbuy == undefined   ? 'none' :  testCredentials.cartbuy.length > 0  ? 'none' : 'flex'}} onPress={()=> navigation.navigate("Cart",{})} >
                            <Image
                                style={{ width: 22, height: 22,left:0,top:2}}
                                resizeMode='contain'
                                source={require('../assets/home.jpg')}
                            />
                        </Pressable>

                        <Pressable style={{ width: 22, height: 22,right:0,display: testCredentials.cartbuy == undefined ? 'none' : testCredentials.cartbuy.length > 0  ? 'flex' : 'none'}} onPress={()=> navigation.navigate("Cart",{})} >
                            <Image
                                style={{ width: 22, height: 22,left:0}}
                                resizeMode='contain'
                                source={require('../assets/3star.jpg')}
                            />
                        </Pressable>
        
                    </View>

            </View>
            
            </>
          ),
        });
      }, [navigation]);




    return (
        <SafeAreaView style={{width:'100%',height:'100%'}}>
        <View style={[styles.navbar,{flexDirection:'row'}]}>   
         
               <Pressable activeOpacity={4} style={{ width: '5%', height: 25,left:15,top:17,borderWidth:0}} >
                              
                <Image
                                    style={{ width: 17, height: 17,left:0,top:3}}
                                    resizeMode='contain'
                                    source={require('../assets/2star.jpg')}
                                />

               </Pressable>

               <View style={{width:'50%',justifyContent:'flex-start',alignItems:'flex-start',left:10}}>
                              
                   
                   <Text style={{left:10,top:17,color:colors.black,fontSize:14,display : lan ? 'flex' : 'none',letterSpacing:.9,fontFamily: 'Poppins_400Regular'}} >HOME</Text>                 
               
               </View>

              

           </View>

</SafeAreaView>
    );
};

export default TopNavbar;
