package com.example.farmersai.data.model

data class User(
    val id: String = "",
    val name: String,
    val email: String,
    val state: String,
    val farmSize: String,
    val createdAt: Long = System.currentTimeMillis()
)

data class LoginRequest(
    val email: String,
    val password: String,
    val rememberMe: Boolean = false
)

data class SignupRequest(
    val name: String,
    val email: String,
    val password: String,
    val state: String,
    val farmSize: String,
    val acceptTerms: Boolean
)