import React, { useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_ITEMS } from "../../API/queries/itemQueries";
import useBoolean from "../../Hooks/useBoolean";
import useString from "../../Hooks/useString";
import useArray from "../../Hooks/useArray";
import ShapeAnimation from "../../Animations/shapeAnimation";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ itemsVisible, addedItem }) => {
	const {
		data: { items }
	} = useQuery(GET_ITEMS);

	const usingId = useString("a");
	const usedItems = useArray([]);
	const usingItem = items.filter(i => i.id == usingId.value)[0];
	const childItems = items.filter(i => i.parentId == usingId.value);

	const pickerShape = ShapeAnimation(0, 60);

	const onChangeShape = () => {
		itemsVisible.setValue(!itemsVisible.value);
	};

	const onPressItem = async i => {
		const res = await usedItems.add(usingItem);
		if (res) usingId.setValue(i.id);
		easeIO();
	};

	const onPressUsedItem = async i => {
		usedItems.removeBehindAll(i);
		usingId.setValue(i.id);
		easeIO();
	};

	const onPressGoBack = async () => {
		const res = await usedItems.removeLast();
		usingId.setValue(res.id);
		easeIO();
	};

	const onSelectItem = async i => {
		const newItem = {
			id: "a",
			keyword: i.keyword,
			color: i.color,
			isChecked: false,
			parentId: i.parentId,
			childIds: i.childIds,
			finishedTime: [],
			memo: ""
		};

		addedItem.add(newItem);

		easeIO();
	};

	useEffect(() => {
		if (itemsVisible.value) {
			if (pickerShape.height._value != 320)
				pickerShape.changeShape({ toHeight: 320 });
		} else {
			if (pickerShape.height._value != 60)
				pickerShape.changeShape({ toHeight: 60 });
		}
	}, [itemsVisible]);

	return (
		<Presenter
			// state
			usingItem={usingItem}
			usedItems={usedItems}
			childItems={childItems}
			itemsVisible={itemsVisible}
			// animation
			pickerShape={pickerShape}
			// func
			onChangeShape={onChangeShape}
			onPressItem={onPressItem}
			onPressUsedItem={onPressUsedItem}
			onPressGoBack={onPressGoBack}
			onSelectItem={onSelectItem}
		/>
	);
};
