import React from 'react';
import {FlatList, View} from 'react-native';
import Sun from '../../components/Sun';
import Mercury from '../../components/Mercury';
import Venus from '../../components/Venus';
import Earth from '../../components/Earth';

const planets = [
  {name: 'Sun', component: <Sun />},
  {name: 'Mercury', component: <Mercury />},
  {name: 'Venus', component: <Venus />},
  {name: 'Earth', component: <Earth />},
];

const SolarSystem = () => {
  return (
    <View style={{backgroundColor: '#000'}}>
      <FlatList
        data={planets}
        keyExtractor={item => item.name}
        renderItem={({item}) => item.component}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SolarSystem;
