import { useRef } from "react";
import { Animated } from "react-native";

export default (defaultX = 0, defaultY = 0) => {
	const location = useRef(new Animated.ValueXY({ x: defaultX, y: defaultY }))
		.current;

	const changeLocation = ({ toX = 0, toY = 0, duration = 350 }) => {
		Animated.timing(location, {
			toValue: { x: toX, y: toY },
			duration
		}).start();
	};

	const swipeTrigger = ({ toX = 0, toY = 0 }) => {
		Animated.sequence([
			Animated.timing(location, {
				toValue: { x: defaultX, y: toY },
				duration: 100
			}),
			Animated.timing(location, {
				toValue: { x: toX, y: toY },
				duration: 1300
			}),
			Animated.timing(location, {
				toValue: { x: toX, y: toY },
				duration: 300
			}),
			Animated.timing(location, {
				toValue: { x: defaultX, y: toY },
				duration: 0
			})
		]).start(() => swipeTrigger({ toX, toY }));
	};

	return { location, changeLocation, swipeTrigger };
};
