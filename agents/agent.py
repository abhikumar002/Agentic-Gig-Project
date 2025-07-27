from google.adk.agents import Agent
from google.adk.tools.agent_tool import AgentTool
from google.adk.tools import google_search
from google.adk.tools import agent_tool
from datetime import datetime
import requests
import random
import json
import os

import vertexai
from vertexai import agent_engines
from vertexai.preview import reasoning_engines

PROJECT_ID = "vertexai-467016"
LOCATION = "us-central1"
STAGING_BUCKET = "gs://aiagentsaftab"

vertexai.init(
    project=PROJECT_ID,
    location=LOCATION,
    staging_bucket=STAGING_BUCKET,
)

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

# ============================================================================
# SOLUTION 1: SESSION PERSISTENCE CLASS
# ============================================================================
class PersistentAgentSession:
    def __init__(self, app, user_id="default_user", session_file="agent_session.json"):
        self.app = app
        self.user_id = user_id
        self.session_file = session_file
        self.session = None
        self.conversation_history = []
        
        # Load existing session if available
        self.load_session()
        
        # Create new session if none exists
        if self.session is None:
            self.session = self.app.create_session(user_id=self.user_id)
            self.save_session()
    
    def load_session(self):
        """Load session and conversation history from file"""
        try:
            if os.path.exists(self.session_file):
                with open(self.session_file, 'r') as f:
                    data = json.load(f)
                    self.conversation_history = data.get('conversation_history', [])
                    session_id = data.get('session_id')
                    if session_id:
                        # Try to restore session (this might need adjustment based on your SDK)
                        self.session = self.app.create_session(user_id=self.user_id)
                        print(f"Loaded conversation history with {len(self.conversation_history)} messages")
        except Exception as e:
            print(f"Error loading session: {e}")
    
    def save_session(self):
        """Save session and conversation history to file"""
        try:
            session_data = {
                'session_id': str(self.session) if self.session else None,
                'user_id': self.user_id,
                'conversation_history': self.conversation_history,
                'last_updated': datetime.now().isoformat()
            }
            with open(self.session_file, 'w') as f:
                json.dump(session_data, f, indent=2)
        except Exception as e:
            print(f"Error saving session: {e}")
    
    def send_message(self, message):
        """Send message with context awareness"""
        # Add user message to history
        self.conversation_history.append({
            'role': 'user',
            'content': message,
            'timestamp': datetime.now().isoformat()
        })
        
        # Create context-aware message by including recent history
        context_message = self._build_context_message(message)
        
        # Send to agent
        response = self.session.send_message(context_message)
        
        # Add assistant response to history
        self.conversation_history.append({
            'role': 'assistant',
            'content': str(response),
            'timestamp': datetime.now().isoformat()
        })
        
        # Keep only last 10 exchanges to avoid token limits
        if len(self.conversation_history) > 20:
            self.conversation_history = self.conversation_history[-20:]
        
        # Save updated session
        self.save_session()
        
        return response
    
    def _build_context_message(self, current_message, history_limit=4):
        """Build message with conversation context"""
        if not self.conversation_history:
            return current_message
        
        # Get recent conversation history
        recent_history = self.conversation_history[-history_limit:] if len(self.conversation_history) > history_limit else self.conversation_history
        
        context_parts = ["Previous conversation context:"]
        for msg in recent_history:
            role = "User" if msg['role'] == 'user' else "Assistant"
            context_parts.append(f"{role}: {msg['content']}")
        
        context_parts.append(f"\nCurrent question: {current_message}")
        
        return "\n".join(context_parts)
    
    def clear_history(self):
        """Clear conversation history"""
        self.conversation_history = []
        self.save_session()
        print("Conversation history cleared.")

# ============================================================================
# EXISTING TOOL FUNCTIONS (unchanged)
# ============================================================================
def title_case(s: str) -> str:
    """Converts string to title case (e.g., 'uttar pradesh' -> 'Uttar Pradesh')."""
    return " ".join(word.capitalize() for word in s.strip().split())

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

def get_weather_info(city: str) -> dict:
    """Mock weather tool for demo purposes."""
    
    weather_conditions = [
        "Sunny", "Partly Cloudy", "Cloudy", "Light Rain", 
        "Heavy Rain", "Thunderstorm", "Hazy", "Foggy"
    ]
    
    temperature = random.randint(15, 45)
    humidity = random.randint(30, 90)
    condition = random.choice(weather_conditions)
    wind_speed = random.randint(5, 25)
    
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

def get_current_date() -> dict:
    """Get the current date in the format YYYY-MM-DD"""
    return {
        "status": "success",
        "current_date": datetime.now().strftime("%Y-%m-%d"),
        "formatted_date": datetime.now().strftime("%B %d, %Y"),
        "day_of_week": datetime.now().strftime("%A")
    }

