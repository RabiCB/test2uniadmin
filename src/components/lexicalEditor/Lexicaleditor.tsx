"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import LexicalToolbar from "./LexicalToolbar";
import { EditorState, LexicalEditor as LexicalEdi } from "lexical";

type LexicalEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function LexicalEditor({  onChange }: LexicalEditorProps) {
  const initialConfig = {
    namespace: "UniversityDescription",
    editable: true,
    onError(error: any) {
      console.error("Lexical Error:", error);
    },
    theme: {
      paragraph: "mb-2",
      text: {
        bold: "font-bold",
        italic: "italic",
      },
    },
  };

  const handleChange = (editorState: EditorState, editor: LexicalEdi) => {
    editorState.read(() => {
      const json = editor.getEditorState().toJSON();
      onChange(JSON.stringify(json));
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="border rounded-md bg-white">
        <LexicalToolbar />
        <div className="p-2">
          <RichTextPlugin
            contentEditable={<ContentEditable className="min-h-[150px] outline-none" />}
            placeholder={<div className="text-gray-400">Write a university description...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin onChange={handleChange} />
          <HistoryPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
