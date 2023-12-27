import './style.css';

const MIN = 'min';
const MAX = 'max';
const VALUE = 'value';
const STEP = 'step';
export default class PaperSlider extends HTMLElement {
  static observedAttributes = [MIN, MAX, VALUE, STEP];

  private _barElement?: HTMLDivElement;
  private _thumbElement?: HTMLDivElement;
  constructor() {
    super();
    this.classList.add('paper-slider');
    this.append(...this.drawElement());
    this.min = Number(this.getAttribute('min') ?? '0');
    this.max = Number(this.getAttribute('max') ?? '10');
    this.value = Number(this.getAttribute('value') ?? '6');
  }
  private _min = -Infinity;
  private _max = Infinity;
  private _step = 1;
  private down = false;
  private _value = 0;

  private point = {
    x: 0
  };

  get min() {
    return this._min;
  }

  set min(value: number) {
    if (this.max > value) {
      this._min = value;
    }
  }

  get step() {
    return this._step;
  }
  set step(value) {
    this._step = value;
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
    return Math.round((this.value / this.len) * 1e2) / 1e2;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (this.min <= value && this.max >= value && this.value !== value) {
      this._value = value;
      this.setUI();
    } else if (this.value > this.max) {
      this.value = this.max;
    } else if (this.value < this.min) {
      this.value = this.min;
    }
  }

  setUI() {
    if (this._barElement) {
      this._barElement.style.transform = `scaleX(${this.percentage})`;
      if (this._thumbElement) {
        this._thumbElement.style.transform = `translateX(${this.percentage * this._barElement.offsetWidth}px)`;
      }
      if (this.onSlide) {
        const event = new CustomEvent('slided', { detail: this.value });
        this.onSlide(event);
      }
    }
  }

  onSlide?: (event: CustomEvent<number>) => void;

  private drawElement(): HTMLElement[] {
    const eleList: HTMLElement[] = [];
    const bg = document.createElement('div');
    bg.className = 'paper-slider-box';
    eleList.push(bg);
    const div = document.createElement('div');
    div.className = 'paper-slider-bar';
    this._barElement = div;
    bg.append(div);
    const thumb = document.createElement('div');
    thumb.className = 'paper-slider-thumb';
    thumb.onmousedown = e => {
      this.down = true;
      this.point.x = e.clientX;
    };
    document.addEventListener('mouseup', () => {
      this.down = false;
    });
    this.onmouseleave = () => {
      this.down = false;
    };
    this.onmousemove = e => {
      if (this.down) {
        const dx = e.clientX - this.point.x;
        this.point.x = e.clientX;
        this.value += (dx / div.offsetWidth) * this.len;
      }
    };
    thumb.ontouchstart = (e) => {
      this.down = true;
      this.point.x = e.touches[0].pageX;
    };
    this.ontouchmove = (e) => {
      if (this.down) {
        const dx = e.touches[0].pageX - this.point.x;
        this.point.x = e.touches[0].pageX;
        this.value += (dx / div.offsetWidth) * this.len;
      }
    };
    document.addEventListener('touchend', () => {
      this.down = false;
    });
    this._thumbElement = thumb;
    bg.append(thumb);
    return eleList;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === MIN) {
      this.min = Number(newValue);
    } else if (name === MAX) {
      this.max = Number(newValue);
    } else if (name === VALUE) {
      this.value = Number(newValue);
    }
  }
}
