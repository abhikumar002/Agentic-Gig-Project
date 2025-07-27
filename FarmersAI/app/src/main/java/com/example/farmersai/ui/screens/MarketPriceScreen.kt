package com.example.farmersai.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import com.example.farmersai.ui.theme.*

data class CropPrice(
    val name: String,
    val currentPrice: String,
    val previousPrice: String,
    val changePercent: String,
    val isIncreasing: Boolean,
    val unit: String = "per quintal",
    val market: String = "Karnataka APMC"
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MarketPriceScreen(navController: NavController) {
    var selectedState by remember { mutableStateOf("Karnataka") }
    var selectedMarket by remember { mutableStateOf("Bangalore APMC") }
    var showStateDialog by remember { mutableStateOf(false) }
    var showMarketDialog by remember { mutableStateOf(false) }
    var isLoading by remember { mutableStateOf(false) }
    
    // Sample crop prices data
    val cropPrices = remember {
        listOf(
            CropPrice("Rice", "₹2,850", "₹2,750", "+3.6%", true),
            CropPrice("Wheat", "₹2,200", "₹2,250", "-2.2%", false),
            CropPrice("Maize", "₹1,980", "₹1,900", "+4.2%", true),
            CropPrice("Cotton", "₹5,800", "₹5,650", "+2.7%", true),
            CropPrice("Sugarcane", "₹350", "₹340", "+2.9%", true, "per ton"),
            CropPrice("Groundnut", "₹5,200", "₹5,100", "+2.0%", true),
            CropPrice("Soybean", "₹4,850", "₹4,900", "-1.0%", false),
            CropPrice("Onion", "₹2,200", "₹2,500", "-12.0%", false),
            CropPrice("Tomato", "₹1,800", "₹1,600", "+12.5%", true),
            CropPrice("Potato", "₹1,200", "₹1,150", "+4.3%", true)
        )
    }
    
    val states = listOf(
        "Karnataka", "Maharashtra", "Tamil Nadu", "Andhra Pradesh",
        "Punjab", "Haryana", "Uttar Pradesh", "Rajasthan", "Gujarat"
    )
    
    val markets = mapOf(
        "Karnataka" to listOf("Bangalore APMC", "Mysore APMC", "Hubli APMC", "Mangalore APMC"),
        "Maharashtra" to listOf("Mumbai APMC", "Pune APMC", "Nashik APMC", "Nagpur APMC"),
        "Tamil Nadu" to listOf("Chennai APMC", "Coimbatore APMC", "Madurai APMC"),
        "Andhra Pradesh" to listOf("Hyderabad APMC", "Vijayawada APMC", "Visakhapatnam APMC")
    )
    
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(
                brush = Brush.verticalGradient(
                    colors = listOf(GreenBackground, BlueBackground)
                )
            ),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            // Header
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                IconButton(onClick = { navController.popBackStack() }) {
                    Icon(Icons.Default.ArrowBack, contentDescription = "Back", tint = TextPrimary)
                }
                
                Text(
                    text = "Market Prices",
                    style = MaterialTheme.typography.headlineSmall,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary,
                    modifier = Modifier.weight(1f)
                )
                
                IconButton(onClick = { isLoading = true }) {
                    Icon(Icons.Default.Refresh, contentDescription = "Refresh", tint = TextPrimary)
                }
            }
        }
        
        item {
            // Market Selection
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(
                    modifier = Modifier.padding(20.dp)
                ) {
                    Text(
                        text = "Select Market",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = TextPrimary
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    // State Selector
                    OutlinedTextField(
                        value = selectedState,
                        onValueChange = { },
                        label = { Text("State") },
                        leadingIcon = {
                            Icon(Icons.Default.LocationOn, contentDescription = null)
                        },
                        trailingIcon = {
                            Icon(Icons.Default.ArrowDropDown, contentDescription = null)
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(bottom = 12.dp)
                            .clickable { showStateDialog = true },
                        readOnly = true,
                        enabled = false,
                        shape = RoundedCornerShape(8.dp),
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            disabledTextColor = MaterialTheme.colorScheme.onSurface,
                            disabledBorderColor = MaterialTheme.colorScheme.outline,
                            disabledLeadingIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                            disabledTrailingIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                            disabledLabelColor = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                    )
                    
                    // Market Selector
                    OutlinedTextField(
                        value = selectedMarket,
                        onValueChange = { },
                        label = { Text("Market") },
                        leadingIcon = {
                            Icon(Icons.Default.Star, contentDescription = null)
                        },
                        trailingIcon = {
                            Icon(Icons.Default.ArrowDropDown, contentDescription = null)
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { showMarketDialog = true },
                        readOnly = true,
                        enabled = false,
                        shape = RoundedCornerShape(8.dp),
                        colors = TextFieldDefaults.outlinedTextFieldColors(
                            disabledTextColor = MaterialTheme.colorScheme.onSurface,
                            disabledBorderColor = MaterialTheme.colorScheme.outline,
                            disabledLeadingIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                            disabledTrailingIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                            disabledLabelColor = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                    )
                }
            }
        }
        
        item {
            // Price Summary
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                colors = CardDefaults.cardColors(containerColor = EmeraldPrimary),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(
                    modifier = Modifier.padding(20.dp)
                ) {
                    Text(
                        text = "Today's Market Summary",
                        style = MaterialTheme.typography.titleMedium,
                        color = Color.White,
                        fontWeight = FontWeight.Bold
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceEvenly
                    ) {
                        SummaryItem("15", "Crops Listed", Color.White)
                        SummaryItem("8", "Price Increased", Color.White)
                        SummaryItem("7", "Price Decreased", Color.White)
                    }
                    
                    Spacer(modifier = Modifier.height(12.dp))
                    
                    Text(
                        text = "Last updated: Today, 2:30 PM",
                        style = MaterialTheme.typography.bodySmall,
                        color = Color.White.copy(alpha = 0.8f),
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth()
                    )
                }
            }
        }
        
        item {
            // Search and Filter
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp)
            ) {
                Row(
                    modifier = Modifier.padding(16.dp),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    OutlinedTextField(
                        value = "",
                        onValueChange = { },
                        placeholder = { Text("Search crops...") },
                        leadingIcon = {
                            Icon(Icons.Default.Search, contentDescription = null)
                        },
                        modifier = Modifier.weight(1f),
                        shape = RoundedCornerShape(8.dp)
                    )
                    
                    Spacer(modifier = Modifier.width(12.dp))
                    
                    OutlinedButton(
                        onClick = { /* Filter options */ },
                        shape = RoundedCornerShape(8.dp)
                    ) {
                        Icon(Icons.Default.Star, contentDescription = null, modifier = Modifier.size(18.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Filter")
                    }
                }
            }
        }
        
        item {
            // Price List Header
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = "Crop Prices",
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )
                
                Text(
                    text = "${cropPrices.size} items",
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary
                )
            }
        }
        
        // Crop Prices List
        items(cropPrices) { crop ->
            CropPriceCard(
                crop = crop,
                modifier = Modifier.padding(horizontal = 16.dp)
            )
        }
        
        item {
            // Market Trends
            Card(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                colors = CardDefaults.cardColors(containerColor = Color.White),
                shape = RoundedCornerShape(12.dp)
            ) {
                Column(
                    modifier = Modifier.padding(20.dp)
                ) {
                    Text(
                        text = "Market Insights",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                        color = TextPrimary
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    InsightItem(
                        icon = Icons.Default.Info,
                        title = "Seasonal Trend",
                        description = "Prices generally increase during monsoon season"
                    )
                    
                    InsightItem(
                        icon = Icons.Default.Add,
                        title = "Best Selling Time",
                        description = "Early morning hours show better rates"
                    )
                    
                    InsightItem(
                        icon = Icons.Default.Star,
                        title = "Price Alert",
                        description = "Set alerts for your preferred crops"
                    )
                }
            }
        }
        
        item {
            Spacer(modifier = Modifier.height(32.dp))
        }
    }
    
    // State Selection Dialog
    if (showStateDialog) {
        AlertDialog(
            onDismissRequest = { showStateDialog = false },
            title = { Text("Select State") },
            text = {
                LazyColumn {
                    items(states) { state ->
                        TextButton(
                            onClick = {
                                selectedState = state
                                selectedMarket = markets[state]?.firstOrNull() ?: ""
                                showStateDialog = false
                            },
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(
                                text = state,
                                modifier = Modifier.fillMaxWidth(),
                                textAlign = TextAlign.Start
                            )
                        }
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { showStateDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }
    
    // Market Selection Dialog
    if (showMarketDialog) {
        AlertDialog(
            onDismissRequest = { showMarketDialog = false },
            title = { Text("Select Market") },
            text = {
                LazyColumn {
                    markets[selectedState]?.let { marketList ->
                        items(marketList) { market ->
                            TextButton(
                                onClick = {
                                    selectedMarket = market
                                    showMarketDialog = false
                                },
                                modifier = Modifier.fillMaxWidth()
                            ) {
                                Text(
                                    text = market,
                                    modifier = Modifier.fillMaxWidth(),
                                    textAlign = TextAlign.Start
                                )
                            }
                        }
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { showMarketDialog = false }) {
                    Text("Cancel")
                }
            }
        )
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun CropPriceCard(
    crop: CropPrice,
    modifier: Modifier = Modifier
) {
    Card(
        modifier = modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = Color.White),
        shape = RoundedCornerShape(12.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Crop Icon
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .background(
                        EmeraldPrimary.copy(alpha = 0.1f),
                        RoundedCornerShape(24.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = crop.name.first().toString(),
                    style = MaterialTheme.typography.titleLarge,
                    fontWeight = FontWeight.Bold,
                    color = EmeraldPrimary
                )
            }
            
            Spacer(modifier = Modifier.width(16.dp))
            
            // Crop Details
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = crop.name,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold,
                    color = TextPrimary
                )
                
                Text(
                    text = crop.market,
                    style = MaterialTheme.typography.bodySmall,
                    color = TextSecondary
                )
                
                Text(
                    text = crop.unit,
                    style = MaterialTheme.typography.bodySmall,
                    color = TextSecondary
                )
            }
            
            // Price Info
            Column(
                horizontalAlignment = Alignment.End
            ) {
                Text(
                    text = crop.currentPrice,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    color = TextPrimary
                )
                
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Icon(
                        imageVector = if (crop.isIncreasing) Icons.Default.KeyboardArrowUp else Icons.Default.KeyboardArrowDown,
                        contentDescription = null,
                        tint = if (crop.isIncreasing) Color.Green else Color.Red,
                        modifier = Modifier.size(16.dp)
                    )
                    
                    Text(
                        text = crop.changePercent,
                        style = MaterialTheme.typography.bodySmall,
                        color = if (crop.isIncreasing) Color.Green else Color.Red,
                        fontWeight = FontWeight.Medium
                    )
                }
                
                Text(
                    text = "Prev: ${crop.previousPrice}",
                    style = MaterialTheme.typography.bodySmall,
                    color = TextSecondary
                )
            }
        }
    }
}

@Composable
private fun SummaryItem(value: String, label: String, color: Color) {
    Column(
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = value,
            style = MaterialTheme.typography.titleLarge,
            color = color,
            fontWeight = FontWeight.Bold
        )
        
        Text(
            text = label,
            style = MaterialTheme.typography.bodySmall,
            color = color.copy(alpha = 0.8f),
            textAlign = TextAlign.Center
        )
    }
}

@Composable
private fun InsightItem(
    icon: ImageVector,
    title: String,
    description: String
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp),
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
                style = MaterialTheme.typography.titleSmall,
                fontWeight = FontWeight.SemiBold,
                color = TextPrimary
            )
            
            Text(
                text = description,
                style = MaterialTheme.typography.bodySmall,
                color = TextSecondary
            )
        }
    }
}