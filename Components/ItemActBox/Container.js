import React, { useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import { EDIT_ITEM_ACT, CHECK_ITEM } from "../../API/queries/itemQueries";
import useBoolean from "../../Hooks/useBoolean";
import useInput from "../../Hooks/useInput";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ item, isEditing, isActive, onRemoveItem, move, moveEnd }) => {
	const [checkItemMutation] = useMutation(CHECK_ITEM);
	const [editItemActMutation] = useMutation(EDIT_ITEM_ACT);

	const detailVisible = useBoolean(false);
	const newKeyword = useInput(item.keyword);

	const onPressDetail = () => {
		detailVisible.setValue(!detailVisible.value);
		easeIO();
	};

	const onCheckItem = () => {
		checkItemMutation({
			variables: { id: item.id },
			awaitRefetchQueries: true
		});
		easeIO();
	};

	const onEndEditingKeyword = () => {
		if (newKeyword.value == "") {
			newKeyword.onChange(item.keyword);
			return;
		}

		editItemActMutation({
			variables: { id: item.id, keyword: newKeyword.value },
			awaitRefetchQueries: true
		});
	};

	useEffect(() => {
		if (detailVisible.value) detailVisible.setValue(false);
		easeIO();
	}, [isEditing]);

	useEffect(() => {
		newKeyword.onChange(item.keyword);
		easeIO();
	}, [item]);

	return (
		<Presenter
			item={item}
			isEditing={isEditing}
			isActive={isActive}
			detailVisible={detailVisible}
			newKeyword={newKeyword}
			// func
			onPressDetail={onPressDetail}
			onCheckItem={onCheckItem}
			onEndEditingKeyword={onEndEditingKeyword}
			onRemoveItem={onRemoveItem}
			move={move}
			moveEnd={moveEnd}
		/>
	);
};
