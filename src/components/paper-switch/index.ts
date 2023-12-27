import './style.css';
const VALUE = 'value';
const TITLE = 'title';
export default class PaperSwitch extends HTMLElement {
  static observedAttributes = [VALUE, TITLE];
  private changeFlag: boolean = false;
  private cid: string;
  get value(): boolean {
    return this.getAttribute(VALUE) === 'true';
  }
  set value(value: boolean) {
    this.setAttribute(VALUE, `${value}`);
  }
  constructor() {
    super();
    this.cid = Math.floor(Math.random() * 1e6).toString(16);
    this.append(...this.drawElement());
    this.classList.add('paper-toggle-box');
  }

  private onClickOccured(): void {
    this.changeFlag = true;
      if (!this.value) {
        this.value = true;
        this.classList.add('open');
      } else {
        this.value = false;
        this.classList.remove('open');
      }
      setTimeout(() => {
        this.changeFlag = false;
      }, 0);
  }
  private drawElement(): HTMLElement[] {
    const eleList: HTMLElement[] = [];
    const switchEle = document.createElement('button');
    switchEle.className = 'paper-toggle';
    switchEle.id = `paper_toggle_${this.cid}`;
    if (this.value) {
      this.classList.add('open');
    }
    switchEle.onclick = () => {
      this.onClickOccured();
    };
    eleList.push(switchEle);
    const title = document.createElement('label');
    title.className = 'paper-toggle-title';
    title.htmlFor = `paper_toggle_${this.cid}`;
    title.innerText = this.getAttribute(TITLE) ?? '';
    eleList.push(title);
    return eleList;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === VALUE) {
      if (!this.changeFlag) {
        if (newValue === 'true') {
          this.value = newValue === 'true';
          this.classList.add('open');
        } else {
          this.classList.remove('open');
        }

      }
    }
  }

}
