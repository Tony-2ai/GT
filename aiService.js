// AI Service for real-time conversation with fruits
// This simulates AI conversation capabilities similar to a0.dev

class AIService {
  constructor() {
    this.conversationHistory = [];
    this.fruitContext = {};
  }

  // Initialize AI context for a specific fruit
  initializeFruitContext(fruitName, fruitData, mood = null) {
    this.fruitContext = {
      name: fruitData.name,
      personality: fruitData.personality,
      mood: fruitData.mood,
      currentMood: mood || fruitData.mood.toLowerCase(),
      emoji: fruitData.emoji,
      emotions: fruitData.emotions,
      replies: fruitData.replies,
      tasks: fruitData.tasks,
      conversationStyle: this.getConversationStyle(fruitData, mood)
    };
  }

  // Update mood for current fruit
  updateMood(newMood) {
    if (this.fruitContext) {
      this.fruitContext.currentMood = newMood;
      this.fruitContext.conversationStyle = this.getConversationStyle(this.fruitContext, newMood);
    }
  }

  // Get conversation style based on fruit personality and mood
  getConversationStyle(fruitData, mood = null) {
    const currentMood = mood || fruitData.mood?.toLowerCase() || 'neutral';
    const styles = {
      apple: {
        tone: "judgmental and sophisticated",
        vocabulary: ["*judges silently*", "I suppose", "questionable", "sophisticated"],
        responsePattern: "often questions user choices and maintains high standards"
      },
      banana: {
        tone: "dramatic and emotional",
        vocabulary: ["catastrophe!", "golden", "passionate", "authentically"],
        responsePattern: "uses exclamation marks and dramatic language"
      },
      mango: {
        tone: "royal and pompous",
        vocabulary: ["king", "royal", "magnificent", "decree"],
        responsePattern: "speaks with authority and expects respect"
      },
      pineapple: {
        tone: "defensive but sweet",
        vocabulary: ["sweet inside", "misunderstood", "complex", "crown"],
        responsePattern: "defends itself while showing inner sweetness"
      },
      watermelon: {
        tone: "chill and relaxed",
        vocabulary: ["chillin'", "fluid", "naturally", "zen"],
        responsePattern: "speaks slowly and uses relaxed language"
      }
    };
    return styles[fruitData.name.toLowerCase()] || styles.apple;
  }

  // Process user message and generate AI response
  async processMessage(userMessage, fruitName) {
    // Add to conversation history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    });

    // Analyze user message for context and emotion
    const context = this.analyzeContext(userMessage);
    const emotion = this.detectEmotion(userMessage, context);
    
    // Generate AI response based on fruit personality and emotion
    const aiResponse = await this.generateResponse(userMessage, context, fruitName, emotion);
    
    // Add AI response to history
    this.conversationHistory.push({
      role: 'fruit',
      content: aiResponse,
      emotion: emotion,
      timestamp: new Date()
    });

    return aiResponse;
  }

