// Ulster Irish School Phrases Dataset
// ~100 phrases across key categories for primary/early post-primary learners
// Each phrase: id, en (English), ga (Irish - Ulster forms), pr (pronunciation), cat (category)
//
// NOTE: Irish text and pronunciation hints should be reviewed by a fluent Ulster Irish speaker
// (e.g. the children's teacher) before treating as authoritative. Pronunciation hints use
// a rough English-key romanisation for south-Down speakers.

const PHRASES = [
  // BEANNACHTAÍ — Greetings & Courtesy (~12)
  { id: 'p001', en: "Hello", ga: "Dia duit", pr: "DEE-uh gwit", cat: "Beannachtaí" },
  { id: 'p002', en: "Hello (reply)", ga: "Dia is Muire duit", pr: "DEE-uh iss MWIR-uh gwit", cat: "Beannachtaí" },
  { id: 'p003', en: "Goodbye", ga: "Slán", pr: "SLAWN", cat: "Beannachtaí" },
  { id: 'p004', en: "Please", ga: "Le do thoil", pr: "luh duh hull", cat: "Beannachtaí" },
  { id: 'p005', en: "Thank you", ga: "Go raibh maith agat", pr: "guh rev mah AH-um", cat: "Beannachtaí" },
  { id: 'p006', en: "You're welcome", ga: "Tá fáilte romhat", pr: "taw FAWL-chuh ROH-ut", cat: "Beannachtaí" },
  { id: 'p007', en: "Excuse me / Sorry", ga: "Gabh mo leithscéal", pr: "GAV muh LEH-skale", cat: "Beannachtaí" },
  { id: 'p008', en: "Yes", ga: "Tá", pr: "taw", cat: "Beannachtaí" },
  { id: 'p009', en: "No", ga: "Níl", pr: "neel", cat: "Beannachtaí" },
  { id: 'p010', en: "Good morning", ga: "Maidin mhaith", pr: "MOD-in vah", cat: "Beannachtaí" },
  { id: 'p011', en: "Good night", ga: "Oíche mhaith", pr: "EE-huh vah", cat: "Beannachtaí" },
  { id: 'p012', en: "See you later", ga: "Slán go fóill", pr: "slawn guh FOLE", cat: "Beannachtaí" },

  // SA RANG — Classroom Phrases (~20)
  { id: 'p013', en: "May I go to the toilet?", ga: "An bhfuil cead agam dul go dtí an leithreas?", pr: "un will kyad AH-um dul guh dee un LEH-russ", cat: "Sa Rang" },
  { id: 'p014', en: "Sit down", ga: "Suígí síos", pr: "SWI-ghee SHEE-uss", cat: "Sa Rang" },
  { id: 'p015', en: "Stand up", ga: "Éirígí suas", pr: "AIR-ee-ghee SOO-us", cat: "Sa Rang" },
  { id: 'p016', en: "Listen", ga: "Éistigí", pr: "ESH-ti-ghee", cat: "Sa Rang" },
  { id: 'p017', en: "Look", ga: "Féachaigí", pr: "FAY-uh-ghee", cat: "Sa Rang" },
  { id: 'p018', en: "Open your book", ga: "Oscail do leabhar", pr: "US-kul duh LYOW-ur", cat: "Sa Rang" },
  { id: 'p019', en: "Close your book", ga: "Dún do leabhar", pr: "doon duh LYOW-ur", cat: "Sa Rang" },
  { id: 'p020', en: "Quiet", ga: "Ciúnas", pr: "KYOO-nus", cat: "Sa Rang" },
  { id: 'p021', en: "Very good!", ga: "An-mhaith!", pr: "un-vah", cat: "Sa Rang" },
  { id: 'p022', en: "Well done!", ga: "Maith thú!", pr: "mah hoo", cat: "Sa Rang" },
  { id: 'p023', en: "Take out your pen", ga: "Tóg amach do pheann", pr: "togue AH-ukh duh ann", cat: "Sa Rang" },
  { id: 'p024', en: "I don't know", ga: "Níl a fhios agam", pr: "neel uh iss AH-um", cat: "Sa Rang" },
  { id: 'p025', en: "I'm ready", ga: "Tá mé réidh", pr: "taw may RAY", cat: "Sa Rang" },
  { id: 'p026', en: "May I have a copy?", ga: "An bhfuil cóip agam?", pr: "un will KOPE AH-um", cat: "Sa Rang" },
  { id: 'p027', en: "Can you help me?", ga: "An féidir leat cabhrú dom?", pr: "un FAY-der laht KOW-roo dum", cat: "Sa Rang" },
  { id: 'p028', en: "What page?", ga: "Cén leathanach?", pr: "kane LAH-uh-nukh", cat: "Sa Rang" },
  { id: 'p029', en: "Read, please", ga: "Léigh, le do thoil", pr: "lay, luh duh hull", cat: "Sa Rang" },
  { id: 'p030', en: "Write your name", ga: "Scríobh d'ainm", pr: "SKREE-uv DAYN-um", cat: "Sa Rang" },
  { id: 'p031', en: "Repeat, please", ga: "Arís, le do thoil", pr: "uh-REESH, luh duh hull", cat: "Sa Rang" },
  { id: 'p032', en: "Brilliant!", ga: "Go hiontach!", pr: "guh HUN-tukh", cat: "Sa Rang" },

  // COMHRÁ — Small Talk (~12)
  { id: 'p033', en: "How are you?", ga: "Goidé mar atá tú?", pr: "GWEE-ay mar uh-TAW too", cat: "Comhrá" },
  { id: 'p034', en: "How are you? (variant)", ga: "Cad é mar atá tú?", pr: "kud ay mar uh-TAW too", cat: "Comhrá" },
  { id: 'p035', en: "I'm well", ga: "Tá mé go maith", pr: "taw may guh mah", cat: "Comhrá" },
  { id: 'p036', en: "I'm not well", ga: "Níl mé go maith", pr: "neel may guh mah", cat: "Comhrá" },
  { id: 'p037', en: "What's your name?", ga: "Cad is ainm duit?", pr: "kud iss AYN-um gwit", cat: "Comhrá" },
  { id: 'p038', en: "I am… (name)", ga: "Is mise…", pr: "iss MISH-uh", cat: "Comhrá" },
  { id: 'p039', en: "Where do you live?", ga: "Cá bhfuil tú i do chónaí?", pr: "kaw will too uh duh KHONE-ee", cat: "Comhrá" },
  { id: 'p040', en: "I live in…", ga: "Tá mé i mo chónaí i…", pr: "taw may uh muh KHONE-ee ih", cat: "Comhrá" },
  { id: 'p041', en: "What's your favourite colour?", ga: "Cad is dath is fearr leat?", pr: "kud iss dah iss far laht", cat: "Comhrá" },
  { id: 'p042', en: "How old are you?", ga: "Cad é do aois?", pr: "kud ay duh AY-ish", cat: "Comhrá" },
  { id: 'p043', en: "I am … years old", ga: "Tá mé … bliana d'aois", pr: "taw may … BLEE-un-uh DEESH", cat: "Comhrá" },
  { id: 'p044', en: "Nice to meet you", ga: "Is deas bualadh leat", pr: "iss dass BOO-luh laht", cat: "Comhrá" },

  // AN AIMSIR — Weather (~8)
  { id: 'p045', en: "It's cold", ga: "Tá sé fuar", pr: "taw shay FOO-ur", cat: "An Aimsir" },
  { id: 'p046', en: "It's warm", ga: "Tá sé te", pr: "taw shay cheh", cat: "An Aimsir" },
  { id: 'p047', en: "It's wet", ga: "Tá sé fliuch", pr: "taw shay FLYUKH", cat: "An Aimsir" },
  { id: 'p048', en: "It's sunny", ga: "Tá sé grianmhar", pr: "taw shay GREE-un-wur", cat: "An Aimsir" },
  { id: 'p049', en: "It's raining", ga: "Tá sé ag cur báistí", pr: "taw shay uh cur BAWSH-chee", cat: "An Aimsir" },
  { id: 'p050', en: "It's snowing", ga: "Tá sé ag cur sneachta", pr: "taw shay uh cur SHNYAKH-tuh", cat: "An Aimsir" },
  { id: 'p051', en: "It's windy", ga: "Tá sé gaofar", pr: "taw shay GWAY-fur", cat: "An Aimsir" },
  { id: 'p052', en: "It's cloudy", ga: "Tá sé scamallach", pr: "taw shay SKAM-ul-ukh", cat: "An Aimsir" },

  // NA LAETHANTA & NA MÍONNA — Days & Months (~14)
  { id: 'p053', en: "Monday", ga: "Dé Luain", pr: "day LOO-in", cat: "Na Laethanta & Na Míonna" },
  { id: 'p054', en: "Tuesday", ga: "Dé Máirt", pr: "day MAWRCH", cat: "Na Laethanta & Na Míonna" },
  { id: 'p055', en: "Wednesday", ga: "Dé Céadaoin", pr: "day KAY-deen", cat: "Na Laethanta & Na Míonna" },
  { id: 'p056', en: "Thursday", ga: "Déardaoin", pr: "DARE-deen", cat: "Na Laethanta & Na Míonna" },
  { id: 'p057', en: "Friday", ga: "Dé hAoine", pr: "day HEE-nyuh", cat: "Na Laethanta & Na Míonna" },
  { id: 'p058', en: "Saturday", ga: "Dé Sathairn", pr: "day SAH-urn", cat: "Na Laethanta & Na Míonna" },
  { id: 'p059', en: "Sunday", ga: "Dé Domhnaigh", pr: "day DOH-nee", cat: "Na Laethanta & Na Míonna" },
  { id: 'p060', en: "Today", ga: "Inniu", pr: "IN-yoo", cat: "Na Laethanta & Na Míonna" },
  { id: 'p061', en: "Yesterday", ga: "Inné", pr: "in-AY", cat: "Na Laethanta & Na Míonna" },
  { id: 'p062', en: "Tomorrow", ga: "Amárach", pr: "uh-MAW-rukh", cat: "Na Laethanta & Na Míonna" },
  { id: 'p063', en: "January", ga: "Eanáir", pr: "AN-awr", cat: "Na Laethanta & Na Míonna" },
  { id: 'p064', en: "February", ga: "Feabhra", pr: "FAU-ruh", cat: "Na Laethanta & Na Míonna" },
  { id: 'p065', en: "December", ga: "Mí na Nollag", pr: "mee nuh NUL-ug", cat: "Na Laethanta & Na Míonna" },
  { id: 'p066', en: "What day is it?", ga: "Cén lá atá ann?", pr: "kane law uh-TAW un", cat: "Na Laethanta & Na Míonna" },

  // UIMHREACHA — Numbers 1–10 + counting people (~14)
  { id: 'p067', en: "One", ga: "a haon", pr: "uh HAYN", cat: "Uimhreacha" },
  { id: 'p068', en: "Two", ga: "a dó", pr: "uh DOH", cat: "Uimhreacha" },
  { id: 'p069', en: "Three", ga: "a trí", pr: "uh TREE", cat: "Uimhreacha" },
  { id: 'p070', en: "Four", ga: "a ceathair", pr: "uh KAH-ur", cat: "Uimhreacha" },
  { id: 'p071', en: "Five", ga: "a cúig", pr: "uh KOO-ig", cat: "Uimhreacha" },
  { id: 'p072', en: "Six", ga: "a sé", pr: "uh shay", cat: "Uimhreacha" },
  { id: 'p073', en: "Seven", ga: "a seacht", pr: "uh SHOKHT", cat: "Uimhreacha" },
  { id: 'p074', en: "Eight", ga: "a hocht", pr: "uh HOKHT", cat: "Uimhreacha" },
  { id: 'p075', en: "Nine", ga: "a naoi", pr: "uh NAY", cat: "Uimhreacha" },
  { id: 'p076', en: "Ten", ga: "a deich", pr: "uh DAY", cat: "Uimhreacha" },
  { id: 'p077', en: "One person", ga: "duine", pr: "DIN-yuh", cat: "Uimhreacha" },
  { id: 'p078', en: "Two people", ga: "beirt", pr: "BERT", cat: "Uimhreacha" },
  { id: 'p079', en: "Three people", ga: "triúr", pr: "TREE-ur", cat: "Uimhreacha" },
  { id: 'p080', en: "Four people", ga: "ceathrar", pr: "KAH-rur", cat: "Uimhreacha" },

  // DATHANNA — Colours (~8)
  { id: 'p081', en: "Red", ga: "dearg", pr: "DYAR-ug", cat: "Dathanna" },
  { id: 'p082', en: "Blue", ga: "gorm", pr: "GUR-um", cat: "Dathanna" },
  { id: 'p083', en: "Green", ga: "glas", pr: "GLAS", cat: "Dathanna" },
  { id: 'p084', en: "Yellow", ga: "buí", pr: "BWEE", cat: "Dathanna" },
  { id: 'p085', en: "White", ga: "bán", pr: "BAWN", cat: "Dathanna" },
  { id: 'p086', en: "Black", ga: "dubh", pr: "DUV", cat: "Dathanna" },
  { id: 'p087', en: "Orange", ga: "oráiste", pr: "or-AWsh-chuh", cat: "Dathanna" },
  { id: 'p088', en: "Purple", ga: "corcra", pr: "KUR-kruh", cat: "Dathanna" },

  // BIA & SOS — Food & Break Time (~8)
  { id: 'p089', en: "I'm hungry", ga: "Tá ocras orm", pr: "taw OK-russ ur-um", cat: "Bia & Sos" },
  { id: 'p090', en: "I'm thirsty", ga: "Tá tart orm", pr: "taw tart ur-um", cat: "Bia & Sos" },
  { id: 'p091', en: "Water", ga: "uisce", pr: "ISH-kyuh", cat: "Bia & Sos" },
  { id: 'p092', en: "Milk", ga: "bainne", pr: "BAN-yuh", cat: "Bia & Sos" },
  { id: 'p093', en: "Bread", ga: "arán", pr: "uh-RAWN", cat: "Bia & Sos" },
  { id: 'p094', en: "Apple", ga: "úll", pr: "OOL", cat: "Bia & Sos" },
  { id: 'p095', en: "Chocolate", ga: "seacláid", pr: "SHAK-lawj", cat: "Bia & Sos" },
  { id: 'p096', en: "Break time", ga: "am sos", pr: "um sus", cat: "Bia & Sos" },

  // MOTHÚCHÁIN & FRÁSAÍ ÚSÁIDEACHA — Feelings & Handy Phrases (~6)
  { id: 'p097', en: "I'm happy", ga: "Tá áthas orm", pr: "taw AW-hus ur-um", cat: "Mothúcháin & Frásaí" },
  { id: 'p098', en: "I'm sad", ga: "Tá brón orm", pr: "taw BROHN ur-um", cat: "Mothúcháin & Frásaí" },
  { id: 'p099', en: "I'm tired", ga: "Tá tuirse orm", pr: "taw TIR-shuh ur-um", cat: "Mothúcháin & Frásaí" },
  { id: 'p100', en: "I'm scared", ga: "Tá eagla orm", pr: "taw AYG-luh ur-um", cat: "Mothúcháin & Frásaí" },
  { id: 'p101', en: "That's brilliant!", ga: "Go hiontach sin!", pr: "guh HUN-tukh shin", cat: "Mothúcháin & Frásaí" },
  { id: 'p102', en: "I like that", ga: "Is breá liom sin", pr: "iss braw LUM shin", cat: "Mothúcháin & Frásaí" },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PHRASES };
}
