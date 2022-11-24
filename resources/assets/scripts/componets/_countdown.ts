interface IParams {
  el?: any,
  dataEnd?: any;
  prefix?: string;
  exprired?: string;
  separator?: string | boolean;
  parts?: {
    d?: string | boolean,
    h?: string | boolean,
    m?: string | boolean,
    s?: string | boolean,
  }
}

export default class CountDownTimer {

  defaultParams: IParams = {
    el: null,
    dataEnd: new Date(),
    prefix: '',
    exprired: '',
    separator: ' | ',
    parts: {
      d: 'd',
      h: 'h',
      m: 'm',
      s: 's'
    }
  };
  params: IParams;

  constructor(...args: IParams[]) {
    if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
      this.params = args[0];
    } else {
      [this.params] = args;
    }

    if (!this.params) this.params = null;
    
    this.params = Object.assign({}, this.defaultParams, this.params);

    this.countdownTimer(this.params.el);
  }

  countdownTimer(el) : void {
    if (el.length) {
      const intervals = [];

      el.forEach((element: { innerHTML: string; }, index: number) => {
        if (this.remainingTimer()) {
          this.setTimer(element);
          intervals.push(setInterval(() => this.setTimer(element), 1000));
        } else {
          clearInterval(intervals[index]);
          element.innerHTML = this.params.exprired;
        }
      });
    } else {
      let interval;
      const element = el;
      
      if (this.remainingTimer()) {
        this.setTimer(element);
        interval = setInterval(() => this.setTimer(element), 1000);
      } else {
        clearInterval(interval);
        element.innerHTML = this.params.exprired;
      }
    }
  }

  remainingTimer() : void | boolean {
    const difference = +new Date(this.params.dataEnd) - +new Date();
    let remaining = null;
    let times = {};
    const parts = this.params.parts;

    Object.keys(parts).map(k => {
      if (!parts[k]) {
        delete parts[k];
      }
    });

    if (difference > 0) {
      // let hoursLeft = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) + days * 24);
      times = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((difference % (1000 * 60)) / 1000)
      };
    } else {
      return false;
    }

    remaining = Object.keys(parts).map(part => {
      if (times[part] < 10 && (part === 'm' || part === 's')) {
        times[part] = '0' + times[part];
      }

      return `<span class="countdown-count"><span class="countdown-digit">${times[part]}</span><span class="countdown-part">${parts[part]}</span></span>`;
    }).join(this.params.separator  ? `<span class="countdown-separator">${this.params.separator}</span>` : ``);
    
    return remaining;
  }
  
  setTimer(element: { innerHTML: string; }) : void {
    let html = '';
    const options = this.params;
  
    if (options.prefix) html += `<span class="countdown-prefix">${options.prefix}</span> `;
    html += `<span class="countdown-digits">` + this.remainingTimer() + '</span>';
  
    element.innerHTML = html;
  }
}
