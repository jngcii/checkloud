import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Presenter from "./Presenter";

const { width } = Dimensions.get("window");

export default ({
	plans,
	isMaking,
	addedItem,
	addedItemSgt,
	addedItemAct,
	pageIndex,
	scrollRef
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
		console.log(pageIndex.value);
	}, [pageIndex]);

	useEffect(() => {
		setTimeout(() =>
			scrollRef.current.scrollTo({ x: width, animated: false })
		);
	}, [scrollRef.current]);

	return (
		<Presenter
			plans={plans}
			isMaking={isMaking}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			scrollRef={scrollRef}
			//func
			onSwipe={onSwipe}
		/>
	);
};
