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

const Saturn = () => {
  // Animação do balanço do anel
  const ringTilt = useSharedValue(0);

  useEffect(() => {
    ringTilt.value = withRepeat(
      withTiming(10, {duration: 2000, easing: Easing.inOut(Easing.sin)}),
      -1,
      true,
    );
  }, [ringTilt]);

  const animatedTilt = useDerivedValue(() => ringTilt.value, [ringTilt]);

  return (
    <Canvas style={{width, height}}>
      <Group>
        {/* Anel de trás - completamente preenchido */}
        <Path
          path={useDerivedValue(
            () => `
              M ${width / 2 - 110} ${height / 2 + animatedTilt.value}
              A 110 40 0 1 1 ${width / 2 + 110} ${
              height / 2 + animatedTilt.value
            }
              L ${width / 2 + 95} ${height / 2 + 15 + animatedTilt.value}
              A 95 30 0 1 0 ${width / 2 - 95} ${
              height / 2 + 15 + animatedTilt.value
            }
              Z
            `,
            [animatedTilt],
          )}
          color="#D3B38C"
        />

        {/* Saturno */}
        <Circle cx={width / 2} cy={height / 2} r={80}>
          <LinearGradient
            start={vec(width / 2 - 80, height / 2)}
            end={vec(width / 2 + 80, height / 2)}
            colors={['#F4D29C', '#E3C16F', '#C2A477']}
          />
        </Circle>

        {/* Anel da frente */}
        <Path
          path={useDerivedValue(
            () => `
                M ${width / 2 - 110} ${height / 2 - 2 + animatedTilt.value}
                L ${width / 2 + 110} ${height / 2 - 2 + animatedTilt.value}
                A 110 40 0 1 1 ${width / 2 - 110} ${height / 2 - 2 + animatedTilt.value}
                Z
                    `,
            [animatedTilt],
          )}
          color="#D3B38C"
        />
      </Group>
    </Canvas>
  );
};

export default Saturn;
