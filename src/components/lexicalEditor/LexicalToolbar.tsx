"use client";

import {  FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react";
import { Bold, Italic, Redo, Undo } from "lucide-react";

export default function LexicalToolbar() {
  const [editor] = useLexicalComposerContext();

  const format = useCallback((style: "bold" | "italic") => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, style);
  }, [editor]);

  const undo = useCallback(() => {
    editor.dispatchCommand(UNDO_COMMAND, undefined);
  }, [editor]);

  const redo = useCallback(() => {
    editor.dispatchCommand(REDO_COMMAND, undefined);
  }, [editor]);

  return (
    <div className="flex gap-2 border-b p-2 mb-2">
      <button
        type="button"
        onClick={() => format("bold")}
        className="p-1 rounded hover:bg-gray-200"
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => format("italic")}
        className="p-1 rounded hover:bg-gray-200"
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={undo}
        className="p-1 rounded hover:bg-gray-200 ml-auto"
        title="Undo"
      >
        <Undo className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={redo}
        className="p-1 rounded hover:bg-gray-200"
        title="Redo"
      >
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
}
