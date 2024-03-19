import { createTheme } from "@mantine/core";

export const theme = createTheme({
	fontFamily:
		"Noto Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
	fontFamilyMonospace:
		"Noto Sans Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
	headings: { fontFamily: "Noto Sans, sans-serif", fontWeight: "800" },
	colors: {
		brand: [
			"#ebefff",
			"#d5dafc",
			"#a9b1f1",
			"#7b87e9",
			"#5362e1",
			"#3a4bdd",
			"#2d3fdc",
			"#1f32c4",
			"#182cb0",
			"#0b259c",
		],
	},
	primaryColor: "brand",
	defaultRadius: "md",
	cursorType: "pointer",
});
