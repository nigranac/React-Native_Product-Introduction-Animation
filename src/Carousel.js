import React, {useRef} from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

const bgs = ['#65a396', '#e3a8b4', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'STEAK',
    description:
      "Best of !!! You cant find it everywhere!",
    // image: 'https://image.flaticon.com/icons/png/256/3571/3571572.png',
    image:require( "./assets/steak.png"),
    
  },
  {
    key: '3571747',
    title: 'SALAD',
    description:
      'You should try for your health!',
    // image: 'https://image.flaticon.com/icons/png/256/3571/3571747.png',
    image:require( "./assets/salad.png"),
  },
  {
    key: '3571680',
    title: 'BURGER',
    description:
      'This burger isnt anywhere else!😊',
    // image: 'https://image.flaticon.com/icons/png/256/3571/3571680.png',
    image:require( "./assets/chips.png"),
  },
  {
    key: '3571603',
    title: 'PASTA',
    description: 'Came special from italy 🍝',
    // image: 'https://image.flaticon.com/icons/png/256/3571/3571603.png',
    image:require( "./assets/pasta.png"),
  },
];


const Carousel = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
  
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Backdrop scrollX={scrollX} />
        <Squares scrollX={scrollX} />
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          pagingEnabled
          contentContainerStyle={{paddingBottom: 100}}
          data={DATA}
          keyExtractor={(item) => item.key}
          renderItem={({item}) => {
            return (
              <View style={{width, alignItems: 'center', padding: 20}}>
                <View style={{flex: 0.7, justifyContent: 'center'}}>
                  <Image
                    source={item.image}
                    style={{
                      width: width / 1.5,
                      height: width / 1.5,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View style={{flex: 0.2,marginBottom:20}}>
                  <Text
                    style={{
                      fontWeight: '800',
                      fontSize: 28,
                      marginBottom: 10,
                      color: '#fff',
                      fontFamily:"Modak-Regular",
                      letterSpacing:1
                    }}>
                    {item.title}
                  </Text>
                  <Text style={{fontWeight: '300', color: 'black',fontFamily:"Kanit-LightItalic",fontSize:24}}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <Indicator scrollX={scrollX} />
      </View>
    );
  };
  
  export default Carousel;