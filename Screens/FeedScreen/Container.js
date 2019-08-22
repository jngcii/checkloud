import React from "react";
import { ActivityIndicator } from "react-native";
import Presenter from "./Presenter";

export default ({ stickyIndex, feeds, loading, refetch }) => {
	if (loading.value) return <ActivityIndicator />;

	return (
		<Presenter
			stickyIndex={stickyIndex}
			feeds={feeds}
			loading={loading}
			refetch={refetch}
		/>
	);
};
