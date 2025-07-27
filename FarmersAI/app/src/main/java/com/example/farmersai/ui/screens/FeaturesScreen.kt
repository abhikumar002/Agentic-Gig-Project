package com.example.farmersai.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.farmersai.ui.theme.*

@Composable
fun FeaturesScreen(navController: NavController) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(GreenBackground)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            // Header
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = { navController.popBackStack() }) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                }
                
                Text(
                    text = "Features",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary,
                    modifier = Modifier.weight(1f)
                )
            }
        }
        
        item {
            // Statistics Section
            Card(
                modifier = Modifier.fillMaxWidth(),
                colors = CardDefaults.cardColors(containerColor = EmeraldPrimary),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "FarmersAI Impact",
                        style = MaterialTheme.typography.titleLarge,
                        color = Color.White,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        StatisticItem("10K+", "Farmers Helped")
                        StatisticItem("95%", "Accuracy Rate")
                        StatisticItem("24/7", "Support Available")
                    }
                }
            }
        }
        
        item {
            Text(
                text = "Core Features",
                style = MaterialTheme.typography.titleLarge,
                fontWeight = FontWeight.Bold,
                color = TextPrimary
            )
        }
        
        item {
            FeatureDetailCard(
                icon = Icons.Default.Info,
                title = "AI Disease Detection",
                description = "Advanced machine learning powered by Google Vertex AI Gemini 2.5 Flash for accurate crop disease identification",
                features = listOf(
                    "95% accuracy in disease detection",
                    "Support for 50+ common crop diseases",
                    "Real-time image analysis in <2 seconds",
                    "Confidence scoring for each diagnosis",
                    "Treatment recommendations with local remedies",
                    "Prevention tips and best practices"
                )
            )
        }
        
        item {
            FeatureDetailCard(
                icon = Icons.Default.Add,
                title = "Multilingual Support",
                description = "Complete support for multiple Indian languages to ensure accessibility for all farmers",
                features = listOf(
                    "English, Kannada, Hindi, Telugu, Tamil, Malayalam",
                    "Voice input in local languages",
                    "Culturally adapted content",
                    "Regional farming practices integration"
                )
            )
        }
        
        item {
            FeatureDetailCard(
                icon = Icons.Default.Add,
                title = "FarmerGPT Assistant",
                description = "24/7 AI-powered farming assistant providing personalized advice and support",
                features = listOf(
                    "Real-time chat support",
                    "Crop-specific advice",
                    "Weather and seasonal guidance",
                    "Market price information"
                )
            )
        }
        
        item {
            FeatureDetailCard(
                icon = Icons.Default.AccountBox,
                title = "Offline Capabilities",
                description = "Core functionality available even without internet connection",
                features = listOf(
                    "Offline disease detection",
                    "Local data storage",
                    "Sync when connected",
                    "Emergency farming tips"
                )
            )
        }
        
        item {
            FeatureDetailCard(
                icon = Icons.Default.Lock,
                title = "Data Privacy & Security",
                description = "Your farming data is protected with enterprise-grade security",
                features = listOf(
                    "End-to-end encryption",
                    "Local data processing",
                    "GDPR compliant",
                    "No data sharing without consent"
                )
            )
        }
        
        item {
            FeatureDetailCard(
                icon = Icons.Default.Add,
                title = "Market Integration",
                description = "Real-time market prices and government scheme information",
                features = listOf(
                    "Live commodity prices",
                    "Government scheme alerts",
                    "Subsidy information",
                    "Market trend analysis"
                )
            )
        }
        
        item {
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
private fun StatisticItem(value: String, label: String) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = value,
            style = MaterialTheme.typography.headlineMedium,
            color = Color.White,
            fontWeight = FontWeight.Bold
        )
        
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = Color.White.copy(alpha = 0.9f),
            textAlign = TextAlign.Center
        )
    }
}

@Composable
private fun FeatureDetailCard(
    icon: ImageVector,
    title: String,
    description: String,
    features: List<String>
) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        shape = RoundedCornerShape(12.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier.padding(20.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = EmeraldPrimary,
                    modifier = Modifier.size(32.dp)
                )
                
                Spacer(modifier = Modifier.width(16.dp))
                
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )
            }
            
            Spacer(modifier = Modifier.height(12.dp))
            
            Text(
                text = description,
                style = MaterialTheme.typography.bodyMedium,
                color = TextSecondary
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            features.forEach { feature ->
                Row(
                    modifier = Modifier.padding(vertical = 4.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        Icons.Default.CheckCircle,
                        contentDescription = null,
                        tint = EmeraldPrimary,
                        modifier = Modifier.size(16.dp)
                    )
                    
                    Spacer(modifier = Modifier.width(12.dp))
                    
                    Text(
                        text = feature,
                        style = MaterialTheme.typography.bodySmall,
                        color = TextPrimary
                    )
                }
            }
        }
    }
}