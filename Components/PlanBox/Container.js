import React, { useRef, useEffect } from "react";
import { Dimensions } from "react-native";
import useArray from "../../Hooks/useArray";
import useInput from "../../Hooks/useInput";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

const { height } = Dimensions.get("window");

export default ({
	plan,
	isEditing,
	itemsVisible,
	pageIndex,
	swiperY,
	panResponder
}) => {
	const items = useArray(plan.itemActs);
	const newKeyword = useInput("");

	const scrollRef = useRef(null);

	const onAddItem = () => {
		// func

		newKeyword.onChange("");
	};

	const onRemoveItem = i => {
		items.remove(i);
		easeIO();
	};

	const onContentSizeChange = () => {
		scrollRef.current.scroll(height);
		easeIO();
	};

	const onFocusItem = () => {
		itemsVisible.setValue(false);
		scrollRef.current.scroll(height);
		easeIO();
	};

	useEffect(() => {
		if (plan) {
			if (isEditing.value) isEditing.setValue(null);
			if (plan.itemActs != items.array) items.setArray(plan.itemActs);
		}
		easeIO();
	}, [pageIndex.value]);

	useEffect(() => {
		if (plan && plan.itemActs) items.setArray(plan.itemActs);
	}, [plan]);

	if (!plan || !plan.itemActs) return null;
	return (
		<Presenter
			plan={plan}
			isEditing={isEditing}
			itemsVisible={itemsVisible}
			items={items}
			newKeyword={newKeyword}
			scrollRef={scrollRef}
			swiperY={swiperY}
			panResponder={panResponder}
			// func
			onAddItem={onAddItem}
			onRemoveItem={onRemoveItem}
			onContentSizeChange={onContentSizeChange}
			onFocusItem={onFocusItem}
		/>
	);
};
