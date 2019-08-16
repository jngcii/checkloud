import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components";
import DraggableFlatList from "react-native-draggable-flatlist";
import MonthTranslator from "../MonthTranslator";
import WeekTranslator from "../WeekTranslator";
import InputItemActText from "../InputItemActText";
import ItemActBox from "../ItemActBox";

const { width } = Dimensions.get("window");

const Wrapper = styled.View`
	width: ${width};
	height: 100%;
	align-items: center;
`;

const PlanBox = styled.SafeAreaView`
	width: 95%;
	height: 98%;
	background-color: ${props => props.theme.planBoxColor};
	border-bottom-left-radius: 50px;
	border-bottom-right-radius: 50px;
	box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
`;

const Header = styled.View`
	width: 100%;
	height: 70px;
	border-color: ${props => props.theme.borderColor};
	border-bottom-width: 1px;
`;
const TitleWrapper = styled.View`
	width: 100%;
	height: 50px;
	flex-direction: row;
`;
const PlusSpan = styled.TouchableOpacity`
	width: 50px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const PlusIcon = styled.Image.attrs({
	source: require("../../assets/icons/plusIcon.png")
})`
	width: 18px;
	height: 18px;
`;
const TitleSpan = styled.View`
	max-width: ${width - 130};
	height: 100%;
	justify-content: center;
`;
const Title = styled.Text`
	font-size: ${props => props.theme.planTitleFontSize};
	font-weight: ${props => props.theme.planTitleFontWeight};
	color: ${props => props.theme.blackColor};
`;
const EditSpan = styled.TouchableOpacity`
	width: 30px;
	height: 100%;
	margin-left: 5px;
	align-items: center;
	justify-content: center;
`;
const EditIcon = styled.Image.attrs({
	source: require("../../assets/icons/gearIcon.png")
})`
	width: 18px;
	height: 18px;
`;
const Spacing = styled.View`
	flex: 1;
`;
const DrawSpan = styled.View`
	width: 60px;
	height: 100%;
	right: 0;
	align-items: center;
	justify-content: center;
`;
const SubmitBtn = styled.Text`
	font-size: ${props => props.theme.itemActFontSize};
	font-weight: ${props => props.theme.itemActFontWeight};
	color: ${props => props.theme.doneBtnColor};
	text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
`;

const DateWrapper = styled.View`
	width: 100%;
	height: 20px;
	padding-left: 50px;
	justify-content: center;
`;
const DateText = styled.Text`
	font-size: ${props => props.theme.dateFontSize};
	font-weight: ${props => props.theme.dateFontWeight};
	color: ${props => props.theme.greyColor};
`;

const Body = styled.View`
	flex: 1;
	width: 100%;
	border-bottom-left-radius: 50px;
	border-bottom-right-radius: 50px;
	overflow: hidden;
`;
const ItemInputBox = styled.View`
	${props => props.theme.itemActBox};
	margin-bottom: 200px;
`;
const AddIconSpan = styled.View`
	width: 50px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const AddIcon = styled.Image.attrs({
	source: require("../../assets/icons/plusIcon.png")
})`
	width: 16px;
	height: 16px;
	transform: rotate(180deg);
`;
const InputWrapper = styled.View`
	flex: 1;
	height: 100%;
	flex-direction: row;
	align-items: center;
`;
const EnterBtnSpan = styled.TouchableOpacity`
	width: 50px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const EnterIcon = styled.Image.attrs({
	source: require("../../assets/icons/saveIcon.png")
})`
	width: 20px;
	height: 20px;
`;

const PercentageText = styled.Text`
	position: absolute;
	font-family: Courier;
	font-size: ${props => props.theme.percentageFontSize};
	font-weight: ${props => props.theme.percentageFontWeight};
	font-style: italic;
	color: ${props => props.color};
	bottom: 30px;
	right: 10px;
	opacity: 0.5;
