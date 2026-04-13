import React, { useRef } from "react";
import { useTiptap, useTiptapState } from "@tiptap/react";
import { menuBarStateSelector } from "./menuBarState";
import TooltipContext from "./Tooltip";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  CornerDownLeft,
  Undo,
  Redo,
  Eraser,
  RemoveFormatting,
  Pilcrow,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  EllipsisVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContainerWidth } from "@/hooks/useContainerWidth";

export default function MenuBar() {
  const { editor, isReady } = useTiptap();
  const isDisabled = !editor;

  const editorState = useTiptapState(menuBarStateSelector);

  const containerRef = useRef(null);
  const width = useContainerWidth(containerRef);

  const iconProps = { size: 16, strokeWidth: 2 };

  // console.log("Menubar width:", width);

  // if (!isReady || !editor) return null;

  return (
    <div className="control-group w-full">
      <div
        ref={containerRef}
        className="Button-group h-10 flex gap-2 w-full overflow-hidden"
      >
        <div className="group-1 flex gap-1">
          <TooltipContext content="Undo">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={isDisabled || !editorState.canUndo}
            >
              <Undo {...iconProps} />
            </Button>
          </TooltipContext>

          <TooltipContext content="Redo">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={isDisabled || !editorState.canRedo}
            >
              <Redo {...iconProps} />
            </Button>
          </TooltipContext>
        </div>

        <Separator orientation="vertical" />

        <div className="group-2 flex gap-1">
          <TooltipContext content="Bold">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              disabled={isDisabled || !editorState.canBold}
              className={
                editorState.isBold ? "bg-gray-300 dark:bg-neutral-800" : ""
              }
            >
              <Bold {...iconProps} />
            </Button>
          </TooltipContext>

          <TooltipContext content="Italic">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              disabled={isDisabled || !editorState.canItalic}
              className={
                editorState.isItalic ? "bg-gray-300 dark:bg-neutral-800" : ""
              }
            >
              <Italic {...iconProps} />
            </Button>
          </TooltipContext>

          <TooltipContext content="Underline">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              disabled={isDisabled || !editorState.canUnderline}
              className={
                editorState.isUnderline ? "bg-gray-300 dark:bg-neutral-800" : ""
              }
            >
              <Underline {...iconProps} />
            </Button>
          </TooltipContext>

          <TooltipContext content="Strike">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              disabled={isDisabled || !editorState.canStrike}
              className={
                editorState.isStrike ? "bg-gray-300 dark:bg-neutral-800" : ""
              }
            >
              <Strikethrough {...iconProps} />
            </Button>
          </TooltipContext>

          <TooltipContext content="Code">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.chain().focus().toggleCode().run()}
              disabled={isDisabled || !editorState.canCode}
              className={
                editorState.isCode ? "bg-gray-300 dark:bg-neutral-800" : ""
              }
            >
              <Code {...iconProps} />
            </Button>
          </TooltipContext>

          <TooltipContext content="Clear marks">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.chain().focus().unsetAllMarks().run()}
              disabled={isDisabled || !editorState.canClearMarks}
            >
              <RemoveFormatting {...iconProps} />
            </Button>
          </TooltipContext>

          <TooltipContext content="Eraser">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => editor?.chain().focus().clearNodes().run()}
              disabled={isDisabled || !editorState.canClearNodes}
            >
              <Eraser {...iconProps} />
            </Button>
          </TooltipContext>
        </div>

        <Separator orientation="vertical" />

        {width < 595 ? null : (
          <div className="group-3 flex gap-1">
            {/* <Button
            size="icon"
            variant="ghost"
            onClick={() => editor?.chain().focus().toggleParagraph().run()}
            className={editorState.isParagraph ? "bg-gray-300 dark:bg-neutral-800" : ""}
          >
            <Pilcrow {...iconProps} />
          </Button> */}

            <TooltipContext content="Heading 1">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 1 }).run()
                }
                disabled={isDisabled || !editorState.canHeading1}
                className={
                  editorState.isHeading1
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <Heading1 {...iconProps} />
              </Button>
            </TooltipContext>

            <TooltipContext content="Heading 2">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 2 }).run()
                }
                disabled={isDisabled || !editorState.canHeading2}
                className={
                  editorState.isHeading2
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <Heading2 {...iconProps} />
              </Button>
            </TooltipContext>

            <TooltipContext content="Heading 3">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 3 }).run()
                }
                disabled={isDisabled || !editorState.canHeading3}
                className={
                  editorState.isHeading3
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <Heading3 {...iconProps} />
              </Button>
            </TooltipContext>

            <TooltipContext content="Heading 4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  editor?.chain().focus().toggleHeading({ level: 4 }).run()
                }
                disabled={isDisabled || !editorState.canHeading4}
                className={
                  editorState.isHeading4
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <Heading4 {...iconProps} />
              </Button>
            </TooltipContext>

            <Separator orientation="vertical" />
          </div>
        )}
        {width < 768 ? null : (
          <div className="group-4 flex gap-1">
            <TooltipContext content="Bullet list">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                disabled={isDisabled || !editorState.canBulletList}
                className={
                  editorState.isBulletList
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <List {...iconProps} />
              </Button>
            </TooltipContext>

            <TooltipContext content="Ordered list">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={isDisabled || !editorState.canOrderedList}
                className={
                  editorState.isOrderedList
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <ListOrdered {...iconProps} />
              </Button>
            </TooltipContext>

            <TooltipContext content="Block quote">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                disabled={isDisabled || !editorState.canBlockquote}
                className={
                  editorState.isBlockquote
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <Quote {...iconProps} />
              </Button>
            </TooltipContext>

            <TooltipContext content="Hard break">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => editor?.chain().focus().setHardBreak().run()}
                disabled={isDisabled || !editorState.canHardBreak}
              >
                <CornerDownLeft {...iconProps} />
              </Button>
            </TooltipContext>

            <Separator orientation="vertical" />
          </div>
        )}

        {width < 890 ? null : (
          <div className="group-5 flex gap-1">
            <TooltipContext content="Align left">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("left").run()
                }
                disabled={isDisabled || !editorState.canAlignLeft}
                className={
                  editorState.isAlignLeft
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <AlignLeft {...iconProps} />
              </Button>
            </TooltipContext>

            <TooltipContext content="Align center">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("center").run()
                }
                disabled={isDisabled || !editorState.canAlignCenter}
                className={
                  editorState.isAlignCenter
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <AlignCenter {...iconProps} />
              </Button>
            </TooltipContext>

            <TooltipContext content="Align right">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("right").run()
                }
                disabled={isDisabled || !editorState.canAlignRight}
                className={
                  editorState.isAlignRight
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <AlignRight {...iconProps} />
              </Button>
            </TooltipContext>

            <TooltipContext content="Align justify">
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  editor?.chain().focus().setTextAlign("justify").run()
                }
                disabled={isDisabled || !editorState.canAlignJustify}
                className={
                  editorState.isAlignJustify
                    ? "bg-gray-300 dark:bg-neutral-800"
                    : ""
                }
              >
                <AlignJustify {...iconProps} />
              </Button>
            </TooltipContext>
          </div>
        )}

        {width < 890 ? (
          <div>
            <DropdownMenu>
              <TooltipContext content="More">
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline">
                    <EllipsisVertical />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipContext>
              <DropdownMenuContent align="end">
                {width < 595 ? (
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Headings</DropdownMenuLabel>
                    <div className="group-3 flex gap-1">
                      <TooltipContext content="Heading 1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor
                              ?.chain()
                              .focus()
                              .toggleHeading({ level: 1 })
                              .run()
                          }
                          disabled={isDisabled || !editorState.canHeading1}
                          className={
                            editorState.isHeading1
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <Heading1 {...iconProps} />
                        </Button>
                      </TooltipContext>

                      <TooltipContext content="Heading 2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor
                              ?.chain()
                              .focus()
                              .toggleHeading({ level: 2 })
                              .run()
                          }
                          disabled={isDisabled || !editorState.canHeading2}
                          className={
                            editorState.isHeading2
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <Heading2 {...iconProps} />
                        </Button>
                      </TooltipContext>

                      <TooltipContext content="Heading 3">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor
                              ?.chain()
                              .focus()
                              .toggleHeading({ level: 3 })
                              .run()
                          }
                          disabled={isDisabled || !editorState.canHeading3}
                          className={
                            editorState.isHeading3
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <Heading3 {...iconProps} />
                        </Button>
                      </TooltipContext>

                      <TooltipContext content="Heading 4">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor
                              ?.chain()
                              .focus()
                              .toggleHeading({ level: 4 })
                              .run()
                          }
                          disabled={isDisabled || !editorState.canHeading4}
                          className={
                            editorState.isHeading4
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <Heading4 {...iconProps} />
                        </Button>
                      </TooltipContext>
                    </div>
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                ) : null}

                {width < 768 ? (
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Lists</DropdownMenuLabel>
                    <div className="group-4 flex gap-1">
                      <TooltipContext content="Bullet list">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor?.chain().focus().toggleBulletList().run()
                          }
                          disabled={isDisabled || !editorState.canBulletList}
                          className={
                            editorState.isBulletList
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <List {...iconProps} />
                        </Button>
                      </TooltipContext>

                      <TooltipContext content="Ordered list">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor.chain().focus().toggleOrderedList().run()
                          }
                          disabled={isDisabled || !editorState.canOrderedList}
                          className={
                            editorState.isOrderedList
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <ListOrdered {...iconProps} />
                        </Button>
                      </TooltipContext>

                      <TooltipContext content="Block quote">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor?.chain().focus().toggleBlockquote().run()
                          }
                          disabled={isDisabled || !editorState.canBlockquote}
                          className={
                            editorState.isBlockquote
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <Quote {...iconProps} />
                        </Button>
                      </TooltipContext>

                      <TooltipContext content="Hard break">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor?.chain().focus().setHardBreak().run()
                          }
                          disabled={isDisabled || !editorState.canHardBreak}
                        >
                          <CornerDownLeft {...iconProps} />
                        </Button>
                      </TooltipContext>
                    </div>
                    <DropdownMenuSeparator />
                  </DropdownMenuGroup>
                ) : null}

                {width < 890 ? (
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Text alignments</DropdownMenuLabel>
                    <div className="group-5 flex gap-1">
                      <TooltipContext content="Align left">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor?.chain().focus().setTextAlign("left").run()
                          }
                          disabled={isDisabled || !editorState.canAlignLeft}
                          className={
                            editorState.isAlignLeft
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <AlignLeft {...iconProps} />
                        </Button>
                      </TooltipContext>

                      <TooltipContext content="Align center">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor?.chain().focus().setTextAlign("center").run()
                          }
                          disabled={isDisabled || !editorState.canAlignCenter}
                          className={
                            editorState.isAlignCenter
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <AlignCenter {...iconProps} />
                        </Button>
                      </TooltipContext>

                      <TooltipContext content="Align right">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor?.chain().focus().setTextAlign("right").run()
                          }
                          disabled={isDisabled || !editorState.canAlignRight}
                          className={
                            editorState.isAlignRight
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <AlignRight {...iconProps} />
                        </Button>
                      </TooltipContext>

                      <TooltipContext content="Align justify">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            editor
                              ?.chain()
                              .focus()
                              .setTextAlign("justify")
                              .run()
                          }
                          disabled={isDisabled || !editorState.canAlignJustify}
                          className={
                            editorState.isAlignJustify
                              ? "bg-gray-300 dark:bg-neutral-800"
                              : ""
                          }
                        >
                          <AlignJustify {...iconProps} />
                        </Button>
                      </TooltipContext>
                    </div>
                  </DropdownMenuGroup>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : null}
      </div>
    </div>
  );
}
