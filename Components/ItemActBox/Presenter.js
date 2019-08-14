import React from "react";
import styled from "styled-components";
import ParentItems from "../ParentItems";
import ChildItem from "../ChildItem";

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
	width: 20px;
	height: 20px;
	border-radius: 10px;
	background-color: ${props => props.color};
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
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
	height: ${props => (props.hasParent ? 32 : 50)};
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

const ChildItems = styled.View`
	width: 100%;
	height: ${props => props.height};
	justify-content: center;
	margin-bottom: 10px;
	margin-top: ${props => (props.hasParent ? 10 : 0)};
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
	onCheckItem,
	onRemoveItem,
	move,
	moveEnd
}) => (
	<Wrapper isActive={isActive}>
		<LeftSpan>
			{isEditing ? (
				<RemoveIcon onPressOut={onRemoveItem}>
					<Minus />
				</RemoveIcon>
			) : (
				<CheckBox onPressOut={onCheckItem} />
			)}

			{!isEditing && item.isChecked && (
				<Checked onPressOut={onCheckItem} color={item.color} />
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

				{item.parentId && item.parentId != "a" && (
					<ParentItems id={item.parentId} />
				)}

				{detailVisible.value && (
					<ChildItems
						height={25 * item.childIds.length}
						hasParent={item.parentId && item.parentId != "a"}
					>
						{item.childIds.map(i => (
							<ChildItem key={i} id={i} />
						))}
					</ChildItems>
				)}

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
