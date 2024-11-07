import { View, Text, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Stories from '../components/Stories'

const Home = () => {
    return (
        <SafeAreaView>
            <StatusBar
                backgroundColor="black"
                barStyle="white-content"
            />
            <View
                style={{ 
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    alignItems: 'center',
                    }}
                    >
                <View>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 500,
                        }}
                        >
                        공학동아리 가위바위보 게임
                    </Text>
                </View>
                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                    >
                        <FontAwesome name="plus-squre-o" style={{fontSize: 24, paddingHorizontal: 15}} />
                        <Feather name="navigation" style={{ fontSize: 24 }} />
                    </View>
            </View>
            <ScrollView>
                {/*Stories*/}
                <Stories />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home