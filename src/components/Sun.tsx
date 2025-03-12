import React, {useEffect, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  vec,
} from '@shopify/react-native-skia';
import {
  useSharedValue,
  useDerivedValue,
  withTiming,
  Easing,
  runOnJS,
  withRepeat,
} from 'react-native-reanimated';

const {height, width} = Dimensions.get('window');

interface Sunspot {
  offsetX: number;
  offsetY: number;
  radius: number;
}

const generateSunspots = (size: number): Sunspot[] => {
  const spots: Sunspot[] = [];
  const numSpots = Math.floor(Math.random() * 4) + 5;

  for (let i = 0; i < numSpots; i++) {
    let validSpot = false;
    let offsetX: number = 0;
    let offsetY: number = 0;
    let radius: number = 0;

    while (!validSpot) {
      offsetX = (Math.random() - 0.5) * size * 0.9;
      offsetY = (Math.random() - 0.5) * size * 0.9;
      radius = Math.random() * (size * 0.05) + size * 0.02;

      validSpot = !spots.some(
        s =>
          Math.hypot(s.offsetX - offsetX, s.offsetY - offsetY) <
          s.radius + radius + 5,
      );
    }

    spots.push({offsetX, offsetY, radius});
  }

  return spots;
};

const Sun = () => {
  const opacity = useSharedValue(0.3);
  const ringRadius = useSharedValue(100);
  const ringOpacity = useSharedValue(0.5);

  const animateRing = useCallback(() => {
    ringRadius.value = 100;
    ringOpacity.value = 0.5;

    ringRadius.value = withTiming(160, {
      duration: 2000,
      easing: Easing.out(Easing.ease),
    });

    ringOpacity.value = withTiming(
      0,
      { duration: 2000, easing: Easing.out(Easing.ease) },
      () => {
        runOnJS(animateRing)();
      },
    );
  }, [ringOpacity, ringRadius]);

  useEffect(() => {
    animateRing();
  }, [animateRing]);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {duration: 2000, easing: Easing.ease}),
      -1,
      true,
    );
  }, [opacity]);

  const animatedRingRadius = useDerivedValue(() => ringRadius.value);
  const animatedRingOpacity = useDerivedValue(() => ringOpacity.value);

  const sunspots = generateSunspots(100);
  const animatedOpacity = useDerivedValue(() => opacity.value);

  return (
    <Canvas style={{width, height}}>
      <Group>
        <Circle cx={width / 2} cy={height / 2} r={100}>
          <LinearGradient
            start={vec(width / 2 - 100, height / 2)}
            end={vec(width / 2 + 100, height / 2)}
            colors={['#FFA500', '#FF4500']}
          />
        </Circle>

        <Circle
          cx={width / 2}
          cy={height / 2}
          r={animatedRingRadius}
          color="rgba(255, 165, 0, 1)"
          opacity={animatedRingOpacity}
          strokeWidth={5}
          style="stroke"
        />

        {sunspots.map((spot, index) => (
          <Circle
            key={`sunspot-${index}`}
            cx={width / 2 + spot.offsetX}
            cy={height / 2 + spot.offsetY}
            r={spot.radius}
            color="black"
            opacity={animatedOpacity}
          />
        ))}
      </Group>
    </Canvas>
  );
};

export default Sun;
