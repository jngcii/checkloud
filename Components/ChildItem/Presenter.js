import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
	width: 100%;
	height: 25px;
	flex-direction: row;
	align-items: center;
`;

const Dot = styled.View`
	width: 6px;
	height: 6px;
	border-radius: 3px;
	background-color: ${props => props.color};
	margin-right: 8px;
`;

const Keyword = styled.Text`
	font-size: ${props => props.theme.memoFontSize};
	font-weight: ${props => props.theme.memoFontWeight};
	color: ${props => props.theme.blackColor};
`;

export default ({ item }) => (
	<Wrapper>
		<Dot color={item.color} />

		<Keyword>{item.keyword}</Keyword>
	</Wrapper>
);
