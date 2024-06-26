import React, { useEffect, useState } from 'react';
import * as Speech from 'expo-speech';
// import { Share } from 'react-native';
import {View,Text, ScrollView, Image,Dimensions, StyleSheet, Pressable, Modal} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SahihalBukhari } from '../../hadith_Chapter.js';
import Sunnah_abi_dawd from '../../sunnah_abi_daud.json'
import Sunnah_ibn_mazah from "../../sunah_ibn_majah.json"
import SahihMuslim from '../../sahih_muslim.json';
import SunanNasai from '../../Sunnah_nasai.json';
import jamih_Tirmidhi from '../../Jamih_Trimidhi.json';
import   sahihbukhari from '../../sahih_bukhari.json' ;               
import { Share } from 'react-native';
import { TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../config/colors.js';
const Chapeter_Details =({navigation,route}) => {
    const [shared,setShared]=useState("Hadith")
    const[pagesdata,setPagesdata]=useState([])
    const[pagesdata1,setPagesdata1]=useState([])
    const[bookmarked,setBookmark]=useState(null);
    const { page,name,book } = route.params;
    const pageData={id:1,name:"Book 30 , Hadith 3536",narrate:"Narrated It was narrated that Abu Hurairah said ",text:"Whoever does not thank people, does not thank Allah.",page:page}
    // const hadithChapterAll = SahihalBukhari.filter(
    //     (index) => index.category === name && index.page === page && index.book === book
    //   );
    const[disable,setdisable]=useState(false);
    // console.log("name   page book", name ,  page , book)
    useEffect(() => {
      let mergedData = [];
  
      if (Sunnah_abi_dawd) {
          const filteredData = Sunnah_abi_dawd.filter((index) => index.HadisBookName === name && index.BookName === book);
          mergedData = [...mergedData, ...filteredData];
      }
      
      if (sahihbukhari) {
        const filteredData = sahihbukhari.filter((index) => index.HadisBookName === name && index.BookName === book);
        mergedData = [...mergedData, ...filteredData];
    }
      if (Sunnah_ibn_mazah) {
          const filteredData = Sunnah_ibn_mazah.filter((index) => index.HadisBookName === name && index.BookName === book);
          mergedData = [...mergedData, ...filteredData];
      }
      
      if (SahihMuslim) {
          const filteredData = SahihMuslim.filter((index) => index.HadisBookName === name && index.BookName === book);
          mergedData = [...mergedData, ...filteredData];
      }
      
      if (SunanNasai) {
          const filteredData = SunanNasai.filter((index) => index.HadisBookName === name && index.BookName === book);
          mergedData = [...mergedData, ...filteredData];
      }
      
      if (jamih_Tirmidhi) {
          const filteredData = jamih_Tirmidhi.filter((index) => index.HadisBookName === name && index.BookName === book);
          mergedData = [...mergedData, ...filteredData];
      }
  
      setPagesdata(mergedData);
      setPagesdata1(mergedData);
  }, [name, page, book]);
// console.log("All_Hadith_description",pagesdata);

const BOOKMARK_KEY ='bookmark';

const setData = async (key, value)=>{
   try {
    const jsonData = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonData);
    return true;
   } catch (error) {
    return false;
   }
}

const getData = async (key)=>{
    try {
        const res =await AsyncStorage.getItem(key);
        return JSON.parse(res);
    } catch (error) {
        return null;
    }
}

const bookmark = async(id)=>{
    try {
        // console.log({id});
        // await setData(BOOKMARK_KEY, id);
    //   await  AsyncStorage.clear()

        const exData = await getData(BOOKMARK_KEY);

        let newData = [];

        // console.log(2222,exData);
        if (exData) {
            newData = exData;
        }
        const selectedHadith = pagesdata.find((index) => index.id === id);

    const dataIsExit =newData.find(index=>index.Hadisth_English === selectedHadith.Hadisth_English)
   if(dataIsExit){
    // return console.log("Data already exit");
   }

        
        newData.push(selectedHadith);

        await setData(BOOKMARK_KEY, newData);
        // console.log('Successfully Bookmarked');
    } catch (error) {
        // console.log(error)
    }
}
// Share Hadith
// const SocialShareScreen = () => {
//     onShare();
const onShare = async (data) => {
  try {
    const result = await Share.share({
      message: data,
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
    console.error(error.message); // Log the error message to the console
  }
};


//Modal Section
const [isModalVisible, setModalVisible] = useState(false);

const toggleModal = () => {
  setModalVisible(!isModalVisible);
};

const [modal,setModal]=useState("English")


const [inputValue, setInputValue] = useState('');

// const handleInputChange = (text) => {
//   setInputValue(text);
//   searchData(text);
// };
// const searchData = (name) => {
//     const filteredData = pagesdata.filter((index) =>
//       index.Narrated.toLowerCase().includes(name.toLowerCase())
//     );
//     setPagesdata(filteredData);
//   };
 

  const searchFilter = (text)=>{

    if(text){
        const filteredData = pagesdata1.filter((item) =>{
            const itemData = item.Narrated ?  item.Narrated.toUpperCase() : ''.toUpperCase()

            // const itemData = item.name.toLowerCase().includes(text.toLowerCase())

            const textData = text.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        
        setPagesdata(filteredData)
        
        setInputValue(text)
    }
    else{
        
      setPagesdata(pagesdata1)
      setInputValue(text)
    }

  }
  
//Voice add 
 const [voice,setVoice]=useState(true)
// const speak = (narration,hadith) => {
//   setVoice(!voice);

//   const thingToSay = `${narration} + ${hadith}`;
//   Speech.speak(thingToSay);
// };


// const stopVoice = () => {
//   setVoice(!voice);



//   Speech.stop();
// };





const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);

// ... (rest of your component code)

const speak = (narration, hadith) => {
  setIsVoiceSpeaking(true);
  setVoice(!voice);

  const thingToSay = `${narration} + ${hadith}`;
  Speech.speak(thingToSay);
};

const stopVoice = () => {
    setVoice(!voice);

  setIsVoiceSpeaking(false);
  Speech.stop();
};

useFocusEffect(
  React.useCallback(() => {
    return () => {
      // Clean up when the screen is no longer focused
      if (isVoiceSpeaking || modal === "Arabic" || modal === "Urdu" || modal === "Banglas") {
        stopVoice();
      }
    };
  }, [isVoiceSpeaking])
);























   //CSS Style
    const screenWidth = Dimensions.get('window').width;
    const styles = StyleSheet.create({
        container: {
          flexDirection:"row",
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor:"#F4F1E8" ,
          paddingHorizontal:10,
         top:0,
          height:80,
       marginBottom:5
        },
        image: {
          width: screenWidth - 10,
          height: undefined,
          aspectRatio: 3,
        },
        text: {
          position: 'absolute',
          top: '50%', // Move the text to the vertical center of the image
          left: '50%', // Move the text to the horizontal center of the image
          transform: [{ translateX: -30 }, { translateY: -10 }], // Adjust the translation to center the text
          fontSize: 20,
          fontWeight: 'bold',
        },
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        },
        modalContent: {
          backgroundColor: 'white',
          width: '55%', // Customize the width as needed
           // Customize the height as needed
          borderRadius: 10,
          padding: 20,
          // alignItems: 'center',
          padding:15,
          elevation: 5,
        },
        closeButton: {
          position: 'absolute',
          top: -10,
          right: -10,
          backgroundColor:colors.ash1,
          borderRadius:50,
          height:30,
          width:30,
          alignItems:"center",
          justifyContent:"center"

        },
        hoveredContainer: {
          backgroundColor: 'white',
        },
        translate_text: {
        padding:5,
        },
        textHover:{
          backgroundColor:"#F4F1E8",
          color:"white"
        }
        
      });
      const removeitem=async()=>{
        // console.log(await AsyncStorage.removeItem("StoreData"))
      }
    return (
        <>
        <SafeAreaView  style={{ paddingHorizontal: 5,backgroundColor:"#F4F1E8" }}>
        <View
        style={[
          styles.container

        ]} >


<View style={{width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>

      <View style={{width:'40%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',borderWidth:0}}>
        <Pressable style={{right:10}}  onPress={() => navigation.navigate("Hadith_Chapter", { name: name })}><Text> <Ionicons name="chevron-back-outline" size={28} color="gray" /></Text></Pressable>
        <Text style={{right:10,fontSize:14,color:colors.ash,letterSpacing:.7,fontFamily: 'Poppins_400Regular'}} onPress={() => navigation.navigate("Hadith_Chapter", { name: name })}>{book.length < 10 ? book :  book.split("",10)} {book.length > 10 ? "...": ""} </Text>
      </View>

      <View style={{width:'20%',justifyContent:'space-around',alignItems:'flex-start',flexDirection:'row',borderWidth:0,right:2}}>
        <Pressable onPress={toggleModal}>
          <Ionicons name="language" size={22} color="#7FAFAF" />
        </Pressable>
      
      
        <Pressable onPress={()=>navigation.navigate("Bookmark")}>
          <Ionicons name="star" size={20}  style={{ paddingVertical: 5, color: "#7FAFAF", fontWeight: "bold",marginRight:5 }} />
        </Pressable>
      </View>

      <View style={{width:'40%',justifyContent:'center',alignItems:'flex-start',flexDirection:'row',borderWidth:0}}>

        <TextInput
          style={{width:'100%', borderColor: 'white',fontSize:11, borderWidth: 1, paddingVertical: 8,paddingHorizontal:30 ,borderRadius:15,backgroundColor:"white",letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.text}}
          placeholder="Search here..."
          // value={inputValue}
          // onChangeText={handleInputChange}
          value={inputValue}
          defaultValue={inputValue}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>
    </View>
</View>
    <View style={{width:'90%',justifyContent:'flex-start' , alignItems:'flex-start',paddingBottom:10}}>

      <Text style={{fontWeight:"bold",color:"#7FAFAF",fontSize:14,marginLeft:20,paddingRight:0}}>{book}</Text>

    </View>

    <ScrollView contentContainerStyle={{  backgroundColor: "#F4F1E8",paddingBottom:110  }}>
          {pagesdata.map((index, idx) => (
            <View key={idx} style={{ marginVertical: 10, marginHorizontal: 10, paddingVertical: 10, paddingHorizontal: 10 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center", backgroundColor: "#ECECEC",marginBottom:15 ,paddingHorizontal:10,paddingVertical:15}}>
                <Text style={{  color: "#33915F",lineHeight:18,fontSize: 12,letterSpacing:.7,fontFamily: 'Poppins_400Regular'}}>
                {index.Book_Reference}   
                </Text>
                
              </View>
              <View style={{ backgroundColor: "#ECECEC",paddingHorizontal:10}}>
               
<View style={{paddingVertical: 20,flexDirection:"row",flex:100,justifyContent:"space-between",alignItems:"center"}}>
<Text style={{ fontSize:12,color:"#33915F",flex:60 ,letterSpacing:.7,fontFamily: 'Poppins_400Regular'}}>{index.Narrated ||         "Narrated Al-Bara' bin 'Azib:"
} </Text>
{
       disable? ""   : voice? <Pressable style={{ flexDirection:"row",paddingHorizontal:5,borderRadius:5,flex:15,justifyContent:"space-between",backgroundColor:"#7FAFAF"}}  onPress={()=>{speak(index.Narrated, modal === "English" && index.Hadisth_English
           )}} >
          
                <Text style={{color:"white",fontSize:12,letterSpacing:.7,fontFamily: 'Poppins_400Regular'}}>
                Listen
                </Text>
              <Ionicons name="volume-mute-outline" size={12} color="white" style={{paddingVertical: 5,  fontWeight: "bold",marginRight:5 }} />
              </Pressable>:<Pressable onPress={stopVoice} style={{flexDirection:"row",flex:15,justifyContent:"space-between",backgroundColor:"#7FAFAF",paddingHorizontal:5,borderRadius:5,}} >
                <Text style={{color:"white",fontSize: 12,letterSpacing:.7,fontFamily: 'Poppins_400Regular'}}>
                Listen
                </Text>
              <Ionicons name="volume-medium-outline" size={12} color="white" style={{paddingVertical: 5, fontWeight: "bold",marginRight:5 }} />
          </Pressable>
          }
       </View>

<Text style={{ fontSize: 12,textAlign:"left",lineHeight:25,fontSize: 12,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.text }}>
  {modal === "English"
    ? index.Hadisth_English
    : modal === "Arabic"
    ? index.Hadith_Arabic
    : modal === "Urdu"
    ? index.Hadith_Urdu || index.Hadisth_English
    : modal === "Banglas"
    ? index.Hadith_bangla || index.Hadisth_English
    : index.Hadisth_English ||
      "Allah's Messenger (ﷺ) ordered us to do seven (things): to visit the sick, to follow the funeral processions, to say Tashmit to a sneezer, to help the weak, to help the oppressed ones, to propagate As-Salam (greeting), and to help others to fulfill their oaths (if it is not sinful). He forbade us to drink from silver utensils, to wear gold rings, to ride on silken saddles, to wear silk clothes, Dibaj (thick silk cloth), Qassiy and Istabraq (two kinds of silk)"}
</Text>
{/* reference_part */}
<View style={{marginVertical:5,flexDirection:"row",justifyContent:"space-between",flex:100,alignItems:"flex-end"}}>
<View style={{flexDirection:"column",flex:80,marginTop:15}}>
<Text style={{fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash}}>Reference: <Text style={{fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash}}> {index.Reference}</Text></Text>
<Text style={{fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash}}>Book: <Text style={{fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash}}> {index.BookName}</Text></Text>
<Text style={{fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash}}>Chapter: <Text style={{fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash}}> {index.Chapter_English || "The signs of a hypocrite"}</Text></Text>
</View>
<View style={{flexDirection:"row",flex:20,justifyContent:"flex-end"}}>
<Pressable onPress={()=>bookmark(index.id)}>
      <Ionicons name="star-outline" size={18} color="#7FAFAF" style={{ paddingVertical: 5,fontWeight:"bold" }} />
    </Pressable>
    <Pressable style={{marginLeft:10}} onPress={()=>{onShare(

  // modal === "Bengali" ? index.bengali_meaning :
  modal === "English" ? index.Hadisth_English:
  modal === "Arabic" ? index.Hadith_Arabic :
  modal === "Urdu"?index.Hadith_Urdu || index.Hadisth_English:
  modal === "Banglas"? index.Hadith_bangla || index.Hadisth_English:

  // modal === "Urdu" ? index.urdu_meaning :
  index.Hadisth_English


    )}}>
        <Ionicons name="arrow-redo-sharp" size={18} color="#7FAFAF" style={{ paddingVertical: 5,fontWeight:"bold" }} />
    </Pressable>
</View>
</View>







              </View>
            </View>
          ))}
       
       
       
        </ScrollView>

        
        
        
        
        
        
        
        
        {/* Translate Part */}
        <View >
    <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>

          <View style={styles.modalContent}>
        <Text style={{textAlign:"center",fontSize:12,letterSpacing:.9,fontFamily: 'Poppins_400Regular',color:colors.ash}}>Languages</Text>


        {/* <Pressable  style={styles.translate_text} onPress={()=>{setModal("Bengali")}}>
              <Text>Bengali</Text>
            </Pressable> */}

            <Pressable style={[styles.translate_text,{marginTop:15,marginBottom:10,borderBottomWidth:.3,borderBlockColor:colors.green}]} onPress={() => { setModal("English");setdisable(false)  }}>
              <Text style={{fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.green}}>English</Text>
            </Pressable>

            <Pressable style={[styles.translate_text,{marginTop:10,marginBottom:10,borderBottomWidth:.3,borderBlockColor:colors.dblue}]} onPress={() => { setModal("Arabic"); stopVoice();setdisable(true) }}>
           <Text style={{fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.dblue}}>Arabic</Text>
            </Pressable>

            <Pressable style={[styles.translate_text,{marginTop:10,marginBottom:10,borderBottomWidth:.3,borderBlockColor:colors.orange}]} onPress={() => { setModal("Urdu"); stopVoice();setdisable(true) }}>
            <Text  style={{fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.orange}}>Urdu</Text>
            </Pressable>
            <Pressable style={[styles.translate_text,{marginTop:10,marginBottom:10,borderBottomWidth:.3,borderBlockColor:colors.blue}]} onPress={() => { setModal("Banglas"); stopVoice();setdisable(true) }}>
            <Text  style={{fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.blue}}>Bangla</Text>
            </Pressable>


            {/* modal === "Banglas"? index.Hadith_bangla || index.Hadisth_English: */}


            <View>

            </View>
            <Pressable onPress={toggleModal} style={styles.closeButton}>
              <Ionicons name="close" size={18} color="black" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
        </SafeAreaView>
        </>

    );
};

export default Chapeter_Details;
