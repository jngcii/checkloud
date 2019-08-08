import React from "react";
import useInput from "../../Hooks/useInput";
import Presenter from "./Presenter";

export default ({ addedItem, addedItemSgt }) => {
	const newTitle = useInput("");
	const newKeyword = useInput("");

	return (
		<Presenter
			addedItem={addedItem}
			newTitle={newTitle}
			newKeyword={newKeyword}
		/>
	);
};