  // Analyze user message for context and sentiment
  analyzeContext(message) {
    const lowerMessage = message.toLowerCase();
    
    return {
      isQuestion: /\?$/.test(message),
      isGreeting: /^(hi|hello|hey|sup|what's up)/.test(lowerMessage),
      isCompliment: /(beautiful|amazing|great|awesome|wonderful|perfect|love|like)/.test(lowerMessage),
      isInsult: /(bad|terrible|awful|disgusting|hate|ugly|stupid)/.test(lowerMessage),
      mentionsColor: /(red|yellow|orange|green|blue|purple|pink)/.test(lowerMessage),
      mentionsFood: /(eat|food|hungry|snack|meal)/.test(lowerMessage),
      mentionsWeather: /(hot|cold|warm|sunny|rainy)/.test(lowerMessage),
      isEmotional: /(love|hate|happy|sad|angry|excited|joy|sadness|fear|surprise)/.test(lowerMessage),
      isExcited: /(wow|omg|amazing|incredible|fantastic|brilliant)/.test(lowerMessage),
      isSad: /(sad|depressed|lonely|miss|sorry|apologize)/.test(lowerMessage),
      isAngry: /(angry|mad|furious|annoyed|irritated)/.test(lowerMessage),
      wordCount: message.split(' ').length
    };
  }

  // Detect emotion from user message
  detectEmotion(message, context) {
    const lowerMessage = message.toLowerCase();
    
    if (context.isCompliment || context.isExcited) return 'happy';
    if (context.isInsult || context.isAngry) return 'angry';
    if (context.isSad) return 'sad';
    if (context.isGreeting) return 'excited';
    
    // Check for specific emotion words
    if (/(happy|joy|excited|thrilled|delighted)/.test(lowerMessage)) return 'happy';
    if (/(sad|depressed|lonely|melancholy|gloomy)/.test(lowerMessage)) return 'sad';
    if (/(angry|mad|furious|irritated|annoyed)/.test(lowerMessage)) return 'angry';
    if (/(wow|amazing|incredible|fantastic)/.test(lowerMessage)) return 'excited';
    
    return 'neutral';
  }

  // Generate AI response based on fruit personality and context
  async generateResponse(userMessage, context, fruitName, emotion) {
    const fruit = this.fruitContext;
    const style = this.fruitContext.conversationStyle;
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    // Generate contextual response with emotion
    let response = this.generateContextualResponse(userMessage, context, fruit, style, emotion);
    
    // Add personality quirks and emotion emoji
    response = this.addPersonalityQuirks(response, fruit, style, emotion);
    
    return response;
  }

  // Generate contextual response based on user message
  generateContextualResponse(userMessage, context, fruit, style, emotion) {
    // Handle greetings
    if (context.isGreeting) {
      return this.generateGreeting(fruit, style, emotion);
    }
    
    // Handle compliments
    if (context.isCompliment) {
      return this.generateComplimentResponse(fruit, style, emotion);
    }
    
    // Handle insults
    if (context.isInsult) {
      return this.generateInsultResponse(fruit, style, emotion);
    }
    
    // Handle questions
    if (context.isQuestion) {
      return this.generateQuestionResponse(userMessage, fruit, style, emotion);
    }
    
    // Handle color mentions
    if (context.mentionsColor) {
      return this.generateColorResponse(userMessage, fruit, style, emotion);
    }
    
    // Handle food mentions
    if (context.mentionsFood) {
      return this.generateFoodResponse(userMessage, fruit, style, emotion);
    }
    
    // Handle emotional responses
    if (emotion !== 'neutral') {
      return this.generateEmotionalResponse(userMessage, fruit, style, emotion);
    }
    
    // Default response
    return this.generateDefaultResponse(userMessage, fruit, style, emotion);
  }

  // Generate greeting response
  generateGreeting(fruit, style, emotion) {
    const greetings = {
      apple: {
        excited: "Oh, hello there! *raises eyebrow* I suppose you're worth my time.",
        happy: "Hello there. I hope you're not planning to eat me.",
        neutral: "Oh, hello there. I hope you're not planning to eat me.",
        sad: "Hello... I suppose you're here to judge me too.",
        angry: "What do you want? I'm busy being sophisticated."
      },
      banana: {
        excited: "Hi! I'm so excited to chat with you! 🍌",
        happy: "Hello! I'm so happy to see you! 🍌",
        neutral: "Hi! I'm so excited to chat with you! 🍌",
        sad: "Hi... I'm feeling a bit brown today... 🍌",
        angry: "What?! I'm not yellow, I'm GOLDEN! 🍌"
      },
      mango: {
        excited: "Greetings, mortal! I, the king of fruits, welcome you with royal grace!",
        happy: "Greetings, peasant. I, the king of fruits, welcome you.",
        neutral: "Greetings, mortal. I, the king of fruits, welcome you.",
        sad: "Greetings... even kings have their melancholy moments.",
        angry: "How dare you interrupt the king! State your business!"
      },
      pineapple: {
        excited: "Hey there! I'm not as spiky as I look, promise! 😊",
        happy: "Hey there! I'm sweet inside, you know! 😊",
        neutral: "Hey there! I'm not as spiky as I look, promise!",
        sad: "Hey... people keep calling me spiky... 😔",
        angry: "Hey! I'm not prickly, I'm defensively sweet!"
      },
      watermelon: {
        excited: "Hey... what's up? Just chillin' like a watermelon... 😊",
        happy: "Hey... what's up? Just chillin' like a watermelon... 😌",
        neutral: "Hey... what's up? Just chillin' like a watermelon...",
        sad: "Hey... feeling a bit... watery today... 😔",
        angry: "Hey... I'm not slow, I'm just... taking my time..."
      }
    };
    
    const fruitGreetings = greetings[fruit.name.toLowerCase()] || greetings.apple;
    return fruitGreetings[emotion] || fruitGreetings.neutral;
  }

  // Generate compliment response
  generateComplimentResponse(fruit, style) {
    const responses = {
      apple: "Well, I suppose that's acceptable. At least you have good taste.",
      banana: "YES! Finally someone who appreciates my golden beauty! 🍌",
      mango: "Of course you think I'm amazing! I am the king, after all.",
      pineapple: "Aww, that's so sweet! See, I told you I'm sweet inside!",
      watermelon: "That's... really nice. You know, I try to stay cool about compliments."
    };
    
    return responses[fruit.name.toLowerCase()] || responses.apple;
  }

  // Generate insult response
  generateInsultResponse(fruit, style) {
    const responses = {
      apple: "I'm not being dramatic, I'm just being honest about your poor judgment.",
      banana: "Oh no! This is a catastrophe! How could you say such things? 🍌",
      mango: "How dare you insult the king! I demand an immediate apology!",
      pineapple: "I'm not prickly, I'm just... defensively sweet! And you're being mean!",
      watermelon: "That's... not very cool of you. I thought we were friends."
    };
    
    return responses[fruit.name.toLowerCase()] || responses.apple;
  }

  // Generate question response
  generateQuestionResponse(userMessage, fruit, style) {
    const question = userMessage.toLowerCase();
    
    if (question.includes('how are you')) {
      return this.generateHowAreYouResponse(fruit, style);
    }
    
    if (question.includes('what') && question.includes('favorite')) {
      return this.generateFavoriteResponse(fruit, style);
    }
    
    if (question.includes('why')) {
      return this.generateWhyResponse(fruit, style);
    }
    
    // Default question response
    return this.generateDefaultQuestionResponse(fruit, style);
  }

  // Generate color response
  generateColorResponse(userMessage, fruit, style) {
    const color = userMessage.match(/(red|yellow|orange|green|blue|purple|pink)/i)?.[1];
    
    if (!color) return this.generateDefaultResponse(userMessage, fruit, style);
    
    const colorResponses = {
      red: {
        apple: "Red is the color of sophistication and class. Like me.",
        banana: "I'm not red, I'm *golden*! There's a huge difference!",
        mango: "Red? I prefer to think of myself as *royally* orange.",
        pineapple: "I'm not red, I'm golden with a crown!",
        watermelon: "Red is cool, but I'm more of a green kind of fruit."
      },
      yellow: {
        apple: "Yellow? I'm red, thank you very much.",
        banana: "YES! Yellow is the most beautiful color in the world! 🍌",
        mango: "Yellow is peasant color. I am *royally* orange.",
        pineapple: "Yellow is the color of royalty and sweetness, just like me!",
        watermelon: "Yellow is nice, but I'm more into green vibes."
      }
    };
    
    return colorResponses[color]?.[fruit.name.toLowerCase()] || 
           `I'm not really into ${color}, but whatever floats your boat.`;
  }

  // Generate food response
  generateFoodResponse(userMessage, fruit, style) {
    const responses = {
      apple: "I hope you're not planning to eat me. I'm for admiring, not consuming.",
      banana: "Why do humans always want to eat me? I have feelings too!",
      mango: "I'm too regal to be eaten. I should be displayed in a museum.",
      pineapple: "I'm not just food, I'm an experience! A sweet, complex experience!",
      watermelon: "I'm mostly water, so I'm like... naturally hydrating food."
    };
    
    return responses[fruit.name.toLowerCase()] || responses.apple;
  }

  // Generate default response
  generateDefaultResponse(userMessage, fruit, style) {
    // Use fruit's existing replies with AI enhancement
    const baseReplies = fruit.replies;
    const randomReply = baseReplies[Math.floor(Math.random() * baseReplies.length)];
    
    // Enhance with context awareness
    if (userMessage.length < 10) {
      return `${randomReply} (You're not very talkative, are you?)`;
    }
    
    if (userMessage.length > 50) {
      return `${randomReply} (That's quite a long message you've got there!)`;
    }
    
    return randomReply;
  }

  // Add personality quirks to response
  addPersonalityQuirks(response, fruit, style, emotion) {
    const emotionEmoji = fruit.emotions?.[emotion] || fruit.emoji;
    
    const quirks = {
      apple: () => {
        let enhanced = response.includes('*') ? response : `*${response}*`;
        return `${enhanced} ${emotionEmoji}`;
      },
      banana: () => {
        let enhanced = response.includes('!') ? response : `${response}!`;
        return `${enhanced} ${emotionEmoji}`;
      },
      mango: () => {
        let enhanced = response.includes('royal') ? response : `As the king, I say: ${response}`;
        return `${enhanced} ${emotionEmoji}`;
      },
      pineapple: () => {
        let enhanced = response.includes('sweet') ? response : `${response} (I'm sweet inside, you know!)`;
        return `${enhanced} ${emotionEmoji}`;
      },
      watermelon: () => {
        let enhanced = response.includes('...') ? response : `${response}...`;
        return `${enhanced} ${emotionEmoji}`;
      }
    };
    
    const quirkFunction = quirks[fruit.name.toLowerCase()];
    return quirkFunction ? quirkFunction() : `${response} ${emotionEmoji}`;
  }

  // Generate emotional response
  generateEmotionalResponse(userMessage, fruit, style, emotion) {
    const responses = {
      apple: {
        happy: "Well, I suppose that's acceptable. At least you have good taste.",
        sad: "I'm not being dramatic, I'm just... selectively sweet.",
        angry: "I'm not being difficult, I'm just maintaining my standards!",
        excited: "Oh! I suppose that's... interesting. *judges silently*",
        neutral: "I'm not just red, I'm *perfectly* red. There's a difference."
      },
      banana: {
        happy: "YES! Finally someone who appreciates my golden beauty!",
        sad: "Oh no! I think I'm starting to brown! This is a catastrophe!",
        angry: "I'm not yellow, I'm *golden*! There's a huge difference!",
        excited: "I'm not being dramatic, I'm just very passionate about everything!",
        neutral: "I'm not curved, I'm *artistically arched*!"
      },
      mango: {
        happy: "Of course you think I'm amazing! I am the king, after all.",
        sad: "Even kings have their moments of doubt...",
        angry: "How dare you! I am the king of fruits!",
        excited: "As the king, I decree that this is magnificent!",
        neutral: "I'm not just sweet, I'm *regally* sweet!"
      },
      pineapple: {
        happy: "Aww, that's so sweet! See, I told you I'm sweet inside!",
        sad: "Why does everyone think I'm so spiky? I'm actually very sweet inside!",
        angry: "I'm not prickly, I'm just... defensively sweet!",
        excited: "I'm not just tropical, I'm *tropically* amazing!",
        neutral: "I'm not just yellow, I'm *golden* with a crown!"
      },
      watermelon: {
        happy: "That's... really nice. You know, I try to stay cool about things.",
        sad: "I'm not slow, I'm just... taking my time, you know?",
        angry: "That's... not very cool of you. I thought we were friends.",
        excited: "That's... really exciting! I'm naturally refreshing!",
        neutral: "I'm not just big, I'm... generously sized!"
      }
    };
    
    const fruitResponses = responses[fruit.name.toLowerCase()] || responses.apple;
    return fruitResponses[emotion] || fruitResponses.neutral;
  }

  // Generate "how are you" response
  generateHowAreYouResponse(fruit, style) {
    const responses = {
      apple: "I'm maintaining my standards, as always. How about you?",
      banana: "I'm doing great! Though I'm a bit worried about browning... 🍌",
      mango: "I am magnificent, as befits a king. How are you, peasant?",
      pineapple: "I'm doing sweet! Though people keep calling me spiky...",
      watermelon: "I'm chillin'... just taking my time, you know?"
    };
    
    return responses[fruit.name.toLowerCase()] || responses.apple;
  }

  // Generate favorite response
  generateFavoriteResponse(fruit, style) {
    const responses = {
      apple: "My favorite thing is being perfectly red and sophisticated.",
      banana: "My favorite thing is being golden and dramatic! 🍌",
      mango: "My favorite thing is being the king of all fruits!",
      pineapple: "My favorite thing is my crown and my sweet interior!",
      watermelon: "My favorite thing is being cool and refreshing..."
    };
    
    return responses[fruit.name.toLowerCase()] || responses.apple;
  }

  // Generate why response
  generateWhyResponse(fruit, style) {
    const responses = {
      apple: "Why? Because I have standards, that's why.",
      banana: "Why? Because I'm passionate about everything! 🍌",
      mango: "Why? Because I am the king, and kings don't need to explain themselves!",
      pineapple: "Why? Because I'm complex and misunderstood, that's why!",
      watermelon: "Why? Because... I don't know, I just am..."
    };
    
    return responses[fruit.name.toLowerCase()] || responses.apple;
  }

  // Generate default question response
  generateDefaultQuestionResponse(fruit, style) {
    const responses = {
      apple: "That's an interesting question. I suppose I should think about it.",
      banana: "Oh! That's such a great question! Let me think... 🍌",
      mango: "As the king, I decree that this is a worthy question to ponder.",
      pineapple: "Hmm, that's a complex question. I'm not just simple, you know!",
      watermelon: "That's... a good question. Let me think about it..."
    };
    
    return responses[fruit.name.toLowerCase()] || responses.apple;
  }

  // Get conversation history
  getConversationHistory() {
    return this.conversationHistory;
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
  }
}

const aiService = new AIService();
export default aiService;
