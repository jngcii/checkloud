import React from "react";
import { useMutation } from "react-apollo-hooks";
import { ADD_ITEM_ACTS } from "../../API/queries/itemQueries";
import { ADD_PLAN } from "../../API/queries/planQueries";
import useInput from "../../Hooks/useInput";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ addedItem, addedItemSgt }) => {
	const [addItemActsMutation] = useMutation(ADD_ITEM_ACTS);
	const [addPlanMutation] = useMutation(ADD_PLAN);

	const newTitle = useInput("");
	const newKeyword = useInput("");

	const onAddItem = () => {
		if (newKeyword.value == "") return;

		const newItem = {
			id: "a",
			keyword: newKeyword.value,
			color: "#000",
			isChecked: false,
			parentId: null,
			childIds: [],
			finishedTime: [],
			memo: ""
		};

		addedItem.add(newItem);
		addedItemSgt.add(newItem);

		newKeyword.onChange("");

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
				title: newTitle.value,
				itemActs: addItemActs
			}
		});

		console.log(addPlan);
	};

	return (
		<Presenter
			addedItem={addedItem}
			newTitle={newTitle}
			newKeyword={newKeyword}
			// func
			onAddItem={onAddItem}
			onRemoveItem={onRemoveItem}
			onCreatePlan={onCreatePlan}
		/>
	);
};
