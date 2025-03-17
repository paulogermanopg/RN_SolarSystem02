import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Canvas, Circle, Group, LinearGradient, vec, Path } from '@shopify/react-native-skia';
import { useSharedValue, useDerivedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

const Mars = () => {
  const fobosOrbit = useSharedValue(0);
  const deimosOrbit = useSharedValue(0);

  useEffect(() => {
    fobosOrbit.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 4000, easing: Easing.linear }),
      -1
    );
    deimosOrbit.value = withRepeat(
      withTiming(2 * Math.PI, { duration: 7000, easing: Easing.linear }),
      -1
    );
  }, [fobosOrbit, deimosOrbit]);

  const fobosX = useDerivedValue(() => width / 2 + 50 * Math.cos(fobosOrbit.value));
  const fobosY = useDerivedValue(() => height / 2 + 25 * Math.sin(fobosOrbit.value));

  const deimosX = useDerivedValue(() => width / 2 + 70 * Math.cos(deimosOrbit.value));
  const deimosY = useDerivedValue(() => height / 2 + 40 * Math.sin(deimosOrbit.value));

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

      {/* Luas de Marte */}
      <Group>
        <Circle cx={fobosX} cy={fobosY} r={5} color="#A9A9A9" />
        <Circle cx={deimosX} cy={deimosY} r={4} color="#a27142" />
      </Group>
    </Canvas>
  );
};

export default Mars;

