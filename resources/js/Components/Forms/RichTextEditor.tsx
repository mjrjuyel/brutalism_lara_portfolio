import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cn } from '@/Utils/cn';
import { 
  Bold, Italic, Heading2, Heading3, List, ListOrdered, Quote, Code 
} from 'lucide-react';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const btnClass = (active) => cn(
    "p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-colors",
    active && "bg-muted text-foreground"
  );

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-card p-1">
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))}>
        <Bold className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))}>
        <Italic className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-border mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))}>
        <Heading2 className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))}>
        <Heading3 className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-border mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))}>
        <List className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))}>
        <ListOrdered className="w-4 h-4" />
      </button>
      <div className="w-px h-4 bg-border mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))}>
        <Quote className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={btnClass(editor.isActive('code'))}>
        <Code className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function RichTextEditor({ value, onChange, label, error, className }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[150px] p-3',
      },
    },
  });

  return (
    <div className={cn("w-full", className)}>
      {label && <label className="block text-sm font-medium text-foreground mb-1">{label}</label>}
      <div className={cn(
        "rounded-md border border-input bg-background overflow-hidden focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
        error && "border-destructive focus-within:ring-destructive"
      )}>
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}
