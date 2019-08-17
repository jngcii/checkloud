import React, { useRef, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import { EDIT_ITEM } from "../../API/queries/itemQueries";
import useInput from "../../Hooks/useInput";
import useString from "../../Hooks/useString";
import useBoolean from "../../Hooks/useBoolean";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ item, stack, swiping, editing, onRemoveItem }) => {
	const [editItemMutation] = useMutation(EDIT_ITEM);

	const newKeyword = useInput(item.keyword);
	const newColor = useString(item.color);
	const colorVisible = useBoolean(false);

	const swipeRef = useRef(null);

	const onPressEditBtn = () => {
		swipeRef.current.recenter();
		if (editing.value != item.id) editing.setValue(item.id);
		easeIO();
	};

	const onEndEditing = () => {
		editItemMutation({
			variables: {
				id: item.id,
				keyword: newKeyword.value,
				color: newColor.value
			}
		});

		editing.setValue(null);
		colorVisible.setValue(false);
	};

	useEffect(() => {
		if (swiping.value != (item.id && null)) swipeRef.current.recenter();
	}, [swiping]);

	useEffect(() => {
		newKeyword.onChange(item.keyword);
		newColor.setValue(item.color);
	}, [item]);

	return (
		<Presenter
			// props
			item={item}
			stack={stack}
			swiping={swiping}
			editing={editing}
			// state
			newKeyword={newKeyword}
			newColor={newColor}
			colorVisible={colorVisible}
			swipeRef={swipeRef}
			// func
			onRemoveItem={onRemoveItem}
			onPressEditBtn={onPressEditBtn}
			onEndEditing={onEndEditing}
		/>
	);
};
