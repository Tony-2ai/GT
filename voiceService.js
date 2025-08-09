class VoiceService {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voice = null;
    this.isEnabled = false;
    this.initializeVoice();
  }

  async initializeVoice() {
    // Wait for voices to be loaded
    if (this.synth.getVoices().length === 0) {
      this.synth.addEventListener('voiceschanged', () => {
        this.selectBestVoice();
      });
    } else {
      this.selectBestVoice();
    }
  }

  selectBestVoice() {
    const voices = this.synth.getVoices();
    
    // Try to find a good female voice
    const preferredVoices = [
      'Microsoft Zira - English (United States)',
      'Google UK English Female',
      'Microsoft Hazel - English (Great Britain)',
      'Karen',
      'Samantha',
      'Victoria',
      'Alex'
    ];

    for (const preferred of preferredVoices) {
      const voice = voices.find(v => v.name.includes(preferred) || v.name === preferred);
      if (voice) {
        this.voice = voice;
        break;
      }
    }

    // Fallback to any female voice
    if (!this.voice) {
      this.voice = voices.find(v => 
        v.name.toLowerCase().includes('female') || 
        v.name.toLowerCase().includes('woman') ||
        v.gender === 'female'
      );
    }

    // Final fallback to first available voice
    if (!this.voice && voices.length > 0) {
      this.voice = voices[0];
    }
  }

  getMoodSettings(mood, fruitName) {
    const basePitch = this.getBasePitchForFruit(fruitName);
    const baseRate = this.getBaseRateForFruit(fruitName);

    const moodModifiers = {
      happy: { 
        pitch: basePitch + 0.3, 
        rate: baseRate + 0.2, 
        volume: 0.9,
        emphasis: 'strong'
      },
      excited: { 
        pitch: basePitch + 0.5, 
        rate: baseRate + 0.4, 
        volume: 1.0,
        emphasis: 'strong'
      },
      sad: { 
        pitch: basePitch - 0.3, 
        rate: baseRate - 0.3, 
        volume: 0.6,
        emphasis: 'reduced'
      },
      angry: { 
        pitch: basePitch + 0.2, 
        rate: baseRate + 0.3, 
        volume: 0.95,
        emphasis: 'strong'
      },
      neutral: { 
        pitch: basePitch, 
        rate: baseRate, 
        volume: 0.8,
        emphasis: 'moderate'
      },
      chill: { 
        pitch: basePitch - 0.2, 
        rate: baseRate - 0.4, 
        volume: 0.7,
        emphasis: 'reduced'
      },
      dramatic: { 
        pitch: basePitch + 0.4, 
        rate: baseRate - 0.1, 
        volume: 0.95,
        emphasis: 'strong'
      },
      royal: { 
        pitch: basePitch + 0.1, 
        rate: baseRate - 0.2, 
        volume: 0.9,
        emphasis: 'strong'
      },
      spiky: { 
        pitch: basePitch + 0.2, 
        rate: baseRate + 0.1, 
        volume: 0.85,
        emphasis: 'moderate'
      }
    };

    return moodModifiers[mood] || moodModifiers.neutral;
  }

  getBasePitchForFruit(fruitName) {
    const fruitPitches = {
      apple: 1.0,    // Sophisticated, medium pitch
      banana: 1.2,   // Energetic, higher pitch
      mango: 0.9,    // Royal, slightly lower pitch
      pineapple: 1.1, // Sweet but spiky, medium-high
      watermelon: 0.8 // Chill, lower pitch
    };
    return fruitPitches[fruitName.toLowerCase()] || 1.0;
  }

  getBaseRateForFruit(fruitName) {
    const fruitRates = {
      apple: 1.0,     // Normal speed
      banana: 1.1,    // Slightly faster (energetic)
      mango: 0.9,     // Slower (royal)
      pineapple: 1.0, // Normal speed
      watermelon: 0.7 // Much slower (chill)
    };
    return fruitRates[fruitName.toLowerCase()] || 1.0;
  }

  processTextForSpeech(text, mood) {
    // Remove emojis and special characters for better speech
    let cleanText = text.replace(/[🍎🍌🥭🍍🍉😊😄😭😤🤩😏😒😌😔😐🤴👑🥺]/g, '');
    
    // Add SSML-like emphasis based on mood
    if (mood === 'excited' || mood === 'happy') {
      cleanText = cleanText.replace(/!/g, '!!');
    }
    
    // Add pauses for dramatic effect
    if (mood === 'dramatic' || mood === 'royal') {
      cleanText = cleanText.replace(/\./g, '... ');
    }
    
    // Slow down for chill mood
    if (mood === 'chill') {
      cleanText = cleanText.replace(/\s+/g, '... ');
    }

    return cleanText;
  }

  speak(text, mood, fruitName) {
    if (!this.isEnabled || !this.voice || !text.trim()) return;

    // Stop any current speech
    this.synth.cancel();

    const settings = this.getMoodSettings(mood, fruitName);
    const processedText = this.processTextForSpeech(text, mood);

    const utterance = new SpeechSynthesisUtterance(processedText);
    utterance.voice = this.voice;
    utterance.pitch = Math.max(0.1, Math.min(2, settings.pitch));
    utterance.rate = Math.max(0.1, Math.min(2, settings.rate));
    utterance.volume = Math.max(0, Math.min(1, settings.volume));

    // Add event listeners for better control
    utterance.onstart = () => {
      console.log(`🎵 Speaking as ${fruitName} in ${mood} mood`);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
    };

    this.synth.speak(utterance);
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled) {
      this.synth.cancel();
    }
    return this.isEnabled;
  }

  stop() {
    this.synth.cancel();
  }

  isSupported() {
    return 'speechSynthesis' in window;
  }

  getAvailableVoices() {
    return this.synth.getVoices();
  }
}

const voiceService = new VoiceService();
export default voiceService;
