const openai = require("../api/GroqClient");
const Tesseract = require('tesseract.js');
const fs = require('fs');
const User = require("../models/User");

exports.Upload = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Report file is required" });
  }

  const filePath = req.file.path;

  try {
   
    const result = await Tesseract.recognize(filePath, 'eng');
    const rawtext = result.data.text;

    const hindiprompt = `तुम एक सहायक चिकित्सा सहायक हो। नीचे दिए गए मेडिकल रिपोर्ट को सरल, स्पष्ट और पेशेवर हिंदी (देवनागरी लिपि) में संक्षेपित करो।

• उत्तर बिंदुवार (•) में दो  
• हर जानकारी एक नई लाइन पर हो  
• लक्षण, परीक्षण, रोगी की जानकारी, मेडिकल इतिहास, निदान और निष्कर्ष — सबको अलग-अलग बिंदुओं में दिखाओ  
• अगर किसी सेक्शन की जानकारी रिपोर्ट में नहीं है, तो भी अनुमान लगाकर सामान्य जानकारी दो — जैसे "रिपोर्ट में निदान स्पष्ट नहीं है, पर लक्षणों के अनुसार यह हृदय संबंधी हो सकता है"  
• किसी भी पैराग्राफ या * का प्रयोग मत करो  ( NOTE IT IMP NO * SYMBOL)
• उत्तर केवल हिंदी में हो और भाषा आसान रखो  
• कोई भी इंग्लिश शब्द मत लिखो

केवल रिपोर्ट का सारांश दो, कोई सलाह या इलाज नहीं।
`;

    const englishPrompt = `You are a helpful medical assistant. Read the following medical report and summarize it in clean, simple bullet points.

• Each point should be on a new line with a (•) bullet  
• Separate patient info, symptoms, tests, medical history, diagnosis, and observations into different bullets  
• If any section is missing or incomplete, try to infer a relevant summary or add general information as context  
• Do not use paragraphs or asterisks — only bullet points  
• Use simple, professional English that’s easy to read  
• Do NOT include any treatment or recommendations
( NOTE IT IMP NO * SYMBOL)
• AND BE CONCISE JUST SUMMARY IN EASY WORDS

Only return the bullet-point summary of the report.
`;

 const medPrompt = `You have read the following medical report, give proper medications according to report , it should have quantity also 
 , also home remedies section also separate , its to help village people so simple language

• Each point should be on a new line with a (•) bullet  
• Separate medecines, home remedies, required tests and precautions to take ,  into different bullets  
 
• Do not use paragraphs or asterisks — only bullet points  
• Use simple, professional English that’s easy to read  

( NOTE IT IMP NO * SYMBOL)
• format should be like a whatsapp message 
 `

    // 📦 Send prompt + OCR'd text to LLM
    const hindiresponse = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: hindiprompt.trim()
        },
        {
          role: "user",
          content: rawtext
        }
      ],
    });
    const englishresponse = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: englishPrompt.trim()
        },
        {
          role: "user",
          content: rawtext
        }
      ],
    });
    const medresponse = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: medPrompt.trim()
        },
        {
          role: "user",
          content: rawtext
        }
      ],
    });
    


    const hindisummary = hindiresponse.choices[0].message.content;
    const englishsummary = englishresponse.choices[0].message.content;
    const medsummary = medresponse.choices[0].message.content;

    if (req.user && req.user.userId) {
      await User.findByIdAndUpdate(req.user.userId, { $inc: { totalReports: 1 } });
    }

  

    // 📤 Return both raw OCR and Hindi summary
    res.json({  hindisummary , englishsummary , medsummary,waLink: `https://wa.me/${req.body.phone || ''}?text=${encodeURIComponent(medsummary)}`});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OCR or AI summarization failed." });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};
