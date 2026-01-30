import React from "react";
import "./styles.scss";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Tiptap, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";

const extensions = [
  TextStyleKit,
  StarterKit,
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
  }),
];

export default function Editor() {
  const editor = useEditor({
    extensions,
    content: `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
</p>
<blockquote>
  Wow, that's amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`,
  });

  return (
    <div className="border-2 w-full min-w-md">
      <Tiptap instance={editor}>
        <div className="p-2 border-b-1">
          <MenuBar />
        </div>
        <Tiptap.Content className="tiptap-scrollbar p-5 max-h-[400px] overflow-auto" />
      </Tiptap>
    </div>
  );
}
