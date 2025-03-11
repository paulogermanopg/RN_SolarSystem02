// components/Sun.js
import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Canvas, Circle, Group, LinearGradient, vec } from '@shopify/react-native-skia';
import Animated, { useSharedValue, useDerivedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

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

const Sun = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.ease }),
      -1,
      true
    );
  }, [opacity]);

  const animatedOpacity = useDerivedValue(() => opacity.value);
  const sunspots = generateSunspots(100);

  return (
    <Canvas style={{ width, height }}>
      <Group>
        <Circle cx={width / 2} cy={height / 2} r={100}>
          <LinearGradient
            start={vec(width / 2 - 100, height / 2)}
            end={vec(width / 2 + 100, height / 2)}
            colors={['#FFA500', '#FF4500']}
          />
        </Circle>

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

export default Sun;
