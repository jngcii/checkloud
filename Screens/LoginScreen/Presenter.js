import React from "react";
import styled from "styled-components";
import InputUserText from "../../Components/InputUserText";

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.planBoxColor};
`;

const InputContainer = styled.View`
	flex: 2;
	width: 100%;
	align-items: center;
`;
const InputBox = styled.View`
	width: 80%;
	height: 45px;
	flex-direction: row;
	padding: 0 15px;
	background-color: ${props => props.theme.bgColor};
	border-radius: 15px;
	border: 1px solid #ddd;
	margin: 6px auto;
`;
const Swap = styled.TouchableOpacity`
	width: 100%;
	height: 30px;
	align-items: center;
	justify-content: center;
`;
const SwapText = styled.Text`
	font-size: 14px;
	font-weight: 500;
	color: ${props => props.theme.doneBtnColor};
`;

const Footer = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
	justify-content: flex-end;
	padding-bottom: 40px;
`;
const SubmitBtn = styled.TouchableOpacity`
	width: 80%;
	height: 50px;
	border-radius: 20px;
	background-color: ${props => props.theme.doneBtnColor};
	align-items: center;
	justify-content: center;
`;
const LogInText = styled.Text`
	font-size: 18px;
	font-weight: 700;
	color: ${props => props.theme.whiteColor};
`;

export default ({ type, username, password }) => (
	<Wrapper>
		<InputContainer>
			<InputBox>
				<InputUserText
					{...username}
					placeholder={"username"}
					secureTextEntry={false}
				/>
			</InputBox>

			<InputBox>
				<InputUserText
					{...password}
					placeholder={"password"}
					secureTextEntry={true}
				/>
			</InputBox>

			<Swap onPress={() => type.setValue("up")}>
				<SwapText>Doesn't have username?</SwapText>
			</Swap>
		</InputContainer>

		<Footer>
			<SubmitBtn>
				<LogInText>Sign In</LogInText>
			</SubmitBtn>
		</Footer>
	</Wrapper>
);
