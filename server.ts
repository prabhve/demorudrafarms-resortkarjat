import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));

// In-memory bookings/inquiries store with sanitization
interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  mealPlan: string;
  specialRequests?: string;
  estimatedTotal: number;
  createdAt: string;
}

const inquiries: InquiryRecord[] = [];

// Security: simple sanitize function
function sanitizeString(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim();
}

// Resort info endpoint
app.get('/api/resort-info', (_req: Request, res: Response) => {
  res.json({
    name: 'Rudra Farms and Resort Karjat',
    tagline: 'Luxury Nature Stay & Private Farmhouse',
    address: 'Old Mumbai - Pune Highway, V7J8+6M Vinegaon, Karjat Chowk, Maharashtra 410206',
    googleMapsUrl: 'https://www.google.com/maps/place/Rudra+Farms+and+Resort+Karjat+Chowk+%2F+vinegaon/@18.8805054,73.2667106,838m/data=!3m2!1e3!4b1!4m10!3m9!1s0x3be7e3f5c79e0df9:0xc65aecad9b919e45!5m3!1s2026-11-01!4m1!1i2!8m2!3d18.8805054!4d73.2667106!16s%2Fg%2F11rn0rv4x1',
    coordinates: { lat: 18.8805054, lng: 73.2667106 },
    phoneNumbers: ['+919082951341', '+919819028633', '+918976828632'],
    whatsapp: '919082951341',
    email: 'bookings@rudrafarmsandresort.com',
    checkInTime: '12:00 PM',
    checkOutTime: '11:00 AM',
    petFriendly: true,
    distanceFromMumbai: '68 km (~1.5 hours via Mumbai-Pune Expressway)',
    distanceFromPune: '85 km (~1.5 - 2 hours via Expressway)',
    nearestRailwayStation: 'Chowk Railway Station (6 km) / Karjat Junction (13 km)'
  });
});

