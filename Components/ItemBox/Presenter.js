import React from "react";
import styled from "styled-components";
import Swipeable from "react-native-swipeable";

const Wrapper = styled.View`
	width: 100%;
	height: 60px;
	padding: 5px 10px;
`;

const Box = styled.TouchableOpacity.attrs({
	activeOpacity: 1
})`
	width: 100%;
	height: 100%;
	padding: 0 30px;
	flex-direction: row;
	align-items: center;
	border-radius: 20px;
	background-color: ${props => props.color};
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
`;

const Keyword = styled.Text`
	font-size: ${props => props.theme.itemFontSize};
	font-weight: ${props => props.theme.itemFontWeight};
	color: ${props => props.theme.whiteColor};
	margin: 0 10px;
`;

const CountSpan = styled.View`
	height: ${props => props.theme.itemFontSize};
	justify-content: flex-end;
`;
const Count = styled.Text`
	font-size: ${props => props.theme.itemFontSize - 5};
	font-weight: ${props => props.theme.itemFontWeight};
	color: ${props => props.theme.whiteColor};
	opacity: 0.5;
`;

const Option = styled.View`
	width: 140px;
	height: 60px;
	flex-direction: row;
`;

const OpBtn = styled.View`
	width: 70px;
	height: 60px;
	align-items: center;
	justify-content: center;
`;

const DeleteWrapper = styled.TouchableOpacity`
	width: 60px;
	height: 50px;
	border-radius: 20px;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.color};
`;
const EditWrapper = styled(DeleteWrapper)`
	background-color: ${props => props.color};
`;

const EditIcon = styled.Image.attrs({
	source: require("../../assets/icons/pencilIcon.png")
})`
	width: 20px;
	height: 20px;
`;
const DeleteIcon = styled.Image.attrs({
	source: require("../../assets/icons/garbageIcon.png")
})`
	width: 20px;
	height: 20px;
`;

const Op = ({ color }) => (
	<Option>
		<OpBtn>
			<EditWrapper color={color}>
				<EditIcon style={{ tintColor: "#fff" }} />
			</EditWrapper>
		</OpBtn>
		<OpBtn>
			<DeleteWrapper color={color}>
				<DeleteIcon style={{ tintColor: "#fff" }} />
			</DeleteWrapper>
		</OpBtn>
	</Option>
);

export default ({ item, stack, swiping, swipeRef }) => (
	<Swipeable
		ref={swipeRef}
		onSwipeStart={() => swiping.setValue(item.id)}
		onSwipeRelease={() => swiping.setValue(null)}
		rightButtonWidth={140}
		rightButtons={[<Op color={item.color} />]}
	>
		<Wrapper>
			<Box color={item.color} onPress={() => stack.setValue(item)}>
				<Keyword>{item.keyword}</Keyword>

				<CountSpan>
					<Count>{item.childIds.length}</Count>
				</CountSpan>
			</Box>
		</Wrapper>
	</Swipeable>
);
