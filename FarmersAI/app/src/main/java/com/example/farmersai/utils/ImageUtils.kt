package com.example.farmersai.utils

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Matrix
import android.media.ExifInterface
import android.net.Uri
import java.io.ByteArrayOutputStream
import java.io.InputStream

object ImageUtils {
    fun uriToBitmap(context: Context, uri: Uri): Bitmap? {
        return try {
            val inputStream: InputStream? = context.contentResolver.openInputStream(uri)
            val bitmap = BitmapFactory.decodeStream(inputStream)
            inputStream?.close()
            
            // Auto-rotate based on EXIF data and resize for better performance
            val processedBitmap = processImageForUpload(bitmap, context, uri)
            processedBitmap
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
    
    fun processImageForUpload(bitmap: Bitmap?, context: Context? = null, uri: Uri? = null): Bitmap? {
        if (bitmap == null) return null
        
        try {
            // First resize the image to reasonable dimensions
            val resizedBitmap = resizeBitmap(bitmap, maxWidth = 1024, maxHeight = 1024)
            
            // Rotate based on EXIF data if URI is available
            val rotatedBitmap = if (context != null && uri != null) {
                rotateImageIfRequired(context, resizedBitmap, uri)
            } else {
                resizedBitmap
            }
            
            // Enhance quality for plant images
            return enhanceImageQuality(rotatedBitmap)
        } catch (e: Exception) {
            e.printStackTrace()
            return bitmap
        }
    }
    
    fun resizeBitmap(bitmap: Bitmap, maxWidth: Int = 1024, maxHeight: Int = 1024): Bitmap {
        val width = bitmap.width
        val height = bitmap.height
        
        if (width <= maxWidth && height <= maxHeight) {
            return bitmap
        }
        
        val ratioBitmap = width.toFloat() / height.toFloat()
        val ratioMax = maxWidth.toFloat() / maxHeight.toFloat()
        
        var finalWidth = maxWidth
        var finalHeight = maxHeight
        
        if (ratioMax > ratioBitmap) {
            finalWidth = (maxHeight.toFloat() * ratioBitmap).toInt()
        } else {
            finalHeight = (maxWidth.toFloat() / ratioBitmap).toInt()
        }
        
        return Bitmap.createScaledBitmap(bitmap, finalWidth, finalHeight, true)
    }
    
    private fun rotateImageIfRequired(context: Context, bitmap: Bitmap, uri: Uri): Bitmap {
        try {
            val inputStream = context.contentResolver.openInputStream(uri)
            inputStream?.use { stream ->
                val exif = ExifInterface(stream)
                val orientation = exif.getAttributeInt(
                    ExifInterface.TAG_ORIENTATION,
                    ExifInterface.ORIENTATION_NORMAL
                )
                
                return when (orientation) {
                    ExifInterface.ORIENTATION_ROTATE_90 -> rotateImage(bitmap, 90f)
                    ExifInterface.ORIENTATION_ROTATE_180 -> rotateImage(bitmap, 180f)
                    ExifInterface.ORIENTATION_ROTATE_270 -> rotateImage(bitmap, 270f)
                    else -> bitmap
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
        return bitmap
    }
    
    private fun rotateImage(bitmap: Bitmap, angle: Float): Bitmap {
        val matrix = Matrix()
        matrix.postRotate(angle)
        return Bitmap.createBitmap(bitmap, 0, 0, bitmap.width, bitmap.height, matrix, true)
    }
    
    private fun enhanceImageQuality(bitmap: Bitmap): Bitmap {
        // Create a copy with better quality settings for plant analysis
        val config = Bitmap.Config.ARGB_8888
        val enhancedBitmap = bitmap.copy(config, false)
        
        // Compress and decompress to optimize for upload while maintaining quality
        val stream = ByteArrayOutputStream()
        enhancedBitmap.compress(Bitmap.CompressFormat.JPEG, 90, stream)
        val byteArray = stream.toByteArray()
        
        return BitmapFactory.decodeByteArray(byteArray, 0, byteArray.size) ?: enhancedBitmap
    }
    
    // Helper function to get file size estimate
    fun getImageSizeKB(bitmap: Bitmap): Int {
        val stream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.JPEG, 90, stream)
        return stream.size() / 1024
    }
}