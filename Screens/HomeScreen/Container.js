import React, { useRef } from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_PLANS } from "../../API/queries/planQueries";
import useArray from "../../Hooks/useArray";
import Presenter from "./Presenter";

export default () => {
	const {
		data: { plans },
		loading: loadingPlans
	} = useQuery(GET_PLANS);

	const addedItem = useArray([]);
	const addedItemSgt = useArray([]);
	const addedItemAct = useArray([]);

	const scrollRef = useRef(null);

	if (loadingPlans) return null;

	return (
		<Presenter
			plans={plans}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			addedItemAct={addedItemAct}
			scrollRef={scrollRef}
		/>
	);
};
