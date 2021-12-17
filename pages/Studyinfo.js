import React, { useEffect, useState } from 'react'
import { View,Text ,StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import data from '../data'
import { AdMobBanner } from 'expo-ads-admob'

export default function Studyinfo({navigation,route}){

    const [list,setlist] = useState({
            "idx" :0,
            "name" : "얼죽아는 어떤말의 줄임말?",
            "answer" : "얼어 죽어도 아메리카노",
            "options" : ["얼어 죽어도 아메리카노","얼굴이 죽은 아이","얼빠진 죽먹는 아이","얼굴이 죽여주는 아이돌"],
            "desc_title" : "얼죽아",
            "desc" : "추운날에도 아메리카노를 아이스로 먹는사람을 일컫는 말",
            "example" : "난 추운날씨에도 아이스를 먹는 얼죽아야."

        })

    useEffect(()=>{
    
        navigation.setOptions({
            title:"신조어 설명",
            headerStyle:{
                backgroundColor : "#000",
                shadowColor : "#000",
                borderBottomColor :"#000",
                height : 100
            }
        })

        setlist(route.params)

    },[])
    
    return(
        <SafeAreaView style ={styles.container}>
            <View style={styles.desc_container}>
                <Text style ={styles.title}>{list.desc_title}</Text>

                <View style={styles.desc_textbox}>
                    <Text style={styles.example_title}>뜻</Text>
                    <Text style={styles.desc}>{list.desc}</Text>
                </View>


                <View style={styles.example}>
                    <Text style={styles.example_title}>예시</Text>
                    <Text style={styles.example_text}>{list.example}</Text>
                </View>
                
            </View>

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
                adUnitID ="ca-app-pub-8186113865555128/4354802154"
                style={styles.banner}
                />
                } 

        </SafeAreaView>
    
       
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexBasis: 420,
        flexShrink : 1,
        backgroundColor : "#000"
    },
    title : {
        justifyContent :"center",
        alignSelf :"center",
        fontSize : 30,
        fontWeight : "700",
        color: "#fff",
        marginBottom : 20,
    },
    desc_container :{
        flex : 3,
        marginLeft :10,
    },
    desc_textbox :{
        justifyContent : "center",
        alignSelf:"center",
        width : "95%",
        height : 300,
        marginTop : 30,
        borderWidth : 1,
        borderColor : "#FFF",
        borderRadius : 10,

    },
    desc : {
        padding : 15,
        fontSize : 20,
        fontWeight : "700",
        color: "#fff",
        textAlign : "center"
    },
    example : {
        marginTop : 20,
        justifyContent : "center",
        alignSelf:"center",
        width : "95%",
        height : 200,
        marginTop : 30,
        borderWidth : 1,
        borderColor : "#FFF",
        borderRadius : 10,

    },

    example_title :{
        marginLeft : 20,
        fontSize : 25,
        fontWeight : "700",
        color: "#fff",
        marginBottom : 30

    },

    example_text :{
        fontSize : 20,
        fontWeight : "700",
        color: "#fff",
        textAlign : "center"
        
    },
    banner : {
        flex : 1,
        backgroundColor : "#fff",
        height : 80,
        borderWidth : 1,
        borderColor : "#fff",
        marginTop : 400
    }

})

