import React from 'react'
import { StyleSheet,View,Text, Modal, Alert,Share,Linking,Image} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { useEffect,useState } from 'react'
import data from '../data'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import { AdMobBanner } from 'expo-ads-admob'


export default function Question({navigation}){


    const allquestion = data;

    // 현재 페이지
    const random = Math.floor(Math.random()* allquestion.length)
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

    // 마지막 페이지 
    const [ScoreModal,setScoreModal] = useState(false)

    // 모달 창 닫기
    const [ModalVisible, setModalVisible] = useState(true); 

    // 랜덤으로 나타내기 
    const [RandomIdx,setRandomIdx] = useState(0)

    // 힌트 모달 창 
    const [HintModal,setHintModal] = useState(false)

    // 힌트 갯수 
    const [HintNum,setHintNum] = useState(3)

    // 같은 화면의 힌트 못누름
    const [HintDisabled,setHintDisabled] = useState(true)


    useEffect(()=>{

        // console.log(allquestion[CurrentIdx]?.answer)
        navigation.setOptions({
            title : "단어 맞추기",
            headerStyle :{
                backgroundColor : "#000",
                shadowColor : "#000",
                borderBottomColor :"#000",
                height :100
                
            }
        })

        setHintNum(3)
        setHintDisabled(false)
        setModalVisible(false)

        // 뒤로가기 누를시 종료 OR 계속 
        navigation.addListener('beforeRemove',event=>{
            event.preventDefault();

            Alert.alert(
                '나가기',
                '퀴즈를 종료하시겠습니까?',
                [
                    {text:'네', style:'destructive', onPress : ()=>navigation.dispatch(event.data.action)},
                    {text:'아니오', style : 'cancel',onPress : ()=>{}}
                ]
            )
        })

        },[navigation])

    // 정답 확인
    const correct = (selectedOption) =>{
        let answer = allquestion[CurrentIdx]['answer'];
       setOptionSelected(selectedOption)
       setcorrectOption(answer)
       setisOptionDisabled(true);
       if(selectedOption==answer){
           setscore(score+1)
       }
       setHintDisabled(true)
       setModalVisible(true)
       setNextPage(true)

    }

    // 다음 문제 내기
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
            setHintDisabled(false)
        }
    }

    // 다음 버튼 렌더링하기
    const renderNextPage = () => {
        if(NextPage){
            return(
                <TouchableOpacity style={styles.button} onPress={handleNext}><Text style={styles.buttonText}>다음</Text></TouchableOpacity>
            )
        }
    }
    
    // 다시 시작
    const restart = () => {
        const random = Math.floor(Math.random()* allquestion.length)
        setScoreModal(false)

        setRandomIdx(0)
        setCurrentIdx(random)
        setscore(0)

        setHintNum(3)


        setOptionSelected(null)
        setcorrectOption(null)
        setisOptionDisabled(false)
        setNextPage(false)

        
    }

    // 메인화면으로
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

    // 힌트 갯수새기
    const CountHint = () =>{
        setHintModal(true)
        setHintDisabled(true)
        setHintNum(HintNum-1)
    }
    
    // 공유하기
    const share = () =>{
        Share.share({
            message: `단어 맞추기에서 10개 중 ${score}개를 맞췄어요! 당신도 신조어 퀴즈를 통해 신조어 능력을 테스트 해보세요!\n\n 구글 플레이 스토어 링크 \n https://play.google.com/store/apps/details?id=com.neologism.meohyun`
        })
    }

    // 링크달기 
    const link = () => {
        Linking.openURL("https://play.google.com/store/apps/details?id=com.neologism.meohyun")
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
                    fontWeight :"700",
                    color : "#fff",
                    fontSize : 25,
                }}>{RandomIdx+1} / </Text>
                <Text style={{
                    fontWeight :"700",
                    color : "#fff",
                    fontSize : 25,
                }}>10</Text>
                <Text style={styles.right_number}>맞춘 개수 : {score} </Text>
            </View>            

            <View style={styles.question}>

                {HintNum > 0 ? 
                <TouchableOpacity
                style={styles.hint}
                onPress={CountHint}
                disabled ={HintDisabled}>
                <Text style={styles.hintBox}>
                    Hint    {HintNum > 0 ? HintNum : 0}/3
                </Text>
                </TouchableOpacity>  
                : <View style={styles.hint_null}></View>}
                
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

            {/* 결과 모달 */}
            <Modal
            animationType ="slide"
            transparent = {true}
            visible ={ScoreModal}>
                <View style={styles.modal}> 
                    <View style={styles.modalbox}>
                        <Pressable
                            style={{
                                marginRight : 300,
                            }}
                            onPress={()=>{setScoreModal(false)}}>
                            <Image style={{
                                height :25,
                                width : 25,
                                marginBottom :20,
                            }}source={{uri:"https://firebasestorage.googleapis.com/v0/b/neologism-4c173.appspot.com/o/arrow.png?alt=media&token=c4786244-ba05-4a9f-a453-c0d7dbb47302"}}/>
                        </Pressable>
                        <Text style={styles.modaltext}>
                            {score == 10 ? '축하합니다! 모두 맞추셨군요! 당신은 신조어 박사!':
                            score > 5 ? '당신은 21세기의 인싸!' : 
                            score == 5 ? '신조어를 어느 정도 아시네요!' :
                            score < 5  ? '어르신! 신조어 공부를 열심히 하셔야겠어요!' :
                            null }
                            </Text>
                    
                        <View style={{
                            flexDirection : "row",
                            justifyContent :"flex-start",
                            alignItems : "center",
                            marginVertical : 30,

                        }}>
                            <Text style={{
                                fontSize : 20,
                                color : score > 4 ? "#00FF00" : "#FF0000"
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
                        style={styles.sharebox}
                        onPress={restart}>     
                        <Text style={{
                            fontSize : 20,
                            color :"#fff"
                        }}>다시하기
                        </Text>
                        </Pressable>
                        <Pressable 
                        style={styles.sharebox02}
                        onPress={MoveMain}>    
                        <Text style={{
                            fontSize : 20,
                            color :"#fff"
                        }}>메인 화면
                        </Text>
                        </Pressable>
                        </View>
                        <View style={{flexDirection :'row'}}>
                            <Pressable style={styles.sharebox03}
                            onPress={share}>
                                <Text style={{
                                    fontSize :20 , color : 'white'
                                }}> 결과 공유하기
                                </Text>
                        </Pressable>

                            {/* <Pressable style={styles.sharebox02}
                            onPress={link}>
                                <Text style={{
                                    fontSize :20 , color : 'white'
                                }}>링크
                                </Text>
                            </Pressable> */}

                        </View>
                    </View>          
                </View>

            {/* 문제 정답 모달  */}
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
                        style={styles.okbutton} 
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

            {/* 힌트모달 */}
            <Modal
                animationType ="slide"
                transparent = {true}
                visible ={HintModal}
                onRequestClose={()=>setHintModal(false)}>
                    <View style={styles.modal}>
                        <View style={styles.modalbox}>
                            <Text style={styles.hintmodaltext}>Hint</Text>
                            <Text style={styles.hintmodaltext02}>
                                {allquestion[CurrentIdx]?.hint}
                                </Text>
                            <Pressable 
                            onPress ={()=>setHintModal(false)}
                            style={styles.okbutton}>
                                <Text 
                                style={{
                                    fontSize : 20,
                                    color :"#fff"}}>
                                확인
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
                adUnitID ="ca-app-pub-8186113865555128/3384862651"
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
        flex : 1,
        flexBasis: 420,
        flexShrink : 1,
        backgroundColor:"#000"
    },
    right_number : {
        color :"#fff",
        fontSize :25,
        marginLeft : 130,
        fontWeight : "700"
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
        marginTop : 20,
        marginBottom :50,
        fontWeight :"700",
        padding : 15,

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
        width : 400,
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
        fontSize : 18,
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
    modal:{
        flex : 1,
        alignItems :"center",
        justifyContent :"center"
    },
    modalbox :{
        backgroundColor :"#fff",
        width : "90%",
        borderRadius :15,
        padding :20,
        alignItems : "center",
        borderColor : "#017CFF",
        borderWidth : 5,
    },
    modaltext : {
        marginTop: 30,
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
        borderColor : "#017CFF",
        borderWidth : 5,
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
    },
    hint : {
        backgroundColor : "#009900",
        borderRadius :10,
        borderWidth :1,
        borderColor : "#009900",
        width : 120,
        height : 60,
        justifyContent :'center',
        alignContent:'center',
        alignSelf : "flex-start",
        marginTop: 10,
    },
    hint_null : {
        backgroundColor : "black",
        borderRadius :10,
        borderWidth :1,
        width : 60,
        height : 30,
        justifyContent :'center',
        alignContent:'center',
        alignSelf : "flex-end",
        marginTop: 30,
        marginBottom : 10,
    },
    hintBox : {
        color: 'white',
        textAlign :'center',
        fontWeight :'bold',
        fontSize : 20,
    },
    hintNum : {
        color :"#fff",
        fontSize :15,
        textAlign : 'right',
        fontWeight : "700"
    },
    hintmodaltext : {
        marginTop: 30,
        color : "#000",
        fontSize : 30,
        fontWeight :"700"
    },
    hintmodaltext02 : {
        marginTop: 30,
        color : "green",
        fontSize : 25,
        fontWeight :"700"
    },

    sharebox :{
        marginVertical :15,
        borderRadius :15,
        borderColor : "#999999",
        backgroundColor :"#999999",
        justifyContent :"center",
        alignItems :"center",
        width : 150,
        height : 50,

    },
    sharebox02 :{
        marginVertical :15,
        borderRadius :15,
        borderColor : "#999999",
        backgroundColor :"#999999",
        justifyContent :"center",
        alignItems :"center",
        width : 150,
        height : 50,
        marginLeft : 20,
    },

    sharebox03 :{
        marginVertical :15,
        borderRadius :15,
        borderColor : "#009900",
        backgroundColor :"#009900",
        justifyContent :"center",
        alignItems :"center",
        width : 200,
        height : 50,
    },

    okbutton :{
        marginVertical :30,
        borderRadius :15,
        borderColor : "#0080ff",
        backgroundColor :"#0080ff",
        justifyContent :"center",
        alignItems :"center",
        width : 100,
        height : 50,
         
}
})
