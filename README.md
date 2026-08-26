# AI Social Media Content Generator

AI-powered Google Sheets automation that uses the Gemini API to transform original content into platform-specific social media content.

## Project Description

The AI Social Media Content Generator allows users to enter original content directly into Google Sheets and automatically generate customized content for different social media platforms.

The system generates:

- LinkedIn posts
- X posts
- Instagram captions
- Short, engaging titles

The generated content is automatically written back into the spreadsheet, making the entire workflow simple and repeatable.

## How It Works

1. User enters original content in Column A.
2. A Google Apps Script trigger detects the new content.
3. The script sends the content to the Gemini API.
4. Gemini generates platform-specific content.
5. The generated content is automatically written into the spreadsheet.
6. The Status column tracks the generation process.

### Workflow

```text
Original Content
       ↓
Google Sheets
       ↓
Google Apps Script
       ↓
Gemini API
       ↓
AI-generated content
       ↓
┌───────────────┬────────────┬──────────────────┬─────────┐
│ LinkedIn Post │ X Post     │ Instagram Caption│ Title   │
└───────────────┴────────────┴──────────────────┴─────────┘

Features
🤖 AI Content Generation

Uses Google's Gemini API to transform one piece of original content into multiple social media formats.

💼 LinkedIn Content

Generates professional and engaging LinkedIn posts designed for business and professional audiences.

𝕏 X Content

Generates concise posts designed to fit within the character limit.

📸 Instagram Content

Generates friendly captions with relevant hashtags.

📝 Automatic Titles

Creates short and catchy titles for the generated content.

⚡ Automatic Workflow

When new content is entered into Column A, the Google Apps Script trigger automatically starts the generation process.

📊 Status Tracking

The spreadsheet tracks the generation process:

Generating...
Generated
Tech Stack
Google Sheets
Google Apps Script
JavaScript
Gemini API
Google Apps Script Triggers
Spreadsheet Structure
Column	Purpose
A	Original Content
B	LinkedIn Post
C	Instagram Caption
D	X Post
E	Title
F	Status
Setup
1. Create a Google Sheet

Create a spreadsheet with the following columns:

Original Content | LinkedIn Post | Instagram Caption | X Post | Title | Status
2. Open Apps Script

Go to:

Extensions → Apps Script

Add the project code to the Apps Script editor.

3. Configure Gemini API

Create a Gemini API key and store it securely using Google Apps Script Script Properties.

The property should be named:

GEMINI_API_KEY

Do not hard-code the API key inside the source code.

4. Authorize the Script

Run the required Apps Script function and grant the requested Google permissions.

5. Configure the Trigger

Create an Apps Script trigger for the spreadsheet edit event so that new content entered into Column A can start the generation workflow.

Usage

Enter a piece of content into Column A.

For example:

AI automation helps small businesses save time by handling repetitive tasks.

The system automatically generates platform-specific content and places the results into the corresponding columns.

Example
Original Content
AI automation helps small businesses save time by handling repetitive tasks.
Generated Content

LinkedIn:
A professional post explaining how automation can improve productivity.

X:
A concise version optimized for X.

Instagram:
A friendly caption with relevant hashtags.

Title:
A short title related to the topic.

Security

The Gemini API key should never be committed to GitHub.

Store the key using Google Apps Script's Script Properties:

GEMINI_API_KEY

If an API key is accidentally exposed, revoke it immediately and generate a new one.

Future Improvements

Potential future improvements include:

Multiple content tones
Audience-specific content generation
Additional social platforms
Content scheduling
AI-generated hashtags
Content quality scoring
Analytics tracking
Image generation
Duplicate-content detection
Author

G.K. Karunya

Built as an AI automation project using Google Apps Script, Google Sheets, and Gemini.
