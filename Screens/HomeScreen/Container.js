import React, { useRef, useEffect } from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_PLANS } from "../../API/queries/planQueries";
import useArray from "../../Hooks/useArray";
import useString from "../../Hooks/useString";
import useBoolean from "../../Hooks/useBoolean";
import locationAnimation from "../../Animations/locationAnimation";
import Presenter from "./Presenter";

export default () => {
	const {
		data: { plans },
		loading: loadingPlans
	} = useQuery(GET_PLANS);

	const isMaking = useBoolean(false);
	const addedItem = useArray([]);
	const addedItemSgt = useArray([]);
	const addedItemAct = useArray([]);
	const pageIndex = useString(1);

	const scrollRef = useRef(null);

	const navY = locationAnimation(0, 0);
	const pickerY = locationAnimation(0, 150);

	useEffect(() => {
		if (isMaking.value) {
			navY.changeLocation({ toY: 150 });
			pickerY.changeLocation({ toY: 0 });
		} else {
			navY.changeLocation({ toY: 0 });
			pickerY.changeLocation({ toY: 150 });
		}
	}, [isMaking.value]);

	if (loadingPlans) return null;

	return (
		<Presenter
			//state
			plans={plans}
			isMaking={isMaking}
			addedItem={addedItem}
			addedItemSgt={addedItemSgt}
			addedItemAct={addedItemAct}
			pageIndex={pageIndex}
			scrollRef={scrollRef}
			//animation
			navY={navY}
			pickerY={pickerY}
		/>
	);
};
