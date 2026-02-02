/**
 * State selector for the MenuBar component.
 * Extracts the relevant editor state for rendering menu buttons.
 */
export function menuBarStateSelector(ctx) {
  return {
    // Text formatting
    isBold: ctx.editor.isActive("bold") || false,
    canBold: ctx.editor.can().chain().toggleBold().run() || false,

    isItalic: ctx.editor.isActive("italic") || false,
    canItalic: ctx.editor.can().chain().toggleItalic().run() || false,

    isUnderline: ctx.editor.isActive("underline") || false,
    canUnderline: ctx.editor.can().chain().toggleUnderline().run() || false,

    isStrike: ctx.editor.isActive("strike") || false,
    canStrike: ctx.editor.can().chain().toggleStrike().run() || false,

    isCode: ctx.editor.isActive("code") || false,
    canCode: ctx.editor.can().chain().toggleCode().run() || false,

    canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() || false,
    canClearNodes: ctx.editor.can().chain().clearNodes().run() || false,

    // Block types
    isParagraph: ctx.editor.isActive("paragraph") || false,

    // Heading active state
    isHeading1: ctx.editor.isActive("heading", { level: 1 }) || false,
    isHeading2: ctx.editor.isActive("heading", { level: 2 }) || false,
    isHeading3: ctx.editor.isActive("heading", { level: 3 }) || false,
    isHeading4: ctx.editor.isActive("heading", { level: 4 }) || false,
    isHeading5: ctx.editor.isActive("heading", { level: 5 }) || false,
    isHeading6: ctx.editor.isActive("heading", { level: 6 }) || false,

    // Heading can state
    canHeading1:
      ctx.editor.can().chain().focus().toggleHeading({ level: 1 }).run() ||
      false,
    canHeading2:
      ctx.editor.can().chain().focus().toggleHeading({ level: 2 }).run() ||
      false,
    canHeading3:
      ctx.editor.can().chain().focus().toggleHeading({ level: 3 }).run() ||
      false,
    canHeading4:
      ctx.editor.can().chain().focus().toggleHeading({ level: 4 }).run() ||
      false,
    canHeading5:
      ctx.editor.can().chain().focus().toggleHeading({ level: 5 }).run() ||
      false,
    canHeading6:
      ctx.editor.can().chain().focus().toggleHeading({ level: 6 }).run() ||
      false,

    // Lists and blocks active state
    isBulletList: ctx.editor.isActive("bulletList") || false,
    isOrderedList: ctx.editor.isActive("orderedList") || false,
    isCodeBlock: ctx.editor.isActive("codeBlock") || false,
    isBlockquote: ctx.editor.isActive("blockquote") || false,

    // Lists and blocks can state
    canBulletList:
      ctx.editor.can().chain().focus().toggleBulletList().run() || false,
    canOrderedList:
      ctx.editor.can().chain().focus().toggleOrderedList().run() || false,
    canBlockquote:
      ctx.editor.can().chain().focus().toggleBlockquote().run() || false,

    // Text alignment active state
    isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) || false,
    isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) || false,
    isAlignRight: ctx.editor.isActive({ textAlign: "right" }) || false,
    isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }) || false,

    // Text alignment active state
    canAlignLeft:
      ctx.editor.can().chain().focus().setTextAlign("left").run() || false,
    canAlignCenter:
      ctx.editor.can().chain().focus().setTextAlign("center").run() || false,
    canAlignRight:
      ctx.editor.can().chain().focus().setTextAlign("right").run() || false,
    canAlignJustify:
      ctx.editor.can().chain().focus().setTextAlign("justify").run() || false,

    // History
    canUndo: ctx.editor.can().chain().undo().run() || false,
    canRedo: ctx.editor.can().chain().redo().run() || false,

    // LineBreak
    canHardBreak:
      ctx.editor.can().chain().focus().setHardBreak().run() || false,
  };
}
