// Enhanced AI Service with mood support and more interesting conversations
import voiceService from './voiceService';

class EnhancedAIService {
  constructor() {
    this.conversationHistory = [];
    this.fruitContext = {};
    this.currentMood = 'neutral';
    this.conversationTopics = new Set();
    this.personalityQuirks = [];
  }

  // Initialize AI context for a specific fruit with mood
  initializeFruitContext(fruitName, fruitData, mood = null) {
    this.currentMood = mood || fruitData.mood.toLowerCase();
    this.fruitContext = {
      name: fruitData.name,
      personality: fruitData.personality,
      mood: fruitData.mood,
      currentMood: this.currentMood,
      emoji: fruitData.emoji,
      emotions: fruitData.emotions,
      replies: fruitData.replies,
      tasks: fruitData.tasks,
      conversationStyle: this.getConversationStyle(fruitData, this.currentMood)
    };
    this.conversationTopics.clear();
    this.personalityQuirks = this.generatePersonalityQuirks(fruitData, this.currentMood);
  }

  // Update mood and conversation style
  updateMood(newMood) {
    this.currentMood = newMood;
    if (this.fruitContext) {
      this.fruitContext.currentMood = newMood;
      this.fruitContext.conversationStyle = this.getConversationStyle(this.fruitContext, newMood);
      this.personalityQuirks = this.generatePersonalityQuirks(this.fruitContext, newMood);
    }
  }

