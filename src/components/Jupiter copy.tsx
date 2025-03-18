import React, {useEffect} from 'react';
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

const Jupiter = () => {
  // Valor animado para a tempestade
  const stormX = useSharedValue(width / 2 + 40);

  useEffect(() => {
    stormX.value = withRepeat(
      withTiming(width / 2 + 30, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      true
    );
  }, [stormX]);

  // Computa a posição animada da tempestade
  const animatedStormX = useDerivedValue(() => stormX.value, [stormX]);

  return (
    <Canvas style={{width, height}}>
      <Group>
        <Circle cx={width / 2} cy={height / 2} r={90}>
          <LinearGradient
            start={vec(width / 2 - 90, height / 2)}
            end={vec(width / 2 + 90, height / 2)}
            colors={['#E3C16F', '#D69E62']}
          />
        </Circle>

        {/* Faixas atmosféricas */}
        <Path
          path={`
            M ${width / 2 - 70} ${height / 2 - 45}
            Q ${width / 2} ${height / 2 - 50}, ${width / 2 + 60} ${height / 2 - 40}
            T ${width / 2 - 50} ${height / 2 - 45}
          `}
          color="#B5835A"
        />
        <Path
          path={`
            M ${width / 2 - 60} ${height / 2 - 30}
            Q ${width / 2 - 50} ${height / 2 + 10}, ${width / 2 + 50} ${height / 2 - 10}
            T ${width / 2 - 30} ${height / 2 + 20}
          `}
          color="#c78a79"
        />
        <Path
          path={`
            M ${width / 2 - 70} ${height / 2 + 10}
            Q ${width / 2} ${height / 2 + 15}, ${width / 2 + 50} ${height / 2 + 10}
            T ${width / 2 - 50} ${height / 2 + 10}
          `}
          color="#ddbca6"
        />

        {/* Grande Mancha Vermelha (Agora animada corretamente) */}
        <Path
          path={useDerivedValue(
            () => `
            M ${animatedStormX.value - 20} ${height / 2 + 30}
            Q ${animatedStormX.value} ${height / 2 + 20}, ${animatedStormX.value + 20} ${height / 2 + 30}
            Q ${animatedStormX.value} ${height / 2 + 40}, ${animatedStormX.value - 20} ${height / 2 + 30}
          `,
            [animatedStormX]
          )}
          color="#D96F4E"
        />
      </Group>
    </Canvas>
  );
};

export default Jupiter;
