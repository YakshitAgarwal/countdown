import { html, render } from 'lit-html';
import { cdown_backend } from 'declarations/cdown_backend';
import logo from './logo2.svg';

class App {
  greeting = '';

  constructor() {
    this.#render();
  }

  #handleSubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    this.greeting = await cdown_backend.greet(name);
    this.#render();
  };

  #render() {
    let body = html`
      <main>
        <h1>Countdown to New Year</h1>
        <h1>2025</h1>
        <div class="countdown">
          <div class="countdown-item">
            <p id="days"></p>
            <span>Days</span>
          </div>
          <div class="countdown-item">
            <p id="hours"></p>
            <span>Hours</span>
          </div>
          <div class="countdown-item">
            <p id="minutes"></p>
            <span>Minutes</span>
          </div>
          <div class="countdown-item">
            <p id="seconds"></p>
            <span>Seconds</span>
          </div>
        </div>
      </main>
    `;
    render(body, document.getElementById('root'));
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    const newYearTime = new Date("1 Jan, 2025 00:00:00").getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const gap = newYearTime - now;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      let d = Math.floor(gap / day);
      let h = Math.floor((gap % day) / hour);
      let m = Math.floor((gap % hour) / minute);
      let s = Math.floor((gap % minute) / second);

      if (d < 10) {
        d = `0${Math.floor(gap / day)}`;
      } else {
        d = `${Math.floor(gap / day)}`;
      }
      if (h < 10) {
        h = `0${Math.floor((gap % day) / hour)}`;
      } else {
        h = `${Math.floor((gap % day) / hour)}`;
      }
      if (m < 10) {
        m = `0${Math.floor((gap % hour) / minute)}`;
      } else {
        m = `${Math.floor((gap % hour) / minute)}`;
      }
      if (s < 10) {
        s = `0${Math.floor((gap % minute) / second)}`;
      } else {
        s = `${Math.floor((gap % minute) / second)}`;
      }

      days.innerText = d;
      hours.innerText = h;
      minutes.innerText = m;
      seconds.innerText = s;

      setTimeout(() => {
        updateCountdown();
      }, 1000);
    }

    updateCountdown();

  }
}

export default App;
