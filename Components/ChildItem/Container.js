import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_ITEM } from "../../API/queries/itemQueries";
import Presenter from "./Presenter";

export default ({ id }) => {
	const { data, loading } = useQuery(GET_ITEM, { variables: { id } });

	if (loading) return null;

	const { item } = data;

	return <Presenter item={item} />;
};
