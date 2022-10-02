// load module from Skypack CDN
import AudioMotionAnalyzer from 'https://cdn.skypack.dev/audiomotion-analyzer?min';

// toggle microphone on/off
const startButton = document.getElementById('start');

const gradientoptions = {
  bgColor: '#000',
  dir: 'v',
  colorStops:
  [
      '#000',
      '#ccc',
      '#fff'
  ]
}

startButton.addEventListener('change', () => {
  if (startButton.checked) {
    if (navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(stream => {
          // create stream using audioMotion audio context
          const micStream = audioMotion.audioCtx.createMediaStreamSource(stream);
          // connect microphone stream to analyzer
          audioMotion.connectInput(micStream);
          // mute output to prevent feedback loops from the speakers
          audioMotion.volume = 0;
        })
        .catch(err => {
          alert('Microphone access denied by user');
        });
        // instatiate audiomotion
        const audioMotion = new AudioMotionAnalyzer(
          document.getElementById('spectrum-analyzer'),
        );
        audioMotion.registerGradient('whitegradient', gradientoptions );
        audioMotion.setOptions(
          {
            gradient: 'whitegradient',
            height: window.innerHeight,
            showScaleY: false,
            showScaleX: false,
            radial: true,
            spinSpeed: 2,
            alphaBars: true
          }
        )
        document.getElementById('brain-activity').style.display = 'block';
        document.getElementById('splash').style.display = 'none';
    }
    else {
      alert('User mediaDevices not available');
    }
  }
  else {
    // disconnect all input audio sources
    audioMotion.disconnectInput();
  }
});
