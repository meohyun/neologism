import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import Main from '../pages/Main'
import Intro from '../pages/Intro'
import Question from '../pages/Question'
import Study from '../pages/Study'
import Studyinfo from '../pages/Studyinfo'

const Stack = createStackNavigator();


const StackNavigator = () =>{
    return (

        //컴포넌트들을 페이지처럼 여기게끔 해주는 기능을 하는 네비게이터 태그를 선언합니다.
        //위에서 선언한 const Stack = createStackNavigator(); Stack 변수에 들어있는 태그를 꺼내 사용합니다.
        //Stack.Navigator 태그 내부엔 페이지(화면)를 스타일링 할 수 있는 다양한 옵션들이 담겨 있습니다.
        <Stack.Navigator
            screenOptions={{
            headerStyle: {
                backgroundColor: "black",
                borderBottomColor: "white",
                shadowColor: "white",
                height:100
            },
        //헤더의 텍스트를 왼쪾에 둘지 가운데에 둘지를 결정
            headerTitleAlign:'left',
            headerTintColor: "#fff",
            headerBackTitleVisible: false
        }}

        >
        {/* 컴포넌트를 페이지로 만들어주는 엘리먼트에 끼워 넣습니다. 이 자체로 이제 페이지 기능을 합니다*/}
            <Stack.Screen name="Main" component={Main}/>
            <Stack.Screen name="Intro" component={Intro}/>
            <Stack.Screen name="Question" component={Question}/>
            <Stack.Screen name="Study" component={Study}/>
            <Stack.Screen name="Studyinfo" component={Studyinfo}/>
        </Stack.Navigator>
        )
}

export default StackNavigator;
