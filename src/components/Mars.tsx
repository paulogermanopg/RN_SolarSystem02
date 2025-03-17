import React from 'react';
import { Dimensions } from 'react-native';
import { Canvas, Circle, Group, LinearGradient, vec, Path } from '@shopify/react-native-skia';

const { height, width } = Dimensions.get('window');

const Mars = () => {
  return (
    <Canvas style={{ width, height }}>
      <Group>
        {/* Planeta Marte */}
        <Circle cx={width / 2} cy={height / 2} r={35}>
          <LinearGradient
            start={vec(width / 2 - 35, height / 2)}
            end={vec(width / 2 + 35, height / 2)}
            colors={['#FF4500', '#8B0000']}
          />
        </Circle>

        {/* Calota Polar Norte */}
        <Path
          path={`
            M ${width / 2 - 12} ${height / 2 - 30} 
            Q ${width / 2} ${height / 2 - 40}, ${width / 2 + 12} ${height / 2 - 30}
            Q ${width / 2 + 5} ${height / 2 - 25}, ${width / 2 - 5} ${height / 2 - 25}
          `}
          color="#D8D8D8B3"
        />

        {/* Calota Polar Sul */}
        <Path
          path={`
            M ${width / 2 - 12} ${height / 2 + 28} 
            Q ${width / 2} ${height / 2 + 38}, ${width / 2 + 12} ${height / 2 + 28}
            Q ${width / 2 + 4} ${height / 2 + 26}, ${width / 2 - 4} ${height / 2 + 26}
          `}
          color="#D8D8D8B3"
        />
      </Group>
    </Canvas>
  );
};

export default Mars;
