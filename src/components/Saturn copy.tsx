import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  vec,
  Oval,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const Saturn = () => {
  // Valor animado para o balanço do anel
  const ringTilt = useSharedValue(0);

  useEffect(() => {
    ringTilt.value = withRepeat(
      withTiming(5, {duration: 1000, easing: Easing.inOut(Easing.sin)}),
      -1,
      true,
    );
  }, [ringTilt]);

  const animatedTilt = useDerivedValue(() => ringTilt.value, [ringTilt]);

  return (
    <Canvas style={{width, height}}>
      <Group>
        {/* Saturno com cores realistas */}
        <Circle cx={width / 2} cy={height / 2} r={80}>
          <LinearGradient
            start={vec(width / 2 - 80, height / 2)}
            end={vec(width / 2 + 80, height / 2)}
            colors={['#F4D29C', '#E3C16F', '#C2A477']}
          />
        </Circle>

        {/* Anel com oscilação */}
        <Oval
          rect={useDerivedValue(
            () => ({
              x: width / 2 - 110,
              y: height / 2 - 10 + animatedTilt.value,
              width: 220,
              height: 40,
            }),
            [animatedTilt],
          )}
          color="#D3B38C"
        />
      </Group>
    </Canvas>
  );
};

export default Saturn;
