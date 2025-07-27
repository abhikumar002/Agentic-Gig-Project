package com.example.farmersai.data.model

data class ChatMessage(
    val id: String = "",
    val message: String,
    val isUser: Boolean,
    val timestamp: Long = System.currentTimeMillis()
)

data class ChatRequest(
    val user_id: String,
    val message: String
)

data class ChatResponse(
    val response: String
)