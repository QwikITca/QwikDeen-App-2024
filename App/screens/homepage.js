import React, { useEffect,useRef, useState ,useContext,useCallback } from 'react';
import {FlatList,ScrollView,ActivityIndicator,Animated, Dimensions ,StyleSheet, Text, View,ImageBackground ,SafeAreaView,Platform ,StatusBar,Image,Button,TextInput, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Hadith_Data from '../../Hadith_Category.json'
import colors from '../config/colors';
import TopNavbar from './TopNavbar';
import  SahihalBukhari from '../../Hadis_Chapter_Collections/Bukhari.json';
import  SahihMuslim from '../../Hadis_Chapter_Collections/Muslim.json';
import SunanNasai from '../../Hadis_Chapter_Collections/Nasai.json';
import Sahih_Abi_Daud from '../../Hadis_Chapter_Collections/Abi_Dawud.json';
import Jamih_Tirmidhi from '../../Hadis_Chapter_Collections/Tirmidhi.json';
import subh_ibne_majah from '../../Hadis_Chapter_Collections/Majah.json';
import Navbar from './Navbar';
function Homepage({navigation,route}) {
    const screenWidth = Dimensions.get('window').height;
    const [Hadith,setHadith]=useState([]);
    const [lan,setLan] = useState(true) // false = bangla , true = eng
    const [searchResults, setSearchResults] = useState([]);
    const [searchResults1, setSearchResults1] = useState([]);

    useEffect(()=>{

        // console.log("hello")

    } , []);
    useEffect(()=>{
    //    setHadith(Hadith_Data )
    setSearchResults(Hadith_Data);
    setSearchResults1(Hadith_Data);

    },[])
    //search Data  Processing
    const [inputValue, setInputValue] = useState('');

      const searchFilter = (text)=>{

        if(text){
            const filteredData = searchResults1.filter((item) =>{
                const itemData = item.name ?  item.name.toUpperCase() : ''.toUpperCase()

                // const itemData = item.name.toLowerCase().includes(text.toLowerCase())

                const textData = text.toUpperCase()

                return itemData.indexOf(textData) > -1
            })
            
            setSearchResults(filteredData)
            
            setInputValue(text)
        }
        else{
            
            setSearchResults(searchResults1)
            setInputValue(text)
        }

      }


const scrollOffsetY=useRef(new Animated.Value(0)).current;

   
    return (
        <>

        <SafeAreaView style={{width:'100%',height:'100%'}}>





        
            <View style={[styles.MainContainer]}>
                <StatusBar
                animated={true}
                backgroundColor='blue'
                />
              
        <View style={{width:'100%',justifyContent:'center',alignItems:'center'}}>
             {/* TopLogo */}
               <View style={{width:'100%',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>

                    {/* <View style={{width:'60%',justifyContent:'flex-end',alignItems:'flex-end'}}> */}
              
                 
                </View>
                    <Text style={{color:"Black",fontSize:12,textAlign:"center",paddingHorizontal:66,paddingVertical:20,letterSpacing:.5,fontFamily: 'Poppins_400Regular'}}>
                    The Hadith of the Prophet Muhammad (صلى الله عليه و سلم) at your fingertips
                    </Text>
                
                {/* SeachBar */}
            <TextInput
                    style={{ width:'90%',backgroundColor:"white",fontSize:11,borderColor: 'white', borderWidth: 1, paddingVertical: 10,paddingHorizontal:20 ,borderRadius:15,marginBottom:20,letterSpacing:.5,fontFamily: 'Poppins_400Regular',color:colors.text}}
                    placeholder="Search here..."
                    value={inputValue}
                    defaultValue={inputValue}
                    // onChangeText={handleInputChange}
                    onChangeText={(text) => searchFilter(text)}
                />
         </View>       
<ScrollView contentContainerStyle={{marginTop:10,marginHorizontal:20}}>
                {/* one Category of Hadith */}
             
           



               {/* By using api */}

<View style={{width:'100%',justifyContent:'center',alignItems:'center',marginBottom:80}}>
{searchResults.map((index) => (
  <View
    style={{
      backgroundColor: '#FEFAEE',
      width: '100%',
      // alignItems: 'center',
      marginVertical: 10,
      paddingVertical: 0,
      // justifyContent: 'space-between',
      borderRadius: 10,
      paddingHorizontal: 10,
      flexDirection: 'row',
      
    }}
    key={index.id}
  >
    {/* <View style={{width:'100%',borderWidth:1,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row'}}> */}
    
    {/* sahih al - bukhari */}
    
    {

        index.name == "Sahih al-Bukhari" &&   <Pressable style={{width:'100%',height:70,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row'}} onPress={() => navigation.navigate('Hadith_Chapter', {name:index.name, chapter:index.name == "Sahih al-Bukhari"? SahihalBukhari:"No Data",
        HadithName:index.name=="Sahih al-Bukhari" ?"Sahih al-Bukhari":"No Hadith" , arbi:index.name == "Sahih al-Bukhari"?"صحيح البخاري":"No Arabic",Intro:index.name == "Sahih al-Bukhari"? "The Sahih al-Bukhari, often simply referred to as Bukhari, is one of the most respected and widely recognized collections of hadith (sayings, actions, and approvals of Prophet Muhammad) in Sunni Islam. It is named after its compiler, Imam Muhammad ibn Ismail al-Bukhari, who lived in the 9th century CE":"No Introduction"
        })}>
        <View >
            <Text style={{ fontSize: 12, color: colors.text,letterSpacing:.7,fontFamily: 'Poppins_400Regular' }}>{index.name}</Text>
            <Text style={{ fontSize: 14, textAlign: 'left' ,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash}}>{index.language}</Text>
        </View>
        <Text>
          <Ionicons name="chevron-forward-circle" size={30} color="#7FAFAF" />
        </Text>
      </Pressable>
    }
   
  {/* sunnah-ibn-majah */}
    
  {

index.name == "Sunan Ibn Majah" &&   <Pressable style={{width:'100%',height:70,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row'}} onPress={() => navigation.navigate('Hadith_Chapter', {name:index.name, chapter:index.name == "Sunan Ibn Majah"? subh_ibne_majah:"No Data",
HadithName:index.name=="Sunan Ibn Majah" ?"Sunan Ibn Majah":"No Hadith" , arbi:index.name == "Sunan Ibn Majah"?"صحيح البخاري":"No Arabic",Intro:index.name == "Sunan Ibn Majah"? "The Sunan Ibn Majah often simply referred to as Bukhari, is one of the most respected and widely recognized collections of hadith (sayings, actions, and approvals of Prophet Muhammad) in Sunni Islam. It is named after its compiler, Imam Muhammad ibn Ismail al-Bukhari, who lived in the 9th century CE":"No Introduction"
})}>
  <View >
            <Text style={{ fontSize: 12, color: colors.text,letterSpacing:.7,fontFamily: 'Poppins_400Regular' }}>{index.name}</Text>
            <Text style={{ fontSize: 14, textAlign: 'left' ,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash}}>{index.language}</Text>
        </View>
<Text>
  <Ionicons name="chevron-forward-circle" size={30} color="#7FAFAF" />
</Text>
</Pressable>
}
 {/* sahih_muslim    */}
    
 {

index.name == "Sahih Muslim" &&   <Pressable style={{width:'100%',height:70,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row'}} onPress={() => navigation.navigate('Hadith_Chapter', {name:index.name, chapter:index.name == "Sahih Muslim"? SahihMuslim:"No Data",
HadithName:index.name=="Sahih Muslim" ?"Sahih Muslim":"No Hadith" , arbi:index.name == "Sahih Muslim"?"صحيح البخاري":"No Arabic",Intro:index.name == "Sahih Muslim"? "The Sahih Muslim often simply referred to as Bukhari, is one of the most respected and widely recognized collections of hadith (sayings, actions, and approvals of Prophet Muhammad) in Sunni Islam. It is named after its compiler, Imam Muhammad ibn Ismail al-Bukhari, who lived in the 9th century CE":"No Introduction"
})}>
  <View >
            <Text style={{ fontSize: 12, color: colors.text,letterSpacing:.7,fontFamily: 'Poppins_400Regular' }}>{index.name}</Text>
            <Text style={{ fontSize: 14, textAlign: 'left',letterSpacing:.7,fontFamily: 'Poppins_400Regular' ,color:colors.ash}}>{index.language}</Text>
        </View>
<Text>
  <Ionicons name="chevron-forward-circle" size={30} color="#7FAFAF" />
</Text>
</Pressable>
}
{/* sunnah-an-nasai */}

{

index.name == "Sunan an-Nasa'i" &&   <Pressable style={{width:'100%',height:70,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row'}} onPress={() => navigation.navigate('Hadith_Chapter', {name:index.name, chapter:index.name == "Sunan an-Nasa'i"? SunanNasai:"No Data",
HadithName:index.name=="Sunan an-Nasa'i" ?"Sunan an-Nasa'i":"No Hadith" , arbi:index.name == "Sunan an-Nasa'i"?"صحيح البخاري":"No Arabic",Intro:index.name == "Sunan an-Nasa'i"? "The Sunan an-Nasa'i often simply referred to as Bukhari, is one of the most respected and widely recognized collections of hadith (sayings, actions, and approvals of Prophet Muhammad) in Sunni Islam. It is named after its compiler, Imam Muhammad ibn Ismail al-Bukhari, who lived in the 9th century CE":"No Introduction"
})}>
  <View >
            <Text style={{ fontSize: 12, color: colors.text,letterSpacing:.7,fontFamily: 'Poppins_400Regular' }}>{index.name}</Text>
            <Text style={{ fontSize: 14, textAlign: 'left',letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash }}>{index.language}</Text>
        </View>
<Text>
  <Ionicons name="chevron-forward-circle" size={30} color="#7FAFAF" />
</Text>
</Pressable>
}
    
    {/* abi-dawud */}
    
    {

index.name == "Sunan Abi Dawud" &&   <Pressable style={{width:'100%',height:70,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row'}} onPress={() => navigation.navigate('Hadith_Chapter', {name:index.name, chapter:index.name == "Sunan Abi Dawud"? Sahih_Abi_Daud:"No Data",
HadithName:index.name=="Sunan Abi Dawud" ?"Sunan Abi Dawud":"No Hadith" , arbi:index.name == "Sunan Abi Dawud"?"صحيح البخاري":"No Arabic",Intro:index.name == "Sunan Abi Dawud"? "The Sunan Abi Dawud often simply referred to as Bukhari, is one of the most respected and widely recognized collections of hadith (sayings, actions, and approvals of Prophet Muhammad) in Sunni Islam. It is named after its compiler, Imam Muhammad ibn Ismail al-Bukhari, who lived in the 9th century CE":"No Introduction"
})}>
  <View >
            <Text style={{ fontSize: 12, color: colors.text ,letterSpacing:.7,fontFamily: 'Poppins_400Regular'}}>{index.name}</Text>
            <Text style={{ fontSize: 14, textAlign: 'left',letterSpacing:.7,fontFamily: 'Poppins_400Regular' ,color:colors.ash}}>{index.language}</Text>
        </View>
<Text>
  <Ionicons name="chevron-forward-circle" size={30} color="#7FAFAF" />
</Text>
</Pressable>
}
  
    {/* jamih_Tirmidhi */}
    
    {

index.name == "Jami` at-Tirmidhi" &&   <Pressable style={{width:'100%',height:70,alignItems: 'center',justifyContent: 'space-between',flexDirection: 'row'}} onPress={() => navigation.navigate('Hadith_Chapter', {name:index.name, chapter:index.name == "Jami` at-Tirmidhi"? Jamih_Tirmidhi :"No Data",
HadithName:index.name=="Jami` at-Tirmidhi" ?"Jami` at-Tirmidhi":"No Hadith" , arbi:index.name == "Jami` at-Tirmidhi"?"صحيح البخاري":"No Arabic",Intro:index.name == "Jami` at-Tirmidhi"? "The Jami at-Tirmidhi often simply referred to as Bukhari, is one of the most respected and widely recognized collections of hadith (sayings, actions, and approvals of Prophet Muhammad) in Sunni Islam. It is named after its compiler, Imam Muhammad ibn Ismail al-Bukhari, who lived in the 9th century CE":"No Introduction"
})}>
  <View >
            <Text style={{ fontSize: 12, color: colors.text ,letterSpacing:.7,fontFamily: 'Poppins_400Regular'}}>{index.name}</Text>
            <Text style={{ fontSize: 14, textAlign: 'left' ,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash}}>{index.language}</Text>
        </View>
<Text>
  <Ionicons name="chevron-forward-circle" size={30} color="#7FAFAF" />
</Text>
</Pressable>
}
    
   
</View>
  // </View>
))}

                </View>  
           
                </ScrollView>
