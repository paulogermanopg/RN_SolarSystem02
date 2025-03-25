import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  RadialGradient,
  vec,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

const generateStars = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 3 + 1,
    opacity: useSharedValue(Math.random()),
  }));
};

const Neptune = () => {
  const stars = generateStars(50);

  useEffect(() => {
    stars.forEach((star) => {
      star.opacity.value = withRepeat(
        withTiming(Math.random(), {
          duration: Math.random() * 1000 + 200,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      );
    });
  }, [stars]);

  return (
    <Canvas style={{ width, height }}>
      {/* Fundo estrelado animado */}
      <Group>
        {stars.map((star, index) => (
          <Circle
            key={index}
            cx={star.x}
            cy={star.y}
            r={star.size}
            color="white"
            opacity={star.opacity}
          />
        ))}
      </Group>

      {/* Planeta Netuno */}
      <Group>
        <Circle cx={width / 2} cy={height / 2} r={55}>
          <RadialGradient
            c={vec(width / 2, height / 2)}
            r={55}
            colors={['#1B3B6F', '#0A1F44']}
            positions={[0.3, 1]}
          />
        </Circle>
      </Group>
    </Canvas>
  );
};

export default Neptune;
