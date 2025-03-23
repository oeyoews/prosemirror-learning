// @ts-nocheck
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import {
  schema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from 'prosemirror-markdown';
import { exampleSetup } from 'prosemirror-example-setup';
import './style.css';

// vanilla
class MarkdownView {
  constructor(target: HTMLElement, content: string) {
    this.textarea = target.appendChild(document.createElement('textarea'));
    this.textarea.value = content;
  }

  get content() {
    return this.textarea.value;
  }
  focus() {
    this.textarea.focus();
  }
  destroy() {
    this.textarea.remove();
  }
}

// wysiwym
class ProseMirrorView {
  constructor(target, content) {
    this.view = new EditorView(target, {
      // domParser: schema,
      state: EditorState.create({
        doc: defaultMarkdownParser.parse(content),
        plugins: exampleSetup({ schema }),
      }),
    });
  }

  get content() {
    return defaultMarkdownSerializer.serialize(this.view.state.doc);
  }
  focus() {
    this.view.focus();
  }
  destroy() {
    this.view.destroy();
  }
}

// let place = document.querySelector('#editor');
let place = document.createElement('div');
place.id = 'editor';
document.body.appendChild(place);

const initValue = `
    This is a comment written in [Markdown](http://commonmark.org). *You* may know the syntax for inserting a link, but does your whole audience? So you can give people the **choice** to use a more familiar, discoverable interface.
## 二级标题

> 这是一个引用块
>> 这是一个嵌套的引用块
 `;

let view = new ProseMirrorView(place, initValue);

document.querySelectorAll('input[type=radio]').forEach((button) => {
  button.addEventListener('change', () => {
    if (!button.checked) return;
    let View = button.value == 'markdown' ? MarkdownView : ProseMirrorView;
    if (view instanceof View) return;
    let content = view.content;
    view.destroy();
    view = new View(place, content);
    view.focus();
  });
});
