import React, { useEffect } from "react";
import useArray from "../../Hooks/useArray";
import useInput from "../../Hooks/useInput";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ plan, isEditing, itemsVisible, pageIndex }) => {
	const items = useArray(plan.itemActs);
	const newKeyword = useInput("");

	const onAddItem = () => {
		// func

		newKeyword.onChange("");
	};

	const onRemoveItem = i => {
		items.remove(i);
		easeIO();
	};

	useEffect(() => {
		if (isEditing.value) isEditing.setValue(null);
		if (plan.itemActs != items.array) items.setArray(plan.itemActs);
		easeIO();
	}, [pageIndex.value]);

	return (
		<Presenter
			plan={plan}
			isEditing={isEditing}
			itemsVisible={itemsVisible}
			items={items}
			newKeyword={newKeyword}
			// func
			onAddItem={onAddItem}
			onRemoveItem={onRemoveItem}
		/>
	);
};
