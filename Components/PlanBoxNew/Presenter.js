import React from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import styled from "styled-components";
import DraggableFlatList from "react-native-draggable-flatlist";
import InputTitleText from "../InputTitleText";
import InputItemActText from "../InputItemActText";
import ItemActBox from "../ItemActBox";

const { width } = Dimensions.get("window");

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
	flex: 1;
	height: 100%;
	justify-content: center;
`;
const DrawSpan = styled.TouchableOpacity`
	width: 60px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const SubmitIcon = styled.Image.attrs({
	source: require("../../assets/icons/submitIcon.png")
})`
	width: 30px;
	height: 30px;
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
	justify-content: center;
`;

const ControlBarWrapper = styled.View`
	position: absolute;
	bottom: 0;
	align-self: center;
	align-items: center;
	justify-content: center;
	width: 50%;
	height: 50px;
`;
const ControlBar = styled.View`
	width: 50px;
	height: 6px;
	border-radius: 3px;
	background-color: rgba(0, 0, 0, 0.4);
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
		</InputWrapper>
	</ItemInputBox>
);

export default ({
	addedItem,
	itemsVisible,
	scrollEnabled,
	newTitle,
	newKeyword,
	scrollRef,
	swiperY,
	panResponder,
	// func
	onAddItem,
	onRemoveItem,
	onCreatePlan,
	onContentSizeChange,
	onFocusItem
}) => (
	<Animated.View
		style={[
			styles.wrapperStyle,
			{ transform: [{ translateY: swiperY.location.y }] }
		]}
	>
		<PlanBox>
			<Header>
				<TitleWrapper>
					<PlusSpan>
						<PlusIcon />
					</PlusSpan>

					<TitleSpan>
						<InputTitleText
							{...newTitle}
							placeholder={"이름 없는 플랜"}
							onFocus={() => itemsVisible.setValue(false)}
						/>
					</TitleSpan>

					{addedItem.count > 0 && (
						<DrawSpan onPressOut={onCreatePlan}>
							<SubmitIcon style={{ tintColor: "#ccc" }} />
						</DrawSpan>
					)}
				</TitleWrapper>

				<DateWrapper>
					<DateText>Thursday 8 August, 2019</DateText>
				</DateWrapper>
			</Header>

			<Body>
				<DraggableFlatList
					ref={scrollRef}
					style={{ flex: 1 }}
					data={addedItem.array}
					keyExtractor={(_, index) => `item - ${index}`}
					showsVerticalScrollIndicator={false}
					renderItem={({ index, item, isActive, move, moveEnd }) => (
						<ItemActBox
							item={item}
							isEditing={true}
							isActive={isActive}
							// func
							onRemoveItem={() => onRemoveItem(item)}
							move={move}
							moveEnd={moveEnd}
						/>
					)}
					ListFooterComponent={
						<AddItem
							newKeyword={newKeyword}
							// func
							onAddItem={onAddItem}
							onFocusItem={onFocusItem}
						/>
					}
					onMoveBegin={() => scrollEnabled.setValue(false)}
					onMoveEnd={({ data }) => {
						addedItem.setArray(data);
						scrollEnabled.setValue(true);
					}}
					onMomentumScrollBegin={() => itemsVisible.setValue(false)}
					onContentSizeChange={onContentSizeChange}
				/>
			</Body>

			<ControlBarWrapper {...panResponder.panHandlers}>
				<ControlBar />
			</ControlBarWrapper>
		</PlanBox>
	</Animated.View>
);

const styles = StyleSheet.create({
	wrapperStyle: {
		width,
		height: "100%",
		alignItems: "center",
		overflow: "hidden"
	}
});
