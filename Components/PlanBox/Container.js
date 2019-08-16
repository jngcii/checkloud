import React, { useRef, useEffect } from "react";
import { useMutation } from "react-apollo-hooks";
import { ADD_ITEM_ACT, REMOVE_ITEM_ACT } from "../../API/queries/itemQueries";
import { EDIT_PLAN } from "../../API/queries/planQueries";
import { Dimensions } from "react-native";
import useArray from "../../Hooks/useArray";
import useInput from "../../Hooks/useInput";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

const { height } = Dimensions.get("window");

export default ({
	plan,
	isEditing,
	itemsVisible,
	scrollEnabled,
	pageIndex,
	swipeRef
}) => {
	const [addItemActMutation] = useMutation(ADD_ITEM_ACT);
	const [removeItemActMutation] = useMutation(REMOVE_ITEM_ACT);
	const [editPlanMutation] = useMutation(EDIT_PLAN);

	const items = useArray(plan.itemActs);
	const newKeyword = useInput("");

	const scrollRef = useRef(null);

	const onAddItem = async () => {
		if (newKeyword.value == "") return;

		const {
			data: { addItemAct }
		} = await addItemActMutation({
			variables: { keyword: newKeyword.value }
		});

		const res = await items.add(addItemAct);

		if (res)
			editPlanMutation({
				variables: { id: plan.id, itemActs: items.array }
			});

		newKeyword.onChange("");
	};

	const onRemoveItem = i => {
		items.remove(i);

		editPlanMutation({ variables: { id: plan.id, itemActs: items.array } });

		removeItemActMutation({ variables: { id: i.id } });

		easeIO();
	};

	const onContentSizeChange = () => {
		scrollRef.current.scroll(height);
		easeIO();
	};

	const onFocusItem = () => {
		itemsVisible.setValue(false);
		scrollRef.current.scroll(height);
		easeIO();
	};

	const onMoveEnd = data => {
		items.setArray(data);
		scrollEnabled.setValue(true);
		editPlanMutation({ variables: { id: plan.id, itemActs: data } });
	};

	const onPressDone = () => {
		isEditing.setValue(null);
	};

	useEffect(() => {
		if (plan) {
			if (isEditing.value) isEditing.setValue(null);
			if (plan.itemActs != items.array) items.setArray(plan.itemActs);
		}
		easeIO();
	}, [pageIndex.value]);

	useEffect(() => {
		if (plan && plan.itemActs) items.setArray(plan.itemActs);
	}, [plan]);

	if (!plan || !plan.itemActs) return null;
	return (
		<Presenter
			plan={plan}
			isEditing={isEditing}
			itemsVisible={itemsVisible}
			scrollEnabled={scrollEnabled}
			items={items}
			newKeyword={newKeyword}
			swipeRef={swipeRef}
			scrollRef={scrollRef}
			// func
			onAddItem={onAddItem}
			onRemoveItem={onRemoveItem}
			onContentSizeChange={onContentSizeChange}
			onFocusItem={onFocusItem}
			onMoveEnd={onMoveEnd}
			onPressDone={onPressDone}
		/>
	);
};
