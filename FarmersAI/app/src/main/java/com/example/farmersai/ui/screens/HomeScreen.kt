package com.example.farmersai.ui.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.farmersai.R
import com.example.farmersai.navigation.Screen
import com.example.farmersai.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(navController: NavController) {
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(GreenBackground, BlueBackground)
                )
            )
    ) {
        item {
            // Header Section
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(300.dp)
                    .background(
                        brush = Brush.verticalGradient(
                            colors = listOf(EmeraldPrimary, EmeraldDark)
                        )
                    )
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = "🌱 FarmersAI",
                        style = MaterialTheme.typography.headlineLarge,
                        color = Color.White,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Text(
                        text = "AI-Powered Crop Disease Detection & Farm Assistant",
                        style = MaterialTheme.typography.titleMedium,
                        color = Color.White.copy(alpha = 0.9f),
                        textAlign = TextAlign.Center
                    )
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    Text(
                        text = "95% Accuracy • <2s Response Time • Multilingual Support",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color.White.copy(alpha = 0.8f),
                        textAlign = TextAlign.Center
                    )
                }
            }
        }
        
        item {
            // Quick Actions Section
            Spacer(modifier = Modifier.height(32.dp))
            
            Text(
                text = "Quick Actions",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(horizontal = 24.dp),
                color = TextPrimary
            )
            
            Spacer(modifier = Modifier.height(16.dp))
            
            LazyRow(
                contentPadding = PaddingValues(horizontal = 24.dp),
                horizontalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                item {
                    FeatureCard(
                        title = "Leaf Diagnosis",
                        description = "AI-powered disease detection",
                        icon = Icons.Default.Star,
                        color = EmeraldPrimary
                    ) {
                        navController.navigate(Screen.Diagnosis.route)
                    }
                }
                
                item {
                    FeatureCard(
                        title = "FarmerGPT",
                        description = "Chat with AI assistant",
                        icon = Icons.Default.Add,
                        color = EmeraldLight
                    ) {
                        navController.navigate(Screen.Chat.route)
                    }
                }
                
                item {
                    FeatureCard(
                        title = "Market Prices",
                        description = "Check live crop prices",
                        icon = Icons.Default.AccountBox,
                        color = BlueBackground
                    ) {
                        navController.navigate(Screen.MarketPrice.route)
                    }
                }
                
                item {
                    FeatureCard(
                        title = "Features",
                        description = "Explore all capabilities",
                        icon = Icons.Default.Star,
                        color = EmeraldDark
                    ) {
                        navController.navigate(Screen.Features.route)
                    }
                }
                
                item {
                    FeatureCard(
                        title = "About",
                        description = "Learn more about app",
                        icon = Icons.Default.Info,
                        color = EmeraldLighter
                    ) {
                        navController.navigate(Screen.About.route)
                    }
                }
                
                item {
                    FeatureCard(
                        title = "Download",
                        description = "Get the mobile app",
                        icon = Icons.Default.Star,
                        color = EmeraldDark
                    ) {
                        navController.navigate(Screen.Download.route)
                    }
                }
            }
        }
        
        item {
            // Features Overview Section
            Spacer(modifier = Modifier.height(48.dp))
            
            Text(
                text = "Why Choose FarmersAI?",
                style = MaterialTheme.typography.headlineSmall,
                fontWeight = FontWeight.Bold,
                modifier = Modifier.padding(horizontal = 24.dp),
                color = TextPrimary
            )
            
            Spacer(modifier = Modifier.height(24.dp))
            
            Column(
                modifier = Modifier.padding(horizontal = 24.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                BenefitItem(
                    icon = Icons.Default.Info,
                    title = "Advanced AI Technology",
                    description = "Powered by Google Gemini AI for accurate disease detection"
                )
                
                BenefitItem(
                    icon = Icons.Default.Add,
                    title = "Multilingual Support",
                    description = "Available in English, Kannada, Hindi, Telugu, Tamil, Malayalam"
                )
                
                BenefitItem(
                    icon = Icons.Default.Add,
                    title = "Lightning Fast",
                    description = "Get results in under 2 seconds with 95% accuracy"
                )
                
                BenefitItem(
                    icon = Icons.Default.Add,
                    title = "24/7 AI Assistant",
                    description = "Get farming advice anytime with FarmerGPT"
                )
            }
        }
        
        item {
            // CTA Section
            Spacer(modifier = Modifier.height(48.dp))
            
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp),
                colors = CardDefaults.cardColors(containerColor = EmeraldPrimary),
                shape = RoundedCornerShape(16.dp)
            ) {
                Column(
                    modifier = Modifier.padding(24.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Ready to Get Started?",
                        style = MaterialTheme.typography.titleLarge,
                        color = Color.White,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Text(
                        text = "Join thousands of farmers using AI to improve their crops",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color.White.copy(alpha = 0.9f),
                        textAlign = TextAlign.Center
                    )
                    
                    Spacer(modifier = Modifier.height(24.dp))
                    
                    Row(
                        horizontalArrangement = Arrangement.spacedBy(16.dp)
                    ) {
                        Button(
                            onClick = { navController.navigate(Screen.Diagnosis.route) },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = Color.White,
                                contentColor = EmeraldPrimary
                            ),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Text("Start Diagnosis")
                        }
                        
                        OutlinedButton(
                            onClick = { navController.navigate(Screen.Chat.route) },
                            colors = ButtonDefaults.outlinedButtonColors(
                                contentColor = Color.White
                            ),
                            border = ButtonDefaults.outlinedButtonBorder.copy(
                                brush = Brush.linearGradient(colors = listOf(Color.White, Color.White))
                            ),
                            shape = RoundedCornerShape(12.dp)
                        ) {
                            Text("Chat with AI")
                        }
                    }
                }
            }
            
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun FeatureCard(
    title: String,
    description: String,
    icon: ImageVector,
    color: Color,
    onClick: () -> Unit
) {
    Card(
        onClick = onClick,
        modifier = Modifier
            .width(200.dp)
            .height(120.dp),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        shape = RoundedCornerShape(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Icon(
                imageVector = icon,
                contentDescription = null,
                tint = color,
                modifier = Modifier.size(32.dp)
            )
            
            Spacer(modifier = Modifier.height(8.dp))
            
            Text(
                text = title,
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary,
                textAlign = TextAlign.Center
            )
            
            Text(
                text = description,
                style = MaterialTheme.typography.bodySmall,
                color = TextSecondary,
                textAlign = TextAlign.Center
            )
        }
    }
}

@Composable
private fun BenefitItem(
    icon: ImageVector,
    title: String,
    description: String
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = Alignment.Top
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            tint = EmeraldPrimary,
            modifier = Modifier.size(24.dp)
        )
        
        Spacer(modifier = Modifier.width(16.dp))
        
        Column(modifier = Modifier.fillMaxWidth()) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary
            )
            
            Text(
                text = description,
                style = MaterialTheme.typography.bodyMedium,
                color = TextSecondary
            )
        }
    }
}