import './style.css';
const CONTENT = 'content';
export default class PaperButton extends HTMLElement {

  static observedAttributes = [CONTENT];
  private _btnElement?: HTMLButtonElement;
  get content(): string {
    return this.getAttribute(CONTENT) ?? '';
  }
  set content(value: string) {
    this.setAttribute(CONTENT, value);
  }
  constructor() {
    super();
    this.append(...this.drawElement());
  }
  private drawElement(): HTMLElement[] {
    const eleList: HTMLElement[] = [];
    const btn = document.createElement('button');
    btn.classList.add('paper-btn');
    btn.classList.add(...this.classList);
    btn.innerText = this.getAttribute(CONTENT) ?? '';
    eleList.push(btn);
    this._btnElement = btn;
    return eleList;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log(`属性 ${name} 已变更 ${newValue}`);
    if (name === CONTENT) {
      const btn = this._btnElement as HTMLButtonElement;
      btn.innerText = newValue;
    }
  }

}
