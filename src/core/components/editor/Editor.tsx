import { ContentState, EditorState, convertFromHTML, convertToRaw } from "draft-js";
import { useEffect, useState } from "react";

import ReactDraftWysiwyg from "./";
import draftToHtml from "draftjs-to-html";

const Editor = ({setValue, name= 'description', defaultValue}: any) => {
  const [data, setData] = useState(EditorState.createEmpty())
  useEffect(() => {
    if(defaultValue) {
      const blocksFromHTML: any = convertFromHTML(defaultValue);
      setData(EditorState.createWithContent(ContentState.createFromBlockArray(blocksFromHTML)));
    }
  }, [defaultValue])

  const onChange = (dataText: any) => {
    setData(dataText);
    const html = draftToHtml(convertToRaw(dataText.getCurrentContent()));
    setValue(name, html);
  }

  return <ReactDraftWysiwyg editorState={data} onEditorStateChange={onChange} />
}

export default Editor