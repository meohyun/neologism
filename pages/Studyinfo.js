import React, { useEffect, useState } from 'react'
import { View,Text ,StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Studyinfo({navigation,route}){
    
    const[list, setlist]= useState({
        
        "idx" :0,
        "name" : "얼죽아는 어떤말의 줄임말?",
        "answer" : "얼어 죽어도 아메리카노",
        "options" : ["얼어 죽어도 아메리카노","얼굴이 죽은 아이","얼빠진 죽먹는 아이","얼굴이 죽여주는 아이돌"],
        "desc_title" : "얼죽아",
        "desc" : "추운날에도 아메리카노를 아이스로 먹는사람을 일컫는 말"

    })

    useEffect(()=>{
        console.log(route)
        
        navigation.setOptions({
            title:"",
            headerStyle:{
                backgroundColor : "#000",
                shadowColor : "#000",
                borderBottomColor :"#000"
            }
        })

        setlist(route.params)


    },[])
    
    return(
        <SafeAreaView style ={styles.container}>
            <View style={styles.desc}>
                <Text style ={styles.title}>{list.desc_title}</Text>
                <Text style={styles.desc}>{list.desc}</Text>

            </View>

        </SafeAreaView>
    
       
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#000"
    },
    desc : {
        flex : 3,
        justifyContent : "center",
        alignContent : "center"

    },
    title : {
        fontSize : 30,
        fontWeight : "700",
        color: "#fff"
    },
    desc : {
        fontSize : 20,
        fontWeight : "700",
        color: "#fff"
    }

})

