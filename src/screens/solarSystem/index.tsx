import React from 'react';
import { FlatList } from 'react-native';
import Sun from '../../components/Sun';
import Mercury from '../../components/Mercury';

const planets = [
  { name: 'Sun', component: <Sun /> },
  { name: 'Mercury', component: <Mercury />  },
];

const SolarSystem = () => {
  return (
    <FlatList
      data={planets}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => item.component}
      pagingEnabled
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SolarSystem;
