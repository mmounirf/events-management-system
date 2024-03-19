import { type Content, EditorContent } from "@tiptap/react";

import useTextEditor from "./useTextEditor";

export default function TextEditorContent({ content }: { content: Content }) {
	const editor = useTextEditor({ content, editable: false, injectCSS: false });

	if (editor === null || editor?.isDestroyed) {
		return null;
	}

	return <EditorContent editor={editor} />;
}
