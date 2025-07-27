package com.example.farmersai.utils

object Constants {
    // API Configuration
    const val CHAT_BASE_URL = "https://fastapi-agent-621762839281.us-central1.run.app/"
    const val DIAGNOSIS_BASE_URL = "https://your-diagnosis-api-url.com/"
    
    // Google AI
    const val GEMINI_API_KEY = "your-gemini-api-key-here" // Replace with actual API key
    
    // Request timeouts
    const val NETWORK_TIMEOUT = 30L
    
    // Image processing
    const val MAX_IMAGE_WIDTH = 800
    const val MAX_IMAGE_HEIGHT = 600
    const val IMAGE_QUALITY = 80
    
    // Language codes
    const val LANGUAGE_ENGLISH = "english"
    const val LANGUAGE_KANNADA = "kannada"
    const val LANGUAGE_HINDI = "hindi"
    const val LANGUAGE_TELUGU = "telugu"
    const val LANGUAGE_TAMIL = "tamil"
    const val LANGUAGE_MALAYALAM = "malayalam"
}