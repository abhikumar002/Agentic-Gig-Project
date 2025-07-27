package com.example.farmersai.data.model

data class DiagnosisRequest(
    val image: String, // base64 encoded image
    val language: String = "english"
)

// Web app API response format
data class DiagnosisApiResponse(
    val result: DiagnosisResult? = null,
    val error: String? = null
)

data class DiagnosisResult(
    val question1: String, // Disease/pest identification
    val question2: String, // Causes
    val question3: String, // Severity
    val question4: String  // Treatment/prevention
)

// Internal app model for displaying results
data class DiagnosisResponse(
    val disease: String,
    val diseaseKannada: String? = null,
    val symptoms: String,
    val symptomsKannada: String? = null,
    val causes: String,
    val causesKannada: String? = null,
    val treatment: String,
    val treatmentKannada: String? = null,
    val prevention: String,
    val preventionKannada: String? = null,
    val confidence: Float,
    val severity: String
)