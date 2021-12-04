import React from 'react'
import {ScrollView, StyleSheet,View,Text, Modal} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useEffect,useState } from 'react'
import data from '../data'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'



export default function Question({navigation,route}){

    const allquestion = data;
    // 현재 페이지
    const [CurrentIdx,setCurrentIdx] = useState(0)
    // 점수
    const [score,setscore] = useState(0)

    // 답 선택
    const [OptionSelected,setOptionSelected] = useState(null);

    // 정답인가
    const [correctOption,setcorrectOption] =useState(null);

    // 선택하면 다른거 터치안됨
    const [isOptionDisabled,setisOptionDisabled] =useState(false);

    // 다음 페이지 
    const [NextPage,setNextPage] = useState(false)

    // 마지막 페이지 
    const [ScoreModal,setScoreModal] = useState(false)



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

    const correct = (selectedOption) =>{
        let answer = allquestion[CurrentIdx]['answer'];
       setOptionSelected(selectedOption)
       setcorrectOption(answer)
       setisOptionDisabled(true);
       if(selectedOption==answer){
           setscore(score+1)
       }
       setNextPage(true)
    }

    const handleNext = () => {
        if (CurrentIdx == allquestion.length-1){
            setScoreModal(true)
        }
        else{
            setCurrentIdx(CurrentIdx+1)
            setOptionSelected(null)
            setcorrectOption(null)
            setisOptionDisabled(false)
            setNextPage(false)
        }
    }

    const renderNextPage = () => {
        if(NextPage){
            return(
                <TouchableOpacity style={styles.button} onPress={handleNext}><Text style={styles.buttonText}>다음</Text></TouchableOpacity>
            )
        }
    }

    const restart = () => {
        setScoreModal(false)

        setCurrentIdx(0)
        setscore(0)

        setOptionSelected(null)
        setcorrectOption(null)
        setisOptionDisabled(false)
        setNextPage(false)
        
    }

    return(
        <ScrollView style={styles.container}>
            <StatusBar barstyle="light-content" backgroundColor="#fff"/>
            <View style={{
                flexDirection :"row",
                alignItems :"flex-end",
                padding : 10,
                marginLeft : 20,
                marginBottom :10,
            }}>
                <Text style={{
                    color : "#fff",
                    fontSize : 25,
                }}>{CurrentIdx+1} / </Text>
                <Text style={{
                    color : "#fff",
                    fontSize : 25,
                }}>{allquestion.length}</Text>

                <Text style={styles.right_number}>맞춘 개수 : {score}</Text>
            </View>            

            <View style={styles.question}>
                <Text style={styles.questionText}>{allquestion[CurrentIdx]?.name}</Text>
            </View>
            <View style={styles.question02}>
                {
                    allquestion[CurrentIdx]?.options.map(option=>(
                        <TouchableOpacity 
                        style={{
                            borderWidth :3,
                            borderRadius : 15,
                            borderColor : 
                            option==correctOption ? "#00FF00" :
                            option == OptionSelected ? "#FF0000" 
                            : "#fff",
                            width : 350,
                            height : 50,
                            padding :10,
                            marginTop : 20,
                            flexDirection :"row",
                            justifyContent : "space-between",
                            alignSelf : 'center',
                        }} 
                        onPress={()=>correct(option)}
                        key={option}
                        disabled ={isOptionDisabled}
                    >
                        <Text style={styles.buttonText}>{option}</Text>
                        {
                            option==correctOption ?(
                                <View style={styles.correct_icon}>
                                    <MaterialCommunityIcons name="check" style={styles.check_icon}/>
                                </View>
                            ): option == OptionSelected ? (
                                <View style={styles.wrong_icon}>
                                    <MaterialCommunityIcons name="close" style={styles.check_icon}/>
                                </View>
                            ):null
                        }
                    
                        </TouchableOpacity>
                    ))
                }
               {renderNextPage()}
            </View>
            <Modal
            animationType ="slide"
            transparent = {true}
            visible ={ScoreModal}>
                <View style={styles.modal}> 
                    <View style={styles.modalbox}>
                        <Text style={styles.modaltext}>{score > (allquestion.length/2) ? '다 맞추셨군요!' : '다시 도전하세요!'}</Text>
                    
                        <View style={{
                            flexDirection : "row",
                            justifyContent :"flex-start",
                            alignItems : "center",
                            marginVertical : 20
                        }}>
                            <Text style={{
                                fontSize : 20,
                                color : score > (allquestion.length/2) ? "#00FF00" : "#FF0000"
                            }}>{score}</Text>
                            <Text style={{
                                fontSize : 20,
                                color : "#000"
                            }}>/ {allquestion.length}</Text>
                        </View>
                        <TouchableOpacity 
                        style={{
                            marginVertical :15,
                            borderRadius :15,
                            borderColor : "#0080ff",
                            backgroundColor :"#0080ff",
                            justifyContent :"center",
                            alignItems :"center",
                            width : 100,
                            height : 50,

                        }}
                        onPress={restart}>
                            
                        <Text style={{
                            fontSize : 20,
                            color :"#fff"
                        }}>다시하기
                        </Text></TouchableOpacity>
                    </View>          

                </View>

            </Modal>

        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container :{
        backgroundColor:"#000"
    },
    right_number : {
        color :"#fff",
        fontSize :25,
        marginLeft : 150,
    },
    question :{
        borderWidth :1,
        borderRadius : 15,
        borderColor : "#fff",
        width : 350,
        height : 250,
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
    button : {
        borderWidth :3,
        borderRadius : 15,
        borderColor : "#0080ff",
        backgroundColor : "#0080ff",
        width : 350,
        height : 50,
        padding :10,
        marginTop : 20,
        justifyContent :"center",
        alignSelf :"center"
    },
    buttonText :{
        justifyContent :"center",
        alignSelf:"center",
        color: "#fff",
        fontSize : 15,
        fontWeight :"700"
    },
    correct_icon:{
        width : 30,
        height : 30,
        borderRadius : 15,
        backgroundColor : "#00FF00",
        justifyContent : 'center',
        alignItems : "center"
    },
    check_icon :{
        color: "#fff",
        fontSize : 20
    },
    wrong_icon:{
        width : 30,
        height : 30,
        borderRadius : 15,
        backgroundColor : "#FF0000",
        justifyContent : 'center',
        alignItems : "center"
    },
    check_icon :{
        color: "#fff",
        fontSize : 20
    },
    modal:{
        flex : 1,
        backgroundColor :"#000",
        alignItems :"center",
        justifyContent :"center"
    },
    modalbox :{
        backgroundColor :"#fff",
        width : "90%",
        borderRadius :15,
        padding :20,
        alignItems : "center"
    },
    modaltext : {
        color : "#000",
        fontSize : 30,
        fontWeight :"700"
    }




})
