import { GoogleGenAI, Type, Schema } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
  try {
    // 1. Basic auth check to protect this route
    // const session = await getServerSession(authOptions);
    // if (!session) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('image');
    const type = formData.get('type');

    if (!file) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: 'GEMINI_API_KEY is not configured in .env.local' }, { status: 500 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString('base64');
    const mimeType = file.type;

    let prompt = '';
    let schema = null;

    if (type === 'certificate') {
      prompt = `Extract the following details from this certificate image:
      1. Title of the certificate
      2. Issuer or Organization name
      3. Date of issue (format like Aug 2024 or 2024)
      4. A short description (1-2 sentences) of what this certificate is for.
      Respond strictly in JSON format matching the schema.`;
      
      schema = {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          issuer: { type: Type.STRING },
          date: { type: Type.STRING },
          description: { type: Type.STRING },
        }
      };
    } else if (type === 'project') {
      prompt = `Extract the following details from this project screenshot or banner:
      1. Project Title
      2. A short description (2-3 sentences)
      3. A list of comma-separated technologies/frameworks visible or implied.
      Respond strictly in JSON format matching the schema.`;
      
      schema = {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          technologies: { type: Type.STRING },
        }
      };
    } else if (type === 'hackathon') {
      prompt = `Extract details from this hackathon photo or certificate.
      Return JSON with:
      - title: The name of the hackathon event
      - date: Date of the event (string)
      - description: Write a very professional, detailed description (3-4 sentences) highlighting the event, skills, and achievements shown.`;

      schema = {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          date: { type: Type.STRING },
          description: { type: Type.STRING },
        }
      };
    } else {
      return Response.json({ error: 'Invalid type provided' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: mimeType
                }
            }
        ],
        config: {
            responseMimeType: "application/json",
            responseSchema: schema,
        }
    });

    const parsed = JSON.parse(response.text);
    
    return Response.json({ success: true, data: parsed });

  } catch (error) {
    console.error('AI Extraction Error:', error);
    return Response.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
