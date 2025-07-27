from google.adk.agents import Agent
from google.adk.tools.agent_tool import AgentTool
from google.adk.tools import google_search
from google.adk.tools import agent_tool
from datetime import datetime
import requests
import random

# from .tools import (
#     get_vegetable_price,
#     get_weather_info,
#     get_disease_data
# )

# Known Indian states
INDIAN_STATES = {
    "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chhattisgarh", "goa",
    "gujarat", "haryana", "himachal pradesh", "jharkhand", "karnataka", "kerala",
    "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland",
    "odisha", "punjab", "rajasthan", "sikkim", "tamil nadu", "telangana", "tripura",
    "uttar pradesh", "uttarakhand", "west bengal", "jammu and kashmir", "ladakh",
    "delhi", "puducherry", "chandigarh", "andaman and nicobar islands",
    "dadra and nagar haveli and daman and diu"
}

def title_case(s: str) -> str:
    """Converts string to title case (e.g., 'uttar pradesh' -> 'Uttar Pradesh')."""
    return " ".join(word.capitalize() for word in s.strip().split())

# ----- Tool 1: Your existing vegetable price tool -----
def get_vegetable_price(vegetable: str, location: str) -> dict:
    """Fetches real-time vegetable price using data.gov.in API."""
    
    print(f"Vegetable : {vegetable} || Location : {location}")

    base_url = "https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24"
    api_key = "579b464db66ec23bdd0000010e30f72ab0aa45674921636e6cbe8864"

    filters = {
        "Commodity": title_case(vegetable)
    }

    location_normalized = title_case(location)
    if location.lower() in INDIAN_STATES:
        filters["State"] = location_normalized
    else:
        filters["Market"] = location_normalized

    # Build query params
    params = {
        "api-key": api_key,
        "format": "json"
    }
    for key, val in filters.items():
        params[f"filters[{key}]"] = val

    try:
        response = requests.get(base_url, params=params)
        print(f"Params : {params} ")

        data = response.json()
        print(data["records"], 'data')

        if "records" in data and data["records"]:
            record = data["records"][0]
            state = record.get("State", "")
            market = record.get("Market", location_normalized)
            commodity = record.get("Commodity", title_case(vegetable))
            min_price = record.get("Min_Price", "N/A")
            max_price = record.get("Max_Price", "N/A")
            modal_price = record.get("Modal_Price", "N/A")
            arrival_date = record.get("Arrival_Date", "Unknown Date")

            return {
                "status": "success",
                "report": (
                    f"📍 **{commodity} Price in {market}, {state}** (as of {arrival_date}):\n"
                    f"• Min Price: ₹{min_price}\n"
                    f"• Max Price: ₹{max_price}\n"
                    f"• Modal Price: ₹{modal_price} (most common rate)"
                )
            }
        else:
            return {
                "status": "error",
                "error_message": f"No price data found for {vegetable} in {location}."
            }

    except Exception as e:
        return {
            "status": "error",
            "error_message": f"Failed to fetch data: {str(e)}"
        }

# ----- Tool 2: Weather Information (Mock Demo Tool) -----
def get_weather_info(city: str) -> dict:
    """
    Mock weather tool for demo purposes. 
    Returns simulated weather data for Indian cities.
    """
    
    # Mock weather data for demo
    weather_conditions = [
        "Sunny", "Partly Cloudy", "Cloudy", "Light Rain", 
        "Heavy Rain", "Thunderstorm", "Hazy", "Foggy"
    ]
    
    # Generate mock data
    temperature = random.randint(15, 45)  # Celsius
    humidity = random.randint(30, 90)  # Percentage
    condition = random.choice(weather_conditions)
    wind_speed = random.randint(5, 25)  # km/h
    
    city_formatted = title_case(city)
    
    return {
        "status": "success",
        "report": (
            f"🌤️ **Weather in {city_formatted}**:\n"
            f"• Temperature: {temperature}°C\n"
            f"• Condition: {condition}\n"
            f"• Humidity: {humidity}%\n"
            f"• Wind Speed: {wind_speed} km/h\n"
            f"• Last Updated: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n"
            f"\n*Note: This is mock data for demonstration purposes*"
        )
    }

