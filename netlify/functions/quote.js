// netlify/functions/quote.js

// Define your quotes - moved from HTML to an array of objects
const quotes = [
  { text: "ogey", author: "rrat" },
  { text: "<strong>FUN FACT:</strong> The callsign \"<strong>N1KKE</strong>\" is currently available." },
  { text: "<strong>Getting jammed?</strong> Just say no. Your jammer legally cannot transmit over you without mutual consent." },
  { text: "I don't know either." },
  { text: "It's not 'stalking', it's a one-way QSL" },
  { text: "<span style=\"color: #ffd700\">Doxed Myself to Everybody Award</span>" },
  { text: "<strong>DID YOU KNOW?:</strong> JavaScript was created by Satan to trick web devs into thinking they were learning a logical and reasonable programming language." },
  { text: ":3", author: "- Lenna" },
  { text: "I don't have Ovaltine<br />Please stop telling me to drink it" },
  { text: "<code>echo \"${HAM_RADIO_QUOTE}\"</code>" },
  { text: "Congratulations!" },
  { text: "Oh yeah? My dad is the CEO of the ARRL and he'll ban your HAM account" },
  { text: "The SSTVs of Oriental cartoons will continue until morale improves." },
  { text: "Anything is an antenna if you're brave enough" },
  { text: "<strong>QUOOOOTTEE 15! GIVE IT UP FOR QUOOOOTE 15!</strong>" },
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
  { text: "\"Don't believe every quote you see on the internet is real.\"", author: "- Abraham Lincoln" },
  { text: "\"I cracked-up laughing at a French guy on the radio who said, passionately, \'Milk is for baby cows!'\"", author: "- Terry A. Davis (SK)" },
  { text: "\"What's reality? I don't know. When my bird was looking at my computer monitor I thought, 'That bird has no idea what he’s looking at.' And yet what does the bird do? Does he panic? No, he can't really panic, he just does the best he can. Is he able to live in a world where he's so ignorant? Well, he doesn't really have a choice. The bird is okay even though he doesn't understand the world. You're that bird looking at the monitor, and you're thinking to yourself, 'I can figure this out.' Maybe you have some bird ideas. Maybe that's the best you can do.\"", author: "- Terry A. Davis (SK)" },
  { text: "<span style=\"color: #ff140c\">Now</span> <span style=\"color: #00b200\">in</span> <span style=\"color: #424eff\">Technicolor!</span>" },
  { text: "<em>YOU AIN'T FROM MICHIGAN IF YOU NEVER DONE THIS BEFO'</em><br /><strong><em>*blows up amplifier*</em></strong>" },
  { text: "This is the 69th quote of my quote list.<br />Nice" },
  { text: "CALLING CQ AT 3 AM CHALLENGE (DO NOT ATTEMPT!!) <span style=\"color: #d22b2b;\">O <---</span>" },
  { text: "We really need a POTAholics Anonymous group I'm being serious right now" },
  { text: "<strong>IT'S RADIOVER</strong>" },
  { text: "Yeah I like DX<br />De-Generation X, I mean.", author: "- THEM'S THE BREAKS LITTLE MAN, BREAK IT DOWN"},
  { text: "WE MAKING IT OUT OF THE NOISE FLOOR WITH THIS ONE 🔥🔥🔥" },
  { text: "[DATA EXPUNGED]" },
  { text: "YOU WOULDN'T DOWNLOAD A RADIO" },
  { text: "<strong>FACT:</strong> HOAs are the bane of my existence" },
  { text: "please whoever is reading this help me k5gfl put me into this quote box and i can't get out" },
  { text: "\"I've got one of them fancy amplificators\"", author: "- A good man on 80 meters" },
  { text: "Quagmire: Oh, my ham radio interferes with the radar gun. Talked to a fellow in Paupa New Guinea last night. You should come by sometime and join in the fun!<br /><em>[transition to cutaway gag]</em><br />P2 Operator: Hello?<br />Quagmire: H-hello?<br />P2 Operator: Are you bald?<br />Quagmire: ...Yeah.", author: "- Family Guy" },
  { text: "<span style=\"color: #789922\">>he can't build a dipole for 2200 meters</span><br />not gonna make it" },
  { text: "sus", author: "look guys i said the funny word, start laughing"},
  { text: "\"I am proposing a bill that would make it illegal to talk to any Canadian\"", author: "- 7200 kHz"},
  { text: "\"Actually I'm from Canada-\"<br /><em><strong>[Overwhelming amount of laughter]</strong></em>", author: "- 7200 kHz"}, // two canada quotes are necessary because both are golden
  { text: "4. The Spiritual Implications of Non-Associative Algebra" },
  { text: "\"I have <em>several</em> questions.\"", author: "- Jonathan Jafari"},
  { text: "\"Attention deficit disorder.\"<br /><em><strong>[EXTREMELY LOUD NOISE IMMEDIATELY FOLLOWS]</strong></em>", author: "- 3846 kHz"},
  { text: "Nn", author: "- Multiple iterations of a no good very bad (cute) wolf"},
  { text: "Shout out for N4S for being my first 1x1 QSO, you're the man"},
  { text: "the j"},
  { text: "Welcome to Roger's [47 CFR § 97.113(a)(4)] repeater- neighborhood, won't you be my neighbor too?", author: "- WA6RXZ (SK)"},
  { text: "Current RF burn count: like, 9"},
  { text: "<strong>NOTE:</strong> Hamsticks are not edible and are unfit for human consumption. Please do not try embracing a copper diet."},
  { text: "Did you remember to apply your antenna wax today for maximum gain?"},
  { text: "Yo ho yo ho it's a pileup's life for me"},
  { text: "Is it true that 80% of people on 80 meters drink 80 proof when on the air?"},
  { text: "<em><strong>[Strange digital noise is transmitted]</strong></em><br />\"AT&T.\"", author: "- 3846 kHz"},
  { text: "I hold no responsibility for whatever rabbit holes you fall down or interests you gain as a result of these quotes."},
  { text: "Call my wire carbon dioxide because it loves to burn some clouds"},
  { text: "Awaiting QSO retro-style, with smoke signals and messengers on horseback"},
  { text: "I'm too lazy to write up a good quote right now, come back later"},
  { text: "<strong>YOUR FORTUNE:</strong> Auspicious times are coming for your logbook"},
  { text: "Certified <a href=\"https://www.tailgatersnet.com/\" target=\"_blank\" rel=\"noopener noreferrer\">Freewheeler</a>! (I'll get onto the net someday)"},
  { text: "\"You're a [47 CFR § 97.113(a)(4)] drunk and you're a [47 CFR § 97.113(a)(4)].\"<br />\"Woah! You can't call people a drunk!\"", author: "- 7200 kHz"},
  { text: "\"You guys are some of the worst amateur radio operators I've ever heard. I guess that's why I'm still here.\"", author: "- 7200 kHz"},
  { text: "Let's go hunting!<br /><em>pileup</em> aw dang it<br /><em>pileup</em> aw dang it<br /><em>pileup</em> aw dang it"},
  { text: "[I] aM ALpharius Hydra dominatus. I drink red paint with my cerioes so do all my stuff faster each and every day. I win a lot and if not I use waggh and dakka. to remain hidden I wear a bright blue cloak I am the king. I monitor the chat rooms of sdrs. I am always watching", author: "- User \"......\", NA5B WebSDR chat"},
  { text: "not enough shunt resistors? can't load balance?<br />try 50 amps<br />just 50 amps all on one wire<br />no sensing no safety margin<br /><span style=\"color: #2adeef\"><strong>just amps</strong></span><br />you will certainly not regret 50 amps", author: "- A meme (Please do not do whatever a random meme tells you to do)"},
  { text: "\"K3FEF WAS ATTACKED BY AMISH FOR USING ELECTRONS AND PHOTONS -73 ITS QRV NOW\"", author: "- User \"Santa Rosa\", NA5B WebSDR chat"},
  { text: "One does not simply setup a Digirig"},
  { text: "Good morning, Krusty Krew!"},
  { text: "\"I don't know if he's wearing a Speedo or what-\"", author: "- 7200 kHz"},
  { text: "<span style=\"color: #789922\">>it takes 3 business days to get a simple email for a filled out callsign certificate template</span><br />ARRL moment"},
  { text: "You should see my cable management.<br />Actually, maybe you shouldn't..."},
  { text: "\"I may be stupid\"", author: "- Me, always"},
  { text: "Irrational attraction towards particular pencil strokes shall be defended on-air and you cannot stop it"},
  { text: "Bro revive me I have amplifier"},
  { text: "<input type=\"radio\" id=\"quotebutton\" value=\"uhhhhhhhhh\"><label for=\"quotebutton\">I put here a radio button! On the radio page! Radio button?! Radio page! Yeeahh, radio button ON the radio page!</label>"},
  { text: "Skywave: 2.0 You Can (Not) Propagate"},
  { text: "Sir, this is a <s>Wendy's</s> gout net"},
  { text: "\"Chicken jockey!\"", author: "- Jack Black, unaware of what he has brought upon society"},
  { text: "VVVVVVVVVVVVVVV"},
  { text: "CS D0RKS, CS D0RKS"},
  { text: "Please support Charlie WA5AIR's <a href=\"https://southcoastreflector.com/\ target=\"_blank\" rel=\"noopener noreferrer\">South Coast Reflector</a> repeater system I actually like it a lot"},
  { text: "\"Sometimes, I dream about cheese...\"", author: "- Male 02"},
  { text: "'feng 'fing 'fang 'fong"},
  { text: "<strong>THE RFI IS</strong><br /><strong>TOO DANG HIGH</strong>"},
  { text: "<strong>FUN FACT:</strong> The callsign \"<strong>K5GFL</strong>\" is currently <em>not</em> available." },
  { text: "My body is QRV"},
  { text: "<a href=\"https://www.youtube.com/watch?v=dQw4w9WgXcQ\" target=\"_blank\" rel=\"noopener noreferrer\">Guys, the ARRL just made a HUGE announcement!</a>"}, // I... I'm the boomer?
  { text: "<strong>BRRRRRRRRTTT</strong><br /><strong>BRRRRRRRRTTT</strong><br /><strong>BRRRRRRRRTTT</strong>", author: "- 4625 kHz"},
  { text: "Never tell someone to shut up. That's rude. Instead, tell them to run their mouth on QRPP (or you'll do it for them)."},
  { text: "<span style=\"color: #ffd700\">Doesn't Know How To Actually Code in CSS Award</span>"},
  { text: "<strong>YOUR FORTUNE:</strong> Prepare an offering for Helios. You'll need it."},
  { text: "Autistic nitpicking of my QRZ page is le good, actually"},
  { text: "\"<em>NEEEEEEEEEEEERRRRRRRRRRRRRDDDDDDD!</em>\"", author: "- Homer Simpson"},
  { text: "Forgetting to re-spot people on the POTA site after a QSO since 2025!<br />(Sorry.)"},
  { text: "9"},
  { text: "Zeroth Class CW Operator"},
  { text: "belorted"},
  { text: "AGN? AGN? AGN?"},
  { text: "dead station lol"},
  { text: "MULTI-BAND DRIFTING!"},
  { text: "Yeah we have an \"Extra\" class license, but what about \"Extra Special\" licenses for extra special people?"},
  { text: "Once upon a time I heard a ghost on FRS Channel 1, I'm not joking. I think it said \"I want to tickle your [47 CFR § 97.113(a)(4)]\", I really am not joking about this please have mercy on me, FRS 1 ghost"},
  { text: "<a href=\"https://www.youtube.com/watch?v=sXz6ghbfd2U\"><strong><em>ＴＨＲＥＥ  ＮＩＮＥ  ＳＥＶＥＮ  ＯＮＥ  ＦＩＶＥ</em></strong></a>", author: "- 'The Lincolnshire Poacher'"},
  { text: "A big thank you to W7EY for being my first contact on 80 meters!"},
  { text: "A great large thanks to W4ZDP for being my first contact on 40 meters! (POTA to US-0662)"},
  { text: "I'd like to thank KC1VOP for being my first contact on HF (as KJ5KKT) and getting me addicted to POTA."},
  { text: "Will break your F5 key!"},
  { text: "VP2VI somehow managed to pick up my G90 hooked to a trampoline pole, and I thank him tremendously for being both my first DX contact and my first contact on my own radio."},
  { text: "Everybody gangsta until the <a href=\"https://static.dxengineering.com/global/images/prod/large/dxe-160va-1.jpg\" target=\"_blank\" rel=\"noopener noreferrer\">Pyramid Head antenna</a> goes up" },
  { text: "<strong>DBVBVBTDBVBVBTDBVBVBTDBVBVBTDBVBVBT</strong>", author: "- Duga OTH radar, 'The Woodpecker'"},
  { text: "<span style=\"background: #0000ff\">K5GFL</span><br /><span style=\"color: #ff0000\">▼</span>"},
  { text: "Welcome to WSPR, the World Series Propagation Report. Today we're gonna blast out WSPR at 1500 watts and see how many people knock at the door!", author: "\"Why is my shack on fire?\""},
  { text: "Fully Legal & Not Ready To Mingle [On-Air]"},
  { text: "Look ma, I'm famous!"},
  { text: "重音テト"},
  { text: "Good grief!"},
  { text: "<span style=\"color: #b806d6\">ゴ ゴ ゴ ゴ ゴ ゴ ゴ</span>"},
  { text: "The RF Burn of '87?!", author: "- Not Markiplier"},
  { text: "Kilo Foxtrot Golf 5 Lima"},
  { text: "More <strong><span style=\"color: #ffd30a\">electric</span></strong> than a Channel 6 rig!"},
  { text: "Ziz my beloved"},
  { text: "Hleuþawarpaneutandz"},
  { text: "<strong>FUN FACT:</strong> I took an N9TAX Slim Jim (made for VHF) and its 10' coax, hooked the end of the coax up to alligator clips and turned it into an indoor inverted-L in my room. It regularly hits Europe on 30 meters with WSPR at 5 watts. There's a lot of things you can turn into antennas with a G90!"},
  { text: "<em>Oooooh, when it gets through for me, it's always new for me<br />My doublet 'tenna gets the best of me</em>"},
  { text: "Bullying a ham:<br /><em>\"Stop CQing yourself! Stop CQing yourself! Stop CQing yourself!\""},
  { text: "I want to have fun with an amateur TV station but the subhobby is near dead. This is so sad"},
  { text: "Mastering incompetence..."},
  { text: "\"Science isn't about WHY, it's about WHY NOT. Why is so much of our science dangerous? Why not marry safe science if you love it so much? In fact, why not invent a special safety door that won’t hit you on the butt on the way out, because you are fired.\"", author: "- Cave Johnson"},
  { text: "\"I would never be so self-centered as to quote myself\"", author: "- K5GFL"},
  { text: "\"Can't we all just get along?\"<br />\"<strong>No.</strong>\"", author: "- 7200 kHz"},
  { text: "I'm not stopping until this whole house is made of ferrite"},
  { text: "Now hearable on topband!"},
  { text: "You too can be a Practitioner of Ghetto Radio!"},
  { text: "I'm making a callout post on my QRZ.com"},
  { text: "\"[W]e can't regulate stupid\"", author: "- Riley Hollingsworth, K4ZDH"},
  { text: "Never put off till tomorrow what you can do the day after tomorrow.", author: "- Mark Twain"},
  { text: "I want to build a big mag loop, and if the HOA gets to complaining, I'll just say its an art installation", author: "- HRCC Discord"},
  { text: "🎵<em>Video killed the radio star<br />Video killed the radio star<br />In my mind and in my car<br />We can't rewind, we've gone too far</em>🎵", author: "- The Buggies"},
  { text: "<strong>FUN FACT:</strong> By my estimations (there is no canon height), the twin antennas of a certain cyborg (assuming no loading) would be quarter-wave verticals for somewhere between 147 MHz and 162 MHz.<br />If you don't know what I'm talking about, don't worry about it."},
  { text: "RR 73"},
  { text: "RIP Stephen Hillenburg, you were the GOAT"},
  { text: "eQSL doesn't really hit the same as the real thing, man."},
  { text: "Oh, the humanity!"},
  { text: "<em>\"Tin tin tidin tindin dirandada nyan nyan turun dun dun dudun\"</em>", author: "- <a href=\"https://www.youtube.com/watch?v=COQR9A8D4XQ\" target=\"_blank\" rel=\"noopener noreferrer\">Mikoboat</a>"},
  { text: "GUYS, THE BAND<br />IT'S UP"},
  { text: "Your distress calls may be monitored for quality assurance purposes"},
  { text: "I am declaring a holy war against Chinese power supplies"},
  { text: "59 over 69"},
  { text: "Brought to you by"},
  { text: "\"I am cringe but I am free\"", author: "- Popkin Poopa"},
  { text: "<span style=\"color: #789922\">>makeshift inverted-L from alligators + coax + n9tax makes it to hawaii and australia</span><br />FT8, I eternally kneel, I will never say a bad word about you ever again"},
  { text: "\"<strong>WHO ARE YOU PEOPLE</strong>\"", author: "- Patrick Star"},
  { text: "<em>The DXpedition has been jammed by ninjas. Are you a ham enough dude to QSO the DXpedition?</em>"},
  { text: "Jam-packed with way too many quotes!"},
  { text: "A great thanks to W5WOC for being my first contact on 60 meters! (via. FT8)"},
  { text: "I really need to get a separate email address for ham radio"},
  { text: "See you later, space cowboy..."},
  { text: "Hear me out: <strong>気になるあの子はアマチュア無線家？！(That Intriguing Girl is an Amateur Radio Operator?!)</strong>", author: "(The love confession is in CW)"},
  { text: "You've got mail!"},
  { text: "The 100 Stations That Really, Really, Really, REALLY Want To Contact You!"},
  { text: "<em>*opens box containing crayons, a dead fish and a casette tape titled \"BOOTY JAMS\"*</em><br />\"I can make this work.\"", author: "- Jonathan Jafari"},
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
    <title>K5GFL Real Quotes Bro</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            background-color: #000; /* Or transparent if you want QRZ bg */
            color: #fff;
            font-family: Arial, sans-serif;
        }

        .quote-container {
            display: flex; /* Keep flex for alignment */
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%; /* Match iframe width minus padding */
            height: 100%; /* Match iframe height minus padding */
            text-align: center;
            padding: 10px; /* Adjust padding as needed */
            border-radius: 5px;
            box-sizing: border-box; /* Include padding in dimensions */
			/* Add overflow properties */
			overflow-y: auto; /* Show vertical scrollbar ONLY when needed */
            overflow-x: hidden; /* Prevent horizontal scrollbar */
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
      "Cache-Control": "no-cache" // Disable caching to get a new quote often
    },
    body: fullHtml,
  };
};
