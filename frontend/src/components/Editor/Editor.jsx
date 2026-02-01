import React, { useImperativeHandle } from "react";
import "./styles.scss";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Tiptap, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { CharacterCount } from "@tiptap/extension-character-count";
import MenuBar from "./MenuBar";
import EditorFooter from "./EditorFooter";

const extensions = [
  TextStyleKit,
  StarterKit,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),
  CharacterCount,
];

export default function Editor({ ref, initialValue = "" }) {
  const editor = useEditor({
    extensions,
    content: initialValue,
  });

  useImperativeHandle(ref, () => ({
    getJSON: () => editor?.getJSON(),
    getHTML: () => editor?.getHTML(),
  }));

  if (!editor) return null;

  return (
    <div className="border-2 w-full min-w-md rounded-lg overflow-hidden">
      <Tiptap instance={editor}>
        <div className=" bg-card p-2 border-b">
          <MenuBar />
        </div>
        <div onClick={() => editor?.commands.focus()}>
          <Tiptap.Content className="tiptap-scrollbar h-[399px] max-h-100 overflow-auto py-5 px-8" />
        </div>
        <div className="border-t px-4 py-1">
          <EditorFooter editor={editor} />
        </div>
      </Tiptap>
    </div>
  );
}