`;

const ControlBarWrapper = styled.View`
	position: absolute;
	bottom: 0;
	align-self: center;
	align-items: center;
	justify-content: center;
	width: 50%;
	height: 30px;
`;
const ControlBar = styled.View`
	width: 50px;
	height: 6px;
	border-radius: 3px;
	background-color: rgba(0, 0, 0, 0.3);
`;

const AddItem = ({ newKeyword, onAddItem, onFocusItem }) => (
	<ItemInputBox>
		<AddIconSpan>
			<AddIcon style={{ tintColor: "#ddd" }} />
		</AddIconSpan>

		<InputWrapper>
			<InputItemActText
				{...newKeyword}
				placeholder={"새로운 목록을 선택/입력하세요."}
				onFocus={onFocusItem}
				onSubmitEditing={onAddItem}
			/>

			{newKeyword.value.length > 0 && (
				<EnterBtnSpan onPressOut={onAddItem}>
					<EnterIcon style={{ tintColor: "#ccc" }} />
				</EnterBtnSpan>
			)}
		</InputWrapper>
	</ItemInputBox>
);

export default ({
	plan,
	isEditing,
	itemsVisible,
	scrollEnabled,
	items,
	newKeyword,
	swipeRef,
	scrollRef,
	// func
	onAddItem,
	onRemoveItem,
	onContentSizeChange,
	onFocusItem
}) => (
	<Wrapper>
		<PlanBox>
			<Header>
				<TitleWrapper>
					<PlusSpan
						onPressOut={() => swipeRef.current.scrollTo({ x: 0 })}
					>
						<PlusIcon style={{ tintColor: "#ccc" }} />
					</PlusSpan>

					<TitleSpan>
						<Title>{plan.title}</Title>
					</TitleSpan>

					{!isEditing.value && (
						<EditSpan
							onPressOut={() => isEditing.setValue(plan.id)}
						>
							<EditIcon style={{ tintColor: "#ddd" }} />
						</EditSpan>
					)}

					<Spacing />

					<DrawSpan>
						{isEditing.value && items.count > 0 && (
							<SubmitBtn color={items.array[0].color}>
								Done
							</SubmitBtn>
						)}
					</DrawSpan>
				</TitleWrapper>

				<DateWrapper>
					<DateText>
						{WeekTranslator(plan.startAt[3])} {plan.startAt[2]}{" "}
						{MonthTranslator(plan.startAt[1])} {plan.startAt[0]}
					</DateText>
				</DateWrapper>
			</Header>

			<Body>
				<DraggableFlatList
					ref={scrollRef}
					style={{ flex: 1 }}
					data={items.array}
					keyExtractor={(_, index) => `item - ${index}`}
					showsVerticalScrollIndicator={false}
					renderItem={({ index, item, isActive, move, moveEnd }) => (
						<ItemActBox
							item={item}
							isEditing={isEditing.value == plan.id}
							isActive={isActive}
							// func
							onRemoveItem={() => onRemoveItem(item)}
							move={move}
							moveEnd={moveEnd}
						/>
					)}
					ListFooterComponent={
						isEditing.value && (
							<AddItem
								newKeyword={newKeyword}
								// func
								onAddItem={onAddItem}
								onFocusItem={onFocusItem}
							/>
						)
					}
					onMoveBegin={() => scrollEnabled.setValue(false)}
					onMoveEnd={({ data }) => {
						items.setArray(data);
						scrollEnabled.setValue(true);
					}}
					onMomentumScrollBegin={() => itemsVisible.setValue(false)}
					onContentSizeChange={onContentSizeChange}
				/>

				{!isEditing.value && (
					<PercentageText color={plan.itemActs[0].color}>
						{Math.round(
							(items.array.filter(i => i.isChecked).length /
								items.array.length) *
								100
						)}
						%
					</PercentageText>
				)}
			</Body>

			<ControlBarWrapper>
				<ControlBar />
			</ControlBarWrapper>
		</PlanBox>
	</Wrapper>
);
