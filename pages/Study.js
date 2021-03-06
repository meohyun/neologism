import React, { useEffect, useState } from 'react'
import {View,StyleSheet,Text,RefreshControl,Image,ScrollView} from 'react-native'
import { AdMobBanner } from 'expo-ads-admob'
import data from '../data'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'



export default function Study({navigation,content}){

    const [Datastate,setDataState] = useState([])
    const [masterData,setmasterData] = useState([])
    const [search,setsearch] =useState('')
    

    useEffect(()=>{

        // console.log(allquestion[CurrentIdx]?.answer)
        navigation.setOptions({
            title : "신조어 사전",
            headerStyle :{
                backgroundColor : "#000",
                shadowColor : "#000",
                borderBottomColor :"#000",
                height :100
                
            }
        })

        let neologism_data = data;
        setDataState(neologism_data)
        setmasterData(neologism_data)


    },[])

    
    // 새로고침 기능
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
        }, []);

    // 검색 기능

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item)=>{
                const itemData = item.desc_title

            return itemData.indexOf(text) > -1;
            });
            setDataState(newData);
            setsearch(text);
        }
        else{
            setDataState(masterData);
            setsearch(text);
            
        }
    }

    const deleteButton = () =>{
        setsearch("")
        setDataState(masterData)
    }

    const category = (cate) => {

        let neologism_data = data;

        if(cate == "전체보기"){
            setDataState(neologism_data)
        }
        
        else{
            setDataState(neologism_data.filter((d)=>{
            return d.category == cate
        }))
        }
        }

    return(
        <SafeAreaView style={styles.container}

            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
            />}>

                <View style={styles.bar_container}>
                    <TextInput
                    style={styles.textInputBar}
                    value ={search}
                    placeholder ="신조어를 입력하세요."
                    underlineColorAndroid ="transparent"
                    onChangeText ={(text) => searchFilter(text)}
                    />
                    <TouchableOpacity style={{
                        width : 45,
                        height : 50,
                        backgroundColor : "#fff",
                        justifyContent : 'center',
                        alignSelf: "center",
                        borderColor: "#fff",
                        borderWidth : 1,
                    }}
                    onPress={deleteButton}>
                        <Image 
                        style={{
                            height :25,
                            width : 25,
                        }}
                        source={{uri:"https://firebasestorage.googleapis.com/v0/b/neologism-4c173.appspot.com/o/X.png?alt=media&token=5dbeb628-ae0e-4e3d-9e41-8103c21788de"}}/>

                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.category} horizontal indicatorStyle={"white"}>
                    <TouchableOpacity style={styles.category_box} onPress={()=>{category('전체보기')}}><Text style={styles.category_text}>전체보기</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.category_box1} onPress={()=>{category('경제')}}><Text style={styles.category_text}>경제</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.category_box2} onPress={()=>{category('연애')}}><Text style={styles.category_text}>연애</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.category_box3} onPress={()=>{category('인방')}}><Text style={styles.category_text}>인방</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.category_box4} onPress={()=>{category('생활')}}><Text style={styles.category_text}>생활</Text></TouchableOpacity>
                </ScrollView>

                <View style={styles.list}>
                    <FlatList
                    data={Datastate}
                    keyExtractor = {(item,index)=>index.toString()}
                    renderItem ={({item}) =>(
                        <TouchableOpacity style ={styles.list_button}onPress={()=>{navigation.navigate('Studyinfo',item)}}>
                            <Text style={styles.text}>{item.desc_title}</Text>
                        </TouchableOpacity>

                    )}
                    />            
                </View>
                
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
                adUnitID ="
                ca-app-pub-8186113865555128/2217455911"
                style={styles.banner}
                />
                } 

        </SafeAreaView>

                     
            

            
       
    



    )

}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        flexBasis: 420,
        flexShrink : 1,
        backgroundColor : "#000"
    },
    bar_container :{
        backgroundColor : "#000",
        flexDirection : "row"
    },
    textInputBar :{
        width : 350,
        justifyContent : "center",
        alignSelf: "center",
        height :50,
        borderWidth :1,
        marginLeft : 10,
        paddingLeft : 10,
        borderColor: "#fff",
        backgroundColor :"#fff"
    },


    list :{
        flex :5,
        backgroundColor :"#000",
    },
    list_button :{
        width : "100%",
        height : 70,
        padding : 10,
        borderBottomWidth : 1,
        borderBottomColor :"#FFF",
        marginTop : 10,
    },

    text :{
        color : "#fff",
        fontSize : 20,
        fontWeight : "700"
    },
    banner : {
        flex :0.7,
        backgroundColor : "#fff",
        height : 80,
        width : "100%",
        borderWidth : 1,
        borderColor : "#fff",

    },
    category :{
        flex : 1,
        flexDirection :"row",
        
    },
    category_box : {
        width : 100,
        height: 50,
        backgroundColor :"gray",
        borderWidth :1,
        borderRadius :10,
        justifyContent : "center",
        alignItems : "center",
        marginLeft : 15,
        marginTop : 15
        
    },
    category_box1 : {
        width : 100,
        height: 50,
        backgroundColor :"red",
        borderWidth :1,
        borderRadius :10,
        justifyContent : "center",
        alignItems : "center",
        marginLeft : 15,
        marginTop : 15
        
    },
    category_box2 : {
        width : 100,
        height: 50,
        backgroundColor :"green",
        borderWidth :1,
        borderRadius :10,
        justifyContent : "center",
        alignItems : "center",
        marginLeft : 15,
        marginTop : 15
        
    },
    category_box3 : {
        width : 100,
        height: 50,
        backgroundColor :"blue",
        borderWidth :1,
        borderRadius :10,
        justifyContent : "center",
        alignItems : "center",
        marginLeft : 15,
        marginTop : 15
        
    },
    category_box4 : {
        width : 100,
        height: 50,
        backgroundColor :"purple",
        borderWidth :1,
        borderRadius :10,
        justifyContent : "center",
        alignItems : "center",
        marginLeft : 15,
        marginTop : 15
        
    },
    category_text :{
        fontSize : 20,
        textAlign : "center",
        color : "white",
        fontWeight :"bold"
    }

})
   