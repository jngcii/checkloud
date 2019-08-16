import uuidv1 from "uuid/v1";
import { ITEM_FRAGMENT, ITEM_ACT_FRAGMENT, PLAN_FRAGMENT } from "./fragments";
import { GET_ITEMS, GET_ITEM_ACTS } from "./queries/itemQueries";
import { GET_PLANS } from "./queries/planQueries";
import { saveItems, saveItemActs, savePlans } from "./offline";

export const typeDefs = `
    type Query {
        histories: [History]
        
        plans: [Plan]
        plan(id: String!): Plan
        
        items: [Item]
        item(id: String!): Item
        itemSgts: [ItemSgt]
		itemActs: [ItemAct]	
		itemAct(id: String!): ItemAct	
        
        parentKeywords(id: String!): [String]
    }

    type Mutation {
        addItem(keyword: String!, color: String! parentId: String): Boolean
		addItemActs(itemActs: [ItemAct]): [ItemAct]
		addItemAct(keyword: String!): ItemAct
		addPlan(title: String!, itemActs: [ItemAct!]!): Boolean!

		removeItemAct(id: String!): Boolean!

		editPlan(id: String!, title: String, itemActs:[ItemAct]): Boolean!
		editItemAct(id: String!, keyword:String!):Boolean!

		deactivatePlan(id: String!): Boolean!
		checkItem(id: String!): Boolean!
    }

	type History {
		id: String!
		year: Int!
		month: Int!
		date: Int!
		day: Int!
		plans: [Plan]
	}

    type Plan {
        id: String!
		title: String!
		startAt: [Int]
		itemActs: [ItemAct]
        isActive: Boolean!
		isMain: Boolean!
	}

    type Item {
        id: String!
        keyword: String!
        color: String!
        parentId: String
        childIds: [String]
    }
    type ItemSgt {
        id: String!
        keyword: String!
        color: String!
    }
    type ItemAct {
        id: String!
        keyword: String!
        color: String!
        isChecked: Boolean!
        parentId: String
        childIds: [String]
		finishedTime: [Int]
		memo: String
    }
`;