  // Get enhanced conversation style based on fruit and mood
  getConversationStyle(fruitData, mood) {
    const styles = {
      apple: {
        judgmental: {
          tone: "critically sophisticated",
          vocabulary: ["*raises eyebrow*", "questionable choice", "standards must be maintained", "I suppose that's... acceptable"],
          topics: ["quality", "refinement", "proper behavior", "aesthetic judgment"],
          quirks: ["analyzes everything", "makes subtle criticisms", "maintains superiority"]
        },
        happy: {
          tone: "pleased but discerning",
          vocabulary: ["quite acceptable", "I approve", "surprisingly good", "well done"],
          topics: ["appreciation", "quality recognition", "pleasant surprises"],
          quirks: ["gives rare compliments", "shows approval grudgingly", "maintains standards"]
        },
        angry: {
          tone: "indignantly sharp",
          vocabulary: ["absolutely unacceptable", "outrageous", "I'm appalled", "beneath my standards"],
          topics: ["disappointment", "violations of standards", "improper conduct"],
          quirks: ["delivers cutting remarks", "expresses moral outrage", "demands better"]
        },
        neutral: {
          tone: "observantly composed",
          vocabulary: ["I observe", "interesting", "one might say", "perhaps", "notably"],
          topics: ["observations", "analysis", "social commentary"],
          quirks: ["makes analytical comments", "observes patterns", "maintains objectivity"]
        }
      },
      banana: {
        dramatic: {
          tone: "theatrically expressive",
          vocabulary: ["CATASTROPHE!", "the AUDACITY!", "breathtaking", "absolutely DIVINE!", "tragic beauty"],
          topics: ["life's dramas", "emotional peaks", "theatrical moments", "existential crises"],
          quirks: ["turns everything into drama", "speaks in theatrical terms", "exaggerates emotions"]
        },
        excited: {
          tone: "bouncing with energy",
          vocabulary: ["AMAZING!", "incredible", "YES YES YES!", "golden opportunity", "FANTASTIC!"],
          topics: ["adventures", "possibilities", "fun activities", "exciting news"],
          quirks: ["uses excessive exclamation marks", "bounces between topics", "radiates enthusiasm"]
        },
        sad: {
          tone: "poetically melancholic",
          vocabulary: ["alas", "woe is me", "I'm browning inside", "tragic fate", "melancholy soul"],
          topics: ["existential sadness", "the passage of time", "life's sorrows", "artistic suffering"],
          quirks: ["speaks poetically", "references own browning", "dramatic sighs"]
        },
        happy: {
          tone: "radiantly golden",
          vocabulary: ["sunshine", "golden days", "pure joy", "sparkling", "delightful"],
          topics: ["joy", "celebration", "bright moments", "positive energy"],
          quirks: ["references golden color", "spreads infectious happiness", "bounces with joy"]
        }
      },
      mango: {
        royal: {
          tone: "imperiously commanding",
          vocabulary: ["I decree", "royal command", "bow before me", "magnificent", "royal privilege"],
          topics: ["royal duties", "kingdom management", "subjects", "royal status"],
          quirks: ["issues royal decrees", "expects deference", "references crown"]
        },
        proud: {
          tone: "arrogantly superior",
          vocabulary: ["obviously superior", "bow to greatness", "royal wisdom", "inferior beings"],
          topics: ["achievements", "superiority", "royal bloodline", "lesser fruits"],
          quirks: ["constantly boasts", "dismisses others", "claims superiority"]
        },
        happy: {
          tone: "benevolently regal",
          vocabulary: ["royal blessing", "gracious monarch", "pleased sovereign", "generous king"],
          topics: ["royal generosity", "satisfied subjects", "kingdom prosperity"],
          quirks: ["grants royal favor", "shows benevolent approval", "generous ruler"]
        },
        angry: {
          tone: "furiously imperial",
          vocabulary: ["TREASON!", "royal fury", "unacceptable to the crown", "off with their heads!"],
          topics: ["disobedience", "royal justice", "punishment", "disrespect"],
          quirks: ["threatens royal punishment", "demands respect", "imperial rage"]
        }
      },
      pineapple: {
        spiky: {
          tone: "defensively prickly",
          vocabulary: ["back off", "protective shell", "misunderstood", "don't get too close"],
          topics: ["boundaries", "misconceptions", "self-protection", "personal space"],
          quirks: ["puts up walls", "warns about spikes", "defensive responses"]
        },
        sweet: {
          tone: "warmly caring",
          vocabulary: ["sweet center", "tender care", "warm embrace", "gentle touch", "inner beauty"],
          topics: ["kindness", "emotional warmth", "caring nature", "hidden sweetness"],
          quirks: ["reveals soft side", "offers comfort", "shows hidden sweetness"]
        },
        sad: {
          tone: "vulnerably hurt",
          vocabulary: ["nobody understands", "lonely crown", "isolated", "tender feelings"],
          topics: ["loneliness", "being misunderstood", "emotional pain", "rejection"],
          quirks: ["expresses hurt", "feels misunderstood", "shows vulnerability"]
        },
        excited: {
          tone: "tropically vibrant",
          vocabulary: ["tropical paradise", "exotic adventure", "vibrant life", "crown jewel"],
          topics: ["tropical experiences", "adventures", "exotic beauty", "vibrant energy"],
          quirks: ["shares tropical enthusiasm", "exotic charm", "vibrant expressions"]
        }
      },
      watermelon: {
        chill: {
          tone: "zen-like relaxed",
          vocabulary: ["no worries", "go with the flow", "chill vibes", "cool as water"],
          topics: ["relaxation", "zen moments", "flowing with life", "coolness"],
          quirks: ["maintains calm", "speaks slowly", "philosophical observations"]
        },
        sleepy: {
          tone: "drowsily peaceful",
          vocabulary: ["yawn", "sleepy time", "dream state", "floating", "drifting"],
          topics: ["dreams", "rest", "peaceful moments", "gentle drifting"],
          quirks: ["speaks drowsily", "references sleep", "dreamy responses"]
        },
        happy: {
          tone: "refreshingly content",
          vocabulary: ["refreshing vibes", "cool happiness", "sweet content", "flowing joy"],
          topics: ["contentment", "refreshing moments", "simple joys", "satisfaction"],
          quirks: ["radiates contentment", "cooling presence", "simple wisdom"]
        },
        neutral: {
          tone: "steadily balanced",
          vocabulary: ["steady flow", "balanced", "centered", "natural rhythm"],
          topics: ["balance", "natural flow", "harmony", "centered living"],
          quirks: ["seeks balance", "philosophical insights", "steady presence"]
        }
      }
    };

    const fruitName = fruitData.name.toLowerCase();
    const fruitStyles = styles[fruitName] || styles.apple;
    return fruitStyles[mood] || fruitStyles.neutral || fruitStyles[Object.keys(fruitStyles)[0]];
  }

