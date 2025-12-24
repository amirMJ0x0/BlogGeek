"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Typography from "@tiptap/extension-typography";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import CodeBlock from "@tiptap/extension-code-block";
import { useEffect } from "react";
import "@/components/tiptap-templates/simple/simple-editor.scss";

type BlogContentProps = {
  content: string;
};
const BlogContent = ({ content }: BlogContentProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: { openOnClick: true, enableClickSelection: true },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      CodeBlock,
    ],
    content,
    editable: false,
    immediatelyRender: false,
    textDirection: "auto",
    editorProps: {
      attributes: {
        class: "blog-content !font-vazirmatn ",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);
  return (
    <section className=" max-w-none my-6 leading-relaxed ">
      <EditorContent role="article" readOnly editor={editor} />
    </section>
  );
};

export default BlogContent;
