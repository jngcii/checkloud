// import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { GET_ITEMS, GET_ITEM_ACTS } from "./queries/itemQueries";
import { GET_PLANS } from "./queries/planQueries";

// ************************************************************
// save Item offline
export const saveItems = async cache => {
	const { items } = cache.readQuery({ query: GET_ITEMS });
	const jsonItems = JSON.stringify(items);
	try {
		await AsyncStorage.setItem("items", jsonItems);
		return true;
	} catch {
		return false;
	}
};

export const saveItemActs = async cache => {
	const { itemActs } = cache.readQuery({ query: GET_ITEM_ACTS });
	const jsonItemActs = JSON.stringify(itemActs);
	try {
		await AsyncStorage.setItem("itemActs", jsonItemActs);
		return true;
	} catch {
		return false;
	}
};

export const savePlans = async cache => {
	const { plans } = cache.readQuery({ query: GET_PLANS });
	const jsonPlans = JSON.stringify(plans);
	try {
		await AsyncStorage.setItem("plans", jsonPlans);
		return true;
	} catch {
		return false;
	}
};
