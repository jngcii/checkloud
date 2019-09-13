import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import Presenter from "./Presenter";

const QUERY = gql`
	{
		isLoggedIn @client
	}
`;

export default () => {
	const { data, loading } = useQuery(QUERY);

    console.log(data)
    if (loading) return null;
    
	return <Presenter isLoggedIn={data.isLoggedIn} />;
};
