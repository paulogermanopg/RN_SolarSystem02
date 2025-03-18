import React, {useEffect} from 'react';
import {Dimensions, View} from 'react-native';
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
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

const Jupiter = () => {
  // Animação da Grande Mancha Vermelha
  const stormX = useSharedValue(width / 2 + 20);

  //  useEffect(() => {
  //    stormX.value = withRepeat(
  //      withTiming(width / 2 + 30, {
  //        duration: 4000,
  //        easing: Easing.linear,
  //      }),
  //      -1,
  //      true
  //    );
  //  }, [stormX]);

  const animatedStormX = useDerivedValue(() => stormX.value);

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

        <Path
          path={`
            M ${width / 2 - 70} ${height / 2 - 45}
            Q ${width / 2} ${height / 2 - 50}, ${width / 2 + 60} ${
            height / 2 - 40
          }
            T ${width / 2 - 50} ${height / 2 - 45}
          `}
          color="#B5835A"
        />

        <Path
          path={`
            M ${width / 2 - 50} ${height / 2 + 10}
            Q ${width / 2} ${height / 2 + 15}, ${width / 2 + 50} ${
            height / 2 + 10
          }
            T ${width / 2 - 50} ${height / 2 + 10}
          `}
          color="#ddbca6"
        />

        <Path
          path={`
            M ${animatedStormX.value - 20} ${height / 2 + 30}
            Q ${animatedStormX.value} ${height / 2 + 20}, ${
            animatedStormX.value + 20
          } ${height / 2 + 30}
            Q ${animatedStormX.value} ${height / 2 + 40}, ${
            animatedStormX.value - 20
          } ${height / 2 + 30}
          `}
          color="#D96F4E"
        />
      </Group>
    </Canvas>
  );
};

export default Jupiter;
