import React from "react";
import styled from "styled-components";

const ParentWrapper = styled.View`
	width: 100%;
	height: 18px;
	flex-direction: row;
	align-items: center;
`;
const ParentKeyword = styled.Text`
	font-size: ${props => props.theme.usedItemFontSize};
	font-weight: ${props => props.theme.usedItemFontWeight};
	color: ${props => props.theme.greyColor};
`;

export default ({ parentKeywords }) => (
	<ParentWrapper>
		{parentKeywords.map((p, index) => (
			<ParentKeyword key={index}>
				{p == parentKeywords[parentKeywords.length - 1] ? p : `${p} / `}
			</ParentKeyword>
		))}
	</ParentWrapper>
);
