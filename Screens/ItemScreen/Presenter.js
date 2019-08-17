import React from "react";
import { Animated, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components";
import DraggableFlatList from "react-native-draggable-flatlist";
import Container from "./Container";
import ItemBox from "../../Components/ItemBox";
import Colors from "../../Components/Colors";
import InputKeywordText from "../../Components/InputKeywordText";

const Wrapper = styled.KeyboardAvoidingView`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
	background-color: ${props =>
		props.stack ? props.theme.bgColor : props.theme.planBoxColor};
`;

const ControlBar = styled.View`
	width: 50%;
	height: 25px;
	position: absolute;
	align-self: center;
	align-items: center;
	justify-content: center;
`;
const Handler = styled.View`
	width: 50px;
	height: 6px;
	border-radius: 3px;
	background-color: #555;
	opacity: 0.3;
`;

const Header = styled.TouchableOpacity.attrs({
	activeOpacity: 1
})`
	width: 100%;
	height: 50px;
	padding: 5px 25px;
	justify-content: flex-end;
`;

const Title = styled.Text`
	font-size: ${props => props.theme.itemHeaderFontSize};
	font-weight: ${props => props.theme.itemHeaderFontWeight};
	color: ${props => props.theme.blackColor};
	opacity: ${props => (props.stack ? 0.5 : 1)};
`;
const Body = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
`;
const Childs = styled.View`
	flex: 1;
	width: 100%;
	justify-content: flex-end;
`;

const ChildsItems = styled.ScrollView`
	flex: 1;
	width: 100%;
	padding-top: 5px;
`;

const Color = styled.TouchableOpacity`
	width: ${props => (props.picked ? 26 : 20)};
	height: ${props => (props.picked ? 26 : 20)};
	border-radius: ${props => (props.picked ? 13 : 10)};
	background-color: ${props => props.color};
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const NewKeywordWrapper = styled.View`
	width: 100%;
	height: 60px;
	padding: 10px 20px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
const InputSpan = styled.View`
	flex: 1;
	height: 100%;
`;
const SubmitSpan = styled.TouchableOpacity`
	width: 45px;
	height: 28px;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.submitBtnColor};
	box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
`;
const SubmitIcon = styled.Image.attrs({
	source: require("../../assets/icons/saveIcon.png")
})`
	width: 15px;
	height: 15px;
`;

const Stack = ({ floor, stack, stackShape }) => (
	<Animated.View
		style={{
			width: stackShape.width.interpolate({
				inputRange: [0, 1],
				outputRange: ["90%", "100%"]
			}),
			height: stackShape.height.interpolate({
				inputRange: [0, 1],
				outputRange: ["10%", "100%"]
			})
		}}
	>
		<Container floor={floor + 1} itemId={stack.value.id} />
	</Animated.View>
);

const ColorGroup = ({ newColor, colorsX }) => (
	<Animated.View
		style={[
			styles.colorsStyle,
			{ transform: [{ translateX: colorsX.location.x }] }
		]}
	>
		{Colors.map(c => (
			<Color
				key={c}
				color={c}
				picked={newColor.value == c}
				onPressOut={() => newColor.setValue(c)}
			/>
		))}
	</Animated.View>
);

export default ({
	// props
	floor,
	stack,
	// state
	item,
	childItems,
	newKeyword,
	newColor,
	swiping,
	editing,
	// animation
	stackShape,
	colorsX,
	panResponder,
	// fun
	onSaveItem,
	onRemoveItem
}) => (
	<Wrapper
		behavior="padding"
		keyboardVerticalOffset={20 + getStatusBarHeight() + 50 * floor}
		enabled={!stack.value}
		stack={stack.value}
	>
		<Header onPress={() => stack.setValue(null)}>
			<Title stack={stack.value}>{item.keyword}</Title>
		</Header>

		{item.id == "a" && (
			<ControlBar {...panResponder.panHandlers}>
				<Handler />
			</ControlBar>
		)}

		<Body>
			{stack.value ? (
				<Stack floor={floor} stack={stack} stackShape={stackShape} />
			) : (
				<Childs>
					<ChildsItems scrollEnabled={swiping.value == null}>
						{childItems.map(i => (
							<ItemBox
								key={i.id}
								item={i}
								stack={stack}
								swiping={swiping}
								editing={editing}
								// func
								onRemoveItem={() =>
									onRemoveItem({
										parentId: item.id,
										id: i.id
									})
								}
							/>
						))}
					</ChildsItems>

					{item.id == "a" && (
						<ColorGroup newColor={newColor} colorsX={colorsX} />
					)}

					<NewKeywordWrapper>
						<InputSpan>
							<InputKeywordText
								{...newKeyword}
								placeholder={"새로운 키워드를 입력하세요."}
							/>
						</InputSpan>

						{newKeyword.value != "" && (
							<SubmitSpan
								color={newColor.value}
								onPressOut={onSaveItem}
							>
								<SubmitIcon style={{ tintColor: "#f6f6f6" }} />
							</SubmitSpan>
						)}
					</NewKeywordWrapper>
				</Childs>
			)}
		</Body>
	</Wrapper>
);

const styles = StyleSheet.create({
	colorsStyle: {
		width: "100%",
		height: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly"
	}
});

// <DraggableFlatList
// 	style={{ flex: 1, width: "100%", marginTop: 5 }}
// 	data={childItems}
// 	keyExtractor={(_, index) => `item - ${index}`}
// 	scrollEnabled={scrollEnabled.value}
// 	renderItem={({ index, item, isActive, move, moveEnd }) => (
// 		<ItemBox
// 			item={item}
// 			stack={stack}
// 			scrollEnabled={scrollEnabled}
// 			isActive={isActive}
// 			// func
// 			move={move}
// 			moveEnd={moveEnd}
// 		/>
// 	)}
// 	onMoveEnd={({ data }) => addedItem.setArray(data)}
// />;
