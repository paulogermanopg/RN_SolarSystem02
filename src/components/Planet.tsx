import React from 'react';
import { Dimensions } from 'react-native';
import { Canvas, Circle, Group, LinearGradient, vec } from '@shopify/react-native-skia';

const { height, width } = Dimensions.get('window');

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

export default Planet;
