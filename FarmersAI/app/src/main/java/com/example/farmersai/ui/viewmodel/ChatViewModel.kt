package com.example.farmersai.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.farmersai.data.model.ChatMessage
import com.example.farmersai.data.repository.ChatRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.util.UUID
import javax.inject.Inject

@HiltViewModel
class ChatViewModel @Inject constructor(
    private val repository: ChatRepository
) : ViewModel() {

    private val _messages = MutableStateFlow<List<ChatMessage>>(emptyList())
    val messages: StateFlow<List<ChatMessage>> = _messages.asStateFlow()

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading.asStateFlow()

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error.asStateFlow()

    private val suggestedQuestions = listOf(
        "What are the best practices for organic farming?",
        "How do I identify pest infestations in my crops?",
        "When is the best time to plant tomatoes?",
        "How can I improve soil quality naturally?",
        "What are common diseases in wheat crops?"
    )

    init {
        // Add welcome message
        addMessage(
            ChatMessage(
                id = UUID.randomUUID().toString(),
                message = "Hello! I'm FarmerGPT, your AI farming assistant. How can I help you today?",
                isUser = false
            )
        )
    }

    fun sendMessage(message: String) {
        if (message.isBlank()) return

        // Add user message
        addMessage(
            ChatMessage(
                id = UUID.randomUUID().toString(),
                message = message,
                isUser = true
            )
        )

        // Get AI response
        getAIResponse(message)
    }

    fun askSuggestedQuestion(question: String) {
        sendMessage(question)
    }

    fun getSuggestedQuestions(): List<String> = suggestedQuestions

    private fun getAIResponse(question: String) {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null

            repository.askQuestion(question).collect { result ->
                _isLoading.value = false
                result.fold(
                    onSuccess = { response ->
                        addMessage(
                            ChatMessage(
                                id = UUID.randomUUID().toString(),
                                message = response.response,
                                isUser = false
                            )
                        )
                    },
                    onFailure = { throwable ->
                        _error.value = "Network Error: ${throwable.message}"
                        addMessage(
                            ChatMessage(
                                id = UUID.randomUUID().toString(),
                                message = "I'm currently offline but here's some general farming advice: ${getOfflineTip()}",
                                isUser = false
                            )
                        )
                    }
                )
            }
        }
    }

    private fun addMessage(message: ChatMessage) {
        _messages.value = _messages.value + message
    }

    fun clearError() {
        _error.value = null
    }
    
    private fun getOfflineTip(): String {
        val tips = listOf(
            "Check soil moisture regularly and water when the top inch feels dry.",
            "Rotate crops each season to prevent soil depletion and pest buildup.",
            "Compost kitchen scraps to create nutrient-rich organic fertilizer.",
            "Plant companion crops like marigolds to naturally repel pests.",
            "Harvest in early morning when plants are crisp and full of moisture.",
            "Use mulch around plants to retain moisture and suppress weeds.",
            "Test soil pH annually and adjust with lime or sulfur as needed."
        )
        return tips.random()
    }
}