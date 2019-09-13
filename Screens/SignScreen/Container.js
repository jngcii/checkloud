import React from "react";
import useString from "../../Hooks/useString";
import Presenter from "./Presenter";

export default () => {
    const type = useString("in");

	return <Presenter type={type} />;
};
