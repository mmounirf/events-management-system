import { EditorContent, type Content } from '@tiptap/react';

import useTextEditor from "./useTextEditor";

export default function TextEditorContent({ content }: { content: Content }) {
    const editor = useTextEditor({ content, editable: false });

    if (!editor) {
        return null
    }

    return <EditorContent editor={editor} />
}
