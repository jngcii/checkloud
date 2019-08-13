import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Presenter from "./Presenter";

const { width } = Dimensions.get("window");

export default ({
	plans,
	isMaking,
	isEditing,
	addedItem,
	addedItemSgt,
	addedItemAct,
	itemsVisible,
	pageIndex,
	swipeRef
}) => {
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
			//func
			onSwipe={onSwipe}
		/>
	);
};
