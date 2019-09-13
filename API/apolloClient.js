import AsyncStorage from "@react-native-community/async-storage";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { resolvers, typeDefs } from "./localState";

const link = new HttpLink({
	uri: "https://ec2-52-79-191-3.ap-northeast-2.compute.amazonaws.com"
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	link,
	cache,
	typeDefs,
	resolvers
});

AsyncStorage.clear();

AsyncStorage.getItem("histories", (_, result) => {
	if (result) {
		cache.writeData({
			data: { histories: JSON.parse(result) }
		});
	} else {
		cache.writeData({
			data: { histories: [] }
		});
	}
});

AsyncStorage.getItem("plans", (_, result) => {
	if (result) {
		cache.writeData({
			data: { plans: JSON.parse(result) }
		});
	} else {
		cache.writeData({
			data: {
				plans: []
			}
		});
	}
});

AsyncStorage.getItem("items", (_, result) => {
	if (result) {
		cache.writeData({
			data: { items: JSON.parse(result) }
		});
	} else {
		cache.writeData({
			data: {
				items: [
					{
						__typename: "Item",
						id: "a",
						keyword: "Category",
						color: "#333",
						parentId: null,
						childIds: []
					}
				]
			}
		});
	}
});

AsyncStorage.getItem("itemSgts", (_, result) => {
	if (result) {
		cache.writeData({
			data: { itemSgts: JSON.parse(result) }
		});
	} else {
		cache.writeData({
			data: { itemSgts: [] }
		});
	}
});

AsyncStorage.getItem("itemActs", (_, result) => {
	if (result) {
		cache.writeData({
			data: { itemActs: JSON.parse(result) }
		});
	} else {
		cache.writeData({
			data: { itemActs: [] }
		});
	}
});

export default client;
