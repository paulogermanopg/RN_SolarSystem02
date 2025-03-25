import React from 'react';
import {Dimensions} from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  vec,
  Blur,
} from '@shopify/react-native-skia';

const {height, width} = Dimensions.get('window');

const Mercury = () => {
  const craters = [
    {x: -8, y: -5, r: 3},
    {x: 6, y: 10, r: 4},
    {x: -4, y: 7, r: 2},
    {x: 10, y: -8, r: 5},
    {x: -12, y: -10, r: 3},
  ];

  return (
    <Canvas style={{width, height}}>
      <Group>
        <Circle cx={width / 2} cy={height / 2} r={20}>
          <LinearGradient
            start={vec(width / 2 - 20, height / 2 - 10)}
            end={vec(width / 2 + 20, height / 2 + 10)}
            colors={['#C0C0C0', '#A9A9A9', '#808080']}
          />
        </Circle>

        {craters.map((crater, index) => (
          <Circle
            key={index}
            cx={width / 2 + crater.x}
            cy={height / 2 + crater.y}
            r={crater.r}
            color="#696969"
            opacity={0.6}
          />
        ))}

        <Circle cx={width / 2} cy={height / 2} r={24} opacity={0.4}>
          <Blur blur={10} />
        </Circle>
      </Group>
    </Canvas>
  );
};

export default Mercury;
