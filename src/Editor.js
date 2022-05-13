import { useCallback, useMemo, useState } from "react";
import { pipe } from "./util/pipe";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import SuggestionList from "../SuggestionList";
import withSuggestions from "./plugins/withSuggestions";
const createInitValue = () => [{ children: [{ text: "" }] }];

export default function Editor(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(createInitValue);
  const open = useCallback(() => setIsOpen(true), [setIsOpen]);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);

  const editor = useMemo(() => {
    const plugins = [withReact, withHistory, withSuggestions];
    return pipe(...plugins)(createEditor());
  }, []);

  return (
    <div {...props}>
      <Slate editor={editor} value={value} onChange={setValue}>
        <Editable
          onClick={close}
          className="rounded-md border border-gray-200 focused:ring-2 focused:ring-blue-400 text-left px-12 py-2 text-[#232D5B]"
          placeholder="Type '/' om suggesties te filteren"
          renderPlaceholder={({ attributes, children }) => (
            <p {...attributes} className="text-gray-600">
              {children}
            </p>
          )}
        />
        <SuggestionList isOpen={isOpen} open={open} close={close} />
      </Slate>
    </div>
  );
}
