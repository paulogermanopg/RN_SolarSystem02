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

const Uranus = () => {
  const titaniaOrbit = useSharedValue(0);
  const mirandaOrbit = useSharedValue(0);
  const umbrielOrbit = useSharedValue(0);
  const arielOrbit = useSharedValue(0);
  const setebosOrbit = useSharedValue(0);
  const oberonOrbit = useSharedValue(0);
  const trinculoOrbit = useSharedValue(0);
  const puckOrbit = useSharedValue(0);

  useEffect(() => {
    titaniaOrbit.value = withRepeat(
      withTiming(2 * Math.PI, {duration: 4000, easing: Easing.linear}),
      -1,
    );
    mirandaOrbit.value = withRepeat(
      withTiming(2 * Math.PI, {duration: 7000, easing: Easing.linear}),
      -1,
    );
    umbrielOrbit.value = withRepeat(
      withTiming(2 * Math.PI, {duration: 3000, easing: Easing.linear}),
      -1,
    );
    arielOrbit.value = withRepeat(
      withTiming(2 * Math.PI, {duration: 6000, easing: Easing.linear}),
      -1,
    );
    setebosOrbit.value = withRepeat(
      withTiming(2 * Math.PI, {duration: 3500, easing: Easing.linear}),
      -1,
    );
    oberonOrbit.value = withRepeat(
      withTiming(2 * Math.PI, {duration: 2000, easing: Easing.linear}),
      -1,
    );
    trinculoOrbit.value = withRepeat(
      withTiming(2 * Math.PI, {duration: 5000, easing: Easing.linear}),
      -1,
    );
    puckOrbit.value = withRepeat(
      withTiming(2 * Math.PI, {duration: 8000, easing: Easing.linear}),
      -1,
    );
  }, [
    titaniaOrbit,
    mirandaOrbit,
    umbrielOrbit,
    arielOrbit,
    setebosOrbit,
    oberonOrbit,
    trinculoOrbit,
    puckOrbit,
  ]);

  const titaniaX = useDerivedValue(
    () => width / 2 + 50 * Math.cos(titaniaOrbit.value),
  );
  const titaniaY = useDerivedValue(
    () => height / 2 + 25 * Math.sin(titaniaOrbit.value),
  );

  const mirandaX = useDerivedValue(
    () => width / 2 + 70 * Math.cos(mirandaOrbit.value),
  );
  const mirandaY = useDerivedValue(
    () => height / 2 + 40 * Math.sin(mirandaOrbit.value),
  );

  const umbrielX = useDerivedValue(
    () => width / 2 + 80 * Math.cos(umbrielOrbit.value),
  );
  const umbrielY = useDerivedValue(
    () => height / 2 + 50 * Math.sin(umbrielOrbit.value),
  );

  const arielX = useDerivedValue(
    () => width / 2 + 100 * Math.cos(arielOrbit.value),
  );
  const arielY = useDerivedValue(
    () => height / 2 + 70 * Math.sin(arielOrbit.value),
  );

  const setebosX = useDerivedValue(
    () => width / 2 + 60 * Math.cos(setebosOrbit.value),
  );
  const setebosY = useDerivedValue(
    () => height / 2 + 95 * Math.sin(setebosOrbit.value),
  );

  const oberonX = useDerivedValue(
    () => width / 2 + 100 * Math.cos(oberonOrbit.value),
  );
  const oberonY = useDerivedValue(
    () => height / 2 + 80 * Math.sin(oberonOrbit.value),
  );

  const trinculoX = useDerivedValue(
    () => width / 2 + 75 * Math.cos(trinculoOrbit.value),
  );
  const trinculoY = useDerivedValue(
    () => height / 2 + 75 * Math.sin(trinculoOrbit.value),
  );

  const puckX = useDerivedValue(
    () => width / 2 + 70 * Math.cos(puckOrbit.value),
  );
  const puckY = useDerivedValue(
    () => height / 2 + 70 * Math.sin(puckOrbit.value),
  );

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

      {/* Luas de Urano */}
      <Group>
        <Circle cx={titaniaX} cy={titaniaY} r={5} color="#A8A0A0" />
        <Circle cx={mirandaX} cy={mirandaY} r={4} color="#B0C4C4" />
        <Circle cx={umbrielX} cy={umbrielY} r={5} color="#5A4D41" />
        <Circle cx={arielX} cy={arielY} r={4} color="#D3D3D3" />
        <Circle cx={setebosX} cy={setebosY} r={5} color="#A9A9A9" />
        <Circle cx={oberonX} cy={oberonY} r={4} color="#8B6F60" />
        <Circle cx={trinculoX} cy={trinculoY} r={5} color="#A9A9A9" />
        <Circle cx={puckX} cy={puckY} r={4} color="#a27142" />
      </Group>
    </Canvas>
  );
};

export default Uranus;
