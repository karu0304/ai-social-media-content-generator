# AI Social Media Content Generator

An AI-powered Google Sheets automation that uses the Gemini API to transform original content into platform-specific social media content.

The system automatically generates LinkedIn posts, X posts, Instagram captions, and catchy titles from a single piece of original content.

---

## 🚀 Project Overview

Creating content for multiple social media platforms can be repetitive and time-consuming.

This project automates that process.

A user enters original content into Google Sheets, and the automation sends the content to Google's Gemini API. Gemini generates customized content for different platforms, and the results are automatically written back into the spreadsheet.

The workflow is designed to reduce repetitive content-writing work while keeping everything inside a familiar Google Sheets interface.

---

## ✨ Features

- 🤖 AI-powered content generation using Gemini
- 💼 Professional LinkedIn post generation
- 𝕏 Short-form X post generation
- 📸 Instagram caption generation
- 📝 Automatic title generation
- ⚡ Automatic generation when new content is entered
- 📊 Generation status tracking
- 🔐 Secure API-key storage using Google Apps Script Script Properties
- 📄 Google Sheets-based interface
- 🔄 Repeatable content-generation workflow

---

## 🏗️ Architecture

The project follows an event-driven automation workflow:

```text
User enters original content
            │
            ▼
       Google Sheets
            │
            ▼
        onEdit(e)
            │
            ▼
    Google Apps Script
            │
            ▼
       Read Column A
            │
            ▼
        Gemini API
            │
            ▼
    Generate AI Content
            │
     ┌──────┼──────┬───────┐
     ▼      ▼      ▼       ▼
 LinkedIn   X   Instagram  Title
     │      │      │       │
     └──────┴──────┴───────┘
            │
            ▼
     Write results to
       Google Sheets
            │
            ▼
      Status = Generated

🔄 How It Works
1. Enter Original Content

The user enters an idea, sentence, or piece of content into Column A.

Example:

AI automation is helping small businesses save time by handling repetitive tasks.
2. Trigger Detects the Change

The Google Apps Script onEdit(e) trigger detects when new content is entered into Column A.

The script ignores:

The header row
Empty cells
Edits outside Column A
3. Content Generation Starts

The script updates the Status column to:

Generating...

The original content is then sent to the Gemini API along with instructions for generating platform-specific content.

4. Gemini Generates the Content

Gemini generates four sections:

LINKEDIN:
Professional LinkedIn content


X:
Short X post


INSTAGRAM:
Instagram caption with hashtags


TITLE:
Short catchy title
5. Results Are Parsed

The Apps Script extracts each section from the Gemini response.

6. Results Are Written to the Sheet

The generated content is placed into the corresponding columns.

The Status column is then updated to:

Generated
📊 Spreadsheet Structure

The Google Sheet uses the following structure:

Column	Purpose
A	Original Content
B	LinkedIn Post
C	Instagram Caption
D	X Post
E	Title
F	Status

Example:

Original Content	LinkedIn Post	Instagram Caption	X Post	Title	Status
AI automation helps businesses save time	Generated LinkedIn content	Generated Instagram caption	Generated X post	AI Automation for Business	Generated
🧠 Gemini Prompt Design

The automation provides Gemini with platform-specific instructions.

LinkedIn

The model is instructed to create:

Professional content
Engaging content
Approximately 100 words
X

The model is instructed to create:

Concise content
Under 280 characters
Instagram

The model is instructed to create:

Friendly content
Approximately 80 words
3 relevant hashtags
Title

The model is instructed to create:

A short title
A catchy title
Maximum 10 words

This allows one original idea to be transformed into multiple formats automatically.

🛠️ Technical Implementation
Google Apps Script

Google Apps Script handles:

Spreadsheet access
User input detection
Gemini API requests
Response parsing
Spreadsheet updates
Status tracking
Custom Google Sheets menu creation
Gemini API

The project uses:

gemini-2.5-flash

The Gemini REST API is called using UrlFetchApp.fetch().

The request contains the original content and the content-generation prompt.

Response Processing

The Gemini response is parsed using JavaScript string processing.

The generated response is divided into:

LINKEDIN
X
INSTAGRAM
TITLE

The extracted sections are then written into Columns B–E.

Status Tracking

The automation provides basic process visibility:

Generating...

followed by:

Generated

This makes it easier to identify which rows have completed processing.

🔐 Security

The Gemini API key is not stored directly in the source code.

Instead, the project retrieves the key using Google Apps Script Script Properties:

const apiKey = PropertiesService
  .getScriptProperties()
  .getProperty("GEMINI_API_KEY");

The required Script Property is:

GEMINI_API_KEY
Important

Never commit an actual API key to GitHub.

Do not place keys directly inside:

const apiKey = "YOUR_API_KEY";

If an API key is accidentally exposed publicly, it should be revoked immediately and replaced.

⚙️ Setup
1. Create a Google Sheet

Create a Google Sheet with these columns:

Original Content | LinkedIn Post | Instagram Caption | X Post | Title | Status
2. Open Apps Script

From Google Sheets:

Extensions → Apps Script

Create or open the Apps Script project.

3. Add the Script

Add the project JavaScript code from:

Code.gs
4. Configure the Gemini API Key

Store the Gemini API key in Google Apps Script Script Properties.

Property name:

GEMINI_API_KEY
5. Authorize the Script

Run the required function and grant the requested Google permissions.

6. Configure the Trigger

Create an Apps Script trigger for the spreadsheet edit event.

The trigger should execute:

onEdit

when the spreadsheet is edited.

7. Enter Content

Enter original content into Column A.

The automation will generate the social media content automatically.

🖥️ Demo

The project converts a single piece of original content into multiple platform-specific outputs directly inside Google Sheets.

📁 Project Structure
ai-social-media-content-generator/
│
├── Code.gs
├── README.md
├── demo.png
└── .gitignore
Code.gs

Contains the Google Apps Script implementation, including:

generateContent()
extractSection()
onOpen()
onEdit()
README.md

Project documentation, setup instructions, architecture, and usage information.

demo.png

Screenshot demonstrating the generated social media content inside Google Sheets.

.gitignore

Helps prevent sensitive or unnecessary files from being committed to the repository.

💡 Example Use Case

A small business owner may enter:

AI automation is helping small businesses save time by handling repetitive tasks.

Instead of manually rewriting the idea for every platform, the automation generates:

LinkedIn Post
        ↓
Professional business-focused content


X Post
        ↓
Short-form social content


Instagram Caption
        ↓
Friendly caption + hashtags


Title
        ↓
Short catchy headline

This turns one piece of content into a reusable multi-platform content package.

🎯 Why This Project?

This project demonstrates how AI can be integrated into an everyday business workflow rather than being used only as a standalone chatbot.

It combines:

AI/LLM integration
REST API integration
Google Apps Script
Event-driven automation
Spreadsheet automation
Prompt engineering
Response parsing
Secure credential management
🔮 Future Improvements

Potential improvements include:

Multiple writing tones
Audience-specific content
Additional social media platforms
Content scheduling
AI-generated hashtags
Content quality scoring
Duplicate-content detection
Analytics tracking
Image generation
Content approval workflow
Retry handling for failed API requests
Batch content generation
Improved error/status reporting
📚 Technologies
Technology	Purpose
Google Sheets	User interface and data storage
Google Apps Script	Automation and API integration
JavaScript	Application logic
Gemini API	AI content generation
Apps Script Triggers	Event-driven automation
👩‍💻 Author

G.K. Karunya

Built as an AI automation project using Google Sheets, Google Apps Script, JavaScript, and the Gemini API.


