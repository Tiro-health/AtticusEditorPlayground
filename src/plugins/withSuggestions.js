import { Editor, Range } from "slate";

function withSuggestions(editor) {
  const { onChange } = editor;
  editor.onChange = () => {
    onChange();

    const { selection } = editor;
    if (selection && Range.isCollapsed(selection)) {
      const [start] = Range.edges(selection);
      const wordBefore = Editor.before(editor, start, { unit: "word" });
      const before = wordBefore && Editor.before(editor, wordBefore);
      const beforeRange = before && Editor.range(editor, before, start);
      const beforeText = beforeRange && Editor.string(editor, beforeRange);
      const beforeMatch = beforeText && beforeText.match(/^\/(\w+)$/);
      const after = Editor.after(editor, start);
      const afterRange = Editor.range(editor, start, after);
      const afterText = Editor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeMatch && afterMatch) {
        editor.queryRange = beforeRange;
        editor.query = beforeMatch[1];
        return;
      }
      editor.queryRange = undefined;
      editor.query = undefined;
    }
  };
  return editor;
}

export default withSuggestions;
