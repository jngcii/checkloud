import React from "react";
import useArray from "../../Hooks/useArray";
import useInput from "../../Hooks/useInput";
import Presenter from "./Presenter";

export default ({ plan, isMaking }) => {
	const items = useArray(plan.itemActs);
	const newKeyword = useInput("");

	const onAddItem = () => {
		// resolver
	};

	return (
		<Presenter
			plan={plan}
			isMaking={isMaking}
			items={items}
			newKeyword={newKeyword}
			// func
			onAddItem={onAddItem}
		/>
	);
};
