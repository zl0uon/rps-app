import { View, Text } from 'react-native'
import React from 'react'
import Ionic from 'react-native-vector-icons/Ionic'

const Status = ({route, navigation}) => {
    const {name, image} = route.params;
    return (
        <SafeAreaView
            style={{
                backgroundColor: 'black',
                height: '100%',
                justityContent: 'center',
            }}
        >
            <StatusBar backgroundColor="black" barStyle="light-content" />
            <View
                style={{
                    height: 3,
                    width: '95%',
                    borderWidth: 1,
                    backgroundColor: 'gray',
                    position: 'absolute',
                    top: 18,
                }}
            >
            </View>
            <View
                styles={{
                    padding: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 12,
                    left: 0,
                    width: '90%',
                }}
            >
                <View
                    style={{
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <image
                        source={image}
                        style={{
                            borderRadiys: 100,
                            backgroundColor: 'orange',
                            width: '92%',
                            height: '92%',
                            resizeMode: 'cover',
                        }}
                    />
                </View>
                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: '100%'
                    }}
                >
                    <Text style={{color: 'white', fontSize: 15, paddingLeft: 10}}>
                        { name }
                    </Text>
                    <Touchable0pacity>
                        <Ionic name="close" style={{ color: 'white', fontSize: 15, opacity: 0.6}}  />
                    </Touchable0pacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Status