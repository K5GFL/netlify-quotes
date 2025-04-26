// netlify/functions/quote.js

// Define your quotes - moved from HTML to an array of objects
const quotes = [
  { text: "ogey", author: "rrat" },
  { text: "<strong>FUN FACT:</strong> The callsign \"<strong>N1KKE</strong>\" is currently available." },
  { text: "<strong>Getting jammed?</strong> Just say no. Your jammer legally cannot transmit over you without mutual consent." },
  { text: "I don't know either." },
  { text: "It's not 'stalking', it's a one-way QSL" },
  { text: "Doxed Myself to Everybody Award" },
  { text: "<strong>DID YOU KNOW?:</strong> JavaScript was created by Satan to trick web devs into thinking they were learning a logical and reasonable programming language." },
  { text: ":3", author: "- Lenna" },
  { text: "I don't have Ovaltine<br />Please stop telling me to drink it" },
  { text: "<code>echo \"${HAM_RADIO_QUOTE}\"</code>" },
  { text: "Congratulations!" },
  { text: "Oh yeah? My dad is the CEO of the ARRL and he'll ban your HAM account" },
  { text: "The SSTVs of Oriental cartoons will continue until morale improves." },
  { text: "Anything is an antenna if you're brave enough" },
  { text: "All your repeater are belong to us" },
  { text: "The haters told me I'd blow out my finals and they were right. Shout out to the haters" },
  { text: "Marconi's Home For Imaginary Telegraphs" },
  { text: "FOXHUNT (The Man Who Sold The Yagi)" },
  { text: "Nihahaha...?" },
  { text: "We Didn't Start The Pileup" },
  { text: "<strong><em>FCC WE HAVE A PROBLEM FCC WE HAVE A PROBLEM FCC WE HAVE A PROBLEM</em></strong>" },
  { text: "Geoffrey, can you make me a sandwich?", author: "- NoOooOOOO" },
  { text: "<strong>NOTICE:</strong> You just lost <a href=\"https://en.wikipedia.org/wiki/The_Game_(mind_game)\" target=\"_blank\" rel=\"noopener noreferrer\">The Game</a>." }, // Added target blank for iframe context
  { text: "If you're not at risk of dying horribly, are you really engineering?" },
  { text: "<em>cans.wav</em>" },
  { text: "<span style=\"color: #fba9ba;\">Bau</span><span style=\"color: #67b2ff;\">bau</span><span style=\"color: #fba9ba;\">bau</span><span style=\"color: #67b2ff;\">bau</span><span style=\"color: #fba9ba;\">bau</span><span style=\"color: #67b2ff;\">bau</span>feng" },
  { text: "\"[47 CFR § 97.113(a)(4)], you have no signal\"<br />\"I'm incognito\"", author: "- 7200 kHz" },
  { text: "\"My strange behavior led to an outburst\"", author: "- The Pharcyde" },
  { text: "The sign is a subtle joke" },
  { text: "⦂▶" },
  { text: "How many poor boomers have I inadvertently introduced to 2D at this point?" },
  { text: "Head Coordinator of <em>\"Dorks on the Air\"</em>" },
  { text: "<strong>FACT:</strong> It's not a real weak signal mode if it doesn't take a day to complete a QSO." },
  { text: "[47 CFR § 97.113(a)(4)] it we ball<br />[47 CFR § 97.113(a)(4)] it we ball<br />[47 CFR § 97.113(a)(4)] it we ball" },
  { text: "我成了廉价中国收音机的俘虏" },
  { text: "No one in this hobby will understand even a quarter of the references in this quote box and that makes me sad" },
  { text: "Women fear me<br />Stations fear me<br />Men turn their dials away from me as I push to talk<br />No transceivers dare send a signal in my presence<br />I am alone on this barren earth" },
  { text: "末期オタク、進んで布教中" },
  { text: "Ei!", author: "- Ei!" },
  { text: "Help I don't know how to turn on a radio please send Elmer's Glue" },
  { text: "Pretending to know Python..." },
  { text: "Can't wait for future me to die of cringe from this one" },
  { text: "No refunds!" },
  { text: "tbh i just used claude to generate the code for this quote box" },
  { text: "Watch me do literally nothing on <a href=\"https://github.com/K5GFL\" target=\"_blank\" rel=\"noopener noreferrer\">GitHub!</a>" }, // Added target blank
  { text: "Have they made an \"Amateur Radio Net\" net yet?" },
  { text: "<em><strong>YOU'RE SUPPOSED TO BE FILTERING THESE QUOTES, ENGINEER!</strong></em>" },
  { text: "The right mode in the wrong frequency makes all the difference in the world.<br />So wake up, Mr. Control Operator.<br />Wake up and smell the jamming..." },
  { text: "<span style=\"color: #789922\">>.-.. / . / .- / .-. / -. | -.-. / .-- | -... / -.-- | ... / --- / ..- / -. / -..</span><br /><span style=\"color: #789922\">>.... / .- / ...- / . | ..--- | .-. / . / .- / -.. | .. / -</span>" },
  { text: "What're you gonna do, QRM me?", author: "- Man Who Got QRMed" },
  { text: "Aooh...", author: "- A precious soul" },
  { text: "\"Can we talk about transmitters and antennas?\"<br />\"That's terrible.\"", author: "- 7200 kHz" },
  { text: "\"[Your signal] sounds like garbage\"<br />\"I love garbage\"", author: "- 7200 kHz" },
  { text: "\"And your father was a sasquatch.\"", author: "- 7200 kHz" },
  { text: "Local HAMs In Your Area Want To QSO... Badly!" },
  { text: "Static enjoyers HATE him! Destroy peace and quiet with a simple phrase: \"<strong>CQ POTA, CQ POTA</strong>\"" },
  { text: "finna crash out on the radio no cap on god fr yuh yuh" },
  { text: "What's the Mason Dixon have to do with antennas", author: "- HRCC Discord" },
  { text: "K5GFL just got down bye bye bye bye bye" },
  { text: "<strong>TIP:</strong> Bro I promise if you just scream into your mic it's a 1000 watt amp bro just trust me on this one" },
  { text: "<strong>\"FUN\" FACT:</strong> I stayed up until 4 AM trying to get this quote generator working. It probably wasn't worth it." },
  { text: "[47 CFR § 97.113(a)(4)]IN' THING <em>SUCKS!</em>", author: "- Bill O'Reilly" },
  { text: "Old Man Yells At FT8" },
  { text: "I genuinely promise I didn't make this to farm the lookup counter" },
  { text: "Don't believe every quote you see on the internet is real.", author: "- Abraham Lincoln" },
  { text: "\"I cracked-up laughing at a French guy on the radio who said, passionately, \'Milk is for baby cows!'\"", author: "- Terry A. Davis (SK)" },
  { text: "\"What's reality? I don't know. When my bird was looking at my computer monitor I thought, 'That bird has no idea what he’s looking at.' And yet what does the bird do? Does he panic? No, he can't really panic, he just does the best he can. Is he able to live in a world where he's so ignorant? Well, he doesn't really have a choice. The bird is okay even though he doesn't understand the world. You're that bird looking at the monitor, and you're thinking to yourself, 'I can figure this out.' Maybe you have some bird ideas. Maybe that's the best you can do.\"", author: "- Terry A. Davis (SK)" },
  { text: "Now in Technicolor!" },
  { text: "<em>YOU AIN'T FROM MICHIGAN IF YOU NEVER DONE THIS BEFO'</em><br /><strong><em>*blows up amplifier*</em></strong>" },
  { text: "This is the 69th quote of my quote list.<br />Nice" },
  { text: "CALLING CQ AT 3 AM CHALLENGE (DO NOT ATTEMPT!!) <span style=\"color: #d22b2b;\">O <---</span>" },
];

