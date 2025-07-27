#!/bin/bash

# This script documents the process to create the PNG versions of the icon
# In a real scenario, you would use a graphics tool like GIMP, Photoshop, or online converters

echo "To create PNG versions of the new icon:"
echo "1. Use Android Studio's Image Asset Studio:"
echo "   - Right-click on res folder -> New -> Image Asset"
echo "   - Select Launcher Icons (Adaptive and Legacy)"
echo "   - Choose Foreground Layer tab and select the ic_launcher_foreground.xml"
echo "   - Choose Background Layer tab and select the ic_launcher_background.xml"
echo "   - Click Next and Finish"
echo ""
echo "2. Or use an online tool to convert the vector drawables to PNG"
echo "3. Replace the existing .webp files in mipmap folders with new .png files"
echo ""
echo "The new icon features:"
echo "- Green gradient background matching the FarmersAI theme"
echo "- Stylized leaf shape in lighter green" 
echo "- White circuit board lines extending from the leaf"
echo "- Circuit connection points as white circles"
echo "- Perfect for an AI-powered agricultural app"
