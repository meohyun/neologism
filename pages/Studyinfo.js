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
                <Text style={styles.desc}>{list.desc}</Text>

                <View style={styles.example}>
                    <Text style={styles.example_text }> 예시 :{list.example}</Text>
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
                adUnitID ="ca-app-pub-8186113865555128/3384862651"
                style={styles.banner}
                />
                } 

        </SafeAreaView>
    
       
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
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
        marginLeft :10,
    },
    desc : {
        fontSize : 20,
        fontWeight : "700",
        color: "#fff"
    },
    example : {
        marginTop : 20,   
    },
    example_text :{
        fontSize : 20,
        fontWeight : "700",
        color: "#fff"
        
    },
    banner : {
        backgroundColor : "#fff",
        height : 80,
        width : "100%",
        borderWidth : 1,
        borderColor : "#fff",
        marginTop : 400
    }

})

