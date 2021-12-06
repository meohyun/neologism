import React from 'react'
import {StyleSheet,View,Text} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function list_card({navigation,content}){
    return(
        <TouchableOpacity style={styles.list} onPress={navigation.navigate('Studyinfo',content)}>
            <View style={styles.card}>
                <Text style={styles.text}>{content.desc_title}</Text>
            </View>

        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    list :{
        flex : 1,
        flexDirection : "row",
        margin : 10,
        color : "#fff",
        borderBottomWidth : 1,
        borderColor : "#FFF",
        paddingBottom:10,
        marginTop : 50,
    },
    card: {
        height : 50,
        width : 100,
    },
    text :{
        color: "#fff",
        fontSize : 20,
        justifyContent : "center",
        alignItems :"center"
    }

})