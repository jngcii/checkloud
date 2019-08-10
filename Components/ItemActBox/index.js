import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
	width: 100%;
	flex-direction: row;
	opacity: ${props => (props.isActive ? 0.4 : 1)};
`;

const LeftSpan = styled.View`
	width: 50px;
	height: 50px;
	align-self: center;
	align-items: center;
	justify-content: center;
`;
const CheckBox = styled.TouchableOpacity.attrs({
	activeOpacity: 1
})`
	width: 10px;
	height: 10px;
	border-radius: 5px;
	border: 2px solid #ddd;
`;
const Checked = styled.TouchableOpacity.attrs({
	activeOpacity: 1
})`
	width: 16px;
	height: 16px;
	border-radius: 8px;
	background-color: ${props => props.color};
	position: absolute;
`;
const RemoveIcon = styled.TouchableOpacity`
	${props => props.theme.removeIcon};
	position: absolute;
`;
const Minus = styled.View`
	${props => props.theme.minus};
`;

const RightSpan = styled.View`
	flex: 1;
	border-color: ${props => props.theme.borderColor};
	border-bottom-width: 1px;
	flex-direction: row;
`;

const ContentSpan = styled.View`
	flex: 1;
`;
const KeywordWrapper = styled.View`
	width: 100%;
	height: ${props => (props.hasParent ? 30 : 50)};
	justify-content: center;
`;
const Keyword = styled.Text`
	font-size: ${props => props.theme.itemActFontSize};
	font-weight: ${props => props.theme.itemActFontWeight};
	color: ${props => props.theme.blackColor};
`;
const ParentWrapper = styled.View`
	width: 100%;
	height: 20px;
`;

const ShowDetailSpan = styled.TouchableOpacity`
	width: 50px;
	height: 50px;
	align-self: center;
	align-items: center;
	justify-content: center;
`;
const DragTriggerIcon = styled.Image.attrs({
	source: require("../../assets/icons/triggerIcon.png")
})`
	${props => props.theme.dragTriggerIcon};
`;

export default ({
	item,
	isEditing,
	isActive,
	detailVisible,
	onRemoveItem,
	move,
	moveEnd
}) => (
	<Wrapper isActive={isActive}>
		<LeftSpan>
			<CheckBox />
			{!isEditing && item.isChecked && <Checked />}
			{isEditing && (
				<RemoveIcon onPressOut={onRemoveItem}>
					<Minus />
				</RemoveIcon>
			)}
		</LeftSpan>

		<RightSpan>
			<ContentSpan>
				<KeywordWrapper
					hasParent={item.parentId && item.parentId != "a"}
				>
					<Keyword>{item.keyword}</Keyword>
				</KeywordWrapper>

				{item.parentId && item.parentId != "a" && <ParentWrapper />}
			</ContentSpan>

			{isEditing ? (
				<ShowDetailSpan onLongPress={move} onPressOut={moveEnd}>
					<DragTriggerIcon style={{ tintColor: "#ccc" }} />
				</ShowDetailSpan>
			) : (
				<ShowDetailSpan
					onPressOut={() =>
						detailVisible.setValue(!detailVisible.value)
					}
				/>
			)}
		</RightSpan>
	</Wrapper>
);
