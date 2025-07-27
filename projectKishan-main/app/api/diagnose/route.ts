import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

function cleanJSONText(text: string): string {
  // Remove ```json or ``` from beginning/end
  return text
    .replace(/^```json\s*/i, '')  // Remove ```json at the start (case-insensitive)
    .replace(/^```/, '')          // Remove any leading ```
    .replace(/```$/, '')          // Remove trailing ```
    .trim();
}

function tryParseResponse(text: string): any {
  let structured;

  // Step 1: Try parsing raw text directly
  try {
    return JSON.parse(text);
  } catch {

    try {
      const cleaned = cleanJSONText(text);
      return JSON.parse(cleaned);
    } catch {
      try {
        const start = text.indexOf('{');
        const end = text.lastIndexOf('}') + 1;
        if (start >= 0 && end > start) {
          const extracted = text.substring(start, end);
          return JSON.parse(extracted);
        }
      } catch { }
    }
  }

  // Step 2: Try parsing after cleaning ```json blocks


  // Step 3: If still fails, try extracting {...} from within the string


  // Step 4: All methods failed — return null or throw
  return null;
}


const API_KEY = process.env.GOOGLE_GENAI_API_KEY || '';

const prompt = (language: string) => `
You are an expert in identifying plant leaf diseases. Given the image of a leaf, respond ONLY in this strict JSON format, nothing else:

{
  "question1": "What is the likely disease or pest?",
  "question2": "What caused it?",
  "question3": "How serious is it?",
  "question4": "What are simple, affordable, and locally available treatment or prevention steps a small-scale farmer in India can take?"
}

Use simple, rural-friendly language. No extra commentary, no explanations outside the JSON. The JSON keys must remain unchanged. Give answer in ${language}. Do not give more than 70 words for each answer.
`;


function extractSection(text: string, regex: RegExp): string {
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}



export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;
    const language = formData.get('language')?.toString() || 'English';


    if (!file) {
      return NextResponse.json({ error: 'No image received' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString('base64');

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: file.type,
          data: base64Image,
        },
      },
      {
        text: prompt(language),
      },
    ]);

    const response = await result.response;
    const text = await response.text();

    console.log(text)

    const structured = tryParseResponse(text);

    if (!structured) {
      return NextResponse.json(
        {
          error: "Model response was not valid JSON",
        },
        { status: 500 }
      );
    }


    return NextResponse.json({ result: structured }, { status: 200 });
  } catch (error: any) {
    console.error('Error in disease analysis:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