export const resolvers = {
	Query: {
		item: async (_, { id }, { cache }) => {
			const itemId = cache.config.dataIdFromObject({
				__typename: "Item",
				id
			});

			const item = cache.readFragment({
				fragment: ITEM_FRAGMENT,
				id: itemId
			});

			return item;
		},

		parentKeywords: async (_, { id: itemId }, { cache }) => {
			let parentKeywords = [];

			let id = cache.config.dataIdFromObject({
				__typename: "Item",
				id: itemId
			});

			let item = cache.readFragment({
				fragment: ITEM_FRAGMENT,
				id
			});

			if (item.id !== "a") parentKeywords.unshift(item.keyword);

			while (item && item.parentId !== "a") {
				id = cache.config.dataIdFromObject({
					__typename: "Item",
					id: item.parentId
				});

				item = cache.readFragment({
					fragment: ITEM_FRAGMENT,
					id
				});

				if (item) {
					parentKeywords.unshift(item.keyword);
				}
			}
			return parentKeywords;
		}
	},

	Mutation: {
		// add Mutation
		// ******************************************************************

		addItem: async (_, { keyword, color, parentId }, { cache }) => {
			const newItem = {
				__typename: "Item",
				id: uuidv1(),
				keyword,
				color,
				parentId,
				childIds: []
			};

			const idOfParent = await cache.config.dataIdFromObject({
				__typename: "Item",
				id: parentId
			});

			const parentItem = await cache.readFragment({
				fragment: ITEM_FRAGMENT,
				id: idOfParent
			});

			parentItem.childIds.push(newItem.id);

			cache.writeFragment({
				fragment: ITEM_FRAGMENT,
				id: idOfParent,
				data: {
					...parentItem
				}
			});

			const { items } = await cache.readQuery({ query: GET_ITEMS });

			try {
				await cache.writeData({
					data: {
						items: [newItem, ...items]
					}
				});
				await saveItems(cache);

				return true;
			} catch {
				return false;
			}
		},

		addItemActs: async (_, { itemActs: itemActsNew }, { cache }) => {
			let newItemActs = [];

			itemActsNew.forEach(i => {
				const newItemAct = {
					__typename: "ItemAct",
					id: uuidv1(),
					keyword: i.keyword,
					color: i.color,
					isChecked: false,
					parentId: i.parentId,
					childIds: i.childIds,
					finishedTime: [],
					memo: ""
				};

				newItemActs.push(newItemAct);
			});

			const { itemActs } = await cache.readQuery({
				query: GET_ITEM_ACTS
			});

			try {
				await cache.writeData({
					data: {
						itemActs: [...newItemActs, ...itemActs]
					}
				});
				await saveItemActs(cache);

				return newItemActs;
			} catch {
				return null;
			}
		},

		addItemAct: async (_, { keyword }, { cache }) => {
			const newItemAct = {
				__typename: "ItemAct",
				id: uuidv1(),
				keyword,
				color: "#333",
				isChecked: false,
				parentId: null,
				childIds: [],
				finishedTime: [],
				memo: ""
			};

			const { itemActs } = await cache.readQuery({
				query: GET_ITEM_ACTS
			});

			try {
				await cache.writeData({
					data: {
						itemActs: [newItemAct, ...itemActs]
					}
				});

				await saveItemActs(cache);

				return newItemAct;
			} catch {
				return null;
			}
		},

		addPlan: async (_, { title, itemActs }, { cache }) => {
			const today = new Date();
			const year = today.getFullYear();
			const month = today.getMonth();
			const date = today.getDate();
			const day = today.getDay();

			const newPlan = {
				__typename: "Plan",
				id: uuidv1(),
				title,
				startAt: [year, month, date, day],
				itemActs,
				isActive: true,
				isMain: true
			};

			const { plans } = await cache.readQuery({
				query: GET_PLANS
			});

			try {
				await cache.writeData({
					data: {
						plans: [newPlan, ...plans]
					}
				});
				await savePlans(cache);

				return true;
			} catch {
				return false;
			}
		},

		removeItemAct: async (_, { id }, { cache }) => {
			const { itemActs } = cache.readQuery({
				query: GET_ITEM_ACTS
			});

			const itemAct = itemActs.filter(i => i.id == id)[0];

			if (!itemAct) return false;

			const idFound = itemActs.indexOf(itemAct);

			itemActs.splice(idFound, 1);

			try {
				await cache.writeData({
					data: {
						itemActs: [...itemActs]
					}
				});
				saveItemActs(cache);

				return true;
			} catch {
				return false;
			}
		},

		editPlan: async (_, { id, title, itemActs }, { cache }) => {
			const planId = await cache.config.dataIdFromObject({
				__typename: "Plan",
				id
			});

			const plan = await cache.readFragment({
				fragment: PLAN_FRAGMENT,
				id: planId
			});

			console.log(itemActs);

			const updatedPlan = {
				...plan,
				title: title ? title : plan.title,
				itemActs: itemActs ? itemActs : plan.itemActs
			};

			console.log(updatedPlan);

			cache.writeFragment({
				id: planId,
				fragment: PLAN_FRAGMENT,
				data: { ...updatedPlan }
			});

			try {
				await savePlans(cache);
				return true;
			} catch {
				return false;
			}
		},

		editItemAct: async (_, { id, keyword }, { cache }) => {
			const itemId = await cache.config.dataIdFromObject({
				__typename: "ItemAct",
				id
			});

			const itemAct = await cache.readFragment({
				fragment: ITEM_ACT_FRAGMENT,
				id: itemId
			});

			const updatedItem = {
				...itemAct,
				keyword
			};

			cache.writeFragment({
				id: itemId,
				fragment: ITEM_ACT_FRAGMENT,
				data: { ...updatedItem }
			});

			try {
				const res = await saveItemActs(cache);
				if (res) {
					await savePlans(cache);
					return true;
				}
			} catch (error) {
				console.error(error);
				return false;
			}
		},

		deactivatePlan: async (_, { id }, { cache }) => {
			const planId = await cache.config.dataIdFromObject({
				__typename: "Plan",
				id
			});

			const plan = await cache.readFragment({
				fragment: PLAN_FRAGMENT,
				id: planId
			});

			const updatedPlan = {
				...plan,
				isActive: false
			};

			cache.writeFragment({
				id: planId,
				fragment: PLAN_FRAGMENT,
				data: { ...updatedPlan }
			});

			try {
				await savePlans(cache);
				return true;
			} catch {
				return false;
			}
		},

		checkItem: async (_, { id }, { cache }) => {
			const today = new Date();

			const year = today.getFullYear();
			const month = today.getMonth();
			const date = today.getDate();
			const hour = today.getHours();
			const minute = today.getMinutes();
			const second = today.getSeconds();

			const itemId = await cache.config.dataIdFromObject({
				__typename: "ItemAct",
				id
			});

			const itemAct = await cache.readFragment({
				fragment: ITEM_ACT_FRAGMENT,
				id: itemId
			});

			const updatedItem = {
				...itemAct,
				isChecked: itemAct.isChecked ? false : true,
				finishedTime: itemAct.isChecked
					? null
					: [year, month, date, hour, minute, second]
			};

			cache.writeFragment({
				id: itemId,
				fragment: ITEM_ACT_FRAGMENT,
				data: { ...updatedItem }
			});

			try {
				const res = await saveItemActs(cache);
				if (res) {
					await savePlans(cache);
					return true;
				}
			} catch (error) {
				console.error(error);
				return false;
			}
		}
	}
};
