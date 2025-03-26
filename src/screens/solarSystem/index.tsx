import React, { useState, useEffect } from 'react';
import { FlatList, View, Dimensions, Animated } from 'react-native';
import Sun from '../../components/Sun';
import Mercury from '../../components/Mercury';
import Venus from '../../components/Venus';
import Earth from '../../components/Earth';
import Mars from '../../components/Mars';
import Jupiter from '../../components/Jupiter';
import Saturn from '../../components/Saturn';
import Uranus from '../../components/Uranus';
import Neptune from '../../components/Neptune';

const { height } = Dimensions.get('window');

const planets = [
  { name: 'Sun', size: '1,392,700 km', description: 'A estrela central do sistema solar.', component: <Sun /> },
  { name: 'Mercury', size: '4,880 km', description: 'O menor e mais rápido planeta do sistema solar.', component: <Mercury /> },
  { name: 'Venus', size: '12,104 km', description: 'Tem uma atmosfera densa e é o planeta mais quente.', component: <Venus /> },
  { name: 'Earth', size: '12,742 km', description: 'Nosso lar, o único planeta conhecido com vida.', component: <Earth /> },
  { name: 'Mars', size: '6,779 km', description: 'Conhecido como o planeta vermelho.', component: <Mars /> },
  { name: 'Jupiter', size: '139,820 km', description: 'O maior planeta do sistema solar.', component: <Jupiter /> },
  { name: 'Saturn', size: '116,460 km', description: 'Famoso por seus belos anéis.', component: <Saturn /> },
  { name: 'Uranus', size: '50,724 km', description: 'Tem uma inclinação axial única.', component: <Uranus /> },
  { name: 'Neptune', size: '49,244 km', description: 'O último planeta do sistema solar.', component: <Neptune /> },
];

const SolarSystem = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedText = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedText, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [activeIndex, animatedText]);

  const renderItem = ({ item, index }) => (
    <View style={{ height, justifyContent: 'center', alignItems: 'center' }}>
      {item.component}
      {index === activeIndex && (
        <View style={{ position: 'absolute', bottom: 50, alignItems: 'center' }}>
          <Animated.Text style={{ fontSize: 24, color: 'white', opacity: animatedText }}>
            {item.name}
          </Animated.Text>
          <Animated.Text style={{ fontSize: 16, color: 'white', opacity: animatedText }}>
            {item.size}
          </Animated.Text>
          <Animated.Text style={{ fontSize: 14, color: 'white', opacity: animatedText, textAlign: 'center', marginHorizontal: 20 }}>
            {item.description}
          </Animated.Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / height);
          setActiveIndex(index);
        }}
      />
    </View>
  );
};

export default SolarSystem;
