import React from "react";
import { Animated, StyleSheet } from "react-native";
import styled from "styled-components";
import PlanSwiper from "../../Components/PlanSwiper";

const Wrapper = styled.SafeAreaView`
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: flex-end;
	background-color: ${props => props.theme.bgColor};
`;

const PreviewWrapper = styled.View`
	width: 100%;
	height: 230px;
`;
const PreviewHeader = styled.View`
	width: 100%;
	height: 30px;
`;
const PreviewBody = styled.View`
	flex: 1;
	width: 100%;
`;

const PaginationWrapper = styled.View`
	width: 100%;
	height: 30px;
`;

const Footer = styled.View`
	width: 100%;
	height: 100px;
`;
const NavBtn = styled.TouchableOpacity`
	width: 100%;
	height: 100%;
	border-radius: 20px;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	background-color: ${props => props.theme.navBtnColor};
`;

const Preview = () => (
	<PreviewWrapper>
		<PreviewHeader />
		<PreviewBody />
	</PreviewWrapper>
);

const Pagination = () => <PaginationWrapper />;

const Item = () => (
	<Animated.View style={[styles.navStyle, styles.itemStyle]}>
		<NavBtn />
	</Animated.View>
);

const History = () => (
	<Animated.View style={[styles.navStyle, styles.historyStyle]}>
		<NavBtn />
	</Animated.View>
);

export default () => (
	<React.Fragment>
		<Wrapper>
			<Preview />
			<Pagination />

			<Footer>
				<Item />

				<History />
			</Footer>
		</Wrapper>

		<PlanSwiper />
	</React.Fragment>
);

const styles = StyleSheet.create({
	navStyle: {
		width: 100,
		height: 100,
		padding: 20,
		position: "absolute"
	},
	itemStyle: {
		alignSelf: "flex-start"
	},
	historyStyle: {
		alignSelf: "flex-end"
	}
});