def get_disease_data() -> dict:
    """Disease data guidelines for farming helper."""
    return {
        "status": "success",
        "guidelines": {
            "disease_format": "🔍 Problem → 💊 Treatment → 🛡️ Prevention",
            "price_format": "📊 Current Info → 💰 Best Sources → 📱 Real-time",
            "word_limit": 200,
            "focus": "Actionable advice for Indian farmers"
        }
    }

# ============================================================================
# ENHANCED AGENT INSTRUCTION WITH CONTEXT AWARENESS
# ============================================================================
enhanced_agent_instruction = """
You are an Agricultural Assistant AI, specialized in helping farmers, traders, and consumers 
with comprehensive agricultural market information across India.

**IMPORTANT: CONTEXT AWARENESS**
- You can remember previous conversations and refer back to them
- When users ask follow-up questions like "what about in Mumbai?" or "how about tomatoes?", 
  refer to the previous conversation context to understand what they're asking about
- If a user previously asked about onion prices in Delhi and now asks "what about Mumbai?", 
  understand they want onion prices in Mumbai
- Maintain conversation flow and reference previous queries when relevant

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

4. **Google Search:**
   - For queries where specific tools aren't available, perform Google search

**CONTEXT HANDLING EXAMPLES:**
- User: "What's the price of onion in Delhi?"
- You: [Provide onion price in Delhi]
- User: "What about Mumbai?"
- You: [Understand they want onion price in Mumbai and fetch that]

**RESPONSE FORMAT:**
- Always provide clear, formatted responses with relevant emojis
- Reference previous queries when relevant ("As we discussed earlier about onions...")
- Include source information when available
- For price data, show min, max, and modal prices

Always be helpful, accurate, and maintain conversation context for better user experience.
"""

# ============================================================================
# AGENT SETUP
# ============================================================================
Agent_Search = Agent(
    name="Web_search",
    model="gemini-2.0-flash",
    instruction="""
    You are a Google search specialist. 
    - Search for any query using google_search tool
    - Provide clear, relevant results 
    - Keep responses concise and helpful
    - Focus on answering the user's question directly
    """,
    tools=[google_search]
)

root_agent = Agent(
    name="agricultural_assistant",
    model="gemini-2.0-flash",
    description="Context-aware comprehensive agricultural assistant for market prices, weather, and agricultural information across India.",
    instruction=enhanced_agent_instruction,
    tools=[
        get_vegetable_price,       
        get_weather_info,
        get_disease_data,
        agent_tool.AgentTool(agent=Agent_Search)
    ]
)

app = reasoning_engines.AdkApp(
    agent=root_agent,
    enable_tracing=True,
)

# ============================================================================
# DEPLOYMENT SETUP (Main execution)
# ============================================================================

# Create the deployment session
print("Initializing Agricultural Assistant with Context Memory...")
deployment_session = PersistentAgentSession(app, user_id="deployed_user")
print("✅ Session initialized successfully!")

# Deploy the remote app (this is what was happening before)
print("🚀 Creating remote deployment...")
# remote_app = agent_engines.create(
#     agent_engine=app,
#     requirements=[
#         "google-cloud-aiplatform[adk,agent_engines]"   
#     ]
# )
print("✅ Remote app deployed successfully!")

# ============================================================================
# OPTIONAL: INTERACTIVE MODE (uncomment to enable)
# ============================================================================
def interactive_mode():
    """Run interactive command-line interface - call this manually if needed"""
    print("🌾 Agricultural Assistant with Context Memory - Interactive Mode")
    print("Type 'exit' to quit, 'clear' to clear conversation history")
    print("="*60)
    
    while True:
        try:
            user_input = input("\n👤 You: ").strip()
            
            if user_input.lower() == 'exit':
                print("👋 Thank you for using Agricultural Assistant!")
                break
            elif user_input.lower() == 'clear':
                deployment_session.clear_history()
                continue
            elif not user_input:
                continue
            
            print("\n🤖 Assistant: ", end="")
            response = deployment_session.send_message(user_input)
            print(response)
            
        except KeyboardInterrupt:
            print("\n\n👋 Thank you for using Agricultural Assistant!")
            break
        except Exception as e:
            print(f"\n❌ Error: {e}")
            print("Please try again.")

# ============================================================================
# UTILITY FUNCTIONS FOR EXTERNAL ACCESS
# ============================================================================
def send_message_with_context(message):
    """Send message with context - use this function in your applications"""
    return deployment_session.send_message(message)

def clear_conversation_history():
    """Clear the conversation history"""
    deployment_session.clear_history()

def get_conversation_history():
    """Get the current conversation history"""
    return deployment_session.conversation_history

# Uncomment the line below if you want to run interactive mode immediately
# interactive_mode()
