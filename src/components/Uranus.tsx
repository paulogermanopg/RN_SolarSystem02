import React from 'react';
import {Dimensions} from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  vec,
  Path,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const Uranus = () => {
  return (
    <Canvas style={{width, height}}>
      <Group>
        <Path
          path={useDerivedValue(
            () => `
              M ${width / 2 - 10} ${height / 2 - 100}
              A 40 110 0 1 1 ${width / 2 - 10} ${height / 2 + 100}
              L ${width / 2 - 12} ${height / 2 + 100}
              A 40 110 0 1 0 ${width / 2 - 12} ${height / 2 - 100}
              Z
            `,
            [],
          )}
          color="#D3D3D380"
        />

        {/* Planeta Urano */}
        <Circle cx={width / 2} cy={height / 2} r={60}>
          <LinearGradient
            start={vec(width / 2 - 40, height / 2 - 40)}
            end={vec(width / 2 + 40, height / 2 + 40)}
            colors={['#B0E0E6', '#87CEEB', '#5F9EA0']}
          />
        </Circle>

        <Path
          path={useDerivedValue(
            () => `
              M ${width / 2 + 23} ${height / 2 + 100}
              A 40 110 0 1 1 ${width / 2 + 23} ${height / 2 - 100}
              L ${width / 2 + 21} ${height / 2 - 100}
              A 40 110 0 1 0 ${width / 2 + 21} ${height / 2 + 100}
              Z
            `,
            [],
          )}
          color="#D3D3D380"
        />
      </Group>
    </Canvas>
  );
};

export default Uranus;
