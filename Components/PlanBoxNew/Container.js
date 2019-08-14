import React, { useRef } from "react";
import { Dimensions } from "react-native";
import { useMutation } from "react-apollo-hooks";
import { ADD_ITEM_ACTS } from "../../API/queries/itemQueries";
import { ADD_PLAN } from "../../API/queries/planQueries";
import useInput from "../../Hooks/useInput";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

const { width } = Dimensions.get("window");

export default ({
	swipeRef,
	addedItem,
	addedItemSgt,
	itemsVisible,
	swiperY,
	panResponder
}) => {
	const [addItemActsMutation] = useMutation(ADD_ITEM_ACTS);
	const [addPlanMutation] = useMutation(ADD_PLAN);

	const newTitle = useInput("");
	const newKeyword = useInput("");

	const scrollRef = useRef(null);

	const onAddItem = () => {
		if (newKeyword.value == "") return;

		const newItem = {
			id: "a",
			keyword: newKeyword.value,
			color: "#333",
			isChecked: false,
			parentId: null,
			childIds: [],
			finishedTime: [],
			memo: ""
		};

		addedItem.add(newItem);
		addedItemSgt.add(newItem);

		newKeyword.onChange("");

		scrollRef.current.scroll(60);
		easeIO();
	};

	const onRemoveItem = item => {
		addedItem.remove(item);
		addedItemSgt.remove(item);

		easeIO();
	};

	const onCreatePlan = async () => {
		const {
			data: { addItemActs }
		} = await addItemActsMutation({
			variables: {
				itemActs: addedItem.array
			}
		});

		const {
			data: { addPlan }
		} = await addPlanMutation({
			variables: {
				title: newTitle.value == "" ? "이름없는 플랜" : newTitle.value,
				itemActs: addItemActs
			}
		});

		if (addPlan) {
			newTitle.onChange("");
			addedItem.setArray([]);
			addedItemSgt.setArray([]);
			swipeRef.current.scrollTo({ x: width, animated: true });

			easeIO();
		}
	};

	return (
		<Presenter
			addedItem={addedItem}
			itemsVisible={itemsVisible}
			newTitle={newTitle}
			newKeyword={newKeyword}
			scrollRef={scrollRef}
			swiperY={swiperY}
			panResponder={panResponder}
			// func
			onAddItem={onAddItem}
			onRemoveItem={onRemoveItem}
			onCreatePlan={onCreatePlan}
		/>
	);
};
