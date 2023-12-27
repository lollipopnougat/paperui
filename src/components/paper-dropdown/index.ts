import './style.css';

interface DropDownUIData {
  title: string;
  imgUrl?: string;
}
const DATA_INDEX = 'data-index';
export default class PaperDropdown extends HTMLElement {
  constructor() {
    super();
    this.append(...this.drawElement());
    this.classList.add('paper-dropdown');
  }
  private dropdownElement?: HTMLDivElement;
  private _selectedIndex = -1;
  get selectedIndex(): number {
    return this._selectedIndex;
  }
  set selectedIndex(value: number) {
    this._selectedIndex = value;
  }
  private drawElement(): HTMLElement[] {
    const eleList: HTMLElement[] = [];
    const box = document.createElement('div');
    box.className = 'paper-dropdown-box';
    box.innerText = '请选择';
    eleList.push(box);
    const dropdownlist = document.createElement('div');
    dropdownlist.className = 'paper-dropdown-list hide';
    this.dropdownElement = dropdownlist;
    box.onclick = () => {
      dropdownlist.classList.remove('hide');
    };
    dropdownlist.onclick = (e) => {
      let item = e.target as unknown as HTMLDivElement;
      while (!item.hasAttribute(DATA_INDEX)) {
        item = item.parentElement as HTMLDivElement;
      }
      this.selectedIndex = Number(item.getAttribute(DATA_INDEX) ?? '-1');
      dropdownlist.classList.add('hide');
      box.innerText = this.items[this.selectedIndex].title ?? '请选择';
    };
    eleList.push(dropdownlist);
    return eleList;
  }

  private itemSource: DropDownUIData[] = [];

  get items() {
    return this.itemSource;
  }

  set items(value: DropDownUIData[]) {
    this.itemSource = value;
    this.dropdownElement?.replaceChildren();
    this.dropdownElement?.append(...this.items.map((e, index) => {
      const div = document.createElement('div');
      div.classList.add('paper-dropdown-item');
      div.setAttribute(DATA_INDEX, `${index}`);
      const span = document.createElement('span');
      span.innerText = e.title;
      if (e.imgUrl) {
        const img = document.createElement('img');
        img.src = e.imgUrl;
        div.appendChild(img);
      }
      div.append(span);
      return div;
    }));
  }


}