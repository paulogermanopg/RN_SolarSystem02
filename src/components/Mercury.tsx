import React from 'react';
import { Dimensions } from 'react-native';
import { Canvas, Circle, Group, LinearGradient, vec } from '@shopify/react-native-skia';

const { height, width } = Dimensions.get('window');

const Mercury = () => {
  return (
    <Canvas style={{ width, height }}>
      <Group>
        <Circle cx={width / 2} cy={height / 2} r={20}>
          <LinearGradient
            start={vec(width / 2 - 20, height / 2)}
            end={vec(width / 2 + 20, height / 2)}
            colors={['#A9A9A9', '#808080']}
          />
        </Circle>
      </Group>
    </Canvas>
  );
};

export default Mercury;
