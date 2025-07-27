from datetime import datetime
import requests
import random
from google.adk.agents import Agent
from google.adk.tools.agent_tool import AgentTool

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

