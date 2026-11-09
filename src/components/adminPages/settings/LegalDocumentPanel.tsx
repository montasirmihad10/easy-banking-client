"use client";

import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Eye,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pencil,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ToolbarButton = ({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={cn(
      "rounded-md p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-[#104042]",
      active && "bg-[#104042]/10 text-[#104042]",
    )}
  >
    {children}
  </button>
);

const LegalDocumentPanel = ({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  const [mode, setMode] = useState<"preview" | "edit">("preview");
  const [draft, setDraft] = useState(value || "");

  useEffect(() => {
    if (mode === "preview") {
      setDraft(value || "");
    }
  }, [value, mode]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#104042] underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Write your policy content here...",
      }),
    ],
    content: value || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor: current }) => {
      if (current.isDestroyed) return;
      setDraft(current.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[320px] max-w-none px-4 py-3 focus:outline-none prose prose-slate prose-headings:text-[#104042]",
      },
    },
  });

  const isEditorReady = () =>
    Boolean(editor && !editor.isDestroyed && editor.view);

  const startEdit = () => {
    const next = value || "<p></p>";
    setDraft(next);
    setMode("edit");
    if (isEditorReady()) {
      editor!.commands.setContent(next, { emitUpdate: false });
    }
  };

  const cancelEdit = () => {
    setDraft(value || "");
    setMode("preview");
  };

  const applyEdit = () => {
    const html = isEditorReady() ? editor!.getHTML() : draft;
    onChange(html);
    setDraft(html);
    setMode("preview");
  };

  const setLink = () => {
    if (!isEditorReady()) return;
    const previous = editor!.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter link URL", previous || "https://");
    if (url === null) return;
    if (url === "") {
      editor!.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor!
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-[#104042]">{label}</h2>
          {description && (
            <p className="mt-1 text-xs text-slate-500">{description}</p>
          )}
        </div>
        <div className="flex gap-2">
          {mode === "preview" ? (
            <Button
              type="button"
              size="sm"
              className="bg-[#104042] text-white hover:bg-[#0c3334]"
              onClick={startEdit}
            >
              <Pencil className="mr-1.5 h-4 w-4" />
              Edit content
            </Button>
          ) : (
            <>
              <Button type="button" size="sm" variant="outline" onClick={cancelEdit}>
                <X className="mr-1.5 h-4 w-4" />
                Cancel
              </Button>
              <Button
                type="button"
                size="sm"
                className="bg-[#104042] text-white hover:bg-[#0c3334]"
                onClick={applyEdit}
              >
                <Eye className="mr-1.5 h-4 w-4" />
                Apply & preview
              </Button>
            </>
          )}
        </div>
      </div>

      {mode === "preview" ? (
        <div className="bg-slate-50/70 px-4 py-5 sm:px-6">
          <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 shadow-sm">
            <Eye className="h-3.5 w-3.5" />
            Public page preview
          </div>
          {value?.trim() ? (
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-8">
              <div
                className="max-w-none text-[15px] leading-7 text-slate-700 [&_a]:font-medium [&_a]:text-[#104042] [&_a]:underline [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:border-b [&_h2]:border-slate-100 [&_h2]:pb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#104042] [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: value }}
              />
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
              No content yet. Click Edit content to write this page.
            </p>
          )}
        </div>
      ) : null}

      {/* Keep the TipTap view mounted so mode switches don't destroy it. */}
      <div className={mode === "edit" ? "block" : "hidden"}>
        <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-100 bg-slate-50 px-3 py-2">
          <ToolbarButton
            title="Undo"
            onClick={() => editor?.chain().focus().undo().run()}
          >
            <Undo2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Redo"
            onClick={() => editor?.chain().focus().redo().run()}
          >
            <Redo2 className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-slate-200" />
          <ToolbarButton
            title="Bold"
            active={editor?.isActive("bold")}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Italic"
            active={editor?.isActive("italic")}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Underline"
            active={editor?.isActive("underline")}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Strike"
            active={editor?.isActive("strike")}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-slate-200" />
          <ToolbarButton
            title="Heading 2"
            active={editor?.isActive("heading", { level: 2 })}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Heading 3"
            active={editor?.isActive("heading", { level: 3 })}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Bullet list"
            active={editor?.isActive("bulletList")}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Ordered list"
            active={editor?.isActive("orderedList")}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Quote"
            active={editor?.isActive("blockquote")}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <span className="mx-1 h-5 w-px bg-slate-200" />
          <ToolbarButton
            title="Align left"
            active={editor?.isActive({ textAlign: "left" })}
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Align center"
            active={editor?.isActive({ textAlign: "center" })}
            onClick={() =>
              editor?.chain().focus().setTextAlign("center").run()
            }
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Align right"
            active={editor?.isActive({ textAlign: "right" })}
            onClick={() =>
              editor?.chain().focus().setTextAlign("right").run()
            }
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            title="Link"
            active={editor?.isActive("link")}
            onClick={setLink}
          >
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
        </div>
        <EditorContent editor={editor} />
        <p className="border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
          Edit like a document. Click Apply & preview, then Save legal pages to
          publish.
        </p>
      </div>
    </div>
  );
};

export default LegalDocumentPanel;
