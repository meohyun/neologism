import React from 'react'
import {Text,StyleSheet,ScrollView,View} from 'react-native'
import { useEffect } from 'react'

export default function Intro({navigation}){

    useEffect(()=>{

        navigation.setOptions({
            title: "Rule",
        })
        

    })
    
       


    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>게임 방법</Text>
            <Text style={styles.desc}>
                    단어 맞추기 :
                    제시된 제시어를 보고 알맞은 뜻을 고르시면 됩니다.
                    4가지의 문항이 주어지며 정답이라고 생각되는 문항을 터치하시면 됩니다.
                    총 10문제로 이루어져 있습니다.

            </Text>

            <Text style={styles.desc}>
                    문장 맞추기 :
                    문장에 비워져 있는 부분에 알맞은 신조어를 찾아보세요.
                    4가지의 문항이 주어지며 정답이라고 생각되는 문항을 터치하시면 됩니다.
                    총 10문제로 이루어져 있습니다.
            </Text>
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    container : {
        backgroundColor : "#000"
    },
    title : {
        fontSize : 30,
        color : "#fff",
        textAlign :"center",
        marginTop : 50,
    },
    desc : {
        marginTop : 50,
        fontSize : 20,
        color : "#fff",
        padding :10,
        marginLeft :10
    }


})