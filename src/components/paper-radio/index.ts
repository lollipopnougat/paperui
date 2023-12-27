import './style.css';
const VALUE = 'checked';
const NAME = 'name';
const TITLE = 'title';
export default class PaperRadio extends HTMLElement {
  static observedAttributes = [VALUE, TITLE, NAME];
  private _radioElement?: HTMLInputElement;
  private cid: string;
  get checked(): boolean {
    if (this._radioElement) {
      return this._radioElement.checked;
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
    if (this._radioElement) {
      this._radioElement.checked = value;
    }
  }
  constructor() {
    super();
    this.cid = Math.floor(Math.random() * 1e6).toString(16);
    this.append(...this.drawElement());
    this.classList.add('paper-radio-box');
  }

  private drawElement(): HTMLElement[] {
    const eleList: HTMLElement[] = [];
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.className = 'paper-radio';
    radio.name = this.getAttribute(NAME) ?? '';
    radio.id = `paper_radio_${this.cid}`;
    if (this.hasAttribute(VALUE)) {
      this.checked = true;
    }

    this._radioElement = radio;
    eleList.push(radio);
    const title = document.createElement('label');
    title.className = 'paper-radio-title';
    title.htmlFor = `paper_radio_${this.cid}`;
    title.innerText = this.getAttribute(TITLE) ?? '';
    eleList.push(title);
    return eleList;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const radio = this._radioElement as HTMLInputElement;
    if (name === NAME) {
      radio.name = this.getAttribute(NAME) ?? '';
    }
  }
}

