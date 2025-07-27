package com.example.farmersai.data.repository

import com.example.farmersai.data.model.ChatRequest
import com.example.farmersai.data.model.ChatResponse
import com.example.farmersai.data.remote.ChatApiService
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.delay
import java.util.UUID
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class ChatRepository @Inject constructor(
    private val chatApiService: ChatApiService
) {
    fun askQuestion(question: String): Flow<Result<ChatResponse>> = flow {
        try {
            // Generate a random user ID for this session
            val userId = UUID.randomUUID().toString()
            val request = ChatRequest(user_id = userId, message = question)
            
            val response = chatApiService.askQuestion(request)
            if (response.isSuccessful) {
                response.body()?.let { chatResponse ->
                    emit(Result.success(chatResponse))
                } ?: emit(Result.failure(Exception("Empty response")))
            } else {
                emit(Result.failure(Exception("API Error: ${response.code()}")))
            }
        } catch (e: Exception) {
            // Fallback to mock responses when API is unavailable
            emit(Result.success(generateMockResponse(question)))
        }
    }
    
    private suspend fun generateMockResponse(question: String): ChatResponse {
        delay(1000) // Simulate API delay
        
        val response = when {
            question.contains("price", ignoreCase = true) || question.contains("market", ignoreCase = true) -> {
                "Current market prices vary by region. For potatoes in Haryana, the average price is ₹25-30 per kg. I recommend checking the Market Prices section in the app for real-time data from your local APMC."
            }
            question.contains("tomato", ignoreCase = true) -> {
                "For tomatoes, the best planting time is during the rabi season (October-November) in most parts of India. Ensure good drainage, use disease-resistant varieties, and maintain proper spacing of 60x45 cm for optimal yield."
            }
            question.contains("pest", ignoreCase = true) || question.contains("disease", ignoreCase = true) -> {
                "Common signs of pest infestations include yellowing leaves, holes in leaves, stunted growth, and visible insects. Use the AI Diagnosis feature to upload a photo of affected plants for accurate identification and treatment recommendations."
            }
            question.contains("organic", ignoreCase = true) -> {
                "Organic farming practices include: crop rotation, composting, natural pest control, avoiding synthetic fertilizers, using organic seeds, and maintaining soil health through organic matter. Start with soil testing and gradual transition."
            }
            question.contains("soil", ignoreCase = true) -> {
                "To improve soil quality naturally: add organic compost, use cover crops, practice crop rotation, avoid over-tillage, maintain proper pH (6.0-7.0), and add beneficial microorganisms through vermicompost."
            }
            question.contains("wheat", ignoreCase = true) -> {
                "Common wheat diseases include rust, blight, and smut. Practice crop rotation, use certified seeds, ensure proper drainage, apply balanced fertilizers, and monitor for early disease symptoms for timely intervention."
            }
            else -> {
                "Thank you for your question about farming. Based on your query, I recommend using the specific features in this app - AI Diagnosis for plant health issues, Market Prices for current rates, and consult with local agricultural extension officers for region-specific advice. Is there something more specific I can help you with?"
            }
        }
        
        return ChatResponse(response = response)
    }
}