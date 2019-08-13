import React from "react";
import { useQuery } from "react-apollo-hooks";
import { GET_PARENT_KEYWORDS } from "../../API/queries/itemQueries";
import Presenter from "./Presenter";

export default ({ id }) => {
	const { loading, data } = useQuery(GET_PARENT_KEYWORDS, {
		variables: { id }
	});

	if (loading) return null;

	const { parentKeywords } = data;

	return <Presenter parentKeywords={parentKeywords} />;
};
