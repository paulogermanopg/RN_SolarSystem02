import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Canvas, Circle, Group, LinearGradient, vec, Path } from '@shopify/react-native-skia';
import { useSharedValue, useDerivedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

const Earth = () => {
  const moonOrbit = useSharedValue(0);

  useEffect(() => {
    moonOrbit.value = withRepeat(
      withTiming(2 * Math.PI, {
        duration: 6000,
        easing: Easing.linear,
      }),
      -1
    );
  }, [moonOrbit]);

  const moonX = useDerivedValue(() => width / 2 + 80 * Math.cos(moonOrbit.value));
  const moonY = useDerivedValue(() => height / 2 + 80 * Math.sin(moonOrbit.value));

  // Crateras
  const craterXOne = useDerivedValue(() =>
    moonX.value + 6 * Math.cos(moonOrbit.value + 5.3)
  );
  const craterYOne = useDerivedValue(() =>
    moonY.value + 6 * Math.sin(moonOrbit.value + 5.3)
  );

  const craterXTwo = useDerivedValue(() =>
    moonX.value + 8 * Math.cos(moonOrbit.value + 1.5)
  );
  const craterYTwo = useDerivedValue(() =>
    moonY.value + 8 * Math.sin(moonOrbit.value + 1.5)
  );

  const craterXThree = useDerivedValue(() =>
    moonX.value + 5 * Math.cos(moonOrbit.value + 2.8)
  );
  const craterYThree = useDerivedValue(() =>
    moonY.value + 5 * Math.sin(moonOrbit.value + 2.8)
  );

  const craters = [
    { cx: craterXOne, cy: craterYOne, r: 3 },
    { cx: craterXTwo, cy: craterYTwo, r: 4 },
    { cx: craterXThree, cy: craterYThree, r: 3 },
  ];

  return (
    <Canvas style={{ width, height }}>
      <Group>
        {/* Terra */}
        <Circle cx={width / 2} cy={height / 2} r={50}>
          <LinearGradient
            start={vec(width / 2 - 50, height / 2)}
            end={vec(width / 2 + 50, height / 2)}
            colors={['#1E90FF', '#00008B']}
          />
        </Circle>

        {/* Continente Verde */}
        <Path
          path={`M ${width / 2 - 10} ${height / 2 - 5} 
                 Q ${width / 2 - 35} ${height / 2 + 10}, ${width / 2 - 10} ${height / 2 + 35} 
                 Q ${width / 2 - 5} ${height / 2 + 70}, ${width / 2 + 15} ${height / 2 + 10}`}
          color="#228B22"
        />

        {/* Polo Norte Branco */}
        <Path
          path={`M ${width / 2 - 20} ${height / 2 - 40} 
                 Q ${width / 2} ${height / 2 - 50}, ${width / 2 + 20} ${height / 2 - 40} 
                 Q ${width / 2 + 5} ${height / 2 - 35}, ${width / 2 - 5} ${height / 2 - 35}`}
          color="#FFFFFF"
        />

        {/* Lua e crateras */}
        <Group>
          <Circle cx={moonX} cy={moonY} r={15} color="#C0C0C0" />
          {craters.map((crater, index) => {
            return (
              <Circle key={index} cx={crater.cx} cy={crater.cy} r={crater.r} color="#A9A9A9" />
            );
          })}
        </Group>
      </Group>
    </Canvas>
  );
};

export default Earth;
