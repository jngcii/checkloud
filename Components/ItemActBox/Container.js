import React, { useEffect } from "react";
import useBoolean from "../../Hooks/useBoolean";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ item, isEditing, isActive, onRemoveItem, move, moveEnd }) => {
	const detailVisible = useBoolean(false);

	const onPressDetail = () => {
		detailVisible.setValue(!detailVisible.value);
		easeIO();
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
			onRemoveItem={onRemoveItem}
			move={move}
			moveEnd={moveEnd}
		/>
	);
};
