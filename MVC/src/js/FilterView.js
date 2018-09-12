import View from './View.js'

export default class extends View {
  constructor(el) {
    super(el);
  }

  bind(cmd) {
    const commands = {
      click: () => {
        this.delegate('.filter-section', (e) => {
          console.log(e.target);
          
        });
      },
    }

    commands[cmd]();
    return this;
  }


}