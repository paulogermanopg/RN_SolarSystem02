import React, { useEffect } from 'react';
import { View, Dimensions, FlatList } from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';
import Animated, {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

const planets = [
  { name: 'Sun', colors: ['#FFA500', '#FF4500'], size: 100 },
  { name: 'Mercury', colors: ['#A9A9A9', '#808080'], size: 20 },
  { name: 'Venus', colors: ['#FFD700', '#DAA520'], size: 40 },
  { name: 'Earth', colors: ['#1E90FF', '#00008B'], size: 50 },
  { name: 'Mars', colors: ['#FF4500', '#8B0000'], size: 35 },
  { name: 'Jupiter', colors: ['#D2691E', '#8B4513'], size: 90 },
  { name: 'Saturn', colors: ['#DAA520', '#8B6914'], size: 80 },
  { name: 'Uranus', colors: ['#5F9EA0', '#2E8B57'], size: 60 },
  { name: 'Neptune', colors: ['#483D8B', '#191970'], size: 55 },
];

const generateSunspots = (size) => {
  const spots = [];
  const numSpots = Math.floor(Math.random() * 4) + 5; // De 5 a 8 manchas

  for (let i = 0; i < numSpots; i++) {
    let validSpot = false;
    let offsetX, offsetY, radius;

    while (!validSpot) {
      offsetX = (Math.random() - 0.5) * size * 0.9;
      offsetY = (Math.random() - 0.5) * size * 0.9;
      radius = Math.random() * (size * 0.05) + size * 0.02;

      validSpot = !spots.some(
        (s) => Math.hypot(s.offsetX - offsetX, s.offsetY - offsetY) < s.radius + radius + 5
      );
    }

    spots.push({ offsetX, offsetY, radius });
  }

  return spots;
};

const Sun = ({ colors, size }) => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.ease }),
      -1,
      true
    );
  }, []);

  const animatedOpacity = useDerivedValue(() => opacity.value);
  const sunspots = generateSunspots(size);

  return (
    <Canvas style={{ width, height }}>
      <Group>
        {/* Sol */}
        <Circle cx={width / 2} cy={height / 2} r={size}>
          <LinearGradient
            start={vec(width / 2 - size, height / 2)}
            end={vec(width / 2 + size, height / 2)}
            colors={colors}
          />
        </Circle>

        {/* Manchas solares animadas */}
        {sunspots.map((spot, index) => (
          <Circle
            key={`sunspot-${index}`}
            cx={width / 2 + spot.offsetX}
            cy={height / 2 + spot.offsetY}
            r={spot.radius}
            color="black"
            opacity={animatedOpacity}
          />
        ))}
      </Group>
    </Canvas>
  );
};

const Planet = ({ colors, size }) => {
  return (
    <Canvas style={{ width, height }}>
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
  );
};

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
