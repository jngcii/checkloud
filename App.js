import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ThemeProvider } from "styled-components";
import Theme from "./Styles/Theme";
import client from "./API/apolloClient";
import AppContainer from "./Components/AppContainer";

export default () => (
	<ApolloProvider client={client}>
		<ApolloHooksProvider client={client}>
			<ThemeProvider theme={Theme}>
				<AppContainer />
			</ThemeProvider>
		</ApolloHooksProvider>
	</ApolloProvider>
);
