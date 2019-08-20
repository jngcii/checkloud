import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_FILTERED_HISTORIES } from "../../API/queries/historyQueries";
import useObject from "../../Hooks/useObject";
import useString from "../../Hooks/useString";
import useCalendar from "../../Hooks/useCalendar";
import useBoolean from "../../Hooks/useBoolean";
import { easeIO } from "../../Animations/layoutAnimations";
import Presenter from "./Presenter";

export default ({ defaultDate = new Date() }) => {
	const date = useObject(defaultDate);

	const { data } = useQuery(GET_FILTERED_HISTORIES, {
		variables: { month: date.value.getMonth() }
	});

	const dateInfo = useCalendar(date.value);
	const rowSelected = useString(null);
	const dateSelected = useObject(null);
	const isScrollingPrv = useBoolean(false);

	const calendar = dateInfo.getCalendar();

	const onPressDate = ({ row, date }) => {
		if (date == dateSelected.value) {
			dateSelected.setValue(null);
			rowSelected.setValue(null);
		} else {
			dateSelected.setValue(date);
		}

		if (row != rowSelected.value) rowSelected.setValue(row);

		easeIO();
	};

	return (
		<Presenter
			date={date}
			data={data}
			rowSelected={rowSelected}
			dateSelected={dateSelected}
			isScrollingPrv={isScrollingPrv}
			calendar={calendar}
			// func
			onPressDate={onPressDate}
		/>
	);
};
