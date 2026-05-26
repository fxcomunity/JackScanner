export const getAiExplanation = async (domain, vulnerabilities) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) return "API Key not found.";

    const prompt = `You are an expert Cybersecurity Analyst. I scanned the domain ${domain} and found these vulnerabilities:
${vulnerabilities.map(v => `- ${v.name}: ${v.description} (Severity: ${v.severity})`).join('\n')}

Please provide:
1. A brief analysis of whether the domain name '${domain}' looks suspicious, like typo-squatting, or a phishing site (e.g., uses weird TLDs, dashes, looks like a fake bank/login).
2. An easy-to-understand explanation of the most critical vulnerability found, why it's dangerous, and a short example on how to fix it (e.g. Nginx/Apache config).
Keep it concise, under 200 words total, using Indonesian language. Format with clear spacing and bullet points.`;

    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error(err);
    return "Gagal menghubungi AI untuk analisis.";
  }
};
