'use client';

import './editor.css';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  ImagePlus,
  Quote,
  Minus,
  Undo,
  Redo,
} from 'lucide-react';
import { useRef, useCallback, useState } from 'react';

interface BlogEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function BlogEditor({ content, onChange }: BlogEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      ImageExtension.configure({
        HTMLAttributes: { class: 'blog-image' },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'blog-link' },
      }),
      Placeholder.configure({
        placeholder: 'Schreib deinen Beitrag hier...',
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'blog-prose prose-editor min-h-[300px] max-w-none outline-none px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleImageUpload = useCallback(async (file: File) => {
    if (!editor) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Fehler beim Hochladen');
        return;
      }

      const { url } = await res.json();
      editor.chain().focus().setImage({ src: url, alt: file.name }).run();
    } catch {
      alert('Fehler beim Hochladen des Bildes');
    }
  }, [editor]);

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
      e.target.value = '';
    }
  }, [handleImageUpload]);

  const handleLinkClick = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL eingeben:', previousUrl || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-border rounded-t-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-stone/30">
        {/* Text group */}
        <span className="hidden sm:flex items-center text-[10px] text-muted-foreground uppercase tracking-wider px-1">Text</span>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          label="Fett"
          shortcut="Strg+B"
        >
          <Bold className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          label="Kursiv"
          shortcut="Strg+I"
        >
          <Italic className="w-5 h-5" />
        </ToolbarButton>

        <div className="w-px bg-border mx-1" />

        {/* Structure group */}
        <span className="hidden sm:flex items-center text-[10px] text-muted-foreground uppercase tracking-wider px-1">Struktur</span>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          label="Zwischenüberschrift"
        >
          <Heading2 className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          label="Kleine Überschrift"
        >
          <Heading3 className="w-5 h-5" />
        </ToolbarButton>

        <div className="w-px bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          label="Aufzählung"
        >
          <List className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          label="Nummerierte Liste"
        >
          <ListOrdered className="w-5 h-5" />
        </ToolbarButton>

        <div className="w-px bg-border mx-1" />

        {/* Insert group */}
        <span className="hidden sm:flex items-center text-[10px] text-muted-foreground uppercase tracking-wider px-1">Einfügen</span>
        <ToolbarButton onClick={handleLinkClick} active={editor.isActive('link')} label="Link" shortcut="Strg+K">
          <LinkIcon className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton onClick={handleImageClick} label="Bild">
          <ImagePlus className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          label="Zitat"
        >
          <Quote className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          label="Trennlinie"
        >
          <Minus className="w-5 h-5" />
        </ToolbarButton>

        <div className="w-px bg-border mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          label="Rückgängig"
          shortcut="Strg+Z"
        >
          <Undo className="w-5 h-5" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          label="Wiederholen"
          shortcut="Strg+Y"
        >
          <Redo className="w-5 h-5" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

function ToolbarButton({
  children,
  onClick,
  active = false,
  disabled = false,
  label,
  shortcut,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  label?: string;
  shortcut?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipText = shortcut ? `${label} (${shortcut})` : label;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md
          transition-colors
          ${active ? 'bg-forest text-white' : 'text-text-primary hover:bg-forest/10'}
          ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {children}
      </button>
      {showTooltip && tooltipText && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-text-primary text-white text-xs rounded whitespace-nowrap z-20 pointer-events-none">
          {tooltipText}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary" />
        </div>
      )}
    </div>
  );
}
