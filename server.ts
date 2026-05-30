import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { generateWebsiteCopy, regenerateSection } from "./src/lib/gemini";
import { BusinessInputSchema, CopySchema } from "./src/lib/schemas/copy-schema";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route
  app.post("/api/generate", async (req, res) => {
    try {
      const body = req.body;
      
      const parsedBody = BusinessInputSchema.safeParse(body);
      
      if (!parsedBody.success) {
        return res.status(400).json({ error: 'Invalid or missing fields', details: parsedBody.error.format() });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured.' });
      }

      const copy = await generateWebsiteCopy(parsedBody.data);
      res.json({ copy });

    } catch (error: any) {
      console.error('Generation error:', error);
      res.status(500).json({ error: error.message || 'Copy generation failed. Check your inputs and API key.' });
    }
  });

  app.post("/api/regenerate", async (req, res) => {
    try {
      const { input, currentCopy, section } = req.body;
      
      const parsedInput = BusinessInputSchema.safeParse(input);
      const parsedCopy = CopySchema.safeParse(currentCopy);
      
      if (!parsedInput.success || !parsedCopy.success || !section) {
        return res.status(400).json({ error: 'Invalid or missing fields' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured.' });
      }

      const updatedSection = await regenerateSection(parsedInput.data, parsedCopy.data, section);
      res.json({ sectionData: updatedSection });

    } catch (error: any) {
      console.error('Regeneration error:', error);
      res.status(500).json({ error: error.message || 'Copy regeneration failed.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
