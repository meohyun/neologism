import React, { useEffect,useState} from 'react'
import {SafeAreaView,StyleSheet,Text,View} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import data from '../data_sentence'
import {MaterialCommunityIcons} from "@expo/vector-icons"



export default function SentenceGame({navigation}){

    const datas = data;

    // 현재 페이지
    const random = Math.floor(Math.random()* datas.length)
    const [CurrentIdx,setCurrentIdx] = useState(random)
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

    // 설명 란
    const [DescModal,setDescModal] = useState(false)

    // 마지막 페이지 
    const [ScoreModal,setScoreModal] = useState(false)

    // 모달 창 닫기
    const [ModalVisible, setModalVisible] = useState(true); 

    // 랜덤으로 나타내기 
    const [RandomIdx,setRandomIdx] = useState(0)

    useEffect(()=>{
        navigation.setOptions({
            title : "문장 만들기",
            headerStyle:{
                backgroundColor : "#000",
                shadowColor : "#000",
                borderBottomColor :"#000",
                height :100
            }
        })
        

    })

    const correct = (selectedOption) =>{
        let answer = datas[CurrentIdx]['answer'];
       setOptionSelected(selectedOption)
       setcorrectOption(answer)
       setisOptionDisabled(true);
       if(selectedOption==answer){
           setscore(score+1)
       }
       setDescModal(true)
       setModalVisible(true)
       setNextPage(true)

    }

    const handleNext = () => {

        // 문제는 10개까지만 렌더링
        if (RandomIdx == 9){
            setScoreModal(true)
        }
        else{
            const random = Math.floor(Math.random()* datas.length)
           
            setCurrentIdx(random)
            setRandomIdx(RandomIdx+1)
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

    return(
       <SafeAreaView style={styles.container}>
           <View style={{
               flexDirection :"row",
               alignItems :"flex-end",
               padding : 10,
               marginLeft : 20,
           }}>
               <Text style={{
                   color: "#fff",
                   fontSize : 25,
                   fontWeight :"700"
               }}>{RandomIdx+1} / 10</Text>

                <Text style={{
                    marginLeft : 130,
                    fontSize : 25,
                    fontWeight :"700",
                    color : "#fff"
                }}>맞춘 개수 : {score}</Text>
           </View>
           <View style={styles.question}>
               <Text style ={styles.question_text}>{datas[CurrentIdx]?.question}</Text>
           </View>

           {datas[CurrentIdx]?.options.map(option=>(
               <TouchableOpacity
                    style={{
                        borderWidth :3,
                        borderRadius : 15,
                        borderColor : 
                        option==correctOption ? "#00FF00" :
                        option == OptionSelected ? "#FF0000" 
                        : "#fff",
                        width : 400,
                        height : 50,
                        padding :10,
                        marginTop : 20,
                        flexDirection :"row",
                        justifyContent : "space-between",
                        alignSelf : 'center',
                    }} 
                onPress={()=>correct(option)}
                key={option}
                disabled ={isOptionDisabled}>

                    <Text style={styles.option_text}>{option}</Text>
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
               

           ))}
           {renderNextPage()}

       </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor : "#000"
    },
    question : {
        justifyContent : "center",
        alignSelf : "center",
        borderWidth : 1,
        borderColor : "#fff",
        borderRadius : 15,
        width : 400,
        height : 250,
        marginTop : 30,
        marginBottom :20,
        padding :10,
    },
    question_text : {
        justifyContent : "center",
        alignSelf : "center",
        fontSize : 25,
        fontWeight : "700",
        color : "#fff",

    },
    option_text : {
        fontSize : 15,
        color : "#fff",
        fontWeight: "700",
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
    button : {
        borderWidth :3,
        borderRadius : 15,
        borderColor : "#0080ff",
        backgroundColor : "#0080ff",
        width : 350,
        height : 50,
        padding :10,
        marginTop : 20,
        justifyContent :"space-between",
        alignSelf :"center",
        borderWidth :3,
                        
    },
    buttonText :{
        justifyContent :"center",
        alignSelf:"center",
        color: "#fff",
        fontSize : 15,
        fontWeight :"700"
    },

})