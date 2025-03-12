import React from 'react';
import {FlatList, View} from 'react-native';
import Sun from '../../components/Sun';
import Mercury from '../../components/Mercury';

const planets = [
  {name: 'Sun', component: <Sun />},
  {name: 'Mercury', component: <Mercury />},
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
