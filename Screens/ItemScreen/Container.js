import React from "react";
import { Dimensions, PanResponder } from "react-native";
import {
	getBottomSpace,
	getStatusBarHeight
} from "react-native-iphone-x-helper";
import Presenter from "./Presenter";

const { width, height } = Dimensions.get("window");

export default ({ screen, itemShape }) => {
	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,

		onPanResponderMove: (_, gestureState) => {
			if (
				height -
					getBottomSpace() -
					getStatusBarHeight() -
					gestureState.dy >
				100
			) {
				itemShape.height.setValue(
					height -
						getBottomSpace() -
						getStatusBarHeight() -
						gestureState.dy
				);

				if (itemShape.height._value <= width) {
					itemShape.width.setValue(
						height -
							getBottomSpace() -
							getStatusBarHeight() -
							gestureState.dy
					);
				}
			}
		},

		onPanResponderRelease: (_, gestureState) => {
			if (gestureState.dy < 200) {
				itemShape.changeShape({
					toHeight: height - getBottomSpace() - getStatusBarHeight(),
					toWidth: width
				});
			} else {
				screen.setValue("plan");
			}
		}
	});

	return <Presenter panResponder={panResponder} />;
};
