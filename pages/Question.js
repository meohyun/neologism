import React from 'react'
import {ScrollView, StyleSheet,View,Text, Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useEffect,useState } from 'react'


export default function Question({navigation,route}){

    const [quest,setquest] =useState({
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
            title : " "
        })
        setquest(route.params)
    },[])

    const correct = () =>{
        const answer = quest.answer;
        if (quest.question_1 == answer){
            Alert.alert("정답입니다!")
        }
        else if (quest.question_2 == answer){
            Alert.alert("정답입니다!")
        }
        else if (quest.question_3 == answer){
            Alert.alert("정답입니다!")
        }
        else if (quest.question_4 == answer){
            Alert.alert("정답입니다!")
        }
        else{
            Alert.alert("틀렸습니다!")
        }
    }


    return(
        <ScrollView style={styles.container}>
            <View style={styles.question}>
                <Text style={styles.questionText}>{quest.name}</Text>
            </View>
            <View style={styles.question02}>
                <TouchableOpacity style={styles.button} onPress={()=>correct()}><Text style={styles.buttonText}>1. {quest.question_1}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>correct()}><Text style={styles.buttonText}>2. {quest.question_2}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>correct()}><Text style={styles.buttonText}>3. {quest.question_3}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>correct()}><Text style={styles.buttonText}>4. {quest.question_4}</Text></TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container :{
        backgroundColor:"#000"
    },
    question :{
        borderWidth :1,
        borderRadius : 15,
        borderColor : "#fff",
        width : 350,
        height : 450,
        padding :10,
        justifyContent : "center",
        alignSelf : 'center',

    },
    questionText :{
        justifyContent :"center",
        alignSelf:"center",
        color: "#fff",
        fontSize : 35,
        fontWeight :"700"

    },
    question02 :{
        width : 350,
        height : 350,
        padding :10,
        justifyContent : "center",
        alignSelf : 'center',
    },
    button :{
        borderWidth :1,
        borderRadius : 15,
        borderColor : "#fff",
        width : 350,
        height : 50,
        padding :10,
        marginTop : 20,
        justifyContent : "center",
        alignSelf : 'center',
        
    },
    buttonText :{
        justifyContent :"center",
        alignSelf:"center",
        color: "#fff",
        fontSize : 15,
        fontWeight :"700"
    }




})
