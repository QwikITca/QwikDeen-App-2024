import React, { useEffect,useRef, useState ,useContext,useCallback } from 'react';
import {FlatList,ScrollView,ActivityIndicator,Animated, Dimensions ,StyleSheet, Text, View,ImageBackground ,SafeAreaView,Platform ,StatusBar,Image,Button,TextInput, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Hadith_Data from '../../Hadith_Category.json'
import colors from '../config/colors';
import TopNavbar from './TopNavbar';

function Settings({navigation}) {
    const screenWidth = Dimensions.get('window').height;
    const [Hadith,setHadith]=useState([]);
    const [lan,setLan] = useState(true) // false = bangla , true = eng
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=>{

        // console.log("Settings")

    } , []);


   
    return (
        <>

        <SafeAreaView style={{width:'100%',height:'100%'}}>

            
        <View style={[styles.navbar,{flexDirection:'row'}]}>   
          
                <Pressable style={{ width: '5%', height: 25,left:10,top:15}} >
  
                </Pressable>

                <View style={{width:'100%',paddingVertical:10,flexDirection:"row",justifyContent:"space-between",alignItems:"center",left:10,}}>
                    
                    <Text style={{top:17,color:colors.black,fontSize:14,display : lan ? 'none' : 'flex'}} >  বিস্তারিত</Text>                 
                    
                    <Text style={{color:colors.white,fontSize:14,display : lan ? 'flex' : 'none',letterSpacing:.9,fontFamily: 'Poppins_400Regular'}} >Settings</Text>                 
                    
                    <View style={{ width: '60%', height: '100%', top: 0, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 50 }} >

                        <Pressable style={{ marginRight: 20 }} onPress={() => navigation.navigate("Homepage", { reminder: true })} >
                            <Ionicons name="home-sharp" size={20} color="white" />
                        </Pressable>

                        <Pressable style={{ marginRight: 20 }} onPress={() => navigation.navigate("Bookmark", {})} >
                            <Ionicons name="bookmarks-outline" size={20} color="white" />
                        </Pressable>

                       

                    </View>
      
     
                </View>

        </View>

               {/* All Settings Options */}
               <View >

{/* font type */}


<Pressable style={[styles.listStyle]}>
    <Text style={{left:12,fontSize:16,color:"gray"}}> Font Type</Text>
    <Text></Text>
</Pressable>
{/* font size */}
<Pressable style={styles.listStyle}>
    <Text style={{left:12,fontSize:16,color:"gray",color:"gray"}}> Font Size</Text>
    <Text></Text>
</Pressable>
{/* font color */}
<Pressable style={styles.listStyle}>
    <Text style={{left:12,fontSize:16,color:"gray"}}> Font Color</Text>
    <Text></Text>
</Pressable>
{/* background */}
<Pressable style={styles.listStyle}>
    <Text style={{left:12,fontSize:16,color:"gray"}}> Background</Text>
    <Text></Text>
</Pressable>
{/* contact us */}
<Pressable style={styles.listStyle}>
    <Text style={{left:12,fontSize:16,color:"gray"}}> Contact US</Text>
    <Text></Text>
</Pressable>
<Pressable style={styles.listStyle}>
    <Text style={{left:12,fontSize:16,color:"gray"}}> Rate the App</Text>
    <Text></Text>
</Pressable>
<Pressable style={styles.listStyle}>
    <Text style={{left:12,fontSize:16,color:"gray"}}> Share the App</Text>
    <Text></Text>
</Pressable>
<Pressable style={styles.listStyle}>
    <Text style={{left:12,fontSize:16,color:"gray"}}> More Apps by E-deen</Text>
    <Text></Text>
</Pressable>
<Pressable style={styles.listStyle}>
    <Text style={{left:12,fontSize:16,color:"gray"}}> About</Text>
    <Text></Text>
</Pressable>
</View>   
    </SafeAreaView>
    </>
    );
}


const styles = StyleSheet.create({

    listStyle:{
        // left:15,
        flexDirection:"row",
        alignContent:"center",
        paddingHorizontal:10,
        color:"gray",
        marginHorizontal:5,
        borderBottomWidth:1,
        paddingVertical:10,
        borderColor:"gray",
        height:60,
        marginTop:10,
        
        
    },
    MainContainer:{
        backgroundColor: colors.body,
        height:'100%',
        width:'100%'
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
        //  backgroundColor:colors.black,
         justifyContent: "center",
       alignItems:'center',
    },
    footerStyle:{
        height:65,
        borderTopColor:colors.white,
        backgroundColor: colors.white,       
        alignItems:'center',
        justifyContent:'flex-end',

        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity:  5,
        shadowRadius: 5,
        elevation: 6,
       
    },


    tuchabluebuttonf:{
        width:"33.33%",
        height:'100%',
        backgroundColor:colors.white,
        justifyContent: "center",
        alignItems:'center',
    },

    navbar:{
  
        backgroundColor: "rgba(7, 103, 52, 1)",
        width:'100%',
        height:55,

        shadowColor: '#000',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity:  0.8,
        shadowRadius: 5,
        elevation: 6,


    },
   
  navbar1: {
    // backgroundColor: colors.white,
    width: '60%',
    height: 80, // Increase the height to your desired value, e.g., 50
    left: 50,
  },

    ImgContainer:{  

        width:300,
        height:250,
       
    },

    tuchabluebutton:{
        // paddingTop:20,
         width:"55%",
         height:35,
         borderRadius:4,
         justifyContent: "center",
         alignItems:'center',
         top:20
   
     },
    navbarbutton:{
        flexDirection:'row',
        width:'50%',
        justifyContent:'center',
        alignItems:'center',

    },
    textstyle:{
        color:'#FFF',
        fontSize:14,
    },
    textstyle1:{
        color:colors.blacktext,
        fontSize:12,
        //fontFamily:'Nunito',
    },
    body1:{
        flex:1,
        justifyContent: "center",
        alignItems:'center',
        width:'100%',
        height:'100%',
       
     
    },
    searchview:{
        width:'100%',
        height:50,
        top:3,
        justifyContent: "center",
        alignItems:'center',

    },
    
    input:{
        width:"94%",
        height:40,
        borderColor:colors.ash1,
        borderWidth:1,
        backgroundColor:'#FFF',
        alignItems:'center', 
        //padding:5,
        paddingLeft:45,
        borderRadius:3,
        paddingRight:30,
        fontSize:12,

    },
    adds:{
        width:"100%",
        height:145,

        borderColor:colors.ash1,
        borderWidth:1,
        borderRadius:4,
        backgroundColor:colors.white,
        

        shadowColor: '#000',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity:  0.8,
        shadowRadius: 5,
        elevation: 6,
    },
    addsImg:{
        width:'100%',
        borderTopLeftRadius:3,
        borderTopRightRadius:3,
        height:70,
    },
    addstext:{
        width:'100%',
        height:70,

    },
    flatdetails:{
        // paddingLeft:0,
        // width:'100%',
        // marginTop:10

        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:"center",
        paddingLeft:10,
    }

})

export default Settings;
