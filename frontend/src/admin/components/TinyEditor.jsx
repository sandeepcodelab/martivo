import { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyEditor() {
  const tinyApiKey = import.meta.env.VITE_TINYMCE_API_KEY;
  const [isDark, setIsDark] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        apiKey={tinyApiKey}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue=""
        init={{
          placeholder: "Description...",
          height: 250,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          skin: isDark ? "oxide-dark" : "oxide",
          content_css: isDark ? "dark" : "default",
          content_style: `body {
                  background-color: ${isDark ? "#030305eb" : "#ffffff"};
                  color: ${isDark ? "#bebebe" : "#020817"};
                  font-family: ui-sans-serif, system-ui, sans-serif;
                  font-size: 15px;
                }
                .mce-content-body[data-mce-placeholder]::before {
                  color: #dae1eab3 !important;
                }`,
        }}
      />
    </>
  );
}
