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
    console.log(this.view.state.doc)
    return defaultMarkdownSerializer.serialize(this.view.state.doc);
  }
  focus() {
    this.view.focus();
  }
  destroy() {
    this.view.destroy();
  }
}

let place = document.querySelector('#editor');
let view = new MarkdownView(place, document.querySelector('#content').value,);

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