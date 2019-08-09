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
	scrollRef
}) => {
	const onSwipe = e => {
		const { x } = e.nativeEvent.contentOffset;

		if (x < width / 2) {
			if (!isMaking.value) isMaking.setValue(true);
		} else {
			if (isMaking.value) isMaking.setValue(false);
		}
	};

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
