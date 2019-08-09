import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	background-color: ${props => props.theme.navBtnColor};
	${props => props.theme.navShadow};
`;

export default () => <Wrapper />;
