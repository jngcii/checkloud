const MONTH_FONT_SIZE = 20;
const MONTH_FONT_WEIGHT = "600";

export default {
	blackColor: "#333",
	greyColor: "#777",
	whiteColor: "#fff",
	navBtnColor: "#f6f6f6",
	planBoxColor: "#f6f6f6",
	bgColor: "#e6e6e6",
	bgColorT: "rgba(230,230,230,0.8)",
	borderColor: "#efefef",
	memoColor: "#eaeaea",
	submitBtnColor: "#ccc",
	feedItemBorderColor: "#ddd",

	redColor: "#f54278",
	doneBtnColor: "#4285d6",

	userInputFontSize: 17,
	planTitleFontSize: 23,
	dateFontSize: 11,
	itemActFontSize: 17,
	percentageFontSize: 40,
	percentBarFontSize: 14,
	memoFontSize: 14,
	itemHeaderFontSize: 23,
	itemFontSize: 20,
	usedItemFontSize: 15,
	previewPlanTitleFontSize: 14,
	previewItemFontSize: 12,
	monthFontSize: MONTH_FONT_SIZE,
	dayTitleFontSize: 13,
	calendarDateFontSize: 15,
	completeFontSize: 11,

	userInputFontWeight: "500",
	planTitleFontWeight: "700",
	dateFontWeight: "400",
	itemActFontWeight: "500",
	percentageFontWeight: "800",
	percentBarFontWeight: "700",
	memoFontWeight: "400",
	itemHeaderFontWeight: "500",
	itemFontWeight: "500",
	usedItemFontWeight: "500",
	previewPlanTitleFontWeight: "700",
	previewItemFontWeight: "400",
	monthFontWeight: MONTH_FONT_WEIGHT,
	dayTitleFontWeight: "500",
	calendarDateFontWeight: "600",
	completeFontWeight: "600",

	navShadow: `
		box-shadow: 0 0 3px rgba(0,0,0,0.4);
	`,

	itemActBox: `
        width: 100%;
        height: 50px;
        flex-direction: row;
	`,

	removeIcon: `
		width: 20px;
		height: 20px;
		border-radius: 10px;
		background-color: #f54278;
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
		align-items: center;
		justify-content: center;
	`,
	minus: `
		width: 15px;
		height: 4px;
		border-radius: 2px;
		background-color: #f6f6f6;
	`,

	dragTriggerIcon: `
		width: 22px;
		height: 22px;
	`,

	monthHeader: `
		width: 100%;
		height: 45px;
		padding: 0 25px;
		justify-content: center;
	`,
	monthText: `
		font-size: ${MONTH_FONT_SIZE};
		font-weight: ${MONTH_FONT_WEIGHT};
		color: #333;
	`
};
