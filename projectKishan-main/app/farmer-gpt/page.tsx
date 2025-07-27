"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Mic, MicOff, Camera, Leaf, TrendingUp, CloudRain, Sprout, User, Bot, Loader2, Globe, Volume2, VolumeX, Play, Pause, Square, Settings } from "lucide-react"
import Link from "next/link"
import GoogleSpeechToText, { type SpeechRecognitionResult } from "@/lib/speechToText"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function FarmerGPTPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [isVoiceSupported, setIsVoiceSupported] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [autoSubmit, setAutoSubmit] = useState(true) // Auto-submit voice input
  const [lastDetectedLanguage, setLastDetectedLanguage] = useState('')
  const [useGoogleAPI, setUseGoogleAPI] = useState(false) // Toggle for Google API
  const [googleAPIKey, setGoogleAPIKey] = useState(
    typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_SPEECH_API_KEY || '' : ''
  ) // Your Google API key
  const [googleSpeechToText, setGoogleSpeechToText] = useState<GoogleSpeechToText | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Supported languages for voice input with auto-detection patterns
  const supportedLanguages = [
    { code: 'en-IN', name: 'English (India)', native: 'English', patterns: [/^[a-zA-Z\s.,!?'"]+$/] },
    { code: 'hi-IN', name: 'Hindi', native: 'हिंदी', patterns: [/[\u0900-\u097F]/, /देवनागरी/] },
    { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ', patterns: [/[\u0C80-\u0CFF]/] },
    { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்', patterns: [/[\u0B80-\u0BFF]/] },
    { code: 'te-IN', name: 'Telugu', native: 'తెలుగు', patterns: [/[\u0C00-\u0C7F]/] },
    { code: 'mr-IN', name: 'Marathi', native: 'मराठी', patterns: [/[\u0900-\u097F]/, /मराठी/] },
    { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી', patterns: [/[\u0A80-\u0AFF]/] },
    { code: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', patterns: [/[\u0A00-\u0A7F]/] }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Track when component is mounted to prevent hydration issues
  useEffect(() => {
    setMounted(true)

    // Auto-enable Google API if API key is available
    if (typeof window !== 'undefined') {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SPEECH_API_KEY;
      if (apiKey && apiKey.length > 10) {
        console.log('🔑 Google Speech API key detected - enabling Google API');
        setUseGoogleAPI(true);
      }
    }
  }, [])

  // Initialize Speech Recognition only after component mounts
  useEffect(() => {
    if (!mounted) return

    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();

      // Configure recognition settings for better real-time experience
      recognitionInstance.continuous = true; // Enable continuous listening
      recognitionInstance.interimResults = true; // Get real-time results
      recognitionInstance.maxAlternatives = 3; // Get multiple alternatives for better accuracy

      // Start with auto-detected language or selected language
      recognitionInstance.lang = selectedLanguage;

      recognitionInstance.onstart = () => {
        setIsListening(true);
        console.log('🎤 Voice recognition started');
      };

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Update input with interim results for real-time feedback
        if (interimTranscript) {
          setInput(interimTranscript);
        }

        // When we have final results
        if (finalTranscript) {
          const detectedLanguage = detectLanguageFromText(finalTranscript);

          // Auto-switch language if detected different language
          if (detectedLanguage && detectedLanguage !== selectedLanguage) {
            console.log(`🌐 Language auto-detected: ${detectedLanguage}`);
            setSelectedLanguage(detectedLanguage);
            setLastDetectedLanguage(detectedLanguage);

            // Restart recognition with new language
            recognitionInstance.lang = detectedLanguage;
          }

          setInput(finalTranscript.trim());
          setIsListening(false);

          // Auto-submit if enabled and we have content
          if (autoSubmit && finalTranscript.trim()) {
            console.log('🚀 Auto-submitting voice input:', finalTranscript.trim());
            setTimeout(() => {
              sendMessage(finalTranscript.trim());
            }, 100); // Small delay to ensure state updates
          }
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);

        // Show user-friendly error messages
        if (event.error === 'no-speech') {
          console.log('🔇 No speech detected. Click mic again to try.');
        } else if (event.error === 'network') {
          console.log('🌐 Network error. Please check your connection.');
        } else if (event.error === 'not-allowed') {
          console.log('🚫 Microphone access denied. Please allow microphone access.');
        } else {
          console.log('❌ Speech recognition error. Please try again.');
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
        console.log('🎤 Voice recognition ended');
      };

      setRecognition(recognitionInstance);
      setIsVoiceSupported(true);
    } else {
      console.log('Speech recognition not supported in this browser');
      setIsVoiceSupported(false);
    }
  }, [selectedLanguage, mounted, autoSubmit]);

  // Initialize Google Speech-to-Text API
  useEffect(() => {
    if (googleAPIKey && useGoogleAPI) {
      const googleSTT = new GoogleSpeechToText(googleAPIKey);
      setGoogleSpeechToText(googleSTT);
    }
  }, [googleAPIKey, useGoogleAPI]);

  // Language switching for voice recognition
  const switchLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    if (recognition) {
      recognition.lang = langCode;
    }
  };

  // Voice control functions with improved error handling
  const startListening = () => {
    if (recognition && !isListening) {
      try {
        // Clear previous input before starting
        setInput('');
        recognition.start();
        console.log('🎤 Starting voice recognition...');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (useGoogleAPI && mediaRecorder) {
      stopGoogleSpeechRecognition();
    } else if (recognition && isListening) {
      recognition.stop();
      console.log('🛑 Stopping voice recognition...');
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      if (useGoogleAPI && googleSpeechToText) {
        startGoogleSpeechRecognition();
      } else {
        startListening();
      }
    }
  };

  // Google Speech-to-Text functions
  const startGoogleSpeechRecognition = async () => {
    if (!googleSpeechToText) return;

    try {
      const recorder = await googleSpeechToText.streamingRecognize(
        (result: SpeechRecognitionResult) => {
          setInput(result.transcript);

          // Auto-detect language and switch if different
          if (result.languageCode && result.languageCode !== selectedLanguage) {
            const detectedLang = result.languageCode;
            setLastDetectedLanguage(detectedLang);
            setSelectedLanguage(detectedLang);
          }

          // Auto-submit if enabled
          if (autoSubmit && result.transcript.trim()) {
            setTimeout(() => {
              sendMessage(result.transcript);
            }, 100);
          }

          console.log(`Google STT Result: ${result.transcript} (confidence: ${result.confidence})`);
        },
        (error: Error) => {
          console.error('Google Speech-to-Text error:', error);
          setIsListening(false);
          // Fallback to browser Speech Recognition
          if (recognition) {
            startListening();
          }
        },
        {
          language: selectedLanguage,
          enableAutomaticPunctuation: true,
          model: 'latest_short'
        }
      );

      if (recorder) {
        setMediaRecorder(recorder);
        setIsListening(true);
        recorder.start(1000); // Record in 1-second chunks
        console.log('🎤 Google Speech-to-Text recognition started');
      }
    } catch (error) {
      console.error('Failed to start Google Speech recognition:', error);
      // Fallback to browser Speech Recognition
      if (recognition) {
        startListening();
      }
    }
  };

  const stopGoogleSpeechRecognition = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setMediaRecorder(null);
      setIsListening(false);
      console.log('🛑 Google Speech-to-Text recognition stopped');
    }
  };

  // Enhanced language detection function
  const detectLanguageFromText = (text: string): string | null => {
    const cleanText = text.toLowerCase().trim();

    // Check each supported language pattern
    for (const lang of supportedLanguages) {
      for (const pattern of lang.patterns) {
        if (pattern.test(text)) {
          console.log(`🔍 Detected ${lang.name} from text: "${text.substring(0, 50)}..."`);
          return lang.code;
        }
      }
    }

    // Advanced detection using common words
    const languageKeywords = {
      'hi-IN': ['है', 'में', 'की', 'को', 'से', 'का', 'के', 'और', 'यह', 'वह', 'मैं', 'आप'],
      'kn-IN': ['ಇದು', 'ಅದು', 'ನಾನು', 'ನೀವು', 'ಅವರು', 'ಮತ್ತು', 'ಆದರೆ', 'ಅಥವಾ', 'ಇಲ್ಲಿ', 'ಅಲ್ಲಿ'],
      'ta-IN': ['இது', 'அது', 'நான்', 'நீங்கள்', 'அவர்', 'மற்றும்', 'ஆனால்', 'அல்லது', 'இங்கே', 'அங்கே'],
      'te-IN': ['ఇది', 'అది', 'నేను', 'మీరు', 'అతను', 'మరియు', 'కానీ', 'లేదా', 'ఇక్కడ', 'అక్కడ'],
      'mr-IN': ['हे', 'ते', 'मी', 'तुम्ही', 'तो', 'आणि', 'पण', 'किंवा', 'येथे', 'तेथे'],
      'gu-IN': ['આ', 'તે', 'હું', 'તમે', 'તેઓ', 'અને', 'પરંતુ', 'અથવા', 'અહીં', 'ત્યાં'],
      'pa-IN': ['ਇਹ', 'ਉਹ', 'ਮੈਂ', 'ਤੁਸੀਂ', 'ਉਹ', 'ਅਤੇ', 'ਪਰ', 'ਜਾਂ', 'ਇੱਥੇ', 'ਉੱਥੇ']
    };

    // Check for common words in each language
    for (const [langCode, keywords] of Object.entries(languageKeywords)) {
      for (const keyword of keywords) {
        if (cleanText.includes(keyword.toLowerCase())) {
          console.log(`🎯 Language detected via keyword "${keyword}": ${langCode}`);
          return langCode;
        }
      }
    }

    // Default to English if no other language detected
    return 'en-IN';
  };

  // Auto-detect language and switch accordingly (enhanced version)
  const handleLanguageDetection = (text: string) => {
    const detectedLang = detectLanguageFromText(text);
    if (detectedLang && detectedLang !== selectedLanguage) {
      switchLanguage(detectedLang);
    }
  };

  // Text-to-Speech functionality
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Set language based on selected language
      utterance.lang = selectedLanguage;
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return

    // Stop listening immediately when sending message
    setIsListening(false)

    // Stop any ongoing speech recognition
    if (useGoogleAPI && mediaRecorder) {
      stopGoogleSpeechRecognition()
    } else if (recognition && isListening) {
      recognition.stop()
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("https://fastapi-agent-621762839281.us-central1.run.app/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "user1",
          message: messageText,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add assistant message with properly formatted content
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "Sorry, I couldn't process your request.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I'm having trouble connecting right now. Please try again later.",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      // Ensure listening is still stopped after response
      setIsListening(false)
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question)
  }

  const suggestedQuestions = [
    "What's causing yellow leaves on my tomato plants?",
    "Best time to plant rice in Karnataka?",
    "How to improve soil fertility naturally?",
    "What is the price of potato in Haryana?",
    "ನನ್ನ ಟೊಮೇಟೊ ಗಿಡದಲ್ಲಿ ಹಳದಿ ಎಲೆಗಳು ಕಾಣುತ್ತಿವೆ", // Kannada
    "मेरे टमाटर के पौधे में पीले पत्ते हैं", // Hindi
  ]

  const quickActions = [
    {
      icon: Camera,
      label: "Crop Diagnosis",
      color: "bg-emerald-100 text-emerald-700",
      description: "Disease diagnosis & treatment",
    },
    {
      icon: TrendingUp,
      label: "Market Prices",
      color: "bg-blue-100 text-blue-700",
      description: "Real-time price updates",
    },
    {
      icon: CloudRain,
      label: "Weather Info",
      color: "bg-cyan-100 text-cyan-700",
      description: "Seasonal farming advice",
    },
    {
      icon: Sprout,
      label: "Crop Calendar",
      color: "bg-green-100 text-green-700",
      description: "Planting & harvest timing",
    },
  ]

  // Format message content to handle line breaks
  const formatMessageContent = (content: string) => {
    return content.split("\\n").map((line, index) => (
      <span key={index}>
        {line}
        {index < content.split("\\n").length - 1 && <br />}
      </span>
    ))
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex flex-col">
      {/* Navigation - Fixed Height */}
      <div className="h-16 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="h-full max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">K</span>
            </div>
            <span className="text-lg font-medium text-gray-900 hidden sm:block">Project Kisan</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">FarmerGPT</h1>
              <p className="text-emerald-600 text-xs font-medium">AI Farming Assistant</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages Area - Flexible Height */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto h-full">
          {messages.length === 0 ? (
            /* Welcome Screen - Full Height Centered */
            <div className="h-full flex items-center justify-center p-4">
              <div className="text-center max-w-2xl">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Welcome to FarmerGPT!</h2>
                <p className="text-gray-600 mb-4">
                  Ask me anything about farming, crops, or agriculture. I can help in English or your native language.
                </p>
                {mounted && isVoiceSupported && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-8">
                    <div className="flex items-center space-x-2 mb-2">
                      {isListening ? (
                        <MicOff className="w-4 h-4 text-red-600 animate-pulse" />
                      ) : (
                        <Mic className="w-4 h-4 text-emerald-600" />
                      )}
                      <span className="text-sm font-medium text-emerald-800">Smart Voice Input Available</span>
                    </div>
                    <p className="text-xs text-emerald-700 mb-2">
                      🎤 Click the microphone and speak in any supported language
                    </p>
                    <p className="text-xs text-emerald-700 mb-2">
                      🌐 Auto-detects language and switches recognition automatically
                    </p>
                    <p className="text-xs text-emerald-700">
                      🚀 Auto-submits your voice input (can be disabled in language bar)
                    </p>
                    <div className="mt-2 text-xs text-emerald-600">
                      Supports: English, Hindi, Kannada, Tamil, Telugu, Marathi, Gujarati, Punjabi
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-xs text-emerald-700">Browser Speech API</span>
                      </div>
                      {googleAPIKey && (
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-blue-700">Google Speech API Available</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Feature Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="p-3 hover:shadow-md transition-shadow cursor-pointer border-gray-200">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2 ${action.color}`}
                      >
                        <action.icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-medium text-gray-900 text-xs mb-1">{action.label}</h4>
                      <p className="text-gray-600 text-xs">{action.description}</p>
                    </Card>
                  ))}
                </div>

                {/* Suggested Questions */}
                <div className="max-w-md mx-auto">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Try asking:</h4>
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left h-auto p-2 text-sm text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        onClick={() => handleSuggestedQuestion(question)}
                        disabled={isLoading}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user" ? "bg-emerald-600" : "bg-gray-100"
                      }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : "text-left"}`}>
                    <div
                      className={`inline-block p-3 rounded-2xl ${message.role === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                    >
                      <div className="text-sm leading-relaxed">{formatMessageContent(message.content)}</div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-xs text-gray-500">{message.role === "user" ? "You" : "FarmerGPT"}</div>
                      {mounted && message.role === "assistant" && 'speechSynthesis' in window && (
                        <button
                          onClick={() => isSpeaking ? stopSpeaking() : speakText(message.content)}
                          className="text-xs text-gray-500 hover:text-emerald-600 flex items-center space-x-1 ml-2"
                          disabled={isLoading}
                        >
                          {isSpeaking ? (
                            <>
                              <Square className="w-3 h-3 text-red-500" />
                              <span>Stop</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-emerald-600" />
                              <span>Play</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl p-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">FarmerGPT is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Fixed Height */}
      <div className="border-t border-gray-200 bg-white flex-shrink-0">
        {/* Language Selector Bar */}
        {mounted && isVoiceSupported && (
          <div className="max-w-4xl mx-auto px-4 py-2 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">


              </div>

              <div className="flex items-center space-x-3">
                {lastDetectedLanguage && lastDetectedLanguage !== selectedLanguage && (
                  <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    🌐 Detected: {supportedLanguages.find(l => l.code === lastDetectedLanguage)?.native}
                  </div>
                )}
                {isListening && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">
                      {autoSubmit ? 'Listening... (will auto-send)' : 'Listening...'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="max-w-4xl mx-auto h-20 px-4 flex items-center">
          <form onSubmit={handleSubmit} className="flex items-center space-x-3 w-full">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  isListening
                    ? autoSubmit
                      ? "🎤 Listening... (will auto-submit)"
                      : "🎤 Listening..."
                    : "Ask about crops, diseases, weather, or farming techniques..."
                }
                className={`h-11 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl transition-all ${isListening ? 'border-red-300 bg-red-50/30' : ''
                  }`}
                disabled={isLoading}
              />
              {isListening && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className={`w-11 h-11 p-0 rounded-xl border-gray-200 hover:border-emerald-300 bg-transparent transition-all ${isListening
                ? 'bg-red-50 border-red-300 shadow-md'
                : 'hover:shadow-sm'
                }`}
              onClick={toggleListening}
              disabled={isLoading || !mounted || !isVoiceSupported}
              title={
                !mounted || !isVoiceSupported
                  ? 'Voice input not supported in this browser'
                  : isListening
                    ? `Stop listening (${useGoogleAPI ? 'Google API' : 'Browser'} - ${autoSubmit ? 'auto-submit' : 'manual submit'})`
                    : `Start voice input (${useGoogleAPI ? 'Google API' : 'Browser'} - ${autoSubmit ? 'auto-submit' : 'manual submit'})`
              }
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-red-500 animate-pulse scale-110" />
              ) : (mounted && isVoiceSupported) ? (
                useGoogleAPI ? (
                  <Mic className="w-4 h-4 text-blue-600 hover:text-blue-700 transition-all" />
                ) : (
                  <Mic className="w-4 h-4 text-gray-600 hover:text-emerald-600 transition-all" />
                )
              ) : (
                <Mic className="w-4 h-4 text-gray-400" />
              )}
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-11 h-11 p-0 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </div>

      {/* Bottom Info Bar - Fixed Height */}
      <div className="h-8 bg-gray-50 border-t border-gray-100 flex-shrink-0">
        <div className="max-w-4xl mx-auto h-full px-4 flex items-center justify-between text-xs text-gray-500">
          <span>FarmerGPT can make mistakes. Verify important information.</span>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-xs h-5">
            AI Powered
          </Badge>
        </div>
      </div>
    </div>
  )
}
