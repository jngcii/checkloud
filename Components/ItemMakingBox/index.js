import React from "react";
import styled from "styled-components";

const BoxWrapper = styled.View`
	${props => props.theme.itemActBox};
	opacity: ${props => (props.isActive ? 0.4 : 1)};
`;

const RemoveSpan = styled.TouchableOpacity`
	width: 50px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const RemoveIcon = styled.View`
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background-color: ${props => props.theme.redColor};
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
	align-items: center;
	justify-content: center;
`;
const Minus = styled.View`
	width: 15px;
	height: 4px;
	border-radius: 2px;
	background-color: ${props => props.theme.planBoxColor};
`;

const KeywordSpan = styled.View`
	flex: 1;
	justify-content: center;
	border-color: ${props => props.theme.borderColor};
	border-bottom-width: 1px;
`;
const Keyword = styled.Text`
	line-height: 30px;
	font-size: ${props => props.theme.itemActFontSize};
	font-weight: ${props => props.theme.itemActFontWeight};
	color: ${props => props.theme.blackColor};
`;

const DragTriggerSpan = styled.TouchableOpacity.attrs({
	activeOpacity: 1
})`
	width: 50px;
	height: 100%;
	border-color: ${props => props.theme.borderColor};
	border-bottom-width: 1px;
	align-items: center;
	justify-content: center;
`;
const DragTriggerIcon = styled.Image.attrs({
	source: require("../../assets/icons/triggerIcon.png")
})`
	width: 23px;
	height: 23px;
`;

export default ({ item, isActive, onRemoveItem, move, moveEnd }) => (
	<BoxWrapper isActive={isActive}>
		<RemoveSpan onPressOut={onRemoveItem}>
			<RemoveIcon>
				<Minus />
			</RemoveIcon>
		</RemoveSpan>

		<KeywordSpan>
			<Keyword style={{ textAlignVertical: "center" }}>
				{item.keyword}
			</Keyword>
		</KeywordSpan>

		<DragTriggerSpan onLongPress={move} onPressOut={moveEnd}>
			<DragTriggerIcon style={{ tintColor: "#ccc" }} />
		</DragTriggerSpan>
	</BoxWrapper>
);
