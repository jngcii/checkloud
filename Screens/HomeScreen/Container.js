import React from "react";
import useArray from "../../Hooks/useArray";
import Presenter from "./Presenter";

export default () => {
	const addedItem = useArray([]);
	const addedItemSgt = useArray([]);
	const addedItemAct = useArray([]);

	return (
		<Presenter
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			addedItemAct={addedItemAct}
		/>
	);
};
