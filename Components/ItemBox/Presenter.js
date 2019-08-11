import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
	width: 100%;
	height: 70px;
	padding: 10px;
`;

const Box = styled.TouchableOpacity`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	background-color: pink;
`;

export default () => (
	<Wrapper>
		<Box />
	</Wrapper>
);
