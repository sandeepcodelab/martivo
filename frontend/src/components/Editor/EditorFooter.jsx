import { useEditorState } from "@tiptap/react";

export default function EditorFooter({ editor }) {
  const { words, characters } = useEditorState({
    editor,
    selector: ({ editor }) => ({
      words: editor.storage.characterCount.words(),
      characters: editor.storage.characterCount.characters(),
    }),
  });

  return (
    <div className="flex justify-end gap-4 text-sm text-gray-500">
      <span>{words} words</span>
      <span>{characters} characters</span>
    </div>
  );
}
