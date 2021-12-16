import React, { useEffect,useState} from 'react'
import {SafeAreaView,StyleSheet,Text,View,Modal,Pressable,RefreshControl,Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import data from '../data_sentence'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { AdMobBanner } from 'expo-ads-admob'



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

    const correct = (selectedOption) =>{
        let answer = datas[CurrentIdx]['answer'];
       setOptionSelected(selectedOption)
       setcorrectOption(answer)
       setisOptionDisabled(true);
       if(selectedOption==answer){
           setscore(score+1)
       }
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

    const restart = () => {
        const random = Math.floor(Math.random()* datas.length)
        setScoreModal(false)

        setRandomIdx(0)
        setCurrentIdx(random)
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
       <SafeAreaView style={styles.container}
       refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}>
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
                    marginLeft : 120,
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

           <Modal
           animationType="slide"
           transparent={true}
           visible = {ModalVisible}
           onRequestClose={()=>setModalVisible(false)}>
               <View style={{
                   flex : 1 ,
                   justifyContent :"center",
                   alignItems : "center"
               }}>
                   <View style={{
                       backgroundColor :"#fff",
                       width : "90%",
                       borderRadius :15,
                       padding :20,
                       alignItems : "center",
                       borderColor : "#017CFF",
                       borderWidth : 5,

                   }}>
                       <Text style={{
                    fontSize : 30,
                    color: "#000",
                    fontWeight : "700",
                    textAlign : "center",
                    marginTop : 20,
                        }}>{datas[CurrentIdx]?.answer}
                        </Text>
                        <Text style={{
                    fontSize : 20,
                    fontWeight : "700",
                    textAlign : "center",
                    marginTop : 20,}}>
                        {datas[CurrentIdx]?.desc}
                        </Text>
                        <Pressable
                        style={{
                            marginVertical :30,
                            borderRadius :15,
                            borderColor : "#0080ff",
                            backgroundColor :"#0080ff",
                            justifyContent :"center",
                            alignSelf:"center",
                            width : 100,
                            height : 50,
                            

                        }} 
                        onPress ={()=>setModalVisible(false)}>
                            
                        <Text style={{
                            fontSize : 20,
                            color :"#fff",
                            textAlign : "center"
                        }}>확인
                        </Text>
                        </Pressable>
                    </View>
                   
               </View>
           </Modal>
           <Modal
            animationType ="slide"
            transparent = {true}
            visible ={ScoreModal}>
                <View style={styles.modal}> 
                    <View style={styles.modalbox}>
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
                            marginLeft : 30,
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

       </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        flexBasis: 420,
        flexShrink : 1,
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
        marginTop : 5,
        marginBottom :10,
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
        fontSize : 18,
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
        width : "95%",
        height : 50,
        padding :10,
        marginTop : 15,
        justifyContent :"space-between",
        alignSelf :"center",
        borderWidth :3,
                        
    },
    buttonText :{
        justifyContent :"center",
        alignSelf:"center",
        color: "#fff",
        fontSize : 19,
        fontWeight :"700"
    },
    modal:{
        flex : 1,
        justifyContent :"center",
        alignItems : "center"
  
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
        marginTop : 30
    }

})