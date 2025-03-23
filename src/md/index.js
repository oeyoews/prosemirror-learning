import { Decoration, DecorationSet } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Plugin, TextSelection } from 'prosemirror-state';
// import 'prosemirror-view/style/prosemirror.css';
import './style.css';

import {
  defaultMarkdownParser,
  MarkdownParser,
  MarkdownSerializer,
  MarkdownSerializerState,
  defaultMarkdownSerializer,
  schema,
} from 'prosemirror-markdown';


const mdContent = `
# 一级标题
## 二级标题

---

**加粗文本**
*斜体文本*
~~删除线文本~~
***加粗 + 斜体***

> 这是一个引用块
>> 这是一个嵌套的引用块

- 无序列表项 1
- 无序列表项 2
  - 子列表项 1
  - 子列表项 2

1. 有序列表项 1
2. 有序列表项 2
   1. 子列表项 1
   2. 子列表项 2

`

let state = EditorState.create({
  doc: defaultMarkdownParser.parse(mdContent),
});

window.view = new EditorView(document.querySelector('#editor'), { state });
