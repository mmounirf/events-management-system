import type { Content } from "@tiptap/react";

import useTextEditor from "./useTextEditor";

export default function TextEditorRawContent({ content }: { content: Content }) {
	const editor = useTextEditor({ content, editable: false, injectCSS: false });

	if (editor === null || editor?.isDestroyed) {
		return null;
	}

	return editor.getText();
}
