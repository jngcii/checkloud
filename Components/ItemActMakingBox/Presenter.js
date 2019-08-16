import React from "react";
import styled from "styled-components";
import ParentItems from "../ParentItems";
import InputItemActText from "../InputItemActText";

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
	height: ${props => (props.hasParent ? 32 : 50)};
	flex-direction: row;
	align-items: center;
`;

const ShowDetailSpan = styled.TouchableOpacity`
	width: 50px;
	height: 30px;
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
	isActive,
	newKeyword,
	// func
	onEndEditingKeyword,
	onRemoveItem,
	move,
	moveEnd
}) => (
	<Wrapper isActive={isActive}>
		<LeftSpan>
			<RemoveIcon onPressOut={onRemoveItem}>
				<Minus />
			</RemoveIcon>
		</LeftSpan>

		<RightSpan>
			<ContentSpan>
				<KeywordWrapper
					hasParent={item.parentId && item.parentId != "a"}
				>
					<InputItemActText
						{...newKeyword}
						returnKeyType={"done"}
						onSubmitEditing={onEndEditingKeyword}
						onEndEditing={onEndEditingKeyword}
						blurOnSubmit={true}
					/>
				</KeywordWrapper>

				{item.parentId && item.parentId != "a" && (
					<ParentItems id={item.parentId} />
				)}
			</ContentSpan>

			<ShowDetailSpan onLongPress={move} onPressOut={moveEnd}>
				<DragTriggerIcon style={{ tintColor: "#ccc" }} />
			</ShowDetailSpan>
		</RightSpan>
	</Wrapper>
);