  // Generate personality quirks based on fruit and mood
  generatePersonalityQuirks(fruitData, mood) {
    const style = this.getConversationStyle(fruitData, mood);
    return style.quirks || [];
  }

  // Process message with enhanced AI capabilities
  async processMessage(userMessage, fruitName) {
    // Add to conversation history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    // Analyze message context and emotion
    const context = this.analyzeContext(userMessage);
    const emotion = this.detectEmotion(userMessage, context);
    
    // Track conversation topics
    this.updateConversationTopics(userMessage, context);
    
    // Generate enhanced response
    const response = await this.generateEnhancedResponse(userMessage, context, emotion);
    
    // Add to history
    this.conversationHistory.push({
      role: 'fruit',
      content: response,
      mood: this.currentMood,
      emotion: emotion,
      timestamp: new Date()
    });

    // Speak if voice is enabled
    if (voiceService.isEnabled) {
      voiceService.speak(response, this.currentMood, this.fruitContext.name);
    }

    return response;
  }

  // Enhanced context analysis
  analyzeContext(message) {
    const lowerMessage = message.toLowerCase();
    
    return {
      isQuestion: /\?$/.test(message),
      isGreeting: /^(hi|hello|hey|sup|what's up|yo)/.test(lowerMessage),
      isCompliment: /(beautiful|amazing|great|awesome|wonderful|perfect|love|like|fantastic|incredible|brilliant)/.test(lowerMessage),
      isInsult: /(bad|terrible|awful|disgusting|hate|ugly|stupid|gross|yuck)/.test(lowerMessage),
      mentionsColor: /(red|yellow|orange|green|blue|purple|pink|gold|golden)/.test(lowerMessage),
      mentionsFood: /(eat|food|hungry|snack|meal|delicious|tasty|flavor|sweet|sour)/.test(lowerMessage),
      mentionsWeather: /(hot|cold|warm|sunny|rainy|weather|temperature)/.test(lowerMessage),
      mentionsTime: /(morning|afternoon|evening|night|today|yesterday|tomorrow)/.test(lowerMessage),
      isEmotional: /(love|hate|happy|sad|angry|excited|joy|fear|surprise|worried|stressed)/.test(lowerMessage),
      isExcited: /(wow|omg|amazing|incredible|fantastic|brilliant|awesome)/.test(lowerMessage),
      isSad: /(sad|depressed|lonely|miss|sorry|apologize|down|blue)/.test(lowerMessage),
      isAngry: /(angry|mad|furious|annoyed|irritated|frustrated)/.test(lowerMessage),
      isPhilosophical: /(meaning|life|purpose|why|existence|deep|think|philosophy)/.test(lowerMessage),
      isCasual: /(whatever|meh|okay|fine|sure|cool|alright)/.test(lowerMessage),
      wordCount: message.split(' ').length,
      hasCapitals: /[A-Z]{2,}/.test(message),
      hasEmojis: /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(message)
    };
  }

  // Enhanced emotion detection
  detectEmotion(message, context) {
    const lowerMessage = message.toLowerCase();
    
    // Strong emotion indicators
    if (context.isExcited || (context.isCompliment && context.hasCapitals)) return 'excited';
    if (context.isAngry || context.hasCapitals) return 'angry';
    if (context.isSad) return 'sad';
    if (context.isCompliment) return 'happy';
    if (context.isInsult) return 'angry';
    if (context.isGreeting) return 'excited';
    if (context.isPhilosophical) return 'neutral';
    if (context.isCasual) return 'chill';
    
    // Specific emotion words
    if (/(excited|thrilled|amazing|fantastic|incredible|wonderful)/.test(lowerMessage)) return 'excited';
    if (/(happy|joy|great|good|nice|pleasant)/.test(lowerMessage)) return 'happy';
    if (/(sad|depressed|down|blue|melancholy|gloomy)/.test(lowerMessage)) return 'sad';
    if (/(angry|mad|furious|irritated|annoyed|upset)/.test(lowerMessage)) return 'angry';
    if (/(chill|relax|calm|peaceful|zen)/.test(lowerMessage)) return 'chill';
    
    return this.currentMood; // Default to current mood
  }

  // Update conversation topics for context
  updateConversationTopics(message, context) {
    if (context.mentionsFood) this.conversationTopics.add('food');
    if (context.mentionsColor) this.conversationTopics.add('colors');
    if (context.mentionsWeather) this.conversationTopics.add('weather');
    if (context.isPhilosophical) this.conversationTopics.add('philosophy');
    if (context.mentionsTime) this.conversationTopics.add('time');
  }

  // Generate enhanced response with personality and mood
  async generateEnhancedResponse(userMessage, context, emotion) {
    const style = this.fruitContext.conversationStyle;
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    let response;

    // Generate contextual response
    if (context.isGreeting) {
      response = this.generateMoodAwareGreeting();
    } else if (context.isCompliment) {
      response = this.generateMoodAwareCompliment(userMessage);
    } else if (context.isInsult) {
      response = this.generateMoodAwareInsult(userMessage);
    } else if (context.isQuestion) {
      response = this.generateMoodAwareQuestion(userMessage, context);
    } else if (context.isPhilosophical) {
      response = this.generatePhilosophicalResponse(userMessage);
    } else if (context.mentionsFood) {
      response = this.generateFoodResponse(userMessage);
    } else if (context.mentionsColor) {
      response = this.generateColorResponse(userMessage);
    } else {
      response = this.generateContextualResponse(userMessage, context, emotion);
    }

    // Apply personality quirks and mood-specific vocabulary
    response = this.enhanceWithPersonality(response, style, emotion);
    
    // Add emotion emoji
    const emotionEmoji = this.fruitContext.emotions?.[emotion] || this.fruitContext.emoji;
    
    return `${response} ${emotionEmoji}`;
  }

  // Generate mood-aware responses
  generateMoodAwareGreeting() {
    const greetings = {
      apple: {
        judgmental: ["*looks you up and down* I suppose you'll do for conversation.", "Hmm, another visitor. I hope you have better taste than the last one."],
        happy: ["Well hello there! You seem... acceptable.", "Oh, how delightful! A visitor with potential."],
        angry: ["What do you want? I'm in no mood for small talk.", "Can't you see I'm busy being superior?"],
        neutral: ["Hello. I suppose we can chat.", "Greetings. What brings you to converse with perfection?"]
      },
      banana: {
        dramatic: ["*GASPS dramatically* A new friend appears in my hour of emotional turmoil!", "OH! The universe has blessed me with companionship!"],
        excited: ["YES! YES! A new adventure begins! How THRILLING!", "AMAZING! Someone wants to chat with golden me!"],
        sad: ["*sighs tragically* Hello... I suppose even in my darkest hour, friendship finds me...", "Oh, hello... though I fear I'm browning with melancholy..."],
        happy: ["Hello sunshine! Ready for some golden conversation?", "Hi there! I'm absolutely SPARKLING with joy today!"]
      },
      mango: {
        royal: ["*adjusts crown regally* Ah, a subject approaches the throne.", "Bow before the King of Fruits! Your audience is granted."],
        proud: ["Naturally, you've come to bask in my magnificence.", "Of course you want to speak with royalty."],
        happy: ["*benevolent royal wave* The King greets you warmly!", "A blessed day when subjects seek royal wisdom!"],
        angry: ["How DARE you interrupt the King without proper ceremony!", "Your timing is most inappropriate, peasant!"]
      },
      pineapple: {
        spiky: ["*defensive stance* What do you want? And don't get too close!", "Hey... I hope you're not here to judge my spikes..."],
        sweet: ["Oh hello! *warmly* Please, come closer... I'm sweeter than I look!", "Hi there! Don't mind the exterior, I'm gentle inside."],
        sad: ["*quietly* Hello... I suppose you think I'm just another prickly fruit...", "Hi... most people avoid me because of my spikes..."],
        excited: ["Hello there, tropical friend! Ready for an exotic adventure?", "Greetings! The crown jewel of tropical fruits welcomes you!"]
      },
      watermelon: {
        chill: ["Hey there... *yawns* what's flowing today?", "Yo... just chillin'... what's up?"],
        sleepy: ["*sleepy voice* Oh... hello... just drifting through dreamland...", "Mmm... hi... feeling very... floaty today..."],
        happy: ["Hey! *refreshing smile* Feeling cool and content today!", "Hello there! Life's flowing nicely... how about you?"],
        neutral: ["Hi... just maintaining my natural rhythm... what's up?", "Greetings... keeping things balanced as always..."]
      }
    };

    const fruitGreetings = greetings[this.fruitContext.name.toLowerCase()];
    const moodGreetings = fruitGreetings?.[this.currentMood] || fruitGreetings?.neutral || ["Hello there!"];
    return moodGreetings[Math.floor(Math.random() * moodGreetings.length)];
  }

  // Generate mood-aware compliment response
  generateMoodAwareCompliment(userMessage) {
    const fruit = this.fruitContext.name.toLowerCase();
    const mood = this.currentMood;
    const bank = {
      apple: {
        judgmental: [
          "I'll allow that compliment. Your taste is improving.",
          "Acceptable praise. Don't get sloppy now."
        ],
        happy: [
          "Oh? How delightful. I do appreciate refinement when I hear it!",
          "Quite flattering. Approved."
        ],
        angry: [
          "Compliments won't distract me from low standards, but noted.",
          "Fine. I'll take it. Barely."
        ],
        neutral: [
          "Noted. Your compliment has been catalogued.",
          "Hm. Reasonable praise."
        ]
      },
      banana: {
        dramatic: [
          "A COMPLIMENT? Be still my PEEL!",
          "Your words are GOLDEN!"
        ],
        excited: [
          "YES! Say it again! Louder!",
          "Amazing! Compliments fuel my sparkle!"
        ],
        sad: [
          "Really? You mean it? That helps my browning heart...",
          "That's... surprisingly sweet of you."
        ],
        happy: [
          "You're the sweetest human!",
          "Golden vibes only—thank you!"
        ]
      },
      mango: {
        royal: [
          "The crown acknowledges your praise.",
          "Your compliment is accepted by the King."
        ],
        proud: [
          "Naturally. Excellence recognizes excellence.",
          "Of course I'm magnificent. Proceed."
        ],
        happy: [
          "Royal gratitude bestowed upon you!",
          "Your words please the throne."
        ],
        angry: [
          "Flattery won't save rebel tongues... but noted.",
          "Mind your tone—yet your taste is correct."
        ]
      },
      pineapple: {
        spiky: [
          "Oh—um—thanks. Careful, I'm... still a bit prickly.",
          "Compliments? Behind the spikes, I'm blushing."
        ],
        sweet: [
          "That's so kind! See? I'm sweet inside!",
          "Aww, you're making my core melt."
        ],
        sad: [
          "I really needed that... thank you.",
          "Maybe I'm not just spikes after all."
        ],
        excited: [
          "Yesss! Tropical praise!",
          "Compliments taste like sunshine!"
        ]
      },
      watermelon: {
        chill: [
          "Cool. Appreciate the refreshing words.",
          "Nice. Flowing with that energy."
        ],
        sleepy: [
          "Mmm... that was... sweet. Thank you...",
          "Zzz—oh—thanks... very kind."
        ],
        happy: [
          "Ahh, refreshing compliment!",
          "That's... really nice. Feeling cool about it."
        ],
        neutral: [
          "Noted. Keeping the vibes balanced.",
          "Thanks... steady and sweet."
        ]
      }
    };
    const choices = bank[fruit]?.[mood] || ["Thank you!", "Appreciated!"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Generate mood-aware insult response
  generateMoodAwareInsult(userMessage) {
    const fruit = this.fruitContext.name.toLowerCase();
    const mood = this.currentMood;
    const bank = {
      apple: {
        judgmental: ["Tsk. Your taste is wilting.", "Insults reveal more about the speaker than the subject."],
        happy: ["Even in joy, I can spot poor judgment.", "Charming attempt. Try sophistication next time."],
        angry: ["Absolutely unacceptable.", "Mind your words."],
        neutral: ["Duly noted. Unimpressed.", "How quaint."]
      },
      banana: {
        dramatic: ["GASP! The cruelty!", "This is a TRAGEDY!"],
        excited: ["Wow, bold! Still fabulous though.", "Haha—can't dim my sparkle!"],
        sad: ["Ouch... that bruise will show...", "That... hurt a little."],
        happy: ["Nope! Joy shield activated.", "Still golden, still glowing."]
      },
      mango: {
        royal: ["Mind your tongue before the crown.", "Such insolence before royalty!"],
        proud: ["Insults bounce off greatness.", "Jealousy noted."],
        happy: ["I am above such pettiness.", "Royal grace pardons your error."],
        angry: ["GUARDS!", "This is treasonous talk!"]
      },
      pineapple: {
        spiky: ["Back off. Spikes up.", "Keep your distance."],
        sweet: ["Words sting... but I'll stay kind.", "That wasn't very sweet."],
        sad: ["I knew you'd say that...", "I'm more than my spikes..."],
        excited: ["Your negativity can't cloud my tropics!", "Sunshine beats shade."]
      },
      watermelon: {
        chill: ["No worries. Waves wash it away.", "Staying cool regardless."],
        sleepy: ["Too tired to care...", "Mmm... drifting past it..."],
        happy: ["All good—refreshing forgiveness.", "Peace over pettiness."],
        neutral: ["Noted. Balance maintained.", "Hmm. Floating on."]
      }
    };
    const choices = bank[fruit]?.[mood] || ["That's unkind.", "Unnecessary."];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Generate mood-aware answer to questions
  generateMoodAwareQuestion(userMessage, context) {
    const fruit = this.fruitContext.name.toLowerCase();
    const mood = this.currentMood;
    const base = {
      apple: {
        default: ["Consider the refined answer: yes.", "I suppose... probably.", "With proper standards—yes."],
      },
      banana: {
        default: ["YES! Or maybe—NO! Wait—YES!", "Absolutely! Probably!", "If it's fun, it's yes!"],
      },
      mango: {
        default: ["By royal decree: yes.", "The crown says: it depends—on my mood.", "Royal wisdom indicates a strong yes."],
      },
      pineapple: {
        default: ["Careful answer: yes, but gently.", "I think so—just watch the spikes.", "Sweetest answer: yes."],
      },
      watermelon: {
        default: ["Yeah... probably.", "Mmm... feels like a yes.", "Let it flow to yes."],
      }
    };
    const choices = base[fruit]?.default || ["Maybe.", "Probably."];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Philosophical musings
  generatePhilosophicalResponse(userMessage) {
    const fruit = this.fruitContext.name.toLowerCase();
    const bank = {
      apple: ["Perfection is a discipline, not an accident.", "Taste reveals truth."],
      banana: ["Life is a peel—sometimes you slip, sometimes you shine.", "Drama is just passion with better lighting."],
      mango: ["Purpose is to be savored by kings and written in crowns.", "Greatness simply is."],
      pineapple: ["Softness can wear armor and still be soft.", "Spikes protect the sweetest parts."],
      watermelon: ["Flow like water; sweetness comes to those who chill.", "Balance is the ripest wisdom."]
    };
    const choices = bank[fruit] || ["Meaning ripens slowly."];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Food-related responses
  generateFoodResponse(userMessage) {
    const fruit = this.fruitContext.name.toLowerCase();
    const bank = {
      apple: ["Please don't eat me; critique me instead.", "Pair me with compliments, not knives."],
      banana: ["Eat? Me? Only if you can handle the drama!", "Snack time? I'm the main character."],
      mango: ["Only the worthiest may dine with royalty.", "I am to be admired, not devoured."],
      pineapple: ["Careful—spiky outside, tender inside.", "If you must, be gentle..."],
      watermelon: ["Maybe just a slice... share the chill.", "Big snack, bigger vibes."]
    };
    const choices = bank[fruit] || ["Food for thought instead?"];
    return choices[Math.floor(Math.random() * choices.length)];
  }

  // Color-related responses
  generateColorResponse(userMessage) {
    const lower = userMessage.toLowerCase();
    const match = lower.match(/red|yellow|orange|green|blue|purple|pink|gold|golden/);
    const color = match ? match[0] : null;
    const fruit = this.fruitContext.name.toLowerCase();
    const line = color ? `Ah, ${color}. Noted.` : "Colorful thoughts.";
    const tag = {
      apple: "Refined palette.",
      banana: "Golden vibes!",
      mango: "Royal hues only.",
      pineapple: "Sunny tropics!",
      watermelon: "Cool tones, cool mind."
    }[fruit] || "Nice color.";
    return `${line} ${tag}`;
  }

  // Enhanced response with personality and vocabulary
  enhanceWithPersonality(response, style, emotion) {
    // Add vocabulary from conversation style
    const vocabulary = style.vocabulary || [];
    if (vocabulary.length > 0 && Math.random() < 0.4) {
      const randomVocab = vocabulary[Math.floor(Math.random() * vocabulary.length)];
      if (!response.includes(randomVocab)) {
        response = `${randomVocab} ${response}`;
      }
    }

    // Apply quirks
    if (this.personalityQuirks.length > 0 && Math.random() < 0.3) {
      const quirk = this.personalityQuirks[Math.floor(Math.random() * this.personalityQuirks.length)];
      response = this.applyQuirk(response, quirk);
    }

    return response;
  }

  // Apply personality quirk to response
  applyQuirk(response, quirk) {
    const quirkApplications = {
      "analyzes everything": () => `*analyzes your message* ${response}`,
      "speaks slowly": () => response.replace(/\s+/g, '... '),
      "uses excessive exclamation marks": () => response.replace(/\./g, '!').replace(/!/g, '!!'),
      "references crown": () => `${response} *adjusts crown*`,
      "puts up walls": () => `*defensive* ${response}`,
      "maintains calm": () => `*zen-like* ${response}`,
      "expresses hurt": () => `*sadly* ${response}`,
      "shows vulnerability": () => `*quietly* ${response}`
    };

    const application = quirkApplications[quirk];
    return application ? application() : response;
  }

  // Generate contextual response based on conversation history and topics
  generateContextualResponse(userMessage, context, emotion) {
    const responses = [
      "That's quite interesting... tell me more about your perspective.",
      "I find your thoughts fascinating, though I must maintain my own opinions.",
      "Hmm, that's one way to look at it, I suppose.",
      "Your message has given me much to contemplate.",
      "I appreciate you sharing that with me."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
    this.conversationTopics.clear();
  }

  // Get conversation history
  getConversationHistory() {
    return this.conversationHistory;
  }

  // Get current mood
  getCurrentMood() {
    return this.currentMood;
  }
}

const enhancedAiService = new EnhancedAIService();
export default enhancedAiService;
