import { LayoutAnimation } from "react-native";

export const easeIO = (duration = 200) =>
	LayoutAnimation.configureNext({
		...LayoutAnimation.Presets.easeInEaseOut,
		duration
	});
