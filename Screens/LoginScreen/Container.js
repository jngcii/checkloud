import React from "react";
import useInput from "../../Hooks/useInput";
import Presenter from "./Presenter";

export default ({ type }) => {
	const username = useInput("");
	const password = useInput("");

	return <Presenter type={type} username={username} password={password} />;
};
