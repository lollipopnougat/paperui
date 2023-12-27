import PaperButton from './components/paper-button';
import PaperTextbox from './components/paper-textbox';
import PaperSwitch from './components/paper-switch';
import PaperRadio from './components/paper-radio';
import PaperCheckbox from './components/paper-checkbox';
import PaperCard from './components/paper-card';
import PaperProgress from './components/paper-progress';
import PaperSlider from './components/paper-slider';
import PaperDropdown from './components/paper-dropdown';



const init = () => {
  window.customElements.define('paper-button', PaperButton);
  window.customElements.define('paper-textbox', PaperTextbox);
  window.customElements.define('paper-switch', PaperSwitch);
  window.customElements.define('paper-radio', PaperRadio);
  window.customElements.define('paper-checkbox', PaperCheckbox);
  window.customElements.define('paper-card', PaperCard);
  window.customElements.define('paper-progress', PaperProgress);
  window.customElements.define('paper-slider', PaperSlider);
  window.customElements.define('paper-dropdown', PaperDropdown);
};

export {
  init,
  PaperButton,
  PaperTextbox,
  PaperSwitch,
  PaperRadio,
  PaperCheckbox,
  PaperCard,
  PaperProgress,
  PaperSlider,
  PaperDropdown
};