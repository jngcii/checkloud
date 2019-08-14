import React, { useEffect } from "react";
import { Dimensions, PanResponder } from "react-native";
import locationAnimation from "../../Animations/locationAnimation";
import Presenter from "./Presenter";

const { width } = Dimensions.get("window");

export default ({
	plans,
	isMaking,
	isEditing,
	addedItem,
	addedItemSgt,
	itemsVisible,
	listVisible,
	pageIndex,
	swipeRef
}) => {
	const swiperY = locationAnimation();

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

	const onSwipe = e => {
		const { x } = e.nativeEvent.contentOffset;

		if (x < width / 2) {
			if (!isMaking.value) isMaking.setValue(true);
			pageIndex.setValue(0);
		} else {
			if (isMaking.value) isMaking.setValue(false);

			for (let i = 1; i < 10; i++) {
				if (
					x >= width / 2 + (i - 1) * width &&
					x < width / 2 + i * width
				) {
					pageIndex.setValue(i);
				}
			}
		}
	};

	useEffect(() => {
		setTimeout(() =>
			swipeRef.current.scrollTo({ x: width, animated: true })
		);
	}, [swipeRef.current]);

	return (
		<Presenter
			plans={plans}
			isEditing={isEditing}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			itemsVisible={itemsVisible}
			pageIndex={pageIndex}
			swipeRef={swipeRef}
			//animation
			swiperY={swiperY}
			panResponder={panResponder}
			//func
			onSwipe={onSwipe}
		/>
	);
};
