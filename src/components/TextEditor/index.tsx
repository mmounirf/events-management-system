import { Box, InputLabel, Tooltip } from '@mantine/core';
import { Link, RichTextEditor } from '@mantine/tiptap';
import '@mantine/tiptap/styles.css';
import { IconCodeDots } from '@tabler/icons-react';
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { useEditor, type Content, type Editor, type EditorEvents } from '@tiptap/react';
import StarterKit from "@tiptap/starter-kit";

type TextEditorHookType = {
    content?: Content;
    onUpdate?: (props: EditorEvents['update']) => void
}

export function useTextEditor({ content, onUpdate }: TextEditorHookType) {
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
            TextAlign.configure({ types: ["heading", "paragraph"] })
        ],
        content,
        onUpdate
    });
}


export default function TextEditor({ label, editor }: { label: string, editor: Editor | null }) {

    if (!editor) {
        return null
    }



    return (
        <Box>
            <InputLabel>{label}</InputLabel>

            <RichTextEditor editor={editor}>

                {/* <BubbleMenu editor={editor}>
                    <RichTextEditorControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Link />
                    </RichTextEditorControlsGroup>
                </BubbleMenu> */}

                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                        <Tooltip label="Bold" withArrow>
                            <RichTextEditor.Bold />
                        </Tooltip>

                        <Tooltip label="Italic" withArrow>
                            <RichTextEditor.Italic />
                        </Tooltip>

                        <Tooltip label="Underline" withArrow>
                            <RichTextEditor.Underline />
                        </Tooltip>

                        <Tooltip label="Strikethrough" withArrow>
                            <RichTextEditor.Strikethrough />
                        </Tooltip>


                        <Tooltip label="Highlight" withArrow>
                            <RichTextEditor.Highlight />
                        </Tooltip>

                        <Tooltip label="Inline Code" withArrow>
                            <RichTextEditor.Code icon={IconCodeDots} />
                        </Tooltip>

                        <Tooltip label="Code Block" withArrow>
                            <RichTextEditor.CodeBlock />
                        </Tooltip>

                        <Tooltip label="Text Color" withArrow>
                            <RichTextEditor.ColorPicker colors={[
                                '#25262b',
                                '#868e96',
                                '#fa5252',
                                '#e64980',
                                '#be4bdb',
                                '#7950f2',
                                '#4c6ef5',
                                '#228be6',
                                '#15aabf',
                                '#12b886',
                                '#40c057',
                                '#82c91e',
                                '#fab005',
                                '#fd7e14',
                            ]} />
                        </Tooltip>

                        <Tooltip label="Clear Formatting" withArrow>
                            <RichTextEditor.ClearFormatting />
                        </Tooltip>
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <Tooltip label="Blockquote" withArrow>
                            <RichTextEditor.Blockquote />
                        </Tooltip>
                        <Tooltip label="Horizontal Line" withArrow>
                            <RichTextEditor.Hr />
                        </Tooltip>

                        <Tooltip label="Bullet List" withArrow>
                            <RichTextEditor.BulletList />
                        </Tooltip>

                        <Tooltip label="Ordered List" withArrow>
                            <RichTextEditor.OrderedList />
                        </Tooltip>

                        <Tooltip label="Subscript" withArrow>
                            <RichTextEditor.Subscript />
                        </Tooltip>
                        <Tooltip label="Superscript" withArrow>
                            <RichTextEditor.Superscript />
                        </Tooltip>
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>

                        <Tooltip label="Superscript" withArrow>
                            <RichTextEditor.Superscript />
                        </Tooltip>

                        <Tooltip label="Link" withArrow>
                            <RichTextEditor.Link />
                        </Tooltip>
                        <Tooltip label="Unlink" withArrow>
                            <RichTextEditor.Unlink />
                        </Tooltip>
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <Tooltip label="Align Left" withArrow>
                            <RichTextEditor.AlignLeft />
                        </Tooltip>
                        <Tooltip label="Align Center" withArrow>
                            <RichTextEditor.AlignCenter />
                        </Tooltip>
                        <Tooltip label="Align Justify" withArrow>
                            <RichTextEditor.AlignJustify />
                        </Tooltip>
                        <Tooltip label="Align Right" withArrow>
                            <RichTextEditor.AlignRight />
                        </Tooltip>
                    </RichTextEditor.ControlsGroup>



                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
        </Box>
    )
}
