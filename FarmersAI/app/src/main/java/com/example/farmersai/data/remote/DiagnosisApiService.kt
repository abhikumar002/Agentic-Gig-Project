package com.example.farmersai.data.remote

import com.example.farmersai.data.model.ChatRequest
import com.example.farmersai.data.model.ChatResponse
import com.example.farmersai.data.model.DiagnosisApiResponse
import okhttp3.MultipartBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface DiagnosisApiService {
    @Multipart
    @POST("api/diagnose")
    suspend fun diagnosePlant(@Part image: MultipartBody.Part): Response<DiagnosisApiResponse>
}

interface ChatApiService {
    @POST("ask")
    suspend fun askQuestion(@Body request: ChatRequest): Response<ChatResponse>
}