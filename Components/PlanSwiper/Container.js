import React, { useRef, useEffect } from "react";
import { Dimensions, PanResponder } from "react-native";
import useBoolean from "../../Hooks/useBoolean";
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
	const scrollEnabled = useBoolean(true);
	const isScrollingPrv = useBoolean(false);

	const previewRef = useRef(null);

	const swiperY = locationAnimation();

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,

		onPanResponderMove: (_, gestureState) => {
			scrollEnabled.setValue(false);

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
			scrollEnabled.setValue(true);

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

	useEffect(() => {
		previewRef.current.scrollTo({
			x: pageIndex.value * 140 - (width - 180) / 2
		});
	}, [pageIndex]);

	useEffect(() => {
		if (listVisible.value && scrollEnabled.value)
			scrollEnabled.setValue(false);
	}, [listVisible]);

	useEffect(() => {
		if (!listVisible.value && swiperY.location.y_value != 0)
			swiperY.changeLocation({ toY: 0 });
	}, [listVisible]);

	return (
		<Presenter
			plans={plans}
			isEditing={isEditing}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			itemsVisible={itemsVisible}
			listVisible={listVisible}
			pageIndex={pageIndex}
			swipeRef={swipeRef}
			previewRef={previewRef}
			scrollEnabled={scrollEnabled}
			isScrollingPrv={isScrollingPrv}
			//animation
			swiperY={swiperY}
			panResponder={panResponder}
			//func
			onSwipe={onSwipe}
		/>
	);
};
