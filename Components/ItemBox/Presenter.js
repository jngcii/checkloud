import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
	width: 100%;
	height: 60px;
	padding: 5px 10px;
`;

const Box = styled.TouchableOpacity`
	width: 100%;
	height: 100%;
	padding: 0 30px;
	flex-direction: row;
	align-items: center;
	border-radius: 20px;
	background-color: ${props => props.color};
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
`;

const Keyword = styled.Text`
	font-size: ${props => props.theme.itemFontSize};
	font-weight: ${props => props.theme.itemFontWeight};
	color: ${props => props.theme.whiteColor};
	margin: 0 10px;
`;

const CountSpan = styled.View`
	height: ${props => props.theme.itemFontSize};
	justify-content: flex-end;
`;
const Count = styled.Text`
	font-size: ${props => props.theme.itemFontSize - 5};
	font-weight: ${props => props.theme.itemFontWeight};
	color: ${props => props.theme.whiteColor};
	opacity: 0.5;
`;

export default ({ item, stack }) => (
	<Wrapper>
		<Box color={item.color} onPressOut={() => stack.setValue(item)}>
			<Keyword>{item.keyword}</Keyword>

			<CountSpan>
				<Count>{item.childIds.length}</Count>
			</CountSpan>
		</Box>
	</Wrapper>
);
