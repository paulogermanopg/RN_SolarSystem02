import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  vec,
  Path,
  Skia,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

// Aqui para Definir as manchas atmosféricas de Vênus
const createVenusClouds = (cx: number, cy: number, r: number) => {
  const path = Skia.Path.Make();
  path.moveTo(cx - r * 0.1, cy - r * 0.5);
  path.cubicTo(
    cx - r * 0.3,
    cy - r * 0.3,
    cx + r * 0.1,
    cy - r * 0.2,
    cx + r * 0.5,
    cy,
  );
  path.cubicTo(
    cx + r * 0.1,
    cy + r * 0.2,
    cx - r * 0.9,
    cy + r * 0.3,
    cx - r * 0.6,
    cy,
  );
  path.close();
  return path;
};

const Venus = () => {
  const cloudOpacity = useSharedValue(0.2);

  useEffect(() => {
    cloudOpacity.value = withRepeat(
      withTiming(1, {duration: 1100, easing: Easing.ease}),
      -1,
      true,
    );
  }, [cloudOpacity]);

  const animatedCloudOpacity = useDerivedValue(() => cloudOpacity.value);

  return (
    <Canvas style={{width, height}}>
      <Group>
        <Circle cx={width / 2} cy={height / 2} r={40}>
          <LinearGradient
            start={vec(width / 2 - 40, height / 2)}
            end={vec(width / 2 + 40, height / 2)}
            colors={['#E1A95F', '#D4A017', '#B8860B']}
          />
        </Circle>

        <Path
          path={createVenusClouds(width / 2, height / 2, 60)}
          color="rgba(255, 215, 100, 0.5)"
          opacity={animatedCloudOpacity}
        />

        <Path
          path={createVenusClouds(width / 2 + 18, height / 2, 45)}
          color="rgba(255, 215, 100, 0.5)"
          opacity={animatedCloudOpacity}
        />

        <Path
          path={createVenusClouds(width / 2 + 10, height / 2 + 20, 45)}
          color="rgba(255, 200, 90, 0.3)"
          opacity={animatedCloudOpacity}
        />

        <Path
          path={createVenusClouds(width / 2 - 5, height / 2 + 15, 45)}
          color="rgba(230, 180, 80, 0.6)"
          opacity={animatedCloudOpacity}
        />

        <Path
          path={createVenusClouds(width / 2 + 10, height / 2 - 15, 55)}
          color="rgba(255, 200, 90, 0.5)"
          opacity={animatedCloudOpacity}
        />
      </Group>
    </Canvas>
  );
};

export default Venus;
