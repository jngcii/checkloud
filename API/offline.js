// import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { GET_HISTORIES } from "./queries/historyQueries";
import { GET_PLANS } from "./queries/planQueries";
import { GET_ITEMS, GET_ITEM_ACTS } from "./queries/itemQueries";

// ************************************************************
// save Item offline

export const saveToken = async token => {
	AsyncStorage.setItem("token", token);
};

export const deleteToken = async token => {
	AsyncStorage.removeItem("token");
};

export const saveHistories = async cache => {
	const { histories } = cache.readQuery({ query: GET_HISTORIES });
	const jsonHistories = JSON.stringify(histories);
	try {
		await AsyncStorage.setItem("histories", jsonHistories);
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
