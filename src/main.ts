import './style.css';
import { PaperButton, PaperTextbox, PaperSwitch, PaperRadio, init, PaperCheckbox, PaperProgress, PaperSlider, PaperDropdown } from './paui';
init();
const btn = document.querySelector('paper-button') as PaperButton;
const input = document.querySelector('paper-textbox') as PaperTextbox;
const switchEle = document.querySelector('paper-switch') as PaperSwitch;
const radio = document.querySelector('#r1') as PaperRadio;
const radio2 = document.querySelector('#r2') as PaperRadio;
const check = document.querySelector('#c1') as PaperCheckbox;
const check2 = document.querySelector('#c2') as PaperCheckbox;
const progress = document.querySelector('paper-progress') as PaperProgress;
const slider = document.querySelector('paper-slider') as PaperSlider;
const dropdwon = document.querySelector('paper-dropdown') as PaperDropdown;

slider.onSlide = e => {
  progress.value = e.detail;
};
dropdwon.items = ['你好', '我只能说', '哈人'].map(e => ({title: e, imgUrl: './vite.svg'}));
btn.onclick = () => {
  btn.content = 'Button';
  input.value = 'ABC';
  console.log('开关是否打开:', switchEle.value);
  console.log(`radio1: ${radio.checked} radio2: ${radio2.checked}`);
  console.log(`check1: ${check.checked} check2: ${check2.checked}`);
  console.log(`dropdown: ${dropdwon.items[dropdwon.selectedIndex]?.title}`);
};
