import React from "react";
import Presenter from "./Presenter";

export default ({ addedItem, addedItemSgt, addedItemAct }) => {
	return <Presenter addedItem={addedItem} addedItemSgt={addedItemSgt} />;
};
