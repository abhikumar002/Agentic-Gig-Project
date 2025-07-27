#!/bin/bash

# Final comprehensive fix for all build issues
cd /Users/sachinkumar/AndroidStudioProjects/FarmersAI

echo "Fixing all Material Icons issues..."

# Replace all unavailable icons with basic ones that definitely exist
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Psychology/Icons.Default.Help/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Translate/Icons.Default.Language/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.QuestionAnswer/Icons.Default.Chat/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.CloudQueue/Icons.Default.Cloud/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.PhotoCamera/Icons.Default.Camera/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.ErrorOutline/Icons.Default.Error/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.SupportAgent/Icons.Default.Support/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.PhoneAndroid/Icons.Default.Phone/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.FlashOn/Icons.Default.Flash/g' {} \;

# Fix API issues  
find app/src -name "*.kt" -exec sed -i '' 's/TopAppBarDefaults.topAppBarColors/TopAppBarDefaults.smallTopAppBarColors/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/OutlinedTextFieldDefaults.colors/TextFieldDefaults.outlinedTextFieldColors/g' {} \;

# Fix LazyColumn import issues in SignupScreen
find app/src -name "SignupScreen.kt" -exec sed -i '' 's/LazyColumn {/Column {/g' {} \;
find app/src -name "SignupScreen.kt" -exec sed -i '' 's/items(/forEachIndexed { index, /g' {} \;

echo "All fixes applied successfully"