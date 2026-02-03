import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { key } = req.body;

  if (!key) {
    return res.status(400).json({ valid: false, error: "No key provided" });
  }

  try {
    const filePath = path.join(process.cwd(), "adFreeData.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    const isValid = data.keys.some(entry => entry.key === key);

    return res.status(200).json({ valid: isValid });
  } catch (err) {
    console.error("Error reading adFreeData.json:", err);
    return res.status(500).json({ valid: false, error: "Server error" });
  }
}
