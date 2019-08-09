import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import Presenter from "./Presenter";

const { width } = Dimensions.get("window");

export default ({
	plans,
	addedItem,
	addedItemSgt,
	addedItemAct,
	scrollRef
}) => {
	useEffect(() => {
		setTimeout(() =>
			scrollRef.current.scrollTo({ x: width, animated: false })
		);
	}, []);

	return (
		<Presenter
			plans={plans}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			scrollRef={scrollRef}
		/>
	);
};
