import { LayoutAnimation } from "react-native";

export const easeIO = (duration = 250) =>
	LayoutAnimation.configureNext({
		...LayoutAnimation.Presets.easeInEaseOut,
		duration
	});
