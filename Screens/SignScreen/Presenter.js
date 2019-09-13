import React from "react";
import styled from "styled-components";
import LoginScreen from "../LoginScreen";
import SignUpScreen from "../SignUpScreen";

const Wrapper = styled.KeyboardAvoidingView`
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.planBoxColor};
`;

const LogoContainer = styled.View`
	height: 40%;
	width: 100%;
	align-items: center;
	justify-content: center;
`;
const LogoPreview = styled.Text`
	font-size: 40px;
	font-weight: 800;
	color: ${props => props.theme.doneBtnColor};
`;

const Contents = styled.View`
	flex: 1;
	width: 100%;
`;

export default ({ type }) => (
	<Wrapper
		behavior="padding"
		// keyboardVerticalOffset={20 + getStatusBarHeight() + 50 * floor}
		enabled={true}
	>
		<LogoContainer>
			<LogoPreview>CC</LogoPreview>
		</LogoContainer>

		<Contents>
			{type.value === "in" ? (
				<LoginScreen type={type} />
			) : (
				<SignUpScreen type={type} />
			)}
		</Contents>
	</Wrapper>
);
