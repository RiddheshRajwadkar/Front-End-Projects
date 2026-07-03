import { createRoot } from 'react-dom/client'
import { useEffect } from 'react';
import './index.css'

function App() {
  useEffect(() =>{
    function play(e) {

      let keyCode;
      if (e.type === 'keydown') {
        keyCode = e.keyCode;
      } else if (e.type === 'click') {
        keyCode = e.currentTarget.dataset.key;
      }

      const key = document.querySelector(`div[data-key="${keyCode}"]`);
      const audio = key.querySelector(`audio`);

      const mainKeys = data.filter(item => !item.subKey);
      const subKeys = data.filter(item => item.subKey);
      if (!audio) return; // stop the function from running all together

      key.classList.add('playing');
      audio.currentTime = 0;
      audio.play();
    }

    function removeTransition(e) {
      if(e.propertyName !== 'transform') return;
      e.target.classList.remove('playing');      
    }
    
    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    keys.forEach(key => key.addEventListener('click', play));
    window.addEventListener('keydown', play);

    return () => {
      keys.forEach(key => {
        key.removeEventListener('transitionend', removeTransition);
        key.removeEventListener('click', play);
      });
      window.removeEventListener('keydown', play);
    }
  },[]);

  const data = [
  {
    id: 65,
    letter: "A",
    soundName: "clap",
    sound: "/sounds/clap.wav",
  },
  {
    id: 83,
    letter: "S",
    soundName: "hihat",
    sound: "/sounds/hihat.wav",
  },
  {
    id: 68,
    letter: "D",
    soundName: "kick",
    sound: "/sounds/kick.wav",
  },
  {
    id: 70,
    letter: "F",
    soundName: "openhat",
    sound: "/sounds/openhat.wav",
  },
  {
    id: 71,
    letter: "G",
    soundName: "boom",
    sound: "/sounds/boom.wav",
  },
  {
    id: 72,
    letter: "H",
    soundName: "ride",
    sound: "/sounds/ride.wav",
  },
  {
    id: 74,
    letter: "J",
    soundName: "snare",
    sound: "/sounds/snare.wav",
  },
  {
    id: 75,
    letter: "K",
    soundName: "tom",
    sound: "/sounds/tom.wav",
  },
  {
    id: 76,
    letter: "L",
    soundName: "tink",
    sound: "/sounds/tink.wav",
  },
  {
    id: 32,
    letter: "Space",
    soundName: "faah",
    sound: "/sounds/faah.mp3",
    subKey: true,
  },
];

const mainKeys = data.filter(item => !item.subKey);
const subKeys = data.filter(item => item.subKey);

return (
  <div className="drum-pad">
    <div className="keys">
      {mainKeys.map((item) => (
        <div key={item.id} data-key={item.id} className="key">
          <audio src={item.sound} />
          <kbd>{item.letter}</kbd>
          <span className="sound">{item.soundName}</span>
        </div>
      ))}
    </div>

    <div className="sub-keys">
      {subKeys.map((item) => (
        <div key={item.id} data-key={item.id} className=" key sub-key">
          <audio src={item.sound} />
          <kbd>{item.letter}</kbd>
          <span className="sound">{item.soundName}</span>
        </div>
      ))}
    </div>
  </div>
);
}
createRoot(document.getElementById("root")).render(<App />);