import React, { useRef } from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_PLANS } from "../../API/queries/planQueries";
import useArray from "../../Hooks/useArray";
import locationAnimation from "../../Animations/locationAnimation";
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

	const navY = locationAnimation(0, 0);
	const pickerY = locationAnimation(0, 150);

	if (loadingPlans) return null;

	return (
		<Presenter
			plans={plans}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			addedItemAct={addedItemAct}
			scrollRef={scrollRef}
			//animation
			navY={navY}
			pickerY={pickerY}
		/>
	);
};
