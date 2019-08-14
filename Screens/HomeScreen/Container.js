import React, { useRef, useEffect } from "react";
import { Dimensions, PanResponder } from "react-native";
import {
	getBottomSpace,
	getStatusBarHeight
} from "react-native-iphone-x-helper";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GET_PLANS, DEACTIVATE_PLAN } from "../../API/queries/planQueries";
import useArray from "../../Hooks/useArray";
import useString from "../../Hooks/useString";
import useBoolean from "../../Hooks/useBoolean";
import locationAnimation from "../../Animations/locationAnimation";
import shapeAnimation from "../../Animations/shapeAnimation";
import Presenter from "./Presenter";

const { width, height } = Dimensions.get("window");

export default () => {
	const {
		data: { plans },
		loading: loadingPlans
	} = useQuery(GET_PLANS);

	const [deactivatePlanMutation] = useMutation(DEACTIVATE_PLAN);

	const activePlans = plans.filter(p => p.isActive);

	const screen = useString("plan");
	const isMaking = useBoolean(false);
	const isEditing = useString(null);
	const addedItem = useArray([]);
	const addedItemSgt = useArray([]);
	const itemsVisible = useBoolean(false);
	const listVisible = useBoolean(false);
	const pageIndex = useString(1);

	const swipeRef = useRef(null);

	const swiperY = locationAnimation();
	const navY = locationAnimation(0, 0);
	const pickerY = locationAnimation(0, 150);
	const itemShape = shapeAnimation(100, 100);
	const historyShape = shapeAnimation(100, 100);

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,

		onPanResponderMove: (_, gestureState) => {
			if (!listVisible.value) {
				if (gestureState.dy <= 0)
					swiperY.location.setValue({ y: gestureState.dy });
			} else {
				if (gestureState.dy < 230) {
					swiperY.location.setValue({ y: gestureState.dy - 230 });
				}
			}
		},

		onPanResponderRelease: (_, gestureState) => {
			if (!listVisible.value) {
				if (gestureState.dy < -15) {
					swiperY.changeLocation({ toY: -230, duration: 100 });
					listVisible.setValue(true);
				} else {
					swiperY.changeLocation({ toY: 0, duration: 100 });
					listVisible.setValue(false);
				}
			} else {
				if (gestureState.dy > 15) {
					swiperY.changeLocation({ toY: 0, duration: 100 });
					listVisible.setValue(false);
				} else {
					swiperY.changeLocation({ toY: -230, duration: 100 });
					listVisible.setValue(true);
				}
			}
		}
	});

	const onPressPercentBar = id => {
		deactivatePlanMutation({ variables: { id } });
	};

	const onPressItemNav = () => {
		screen.setValue("item");
	};

	const onPressHistoryNav = () => {
		screen.setValue("history");
	};

	useEffect(() => {
		if (isMaking.value || isEditing.value) {
			navY.changeLocation({ toY: 150 });
			pickerY.changeLocation({ toY: 0 });
		} else {
			navY.changeLocation({ toY: 0 });
			pickerY.changeLocation({ toY: 150 });
		}
	}, [isMaking.value, isEditing.value]);

	useEffect(() => {
		if (screen.value == "plan") {
			itemShape.changeShape({
				toWidth: 100,
				toHeight: 100
			});
			historyShape.changeShape({
				toWidth: 100,
				toHeight: 100
			});
		} else if (screen.value == "item") {
			itemShape.changeShape({
				toWidth: width,
				toHeight: height - getBottomSpace() - getStatusBarHeight()
			});
			historyShape.changeShape({
				toWidth: 100,
				toHeight: 100
			});
		} else if (screen.value == "history") {
			itemShape.changeShape({
				toWidth: 100,
				toHeight: 100
			});
			historyShape.changeShape({
				toWidth: width,
				toHeight: height - getBottomSpace() - getStatusBarHeight()
			});
		}
	}, [screen]);

	if (loadingPlans) return null;

	return (
		<Presenter
			// state
			plans={activePlans}
			screen={screen}
			isMaking={isMaking}
			isEditing={isEditing}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			itemsVisible={itemsVisible}
			pageIndex={pageIndex}
			swipeRef={swipeRef}
			// animation
			swiperY={swiperY}
			navY={navY}
			pickerY={pickerY}
			itemShape={itemShape}
			historyShape={historyShape}
			panResponder={panResponder}
			// func
			onPressPercentBar={onPressPercentBar}
			onPressItemNav={onPressItemNav}
			onPressHistoryNav={onPressHistoryNav}
		/>
	);
};
