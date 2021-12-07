import React from 'react';
import {View,Text, StyleSheet,TouchableOpacity} from 'react-native'

//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function Card({content,navigation}){
    return(
        //카드 자체가 버튼역할로써 누르게되면 상세페이지로 넘어가게끔 TouchableOpacity를 사용
        <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('Studyinfo',content)}}>
            <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{content.desc_title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    
    card:{
      flexDirection:"row",
      margin:10,
      borderBottomWidth:0.5,
      borderBottomColor:"#eee",
      paddingBottom:10
    },
    cardText: {
      flexDirection:"column",
      marginBottom : 10,
      
    },
    cardTitle: {
        color: "#fff",
        fontSize:20,
        fontWeight:"700"
    },
    cardDesc: {
        color:"#fff",
        fontSize:15
    },

});