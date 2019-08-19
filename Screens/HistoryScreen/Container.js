import React, { useEffect } from "react";
import { Dimensions, PanResponder } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { GET_HISTORIES } from "../../API/queries/historyQueries";
import {
	getBottomSpace,
	getStatusBarHeight
} from "react-native-iphone-x-helper";
import useString from "../../Hooks/useString";
import locationAnimation from "../../Animations/locationAnimation";
import Presenter from "./Presenter";

const { width, height } = Dimensions.get("window");

export default ({ screen, historyShape }) => {
	const today = new Date();

	// history 불러는 것은 feed screen, calendar screen 에서 각각 다른 방식으로 가져오게 하기

	// feed     : plan 10개 단위로 잘라서 가져와서 object state에 추가하는 방식으로,
	//			  history screen 에서 query를 가져와서 유지한다.

	// calendar : plan을 한달 단위로 가져오기

	const {
		data: { histories },
		loading: loadingHisories
	} = useQuery(GET_HISTORIES);

	const history = histories.filter(
		h => h.year == today.getFullYear() && h.month == today.getMonth()
	);

	const mode = useString("feed");

	const barX = locationAnimation();

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
				historyShape.height.setValue(
					height -
						getBottomSpace() -
						getStatusBarHeight() -
						gestureState.dy
				);

				if (historyShape.height._value <= width) {
					historyShape.width.setValue(
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
				historyShape.changeShape({
					toHeight: height - getBottomSpace() - getStatusBarHeight(),
					toWidth: width
				});
			} else {
				screen.setValue("plan");
			}
		}
	});

	useEffect(() => {
		if (mode.value == "feed" && barX.location.x._value != 0)
			barX.changeLocation({ toX: 0, duration: 150 });
		else if (
			mode.value == "calendar" &&
			barX.location.x._value != (width - 40) / 2
		)
			barX.changeLocation({ toX: (width - 40) / 2, duration: 150 });
	}, [mode]);

	if (loadingHisories) return null;

	return (
		<Presenter
			history={history}
			mode={mode}
			// animation
			barX={barX}
			panResponder={panResponder}
		/>
	);
};
