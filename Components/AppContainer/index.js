import React, { useState } from "react";
import styled from "styled-components";
import HomeScreen from "../../Screens/HomeScreen";

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.bgColor};
`;

export default () => {
	const [loading, setLoading] = useState(true);

	setTimeout(() => setLoading(false), 200);

	if (loading) return null;

	return (
		<Wrapper>
			<HomeScreen />
		</Wrapper>
	);
};
