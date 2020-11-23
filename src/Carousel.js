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
const Backdrop = ({scrollX}) => {
    const backgroundColor = scrollX.interpolate({
      inputRange: bgs.map((_, i) => i * width),
      outputRange: bgs.map((bg) => bg),
    });
  
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor,
          },
        ]}
      />
    );
  };

const Indicator = ({scrollX}) => {
    return (
      <View style={{position: 'absolute', bottom: 100, flexDirection: 'row'}}>
        {DATA.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 0.9, 0.6],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`indicator-${i}`}
              style={{
                height: 15,
                width: 15,
                borderRadius: 7.5,
                backgroundColor: '#fff',
                margin: 10,
                opacity,
                transform: [{scale}],
              }}></Animated.View>
          );
        })}
      </View>
    );
  };

  const Squares = ({scrollX}) => {
    const YOLO = Animated.modulo(
      Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
      1,
    );
  
    const rotate = YOLO.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['30deg', '20deg', '30deg'],
    });
    const translateX = YOLO.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, -height, 0],
    });
    return (
      <Animated.View
        style={{
          width: height,
          height: height,
          backgroundColor: '#fff',
          borderRadius: 86,
          position: 'absolute',
          top: -height * 0.6,
          left: -height * 0.3,
          transform: [
            {
              rotate,
            },
            {
              translateX,
            },
          ],
        }}
      />
    );
  };

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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  