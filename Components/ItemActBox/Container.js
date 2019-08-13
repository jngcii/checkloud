import React, { useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import { CHECK_ITEM } from "../../API/queries/itemQueries";
import useBoolean from "../../Hooks/useBoolean";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ item, isEditing, isActive, onRemoveItem, move, moveEnd }) => {
	const [checkItemMutation] = useMutation(CHECK_ITEM);

	const detailVisible = useBoolean(false);

	const onPressDetail = () => {
		detailVisible.setValue(!detailVisible.value);
		easeIO();
	};

	const onCheckItem = () => {
		checkItemMutation({
			variables: { id: item.id },
			awaitRefetchQueries: true
		});
	};

	useEffect(() => {
		if (detailVisible.value) detailVisible.setValue(false);
		easeIO();
	}, [isEditing]);

	return (
		<Presenter
			item={item}
			isEditing={isEditing}
			isActive={isActive}
			detailVisible={detailVisible}
			// func
			onPressDetail={onPressDetail}
			onCheckItem={onCheckItem}
			onRemoveItem={onRemoveItem}
			move={move}
			moveEnd={moveEnd}
		/>
	);
};
