import React from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import Sun from '../../components/Sun';
import Planet from '../../components/Planet';
import planets from '../../components/planetsData';

const { height, width } = Dimensions.get('window');

const PlanetItem = ({ name, colors, size }) => (
  <View
    style={{
      height,
      width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    }}>
    {name === 'Sun' ? <Sun colors={colors} size={size} /> : <Planet colors={colors} size={size} />}
  </View>
);

const SolarSystem = () => {
  return (
    <FlatList
      data={planets}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <PlanetItem name={item.name} colors={item.colors} size={item.size} />
      )}
      pagingEnabled
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SolarSystem;
