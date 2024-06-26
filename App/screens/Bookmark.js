import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, StyleSheet, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Share } from 'react-native';
import { TextInput } from 'react-native';
import * as Speech from 'expo-speech';
import { useFocusEffect } from '@react-navigation/native';
import colors from '../config/colors';
const BookMark =({navigation}) => {
  const [BookItem, setBookItem] = useState([]);
  const [BookItem1, setBookItem1] = useState([]);
    const[disable,setdisable]=useState(false);

    const bookmarkCollection = async () => {
      try {
        const StorageData = await AsyncStorage.getItem('bookmark');
        const StorageDataParse = JSON.parse(StorageData);
        setBookItem(StorageDataParse || []); // Use empty array as default if data is null
        setBookItem1(StorageDataParse || []); // Use empty array as default if data is null
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };
  
    useEffect(() => {
      async function fetchData() {
        try {
          await bookmarkCollection();
        } catch (error) {
          // Handle error here
        }
      }
      fetchData();
    }, []);

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


const back=(()=>{

  const {goBack} = navigation;
  goBack()

})

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
      if (isVoiceSpeaking) {
        stopVoice();
      }
    };
  }, [isVoiceSpeaking])
);
















    // const bookmarkCollection = async () => {
    //     try {
    //         const StorageData = await AsyncStorage.getItem('StoreData');
    //         const StorageDataParse = JSON.parse(StorageData);
    //         console.log("StorageDataParse:", StorageDataParse); // Log the retrieved data
    //         let newArray = StorageDataParse; // You can directly assign since newArray and StorageDataParse are the same
    //         setBookItem(newArray);
    //     } catch (error) {
    //         console.error("Error retrieving data from AsyncStorage:", error);
    //     }
    // };
    // console.log("AllBookmarkCollections",BookItem[0]);
    const deleteFromBookmark = async (id) => {
        try {
          const updatedBookmarks = BookItem.filter((item) => item.id !== id);
          await AsyncStorage.setItem('bookmark', JSON.stringify(updatedBookmarks));
          setBookItem(updatedBookmarks);
          setBookItem1(updatedBookmarks);
          // console.log("DeleteStoreData");
        } catch (error) {
          console.error("Error deleting data from AsyncStorage:", error);
        }
      };
//  Social Share
const onShare = async (data) => {
    try {
      const result = await Share.share({
        message:
data    
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
  //search Data  Processing
const [inputValue, setInputValue] = useState('');

// const handleInputChange = (text) => {
//   setInputValue(text);
//   searchData(text);
// };
// const searchData = (name) => {
//   const filteredData = BookItem.filter((index) =>
//     index.Narrated && index.Narrated.toLowerCase().includes(name.toLowerCase())
//   );
//   setBookItem(filteredData);
// };


const searchFilter = (text)=>{

  if(text){
      const filteredData = BookItem1.filter((item) =>{
          const itemData = item.Narrated ?  item.Narrated.toUpperCase() : ''.toUpperCase()

          // const itemData = item.name.toLowerCase().includes(text.toLowerCase())

          const textData = text.toUpperCase()

          return itemData.indexOf(textData) > -1
      })
      
      setBookItem(filteredData)
      
      setInputValue(text)
  }
  else{
      
    setBookItem(BookItem1)
    setInputValue(text)
  }

}

  //Modal Section
const [isModalVisible, setModalVisible] = useState(false);

const toggleModal = () => {
  setModalVisible(!isModalVisible);
};
const [modal,setModal]=useState("English")

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
          width: screenWidth ,
          height: 120,
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
          backgroundColor:"green",
          color:"white"
        }
        
      });
    return (
        <>
         <SafeAreaView  style={{ paddingHorizontal: 5,backgroundColor:"#F4F1E8" }}>
         <View
        style={[
          styles.container

        ]} >


<View style={{width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>

<View style={{width:'40%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',borderWidth:0}}>
  <Pressable style={{right:10}}  onPress={() => back()}><Text> <Ionicons name="chevron-back-outline" size={28} color="gray" /></Text></Pressable>
  {/* <Text style={{right:10,fontSize:14,color:colors.ash}} onPress={() => navigation.navigate("Homepage")}>{book.length < 15 ? book :  book.split("",15)} {book.length > 15 ? "...": ""} </Text> */}
  <Text style={{right:10,fontSize:14,color:colors.ash,letterSpacing:.7,fontFamily: 'Poppins_400Regular'}} onPress={() => back()}>Fevourite</Text>
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
    style={{width:'100%', borderColor: 'white',fontSize:11, borderWidth: 1, paddingVertical: 8,paddingHorizontal:30 ,borderRadius:15,backgroundColor:"white"}}
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



    

    <ScrollView contentContainerStyle={{  backgroundColor: "#F4F1E8",paddingBottom:100 }}>
          {BookItem.map((index, idx) => (
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
<Pressable onPress={()=>deleteFromBookmark(index.id)}>
      <Ionicons name="star-sharp" size={18} color="#7FAFAF" style={{ paddingVertical: 5,fontWeight:"bold" }} />
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
       
        </SafeAreaView>
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
      </>
    );
};

export default BookMark;