// Booking Inquiry endpoint with input validation and security protection
app.post('/api/inquiry', (req: Request, res: Response) => {
  try {
    const { name, phone, email, checkIn, checkOut, guests, roomType, mealPlan, specialRequests, estimatedTotal } = req.body;

    const cleanName = sanitizeString(name);
    const cleanPhone = sanitizeString(phone);
    const cleanEmail = sanitizeString(email);
    const cleanRoomType = sanitizeString(roomType);
    const cleanMealPlan = sanitizeString(mealPlan);
    const cleanRequests = sanitizeString(specialRequests);

    if (!cleanName || cleanName.length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name.' });
    }

    if (!cleanPhone || cleanPhone.replace(/[^0-9]/g, '').length < 10) {
      return res.status(400).json({ error: 'Please enter a valid 10-digit phone/WhatsApp number.' });
    }

    if (!checkIn || !checkOut) {
      return res.status(400).json({ error: 'Please specify both check-in and check-out dates.' });
    }

    const numGuests = Math.max(1, Number(guests) || 1);
    const quoteTotal = Math.max(0, Number(estimatedTotal) || 0);

    const bookingId = `RDF-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    const newRecord: InquiryRecord = {
      id: bookingId,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      checkIn: String(checkIn),
      checkOut: String(checkOut),
      guests: numGuests,
      roomType: cleanRoomType || 'Villa / Suite',
      mealPlan: cleanMealPlan || 'Breakfast Included',
      specialRequests: cleanRequests,
      estimatedTotal: quoteTotal,
      createdAt: new Date().toISOString()
    };

    inquiries.push(newRecord);

    return res.status(201).json({
      success: true,
      bookingId,
      message: 'Booking inquiry received successfully. The Rudra Farms team will contact you shortly.',
      record: newRecord
    });
  } catch (err: unknown) {
    console.error('Error handling inquiry:', err);
    return res.status(500).json({ error: 'Failed to process inquiry. Please try again or WhatsApp us directly.' });
  }
});

// AI Concierge Chat endpoint (uses Gemini API if available, with intelligent contextual fallback)
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, language = 'en', conversationHistory = [] } = req.body;
    const cleanMessage = sanitizeString(message);

    if (!cleanMessage) {
      return res.status(400).json({ reply: 'Please send a question.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are "Rudra Concierge", the official virtual host and travel assistant for Rudra Farms and Resort Karjat (located in Vinegaon, Maharashtra, near Karjat Chowk).
Key facts about the resort:
- Location: Old Mumbai - Pune Hwy, Vinegaon, Karjat Chowk, Maharashtra 410206 (Plus code V7J8+6M).
- 90 mins from Mumbai & Pune via Mumbai-Pune Expressway (take Chowk/Khalapur exit).
- Accommodation: 4BHK Private Pool Villa, Deluxe Poolside Cottages, Executive Suites, and Group Dormitory.
- Amenities: Sparkling private swimming pool with rain dance, 4-acre landscaped party lawn, bonfire & barbecue setup, indoor/outdoor sports (cricket pitch, badminton, carrom, chess), high-speed Wi-Fi, power backup, pet-friendly.
- Food: Authentic Maharashtrian farm-to-table cuisine (Chulha chicken, mutton sukka, pitla bhakri, fresh paneer, solkadhi, high tea snacks like kanda bhaji, misal pav). Veg & Non-Veg prepared separately with hygiene.
- Policies: Check-in 12:00 PM, Check-out 11:00 AM. Music permitted on lawn till 10:00 PM per local norms, indoor music allowed after. Pets are welcome.
- Nearby attractions: Morbe Dam (8 km), ND's Film Studio (9 km), Bhivpuri Waterfall (14 km), Kothaligad Fort, Kondana Caves.
- Contact for booking: WhatsApp / Call +91 90829 51341 / +91 98190 28633.

Provide warm, polite, concise hospitality responses.
Current user language is: ${language} (if 'hi', respond in clear conversational Hindi; if 'mr', respond in warm conversational Marathi; if 'en', respond in polished English).
Always invite them to reserve directly on the website or via WhatsApp. Keep responses within 2-4 sentences.`;

        const contents = [];
        // append recent history if any
        if (Array.isArray(conversationHistory)) {
          for (const item of conversationHistory.slice(-4)) {
            if (item.sender === 'user') {
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'bot') {
              contents.push({ role: 'model', parts: [{ text: item.text }] });
            }
          }
        }
        contents.push({ role: 'user', parts: [{ text: cleanMessage }] });

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: contents,
          config: {
            systemInstruction
          }
        });

        const replyText = response.text?.trim() || '';
        if (replyText) {
          return res.json({ reply: replyText });
        }
      } catch (geminiError: unknown) {
        console.warn('Gemini API call failed, falling back to local concierge rules:', geminiError);
      }
    }

    // Contextual Fallback Concierge responses if API key is not ready or rate-limited
    const lower = cleanMessage.toLowerCase();
    let reply = '';

    if (lower.includes('route') || lower.includes('reach') || lower.includes('distance') || lower.includes('location') || lower.includes('kahan') || lower.includes('rasta') || lower.includes('mumbai') || lower.includes('pune')) {
      if (language === 'hi') {
        reply = 'रुद्र फार्म्स एंड रिसॉर्ट विनेगांव, कर्जत में पुराने मुंबई-पुणे हाईवे के पास स्थित है (चौक रेलवे स्टेशन से सिर्फ 6 किमी)। मुंबई या पुणे से एक्सप्रेसवे द्वारा लगभग 1.5 से 2 घंटे में आसानी से पहुंचा जा सकता है।';
      } else if (language === 'mr') {
        reply = 'रुद्र फार्म्स अँड रिसॉर्ट विनेगाव, कर्जत येथे जुन्या मुंबई-पुणे महामार्गावर आहे (चौक स्टेशनपासून ६ किमी). मुंबई व पुण्याहून एक्सप्रेसवेने केवळ १.५ ते २ तासांत पोहोचता येते.';
      } else {
        reply = 'Rudra Farms & Resort is nestled in Vinegaon, Karjat on the Old Mumbai - Pune Highway (6 km from Chowk Station, 13 km from Karjat Junction). It is an easy 90-minute drive from both Mumbai and Pune via the Expressway.';
      }
    } else if (lower.includes('pool') || lower.includes('swimming') || lower.includes('swim') || lower.includes('talav')) {
      if (language === 'hi') {
        reply = 'जी हाँ! हमारे पास साफ और सुरक्षित प्राइवेट स्विमिंग पूल, किड्स सेक्शन और रेन डांस की सुविधा उपलब्ध है जो सुबह 7 बजे से रात 9 बजे तक खुली रहती है।';
      } else if (language === 'mr') {
        reply = 'होय! आमच्याकडे स्वच्छ व सुरक्षित खाजगी स्विमिंग पूल आणि रेन डान्स सुविधा उपलब्ध आहे. वेळ सकाळी ७:०० ते रात्री ९:००.';
      } else {
        reply = 'Yes! We have a crystal-clear private swimming pool with sun loungers and rain dance setup, open for guests from 7:00 AM to 9:00 PM.';
      }
    } else if (lower.includes('food') || lower.includes('khana') || lower.includes('veg') || lower.includes('non-veg') || lower.includes('meal') || lower.includes('menu') || lower.includes('jevan')) {
      if (language === 'hi') {
        reply = 'हम प्रामाणिक महाराष्ट्रीयन चूल्हा चिकन, मटन सुक्का, पिठलं भाकरी, ताज़ा पनीर और सोलकढ़ी के साथ-साथ बारबेक्यू भी सर्व करते हैं। शाकाहारी और मांसाहारी भोजन अलग-अलग बर्तनों में तैयार किया जाता है।';
      } else if (language === 'mr') {
        reply = 'आम्ही अस्सल महाराष्ट्रीयन चुलीवरचे जेवण (गावरान चिकन, मटण, पिठलं भाकरी, सोलकढी) आणि ताज्या भाज्या पुरवतो. शाकाहारी व मांसाहारी स्वयंपाक पूर्णपणे स्वतंत्र केला जातो.';
      } else {
        reply = 'We serve authentic farm-fresh Maharashtrian cuisine including Chulha Chicken, Mutton Sukka, Pitla Bhakri, fresh Paneer dishes, Solkadhi, and evening live Barbecue! Veg and non-veg kitchens are strictly maintained.';
      }
    } else if (lower.includes('pet') || lower.includes('dog') || lower.includes('kutta') || lower.includes('kutra')) {
      if (language === 'hi') {
        reply = 'जी बिल्कुल! रुद्र फार्म्स एंड रिसॉर्ट पूरी तरह से पेट-फ्रेंडली (पालतू जानवरों के अनुकूल) है। आपके चार पैरों वाले साथी हमारे 4 एकड़ के हरे-भरे लॉन में सुरक्षित खेल सकते हैं।';
      } else if (language === 'mr') {
        reply = 'नक्कीच! रुद्र फार्म्स अँड रिसॉर्ट पूर्णपणे पेट-फ्रेंडली आहे. आपले पाळीव प्राणी आमच्या प्रशस्त बागेत मनसोक्त फिरू शकतात.';
      } else {
        reply = 'Absolutely! Rudra Farms and Resort is 100% pet-friendly. Your furry companions are welcome to enjoy the sprawling 4-acre green lawns.';
      }
    } else if (lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('book') || lower.includes('kitna') || lower.includes('charges')) {
      if (language === 'hi') {
        reply = 'हमारे कमरों की दरें ₹3,999 प्रति रात से शुरू होती हैं और पूरा 4BHK प्राइवेट विला ₹18,999 से। आप ऊपर दिए गए "स्टे कैलकुलेटर" से तुरंत अपनी तारीखों के अनुसार सटीक कोटेशन देख सकते हैं या सीधे व्हाट्सएप पर संपर्क कर सकते हैं (+91 90829 51341)!';
      } else if (language === 'mr') {
        reply = 'आमच्या कॉटेजचे दर ₹३,९९९/रात्र आणि संपूर्ण खाजगी 4BHK व्हिला ₹१८,९९९ पासून सुरू होतात. आपण वेबसाइटवरील "स्टे कॅल्क्युलेटर" वापरून किंवा थेट व्हॉट्सॲपवर (+91 90829 51341) चौकशी करू शकता.';
      } else {
        reply = 'Our stay packages start from ₹3,999/night for deluxe cottages and ₹18,999 for the full private 4BHK pool villa. You can use our interactive Stay Calculator on this page for an instant customized estimate or message us on WhatsApp (+91 90829 51341)!';
      }
    } else {
      if (language === 'hi') {
        reply = 'नमस्ते! रुद्र फार्म्स एंड रिसॉर्ट कर्जत में आपका स्वागत है। आप हमारे कमरों, स्विमिंग पूल, शादी/पार्टी लॉन, भोजन पैकेज या मार्ग के बारे में कुछ भी पूछ सकते हैं, या सीधे +91 90829 51341 पर कॉल/व्हाट्सएप कर सकते हैं।';
      } else if (language === 'mr') {
        reply = 'नमस्कार! रुद्र फार्म्स अँड रिसॉर्ट कर्जत मध्ये आपले स्वागत आहे. खोल्या, स्विमिंग पूल, जेवण किंवा बुकिंग संदर्भात अधिक माहितीसाठी आपण कधीही विचारू शकता किंवा +91 90829 51341 वर संपर्क करू शकता.';
      } else {
        reply = 'Welcome to Rudra Farms and Resort Karjat! I am delighted to assist you with villa reservations, poolside amenities, authentic dining, driving directions from Mumbai/Pune, or hosting family/corporate gatherings. How can I help you today?';
      }
    }

    return res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    return res.status(500).json({ reply: 'Sorry, I am having trouble connecting right now. Please call or WhatsApp us directly at +91 90829 51341.' });
  }
});

// Setup Vite middleware in dev or serve static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Rudra Farms and Resort Karjat server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
