import { Link } from "@mantine/tiptap";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { type EditorOptions, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function useTextEditor(options: Partial<EditorOptions>) {
	return useEditor({
		extensions: [
			StarterKit,
			Underline,
			Link,
			Superscript,
			SubScript,
			Highlight,
			TextStyle,
			Color,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
		],
		...options,
	});
}
