package com.example.farmersai.di

import com.example.farmersai.data.remote.ChatApiService
import com.example.farmersai.data.remote.DiagnosisApiService
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import com.google.gson.GsonBuilder
import java.util.concurrent.TimeUnit
import javax.inject.Named
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Provides
    @Singleton
    fun provideLoggingInterceptor(): HttpLoggingInterceptor {
        return HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
    }

    @Provides
    @Singleton
    fun provideOkHttpClient(loggingInterceptor: HttpLoggingInterceptor): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(loggingInterceptor)
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
    }

    @Provides
    @Singleton
    @Named("diagnosis")
    fun provideDiagnosisRetrofit(okHttpClient: OkHttpClient): Retrofit {
        // Create lenient Gson to handle malformed JSON responses
        val gson = GsonBuilder()
            .setLenient()
            .create()
            
        return Retrofit.Builder()
            .baseUrl("https://nextjs-app-424265826546.asia-south1.run.app/") // Android emulator localhost (change to your actual deployed URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
    }

    @Provides
    @Singleton
    @Named("chat")
    fun provideChatRetrofit(okHttpClient: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://fastapi-agent-621762839281.us-central1.run.app/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Provides
    @Singleton
    fun provideDiagnosisApiService(@Named("diagnosis") retrofit: Retrofit): DiagnosisApiService {
        return retrofit.create(DiagnosisApiService::class.java)
    }

    @Provides
    @Singleton
    fun provideChatApiService(@Named("chat") retrofit: Retrofit): ChatApiService {
        return retrofit.create(ChatApiService::class.java)
    }
}