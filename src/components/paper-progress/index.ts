import './style.css';

// const MIN = 'min';
const MAX = 'max';
const VALUE = 'value';
export default class PaperProgress extends HTMLElement {

  static observedAttributes = [MAX, VALUE];

  private _barElement?: HTMLDivElement;
  constructor() {
    super();
    this.classList.add('paper-progress');
    this.append(...this.drawElement());
    this.min = 0;//Number(this.getAttribute('min') ?? '0');
    this.max = Number(this.getAttribute('max') ?? '10');
    this.value = Number(this.getAttribute('value') ?? '6');
  }
  private _min = 0;
  private _max = Infinity;

  private _value = 0;


  get min() {
    return this._min;
  }

  set min(value: number) {
    if (this.max > value) {
      this._min = value;
    }
  }

  get max() {
    return this._max;
  }
  set max(value) {
    if (this.min < value) {
      this._max = value;
    }
  }

  private get len(): number {
    return this.max - this.min;
  }

  get percentage(): number {
    return this.value / this.len;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (this.min <= value && this.max >= value) {
      this._value = value;
      if (this._barElement) {
        this._barElement.style.transform = `scaleX(${this.percentage})`;
      }
    }
  }

  private drawElement(): HTMLElement[] {
    const eleList: HTMLElement[] = [];
    const div = document.createElement('div');
    div.className = 'paper-progress-bar';

    this._barElement = div;
    eleList.push(div);
    return eleList;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // if (name === MIN) {
    //   this.min = Number(newValue);
    // } else
    if (name === MAX) {
      this.max = Number(newValue);
    } else if (name === VALUE) {
      this.value = Number(newValue);
    }
  }
}
