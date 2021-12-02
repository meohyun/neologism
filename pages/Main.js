import React, { useEffect,useState } from "react"
import {ScrollView,Text ,StyleSheet, TouchableOpacity} from "react-native"
import data from '../data.json'


export default function Main({navigation,route}){

    const [state,setState] = useState({
        "idx" :0,
        "name" : "얼죽아",
        "answer" : "얼어 죽어도 아메리카노",
        "question_1" : "얼어 죽어도 아메리카노",
        "question_2" : "얼굴이 죽은 아이",
        "question_3" : "얼빠진 죽먹는 아이",
        "question_4" : "얼굴이 죽여주는 아이돌",
        "desc" : "추운날에도 아메리카노를 아이스로 먹는사람을 일컫는 말"

    })

    useEffect(()=>{
        navigation.setOptions({
            title:""
        })

        setTimeout(()=>{

            let neologism_data = data.neologism;
            setState(neologism_data)
     
         },1000)
    })

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>신조어 퀴즈</Text>
            <TouchableOpacity style={styles.button01}><Text style={styles.buttonText01} onPress={()=>{navigation.navigate('Question',state)}}>시작하기</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button01}><Text style={styles.buttonText01}>공부하기</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button01} onPress={()=>{navigation.navigate('Intro')}}><Text style={styles.buttonText01}>게임 방법</Text></TouchableOpacity>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor : "#000"
    },
    title:{
        marginLeft : 10,
        marginTop : 150,
        color: "#fff",
        fontSize : 45,
        textAlign : "center"

    },
    button01:{
        justifyContent :"center",
        alignContent : "center",
        alignSelf : "center",
        borderWidth :1,
        borderColor : "#fff",
        marginTop : 80,
        height : 70,
        width : 120,
        borderRadius : 15,
    },
    buttonText01 :{
        color : "#fff",
        textAlign :"center",
        fontSize : 20
    },

})