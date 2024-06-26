import React, { useState, useEffect,useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Animated,
  Pressable,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { SahihalBukhari, SahihMuslim,SunanNasai,Sahih_Abi_Daud,Jamih_Tirmidhi,subh_ibne_majah  } from '../../hadith_book_data';
import TopNavbar from './TopNavbar';
import colors from '../config/colors';
import  SahihalBukhari from '../../Hadis_Chapter_Collections/Bukhari.json';
import  SahihMuslim from '../../Hadis_Chapter_Collections/Muslim.json';
import SunanNasai from '../../Hadis_Chapter_Collections/Nasai.json';
import Sahih_Abi_Daud from '../../Hadis_Chapter_Collections/Abi_Dawud.json';
import Jamih_Tirmidhi from '../../Hadis_Chapter_Collections/Tirmidhi.json';
import subh_ibne_majah from '../../Hadis_Chapter_Collections/Majah.json';
const Hadith_Chapter = ({ navigation, route }) => {
  const [lan,setLan] = useState(true) // false = bangla , true = eng

  const [chapter, setChapter] = useState(route.params.chapter);
  const [chapter1, setChapter1] = useState(route.params.chapter);
  const [load,setLoad]=useState(true);
  const[HadithName,setHadithName]=useState(route.params.HadithName);
  const[arbi,setArbi]=useState(route.params.arbi);
  const[Intro,setIntro]=useState(route.params.Intro);
 const {name}=route.params
//  console.log("name data", name)
  // useEffect(() => {

  //   if (route.params.name == "Sahih al-Bukhari") {
  //     setChapter(SahihalBukhari);
  //     console.log("Hadith_Data");
  // setHadithName("Sahih al-Bukhari");
  // setArbi("صحيح البخاري");
  // setIntro("The Sahih al-Bukhari, often simply referred to as Bukhari, is one of the most respected and widely recognized collections of hadith (sayings, actions, and approvals of Prophet Muhammad) in Sunni Islam. It is named after its compiler, Imam Muhammad ibn Ismail al-Bukhari, who lived in the 9th century CE")
    
  //   }
  //   if(route.params.name == "Sahih Muslim"){
  //     setChapter(SahihMuslim);
  //     console.log("SahihMuslim");
  //     setHadithName("Sahih Muslim");
  //     setArbi("صحيح مسلم");
  //     setIntro("Sahih Muslim, like Sahih al-Bukhari, is one of the most respected and widely accepted collections of hadith in Sunni Islam. It is named after its compiler, Imam Muslim ibn al-Hajjaj al-Naysaburi, who lived in the 9th century CE. ")
  //   }
  //   if(route.params.name == "Sunan an-Nasa'i"){
  //     setChapter(SunanNasai);
  //     console.log("Sunan an-Nasa'i");
  //     setHadithName("Sunan an-Nasa'i");
  //     setArbi("سنن النسائي");
  //     setIntro("Sunan an-Nasa'i is one of the six major collections of hadith in Sunni Islam. It is named after its compiler, Imam Ahmad ibn Shu'ayb an-Nasa'i, who lived in the 9th century CE.  ")
  //   }
  //   if(route.params.name == "Sunan Abi Dawud"){
  //     setChapter(Sahih_Abi_Daud);
  //     console.log("Sunan Abi Dawud");
  //     setHadithName("Sunan Abi Dawud");
  //     setArbi("سنن أبي داود");
  //     setIntro("Sunan Abi Dawud is one of the six major collections of hadith in Sunni Islam. It is named after its compiler, Imam Abu Dawood Sulaiman ibn Ash'ath al-Azdi as-Sijistani, who lived in the 9th century CE. ")
  //   }
  //   if(route.params.name == "Jami` at-Tirmidhi"){
  //     setChapter(Jamih_Tirmidhi);
  //     console.log("Jamih_Tirmidhi");
  //     setHadithName("Jamih_Tirmidhi");
  //     setArbi("جامع الترمذي");
  //     setIntro("Jami' at-Tirmidhi is one of the six major collections of hadith in Sunni Islam. It is named after its compiler, Imam Muhammad ibn 'Isa at-Tirmidhi, who lived in the 9th century CE. ")
    
  //   }
  //  if(route.params.name == "Sunan Ibn Majah"){
  //     setChapter(subh_ibne_majah );
  //     console.log("subh_ibne_majah ");
  //     setHadithName("subh_ibne_majah");
  //     setArbi("سُنَن ابن ماجه");
  //     setIntro("Sunan Ibn Majah is one of the six major collections of hadith in Sunni Islam. It is named after its compiler, Imam Muhammad ibn Yazid ibn Majah al-Qazwini, who lived in the 9th century CE.  ")
  //   }


  // },[]);

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
        height: undefined,
        aspectRatio: 3,
      },
      text: {
        position: 'absolute',
        top: '50%', // Move the text to the vertical center of the image
        left: '50%', // Move the text to the horizontal center of the image
        transform: [{ translateX: -50 }, { translateY: -10 }], // Adjust the translation to center the text
        fontSize: 14,
        fontWeight: 'bold',
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
    });

    const Header_Max_Height = 110;
    const Header_Min_Height = 100;
    const scrollOffsetY = useRef(new Animated.Value(0)).current;
    const Scroll_Distance = Header_Max_Height - Header_Min_Height;
    const animatedHeaderHeight = scrollOffsetY.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: [Header_Max_Height, Header_Min_Height],
      extrapolate: 'clamp',
    });
    const animateHeaderBackgroundColor = scrollOffsetY.interpolate({
      inputRange: [0, Scroll_Distance],
      outputRange: ['#F4F1E8','#F4F1E8'],
      extrapolate: 'clamp',
    });
    // let scrollOffsetY = useRef(new Animated.Value(0)).current;  

 //search Data  Processing
 const [inputValue, setInputValue] = useState('');


 const back=(()=>{

  const {goBack} = navigation;
  goBack()

})

