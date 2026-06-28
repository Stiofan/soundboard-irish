// Ulster Irish School Phrases Dataset
// ~100 phrases across key categories for primary/early post-primary learners
// Each phrase: en (English), ga (Irish - Ulster forms), pr (pronunciation), cat (category)

const PHRASES = [
  // BEANNACHTAÍ — Greetings & Courtesy (~12)
  { en: "Hello", ga: "Dia duit", pr: "DEE-uh gwit", cat: "Beannachtaí" },
  { en: "Hello (reply)", ga: "Dia is Muire duit", pr: "DEE-uh iss MWIR-uh gwit", cat: "Beannachtaí" },
  { en: "Goodbye", ga: "Slán", pr: "SLAWN", cat: "Beannachtaí" },
  { en: "Please", ga: "Le do thoil", pr: "luh duh hull", cat: "Beannachtaí" },
  { en: "Thank you", ga: "Go raibh maith agat", pr: "guh rev mah AH-ut", cat: "Beannachtaí" },
  { en: "You're welcome", ga: "Tá fáilte romhat", pr: "taw FAWL-chuh ROH-ut", cat: "Beannachtaí" },
  { en: "Excuse me / Sorry", ga: "Gabh mo leithscéal", pr: "GAV muh LEH-skale", cat: "Beannachtaí" },
  { en: "Yes", ga: "Tá", pr: "taw", cat: "Beannachtaí" },
  { en: "No", ga: "Níl", pr: "neel", cat: "Beannachtaí" },
  { en: "Good morning", ga: "Maidin mhaith", pr: "MOD-in vah", cat: "Beannachtaí" },
  { en: "Good night", ga: "Oíche mhaith", pr: "EE-huh vah", cat: "Beannachtaí" },
  { en: "See you later", ga: "Slán go fóill", pr: "slawn guh FOLE", cat: "Beannachtaí" },

  // SA RANG — Classroom Phrases (~20)
  { en: "May I go to the toilet?", ga: "An bhfuil cead agam dul go dtí an leithreas?", pr: "un will kyad AH-um dul guh dee un LEH-russ", cat: "Sa Rang" },
  { en: "Sit down", ga: "Suígí síos", pr: "SWI-ghee SHEE-uss", cat: "Sa Rang" },
  { en: "Stand up", ga: "Éirígí suas", pr: "AIR-ee-ghee SOO-us", cat: "Sa Rang" },
  { en: "Listen", ga: "Éistigí", pr: "ESH-ti-ghee", cat: "Sa Rang" },
  { en: "Look", ga: "Féachaigí", pr: "FAY-uh-ghee", cat: "Sa Rang" },
  { en: "Open your book", ga: "Oscail do leabhar", pr: "US-kul duh LYOW-ur", cat: "Sa Rang" },
  { en: "Close your book", ga: "Dún do leabhar", pr: "doon duh LYOW-ur", cat: "Sa Rang" },
  { en: "Quiet", ga: "Ciúnas", pr: "KYOO-nus", cat: "Sa Rang" },
  { en: "Very good!", ga: "An-mhaith!", pr: "un-vah", cat: "Sa Rang" },
  { en: "Well done!", ga: "Maith thú!", pr: "mah hoo", cat: "Sa Rang" },
  { en: "Take out your pen", ga: "Tóg amach do pheann", pr: "togue AH-uh-uh duh ann", cat: "Sa Rang" },
  { en: "I don't know", ga: "Níl a fhios agam", pr: "neel uh iss AH-um", cat: "Sa Rang" },
  { en: "I'm ready", ga: "Tá mé réidh", pr: "taw may RAY", cat: "Sa Rang" },
  { en: "May I have a copy?", ga: "An bhfuil cóip agam?", pr: "un will KOPE AH-um", cat: "Sa Rang" },
  { en: "Can you help me?", ga: "An féidir leat cabhrú dom?", pr: "un FAY-der lat KY-roo dum", cat: "Sa Rang" },
  { en: "What page?", ga: "Cén leathanach?", pr: "kane LAH-uh-nuh", cat: "Sa Rang" },
  { en: "Read, please", ga: "Léigh, le do thoil", pr: "lay, luh duh hull", cat: "Sa Rang" },
  { en: "Write your name", ga: "Scríobh d'ainm", pr: "SKREE-uh DAYN-um", cat: "Sa Rang" },
  { en: "Repeat, please", ga: "Athuair, le do thoil", pr: "uh-HEW-ur, luh duh hull", cat: "Sa Rang" },
  { en: "Brilliant!", ga: "Go hiontach!", pr: "guh HUN-tuh", cat: "Sa Rang" },

  // COMHRÁ — Small Talk (~12)
  { en: "How are you?", ga: "Goidé mar atá tú?", pr: "GWEE-ay mar uh-TAW too", cat: "Comhrá" },
  { en: "How are you? (variant)", ga: "Cad é mar atá tú?", pr: "kud ay mar uh-TAW too", cat: "Comhrá" },
  { en: "I'm well", ga: "Tá mé go maith", pr: "taw may guh mah", cat: "Comhrá" },
  { en: "I'm not well", ga: "Níl mé go maith", pr: "neel may guh mah", cat: "Comhrá" },
  { en: "What's your name?", ga: "Cad is ainm duit?", pr: "kud iss AYN-um gwit", cat: "Comhrá" },
  { en: "I am… (name)", ga: "Is mise…", pr: "iss MISH-uh", cat: "Comhrá" },
  { en: "Where do you live?", ga: "Cá bhfuil tú i do chónaí?", pr: "kaw will too uh duh KHONE-ee", cat: "Comhrá" },
  { en: "I live in…", ga: "Tá mé i mo chónaí i…", pr: "taw may uh muh KHONE-ee uh", cat: "Comhrá" },
  { en: "What's your favourite colour?", ga: "Cad is dath is fearr leat?", pr: "kud iss dah iss far laht", cat: "Comhrá" },
  { en: "How old are you?", ga: "Cad é do aois?", pr: "kud ay duh AY-iss", cat: "Comhrá" },
  { en: "I am… years old", ga: "Tá mé … i mo bhliain", pr: "taw may … uh muh VLEE-un", cat: "Comhrá" },
  { en: "Nice to meet you", ga: "Deas a bheith i do dhéachtúr", pr: "dass uh veh uh duh YAK-tour", cat: "Comhrá" },

  // AN AIMSIR — Weather (~8)
  { en: "It's cold", ga: "Tá sé fuar", pr: "taw shay FOO-ur", cat: "An Aimsir" },
  { en: "It's warm", ga: "Tá sé te", pr: "taw shay chuh", cat: "An Aimsir" },
  { en: "It's wet", ga: "Tá sé fliuch", pr: "taw shay FLYUH", cat: "An Aimsir" },
  { en: "It's sunny", ga: "Tá sé gréine", pr: "taw shay GRAY-nuh", cat: "An Aimsir" },
  { en: "It's raining", ga: "Tá sé ag cur báistí", pr: "taw shay uh cur BAWS-chee", cat: "An Aimsir" },
  { en: "It's snowing", ga: "Tá sé ag cur sneachta", pr: "taw shay uh cur SHNAK-tuh", cat: "An Aimsir" },
  { en: "It's windy", ga: "Tá sé gaoithreach", pr: "taw shay GWEE-ruh", cat: "An Aimsir" },
  { en: "It's cloudy", ga: "Tá sé scamallach", pr: "taw shay SKAM-ul-uh", cat: "An Aimsir" },

  // NA LAETHANTA & NA MÍONNA — Days & Months (~14)
  { en: "Monday", ga: "Dé Luain", pr: "day LOO-in", cat: "Na Laethanta & Na Míonna" },
  { en: "Tuesday", ga: "Dé Máirt", pr: "day MAWR-chuh", cat: "Na Laethanta & Na Míonna" },
  { en: "Wednesday", ga: "Dé Céadaoin", pr: "day KAY-deen", cat: "Na Laethanta & Na Míonna" },
  { en: "Thursday", ga: "Déardaoin", pr: "DARE-deen", cat: "Na Laethanta & Na Míonna" },
  { en: "Friday", ga: "Dé hAoine", pr: "day HEE-nuh", cat: "Na Laethanta & Na Míonna" },
  { en: "Saturday", ga: "Dé Sathairn", pr: "day SAH-urn", cat: "Na Laethanta & Na Míonna" },
  { en: "Sunday", ga: "Dé Domhnaigh", pr: "day DOH-nee", cat: "Na Laethanta & Na Míonna" },
  { en: "Today", ga: "Inniu", pr: "IN-yoo", cat: "Na Laethanta & Na Míonna" },
  { en: "Yesterday", ga: "Inné", pr: "in-AY", cat: "Na Laethanta & Na Míonna" },
  { en: "Tomorrow", ga: "Amárach", pr: "uh-MAW-ruh", cat: "Na Laethanta & Na Míonna" },
  { en: "January", ga: "Eanáir", pr: "AN-awr", cat: "Na Laethanta & Na Míonna" },
  { en: "February", ga: "Feabhra", pr: "FAU-ruh", cat: "Na Laethanta & Na Míonna" },
  { en: "December", ga: "Mí na Nollag", pr: "mee nuh NUL-ug", cat: "Na Laethanta & Na Míonna" },
  { en: "What day is it?", ga: "Cén lá atá ann?", pr: "kane law uh-TAW un", cat: "Na Laethanta & Na Míonna" },

  // UIMHREACHA — Numbers 1–10 (~14)
  { en: "One", ga: "a haon", pr: "uh HAYN", cat: "Uimhreacha" },
  { en: "Two", ga: "a dó", pr: "uh DOH", cat: "Uimhreacha" },
  { en: "Three", ga: "a trí", pr: "uh FREE", cat: "Uimhreacha" },
  { en: "Four", ga: "a ceathair", pr: "uh KAH-ur", cat: "Uimhreacha" },
  { en: "Five", ga: "a cúig", pr: "uh KOO-ig", cat: "Uimhreacha" },
  { en: "Six", ga: "a sé", pr: "uh shay", cat: "Uimhreacha" },
  { en: "Seven", ga: "a seacht", pr: "uh SHAK-chuh", cat: "Uimhreacha" },
  { en: "Eight", ga: "a hocht", pr: "uh HUK-chuh", cat: "Uimhreacha" },
  { en: "Nine", ga: "a naoi", pr: "uh NAY", cat: "Uimhreacha" },
  { en: "Ten", ga: "a deich", pr: "uh DAY", cat: "Uimhreacha" },
  { en: "One person", ga: "duine", pr: "DIN-uh", cat: "Uimhreacha" },
  { en: "Two people", ga: "beirt", pr: "BERT", cat: "Uimhreacha" },
  { en: "Three people", ga: "triúr", pr: "FREE-ur", cat: "Uimhreacha" },
  { en: "Four people", ga: "ceathrar", pr: "KAH-rur", cat: "Uimhreacha" },

  // DATHANNA — Colours (~8)
  { en: "Red", ga: "dearg", pr: "DYARK", cat: "Dathanna" },
  { en: "Blue", ga: "gorm", pr: "GUM", cat: "Dathanna" },
  { en: "Green", ga: "glas", pr: "GLUS", cat: "Dathanna" },
  { en: "Yellow", ga: "buí", pr: "BOO-ee", cat: "Dathanna" },
  { en: "White", ga: "bán", pr: "BAWN", cat: "Dathanna" },
  { en: "Black", ga: "dubh", pr: "DUV", cat: "Dathanna" },
  { en: "Orange", ga: "oráiste", pr: "or-AWS-chuh", cat: "Dathanna" },
  { en: "Purple", ga: "corcra", pr: "KUR-kruh", cat: "Dathanna" },

  // BIA & ROS — Food & Break Time (~8)
  { en: "I'm hungry", ga: "Tá ocras orm", pr: "taw OK-russ ur-um", cat: "Bia & Ros" },
  { en: "I'm thirsty", ga: "Tá tart orm", pr: "taw tart ur-um", cat: "Bia & Ros" },
  { en: "Water", ga: "uisce", pr: "ISH-kuh", cat: "Bia & Ros" },
  { en: "Milk", ga: "bainne", pr: "BAN-uh", cat: "Bia & Ros" },
  { en: "Bread", ga: "arán", pr: "uh-RAWN", cat: "Bia & Ros" },
  { en: "Apple", ga: "úll", pr: "OOL", cat: "Bia & Ros" },
  { en: "Chocolate", ga: "seacláid", pr: "shak-LAWD", cat: "Bia & Ros" },
  { en: "Break time", ga: "am sosa", pr: "um SUS-uh", cat: "Bia & Ros" },

  // MOTHÚCHÁIN & FRÁSAÍ ÚSÁIDEACHA — Feelings & Handy Phrases (~6)
  { en: "I'm happy", ga: "Tá áthas orm", pr: "taw AW-uss ur-um", cat: "Mothúcháin & Frásaí" },
  { en: "I'm sad", ga: "Tá brón orm", pr: "taw BROHN ur-um", cat: "Mothúcháin & Frásaí" },
  { en: "I'm tired", ga: "Tá tuirse orm", pr: "taw TIR-shuh ur-um", cat: "Mothúcháin & Frásaí" },
  { en: "I'm scared", ga: "Tá eagla orm", pr: "taw AYG-luh ur-um", cat: "Mothúcháin & Frásaí" },
  { en: "That's brilliant!", ga: "Go hiontach sin!", pr: "guh HUN-tuh shin", cat: "Mothúcháin & Frásaí" },
  { en: "I like that", ga: "Is breá liom sin", pr: "iss bray LYUM shin", cat: "Mothúcháin & Frásaí" },
];

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PHRASES };
}
