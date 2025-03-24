"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Link as LinkIcon } from "lucide-react";
import { useTheme } from "next-themes";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export default function Editor({ value, onChange, disabled, className }: EditorProps) {
  const [text, setText] = useState(value);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    onChange(newValue);
  };

  const insertFormat = (format: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);
    
    let newText = text;
    let newCursorPos = end;
    
    switch (format) {
      case 'bold':
        newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
        newCursorPos = end + 4;
        break;
      case 'italic':
        newText = text.substring(0, start) + `*${selectedText}*` + text.substring(end);
        newCursorPos = end + 2;
        break;
      case 'ul':
        newText = text.substring(0, start) + `\n- ${selectedText}` + text.substring(end);
        newCursorPos = end + 3;
        break;
      case 'ol':
        newText = text.substring(0, start) + `\n1. ${selectedText}` + text.substring(end);
        newCursorPos = end + 4;
        break;
      case 'link':
        newText = text.substring(0, start) + `[${selectedText}](url)` + text.substring(end);
        newCursorPos = end + 7;
        break;
    }
    
    setText(newText);
    onChange(newText);
    
    // Set focus back to textarea and restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Don't render UI until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div className="min-h-[350px] border rounded-lg p-4 bg-background">Loading editor...</div>;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center gap-1 p-2 border rounded-t-lg bg-card">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertFormat('bold')}
          disabled={disabled}
          className="text-foreground hover:text-foreground"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertFormat('italic')}
          disabled={disabled}
          className="text-foreground hover:text-foreground"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertFormat('ul')}
          disabled={disabled}
          className="text-foreground hover:text-foreground"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertFormat('ol')}
          disabled={disabled}
          className="text-foreground hover:text-foreground"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => insertFormat('link')}
          disabled={disabled}
          className="text-foreground hover:text-foreground"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        value={text}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Write your content here..."
        className="min-h-[350px] rounded-t-none border-t-0 resize-y bg-card text-foreground"
      />
      <div className="text-xs text-muted-foreground">
        Supports Markdown: **bold**, *italic*, [link](url), - list items, 1. numbered items
      </div>
    </div>
  );
}
