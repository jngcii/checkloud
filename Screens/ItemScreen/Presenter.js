import React from "react";
import { Animated, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import styled from "styled-components";
import Container from "./Container";
import ItemBox from "../../Components/ItemBox";
import Colors from "../../Components/Colors";
import InputKeywordText from "../../Components/InputKeywordText";

const Wrapper = styled.KeyboardAvoidingView`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	overflow: hidden;
`;
const Header = styled.View`
	width: 100%;
	height: 50px;
	padding: 5px 25px;
	justify-content: flex-end;
`;

const Title = styled.Text`
	font-size: ${props => props.theme.itemHeaderFontSize};
	font-weight: ${props => props.theme.itemHeaderFontWeight};
	color: ${props => props.theme.blackColor};
`;

const Body = styled.View`
	flex: 1;
	width: 100%;
`;
const Childs = styled.View`
	flex: 1;
	width: 100%;
	justify-content: flex-end;
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
	background-color: ${props => props.theme.planBoxColor};
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
const InputSpan = styled.View`
	flex: 1;
	height: 100%;
`;
const SubmitSpan = styled.TouchableOpacity`
	width: 60px;
	height: 100%;
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
	panResponder,
	// func
	stackShape,
	colorsX
}) => (
	<Wrapper
		behavior="padding"
		keyboardVerticalOffset={20 + getStatusBarHeight() + 50 * floor}
		enabled={!stack.value}
		stack={stack.value}
	>
		{item.id == "a" ? (
			<Header {...panResponder.panHandlers}>
				<Title>Category</Title>
			</Header>
		) : (
			<Header>
				<Title>{item.keyword}</Title>
			</Header>
		)}

		<Body>
			{stack.value ? (
				<Stack floor={floor} stack={stack} stackShape={stackShape} />
			) : (
				<Childs>
					{childItems.map(i => (
						<ItemBox key={i.id} item={i} />
					))}

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

						<SubmitSpan />
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
