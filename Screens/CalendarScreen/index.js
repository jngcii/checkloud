import React from "react";
import styled from "styled-components";
import Calendar from "../../Components/Calendar";

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	align-items: center;
`;

export default () => (
	<Wrapper>
		<Calendar />
	</Wrapper>
);
