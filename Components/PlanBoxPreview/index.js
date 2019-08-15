import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
	width: 140px;
	height: 190px;
	padding: 5px;
`;

const Box = styled.TouchableOpacity`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	background-color: ${props => props.theme.doneBtnColor};
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
`;

const Container = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	overflow: hidden;
`;

export default () => (
	<Wrapper>
		<Box>
			<Container />
		</Box>
	</Wrapper>
);
