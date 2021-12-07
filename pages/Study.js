import React, { useEffect, useState } from 'react'
import {View,StyleSheet,Text,RefreshControl,ScrollView} from 'react-native'
import { AdMobBanner } from 'expo-ads-admob'
import { StatusBar } from 'expo-status-bar'
import data from '../data'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '../components/Card'


export default function Study({navigation,content}){

    const [Datastate,setDataState] = useState([])
    

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

    return(
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
            />}>
                <View style={styles.list}>
                {Datastate.map((content,i)=>{
                    return(<Card content={content} key={i} navigation={navigation}/>)
                })}
            
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

        </ScrollView>

                     
            

            
       
    



    )

}

const styles = StyleSheet.create({
    container :{
        backgroundColor : "#000"
    },

    list :{
        backgroundColor :"#000",
        marginVertical : 30,
    },
    list_button :{
        width : "100%",
        height : 50,
        borderBottomWidth : 1,
        borderBottomColor :"#FFF",
        marginTop : 10,
    },

    text :{
        color : "#fff",
        fontSize : 20
    },
    banner : {
        backgroundColor : "#fff",
        height : 80,
        width : "100%",
        borderWidth : 1,
        borderColor : "#fff",
        marginTop : 70
    }

})
   