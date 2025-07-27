package com.example.farmersai.ui.viewmodel

import android.content.Context
import android.graphics.Bitmap
import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.farmersai.data.model.DiagnosisResponse
import com.example.farmersai.data.repository.DiagnosisRepository
import com.example.farmersai.utils.ImageUtils
import dagger.hilt.android.lifecycle.HiltViewModel
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.io.File
import java.io.FileOutputStream
import javax.inject.Inject

@HiltViewModel
class DiagnosisViewModel @Inject constructor(
    private val repository: DiagnosisRepository,
    @ApplicationContext private val context: Context
) : ViewModel() {

    private val _uiState = MutableStateFlow(DiagnosisUiState())
    val uiState: StateFlow<DiagnosisUiState> = _uiState.asStateFlow()

    private val _selectedLanguage = MutableStateFlow("english")
    val selectedLanguage: StateFlow<String> = _selectedLanguage.asStateFlow()

    fun selectLanguage(language: String) {
        _selectedLanguage.value = language
    }

    fun diagnosePlant(bitmap: Bitmap) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(
                isLoading = true, 
                error = null,
                processingStep = "Processing image..."
            )

            try {
                // Enhanced image processing
                Log.d("DiagnosisViewModel", "Processing image for analysis...")
                _uiState.value = _uiState.value.copy(processingStep = "Optimizing image quality...")
                
                val processedBitmap = ImageUtils.processImageForUpload(bitmap)
                if (processedBitmap == null) {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = "Failed to process image. Please try again.",
                        processingStep = null
                    )
                    return@launch
                }
                
                // Log image details
                val sizeKB = ImageUtils.getImageSizeKB(processedBitmap)
                Log.d("DiagnosisViewModel", "Processed image size: ${sizeKB}KB")
                
                _uiState.value = _uiState.value.copy(processingStep = "Preparing for analysis...")
                
                // Save bitmap to temporary file for multipart upload
                val tempFile = bitmapToTempFile(processedBitmap)
                
                _uiState.value = _uiState.value.copy(processingStep = "Analyzing plant disease...")
                
                repository.diagnosePlant(tempFile).collect { result ->
                    result.fold(
                        onSuccess = { response ->
                            Log.d("DiagnosisViewModel", "Analysis completed successfully")
                            _uiState.value = _uiState.value.copy(
                                isLoading = false,
                                diagnosisResult = response,
                                error = null,
                                processingStep = null
                            )
                        },
                        onFailure = { throwable ->
                            Log.e("DiagnosisViewModel", "Analysis failed", throwable)
                            _uiState.value = _uiState.value.copy(
                                isLoading = false,
                                error = getErrorMessage(throwable),
                                processingStep = null
                            )
                        }
                    )
                }
                
                // Clean up temp file
                tempFile.delete()
            } catch (e: Exception) {
                Log.e("DiagnosisViewModel", "Unexpected error during diagnosis", e)
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = "Unexpected error occurred. Please try again.",
                    processingStep = null
                )
            }
        }
    }

    fun clearResult() {
        _uiState.value = DiagnosisUiState()
    }

    private fun bitmapToTempFile(bitmap: Bitmap): File {
        val tempFile = File(context.cacheDir, "diagnosis_image_${System.currentTimeMillis()}.jpg")
        val outputStream = FileOutputStream(tempFile)
        // Use higher quality for better analysis results
        bitmap.compress(Bitmap.CompressFormat.JPEG, 90, outputStream)
        outputStream.close()
        Log.d("DiagnosisViewModel", "Temp file created: ${tempFile.absolutePath}, size: ${tempFile.length()} bytes")
        return tempFile
    }
    
    private fun getErrorMessage(throwable: Throwable): String {
        return when {
            throwable.message?.contains("network", ignoreCase = true) == true -> 
                "Network error. Please check your internet connection."
            throwable.message?.contains("timeout", ignoreCase = true) == true -> 
                "Request timed out. Please try again."
            throwable.message?.contains("500", ignoreCase = true) == true -> 
                "Server error. Please try again in a moment."
            else -> throwable.message ?: "Analysis failed. Please try again."
        }
    }
}

data class DiagnosisUiState(
    val isLoading: Boolean = false,
    val diagnosisResult: DiagnosisResponse? = null,
    val error: String? = null,
    val processingStep: String? = null
)