//  const handleInputChange = (text) => {
//    setInputValue(text);
//    searchData(text);
//  };
//  console.log(inputValue);
//  const searchData = (name) => {
//      const filteredData = chapter.filter((index) =>
//        index.bookname_english.toLowerCase().includes(name.toLowerCase())
//      );
//      setChapter(filteredData);
//    };



   const searchFilter = (text)=>{

    if(text){
        const filteredData = chapter1.filter((item) =>{
            const itemData = item.bookname_english ?  item.bookname_english.toUpperCase() : ''.toUpperCase()

            // const itemData = item.name.toLowerCase().includes(text.toLowerCase())

            const textData = text.toUpperCase()

            return itemData.indexOf(textData) > -1
        })
        
        setChapter(filteredData)
        
        setInputValue(text)
    }
    else{
        
      setChapter(chapter1)
        setInputValue(text)
    }

  }

  
  return (
<>





    
    <SafeAreaView   style={{ paddingHorizontal: 5,backgroundColor:"#F4F1E8"}}>
    <View
        style={[
          styles.container

        ]} >


<View style={{width:'100%',justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginTop:18}}>

<View style={{width:'40%',justifyContent:'flex-start',alignItems:'center',flexDirection:'row',borderWidth:0}}>
  <Pressable style={{right:10}}  onPress={() => back()}><Text> <Ionicons name="chevron-back-outline" size={28} color="gray" /></Text></Pressable>
  {/* <Text style={{right:10,fontSize:14,color:colors.ash}} onPress={() => navigation.navigate("Homepage")}>{book.length < 15 ? book :  book.split("",15)} {book.length > 15 ? "...": ""} </Text> */}
  <Text style={{right:10,fontSize:12,color:colors.ash,letterSpacing:.7,fontFamily: 'Poppins_400Regular'}} onPress={() => back()}>{HadithName}</Text>
</View>

<View style={{width:'15%',justifyContent:'space-around',alignItems:'flex-start',flexDirection:'row',borderWidth:0,right:2}}>

  <Pressable onPress={()=>navigation.navigate("Bookmark")}>
    <Ionicons name="star" size={20}  style={{ paddingVertical: 5, color: "#7FAFAF", fontWeight: "bold",marginRight:5 }} />
  </Pressable>
</View>

<View style={{width:'45%',justifyContent:'center',alignItems:'flex-start',flexDirection:'row',borderWidth:0}}>

  <TextInput
    style={{width:'100%', borderColor: 'white',fontSize:11, borderWidth: 1, paddingVertical: 8,paddingHorizontal:30 ,borderRadius:15,backgroundColor:"white",letterSpacing:.5,fontFamily: 'Poppins_400Regular',color:colors.text}}
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

    <View style={{marginHorizontal:2,marginVertical:10,paddingHorizontal:8,paddingVertical:10,backgroundColor:"rgba(236, 236, 236, 1)",borderRadius:10}}>
    <Text style={{ flexDirection: "row", justifyContent: "space-between" ,paddingBottom:8,color:"rgba(51, 145, 95, 1)"}}>
  <Text style={{fontSize:12,letterSpacing:.7,fontFamily: 'Poppins_400Regular'}}>{HadithName}</Text>
  <Text style={{ marginLeft: 10,color:"rgba(51, 145, 95, 1)",fontSize:12 }}>                                            {arbi}</Text>
</Text>

        <Text style={{textAlign:"justify",fontSize:11,letterSpacing:.5,fontFamily: 'Poppins_400Regular',lineHeight:18,color:colors.text}}>{Intro}</Text>

      </View>
   
    <ScrollView 
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
        
        style={{marginBottom:20}}>
      {chapter.map((index,index2) => (
        <View key={index.serial_no}>
      
    <View style={{width:'100%',justifyContent:"center",alignItems:'center'}}>
        <Pressable style={{width:'95%',borderRadius:10,borderWidth:0,flexDirection:"row",justifyContent:"space-between",alignItems:"center",backgroundColor:"rgba(236, 236, 236, 1)", marginBottom: 10 ,paddingVertical:20,marginTop:0}}  onPress={()=>{navigation.navigate("Chapter_Details",{ page:index.hadith_serial_start,name:name ,book:index.bookname_english})}}>
        {/* <View  style={{flex:80,flexDirection:"row",justifyContent:"space-evenly",alignItems:"center"}}> */}
<Text style={{color:colors.text,flex:10,marginLeft:8,fontSize:11,letterSpacing:.9,fontFamily: 'Poppins_400Regular'}}>{index2+1}.</Text>
<Text style={{color:colors.text,flex:30,flexDirection:"row",justifyContent:"flex-end",fontSize:11,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.text}}>{index.bookname_english}</Text>
        {/* </View> */}
        <Text style={{fontSize:14,color:"black",flex:30,letterSpacing:.7,fontFamily: 'Poppins_400Regular',color:colors.ash}}>{index. bookname_arabic}</Text>

        <View style={{flexDirection:"row",flex:30,justifyContent:"center",left:10}}>
          <Text style={{color:colors.ash,fontSize:10}}> {index.hadith_serial_start}</Text><Text style={{color:colors.ash,marginHorizontal:5,fontSize:12}}> - </Text>
          <Text style={{color:colors.ash,fontSize:10}}> {index.hadith_serial_end}</Text>

         </View>

        </Pressable>
     




    </View>
         
        </View>
      ))}

</ScrollView>


    </SafeAreaView></>
  );
};

export default Hadith_Chapter;


