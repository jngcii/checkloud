import React, { useRef, useEffect } from "react";
import useArray from "../../Hooks/useArray";
import useInput from "../../Hooks/useInput";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

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
		/>
	);
};
