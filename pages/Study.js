import React, { useEffect, useState } from 'react'
import {View,StyleSheet,Text,RefreshControl} from 'react-native'
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
                </View>

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
                adUnitID ="ca-app-pub-8186113865555128/3384862651"
                style={styles.banner}
                />
                } 

        </SafeAreaView>

                     
            

            
       
    



    )

}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor : "#000"
    },
    bar_container :{
        backgroundColor : "#000"
    },
    textInputBar :{
        width : "100%",
        justifyContent : "center",
        alignSelf: "center",
        height :50,
        borderWidth :1,
        paddingLeft : 10,
        margin :5,
        borderColor: "#009688",
        backgroundColor :"#fff"
    },
    

    list :{
        flex :6,
        backgroundColor :"#000",
        marginVertical : 20,
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

    }

})
   