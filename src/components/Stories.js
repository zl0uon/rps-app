import { View, Text } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const storyInfo = [
    {
        id: 1,
        name: 'AI',
        image: require('../../assets/images/AiProfile.png'),
    },
    {
        id: 2,
        name: 'USER',
        image: require('../../assets/images/userProfile.png'),
    }
]

const Stories = () => {
    const navigation = useNavigation();
    return (
        <ScrollView
            horizontal={true}
            style={{paddingVertical: 20}}
        >
            {storyInfo.map((data, index) => {
                return (
                    <Touchable0pacity
                        key={index}
                        onPress={() => navigation.push('Status', {
                            name: data.name,
                            image: data.image
                        })}
                    >
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingHorizontal: 8,
                                position: 'relative',
                            }}
                        >
                            {data.id === 1 ? (
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 15,
                                        right: 10,
                                        zIndex: 1,
                                    }}
                                >
                                        <Entypo 
                                            name='circle-with-plus'
                                            style={{
                                                fontSize: 20,
                                                color: '#405de6',
                                                backgroundColor: 'white',
                                                borderRadius: 10,
                                                overflow: 'hidden',
                                            }}
                                        />
                                </View>
                            ): null}
                                <View
                                style={{
                                    width: 68,
                                    height: 68,
                                    backgroundColor: 'white',
                                    borderWidth: 1.8,
                                    borderRadius: 100,
                                    borderColor: '#c13584',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                >
                                    <image
                                        source={data.image}
                                        style={{
                                            resizeMode: 'cover',
                                            width: '92%',
                                            height: '92%',
                                            borderRadius: 100,
                                            backgroundColor: 'orange',
                                        }}
                                    />
                                </View>
                                <Text>

                                </Text> 


                        </View>

                    </Touchable0pacity>
                )
            })}
        </ScrollView>
    )
}

export default Stories