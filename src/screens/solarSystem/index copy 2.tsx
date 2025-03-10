import React from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';

const {height, width} = Dimensions.get('window');

const planets = [
  {name: 'Sun', colors: ['#FFA500', '#FF4500'], size: 100},
  {name: 'Mercury', colors: ['#A9A9A9', '#808080'], size: 20},
  {name: 'Venus', colors: ['#FFD700', '#DAA520'], size: 40},
  {name: 'Earth', colors: ['#1E90FF', '#00008B'], size: 50},
  {name: 'Mars', colors: ['#FF4500', '#8B0000'], size: 35},
  {name: 'Jupiter', colors: ['#D2691E', '#8B4513'], size: 90},
  {name: 'Saturn', colors: ['#DAA520', '#8B6914'], size: 80},
  {name: 'Uranus', colors: ['#5F9EA0', '#2E8B57'], size: 60},
  {name: 'Neptune', colors: ['#483D8B', '#191970'], size: 55},
];

const PlanetItem = ({colors, size}) => (
  <View
    style={{
      height,
      width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    }}>
    <Canvas style={{width, height}}>
      <Group>
        <Circle cx={width / 2} cy={height / 2} r={size}>
          <LinearGradient
            start={vec(width / 2 - size, height / 2)}
            end={vec(width / 2 + size, height / 2)}
            colors={colors}
          />
        </Circle>
      </Group>
    </Canvas>
  </View>
);

const SolarSystem = () => {
  return (
    <FlatList
      data={planets}
      keyExtractor={item => item.name}
      renderItem={({item}) => (
        <PlanetItem colors={item.colors} size={item.size} />
      )}
      pagingEnabled
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SolarSystem;
