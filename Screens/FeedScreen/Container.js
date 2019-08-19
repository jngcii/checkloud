import React, { useEffect } from "react";
import useArray from "../../Hooks/useArray";
import Presenter from "./Presenter";

export default ({ history }) => {
	const stickyIndex = useArray([]);
	const renderItems = useArray([]);

	useEffect(() => {
		if (stickyIndex.count != history.length) {
			let i = 0;

			history.forEach(h => {
				stickyIndex.add(i);

				const stickyDay = { date: h.date, month: h.month, day: h.day };
				renderItems.add(stickyDay);

				h.plans.forEach(p => {
					renderItems.add(p);
				});

				i = i + 1 + h.plans.length;
			});
		}
	}, [history]);

	if (stickyIndex.count != history.length) return null;
	return <Presenter stickyIndex={stickyIndex} renderItems={renderItems} />;
};
