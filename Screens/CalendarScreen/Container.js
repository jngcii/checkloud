import React from "react";
import useCalendar from "../../Hooks/useCalendar";
import Presenter from "./Presenter";

export default () => {
	const dateInfo = useCalendar(new Date());

	const calendar = dateInfo.getCalendar();

	return <Presenter calendar={calendar} />;
};
