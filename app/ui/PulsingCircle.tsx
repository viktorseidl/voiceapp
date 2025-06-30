import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const NUM_CIRCLES = 3;
const DURATION = 1500;
interface Params {
  show: boolean;
  casenum: number;
  onAction: () => void;
}
const PulsingCircle: React.FC<Params> = ({ show, onAction, casenum }) => {
  const animations = useRef(
    [...Array(NUM_CIRCLES)].map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const createAnimation = (anim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };
    onAction();
    const all = animations.map((anim, index) =>
      createAnimation(anim, index * (DURATION / NUM_CIRCLES))
    );

    all.forEach((a) => a.start());

    return () => {
      all.forEach((a) => a.stop());
    };
  }, [casenum]);

  return show ? (
    <View style={styles.bigcontainer}>
      <View
        style={{
          width: "100%",
          flex: 0,
          flexDirection: "row",
          gap: 15,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 34,
        }}
      >
        <FontAwesome5 name="robot" size={37} color="#FFF" />
        <Text style={{ fontSize: 24, color: "#FFF" }}>
          MediBot hört Ihnen jetzt zu ...
        </Text>
        <FontAwesome5
          name="assistive-listening-systems"
          size={37}
          color="#FFF"
        />
      </View>
      <View style={styles.container}>
        {animations.map((anim, index) => {
          const scale = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 3],
          });

          const opacity = anim.interpolate({
            inputRange: [0, 0.7, 1],
            outputRange: [0.4, 0.2, 0],
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.circle,
                {
                  transform: [{ scale }],
                  opacity,
                },
              ]}
            />
          );
        })}

        {/* Inner circle (center mic) */}
        <Pressable onPress={() => onAction()} style={styles.innerCircle}>
          <FontAwesome name="microphone" size={36} color={"#FFF"} />
        </Pressable>
      </View>
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  bigcontainer: {
    width: "100%",
    flex: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  container: {
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ad1457",
  },
  innerCircle: {
    width: 60,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    borderRadius: 60,
    backgroundColor: "#1565c0",
  },
});

export default PulsingCircle;
