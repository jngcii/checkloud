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
const Keyword = styled.Text.attrs({
	numberOfLines: 2
})`
	line-height: 30px;
	font-size: ${props => props.theme.itemActFontSize};
	font-weight: ${props => props.theme.itemActFontWeight};
	color: ${props => props.theme.blackColor};
`;
const ParentWrapper = styled.View`
	width: 100%;
	height: 20px;
`;

const MemoBox = styled.View`
	width: 100%;
	min-height: 30px;
	border-radius: 10px;
	margin: 5px auto;
	background-color: ${props => props.theme.memoColor};
	flex-direction: row;
`;
const MemoIcon = styled.Image.attrs({
	source: require("../../assets/icons/pinIcon.png")
})`
	width: 25px;
	height: 25px;
	top: -5px;
	left: 10px;
	transform: rotate(45deg);
`;
const MemoTextWrapper = styled.View`
	flex: 1;
`;

const ShowDetailSpan = styled.TouchableOpacity`
	width: 50px;
	height: 30px;
	align-self: center;
	align-items: center;
	justify-content: center;
`;
const ShowDetail = styled.Image.attrs({
	source: require("../../assets/icons/arrowIcon.png")
})`
	width: 15px;
	height: 15px;
	transform: ${props =>
		props.detailVisible ? "rotate(90deg)" : "rotate(-90deg)"};
`;

const DragTriggerIcon = styled.Image.attrs({
	source: require("../../assets/icons/triggerIcon.png")
})`
	${props => props.theme.dragTriggerIcon};
`;

const Memo = ({ color }) => (
	<MemoBox>
		<MemoIcon style={{ tintColor: color }} />
		<MemoTextWrapper />
	</MemoBox>
);

export default ({
	item,
	isEditing,
	isActive,
	detailVisible,
	// func
	onPressDetail,
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
					<Keyword style={{ textAlignVertical: "center" }}>
						{item.keyword}
					</Keyword>
				</KeywordWrapper>

				{item.parentId && item.parentId != "a" && <ParentWrapper />}

				{detailVisible.value && <Memo color={item.color} />}
			</ContentSpan>

			{isEditing ? (
				<ShowDetailSpan onLongPress={move} onPressOut={moveEnd}>
					<DragTriggerIcon style={{ tintColor: "#ccc" }} />
				</ShowDetailSpan>
			) : (
				<ShowDetailSpan
					style={{ alignSelf: "flex-end" }}
					onPressOut={onPressDetail}
				>
					<ShowDetail
						style={{ tintColor: "#ccc" }}
						detailVisible={detailVisible.value}
					/>
				</ShowDetailSpan>
			)}
		</RightSpan>
	</Wrapper>
);
