import './style.css';
const CONTENT = 'value';
const PLACE_HOLDER = 'placeholder';
export default class PaperTextbox extends HTMLElement {
  static observedAttributes = [CONTENT, PLACE_HOLDER];
  private _inputElement?: HTMLInputElement;
  private changeFlag: boolean = false;
  get value(): string {
    return this.getAttribute(CONTENT) ?? '';
  }
  set value(value: string) {
    if (this._inputElement) {
      this._inputElement.value = value;
    }
  }
  constructor() {
    super();
    this.append(...this.drawElement());
  }
  private drawElement(): HTMLElement[] {
    const eleList: HTMLElement[] = [];
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'paper-textbox';
    input.value = this.getAttribute(CONTENT) ?? '';
    input.placeholder = this.getAttribute(PLACE_HOLDER) ?? '';
    input.onchange = () => {
      this.changeFlag = true;
      const event = new CustomEvent('value-changed', { detail: input.value });
      if (this.onchange) {
        this.onchange(event);
      }
      this.setAttribute(CONTENT, input.value);
      setTimeout(() => {
        this.changeFlag = false;
      }, 0);
    };
    eleList.push(input);
    this._inputElement = input;
    return eleList;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const input = this._inputElement as HTMLInputElement;
    if (name === CONTENT) {
      if (!this.changeFlag) {
        input.value = newValue;
      }
    } else if (name === PLACE_HOLDER) {
      input.placeholder = newValue;
    }
  }
}

