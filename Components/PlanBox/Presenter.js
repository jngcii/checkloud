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
	overflow: hidden;
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
const PlusIcon = styled.Image``;
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

const DrawSpan = styled.View`
	width: 50px;
	height: 100%;
	justify-content: flex-end;
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
`;
const ItemInputBox = styled.View`
	${props => props.theme.itemActBox};
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
	justify-content: center;
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

const AddItem = ({ itemsVisible, newKeyword, onAddItem }) => (
	<ItemInputBox>
		<AddIconSpan>
			<AddIcon style={{ tintColor: "#ddd" }} />
		</AddIconSpan>

		<InputWrapper>
			<InputItemActText
				{...newKeyword}
				placeholder={"새로운 목록을 선택/입력하세요."}
				onFocus={() => itemsVisible.setValue(false)}
				onSubmitEditing={onAddItem}
			/>
		</InputWrapper>
	</ItemInputBox>
);

export default ({
	plan,
	isEditing,
	itemsVisible,
	items,
	newKeyword,
	// func
	onAddItem,
	onRemoveItem
}) => (
	<Wrapper>
		<PlanBox>
			<Header>
				<TitleWrapper>
					<PlusSpan>
						<PlusIcon />
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

					<DrawSpan />
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
					style={{ flex: 1 }}
					data={items.array}
					keyExtractor={(_, index) => `item - ${index}`}
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
								itemsVisible={itemsVisible}
								newKeyword={newKeyword}
								// func
								onAddItem={onAddItem}
							/>
						)
					}
					onMoveEnd={({ data }) => items.setArray(data)}
					onMomentumScrollBegin={() => itemsVisible.setValue(false)}
				/>

				<PercentageText color={plan.itemActs[0].color}>
					65%
				</PercentageText>
			</Body>
		</PlanBox>
	</Wrapper>
);