</View>

<Navbar/>

    </SafeAreaView>
    </>
    );
}


const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "#117E2A",
    height: "100%",
    width: "100%",
    paddingVertical: 10,
  },

  ImgContainer: {
    width: "100%",
    height: 209,
    // top:182
  },

  language: {
    flex: 1,

    backgroundColor: "#3C709E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    width: 75,
    height: 30,
  },
  tuchabluebutton: {
    width: "35%",
    height: 34,
    borderRadius: 2,
    //  backgroundColor:colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  footerStyle: {
    height: 65,
    borderTopColor: colors.white,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "flex-end",

    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 6,
  },

  tuchabluebuttonf: {
    width: "33.33%",
    height: "100%",
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },

  navbar: {
    backgroundColor: "rgba(7, 103, 52, 1)",
    width: "100%",
    height: 55,

    shadowColor: "#000",
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
  },

  navbar1: {
    // backgroundColor: colors.white,
    width: "60%",
    height: 80, // Increase the height to your desired value, e.g., 50
    left: 50,
  },

  ImgContainer: {
    width: 300,
    height: 250,
  },

  tuchabluebutton: {
    // paddingTop:20,
    width: "55%",
    height: 35,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    top: 20,
  },
  navbarbutton: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  textstyle: {
    color: "#FFF",
    fontSize: 14,
  },
  textstyle1: {
    color: colors.blacktext,
    fontSize: 12,
    //fontFamily:'Nunito',
  },
  body1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  searchview: {
    width: "100%",
    height: 50,
    top: 3,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "94%",
    height: 40,
    borderColor: colors.ash1,
    borderWidth: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    //padding:5,
    paddingLeft: 45,
    borderRadius: 3,
    paddingRight: 30,
    fontSize: 12,
  },
  adds: {
    width: "100%",
    height: 145,

    borderColor: colors.ash1,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.white,

    shadowColor: "#000",
    shadowOffset: { width: 1.5, height: 1.5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
  },
  addsImg: {
    width: "100%",
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    height: 70,
  },
  addstext: {
    width: "100%",
    height: 70,
  },
  flatdetails: {
    // paddingLeft:0,
    // width:'100%',
    // marginTop:10

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
  },
});

export default Homepage;