exports.handler = async (event, context) => {
  // Select a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  // Generate the HTML for the selected quote
  let quoteHtml = `<div class="quote-text">${selectedQuote.text}</div>`;
  if (selectedQuote.author) {
    quoteHtml += `<div class="quote-author">${selectedQuote.author}</div>`;
  }

  // Generate the full HTML page
  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>K5GFL Real Quote Bro</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            background-color: #000; /* Or transparent if you want QRZ bg */
            color: #fff;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .quote-container {
            display: flex; /* Keep flex for alignment */
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 300px; /* Match iframe width minus padding */
            height: 150px; /* Match iframe height minus padding */
            text-align: center;
            padding: 10px; /* Adjust padding as needed */
            border-radius: 5px;
            box-sizing: border-box; /* Include padding in dimensions */
        }

        .quote {
            /* No longer needs display: none; opacity: 0; */
            /* The animation handles the fade-in */
            animation: fadeIn 1.5s ease-in forwards; /* Adjust duration if needed */
            width: 100%;
        }

        .quote-text {
            font-size: 16px;
            margin-bottom: 10px;
            line-height: 1.4;
        }

        .quote-author {
            font-style: italic;
            font-size: 14px;
            margin-top: 5px;
            color: #ccc; /* Slightly different color for author */
        }

        a { /* Style links explicitly if needed */
            color: #67b2ff; /* Example link color */
            text-decoration: none;
        }
         a:hover {
            text-decoration: underline;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</head>
<body>
    <div class="quote-container">
        <!-- Only the selected quote is rendered -->
        <div class="quote">
            ${quoteHtml}
        </div>
    </div>
    <!-- No script tag needed anymore! -->
</body>
</html>
  `;

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html",
      // You could add caching headers here if desired
      // "Cache-Control": "no-cache" // Disable caching to get a new quote often
    },
    body: fullHtml,
  };
};
