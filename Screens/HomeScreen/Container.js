import React, { useRef, useEffect } from "react";
import { Dimensions } from "react-native";
import {
	getBottomSpace,
	getStatusBarHeight
} from "react-native-iphone-x-helper";
import { useQuery } from "react-apollo-hooks";
import { GET_PLANS } from "../../API/queries/planQueries";
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

	const screen = useString("plan");
	const isMaking = useBoolean(false);
	const isEditing = useString(null);
	const addedItem = useArray([]);
	const addedItemSgt = useArray([]);
	const addedItemAct = useArray([]);
	const pageIndex = useString(1);

	const scrollRef = useRef(null);

	const navY = locationAnimation(0, 0);
	const pickerY = locationAnimation(0, 150);
	const itemShape = shapeAnimation(100, 100);
	const historyShape = shapeAnimation(100, 100);

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
			plans={plans}
			screen={screen}
			isMaking={isMaking}
			isEditing={isEditing}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			addedItemAct={addedItemAct}
			pageIndex={pageIndex}
			scrollRef={scrollRef}
			// animation
			navY={navY}
			pickerY={pickerY}
			itemShape={itemShape}
			historyShape={historyShape}
			// func
			onPressItemNav={onPressItemNav}
			onPressHistoryNav={onPressHistoryNav}
		/>
	);
};
