import React, { useEffect } from "react";
import useInput from "../../Hooks/useInput";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ item, addedItem, isActive, onRemoveItem, move, moveEnd }) => {
	const newKeyword = useInput(item.keyword);

	const onEndEditingKeyword = () => {
		if (newKeyword.value == "") {
			newKeyword.onChange(item.keyword);
			return;
		}

		const newItem = {
			...item,
			keyword: newKeyword.value
		};

		addedItem.replace({ i: item, n: newItem });

		setTimeout(() => console.log(addedItem), 200);
	};

	useEffect(() => {
		newKeyword.onChange(item.keyword);
		easeIO();
	}, [item]);

	return (
		<Presenter
			item={item}
			isActive={isActive}
			newKeyword={newKeyword}
			// func
			onEndEditingKeyword={onEndEditingKeyword}
			onRemoveItem={onRemoveItem}
			move={move}
			moveEnd={moveEnd}
		/>
	);
};
