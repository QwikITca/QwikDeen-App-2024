// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React , { useState,useEffect,useContext } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Share,
  Pressable,
  Switch
} from 'react-native';

import colors from '../config/colors';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';


//asyn-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
//credential context
import { CredentialsContext } from '../../components/CredintailsContext';
import {UserContext} from '../../components/CredintailsContext';



  function CustomSidebarMenu({navigation,props,route}) {



      const onShare = async () => {
        try {
          const result = await Share.share({
            message:
            'https://play.google.com/store/apps/details?id=com.qitca.qwikmedic',
        
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };
 


  //context
  const {storeCredentials,setStoreCredentials} = useContext(CredentialsContext)
  const {testCredentials,setTestCredentials} = useContext(UserContext)



  // const {userid, lan} = storeCredentials


  useEffect(()=>{

     

      
});

  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <DrawerContentScrollView {...props}>


        <View style={{width:'100%',justifyContent:'flex-start',alignItems:'flex-start',marginTop:20}}>
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}}>
                          <Pressable style={{ width: 22, height: 22}}  onPress={()=>navigation.toggleDrawer()} >
                            <Image
                                  style={{ width: 22, height: 22,left:15,bottom:5}}
                                  resizeMode='contain'
                                  source={require('../assets/more.jpg')} 

                              />
                          </Pressable>

                       


                  

          </View>
          <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>

            <Pressable  >
              <Image
                // source={{ uri: "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg" }}
                source={{ uri:"http://drive.google.com/uc?export=view&id=1bkxnx6N90GNdOoBuq0l608AdJLxNM0rm" }}
                style={styles.sideMenuProfileIcon}
              />
            </Pressable>
            <Text style={{color:colors.text,fontFamily: 'Poppins_400Regular',letterSpacing:.9,marginTop:10}}>Name</Text>
          </View>

          <View  style={{width:'100%',marginTop:20,height:60,borderWidth:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center',borderStyle:'dashed',borderLeftWidth:0,borderRightWidth:0,borderColor:colors.ash1}}>
            
             {/* any Touchable action */}

          </View>

          <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:20,borderRadius:6,marginBottom:20}}>
            
         
         


            {/* 7 */}
            <Pressable style={{right:10,width:'85%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',borderBottomColor:colors.ash1,height:55}} onPress={() => onShare()}>
              <View style={{width:50,justifyContent:'flex-end',alignItems:'flex-end'}}>
              

              </View>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
                <Text style={{fontSize:12,color: colors.text,letterSpacing:.9,fontFamily: 'Poppins_400Regular',bottom:3,display:testCredentials.lan ? 'flex' : 'none'}}>Share App</Text>
                <Text style={{fontSize:12,color: colors.text,letterSpacing:.9,fontFamily: 'Poppins_400Regular',bottom:3,display:testCredentials.lan ? 'none' : 'flex'}}>শেয়ার করুন</Text>
              </View>
            </Pressable>


            {/* 8 */}
            {/* <Pressable style={{right:10,width:'85%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',borderBottomColor:colors.ash1,height:55}}  onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.qitca.qwikmedic")}> */}
            <Pressable style={{right:10,width:'85%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',borderBottomColor:colors.ash1,height:55}}  onPress={() => Linking.openURL("market://details?id=com.qitca.qwikmedic")}>
              <View style={{width:50,justifyContent:'flex-end',alignItems:'flex-end'}}>
            

              </View>
              <View style={{justifyContent:'flex-start',alignItems:'flex-start'}}>
                <Text style={{fontSize:12,color: colors.text,letterSpacing:.9,fontFamily: 'Poppins_400Regular',bottom:3,display:testCredentials.lan ? 'flex' : 'none'}}>Rate Us</Text>
                <Text style={{fontSize:12,color: colors.text,letterSpacing:.9,fontFamily: 'Poppins_400Regular',bottom:3,display:testCredentials.lan ? 'none' : 'flex'}}>রেটিং করুন</Text>
              </View>
            </Pressable>





          
          </View>
         
        </View>

      </DrawerContentScrollView>
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;