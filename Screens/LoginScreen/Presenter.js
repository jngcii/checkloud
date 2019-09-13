import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.theme.bgColor};
`;

const LogoContainer = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
	justify-content: center;
`;
const LogoPreview = styled.Text`
	font-size: 40;
	font-weight: 800;
	color: ${props => props.theme.blueColor};
`;

const InputContainer = styled.View`
	flex: 2;
	width: 100%;
	align-items: center;
	justify-content: center;
`;

const InputBox = styled.View`
	width: 80%;
	height: 45px;
	background-color: #ddd;
	border-radius: 10px;
	border: 1px solid #ccc;
`;

const Footer = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
	justify-content: center;
`;
const Submit = styled.Text`
	font-size: 18;
	font-weight: 500;
	color: blue;
`;

export default () => (
	<Wrapper>
		<LogoContainer>
			<LogoPreview>CC</LogoPreview>
		</LogoContainer>

		<InputContainer>
			<InputBox />
			<InputBox />
		</InputContainer>

		<Footer>
			<Submit>SIGN IN</Submit>
		</Footer>
	</Wrapper>
);
