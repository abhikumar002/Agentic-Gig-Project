#!/bin/bash

# Final icon fix - replace ALL remaining unavailable icons with basic ones
cd /Users/sachinkumar/AndroidStudioProjects/FarmersAI

echo "Applying final icon fixes..."

# Replace all remaining problematic icons with the most basic Material Icons
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Folder/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Wifi/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Mic/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Language/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.AccessTime/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Error/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Chat/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.TrendingUp/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Flash/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Support/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.Visibility/Icons.Default.Add/g' {} \;
find app/src -name "*.kt" -exec sed -i '' 's/Icons.Default.VisibilityOff/Icons.Default.Add/g' {} \;

echo "All problematic icons replaced with basic icons"