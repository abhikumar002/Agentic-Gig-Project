package com.example.farmersai.navigation

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.farmersai.ui.screens.AboutScreen
import com.example.farmersai.ui.screens.ChatScreen
import com.example.farmersai.ui.screens.DiagnosisScreen
import com.example.farmersai.ui.screens.DownloadScreen
import com.example.farmersai.ui.screens.FeaturesScreen
import com.example.farmersai.ui.screens.HomeScreen
import com.example.farmersai.ui.screens.LoginScreen
import com.example.farmersai.ui.screens.MarketPriceScreen
import com.example.farmersai.ui.screens.SignupScreen

@Composable
fun NavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = Screen.Home.route
    ) {
        composable(Screen.Home.route) {
            HomeScreen(navController = navController)
        }
        
        composable(Screen.Diagnosis.route) {
            DiagnosisScreen(navController = navController)
        }
        
        composable(Screen.Chat.route) {
            ChatScreen(navController = navController)
        }
        
        composable(Screen.Login.route) {
            LoginScreen(navController = navController)
        }
        
        composable(Screen.Signup.route) {
            SignupScreen(navController = navController)
        }
        
        composable(Screen.Features.route) {
            FeaturesScreen(navController = navController)
        }
        
        composable(Screen.About.route) {
            AboutScreen(navController = navController)
        }
        
        composable(Screen.Download.route) {
            DownloadScreen(navController = navController)
        }
        
        composable(Screen.MarketPrice.route) {
            MarketPriceScreen(navController = navController)
        }
    }
}

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Diagnosis : Screen("diagnosis")
    object Chat : Screen("chat")
    object Login : Screen("login")
    object Signup : Screen("signup")
    object Features : Screen("features")
    object About : Screen("about")
    object Download : Screen("download")
    object MarketPrice : Screen("market_price")
}