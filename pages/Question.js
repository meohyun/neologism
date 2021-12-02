import React from 'react'
import {ScrollView, StyleSheet,View,Text, Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useEffect,useState } from 'react'
import data from '../data'


export default function Question({navigation,route}){

    const allquestion = data;
    const [CurrentIdx,setCurrentIdx] = useState(0)


    useEffect(()=>{

        // console.log(allquestion[CurrentIdx]?.answer)
        navigation.setOptions({
            title : " ",
            headerStyle :{
                backgroundColor : "#000",
                shadowColor : "#000",
                borderBottomColor :"#000",
                height :100
                
            }
        })
    },[])

    const correct = () =>{
        const answer = allquestion[CurrentIdx]?.answer;
        if (allquestion[CurrentIdx]?.question_1 == answer){
            Alert.alert("정답입니다!")
        }
        else if (allquestion[CurrentIdx]?.question_2 == answer){
            Alert.alert("정답입니다!")
        }
        else if (allquestion[CurrentIdx]?.question_3== answer){
            Alert.alert("정답입니다!")
        }
        else if (allquestion[CurrentIdx]?.question_4 == answer){
            Alert.alert("정답입니다!")
        }
        else{
            Alert.alert("틀렸습니다!")
        }
    }


    return(
        <ScrollView style={styles.container}>
            <View style={{
                flexDirection :"row",
                alignItems :"flex-end",
                padding : 10,
                marginLeft : 20,
            }}>
                <Text style={{
                    color : "#fff",
                    fontSize : 25,
                }}>{CurrentIdx+1} / </Text>
                <Text style={{
                    color : "#fff",
                    fontSize : 25,
                }}>{allquestion.length}</Text>
            </View>            

            <View style={styles.question}>
                <Text style={styles.questionText}>{allquestion[CurrentIdx]?.name}</Text>
            </View>
            <View style={styles.question02}>
                <TouchableOpacity style={styles.button} onPress={()=>correct()}><Text style={styles.buttonText}>1. {allquestion[CurrentIdx]?.question_1}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>correct()}><Text style={styles.buttonText}>2. {allquestion[CurrentIdx]?.question_2}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>correct()}><Text style={styles.buttonText}>3. {allquestion[CurrentIdx]?.question_3}</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>correct()}><Text style={styles.buttonText}>4. {allquestion[CurrentIdx]?.question_4}</Text></TouchableOpacity>
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
        height : 350,
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
