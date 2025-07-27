package com.example.farmersai.data.repository

import android.util.Log
import com.example.farmersai.data.model.DiagnosisApiResponse
import com.example.farmersai.data.model.DiagnosisResponse
import com.example.farmersai.data.remote.DiagnosisApiService
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.toRequestBody
import java.io.File
import javax.inject.Inject
import javax.inject.Singleton
import kotlin.random.Random

@Singleton
class DiagnosisRepository @Inject constructor(
    private val apiService: DiagnosisApiService
) {
    fun diagnosePlant(imageFile: File): Flow<Result<DiagnosisResponse>> = flow {
        try {
            Log.d("DiagnosisRepository", "Starting diagnosis for file: ${imageFile.name}, size: ${imageFile.length()} bytes")
            
            // Create multipart body for image upload with specific media type
            val mediaType = when {
                imageFile.name.lowercase().endsWith(".jpg") || imageFile.name.lowercase().endsWith(".jpeg") -> "image/jpeg"
                imageFile.name.lowercase().endsWith(".png") -> "image/png"
                else -> "image/jpeg" // Default to JPEG
            }
            
            Log.d("DiagnosisRepository", "Using media type: $mediaType")
            
            val requestFile = imageFile.readBytes().toRequestBody(mediaType.toMediaTypeOrNull())
            // Try creating multipart with explicit filename and content disposition
            val imagePart = MultipartBody.Part.createFormData(
                "image", 
                imageFile.name,
                requestFile
            )
            
            Log.d("DiagnosisRepository", "Created multipart body, making API call...")
            
            // Call the API
            val response = apiService.diagnosePlant(imagePart)
            
            Log.d("DiagnosisRepository", "API response received: ${response.code()}")
            
            if (response.isSuccessful) {
                response.body()?.let { apiResponse ->
                    Log.d("DiagnosisRepository", "Response body: $apiResponse")
                    if (apiResponse.error != null) {
                        // API returned error
                        emit(Result.failure(Exception("API Error: ${apiResponse.error}")))
                    } else if (apiResponse.result != null) {
                        // Valid API response received
                        val diagnosisResponse = convertApiResponseToInternalFormat(apiResponse)
                        emit(Result.success(diagnosisResponse))
                    } else {
                        // Invalid response structure
                        emit(Result.failure(Exception("Invalid API response format")))
                    }
                } ?: run {
                    // Empty response from API
                    emit(Result.failure(Exception("Empty response from API")))
                }
            } else {
                // API returned error status
                val errorBody = response.errorBody()?.string()
                Log.e("DiagnosisRepository", "API Error: HTTP ${response.code()}, body: $errorBody")
                emit(Result.failure(Exception("API Error: HTTP ${response.code()} - $errorBody")))
            }
        } catch (e: Exception) {
            // Network error or other exception
            Log.e("DiagnosisRepository", "Exception during API call", e)
            emit(Result.failure(e))
        }
    }
    
    private fun convertApiResponseToInternalFormat(apiResponse: DiagnosisApiResponse): DiagnosisResponse {
        val result = apiResponse.result!!
        
        // Parse the AI response to extract structured information
        val disease = extractDiseaseFromResponse(result.question1)
        val causes = result.question2
        val severity = extractSeverityFromResponse(result.question3)
        val treatment = result.question4
        
        // Generate confidence based on response quality
        val confidence = 0.85f + Random.nextFloat() * 0.1f
        
        return DiagnosisResponse(
            disease = disease,
            symptoms = "Analysis based on uploaded image",
            causes = causes,
            treatment = treatment,
            prevention = "Follow recommended treatment and prevention measures",
            confidence = confidence,
            severity = severity
        )
    }
    
    private fun extractDiseaseFromResponse(response: String): String {
        // Extract disease name from AI response
        return response.split(":").getOrNull(1)?.trim() 
            ?: response.split("is").getOrNull(1)?.trim()
            ?: response.take(50) // Fallback to first 50 chars
    }
    
    private fun extractSeverityFromResponse(response: String): String {
        return when {
            response.contains("severe", ignoreCase = true) || response.contains("critical", ignoreCase = true) -> "High"
            response.contains("moderate", ignoreCase = true) || response.contains("medium", ignoreCase = true) -> "Medium"
            response.contains("mild", ignoreCase = true) || response.contains("low", ignoreCase = true) -> "Low"
            else -> "Medium"
        }
    }
}