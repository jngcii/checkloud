import React, { useState } from "react";
import styled from "styled-components";
import HomeScreen from "../../Screens/HomeScreen";
import SignScreen from "../../Screens/SignScreen";

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.bgColor};
`;

export default ({ isLoggedIn }) => (
	<Wrapper>{isLoggedIn === null ? <SignScreen /> : <HomeScreen />}</Wrapper>
);
