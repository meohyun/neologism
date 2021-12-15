import React, { useEffect,useState } from "react"
import {Modal,View,Image,Text ,StyleSheet, TouchableOpacity, Platform} from "react-native"
import data from '../data'
import {AdMobBanner} from 'expo-ads-admob'
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"


export default function Main({navigation}){

    const Uri = "https://firebasestorage.googleapis.com/v0/b/neologism-4c173.appspot.com/o/logo.png?alt=media&token=65a1cb5c-ce8e-4809-b220-af584fcae853"
    const [modal,setmodal] = useState(false)

    useEffect(()=>{
        navigation.setOptions({
            title:"",
            headerStyle:{
                backgroundColor : "#000",
                shadowColor : "#000",
                borderBottomColor :"#000"
            }
        })
    })

    const game_type = () => {

        setmodal(true)
    }

    const wordgame = () => {
        setmodal(false)
        navigation.navigate('Question')

    }

    const sentencegame = () => {
        setmodal(false)
        navigation.navigate('SentenceGame')

    }

    const back = () => {
        setmodal(false)
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style ={{
                flex : 11,
            }}>
            <StatusBar barstyle="light-content" backgroundColor="#fff"/>
            <Image style={{
                height : 80,
            }}source={{uri:Uri}}/>
            <Text style={styles.title}>신조어 퀴즈</Text>
            <TouchableOpacity style={styles.button01}><Text style={styles.buttonText01} onPress={game_type}>시작하기</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button01} onPress={()=>{navigation.navigate('Study')}}><Text style={styles.buttonText01}>신조어 사전</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button01} onPress={()=>{navigation.navigate('Intro')}}><Text style={styles.buttonText01}>게임 방법</Text></TouchableOpacity>
            </View>
            

            {/* 광고 붙이기 */}
            {Platform.OS == 'ios' ? (
                <AdMobBanner
                bannerSize ="fullBanner"
                servePersonalizedAds ={true}
                adUnitID ="ca-app-pub-8186113865555128/2598378688"
                style={styles.banner}/>

                
               
            ):
                <AdMobBanner
                bannerSize ="fullBanner"
                servePersonalizedAds ={true}
                adUnitID ="ca-app-pub-8186113865555128/3384862651"
                style={styles.banner}
                />
            } 
            <Modal
            animationType="slide"
            transparent={true}
            visible = {modal}>
                <View style={{
                    justifyContent : "center",
                    alignItems :"center",
                    padding : 10,
                    flex : 1,
                }}>
                    <View style={styles.modalbox}>
                    <TouchableOpacity
                        style={{
                            marginRight : 330,
                            marginBottom : 25
                        }}
                        onPress={back}>
                        <Image style={{
                            height :25,
                            width : 25,
                            marginBottom :20,
                        }}source={{uri:"https://firebasestorage.googleapis.com/v0/b/neologism-4c173.appspot.com/o/arrow.png?alt=media&token=c4786244-ba05-4a9f-a453-c0d7dbb47302"}}/>          
                    </TouchableOpacity>
                    
                    <View style={{
                            marginBottom : 80,
                        }}>
                            <Text style={styles.modaltitle}>게임 종류를 선택하세요!</Text>
                    </View>
                        <View style={{
                            flexDirection : "row"
                        }}> 
                            <TouchableOpacity style={styles.modalbutton} onPress={wordgame}><Text style={styles.modaltext}>단어 맞추기</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.modalbutton} onPress={sentencegame}><Text style= {styles.modaltext}>문장 만들기</Text></TouchableOpacity>
                        </View>
                        
                    </View>
                </View>                
            </Modal>
        
        </SafeAreaView>
        
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        flexBasis: 420,
        flexShrink : 1,
        backgroundColor : "#000"
    },
    title:{
        marginLeft : 10,
        marginTop : 80,
        color: "#fff",
        fontSize : 45,
        textAlign : "center"

    },
    button01:{
        justifyContent :"center",
        alignContent : "center",
        alignSelf : "center",
        backgroundColor : "#017CFF",
        borderWidth :1,
        borderColor : "#fff",
        marginTop : 60,
        height : 70,
        width : 120,
        borderRadius : 15,
    },
    buttonText01 :{
        color : "#fff",
        textAlign :"center",
        fontSize : 20
    },
    banner : {
        flex : 1,
        backgroundColor : "#fff",
        height : 80,
        width : "100%",
        borderWidth : 1,
        borderColor : "#fff",
        marginTop : 70
    },
    modalbox : {
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#fff",
        borderColor : "#017CFF",
        borderWidth : 5,
        borderRadius : 20,
        height : 350,
        width : 400,

    },
    modalbutton : {
        backgroundColor : "#017CFF",
        borderRadius : 15,
        borderColor : "#fff",
        height : 80,
        width : 140,
        marginLeft : 15,
        justifyContent: "center"

    },
    modaltext : {
        color : "#fff",
        textAlign : "center",
        fontWeight : "700",
        fontSize : 20
    },
    modaltitle : {
        fontSize : 25,
        color : "#000",
        fontWeight : "700"
    }

})