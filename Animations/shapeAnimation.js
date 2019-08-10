import { useRef } from "react";
import { Animated } from "react-native";

export default (defaultWidth = 0, defaultHeight = 0, defaultRadius = 0) => {
	const width = useRef(new Animated.Value(defaultWidth)).current;
	const height = useRef(new Animated.Value(defaultHeight)).current;
	const radius = useRef(new Animated.Value(defaultRadius)).current;

	const changeShape = ({
		fromWidth = width,
		fromHeight = height,
		fromRadius = radius,
		toWidth,
		toHeight,
		toRadius = 0,
		duration = 200
	}) => {
		Animated.timing(fromWidth, { toValue: toWidth, duration }).start();
		Animated.timing(fromHeight, { toValue: toHeight, duration }).start();
		Animated.timing(fromRadius, { toValue: toRadius, duration }).start();
	};

	return { width, height, radius, changeShape };
};
