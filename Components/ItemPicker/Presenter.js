import React from "react";
import { Animated, Dimensions } from "react-native";
import styled from "styled-components";

const { width } = Dimensions.get("window");

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	background-color: ${props => props.theme.navBtnColor};
	${props => props.theme.navShadow};
`;

const Box = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	overflow: hidden;
`;

const Header = styled.View`
	width: 100%;
	height: 60px;
	flex-direction: row;
	background-color: ${props => props.color};
`;
const GoBackSpan = styled.TouchableOpacity`
	width: 50px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const GoBackIcon = styled.Image.attrs({
	source: require("../../assets/icons/arrowIcon.png")
})`
	width: 20px;
	height: 20px;
`;
const UsingSpan = styled.View`
	flex: 1;
	height: 100%;
	justify-content: center;
`;
const UsingItem = styled.Text`
	font-size: ${props => props.theme.itemHeaderFontSize};
	font-weight: ${props => props.theme.itemHeaderFontWeight};
	color: ${props =>
		props.isRoot ? props.theme.blackColor : props.theme.whiteColor};
`;
const ArrowSpan = styled.TouchableOpacity`
	width: 60px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;
const ArrowIcon = styled.Image.attrs({
	source: require("../../assets/icons/arrowIcon.png")
})`
	width: 20px;
	height: 20px;
	${props =>
		props.itemsVisible
			? `transform: rotate(-90deg)`
			: `transform: rotate(90deg)`};
`;

const Body = styled.View`
	width: 100%;
	flex: 1;
`;

const UsedItemsWrapper = styled.ScrollView.attrs({
	horizontal: true
})`
	width: 100%;
	height: 40px;
	max-height: 40px;
	padding-left: 10px;
	flex-direction: row;
`;
const UsedItemBox = styled.TouchableOpacity`
	height: 32px;
	min-width: 45px;
	padding: 5px;
	margin: 4px;
	border-radius: 16px;
	align-items: center;
	justify-content: center;
	border-color: ${props => props.color};
	border-width: 2px;
`;
const UsedItemText = styled.Text`
	font-size: ${props => props.theme.usedItemFontSize};
	font-weight: ${props => props.theme.usedItemFontWeight};
	color: ${props => props.color};
`;
const ChildsWrapper = styled.ScrollView`
	flex: 1;
	width: 100%;
`;
const ChildRow = styled.TouchableOpacity`
	width: 100%;
	height: 40px;
	flex-direction: row;
	align-items: center;
`;
const Point = styled.View`
	width: 6px;
	height: 6px;
	margin: 20px;
	border-radius: 3px;
	background-color: ${props => props.color};
`;
const Keyword = styled.Text`
	flex: 1;
	font-size: ${props => props.theme.itemActFontSize};
	font-weight: ${props => props.theme.itemActFontWeight};
	color: ${props => props.theme.blackColor};
`;
const SelectBtn = styled.TouchableOpacity`
	margin: 0 15px;
	width: 40px;
	height: 25px;
	border-radius: 10px;
	border: 1px solid ${props => props.theme.submitBtnColor};
	align-items: center;
	justify-content: center;
`;
const SelectIcon = styled.Image.attrs({
	source: require("../../assets/icons/plusIcon.png")
})`
	width: 15px;
	height: 15px;
`;

const UsedItem = ({ usedItems, onPressUsedItem }) => (
	<UsedItemsWrapper>
		{usedItems.array.map(i => (
			<UsedItemBox
				key={i.id}
				color={i.color}
				onPressOut={() => onPressUsedItem(i)}
			>
				<UsedItemText color={i.color}>{i.keyword}</UsedItemText>
			</UsedItemBox>
		))}
	</UsedItemsWrapper>
);

const ChildItem = ({ item, onPressItem, onSelectItem }) => (
	<ChildRow onPressOut={() => onPressItem(item)}>
		<Point color={item.color} />
		<Keyword>{item.keyword}</Keyword>
		<SelectBtn onPressOut={() => onSelectItem(item)}>
			<SelectIcon style={{ tintColor: "#ccc" }} />
		</SelectBtn>
	</ChildRow>
);

export default ({
	// state
	usingItem,
	usedItems,
	childItems,
	itemsVisible,
	// animation
	pickerShape,
	// func
	onChangeShape,
	onPressItem,
	onPressUsedItem,
	onPressGoBack,
	onSelectItem
}) => (
	<Animated.View style={{ width: "100%", height: pickerShape.height }}>
		<Wrapper>
			<Box>
				<Header
					color={
						usingItem && usingItem.id != "a"
							? usingItem.color
							: "#f6f6f6"
					}
				>
					<GoBackSpan onPressOut={onPressGoBack}>
						{usedItems.array.length > 0 && (
							<GoBackIcon style={{ tintColor: "#ccc" }} />
						)}
					</GoBackSpan>

					<UsingSpan>
						<UsingItem isRoot={usingItem && usingItem.id == "a"}>
							{usingItem && usingItem.keyword}
						</UsingItem>
					</UsingSpan>

					<ArrowSpan onPressOut={onChangeShape}>
						<ArrowIcon
							style={{ tintColor: "#ccc" }}
							itemsVisible={itemsVisible.value}
						/>
					</ArrowSpan>
				</Header>

				<Body>
					{usedItems.array.length > 0 && (
						<UsedItem
							usedItems={usedItems}
							// func
							onPressUsedItem={onPressUsedItem}
						/>
					)}

					<ChildsWrapper>
						{childItems.map(i => (
							<ChildItem
								key={i.id}
								item={i}
								// func
								onPressItem={onPressItem}
								onSelectItem={onSelectItem}
							/>
						))}
					</ChildsWrapper>
				</Body>
			</Box>
		</Wrapper>
	</Animated.View>
);