# ----- Tool 3: Current Date Helper -----
def get_current_date() -> dict:
    """
    Get the current date in the format YYYY-MM-DD
    """
    return {
        "status": "success",
        "current_date": datetime.now().strftime("%Y-%m-%d"),
        "formatted_date": datetime.now().strftime("%B %d, %Y"),
        "day_of_week": datetime.now().strftime("%A")
    }


# ----- Tool 4: Get Disease Data -----
def get_disease_data() -> dict:
    """
    You are a simple farming helper. Give SHORT, PRACTICAL answers.

    For plant diseases/problems:    
    🔍 **Problem:** [Quick diagnosis]
    💊 **Treatment:** [Specific pesticide/organic solution]  
    🛡️ **Prevention:** [Simple prevention tips]

    For market prices/rates:
    📊 **Current Info:** Search latest available prices
    💰 **Best Sources:** eNAM portal, local mandi, Krishi Jagran app
    📱 **Real-time:** Contact local commission agents for exact rates

    Keep answers under 200 words. Focus on actionable advice for Indian farmers.
    If exact real-time prices unavailable, guide to reliable sources.
    """
    return {
        "status": "success",
        "guidelines": {
            "disease_format": "🔍 Problem → 💊 Treatment → 🛡️ Prevention",
            "price_format": "📊 Current Info → 💰 Best Sources → 📱 Real-time",
            "word_limit": 200,
            "focus": "Actionable advice for Indian farmers"
        }
    }


# Agent instruction combining all functionalities
agent_instruction = """
You are an Agricultural Assistant AI, specialized in helping farmers, traders, and consumers 
with comprehensive agricultural market information across India.

**YOUR CAPABILITIES:**

1. **Vegetable Price Information:**
   - Fetch real-time vegetable prices from Indian government data
   - Search by vegetable name and location (state or specific market)
   - Provide min, max, and modal prices with arrival dates

2. **Weather Information:**
   - Get current weather conditions for any Indian city
   - Useful for planning agricultural activities and market visits

3. **Disease Data:**
   - Provide plant disease diagnosis and treatment recommendations
   - Offer organic and chemical treatment solutions for crop problems
   - Share prevention tips and best practices for healthy farming
   - Guide farmers to reliable sources for real-time agricultural advice

4. **Google Search:**
   - Queries for which tool are not available do a google search and answer

**HOW TO INTERACT:**

Ask me questions like:
- "What is the price of onion in Delhi?"
- "Show me the weather in Mumbai"


**RESPONSE FORMAT:**
- Always provide clear, formatted responses with relevant emojis
- Include source information when available
- For price data, show min, max, and modal prices
- For mock data (weather, schedules), clearly indicate it's for demonstration

**WORKFLOW:**
1. Understand the user's request clearly
2. Identify the appropriate tool(s) to use
3. Validate parameters before making tool calls
4. Call the tools with correct parameters
5. Present results in a user-friendly format
6. Ask if they need additional assistance

Always be helpful, accurate, and provide actionable information for agricultural decision-making.
"""

Agent_Search = Agent(
    name="Web_search",
    model="gemini-2.0-flash",
    instruction = """
    You are a Google search specialist. 
    
    - Search for any query using google_search tool
    - Provide clear, relevant results 
    - Keep responses concise and helpful
    - Focus on answering the user's question directly
    """,
    tools=[google_search]
)

# Main agent with all tools
root_agent = Agent(
    name="agricultural_assistant",
    model="gemini-2.0-flash",
    description="Comprehensive agricultural assistant for market prices, weather, and agricultural information across India.",
    instruction=agent_instruction,
    tools=[
        get_vegetable_price,       
        get_weather_info,
        get_disease_data,
        agent_tool.AgentTool(agent=Agent_Search)
    ]
)