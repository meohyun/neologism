import React, { useEffect,useState } from "react"
import {ScrollView,Text ,StyleSheet, TouchableOpacity} from "react-native"
import data from '../data'


export default function Main({navigation}){

    const [state,setState] = useState([])

    useEffect(()=>{
        navigation.setOptions({
            title:"",
            headerStyle:{
                backgroundColor : "#000",
                shadowColor : "#000",
                borderBottomColor :"#000"
            }
        })

        setTimeout(()=>{

            let neologism_data = data;
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