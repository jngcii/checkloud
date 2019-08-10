import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	overflow: hidden;
`;
const Header = styled.View`
	width: 100%;
	height: 45px;
	padding: 0 25px;
	justify-content: flex-end;
`;

const Title = styled.Text`
	font-size: ${props => props.theme.itemHeaderFontSize};
	font-weight: ${props => props.theme.itemHeaderFontWeight};
	color: ${props => props.theme.blackColor};
`;

export default ({ panResponder }) => (
	<Wrapper>
		<Header {...panResponder.panHandlers}>
			<Title>Category</Title>
		</Header>
	</Wrapper>
);
