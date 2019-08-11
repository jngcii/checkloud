import React from "react";
import { Animated } from "react-native";
import styled from "styled-components";
import Container from "./Container";
import ItemBox from "../../Components/ItemBox";

const Wrapper = styled.View`
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

export default ({
	// props
	floor,
	stack,
	// state
	item,
	childItems,
	panResponder,
	// func
	stackShape
}) => (
	<Wrapper>
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
				childItems.map(i => <ItemBox key={i.id} item={i} />)
			)}
		</Body>
	</Wrapper>
);
