import React from "react";
import styled from "styled-components";
import InputKeywordText from "../InputKeywordText";
import Swipeable from "react-native-swipeable";
import Colors from "../Colors";

const Container = styled.View`
	width: 100%;
`;

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
	margin-right: 10px;
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

const SubmitSpan = styled.TouchableOpacity`
	width: 36px;
	height: 36px;
	border-radius: 18px;
	border: 2px solid #fff;
	right: -20px;
	align-items: center;
	justify-content: center;
`;
const SubmitIcon = styled.Image.attrs({
	source: require("../../assets/icons/checkIcon.png")
})`
	width: 17px;
	height: 17px;
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

const ColorPicker = styled.View`
	width: 100%;
	height: 40px;
	justify-content: center;
	align-items: flex-end;
`;

const ShowColorsBtn = styled.TouchableOpacity`
	width: 150px;
	height: 32px;
	align-items: center;
`;
const ShowColors = styled.Text`
	font-size: ${props => props.theme.percentBarFontSize};
	font-weight: 400;
	color: ${props => props.theme.doneBtnColor};
`;

const ColorList = styled.View`
	width: 100%;
	height: 30px;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
`;

const Color = styled.TouchableOpacity`
	width: ${props => (props.picked ? 26 : 20)};
	height: ${props => (props.picked ? 26 : 20)};
	border-radius: ${props => (props.picked ? 13 : 10)};
	background-color: ${props => props.color};
	box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
`;

const ColorGroup = ({ newColor }) => (
	<ColorList>
		{Colors.map(c => (
			<Color
				key={c}
				color={c}
				picked={newColor.value == c}
				onPressOut={() => newColor.setValue(c)}
			/>
		))}
	</ColorList>
);

const Op = ({ color, onPressEditBtn, onRemoveItem }) => (
	<Option>
		<OpBtn>
			<EditWrapper color={color} onPressOut={onPressEditBtn}>
				<EditIcon style={{ tintColor: "#fff" }} />
			</EditWrapper>
		</OpBtn>
		<OpBtn>
			<DeleteWrapper color={color} onPressOut={onRemoveItem}>
				<DeleteIcon style={{ tintColor: "#fff" }} />
			</DeleteWrapper>
		</OpBtn>
	</Option>
);

export default ({
	// props
	item,
	stack,
	swiping,
	isSwiping,
	editing,
	// state
	newKeyword,
	newColor,
	colorVisible,
	swipeRef,
	// func
	onRemoveItem,
	onPressEditBtn,
	onEndEditing
}) => (
	<Container>
		<Swipeable
			ref={swipeRef}
			onSwipeStart={() => {
				swiping.setValue(item.id);
				isSwiping.setValue(true);
			}}
			onSwipeRelease={() => isSwiping.setValue(false)}
			rightButtonWidth={140}
			rightButtons={[
				<Op
					color={item.color}
					onPressEditBtn={onPressEditBtn}
					onRemoveItem={onRemoveItem}
				/>
			]}
		>
			<Wrapper>
				<Box
					color={newColor.value}
					disabled={editing.value == item.id}
					onPress={() => {
						editing.setValue(null);
						stack.setValue(item);
					}}
				>
					{editing.value == item.id ? (
						<InputKeywordText
							{...newKeyword}
							onSubmitEditing={onEndEditing}
							blurOnSubmit={true}
							color={"white"}
							autoFocus={true}
						/>
					) : (
						<Keyword>{item.keyword}</Keyword>
					)}

					{editing.value == item.id ? (
						<SubmitSpan onPress={onEndEditing}>
							<SubmitIcon style={{ tintColor: "#fff" }} />
						</SubmitSpan>
					) : (
						<CountSpan>
							<Count>{item.childIds.length}</Count>
						</CountSpan>
					)}
				</Box>
			</Wrapper>
		</Swipeable>

		{editing.value == item.id && (
			<ColorPicker>
				{colorVisible.value ? (
					<ColorGroup newColor={newColor} />
				) : (
					<ShowColorsBtn onPress={() => colorVisible.setValue(true)}>
						<ShowColors>change color...</ShowColors>
					</ShowColorsBtn>
				)}
			</ColorPicker>
		)}
	</Container>
);
