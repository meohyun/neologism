import React from 'react'
import {ScrollView, StyleSheet,View,Text, Modal,RefreshControl} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { useEffect,useState } from 'react'
import data from '../data'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import { AdMobBanner } from 'expo-ads-admob'


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

    // 설명 란
    const [DescModal,setDescModal] = useState(false)

    // 마지막 페이지 
    const [ScoreModal,setScoreModal] = useState(false)

    // 모달 창 닫기
    const [ModalVisible, setModalVisible] = useState(true); 

    // 랜덤으로 나타내기 
    const [RandomIdx,setRandomIdx] = useState(0)
    

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
        setModalVisible(false)
    },[])

    const correct = (selectedOption) =>{
        let answer = allquestion[CurrentIdx]['answer'];
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
            const random = Math.floor(Math.random()* allquestion.length)
           
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

    const restart = () => {
        setScoreModal(false)

        setRandomIdx(0)
        setscore(0)

        setOptionSelected(null)
        setcorrectOption(null)
        setisOptionDisabled(false)
        setNextPage(false)
        
    }

    // 새로고침 기능
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
        }, []);

    const MoveMain = ()=> {
        setScoreModal(false)

        setRandomIdx(0)
        setscore(0)

        setOptionSelected(null)
        setcorrectOption(null)
        setisOptionDisabled(false)
        setNextPage(false)
        navigation.navigate('Main')
    }    

    return(
        <ScrollView style={styles.container}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}>
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
                }}>{RandomIdx+1} / </Text>
                <Text style={{
                    color : "#fff",
                    fontSize : 25,
                }}>10</Text>

                <Text style={styles.right_number}>맞춘 개수 : {score} </Text>
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
                        <Text style={styles.modaltext}>
                            {score == 10 ? '당신은 신조어 박사!' : score > 5 ? '당신은 이시대의 인싸!' : score < 5 ? '다시 공부하세요!' : null }
                            </Text>
                    
                        <View style={{
                            flexDirection : "row",
                            justifyContent :"flex-start",
                            alignItems : "center",
                            marginVertical : 20
                        }}>
                            <Text style={{
                                fontSize : 20,
                                color : score > 5 ? "#00FF00" : "#FF0000"
                            }}>{score}</Text>
                            <Text style={{
                                fontSize : 20,
                                color : "#000"
                            }}>/ 10</Text>
                        </View>
                        <View style={{
                            
                            flexDirection :"row"
                        }}>
                            <Pressable 
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
                        </Text></Pressable>
                        <Pressable 
                        style={{
                            marginVertical :15,
                            borderRadius :15,
                            borderColor : "#0080ff",
                            backgroundColor :"#0080ff",
                            justifyContent :"center",
                            alignItems :"center",
                            marginLeft : 20,
                            width : 100,
                            height : 50,

                        }}
                        onPress={MoveMain}>
                            
                        <Text style={{
                            fontSize : 20,
                            color :"#fff"
                        }}>메인 화면
                        </Text></Pressable>
                        </View>
                    </View>          
                </View>
            </Modal>
            <Modal
            animationType ="slide"
            transparent ={true}
            visible ={ModalVisible}
            onRequestClose={()=>setModalVisible(false)}>
                <View style={styles.modal}> 
                    <View style={styles.modalbox02}>
                        <Text style={styles.modaltext}>{allquestion[CurrentIdx]?.desc_title}</Text>
                        <View style={{
                            marginTop :20
                        }}>
                            <Text style={styles.modaltext02}>{allquestion[CurrentIdx]?.desc}</Text>
                        </View>
                    
                        <Pressable
                        style={{
                            marginVertical :30,
                            borderRadius :15,
                            borderColor : "#0080ff",
                            backgroundColor :"#0080ff",
                            justifyContent :"center",
                            alignItems :"center",
                            width : 100,
                            height : 50,
                            

                        }} 
                        onPress ={()=>setModalVisible(false)}>
                            
                        <Text style={{
                            fontSize : 20,
                            color :"#fff"
                        }}>확인
                        </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* 광고 붙이기 */}
            {Platform.OS == 'ios' ? (
                <AdMobBanner
                bannerSize ="fullBanner"
                servePersonalizedAds ={true}
                adUnitID ="ca-app-pub-8186113865555128/2598378688"
                style={styles.banner}/>

                
               
            ):
                <AdMobBanner
                bannerSize ="fullBanner"
                servePersonalizedAds ={true}
                adUnitID ="ca-app-pub-8186113865555128/3384862651"
                style={styles.banner}
                />
            } 
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
        marginLeft : 130,
    },
    question :{
        borderWidth :1,
        borderRadius : 15,
        borderColor : "#fff",
        width : 400,
        height : 250,
        padding :10,
        justifyContent : "center",
        alignSelf : 'center',

    },
    questionText :{
        justifyContent :"center",
        alignSelf:"center",
        color: "#fff",
        fontSize : 30,
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
    },
    modalbox02:{
        backgroundColor :"#fff",
        width : "90%",
        borderRadius :15,
        padding :20,
        alignItems : "center",
    },
    modaltext02: {
        color : "#000",
        fontSize : 20,
        fontWeight :"700"
    },
    banner : {
        backgroundColor : "#fff",
        height : 80,
        width : "100%",
        borderWidth : 1,
        borderColor : "#fff",
        padding : 15,
        marginTop : 10
    }




})
