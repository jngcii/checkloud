import React, { useState } from "react";
import HomeScreen from "../../Screens/HomeScreen";

export default () => {
	const [loading, setLoading] = useState(true);

	setTimeout(() => setLoading(false), 200);

	if (loading) return null;

	return <HomeScreen />;
};
