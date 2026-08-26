const MODEL = "gemini-2.5-flash";

function generateContent(row) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(row, 6).setValue("Generating...");

  // If no row was provided, use the currently selected row.
  row = row || sheet.getActiveCell().getRow();

  // Don't process the header
  if (row === 1) {
    SpreadsheetApp.getUi().alert("Please select a content row.");
    return;
  }

  // Get original content from Column A
  const originalContent = sheet.getRange(row, 1).getValue();

  if (!originalContent) {
    SpreadsheetApp.getUi().alert(
      "Please put your original content in Column A first."
    );
    return;
  }

  // Get Gemini API key
  const apiKey = PropertiesService
    .getScriptProperties()
    .getProperty("GEMINI_API_KEY");

  if (!apiKey) {
    SpreadsheetApp.getUi().alert("Gemini API key was not found.");
    return;
  }

  const prompt = `
You are an expert social media content writer.

Create social media content from this original content:

${originalContent}

Give me exactly 4 sections using these labels:

LINKEDIN:
Write a professional and engaging LinkedIn post of about 100 words.

X:
Write a concise X post under 280 characters.

INSTAGRAM:
Write a friendly Instagram caption of about 80 words with 3 relevant hashtags.

TITLE:
Write a short, catchy title of maximum 10 words.

Do not add any other sections.
`;

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    MODEL +
    ":generateContent";

  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  const response = UrlFetchApp.fetch(url, {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-goog-api-key": apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();

  Logger.log("Response code: " + responseCode);

  if (responseCode !== 200) {
    throw new Error(
      "Gemini API error " + responseCode + ": " + responseText
    );
  }

  const data = JSON.parse(responseText);

  const generatedText =
    data.candidates[0].content.parts[0].text;

  Logger.log(generatedText);

  // Extract each section
  const linkedin = generatedText
  .split("LINKEDIN:")[1]
  .split("X:")[0]
  .trim();

  const xPost = extractSection(
    generatedText,
    "X:",
    "INSTAGRAM:"
  );

  const instagram = extractSection(
    generatedText,
    "INSTAGRAM:",
    "TITLE:"
  );

  const titlePart = generatedText.split("TITLE:");

  const title = titlePart.length > 1
    ? titlePart[1].trim()
    : "";

  // Write results into Columns B-E
  sheet.getRange(row, 2).setValue(linkedin);
  sheet.getRange(row, 3).setValue(xPost);
  sheet.getRange(row, 4).setValue(instagram);
  sheet.getRange(row, 5).setValue(title);
  sheet.getRange(row, 6).setValue("Generated");

  SpreadsheetApp.getUi().alert(
    "Done! Your social media posts are ready."
  );
}


// Extract text between two section labels
function extractSection(text, startLabel, endLabel) {
  const start = text.indexOf(startLabel);

  if (start === -1) {
    return "";
  }

  const contentStart = start + startLabel.length;
  const end = text.indexOf(endLabel, contentStart);

  if (end === -1) {
    return text.substring(contentStart).trim();
  }

  return text.substring(contentStart, end).trim();
}


// Add the AI Content menu to Google Sheets
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("AI Content")
    .addItem("Generate Posts", "generateContent")
    .addToUi();
}


// Automatically generate content when Column A is edited
function onEdit(e) {
  const range = e.range;

  // Only react to edits in Column A
  if (range.getColumn() !== 1) return;

  // Don't process the header
  if (range.getRow() === 1) return;

  // Don't run if the cell was cleared
  if (!range.getValue()) return;

  generateContent(range.getRow());
}
