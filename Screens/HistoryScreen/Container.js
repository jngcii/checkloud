import React, { useEffect } from "react";
import { Dimensions, PanResponder } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { GET_FEED } from "../../API/queries/planQueries";
import {
	getBottomSpace,
	getStatusBarHeight
} from "react-native-iphone-x-helper";
import useString from "../../Hooks/useString";
import useArray from "../../Hooks/useArray";
import useBoolean from "../../Hooks/useBoolean";
import locationAnimation from "../../Animations/locationAnimation";
import Presenter from "./Presenter";

const { width, height } = Dimensions.get("window");

export default ({ screen, historyShape }) => {
	const to = useString(20);

	const { data, refetch } = useQuery(GET_FEED, {
		variables: { to: to.value }
	});

	const stickyIndex = useArray([]);
	const feeds = useArray([]);
	const mode = useString("feed");
	const loading = useBoolean(true);

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

	useEffect(() => {
		if (data) {
			const { feed } = data;
			feeds.concat(feed);

			feed.forEach((f, index) => {
				if (f.id == "date") {
					stickyIndex.add(index + to.value - 20);
				}
			});

			setTimeout(() => loading.setValue(false), 500);
		}
	}, [data]);

	return (
		<Presenter
			stickyIndex={stickyIndex}
			feeds={feeds}
			loading={loading}
			mode={mode}
			// animation
			barX={barX}
			panResponder={panResponder}
			// func
			refetch={refetch}
		/>
	);
};
