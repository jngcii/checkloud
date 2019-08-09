import React from "react";
import useInput from "../../Hooks/useInput";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ addedItem, addedItemSgt }) => {
	const newTitle = useInput("");
	const newKeyword = useInput("");

	const onAddItem = () => {
		if (newKeyword.value == "") return;

		const newItem = { keyword: newKeyword.value, color: "#000" };

		addedItem.add(newItem);
		addedItemSgt.add(newItem);

		newKeyword.onChange("");

		easeIO();
	};

	const onRemoveItem = item => {
		addedItem.remove(item);
		addedItemSgt.remove(item);

		easeIO();
	};

	return (
		<Presenter
			addedItem={addedItem}
			newTitle={newTitle}
			newKeyword={newKeyword}
			// func
			onAddItem={onAddItem}
			onRemoveItem={onRemoveItem}
		/>
	);
};
