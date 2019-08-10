import React, { useEffect } from "react";
import useArray from "../../Hooks/useArray";
import useInput from "../../Hooks/useInput";
import useBoolean from "../../Hooks/useBoolean";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ plan, isEditing, pageIndex }) => {
	const items = useArray(plan.itemActs);
	const newKeyword = useInput("");
	const detailVisible = useBoolean(false);

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

	useEffect(() => {
		if (detailVisible.value) detailVisible.setValue(false);
		easeIO();
	}, [isEditing.value]);

	return (
		<Presenter
			plan={plan}
			isEditing={isEditing}
			items={items}
			newKeyword={newKeyword}
			detailVisible={detailVisible}
			// func
			onAddItem={onAddItem}
			onRemoveItem={onRemoveItem}
		/>
	);
};
