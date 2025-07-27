#!/bin/bash

# Fix Material Icons that don't exist in the older version
cd /Users/sachinkumar/AndroidStudioProjects/FarmersAI

# Replace non-existent icons with available ones
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Science/Icons.Default.Psychology/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Language/Icons.Default.Translate/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Speed/Icons.Default.FlashOn/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Support/Icons.Default.SupportAgent/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.CloudUpload/Icons.Default.CloudQueue/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.PhotoLibrary/Icons.Default.PhotoCamera/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.CameraAlt/Icons.Default.PhotoCamera/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Error/Icons.Default.ErrorOutline/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Chat/Icons.Default.QuestionAnswer/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.LocalFlorist/Icons.Default.Eco/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.CloudSync/Icons.Default.CloudQueue/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Security/Icons.Default.Security/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.TrendingUp/Icons.Default.TrendingUp/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Psychology/Icons.Default.Psychology/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Android/Icons.Default.PhoneAndroid/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Cloud/Icons.Default.CloudQueue/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Storage/Icons.Default.Storage/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Wifi/Icons.Default.Wifi/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Mic/Icons.Default.Mic/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Shield/Icons.Default.Shield/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Schedule/Icons.Default.Schedule/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Visibility/Icons.Default.Visibility/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.VisibilityOff/Icons.Default.VisibilityOff/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Agriculture/Icons.Default.Eco/g' {} \;

echo "Icon replacements completed"