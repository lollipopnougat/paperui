import './style.css';
const VALUE = 'checked';
const NAME = 'name';
const TITLE = 'title';
export default class PaperCheckbox extends HTMLElement {
  static observedAttributes = [VALUE, TITLE, NAME];
  private _checkboxElement?: HTMLInputElement;
  private cid: string;
  get checked(): boolean {
    if (this._checkboxElement) {
      return this._checkboxElement.checked;
    } else {
      return false;
    }
  }
  set checked(value: boolean) {
    if (value) {
      this.setAttribute(VALUE, '');
    } else {
      this.removeAttribute(VALUE);
    }
    if (this._checkboxElement) {
      this._checkboxElement.checked = value;
    }
  }

  get name(): string {
    if (this._checkboxElement) {
      return this._checkboxElement.name;
    } else {
      return '';
    }
  }
  set name(value: string) {
    if (this._checkboxElement) {
      this._checkboxElement.name = value;
    }
  }
  constructor() {
    super();
    this.cid = Math.floor(Math.random() * 1e6).toString(16);
    this.append(...this.drawElement());
    this.classList.add('paper-checkbox-box');
  }

  private drawElement(): HTMLElement[] {
    const eleList: HTMLElement[] = [];
    const radio = document.createElement('input');
    radio.type = 'checkbox';
    radio.className = 'paper-checkbox';
    radio.name = this.getAttribute(NAME) ?? '';
    radio.id = `paper_checkbox_${this.cid}`;
    if (this.hasAttribute(VALUE)) {
      this.checked = true;
    }

    this._checkboxElement = radio;
    eleList.push(radio);
    const title = document.createElement('label');
    title.className = 'paper-checkbox-title';
    title.htmlFor = `paper_checkbox_${this.cid}`;
    title.innerText = this.getAttribute(TITLE) ?? '';
    eleList.push(title);
    return eleList;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const radio = this._checkboxElement as HTMLInputElement;
    if (name === NAME) {
      radio.name = this.getAttribute(NAME) ?? '';
    }
  }
}
