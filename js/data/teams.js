// Jazz 10-player rotation — the single source of truth for all Jazz flashcard modes.
// Starters: Keyonte George, Ace Bailey, Lauri Markkanen, Jaren Jackson Jr., Walker Kessler
// Bench:    Isaiah Collier, Brice Sensabaugh, Svi Mykhailiuk, Kyle Filipowski, Jusuf Nurkic
const ROSTER = [
  { name:"Keyonte George",    jazz_years:"2 seasons",  position:"G",  jersey:"3",  height:'6\'4"',  college:"Baylor",         country:"USA",     hometown:"Lewisville, Texas",                 draft_year:"2023", draft_pick:"16", draft_team:"Utah Jazz",              past_teams:"None",                                                                                                                                                                                 image_url:"https://a.espncdn.com/i/headshots/nba/players/full/4433627.png" },
  { name:"Ace Bailey",        jazz_years:"1 season",   position:"G",  jersey:"19", height:'6\'9"',  college:"Rutgers",        country:"USA",     hometown:"Chattanooga, Tennessee",             draft_year:"2025", draft_pick:"5",  draft_team:"Utah Jazz",              past_teams:"None",                                                                                                                                                                                 image_url:"https://a.espncdn.com/i/headshots/nba/players/full/4873138.png" },
  { name:"Lauri Markkanen",   jazz_years:"3 seasons",  position:"F",  jersey:"23", height:'7\'1"',  college:"Arizona",        country:"Finland", hometown:"Vantaa, Finland",                   draft_year:"2017", draft_pick:"7",  draft_team:"Minnesota Timberwolves", past_teams:[{team:"Chicago Bulls",dur:"1 season"}],                                                                                                                                               image_url:"https://a.espncdn.com/i/headshots/nba/players/full/3926432.png" },
  { name:"Jaren Jackson Jr.", jazz_years:"1 season",   position:"F",  jersey:"20", height:'6\'10"', college:"Michigan State", country:"USA",     hometown:"Plainfield, New Jersey",             draft_year:"2018", draft_pick:"4",  draft_team:"Memphis Grizzlies",      past_teams:[{team:"Memphis Grizzlies",dur:"6 seasons"}],                                                                                                                                          image_url:"https://a.espncdn.com/i/headshots/nba/players/full/4277961.png" },
  { name:"Walker Kessler",    jazz_years:"3 seasons",  position:"C",  jersey:"24", height:'7\'2"',  college:"Auburn",         country:"USA",     hometown:"Atlanta, Georgia",                   draft_year:"2022", draft_pick:"22", draft_team:"Memphis Grizzlies",      past_teams:[{team:"Memphis Grizzlies",dur:"traded (never played)"}],                                                                                                                              image_url:"https://a.espncdn.com/i/headshots/nba/players/full/4396997.png" },
  { name:"Isaiah Collier",    jazz_years:"1 season",   position:"G",  jersey:"8",  height:'6\'4"',  college:"USC",            country:"USA",     hometown:"Atlanta, Georgia",                   draft_year:"2024", draft_pick:"29", draft_team:"Utah Jazz",              past_teams:"None",                                                                                                                                                                                 image_url:"https://a.espncdn.com/i/headshots/nba/players/full/4873165.png" },
  { name:"Brice Sensabaugh",  jazz_years:"2 seasons",  position:"F",  jersey:"28", height:'6\'6"',  college:"Ohio State",     country:"USA",     hometown:"Orlando, Florida",                   draft_year:"2023", draft_pick:"28", draft_team:"Utah Jazz",              past_teams:"None",                                                                                                                                                                                 image_url:"https://a.espncdn.com/i/headshots/nba/players/full/5105839.png" },
  { name:"Svi Mykhailiuk",    jazz_years:"1 season",   position:"G",  jersey:"10", height:'6\'7"',  college:"Kansas",         country:"Ukraine", hometown:"Cherkasy, Ukraine",                  draft_year:"2018", draft_pick:"47", draft_team:"Los Angeles Lakers",     past_teams:[{team:"Los Angeles Lakers",dur:"1 season"},{team:"Detroit Pistons",dur:"3 seasons"},{team:"Houston Rockets",dur:"1 season"},{team:"Oklahoma City Thunder",dur:"1 season"},{team:"Toronto Raptors",dur:"1 season"}], image_url:"https://a.espncdn.com/i/headshots/nba/players/full/3134903.png" },
  { name:"Kyle Filipowski",   jazz_years:"1 season",   position:"F",  jersey:"22", height:'6\'11"', college:"Duke",           country:"USA",     hometown:"Middletown, New York",               draft_year:"2024", draft_pick:"32", draft_team:"Utah Jazz",              past_teams:"None",                                                                                                                                                                                 image_url:"https://a.espncdn.com/i/headshots/nba/players/full/4684793.png" },
  { name:"Jusuf Nurkic",      jazz_years:"1 season",   position:"C",  jersey:"30", height:'6\'11"', college:"International",  country:"Bosnia",  hometown:"Živinice, Bosnia and Herzegovina",   draft_year:"2014", draft_pick:"16", draft_team:"Chicago Bulls",          past_teams:[{team:"Denver Nuggets",dur:"1 season"},{team:"Portland Trail Blazers",dur:"7 seasons"},{team:"Charlotte Hornets",dur:"1 season"},{team:"Phoenix Suns",dur:"1 season"}],                     image_url:"https://a.espncdn.com/i/headshots/nba/players/full/6430.png" },
];

// Full display labels for positions (used by non-Jazz players)
const posMap = { G: 'Guard', F: 'Forward', C: 'Center' };
// Jazz-only source of truth: precise multi-position labels for all 10 rotation players.
// Used by: player_position flashcard mode AND Team -> Rotation (10) mode.
const JAZZ_POSITIONS = {
  "Keyonte George":    "PG/SG",
  "Ace Bailey":        "SG/SF",
  "Lauri Markkanen":   "SF/PF",
  "Jaren Jackson Jr.": "PF/C",
  "Walker Kessler":    "C",
  "Isaiah Collier":    "PG",
  "Brice Sensabaugh":  "SG/SF",
  "Svi Mykhailiuk":    "SF/SG",
  "Kyle Filipowski":   "PF/C",
  "Jusuf Nurkic":      "C",
};
// Mavericks precise multi-position labels
const MAVS_POSITIONS = {
  "Kyrie Irving":     "PG/SG",
  "Max Christie":     "SG/SF",
  "Cooper Flagg":     "SF/PF",
  "P.J. Washington":  "PF/C",
  "Dereck Lively II": "C",
  "D'Angelo Russell": "PG/SG",
  "Klay Thompson":    "SG/SF",
  "Naji Marshall":    "SF/PF",
  "Khris Middleton":  "SF/PF",
  "Daniel Gafford":   "C",
};

// Mavericks 10-player rotation
const MAVS_ROTATION = {
  starters: [
    { pos:"PG/SG", name:"Kyrie Irving" },
    { pos:"SG/SF", name:"Max Christie" },
    { pos:"SF/PF", name:"Cooper Flagg" },
    { pos:"PF/C",  name:"P.J. Washington" },
    { pos:"C",     name:"Dereck Lively II" },
  ],
  bench: [
    { pos:"PG/SG", name:"D'Angelo Russell" },
    { pos:"SG/SF", name:"Klay Thompson" },
    { pos:"SF/PF", name:"Naji Marshall" },
    { pos:"SF/PF", name:"Khris Middleton" },
    { pos:"C",     name:"Daniel Gafford" },
  ]
};

// Nuggets precise multi-position labels
const NUGGETS_POSITIONS = {
  "Jamal Murray":      "PG/SG",
  "Christian Braun":   "SG/SF",
  "Cameron Johnson":   "SF/PF",
  "Aaron Gordon":      "PF/SF",
  "Nikola Jokic":      "C",
  "Bruce Brown":       "PG/SG",
  "Tim Hardaway Jr.":  "SG/SF",
  "Julian Strawther":  "SG/SF",
  "Peyton Watson":     "SF/SG",
  "Jonas Valanciunas": "C",
};

// Nuggets 10-player rotation
const NUGGETS_ROTATION = {
  starters: [
    { pos:"PG/SG", name:"Jamal Murray" },
    { pos:"SG/SF", name:"Christian Braun" },
    { pos:"SF/PF", name:"Cameron Johnson" },
    { pos:"PF/SF", name:"Aaron Gordon" },
    { pos:"C",     name:"Nikola Jokic" },
  ],
  bench: [
    { pos:"PG/SG", name:"Bruce Brown" },
    { pos:"SG/SF", name:"Tim Hardaway Jr." },
    { pos:"SG/SF", name:"Julian Strawther" },
    { pos:"SF/SG", name:"Peyton Watson" },
    { pos:"C",     name:"Jonas Valančiūnas" },
  ]
};

// getPosLabel: checks Jazz, then Mavs, then Nuggets, then GSW, then falls back to posMap.
function getPosLabel(p) { return JAZZ_POSITIONS[p.name] || MAVS_POSITIONS[p.name] || NUGGETS_POSITIONS[p.name] || GSW_POSITIONS[p.name] || posMap[p.position] || p.position; }

const JAZZ_STARTING_LINEUP = { PG:'Keyonte George', SG:'Ace Bailey', SF:'Lauri Markkanen', PF:'Jaren Jackson Jr.', C:'Walker Kessler' };

// ============================================================
// =================== DECK BUILDER SYSTEM ====================
// ============================================================

// -- Test dataset (used by MODE_BUILDERS; mirrors full ROSTER) --
const TEST_TEAM = {
  name: "Utah Jazz",
  city: "Salt Lake City",
  conference: "West",
  division: "Northwest",
  arena: "Delta Center",
  mascot: "Jazz Bear",
  colors: "Purple, Black, White",
  championships: "0",
  lastTitle: "N/A — no titles yet",
  abbreviation: "UTA",
  coach: "Will Hardy",
  coachPrevTeam: { team: "Boston Celtics", role: "Assistant Coach" },
  coachSince: "2022"
};

const MAVS_TEAM = {
  name: "Dallas Mavericks",
  city: "Dallas",
  conference: "West",
  division: "Southwest",
  arena: "American Airlines Center",
  mascot: "Champ",
  colors: "Blue, Silver, Black",
  championships: "1",
  lastTitle: "2011",
  abbreviation: "DAL",
  coach: "Jason Kidd",
  coachPrevTeam: { team: "Los Angeles Lakers", role: "Head Coach" },
  coachSince: "2021"
};

const MAVS_STARTING_LINEUP = { PG:"Kyrie Irving", SG:"Max Christie", SF:"Cooper Flagg", PF:"P.J. Washington", C:"Dereck Lively II" };

const MAVS_ROSTER = [
  { name:"Kyrie Irving",     position:"G", jersey:"11", height:"6'2",  college:"Duke",           country:"USA", hometown:"Melbourne, Australia",         draft_year:"2011", draft_pick:"1",         draft_team:"Cleveland Cavaliers",  past_teams:[{team:"Cleveland Cavaliers",dur:"4 seasons"},{team:"Boston Celtics",dur:"1 season"},{team:"Brooklyn Nets",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Max Christie",     position:"G", jersey:"0",  height:"6'6",  college:"Michigan State", country:"USA", hometown:"Northbrook, Illinois",         draft_year:"2022", draft_pick:"35",        draft_team:"Los Angeles Lakers",   past_teams:[{team:"Los Angeles Lakers",dur:"3 seasons"}], jazz_years:"1 season" },
  { name:"Cooper Flagg",     position:"F", jersey:"2",  height:"6'9",  college:"Duke",           country:"USA", hometown:"Newport, Maine",               draft_year:"2025", draft_pick:"1",         draft_team:"Dallas Mavericks",     past_teams:"None", jazz_years:"1 season" },
  { name:"P.J. Washington",  position:"F", jersey:"25", height:"6'7",  college:"Kentucky",       country:"USA", hometown:"Las Vegas, Nevada",            draft_year:"2019", draft_pick:"12",        draft_team:"Charlotte Hornets",    past_teams:[{team:"Charlotte Hornets",dur:"4 seasons"}], jazz_years:"1 season" },
  { name:"Dereck Lively II", position:"C", jersey:"2",  height:"7'1",  college:"Duke",           country:"USA", hometown:"Philadelphia, Pennsylvania",   draft_year:"2023", draft_pick:"12",        draft_team:"Dallas Mavericks",     past_teams:"None", jazz_years:"1 season" },
  { name:"D'Angelo Russell", position:"G", jersey:"1",  height:"6'4",  college:"Ohio State",     country:"USA", hometown:"Louisville, Kentucky",         draft_year:"2015", draft_pick:"2",         draft_team:"Los Angeles Lakers",   past_teams:[{team:"Los Angeles Lakers",dur:"2 seasons"},{team:"Brooklyn Nets",dur:"2 seasons"},{team:"Golden State Warriors",dur:"1 season"},{team:"Minnesota Timberwolves",dur:"3 seasons"},{team:"Los Angeles Lakers",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Klay Thompson",    position:"G", jersey:"31", height:"6'6",  college:"Washington State",country:"USA", hometown:"Los Angeles, California",     draft_year:"2011", draft_pick:"11",        draft_team:"Golden State Warriors", past_teams:[{team:"Golden State Warriors",dur:"13 seasons"},{team:"Los Angeles Lakers",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Naji Marshall",    position:"F", jersey:"10", height:"6'7",  college:"Xavier",         country:"USA", hometown:"New Orleans, Louisiana",       draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",            past_teams:[{team:"New Orleans Pelicans",dur:"3 seasons"}], jazz_years:"1 season" },
  { name:"Khris Middleton",  position:"F", jersey:"22", height:"6'8",  college:"Texas A&M",      country:"USA", hometown:"Charleston, South Carolina",   draft_year:"2012", draft_pick:"39",        draft_team:"Detroit Pistons",      past_teams:[{team:"Detroit Pistons",dur:"1 season"},{team:"Milwaukee Bucks",dur:"11 seasons"}], jazz_years:"1 season" },
  { name:"Daniel Gafford",   position:"C", jersey:"12", height:"6'11", college:"Arkansas",       country:"USA", hometown:"El Dorado, Arkansas",          draft_year:"2019", draft_pick:"38",        draft_team:"Chicago Bulls",        past_teams:[{team:"Chicago Bulls",dur:"1 season"},{team:"Washington Wizards",dur:"3 seasons"}], jazz_years:"1 season" },
];

const NUGGETS_TEAM = {
  name: "Denver Nuggets",
  city: "Denver",
  conference: "West",
  division: "Northwest",
  arena: "Ball Arena",
  mascot: "Rocky",
  colors: "Gold, Blue, Red",
  championships: "1",
  lastTitle: "2023",
  abbreviation: "DEN",
  coach: "David Adelman",
  coachPrevTeam: { team: "San Antonio Spurs", role: "Assistant Coach" },
  coachSince: "2024"
};

const NUGGETS_STARTING_LINEUP = { PG:"Jamal Murray", SG:"Christian Braun", SF:"Cameron Johnson", PF:"Aaron Gordon", C:"Nikola Jokic" };

const NUGGETS_ROSTER = [
  { name:"Jamal Murray",       position:"G", jersey:"27", height:"6'5",  college:"Kentucky",      country:"Canada",    hometown:"Kitchener, Ontario",       draft_year:"2016", draft_pick:"7",         draft_team:"Denver Nuggets",        past_teams:"None",                                                                                                                                                                                                    jazz_years:"1 season" },
  { name:"Christian Braun",    position:"G", jersey:"0",  height:"6'6",  college:"Kansas",         country:"USA",       hometown:"Burlington, Kansas",       draft_year:"2022", draft_pick:"21",        draft_team:"Denver Nuggets",        past_teams:"None",                                                                                                                                                                                                    jazz_years:"1 season" },
  { name:"Cameron Johnson",    position:"F", jersey:"23", height:"6'8",  college:"North Carolina", country:"USA",       hometown:"Pittsburgh, Pennsylvania", draft_year:"2019", draft_pick:"11",        draft_team:"Phoenix Suns",          past_teams:[{team:"Phoenix Suns",dur:"4 seasons"},{team:"Brooklyn Nets",dur:"1 season"}],                                                                                                                                 jazz_years:"1 season" },
  { name:"Aaron Gordon",       position:"F", jersey:"50", height:"6'8",  college:"Arizona",        country:"USA",       hometown:"San Jose, California",     draft_year:"2014", draft_pick:"4",         draft_team:"Orlando Magic",         past_teams:[{team:"Orlando Magic",dur:"7 seasons"}],                                                                                                                                                                  jazz_years:"1 season" },
  { name:"Nikola Jokic",       position:"C", jersey:"15", height:"6'11", college:"None",           country:"Serbia",    hometown:"Sombor, Serbia",           draft_year:"2014", draft_pick:"41",        draft_team:"Denver Nuggets",        past_teams:"None",                                                                                                                                                                                                    jazz_years:"1 season" },
  { name:"Bruce Brown",        position:"G", jersey:"11", height:"6'4",  college:"Miami",          country:"USA",       hometown:"Boston, Massachusetts",    draft_year:"2018", draft_pick:"42",        draft_team:"Detroit Pistons",       past_teams:[{team:"Detroit Pistons",dur:"2 seasons"},{team:"Brooklyn Nets",dur:"2 seasons"},{team:"Denver Nuggets",dur:"1 season"},{team:"Indiana Pacers",dur:"1 season"},{team:"Toronto Raptors",dur:"1 season"}],      jazz_years:"1 season" },
  { name:"Tim Hardaway Jr.",   position:"F", jersey:"10", height:"6'5",  college:"Michigan",       country:"USA",       hometown:"Miami, Florida",           draft_year:"2013", draft_pick:"24",        draft_team:"Golden State Warriors",  past_teams:[{team:"Golden State Warriors",dur:"1 season"},{team:"Atlanta Hawks",dur:"3 seasons"},{team:"New York Knicks",dur:"2 seasons"},{team:"Dallas Mavericks",dur:"5 seasons"}],                                  jazz_years:"1 season" },
  { name:"Julian Strawther",   position:"F", jersey:"3",  height:"6'7",  college:"Gonzaga",        country:"USA",       hometown:"Las Vegas, Nevada",        draft_year:"2023", draft_pick:"29",        draft_team:"Denver Nuggets",        past_teams:"None",                                                                                                                                                                                                    jazz_years:"1 season" },
  { name:"Peyton Watson",      position:"F", jersey:"9",  height:"6'8",  college:"UCLA",           country:"USA",       hometown:"Concord, California",      draft_year:"2022", draft_pick:"30",        draft_team:"Denver Nuggets",        past_teams:"None",                                                                                                                                                                                                    jazz_years:"1 season" },
  { name:"Jonas Valanciunas",  position:"C", jersey:"17", height:"6'11", college:"None",           country:"Lithuania", hometown:"Utena, Lithuania",         draft_year:"2011", draft_pick:"5",         draft_team:"Toronto Raptors",       past_teams:[{team:"Toronto Raptors",dur:"7 seasons"},{team:"Memphis Grizzlies",dur:"2 seasons"},{team:"New Orleans Pelicans",dur:"3 seasons"},{team:"Washington Wizards",dur:"1 season"}],                              jazz_years:"1 season" },
];

const ROCKETS_TEAM = {
  name: "Houston Rockets",
  city: "Houston",
  conference: "West",
  division: "Southwest",
  arena: "Toyota Center",
  mascot: "Clutch",
  colors: "Red, Silver, White",
  championships: "2",
  lastTitle: "1995",
  abbreviation: "HOU",
  coach: "Ime Udoka",
  coachPrevTeam: { team: "Boston Celtics", role: "Head Coach" },
  coachSince: "2022"
};

const ROCKETS_STARTING_LINEUP = { PG:"Fred VanVleet", SG:"Amen Thompson", SF:"Kevin Durant", PF:"Jabari Smith Jr.", C:"Alperen Sengun" };

const ROCKETS_ROSTER = [
  { name:"Amen Thompson",         position:"G", jersey:"1",  height:"6ft 7in",  college:"None",          country:"Bahamas",   hometown:"Nassau, Bahamas",              draft_year:"2023", draft_pick:"4",         draft_team:"Houston Rockets",       past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Fred VanVleet",         position:"G", jersey:"5",  height:"6ft 1in",  college:"Wichita State", country:"USA",       hometown:"Rockford, Illinois",           draft_year:"2016", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Toronto Raptors",dur:"6 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Reed Sheppard",         position:"G", jersey:"15", height:"6ft 3in",  college:"Kentucky",      country:"USA",       hometown:"North Middletown, Kentucky",   draft_year:"2024", draft_pick:"3",         draft_team:"Houston Rockets",       past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Aaron Holiday",         position:"G", jersey:"0",  height:"6ft 1in",  college:"UCLA",          country:"USA",       hometown:"Los Angeles, California",      draft_year:"2018", draft_pick:"23",        draft_team:"Indiana Pacers",        past_teams:[{team:"Indiana Pacers",dur:"3 seasons"},{team:"Washington Wizards",dur:"1 season"},{team:"Houston Rockets",dur:"2 seasons"},{team:"Milwaukee Bucks",dur:"1 season"}], jazz_years:"1 season" },
  { name:"J.D. Davison",          position:"G", jersey:"34", height:"6ft 3in",  college:"Alabama",       country:"USA",       hometown:"Letohatchee, Alabama",         draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Boston Celtics",dur:"2 seasons"}],                                                                                                     jazz_years:"1 season" },
  { name:"Tristen Newton",        position:"G", jersey:"3",  height:"6ft 2in",  college:"Connecticut",   country:"USA",       hometown:"Beaumont, Texas",              draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Cleveland Cavaliers",dur:"1 season"}],                                                                                                  jazz_years:"1 season" },
  { name:"Kevin Durant",          position:"F", jersey:"7",  height:"6ft 10in", college:"Texas",         country:"USA",       hometown:"Washington, D.C.",             draft_year:"2007", draft_pick:"2",         draft_team:"Seattle SuperSonics",   past_teams:[{team:"Oklahoma City Thunder",dur:"9 seasons"},{team:"Golden State Warriors",dur:"3 seasons"},{team:"Brooklyn Nets",dur:"2 seasons"},{team:"Phoenix Suns",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Tari Eason",            position:"F", jersey:"17", height:"6ft 7in",  college:"LSU",           country:"USA",       hometown:"Lakewood, Washington",         draft_year:"2022", draft_pick:"17",        draft_team:"Houston Rockets",       past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jabari Smith Jr.",      position:"F", jersey:"10", height:"6ft 10in", college:"Auburn",        country:"USA",       hometown:"Fayetteville, Georgia",        draft_year:"2022", draft_pick:"3",         draft_team:"Houston Rockets",       past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Dorian Finney-Smith",   position:"F", jersey:"28", height:"6ft 7in",  college:"Florida",       country:"USA",       hometown:"Norfolk, Virginia",            draft_year:"2016", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Dallas Mavericks",dur:"6 seasons"},{team:"Brooklyn Nets",dur:"1 season"},{team:"Los Angeles Lakers",dur:"1 season"}],                    jazz_years:"1 season" },
  { name:"Jae'Sean Tate",         position:"F", jersey:"8",  height:"6ft 4in",  college:"Ohio State",    country:"USA",       hometown:"Canton, Ohio",                 draft_year:"2018", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Josh Okogie",           position:"F", jersey:"2",  height:"6ft 4in",  college:"Georgia Tech",  country:"Nigeria",   hometown:"Lagos, Nigeria",               draft_year:"2018", draft_pick:"20",        draft_team:"Minnesota Timberwolves",past_teams:[{team:"Minnesota Timberwolves",dur:"4 seasons"},{team:"Phoenix Suns",dur:"2 seasons"}],                                                              jazz_years:"1 season" },
  { name:"Isaiah Crawford",       position:"F", jersey:"6",  height:"6ft 6in",  college:"Virginia",      country:"USA",       hometown:"Chesapeake, Virginia",         draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jeff Green",            position:"F", jersey:"32", height:"6ft 8in",  college:"Georgetown",    country:"USA",       hometown:"Cheverly, Maryland",           draft_year:"2007", draft_pick:"5",         draft_team:"Seattle SuperSonics",   past_teams:[{team:"Oklahoma City Thunder",dur:"2 seasons"},{team:"Boston Celtics",dur:"3 seasons"},{team:"Memphis Grizzlies",dur:"1 season"},{team:"LA Clippers",dur:"1 season"},{team:"Washington Wizards",dur:"2 seasons"},{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Utah Jazz",dur:"1 season"},{team:"Houston Rockets",dur:"1 season"},{team:"Denver Nuggets",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Alperen Sengun",        position:"C", jersey:"28", height:"6ft 10in", college:"None",          country:"Turkey",    hometown:"Osmaniye, Turkey",             draft_year:"2021", draft_pick:"16",        draft_team:"Houston Rockets",       past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Steven Adams",          position:"C", jersey:"12", height:"6ft 11in", college:"Pittsburgh",    country:"New Zealand",hometown:"Rotorua, New Zealand",        draft_year:"2013", draft_pick:"12",        draft_team:"Oklahoma City Thunder", past_teams:[{team:"Oklahoma City Thunder",dur:"7 seasons"},{team:"New Orleans Pelicans",dur:"2 seasons"},{team:"Memphis Grizzlies",dur:"3 seasons"}],              jazz_years:"1 season" },
  { name:"Clint Capela",          position:"C", jersey:"15", height:"6ft 10in", college:"None",          country:"Switzerland",hometown:"Geneva, Switzerland",         draft_year:"2014", draft_pick:"25",        draft_team:"Houston Rockets",       past_teams:[{team:"Houston Rockets",dur:"6 seasons"},{team:"Atlanta Hawks",dur:"5 seasons"}],                                                                   jazz_years:"1 season" },
];

const GSW_TEAM = {
  name: "Golden State Warriors",
  city: "San Francisco",
  conference: "West",
  division: "Pacific",
  arena: "Chase Center",
  mascot: "Thunder",
  colors: "Gold, Blue, White",
  championships: "4",
  lastTitle: "2022",
  abbreviation: "GSW",
  coach: "Steve Kerr",
  coachPrevTeam: { team: "None", role: "First HC job" },
  coachSince: "2014"
};

const GSW_STARTING_LINEUP = { PG:"Stephen Curry", SG:"Brandin Podziemski", SF:"Jimmy Butler III", PF:"Draymond Green", C:"Kristaps Porzingis" };

const GSW_POSITIONS = {
  "Stephen Curry":       "PG/SG",
  "Brandin Podziemski":  "SG/PG",
  "Jimmy Butler III":    "SF/SG",
  "Draymond Green":      "PF/C",
  "Kristaps Porzingis":  "C/PF",
  "Pat Spencer":         "PG/SG",
  "De'Anthony Melton":   "SG/PG",
  "Gary Payton II":      "SG/PG",
  "Moses Moody":         "SF/SG",
  "Al Horford":          "C/PF",
};

const GSW_ROTATION = {
  starters: [
    { pos:"PG/SG", name:"Stephen Curry" },
    { pos:"SG/PG", name:"Brandin Podziemski" },
    { pos:"SF/SG", name:"Jimmy Butler III" },
    { pos:"PF/C",  name:"Draymond Green" },
    { pos:"C/PF",  name:"Kristaps Porzingis" },
  ],
  bench: [
    { pos:"PG/SG", name:"Pat Spencer" },
    { pos:"SG/PG", name:"De'Anthony Melton" },
    { pos:"SG/PG", name:"Gary Payton II" },
    { pos:"SF/SG", name:"Moses Moody" },
    { pos:"C/PF",  name:"Al Horford" },
  ]
};

const GSW_ROSTER = [
  { name:"Stephen Curry",       position:"PG/SG", jersey:"30", height:"6ft 2in", college:"Davidson",      country:"USA",                hometown:"Charlotte, North Carolina",             draft_year:"2009", draft_pick:"7",         draft_team:"Golden State Warriors", past_teams:"None" },
  { name:"Brandin Podziemski",  position:"SG/PG", jersey:"2",  height:"6ft 5in", college:"Santa Clara",   country:"USA",                hometown:"Elmhurst, Illinois",                    draft_year:"2023", draft_pick:"19",        draft_team:"Golden State Warriors", past_teams:"None" },
  { name:"Jimmy Butler III",    position:"SF/SG", jersey:"10", height:"6ft 7in", college:"Marquette",     country:"USA",                hometown:"Houston, Texas",                        draft_year:"2011", draft_pick:"30",        draft_team:"Chicago Bulls",         past_teams:[{team:"Chicago Bulls",dur:"5 seasons"},{team:"Minnesota Timberwolves",dur:"1 season"},{team:"Philadelphia 76ers",dur:"1 season"},{team:"Miami Heat",dur:"5 seasons"}] },
  { name:"Draymond Green",      position:"PF/C",  jersey:"23", height:"6ft 6in", college:"Michigan State",country:"USA",                hometown:"Saginaw, Michigan",                     draft_year:"2012", draft_pick:"35",        draft_team:"Golden State Warriors", past_teams:"None" },
  { name:"Kristaps Porzingis",  position:"C/PF",  jersey:"11", height:"7ft 2in", college:"None",          country:"Latvia",             hometown:"Liepaja, Latvia",                       draft_year:"2015", draft_pick:"4",         draft_team:"New York Knicks",       past_teams:[{team:"New York Knicks",dur:"4 seasons"},{team:"Dallas Mavericks",dur:"2 seasons"},{team:"Washington Wizards",dur:"1 season"},{team:"Boston Celtics",dur:"1 season"}] },
  { name:"Pat Spencer",         position:"PG/SG", jersey:"9",  height:"6ft 3in", college:"Northwestern",  country:"USA",                hometown:"Davidsonville, Maryland",               draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:[{team:"Chicago Bulls",dur:"1 season"},{team:"Boston Celtics",dur:"1 season"}] },
  { name:"De'Anthony Melton",   position:"SG/PG", jersey:"8",  height:"6ft 4in", college:"USC",           country:"USA",                hometown:"Compton, California",                   draft_year:"2018", draft_pick:"46",        draft_team:"Houston Rockets",       past_teams:[{team:"Memphis Grizzlies",dur:"3 seasons"},{team:"Philadelphia 76ers",dur:"2 seasons"},{team:"Brooklyn Nets",dur:"1 season"}] },
  { name:"Gary Payton II",      position:"SG/PG", jersey:"0",  height:"6ft 3in", college:"Oregon State",  country:"USA",                hometown:"Oakland, California",                   draft_year:"2016", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:[{team:"Milwaukee Bucks",dur:"1 season"},{team:"Golden State Warriors",dur:"2 seasons"},{team:"Portland Trail Blazers",dur:"1 season"}] },
  { name:"Moses Moody",         position:"SF/SG", jersey:"4",  height:"6ft 6in", college:"Arkansas",      country:"USA",                hometown:"Little Rock, Arkansas",                 draft_year:"2021", draft_pick:"14",        draft_team:"Golden State Warriors", past_teams:"None" },
  { name:"Al Horford",          position:"C/PF",  jersey:"42", height:"6ft 9in", college:"Florida",       country:"Dominican Republic",  hometown:"Puerto Plata, Dominican Republic",      draft_year:"2007", draft_pick:"3",         draft_team:"Atlanta Hawks",         past_teams:[{team:"Atlanta Hawks",dur:"10 seasons"},{team:"Boston Celtics",dur:"2 seasons"},{team:"Philadelphia 76ers",dur:"2 seasons"},{team:"Oklahoma City Thunder",dur:"1 season"},{team:"Boston Celtics",dur:"3 seasons"}] },
];

const CLIPPERS_TEAM = {
  name: "LA Clippers",
  city: "Los Angeles",
  conference: "West",
  division: "Pacific",
  arena: "Intuit Dome",
  mascot: "Chuck the Condor",
  colors: "Red, Blue, White",
  championships: "0",
  lastTitle: "N/A",
  abbreviation: "LAC",
  coach: "Tyronn Lue",
  coachPrevTeam: { team: "Cleveland Cavaliers", role: "Head Coach" },
  coachSince: "2020"
};

const CLIPPERS_STARTING_LINEUP = { PG:"Darius Garland", SG:"Bradley Beal", SF:"Kawhi Leonard", PF:"John Collins", C:"Brook Lopez" };

const CLIPPERS_ROSTER = [
  { name:"Bradley Beal",                  position:"G", jersey:"3",  height:"6ft 4in",  college:"Florida",           country:"USA",      hometown:"St. Louis, Missouri",          draft_year:"2012", draft_pick:"3",         draft_team:"Washington Wizards",    past_teams:[{team:"Washington Wizards",dur:"10 seasons"},{team:"Phoenix Suns",dur:"2 seasons"}],                                                                jazz_years:"1 season" },
  { name:"Bogdan Bogdanovic",             position:"G", jersey:"10", height:"6ft 6in",  college:"None",              country:"Serbia",   hometown:"Belgrade, Serbia",             draft_year:"2014", draft_pick:"27",        draft_team:"Phoenix Suns",          past_teams:[{team:"Sacramento Kings",dur:"3 seasons"},{team:"Atlanta Hawks",dur:"4 seasons"},{team:"Milwaukee Bucks",dur:"1 season"}],                    jazz_years:"1 season" },
  { name:"Cameron Christie",             position:"G", jersey:"13", height:"6ft 6in",  college:"Minnesota",          country:"USA",      hometown:"Minnetonka, Minnesota",        draft_year:"2024", draft_pick:"32",        draft_team:"Boston Celtics",        past_teams:[{team:"Boston Celtics",dur:"1 season"}],                                                                                                          jazz_years:"1 season" },
  { name:"Kris Dunn",                    position:"G", jersey:"8",  height:"6ft 4in",  college:"Providence",         country:"USA",      hometown:"New London, Connecticut",      draft_year:"2016", draft_pick:"5",         draft_team:"Minnesota Timberwolves",past_teams:[{team:"Minnesota Timberwolves",dur:"1 season"},{team:"Chicago Bulls",dur:"3 seasons"},{team:"Atlanta Hawks",dur:"2 seasons"},{team:"Utah Jazz",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Darius Garland",               position:"G", jersey:"10", height:"6ft 1in",  college:"Vanderbilt",         country:"USA",      hometown:"Gary, Indiana",                draft_year:"2019", draft_pick:"5",         draft_team:"Cleveland Cavaliers",   past_teams:[{team:"Cleveland Cavaliers",dur:"6 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Jordan Miller",                position:"G", jersey:"10", height:"6ft 7in",  college:"Miami",              country:"USA",      hometown:"Dacula, Georgia",              draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:"None",                                                                                                                                             jazz_years:"1 season" },
  { name:"Sean Pedulla",                 position:"G", jersey:"7",  height:"6ft 1in",  college:"Virginia Tech",      country:"USA",      hometown:"Long Island, New York",        draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:"None",                                                                                                                                             jazz_years:"1 season" },
  { name:"TyTy Washington Jr.",          position:"G", jersey:"10", height:"6ft 4in",  college:"Kentucky",           country:"USA",      hometown:"Las Vegas, Nevada",            draft_year:"2022", draft_pick:"29",        draft_team:"Houston Rockets",       past_teams:[{team:"Houston Rockets",dur:"2 seasons"}],                                                                                                        jazz_years:"1 season" },
  { name:"Nicolas Batum",                position:"F", jersey:"33", height:"6ft 8in",  college:"None",              country:"France",   hometown:"Lisieux, France",              draft_year:"2008", draft_pick:"25",        draft_team:"Portland Trail Blazers",past_teams:[{team:"Portland Trail Blazers",dur:"7 seasons"},{team:"Charlotte Hornets",dur:"4 seasons"},{team:"LA Clippers",dur:"4 seasons"},{team:"Philadelphia 76ers",dur:"1 season"}], jazz_years:"1 season" },
  { name:"John Collins",                 position:"F", jersey:"20", height:"6ft 9in",  college:"Wake Forest",        country:"USA",      hometown:"West Palm Beach, Florida",     draft_year:"2017", draft_pick:"19",        draft_team:"Atlanta Hawks",         past_teams:[{team:"Atlanta Hawks",dur:"6 seasons"},{team:"Utah Jazz",dur:"1 season"}],                                                                       jazz_years:"1 season" },
  { name:"Isaiah Jackson",               position:"F", jersey:"22", height:"6ft 11in", college:"Kentucky",           country:"USA",      hometown:"Plainfield, Indiana",          draft_year:"2021", draft_pick:"22",        draft_team:"Indiana Pacers",        past_teams:[{team:"Indiana Pacers",dur:"3 seasons"}],                                                                                                         jazz_years:"1 season" },
  { name:"Derrick Jones Jr.",            position:"F", jersey:"55", height:"6ft 7in",  college:"UNLV",               country:"USA",      hometown:"Las Vegas, Nevada",            draft_year:"2016", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:[{team:"Phoenix Suns",dur:"1 season"},{team:"Miami Heat",dur:"3 seasons"},{team:"Portland Trail Blazers",dur:"1 season"},{team:"Chicago Bulls",dur:"2 seasons"},{team:"Dallas Mavericks",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Kawhi Leonard",                position:"F", jersey:"2",  height:"6ft 7in",  college:"San Diego State",    country:"USA",      hometown:"Los Angeles, California",      draft_year:"2011", draft_pick:"15",        draft_team:"Indiana Pacers",        past_teams:[{team:"San Antonio Spurs",dur:"7 seasons"},{team:"Toronto Raptors",dur:"1 season"}],                                                              jazz_years:"1 season" },
  { name:"Bennedict Mathurin",           position:"F", jersey:"00", height:"6ft 6in",  college:"Arizona",            country:"Canada",   hometown:"Montreal, Canada",             draft_year:"2022", draft_pick:"6",         draft_team:"Indiana Pacers",        past_teams:[{team:"Indiana Pacers",dur:"2 seasons"}],                                                                                                         jazz_years:"1 season" },
  { name:"Yanic Konan Niederhauser",     position:"F", jersey:"18", height:"6ft 10in", college:"None",              country:"France",   hometown:"Paris, France",                draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:"None",                                                                                                                                             jazz_years:"1 season" },
  { name:"Norchad Omier",                position:"F", jersey:"15", height:"6ft 7in",  college:"Arkansas State",     country:"Nicaragua",hometown:"Managua, Nicaragua",           draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:[{team:"Miami Heat",dur:"1 season"}],                                                                                                              jazz_years:"1 season" },
  { name:"Kobe Sanders",                 position:"F", jersey:"25", height:"6ft 6in",  college:"Tennessee",          country:"USA",      hometown:"Knoxville, Tennessee",         draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:"None",                                                                                                                                             jazz_years:"1 season" },
  { name:"Brook Lopez",                  position:"C", jersey:"11", height:"7ft 0in",  college:"Stanford",           country:"USA",      hometown:"North Hollywood, California",  draft_year:"2008", draft_pick:"10",        draft_team:"New Jersey Nets",       past_teams:[{team:"Brooklyn Nets",dur:"9 seasons"},{team:"Los Angeles Lakers",dur:"1 season"},{team:"Milwaukee Bucks",dur:"6 seasons"}],                    jazz_years:"1 season" },
];

const LAKERS_TEAM = {
  name: "Los Angeles Lakers",
  city: "Los Angeles",
  conference: "West",
  division: "Pacific",
  arena: "Crypto.com Arena",
  mascot: "None",
  colors: "Purple, Gold, White",
  championships: "17",
  lastTitle: "2020",
  abbreviation: "LAL",
  coach: "JJ Redick",
  coachPrevTeam: { team: "None", role: "First HC job" },
  coachSince: "2024"
};

const LAKERS_STARTING_LINEUP = { PG:"Luka Doncic", SG:"Austin Reaves", SF:"LeBron James", PF:"Rui Hachimura", C:"Deandre Ayton" };

const LAKERS_ROSTER = [
  { name:"Luka Doncic",       position:"G", jersey:"77", height:"6ft 7in",  college:"None",          country:"Slovenia",   hometown:"Ljubljana, Slovenia",         draft_year:"2018", draft_pick:"3",         draft_team:"Atlanta Hawks",         past_teams:[{team:"Dallas Mavericks",dur:"7 seasons"}],                                                                                                               jazz_years:"1 season" },
  { name:"Austin Reaves",     position:"G", jersey:"15", height:"6ft 5in",  college:"Arkansas",      country:"USA",        hometown:"Newark, Arkansas",            draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:"None",                                                                                                                                                    jazz_years:"1 season" },
  { name:"Marcus Smart",      position:"G", jersey:"36", height:"6ft 4in",  college:"Oklahoma State",country:"USA",        hometown:"Flower Mound, Texas",         draft_year:"2014", draft_pick:"6",         draft_team:"Boston Celtics",        past_teams:[{team:"Boston Celtics",dur:"9 seasons"},{team:"Memphis Grizzlies",dur:"1 season"},{team:"Portland Trail Blazers",dur:"1 season"}],                     jazz_years:"1 season" },
  { name:"Gabe Vincent",      position:"G", jersey:"7",  height:"6ft 3in",  college:"UC Santa Barbara",country:"USA",      hometown:"Modesto, California",         draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:[{team:"Miami Heat",dur:"3 seasons"}],                                                                                                                     jazz_years:"1 season" },
  { name:"Bronny James",      position:"G", jersey:"9",  height:"6ft 2in",  college:"USC",           country:"USA",        hometown:"Los Angeles, California",     draft_year:"2024", draft_pick:"55",        draft_team:"Los Angeles Lakers",    past_teams:"None",                                                                                                                                                    jazz_years:"1 season" },
  { name:"Dalton Knecht",     position:"G", jersey:"4",  height:"6ft 6in",  college:"Tennessee",     country:"USA",        hometown:"Broomfield, Colorado",        draft_year:"2024", draft_pick:"17",        draft_team:"Los Angeles Lakers",    past_teams:"None",                                                                                                                                                    jazz_years:"1 season" },
  { name:"Kobe Bufkin",       position:"G", jersey:"10", height:"6ft 4in",  college:"Michigan",      country:"USA",        hometown:"Grand Rapids, Michigan",      draft_year:"2023", draft_pick:"15",        draft_team:"Atlanta Hawks",         past_teams:[{team:"Atlanta Hawks",dur:"1 season"}],                                                                                                                   jazz_years:"1 season" },
  { name:"LeBron James",      position:"F", jersey:"23", height:"6ft 9in",  college:"None",          country:"USA",        hometown:"Akron, Ohio",                 draft_year:"2003", draft_pick:"1",         draft_team:"Cleveland Cavaliers",   past_teams:[{team:"Cleveland Cavaliers",dur:"7 seasons"},{team:"Miami Heat",dur:"4 seasons"},{team:"Cleveland Cavaliers",dur:"3 seasons"}],                         jazz_years:"1 season" },
  { name:"Rui Hachimura",     position:"F", jersey:"28", height:"6ft 8in",  college:"Gonzaga",       country:"Japan",      hometown:"Toyama, Japan",               draft_year:"2019", draft_pick:"9",         draft_team:"Washington Wizards",    past_teams:[{team:"Washington Wizards",dur:"3 seasons"}],                                                                                                             jazz_years:"1 season" },
  { name:"Jarred Vanderbilt", position:"F", jersey:"2",  height:"6ft 9in",  college:"Kentucky",      country:"USA",        hometown:"Edmond, Oklahoma",            draft_year:"2018", draft_pick:"41",        draft_team:"New York Knicks",       past_teams:[{team:"Denver Nuggets",dur:"3 seasons"},{team:"Minnesota Timberwolves",dur:"1 season"},{team:"Utah Jazz",dur:"1 season"}],                               jazz_years:"1 season" },
  { name:"Jake LaRavia",      position:"F", jersey:"12", height:"6ft 9in",  college:"Wake Forest",   country:"USA",        hometown:"Indianapolis, Indiana",       draft_year:"2022", draft_pick:"19",        draft_team:"Memphis Grizzlies",     past_teams:[{team:"Memphis Grizzlies",dur:"2 seasons"}],                                                                                                              jazz_years:"1 season" },
  { name:"Cam Reddish",       position:"F", jersey:"5",  height:"6ft 8in",  college:"Duke",          country:"USA",        hometown:"Norristown, Pennsylvania",    draft_year:"2019", draft_pick:"10",        draft_team:"Atlanta Hawks",         past_teams:[{team:"Atlanta Hawks",dur:"2 seasons"},{team:"New York Knicks",dur:"1 season"},{team:"Portland Trail Blazers",dur:"1 season"},{team:"Los Angeles Lakers",dur:"1 season"},{team:"Oklahoma City Thunder",dur:"1 season"},{team:"Chicago Bulls",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Deandre Ayton",     position:"C", jersey:"2",  height:"7ft 0in",  college:"Arizona",       country:"Bahamas",    hometown:"Nassau, Bahamas",             draft_year:"2018", draft_pick:"1",         draft_team:"Phoenix Suns",          past_teams:[{team:"Phoenix Suns",dur:"5 seasons"},{team:"Portland Trail Blazers",dur:"2 seasons"}],                                                                   jazz_years:"1 season" },
  { name:"Jaxson Hayes",      position:"C", jersey:"11", height:"7ft 0in",  college:"Texas",         country:"USA",        hometown:"St. Louis, Missouri",         draft_year:"2019", draft_pick:"8",         draft_team:"New Orleans Pelicans",  past_teams:[{team:"New Orleans Pelicans",dur:"5 seasons"}],                                                                                                           jazz_years:"1 season" },
  { name:"Maxi Kleber",       position:"C", jersey:"42", height:"6ft 10in", college:"None",          country:"Germany",    hometown:"Wurzburg, Germany",           draft_year:"2014", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:[{team:"Dallas Mavericks",dur:"7 seasons"}],                                                                                                               jazz_years:"1 season" },
];

const GRIZZLIES_TEAM = {
  name: "Memphis Grizzlies",
  city: "Memphis",
  conference: "West",
  division: "Southwest",
  arena: "FedExForum",
  mascot: "Grizz",
  colors: "Navy, Gold, Turquoise",
  championships: "0",
  lastTitle: "N/A",
  abbreviation: "MEM",
  coach: "Taylor Jenkins",
  coachPrevTeam: { team: "Atlanta Hawks", role: "Assistant Coach" },
  coachSince: "2019"
};

const GRIZZLIES_STARTING_LINEUP = { PG:"Ja Morant", SG:"Kentavious Caldwell-Pope", SF:"Jaylen Wells", PF:"Taylor Hendricks", C:"Zach Edey" };

const GRIZZLIES_ROSTER = [
  { name:"Ja Morant",                    position:"G", jersey:"12", height:"6ft 3in",  college:"Murray State",    country:"USA",      hometown:"Dalzell, South Carolina",      draft_year:"2019", draft_pick:"2",         draft_team:"Memphis Grizzlies",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Ty Jerome",                    position:"G", jersey:"10", height:"6ft 5in",  college:"Virginia",        country:"USA",      hometown:"Bronxville, New York",         draft_year:"2019", draft_pick:"24",        draft_team:"Phoenix Suns",          past_teams:[{team:"Phoenix Suns",dur:"1 season"},{team:"Oklahoma City Thunder",dur:"1 season"},{team:"Golden State Warriors",dur:"1 season"},{team:"Cleveland Cavaliers",dur:"3 seasons"}], jazz_years:"1 season" },
  { name:"Scotty Pippen Jr.",            position:"G", jersey:"1",  height:"6ft 3in",  college:"Vanderbilt",      country:"USA",      hometown:"Los Angeles, California",      draft_year:"2022", draft_pick:"45",        draft_team:"Memphis Grizzlies",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Javon Small",                  position:"G", jersey:"5",  height:"6ft 2in",  college:"West Virginia",   country:"USA",      hometown:"Clarksburg, West Virginia",    draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Cam Spencer",                  position:"G", jersey:"2",  height:"6ft 4in",  college:"Connecticut",     country:"USA",      hometown:"Brookfield, Connecticut",      draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:[{team:"Brooklyn Nets",dur:"1 season"}],                                                                                                    jazz_years:"1 season" },
  { name:"Cedric Coward",                position:"G", jersey:"19", height:"6ft 6in",  college:"Washington State",country:"USA",      hometown:"Sacramento, California",       draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Walter Clayton Jr.",           position:"G", jersey:"11", height:"6ft 3in",  college:"Florida",         country:"USA",      hometown:"Queens, New York",             draft_year:"2024", draft_pick:"32",        draft_team:"Memphis Grizzlies",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Taylor Hendricks",             position:"F", jersey:"0",  height:"6ft 9in",  college:"UCF",             country:"USA",      hometown:"Boynton Beach, Florida",       draft_year:"2023", draft_pick:"9",         draft_team:"Utah Jazz",             past_teams:[{team:"Utah Jazz",dur:"1 season"}],                                                                                                        jazz_years:"1 season" },
  { name:"GG Jackson II",               position:"F", jersey:"45", height:"6ft 9in",  college:"South Carolina",  country:"USA",      hometown:"Columbia, South Carolina",     draft_year:"2023", draft_pick:"45",        draft_team:"Memphis Grizzlies",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jaylen Wells",                 position:"F", jersey:"0",  height:"6ft 6in",  college:"Washington State",country:"USA",      hometown:"Renton, Washington",           draft_year:"2024", draft_pick:"39",        draft_team:"Memphis Grizzlies",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jahmai Mashack",               position:"F", jersey:"4",  height:"6ft 5in",  college:"Tennessee",       country:"USA",      hometown:"Houston, Texas",               draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Olivier-Maxence Prosper",      position:"F", jersey:"13", height:"6ft 8in",  college:"Marquette",       country:"Canada",   hometown:"Montreal, Canada",             draft_year:"2023", draft_pick:"21",        draft_team:"Dallas Mavericks",      past_teams:[{team:"Dallas Mavericks",dur:"1 season"}],                                                                                                 jazz_years:"1 season" },
  { name:"Rayan Rupert",                 position:"F", jersey:"8",  height:"6ft 7in",  college:"None",            country:"France",   hometown:"Paris, France",                draft_year:"2023", draft_pick:"43",        draft_team:"New York Knicks",       past_teams:[{team:"New York Knicks",dur:"1 season"}],                                                                                                  jazz_years:"1 season" },
  { name:"Taj Gibson",                   position:"F", jersey:"67", height:"6ft 9in",  college:"USC",             country:"USA",      hometown:"Brooklyn, New York",           draft_year:"2009", draft_pick:"26",        draft_team:"Chicago Bulls",         past_teams:[{team:"Chicago Bulls",dur:"7 seasons"},{team:"Oklahoma City Thunder",dur:"1 season"},{team:"Minnesota Timberwolves",dur:"2 seasons"},{team:"New York Knicks",dur:"2 seasons"},{team:"Washington Wizards",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Zach Edey",                    position:"C", jersey:"14", height:"7ft 4in",  college:"Purdue",          country:"Canada",   hometown:"Toronto, Canada",              draft_year:"2024", draft_pick:"9",         draft_team:"Memphis Grizzlies",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Santi Aldama",                 position:"C", jersey:"7",  height:"6ft 11in", college:"Loyola Maryland", country:"Spain",    hometown:"Las Palmas, Spain",            draft_year:"2021", draft_pick:"30",        draft_team:"Memphis Grizzlies",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Brandon Clarke",               position:"C", jersey:"15", height:"6ft 8in",  college:"Gonzaga",         country:"Canada",   hometown:"Calgary, Canada",              draft_year:"2019", draft_pick:"21",        draft_team:"Memphis Grizzlies",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
];

const TWOLVES_TEAM = {
  name: "Minnesota Timberwolves",
  city: "Minneapolis",
  conference: "West",
  division: "Northwest",
  arena: "Target Center",
  mascot: "Crunch",
  colors: "Blue, Green, Silver",
  championships: "0",
  lastTitle: "N/A",
  abbreviation: "MIN",
  coach: "Chris Finch",
  coachPrevTeam: { team: "Houston Rockets", role: "Assistant Coach" },
  coachSince: "2021"
};

const TWOLVES_STARTING_LINEUP = { PG:"Donte DiVincenzo", SG:"Anthony Edwards", SF:"Jaden McDaniels", PF:"Julius Randle", C:"Rudy Gobert" };

const TWOLVES_ROSTER = [
  { name:"Anthony Edwards",      position:"G", jersey:"5",  height:"6ft 4in",  college:"Georgia",         country:"USA",      hometown:"Atlanta, Georgia",             draft_year:"2020", draft_pick:"1",         draft_team:"Minnesota Timberwolves", past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Donte DiVincenzo",     position:"G", jersey:"0",  height:"6ft 4in",  college:"Villanova",       country:"USA",      hometown:"Wilmington, Delaware",         draft_year:"2018", draft_pick:"17",        draft_team:"Milwaukee Bucks",        past_teams:[{team:"Milwaukee Bucks",dur:"3 seasons"},{team:"Sacramento Kings",dur:"1 season"},{team:"Golden State Warriors",dur:"1 season"},{team:"New York Knicks",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Bones Hyland",         position:"G", jersey:"3",  height:"6ft 3in",  college:"VCU",             country:"USA",      hometown:"Wilmington, Delaware",         draft_year:"2021", draft_pick:"26",        draft_team:"Denver Nuggets",         past_teams:[{team:"Denver Nuggets",dur:"1 season"},{team:"LA Clippers",dur:"2 seasons"},{team:"Phoenix Suns",dur:"1 season"}],                              jazz_years:"1 season" },
  { name:"Ayo Dosunmu",          position:"G", jersey:"12", height:"6ft 5in",  college:"Illinois",        country:"USA",      hometown:"Chicago, Illinois",            draft_year:"2021", draft_pick:"38",        draft_team:"Chicago Bulls",          past_teams:[{team:"Chicago Bulls",dur:"3 seasons"}],                                                                                                          jazz_years:"1 season" },
  { name:"Mike Conley",          position:"G", jersey:"10", height:"6ft 1in",  college:"Ohio State",      country:"USA",      hometown:"Indianapolis, Indiana",        draft_year:"2007", draft_pick:"4",         draft_team:"Memphis Grizzlies",      past_teams:[{team:"Memphis Grizzlies",dur:"12 seasons"},{team:"Utah Jazz",dur:"2 seasons"}],                                                                   jazz_years:"1 season" },
  { name:"Jaylen Clark",         position:"G", jersey:"5",  height:"6ft 5in",  college:"UCLA",            country:"USA",      hometown:"Inglewood, California",        draft_year:"2023", draft_pick:"36",        draft_team:"Minnesota Timberwolves", past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Zyon Pullin",          position:"G", jersey:"22", height:"6ft 3in",  college:"UC Riverside",    country:"USA",      hometown:"Los Angeles, California",      draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jaden McDaniels",      position:"F", jersey:"3",  height:"6ft 9in",  college:"Washington",      country:"USA",      hometown:"Federal Way, Washington",      draft_year:"2020", draft_pick:"28",        draft_team:"Minnesota Timberwolves", past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Julius Randle",        position:"F", jersey:"30", height:"6ft 9in",  college:"Kentucky",        country:"USA",      hometown:"Dallas, Texas",                draft_year:"2014", draft_pick:"7",         draft_team:"Los Angeles Lakers",     past_teams:[{team:"Los Angeles Lakers",dur:"4 seasons"},{team:"New Orleans Pelicans",dur:"1 season"},{team:"New York Knicks",dur:"5 seasons"}],              jazz_years:"1 season" },
  { name:"Kyle Anderson",        position:"F", jersey:"1",  height:"6ft 9in",  college:"UCLA",            country:"USA",      hometown:"East Brunswick, New Jersey",   draft_year:"2014", draft_pick:"30",        draft_team:"San Antonio Spurs",      past_teams:[{team:"San Antonio Spurs",dur:"5 seasons"},{team:"Memphis Grizzlies",dur:"2 seasons"},{team:"Golden State Warriors",dur:"1 season"}],             jazz_years:"1 season" },
  { name:"Terrence Shannon Jr.", position:"F", jersey:"0",  height:"6ft 6in",  college:"Illinois",        country:"USA",      hometown:"Harvey, Illinois",             draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Chicago Bulls",dur:"1 season"}],                                                                                                           jazz_years:"1 season" },
  { name:"Julian Phillips",      position:"F", jersey:"13", height:"6ft 8in",  college:"Tennessee",       country:"USA",      hometown:"Rock Hill, South Carolina",    draft_year:"2023", draft_pick:"35",        draft_team:"Chicago Bulls",          past_teams:[{team:"Chicago Bulls",dur:"1 season"}],                                                                                                           jazz_years:"1 season" },
  { name:"Rudy Gobert",          position:"C", jersey:"27", height:"7ft 1in",  college:"None",            country:"France",   hometown:"Saint-Quentin, France",        draft_year:"2013", draft_pick:"27",        draft_team:"Utah Jazz",              past_teams:[{team:"Utah Jazz",dur:"9 seasons"}],                                                                                                               jazz_years:"1 season" },
  { name:"Naz Reid",             position:"C", jersey:"11", height:"6ft 9in",  college:"LSU",             country:"USA",      hometown:"Asbury Park, New Jersey",      draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Joan Beringer",        position:"C", jersey:"17", height:"7ft 1in",  college:"None",            country:"Spain",    hometown:"Manresa, Spain",               draft_year:"2024", draft_pick:"28",        draft_team:"Minnesota Timberwolves", past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Rocco Zikarsky",       position:"C", jersey:"55", height:"7ft 3in",  college:"None",            country:"Australia",hometown:"Brisbane, Australia",          draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Enrique Freeman",      position:"C", jersey:"25", height:"6ft 8in",  college:"Akron",           country:"USA",      hometown:"Baltimore, Maryland",          draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Indiana Pacers",dur:"1 season"}],                                                                                                           jazz_years:"1 season" },
];

const PELICANS_TEAM = {
  name: "New Orleans Pelicans",
  city: "New Orleans",
  conference: "West",
  division: "Southwest",
  arena: "Smoothie King Center",
  mascot: "Pierre the Pelican",
  colors: "Navy, Gold, Red",
  championships: "0",
  lastTitle: "N/A",
  abbreviation: "NOP",
  coach: "Willie Green",
  coachPrevTeam: { team: "Golden State Warriors", role: "Assistant Coach" },
  coachSince: "2021"
};

const PELICANS_STARTING_LINEUP = { PG:"Dejounte Murray", SG:"Trey Murphy III", SF:"Saddiq Bey", PF:"Zion Williamson", C:"Derik Queen" };

const PELICANS_ROSTER = [
  { name:"Dejounte Murray",    position:"G", jersey:"5",  height:"6ft 5in",  college:"Washington",    country:"USA",      hometown:"Seattle, Washington",          draft_year:"2016", draft_pick:"29",        draft_team:"San Antonio Spurs",     past_teams:[{team:"San Antonio Spurs",dur:"5 seasons"},{team:"Atlanta Hawks",dur:"2 seasons"}],                                                                    jazz_years:"1 season" },
  { name:"Jordan Poole",       position:"G", jersey:"13", height:"6ft 4in",  college:"Michigan",      country:"USA",      hometown:"Milwaukee, Wisconsin",         draft_year:"2019", draft_pick:"28",        draft_team:"Golden State Warriors",  past_teams:[{team:"Golden State Warriors",dur:"4 seasons"},{team:"Washington Wizards",dur:"1 season"}],                                                          jazz_years:"1 season" },
  { name:"Jeremiah Fears",     position:"G", jersey:"7",  height:"6ft 3in",  college:"Oklahoma",      country:"USA",      hometown:"Overland Park, Kansas",        draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jose Alvarado",      position:"G", jersey:"15", height:"6ft 0in",  college:"Georgia Tech",  country:"USA",      hometown:"Brooklyn, New York",           draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jordan Hawkins",     position:"G", jersey:"0",  height:"6ft 5in",  college:"Connecticut",   country:"USA",      hometown:"Brandywine, Maryland",         draft_year:"2023", draft_pick:"14",        draft_team:"New Orleans Pelicans",   past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Trey Alexander",     position:"G", jersey:"23", height:"6ft 4in",  college:"Creighton",     country:"USA",      hometown:"St. Louis, Missouri",          draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Zion Williamson",    position:"F", jersey:"1",  height:"6ft 6in",  college:"Duke",          country:"USA",      hometown:"Salisbury, North Carolina",    draft_year:"2019", draft_pick:"1",         draft_team:"New Orleans Pelicans",   past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Saddiq Bey",         position:"F", jersey:"41", height:"6ft 8in",  college:"Villanova",     country:"USA",      hometown:"Washington, D.C.",             draft_year:"2020", draft_pick:"19",        draft_team:"Detroit Pistons",        past_teams:[{team:"Detroit Pistons",dur:"2 seasons"},{team:"Atlanta Hawks",dur:"2 seasons"},{team:"Cleveland Cavaliers",dur:"1 season"}],                    jazz_years:"1 season" },
  { name:"Herbert Jones",      position:"F", jersey:"5",  height:"6ft 7in",  college:"Alabama",       country:"USA",      hometown:"Greensboro, Alabama",          draft_year:"2021", draft_pick:"35",        draft_team:"New Orleans Pelicans",   past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Trey Murphy III",    position:"F", jersey:"25", height:"6ft 8in",  college:"Virginia",      country:"USA",      hometown:"Chapel Hill, North Carolina",  draft_year:"2021", draft_pick:"17",        draft_team:"New Orleans Pelicans",   past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Bryce McGowens",     position:"F", jersey:"8",  height:"6ft 7in",  college:"Nebraska",      country:"USA",      hometown:"Greenville, South Carolina",   draft_year:"2022", draft_pick:"40",        draft_team:"Charlotte Hornets",      past_teams:[{team:"Charlotte Hornets",dur:"1 season"},{team:"Portland Trail Blazers",dur:"1 season"},{team:"Minnesota Timberwolves",dur:"1 season"}],           jazz_years:"1 season" },
  { name:"Micah Peavy",        position:"F", jersey:"6",  height:"6ft 7in",  college:"TCU",           country:"USA",      hometown:"Dallas, Texas",                draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Portland Trail Blazers",dur:"1 season"}],                                                                                                  jazz_years:"1 season" },
  { name:"Derik Queen",        position:"C", jersey:"6",  height:"6ft 10in", college:"Maryland",      country:"USA",      hometown:"Baltimore, Maryland",          draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Karlo Matkovic",     position:"C", jersey:"9",  height:"7ft 0in",  college:"None",          country:"Croatia",  hometown:"Zagreb, Croatia",              draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Yves Missi",         position:"C", jersey:"21", height:"7ft 0in",  college:"Baylor",        country:"Cameroon", hometown:"Yaounde, Cameroon",            draft_year:"2024", draft_pick:"21",        draft_team:"New Orleans Pelicans",   past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Kevon Looney",       position:"C", jersey:"5",  height:"6ft 9in",  college:"UCLA",          country:"USA",      hometown:"Milwaukee, Wisconsin",         draft_year:"2015", draft_pick:"30",        draft_team:"Golden State Warriors",  past_teams:[{team:"Golden State Warriors",dur:"10 seasons"}],                                                                                                  jazz_years:"1 season" },
  { name:"DeAndre Jordan",     position:"C", jersey:"6",  height:"6ft 11in", college:"Texas A&M",     country:"USA",      hometown:"Houston, Texas",               draft_year:"2008", draft_pick:"35",        draft_team:"Houston Rockets",        past_teams:[{team:"LA Clippers",dur:"9 seasons"},{team:"Dallas Mavericks",dur:"1 season"},{team:"New York Knicks",dur:"1 season"},{team:"Brooklyn Nets",dur:"2 seasons"},{team:"Los Angeles Lakers",dur:"1 season"},{team:"Philadelphia 76ers",dur:"1 season"},{team:"Denver Nuggets",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Hunter Dickinson",   position:"C", jersey:"1",  height:"7ft 1in",  college:"Kansas",        country:"USA",      hometown:"Alexandria, Virginia",         draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Minnesota Timberwolves",dur:"1 season"}],                                                                                                   jazz_years:"1 season" },
  { name:"Josh Oduro",         position:"C", jersey:"3",  height:"6ft 11in", college:"Providence",    country:"Ghana",    hometown:"Accra, Ghana",                 draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
];

const OKC_TEAM = {
  name: "Oklahoma City Thunder",
  city: "Oklahoma City",
  conference: "West",
  division: "Northwest",
  arena: "Paycom Center",
  mascot: "Rumble the Bison",
  colors: "Blue, Orange, Gold",
  championships: "1",
  lastTitle: "1979",
  abbreviation: "OKC",
  coach: "Mark Daigneault",
  coachPrevTeam: { team: "OKC Blue (G League)", role: "Head Coach" },
  coachSince: "2020"
};

const OKC_STARTING_LINEUP = { PG:"Shai Gilgeous-Alexander", SG:"Luguentz Dort", SF:"Jalen Williams", PF:"Chet Holmgren", C:"Isaiah Hartenstein" };

const OKC_ROSTER = [
  { name:"Shai Gilgeous-Alexander", position:"G", jersey:"2",  height:"6ft 6in",  college:"Kentucky",        country:"Canada",    hometown:"Hamilton, Ontario, Canada",    draft_year:"2018", draft_pick:"11",        draft_team:"Charlotte Hornets",      past_teams:[{team:"LA Clippers",dur:"1 season"}],                                                                                                              jazz_years:"1 season" },
  { name:"Luguentz Dort",           position:"G", jersey:"5",  height:"6ft 4in",  college:"Arizona State",   country:"Canada",    hometown:"Montreal, Canada",             draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Cason Wallace",           position:"G", jersey:"6",  height:"6ft 4in",  college:"Kentucky",        country:"USA",       hometown:"Fort Worth, Texas",            draft_year:"2023", draft_pick:"10",        draft_team:"Oklahoma City Thunder",  past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Alex Caruso",             position:"G", jersey:"9",  height:"6ft 5in",  college:"Texas A&M",       country:"USA",       hometown:"College Station, Texas",       draft_year:"2016", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Los Angeles Lakers",dur:"3 seasons"},{team:"Chicago Bulls",dur:"3 seasons"},{team:"Milwaukee Bucks",dur:"1 season"}],                   jazz_years:"1 season" },
  { name:"Isaiah Joe",              position:"G", jersey:"11", height:"6ft 4in",  college:"Arkansas",        country:"USA",       hometown:"Fort Smith, Arkansas",         draft_year:"2020", draft_pick:"49",        draft_team:"Philadelphia 76ers",     past_teams:[{team:"Philadelphia 76ers",dur:"2 seasons"}],                                                                                                      jazz_years:"1 season" },
  { name:"Ajay Mitchell",           position:"G", jersey:"12", height:"6ft 5in",  college:"UC Santa Barbara",country:"Canada",    hometown:"Nanaimo, British Columbia",    draft_year:"2024", draft_pick:"34",        draft_team:"Oklahoma City Thunder",  past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jared McCain",            position:"G", jersey:"6",  height:"6ft 2in",  college:"Duke",            country:"USA",       hometown:"Riverside, California",        draft_year:"2024", draft_pick:"16",        draft_team:"Philadelphia 76ers",     past_teams:[{team:"Philadelphia 76ers",dur:"1 season"}],                                                                                                       jazz_years:"1 season" },
  { name:"Nikola Topic",            position:"G", jersey:"10", height:"6ft 6in",  college:"None",            country:"Serbia",    hometown:"Belgrade, Serbia",             draft_year:"2024", draft_pick:"12",        draft_team:"Oklahoma City Thunder",  past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jalen Williams",          position:"F", jersey:"8",  height:"6ft 6in",  college:"Santa Clara",     country:"USA",       hometown:"Gilbert, Arizona",             draft_year:"2022", draft_pick:"12",        draft_team:"Oklahoma City Thunder",  past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Aaron Wiggins",           position:"F", jersey:"21", height:"6ft 5in",  college:"Maryland",        country:"Canada",    hometown:"Shelburne, Nova Scotia",       draft_year:"2021", draft_pick:"55",        draft_team:"Oklahoma City Thunder",  past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Kenrich Williams",        position:"F", jersey:"34", height:"6ft 7in",  college:"TCU",             country:"USA",       hometown:"Monroe, Louisiana",            draft_year:"2018", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"New Orleans Pelicans",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Jaylin Williams",         position:"F", jersey:"6",  height:"6ft 10in", college:"Arkansas",        country:"USA",       hometown:"Fort Smith, Arkansas",         draft_year:"2022", draft_pick:"34",        draft_team:"Oklahoma City Thunder",  past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Chet Holmgren",           position:"C", jersey:"7",  height:"7ft 1in",  college:"Gonzaga",         country:"USA",       hometown:"Minneapolis, Minnesota",       draft_year:"2022", draft_pick:"2",         draft_team:"Oklahoma City Thunder",  past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Isaiah Hartenstein",      position:"C", jersey:"55", height:"7ft 0in",  college:"None",            country:"Germany",   hometown:"Portland, Oregon",             draft_year:"2017", draft_pick:"43",        draft_team:"Houston Rockets",        past_teams:[{team:"Houston Rockets",dur:"1 season"},{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Denver Nuggets",dur:"2 seasons"},{team:"Los Angeles Clippers",dur:"1 season"},{team:"New York Knicks",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Branden Carlson",         position:"C", jersey:"1",  height:"7ft 1in",  college:"Utah",            country:"USA",       hometown:"Long Beach, California",       draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Utah Jazz",dur:"2 seasons"}],                                                                                                               jazz_years:"1 season" },
];

const SUNS_TEAM = {
  name: "Phoenix Suns",
  city: "Phoenix",
  conference: "West",
  division: "Pacific",
  arena: "Footprint Center",
  mascot: "Go",
  colors: "Purple, Orange, Black",
  championships: "0",
  lastTitle: "N/A",
  abbreviation: "PHX",
  coach: "Mike Budenholzer",
  coachPrevTeam: { team: "Milwaukee Bucks", role: "Head Coach" },
  coachSince: "2023"
};

const SUNS_STARTING_LINEUP = { PG:"Devin Booker", SG:"Jalen Green", SF:"Dillon Brooks", PF:"Royce O'Neale", C:"Mark Williams" };

const SUNS_ROSTER = [
  { name:"Devin Booker",      position:"G", jersey:"1",  height:"6ft 5in",  college:"Kentucky",       country:"USA",      hometown:"Grand Rapids, Michigan",       draft_year:"2015", draft_pick:"13",        draft_team:"Phoenix Suns",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jalen Green",       position:"G", jersey:"14", height:"6ft 4in",  college:"None",            country:"USA",      hometown:"Fresno, California",           draft_year:"2021", draft_pick:"2",         draft_team:"Houston Rockets",        past_teams:[{team:"Houston Rockets",dur:"4 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Grayson Allen",     position:"G", jersey:"8",  height:"6ft 4in",  college:"Duke",            country:"USA",      hometown:"Jacksonville, Florida",        draft_year:"2018", draft_pick:"21",        draft_team:"Utah Jazz",              past_teams:[{team:"Utah Jazz",dur:"1 season"},{team:"Memphis Grizzlies",dur:"1 season"},{team:"Milwaukee Bucks",dur:"2 seasons"},{team:"Phoenix Suns",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Collin Gillespie",  position:"G", jersey:"7",  height:"6ft 3in",  college:"Villanova",       country:"USA",      hometown:"Philadelphia, Pennsylvania",   draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Toronto Raptors",dur:"1 season"},{team:"Los Angeles Lakers",dur:"1 season"}],                                                          jazz_years:"1 season" },
  { name:"Jordan Goodwin",    position:"G", jersey:"4",  height:"6ft 3in",  college:"Saint Louis",     country:"USA",      hometown:"St. Louis, Missouri",          draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Washington Wizards",dur:"1 season"},{team:"Houston Rockets",dur:"1 season"},{team:"Memphis Grizzlies",dur:"1 season"}],                  jazz_years:"1 season" },
  { name:"Jamaree Bouyea",    position:"G", jersey:"5",  height:"6ft 2in",  college:"San Francisco",   country:"USA",      hometown:"San Diego, California",        draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Golden State Warriors",dur:"1 season"},{team:"Portland Trail Blazers",dur:"1 season"}],                                                  jazz_years:"1 season" },
  { name:"Koby Brea",         position:"G", jersey:"10", height:"6ft 6in",  college:"Dayton",          country:"Ivory Coast",hometown:"Abidjan, Ivory Coast",       draft_year:"2024", draft_pick:"27",        draft_team:"Utah Jazz",              past_teams:[{team:"Utah Jazz",dur:"1 season"}],                                                                                                            jazz_years:"1 season" },
  { name:"Dillon Brooks",     position:"F", jersey:"9",  height:"6ft 7in",  college:"Oregon",          country:"Canada",   hometown:"Mississauga, Ontario",         draft_year:"2017", draft_pick:"45",        draft_team:"Memphis Grizzlies",      past_teams:[{team:"Memphis Grizzlies",dur:"6 seasons"},{team:"Houston Rockets",dur:"1 season"}],                                                            jazz_years:"1 season" },
  { name:"Royce O'Neale",     position:"F", jersey:"0",  height:"6ft 5in",  college:"Baylor",          country:"USA",      hometown:"Cedar Hill, Texas",            draft_year:"2016", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Utah Jazz",dur:"4 seasons"},{team:"Brooklyn Nets",dur:"1 season"},{team:"Houston Rockets",dur:"2 seasons"}],                              jazz_years:"1 season" },
  { name:"Amir Coffey",       position:"F", jersey:"6",  height:"6ft 7in",  college:"Minnesota",       country:"USA",      hometown:"Burnsville, Minnesota",        draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"LA Clippers",dur:"4 seasons"},{team:"Houston Rockets",dur:"1 season"}],                                                                   jazz_years:"1 season" },
  { name:"Ryan Dunn",         position:"F", jersey:"13", height:"6ft 7in",  college:"Virginia",        country:"USA",      hometown:"White Plains, New York",       draft_year:"2024", draft_pick:"28",        draft_team:"Phoenix Suns",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Rasheer Fleming",   position:"F", jersey:"20", height:"6ft 8in",  college:"Saint Joseph's",  country:"USA",      hometown:"Philadelphia, Pennsylvania",   draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Mark Williams",     position:"C", jersey:"5",  height:"7ft 0in",  college:"Duke",            country:"USA",      hometown:"Lake Norman, North Carolina",  draft_year:"2022", draft_pick:"15",        draft_team:"Charlotte Hornets",      past_teams:[{team:"Charlotte Hornets",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Khaman Maluach",    position:"C", jersey:"6",  height:"7ft 2in",  college:"Duke",            country:"South Sudan",hometown:"Wau, South Sudan",           draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
];

const BLAZERS_TEAM = {
  name: "Portland Trail Blazers",
  city: "Portland",
  conference: "West",
  division: "Northwest",
  arena: "Moda Center",
  mascot: "Blaze the Trail Cat",
  colors: "Red, Black, White",
  championships: "1",
  lastTitle: "1977",
  abbreviation: "POR",
  coach: "Chauncey Billups",
  coachPrevTeam: { team: "LA Clippers", role: "Assistant Coach" },
  coachSince: "2021"
};

const BLAZERS_STARTING_LINEUP = { PG:"Damian Lillard", SG:"Shaedon Sharpe", SF:"Deni Avdija", PF:"Toumani Camara", C:"Donovan Clingan" };

const BLAZERS_ROSTER = [
  { name:"Jrue Holiday",        position:"G", jersey:"12", height:"6ft 4in",  college:"UCLA",            country:"USA",       hometown:"Chatsworth, California",       draft_year:"2009", draft_pick:"17",        draft_team:"Philadelphia 76ers",     past_teams:[{team:"Philadelphia 76ers",dur:"4 seasons"},{team:"New Orleans Pelicans",dur:"7 seasons"},{team:"Milwaukee Bucks",dur:"3 seasons"},{team:"Boston Celtics",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Scoot Henderson",     position:"G", jersey:"0",  height:"6ft 2in",  college:"None",            country:"USA",       hometown:"Stone Mountain, Georgia",      draft_year:"2023", draft_pick:"3",         draft_team:"Portland Trail Blazers", past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Damian Lillard",      position:"G", jersey:"0",  height:"6ft 2in",  college:"Weber State",     country:"USA",       hometown:"Oakland, California",          draft_year:"2012", draft_pick:"6",         draft_team:"Portland Trail Blazers", past_teams:[{team:"Milwaukee Bucks",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Shaedon Sharpe",      position:"G", jersey:"17", height:"6ft 6in",  college:"Kentucky",        country:"Canada",    hometown:"London, Ontario, Canada",      draft_year:"2022", draft_pick:"7",         draft_team:"Portland Trail Blazers", past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Blake Wesley",        position:"G", jersey:"9",  height:"6ft 5in",  college:"Notre Dame",      country:"USA",       hometown:"Indianapolis, Indiana",        draft_year:"2022", draft_pick:"25",        draft_team:"San Antonio Spurs",      past_teams:[{team:"San Antonio Spurs",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Caleb Love",          position:"G", jersey:"2",  height:"6ft 4in",  college:"Arizona",         country:"USA",       hometown:"St. Louis, Missouri",          draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Golden State Warriors",dur:"1 season"}],                                                                                                jazz_years:"1 season" },
  { name:"Vit Krejci",          position:"G", jersey:"12", height:"6ft 7in",  college:"None",            country:"Czech Republic",hometown:"Opava, Czech Republic",    draft_year:"2021", draft_pick:"37",        draft_team:"Oklahoma City Thunder",  past_teams:[{team:"Oklahoma City Thunder",dur:"2 seasons"},{team:"Atlanta Hawks",dur:"1 season"}],                                                          jazz_years:"1 season" },
  { name:"Deni Avdija",         position:"F", jersey:"8",  height:"6ft 9in",  college:"None",            country:"Israel",    hometown:"Tel Aviv, Israel",             draft_year:"2020", draft_pick:"9",         draft_team:"Washington Wizards",     past_teams:[{team:"Washington Wizards",dur:"4 seasons"}],                                                                                                  jazz_years:"1 season" },
  { name:"Jerami Grant",        position:"F", jersey:"9",  height:"6ft 8in",  college:"Syracuse",        country:"USA",       hometown:"Baltimore, Maryland",          draft_year:"2014", draft_pick:"39",        draft_team:"Philadelphia 76ers",     past_teams:[{team:"Philadelphia 76ers",dur:"1 season"},{team:"Oklahoma City Thunder",dur:"1 season"},{team:"Denver Nuggets",dur:"2 seasons"},{team:"Detroit Pistons",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Toumani Camara",      position:"F", jersey:"33", height:"6ft 8in",  college:"Georgia",         country:"France",    hometown:"Paris, France",                draft_year:"2023", draft_pick:"43",        draft_team:"LA Clippers",            past_teams:[{team:"LA Clippers",dur:"1 season"}],                                                                                                           jazz_years:"1 season" },
  { name:"Matisse Thybulle",    position:"F", jersey:"4",  height:"6ft 5in",  college:"Washington",      country:"Australia", hometown:"Los Angeles, California",      draft_year:"2019", draft_pick:"20",        draft_team:"Philadelphia 76ers",     past_teams:[{team:"Philadelphia 76ers",dur:"3 seasons"},{team:"Portland Trail Blazers",dur:"1 season"},{team:"Golden State Warriors",dur:"1 season"}],       jazz_years:"1 season" },
  { name:"Kris Murray",         position:"F", jersey:"8",  height:"6ft 7in",  college:"Iowa",            country:"USA",       hometown:"Cedar Rapids, Iowa",           draft_year:"2023", draft_pick:"23",        draft_team:"Portland Trail Blazers", past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Sidy Cissoko",        position:"F", jersey:"21", height:"6ft 7in",  college:"None",            country:"France",    hometown:"Brest, France",                draft_year:"2023", draft_pick:"44",        draft_team:"San Antonio Spurs",      past_teams:[{team:"San Antonio Spurs",dur:"1 season"}],                                                                                                     jazz_years:"1 season" },
  { name:"Jayson Kent",         position:"F", jersey:"7",  height:"6ft 7in",  college:"Vermont",         country:"USA",       hometown:"Bronx, New York",              draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Donovan Clingan",     position:"C", jersey:"23", height:"7ft 2in",  college:"Connecticut",     country:"USA",       hometown:"Bristol, Connecticut",         draft_year:"2024", draft_pick:"7",         draft_team:"Portland Trail Blazers", past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Robert Williams III", position:"C", jersey:"35", height:"6ft 9in",  college:"Texas A&M",       country:"USA",       hometown:"Barnhill, Texas",              draft_year:"2018", draft_pick:"27",        draft_team:"Boston Celtics",         past_teams:[{team:"Boston Celtics",dur:"5 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Yang Hansen",         position:"C", jersey:"30", height:"7ft 0in",  college:"None",            country:"China",     hometown:"Beijing, China",               draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
];

const KINGS_TEAM = {
  name: "Sacramento Kings",
  city: "Sacramento",
  conference: "West",
  division: "Pacific",
  arena: "Golden 1 Center",
  mascot: "Slamson the Lion",
  colors: "Purple, Silver, Black",
  championships: "1",
  lastTitle: "1951",
  abbreviation: "SAC",
  coach: "Doug Christie",
  coachPrevTeam: { team: "Sacramento Kings", role: "Interim Head Coach" },
  coachSince: "2025"
};

const KINGS_STARTING_LINEUP = { PG:"Malik Monk", SG:"Zach LaVine", SF:"De'Andre Hunter", PF:"DeMar DeRozan", C:"Domantas Sabonis" };

const KINGS_ROSTER = [
  { name:"Russell Westbrook",    position:"G", jersey:"0",  height:"6ft 3in",  college:"UCLA",            country:"USA",       hometown:"Los Angeles, California",      draft_year:"2008", draft_pick:"4",         draft_team:"Seattle SuperSonics",   past_teams:[{team:"Oklahoma City Thunder",dur:"11 seasons"},{team:"Houston Rockets",dur:"1 season"},{team:"Washington Wizards",dur:"1 season"},{team:"Indiana Pacers",dur:"1 season"},{team:"Los Angeles Lakers",dur:"3 seasons"},{team:"LA Clippers",dur:"1 season"},{team:"Utah Jazz",dur:"1 season"},{team:"Denver Nuggets",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Malik Monk",           position:"G", jersey:"0",  height:"6ft 3in",  college:"Kentucky",        country:"USA",       hometown:"Lepanto, Arkansas",            draft_year:"2017", draft_pick:"11",        draft_team:"Charlotte Hornets",      past_teams:[{team:"Charlotte Hornets",dur:"4 seasons"},{team:"Los Angeles Lakers",dur:"1 season"}],                                                             jazz_years:"1 season" },
  { name:"Killian Hayes",        position:"G", jersey:"7",  height:"6ft 5in",  college:"None",            country:"France",    hometown:"Lake Wales, Florida",          draft_year:"2020", draft_pick:"7",         draft_team:"Detroit Pistons",        past_teams:[{team:"Detroit Pistons",dur:"3 seasons"},{team:"Brooklyn Nets",dur:"1 season"}],                                                                    jazz_years:"1 season" },
  { name:"Devin Carter",         position:"G", jersey:"22", height:"6ft 3in",  college:"Providence",      country:"USA",       hometown:"Waterbury, Connecticut",       draft_year:"2024", draft_pick:"13",        draft_team:"Sacramento Kings",       past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Isaiah Stevens",       position:"G", jersey:"8",  height:"6ft 1in",  college:"Colorado State",  country:"USA",       hometown:"Murrieta, California",         draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Zach LaVine",          position:"G", jersey:"8",  height:"6ft 5in",  college:"UCLA",            country:"USA",       hometown:"Renton, Washington",           draft_year:"2014", draft_pick:"13",        draft_team:"Minnesota Timberwolves", past_teams:[{team:"Minnesota Timberwolves",dur:"3 seasons"},{team:"Chicago Bulls",dur:"6 seasons"}],                                                           jazz_years:"1 season" },
  { name:"DeMar DeRozan",        position:"F", jersey:"10", height:"6ft 6in",  college:"USC",             country:"USA",       hometown:"Compton, California",          draft_year:"2009", draft_pick:"9",         draft_team:"Toronto Raptors",        past_teams:[{team:"Toronto Raptors",dur:"9 seasons"},{team:"San Antonio Spurs",dur:"3 seasons"},{team:"Chicago Bulls",dur:"3 seasons"}],                       jazz_years:"1 season" },
  { name:"Nique Clifford",       position:"F", jersey:"25", height:"6ft 7in",  college:"Colorado State",  country:"USA",       hometown:"Denver, Colorado",             draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Daeqwon Plowden",      position:"F", jersey:"14", height:"6ft 8in",  college:"Syracuse",        country:"USA",       hometown:"Brooklyn, New York",           draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Doug McDermott",       position:"F", jersey:"3",  height:"6ft 7in",  college:"Creighton",       country:"USA",       hometown:"Ames, Iowa",                   draft_year:"2014", draft_pick:"11",        draft_team:"Chicago Bulls",          past_teams:[{team:"Chicago Bulls",dur:"2 seasons"},{team:"Oklahoma City Thunder",dur:"1 season"},{team:"New York Knicks",dur:"1 season"},{team:"Indiana Pacers",dur:"2 seasons"},{team:"San Antonio Spurs",dur:"3 seasons"}], jazz_years:"1 season" },
  { name:"De'Andre Hunter",      position:"F", jersey:"12", height:"6ft 7in",  college:"Virginia",        country:"USA",       hometown:"Philadelphia, Pennsylvania",   draft_year:"2019", draft_pick:"4",         draft_team:"Atlanta Hawks",          past_teams:[{team:"Atlanta Hawks",dur:"5 seasons"}],                                                                                                           jazz_years:"1 season" },
  { name:"Patrick Baldwin Jr.",  position:"F", jersey:"7",  height:"6ft 9in",  college:"Milwaukee",       country:"USA",       hometown:"Lake Geneva, Wisconsin",       draft_year:"2022", draft_pick:"28",        draft_team:"Golden State Warriors",  past_teams:[{team:"Golden State Warriors",dur:"1 season"},{team:"Brooklyn Nets",dur:"1 season"}],                                                              jazz_years:"1 season" },
  { name:"Precious Achiuwa",     position:"F", jersey:"5",  height:"6ft 8in",  college:"Memphis",         country:"Nigeria",   hometown:"Lagos, Nigeria",               draft_year:"2020", draft_pick:"20",        draft_team:"Miami Heat",             past_teams:[{team:"Miami Heat",dur:"1 season"},{team:"Toronto Raptors",dur:"3 seasons"},{team:"New York Knicks",dur:"1 season"},{team:"Indiana Pacers",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Domantas Sabonis",     position:"C", jersey:"11", height:"6ft 11in", college:"Gonzaga",         country:"Lithuania", hometown:"Portland, Oregon",             draft_year:"2016", draft_pick:"11",        draft_team:"Orlando Magic",          past_teams:[{team:"Indiana Pacers",dur:"5 seasons"}],                                                                                                           jazz_years:"1 season" },
  { name:"Drew Eubanks",         position:"C", jersey:"14", height:"6ft 10in", college:"Oregon State",    country:"USA",       hometown:"Tigard, Oregon",               draft_year:"2018", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"San Antonio Spurs",dur:"3 seasons"},{team:"Portland Trail Blazers",dur:"2 seasons"},{team:"Phoenix Suns",dur:"1 season"}],                   jazz_years:"1 season" },
  { name:"Maxime Raynaud",       position:"C", jersey:"42", height:"7ft 1in",  college:"Stanford",        country:"France",    hometown:"Paris, France",                draft_year:"2024", draft_pick:"43",        draft_team:"Sacramento Kings",       past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Dylan Cardwell",       position:"C", jersey:"15", height:"6ft 10in", college:"Auburn",          country:"USA",       hometown:"Huntsville, Alabama",          draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
];

const SPURS_TEAM = {
  name: "San Antonio Spurs",
  city: "San Antonio",
  conference: "West",
  division: "Southwest",
  arena: "Frost Bank Center",
  mascot: "The Coyote",
  colors: "Black, Silver, White",
  championships: "5",
  lastTitle: "2014",
  abbreviation: "SAS",
  coach: "Mitch Johnson",
  coachPrevTeam: { team: "San Antonio Spurs", role: "Interim Head Coach" },
  coachSince: "2024"
};

const SPURS_STARTING_LINEUP = { PG:"De'Aaron Fox", SG:"Stephon Castle", SF:"Devin Vassell", PF:"Harrison Barnes", C:"Victor Wembanyama" };

const SPURS_ROSTER = [
  { name:"De'Aaron Fox",        position:"G", jersey:"4",  height:"6ft 3in",  college:"Kentucky",        country:"USA",       hometown:"Cypress, Texas",               draft_year:"2017", draft_pick:"5",         draft_team:"Sacramento Kings",      past_teams:[{team:"Sacramento Kings",dur:"7 seasons"}],                                                                                                        jazz_years:"1 season" },
  { name:"Stephon Castle",      position:"G", jersey:"5",  height:"6ft 6in",  college:"Connecticut",     country:"USA",       hometown:"Douglasville, Georgia",        draft_year:"2024", draft_pick:"4",         draft_team:"San Antonio Spurs",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Dylan Harper",        position:"G", jersey:"14", height:"6ft 6in",  college:"Rutgers",         country:"USA",       hometown:"Teaneck, New Jersey",          draft_year:"2025", draft_pick:"2",         draft_team:"San Antonio Spurs",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jordan McLaughlin",   position:"G", jersey:"7",  height:"6ft 0in",  college:"USC",             country:"USA",       hometown:"Temecula, California",         draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:[{team:"Minnesota Timberwolves",dur:"3 seasons"},{team:"Cleveland Cavaliers",dur:"1 season"}],                                                      jazz_years:"1 season" },
  { name:"Devin Vassell",       position:"F", jersey:"24", height:"6ft 6in",  college:"Florida State",   country:"USA",       hometown:"Boynton Beach, Florida",       draft_year:"2020", draft_pick:"11",        draft_team:"San Antonio Spurs",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Keldon Johnson",      position:"F", jersey:"3",  height:"6ft 5in",  college:"Kentucky",        country:"USA",       hometown:"Asheboro, North Carolina",     draft_year:"2019", draft_pick:"29",        draft_team:"San Antonio Spurs",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Harrison Barnes",     position:"F", jersey:"40", height:"6ft 8in",  college:"North Carolina",  country:"USA",       hometown:"Ames, Iowa",                   draft_year:"2012", draft_pick:"7",         draft_team:"Golden State Warriors",  past_teams:[{team:"Golden State Warriors",dur:"4 seasons"},{team:"Dallas Mavericks",dur:"3 seasons"},{team:"Sacramento Kings",dur:"5 seasons"}],              jazz_years:"1 season" },
  { name:"Julian Champagnie",   position:"F", jersey:"30", height:"6ft 8in",  college:"St. John's",      country:"USA",       hometown:"Brooklyn, New York",           draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:[{team:"Toronto Raptors",dur:"1 season"},{team:"Philadelphia 76ers",dur:"1 season"}],                                                              jazz_years:"1 season" },
  { name:"Carter Bryant",       position:"F", jersey:"17", height:"6ft 9in",  college:"Arizona",         country:"USA",       hometown:"Gilbert, Arizona",             draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Victor Wembanyama",   position:"C", jersey:"1",  height:"7ft 4in",  college:"None",            country:"France",    hometown:"Le Chesnay, France",           draft_year:"2023", draft_pick:"1",         draft_team:"San Antonio Spurs",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Kelly Olynyk",        position:"F", jersey:"13", height:"7ft 0in",  college:"Gonzaga",         country:"Canada",    hometown:"Kamloops, British Columbia",   draft_year:"2013", draft_pick:"13",        draft_team:"Boston Celtics",         past_teams:[{team:"Boston Celtics",dur:"4 seasons"},{team:"Miami Heat",dur:"1 season"},{team:"Houston Rockets",dur:"2 seasons"},{team:"Detroit Pistons",dur:"1 season"},{team:"Utah Jazz",dur:"1 season"},{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Portland Trail Blazers",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Luke Kornet",         position:"C", jersey:"2",  height:"7ft 1in",  college:"Vanderbilt",      country:"USA",       hometown:"Nashville, Tennessee",         draft_year:"2017", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:[{team:"New York Knicks",dur:"2 seasons"},{team:"Chicago Bulls",dur:"1 season"},{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Boston Celtics",dur:"3 seasons"}], jazz_years:"1 season" },
  { name:"Bismack Biyombo",     position:"C", jersey:"8",  height:"6ft 9in",  college:"None",            country:"DR Congo",  hometown:"Lubumbashi, DR Congo",         draft_year:"2011", draft_pick:"7",         draft_team:"Sacramento Kings",      past_teams:[{team:"Charlotte Bobcats",dur:"2 seasons"},{team:"Toronto Raptors",dur:"2 seasons"},{team:"Orlando Magic",dur:"2 seasons"},{team:"Charlotte Hornets",dur:"1 season"},{team:"Phoenix Suns",dur:"1 season"},{team:"Indiana Pacers",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Mason Plumlee",       position:"C", jersey:"44", height:"6ft 11in", college:"Duke",            country:"USA",       hometown:"Warsaw, Indiana",              draft_year:"2013", draft_pick:"22",        draft_team:"Brooklyn Nets",         past_teams:[{team:"Brooklyn Nets",dur:"2 seasons"},{team:"Portland Trail Blazers",dur:"2 seasons"},{team:"Denver Nuggets",dur:"3 seasons"},{team:"Detroit Pistons",dur:"2 seasons"},{team:"Charlotte Hornets",dur:"2 seasons"},{team:"Los Angeles Clippers",dur:"1 season"},{team:"Milwaukee Bucks",dur:"1 season"}], jazz_years:"1 season" },
];

const HAWKS_TEAM = {
  name: "Atlanta Hawks",
  city: "Atlanta",
  conference: "East",
  division: "Southeast",
  arena: "State Farm Arena",
  mascot: "Harry the Hawk",
  colors: "Red, Black, Gold",
  championships: "1",
  lastTitle: "1958",
  abbreviation: "ATL",
  coach: "Quin Snyder",
  coachPrevTeam: { team: "Utah Jazz", role: "Head Coach" },
  coachSince: "2023"
};

const HAWKS_STARTING_LINEUP = { PG:"CJ McCollum", SG:"Dyson Daniels", SF:"Nickeil Alexander-Walker", PF:"Jalen Johnson", C:"Onyeka Okongwu" };

const HAWKS_ROSTER = [
  { name:"CJ McCollum",               position:"G", jersey:"3",  height:"6ft 3in",  college:"Lehigh",          country:"USA",       hometown:"Canton, Ohio",                 draft_year:"2013", draft_pick:"10",        draft_team:"Portland Trail Blazers", past_teams:[{team:"Portland Trail Blazers",dur:"8 seasons"},{team:"New Orleans Pelicans",dur:"3 seasons"}],                                                jazz_years:"1 season" },
  { name:"Dyson Daniels",             position:"G", jersey:"5",  height:"6ft 7in",  college:"None",            country:"Australia", hometown:"Bendigo, Australia",           draft_year:"2022", draft_pick:"8",         draft_team:"New Orleans Pelicans",   past_teams:[{team:"New Orleans Pelicans",dur:"2 seasons"}],                                                                                                  jazz_years:"1 season" },
  { name:"Gabe Vincent",              position:"G", jersey:"7",  height:"6ft 3in",  college:"UC Santa Barbara",country:"USA",       hometown:"Modesto, California",          draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Miami Heat",dur:"3 seasons"},{team:"Los Angeles Lakers",dur:"1 season"}],                                                                jazz_years:"1 season" },
  { name:"Nickeil Alexander-Walker",  position:"G", jersey:"6",  height:"6ft 5in",  college:"Virginia Tech",   country:"Canada",    hometown:"Toronto, Ontario, Canada",     draft_year:"2019", draft_pick:"17",        draft_team:"New Orleans Pelicans",   past_teams:[{team:"New Orleans Pelicans",dur:"2 seasons"},{team:"Utah Jazz",dur:"1 season"},{team:"Minnesota Timberwolves",dur:"2 seasons"}],                jazz_years:"1 season" },
  { name:"Keaton Wallace",            position:"G", jersey:"8",  height:"6ft 4in",  college:"UTEP",            country:"USA",       hometown:"Spring, Texas",                draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"San Antonio Spurs",dur:"2 seasons"},{team:"Denver Nuggets",dur:"1 season"}],                                                              jazz_years:"1 season" },
  { name:"RayJ Dennis",               position:"G", jersey:"10", height:"6ft 2in",  college:"Wisconsin",       country:"USA",       hometown:"Belleville, Illinois",         draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jalen Johnson",             position:"F", jersey:"1",  height:"6ft 9in",  college:"Duke",            country:"USA",       hometown:"Milwaukee, Wisconsin",         draft_year:"2021", draft_pick:"20",        draft_team:"Atlanta Hawks",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Zaccharie Risacher",        position:"F", jersey:"10", height:"6ft 9in",  college:"None",            country:"France",    hometown:"Antibes, France",              draft_year:"2024", draft_pick:"1",         draft_team:"Atlanta Hawks",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Corey Kispert",             position:"F", jersey:"25", height:"6ft 7in",  college:"Gonzaga",         country:"USA",       hometown:"Edmonds, Washington",          draft_year:"2021", draft_pick:"15",        draft_team:"Washington Wizards",     past_teams:[{team:"Washington Wizards",dur:"3 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Caleb Houstan",             position:"F", jersey:"14", height:"6ft 8in",  college:"Michigan",        country:"Canada",    hometown:"Mississauga, Ontario, Canada", draft_year:"2022", draft_pick:"32",        draft_team:"Orlando Magic",          past_teams:[{team:"Orlando Magic",dur:"2 seasons"}],                                                                                                         jazz_years:"1 season" },
  { name:"Onyeka Okongwu",            position:"C", jersey:"17", height:"6ft 9in",  college:"USC",             country:"USA",       hometown:"Bellflower, California",       draft_year:"2020", draft_pick:"6",         draft_team:"Atlanta Hawks",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jock Landale",              position:"C", jersey:"15", height:"7ft 0in",  college:"Saint Mary's",    country:"Australia", hometown:"Melbourne, Australia",         draft_year:"2017", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"San Antonio Spurs",dur:"2 seasons"},{team:"Houston Rockets",dur:"1 season"},{team:"Phoenix Suns",dur:"1 season"}],                         jazz_years:"1 season" },
  { name:"Mouhamed Gueye",            position:"C", jersey:"8",  height:"6ft 11in", college:"Washington State",country:"Senegal",   hometown:"Dakar, Senegal",               draft_year:"2022", draft_pick:"39",        draft_team:"Oklahoma City Thunder",  past_teams:[{team:"Oklahoma City Thunder",dur:"1 season"}],                                                                                                   jazz_years:"1 season" },
  { name:"Asa Newell",                position:"C", jersey:"16", height:"6ft 10in", college:"Georgia",         country:"USA",       hometown:"Peachtree City, Georgia",      draft_year:"2025", draft_pick:"6",         draft_team:"Atlanta Hawks",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
];

const CELTICS_TEAM = {
  name: "Boston Celtics",
  city: "Boston",
  conference: "East",
  division: "Atlantic",
  arena: "TD Garden",
  mascot: "Lucky the Leprechaun",
  colors: "Green, White, Gold",
  championships: "18",
  lastTitle: "2024",
  abbreviation: "BOS",
  coach: "Joe Mazzulla",
  coachPrevTeam: { team: "Boston Celtics", role: "Interim Head Coach" },
  coachSince: "2022"
};

const CELTICS_STARTING_LINEUP = { PG:"Derrick White", SG:"Payton Pritchard", SF:"Jaylen Brown", PF:"Jayson Tatum", C:"Nikola Vucevic" };

const CELTICS_ROSTER = [
  { name:"Derrick White",      position:"G", jersey:"9",  height:"6ft 4in",  college:"Colorado",        country:"USA",       hometown:"Parker, Colorado",             draft_year:"2017", draft_pick:"29",        draft_team:"San Antonio Spurs",      past_teams:[{team:"San Antonio Spurs",dur:"4 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Payton Pritchard",   position:"G", jersey:"11", height:"6ft 1in",  college:"Oregon",          country:"USA",       hometown:"West Linn, Oregon",            draft_year:"2020", draft_pick:"26",        draft_team:"Boston Celtics",         past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Baylor Scheierman",  position:"G", jersey:"55", height:"6ft 6in",  college:"Creighton",       country:"USA",       hometown:"Moorhead, Minnesota",          draft_year:"2024", draft_pick:"30",        draft_team:"Boston Celtics",         past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Max Shulga",         position:"G", jersey:"4",  height:"6ft 4in",  college:"Virginia Tech",   country:"Ukraine",   hometown:"Kyiv, Ukraine",                draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Ron Harper Jr.",     position:"G", jersey:"4",  height:"6ft 6in",  college:"Rutgers",         country:"USA",       hometown:"Fishkill, New York",           draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Toronto Raptors",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Jayson Tatum",       position:"F", jersey:"0",  height:"6ft 8in",  college:"Duke",            country:"USA",       hometown:"St. Louis, Missouri",          draft_year:"2017", draft_pick:"3",         draft_team:"Boston Celtics",         past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jaylen Brown",       position:"F", jersey:"7",  height:"6ft 6in",  college:"California",      country:"USA",       hometown:"Marietta, Georgia",            draft_year:"2016", draft_pick:"3",         draft_team:"Boston Celtics",         past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Sam Hauser",         position:"F", jersey:"30", height:"6ft 8in",  college:"Virginia",        country:"USA",       hometown:"Stevens Point, Wisconsin",     draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Hugo Gonzalez",      position:"F", jersey:"17", height:"6ft 8in",  college:"None",            country:"Spain",     hometown:"Madrid, Spain",                draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jordan Walsh",       position:"F", jersey:"27", height:"6ft 7in",  college:"Arkansas",        country:"USA",       hometown:"Plano, Texas",                 draft_year:"2023", draft_pick:"38",        draft_team:"Boston Celtics",         past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Nikola Vucevic",     position:"C", jersey:"12", height:"7ft 0in",  college:"USC",             country:"Montenegro",hometown:"Geneva, Switzerland",          draft_year:"2011", draft_pick:"16",        draft_team:"Philadelphia 76ers",     past_teams:[{team:"Orlando Magic",dur:"9 seasons"},{team:"Chicago Bulls",dur:"3 seasons"}],                                                                  jazz_years:"1 season" },
  { name:"Neemias Queta",      position:"C", jersey:"88", height:"7ft 0in",  college:"Utah State",      country:"Portugal",  hometown:"Barreiro, Portugal",           draft_year:"2021", draft_pick:"39",        draft_team:"Sacramento Kings",       past_teams:[{team:"Sacramento Kings",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Luka Garza",         position:"C", jersey:"55", height:"6ft 11in", college:"Iowa",            country:"USA",       hometown:"Washington, D.C.",             draft_year:"2021", draft_pick:"52",        draft_team:"Detroit Pistons",        past_teams:[{team:"Detroit Pistons",dur:"1 season"},{team:"Indiana Pacers",dur:"1 season"},{team:"Milwaukee Bucks",dur:"1 season"},{team:"Minnesota Timberwolves",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Amari Williams",     position:"C", jersey:"23", height:"7ft 0in",  college:"Drexel",          country:"USA",       hometown:"Wyckoff, New Jersey",          draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Los Angeles Lakers",dur:"1 season"}],                                                                                                    jazz_years:"1 season" },
  { name:"Charles Bassey",     position:"C", jersey:"28", height:"6ft 10in", college:"Western Kentucky",country:"Nigeria",   hometown:"Lagos, Nigeria",               draft_year:"2021", draft_pick:"53",        draft_team:"Golden State Warriors",  past_teams:[{team:"Golden State Warriors",dur:"1 season"},{team:"Philadelphia 76ers",dur:"1 season"},{team:"Houston Rockets",dur:"1 season"},{team:"San Antonio Spurs",dur:"1 season"}], jazz_years:"1 season" },
];

const NETS_TEAM = {
  name: "Brooklyn Nets",
  city: "Brooklyn",
  conference: "East",
  division: "Atlantic",
  arena: "Barclays Center",
  mascot: "BrooklyKnight",
  colors: "Black, White, Gray",
  championships: "0",
  lastTitle: "N/A",
  abbreviation: "BKN",
  coach: "Jordi Fernandez",
  coachPrevTeam: { team: "Sacramento Kings", role: "Assistant Coach" },
  coachSince: "2024"
};

const NETS_STARTING_LINEUP = { PG:"Nolan Traore", SG:"Egor Demin", SF:"Michael Porter Jr.", PF:"Noah Clowney", C:"Nic Claxton" };

const NETS_ROSTER = [
  { name:"Nolan Traore",       position:"G", jersey:"1",  height:"6ft 4in",  college:"None",            country:"France",    hometown:"Saint-Maurice, France",        draft_year:"2025", draft_pick:"2",         draft_team:"Brooklyn Nets",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Ben Saraf",          position:"G", jersey:"10", height:"6ft 5in",  college:"None",            country:"Israel",    hometown:"Hadera, Israel",               draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tyson Etienne",      position:"G", jersey:"0",  height:"6ft 3in",  college:"Wichita State",   country:"USA",       hometown:"Brooklyn, New York",           draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Oklahoma City Thunder",dur:"1 season"},{team:"Philadelphia 76ers",dur:"1 season"}],                                                      jazz_years:"1 season" },
  { name:"Terance Mann",       position:"G", jersey:"14", height:"6ft 5in",  college:"Florida State",   country:"USA",       hometown:"Milton, Massachusetts",        draft_year:"2019", draft_pick:"48",        draft_team:"LA Clippers",            past_teams:[{team:"LA Clippers",dur:"5 seasons"}],                                                                                                          jazz_years:"1 season" },
  { name:"Drake Powell",       position:"G", jersey:"21", height:"6ft 6in",  college:"North Carolina",  country:"USA",       hometown:"Sanford, North Carolina",      draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Michael Porter Jr.", position:"F", jersey:"1",  height:"6ft 10in", college:"Missouri",        country:"USA",       hometown:"Columbia, Missouri",           draft_year:"2018", draft_pick:"14",        draft_team:"Denver Nuggets",         past_teams:[{team:"Denver Nuggets",dur:"6 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Ziaire Williams",    position:"F", jersey:"10", height:"6ft 8in",  college:"Stanford",        country:"USA",       hometown:"Los Angeles, California",      draft_year:"2021", draft_pick:"10",        draft_team:"Memphis Grizzlies",      past_teams:[{team:"Memphis Grizzlies",dur:"3 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Ochai Agbaji",       position:"F", jersey:"13", height:"6ft 5in",  college:"Kansas",          country:"USA",       hometown:"Kansas City, Missouri",        draft_year:"2022", draft_pick:"14",        draft_team:"Cleveland Cavaliers",    past_teams:[{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Toronto Raptors",dur:"1 season"},{team:"Utah Jazz",dur:"1 season"}],                        jazz_years:"1 season" },
  { name:"Jalen Wilson",       position:"F", jersey:"22", height:"6ft 7in",  college:"Kansas",          country:"USA",       hometown:"Denton, Texas",                draft_year:"2023", draft_pick:"51",        draft_team:"Brooklyn Nets",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Josh Minott",        position:"F", jersey:"5",  height:"6ft 7in",  college:"Memphis",         country:"Jamaica",   hometown:"Kingston, Jamaica",            draft_year:"2022", draft_pick:"45",        draft_team:"Minnesota Timberwolves", past_teams:[{team:"Minnesota Timberwolves",dur:"2 seasons"}],                                                                                                jazz_years:"1 season" },
  { name:"E.J. Liddell",       position:"F", jersey:"4",  height:"6ft 7in",  college:"Ohio State",      country:"USA",       hometown:"Belleville, Illinois",         draft_year:"2022", draft_pick:"41",        draft_team:"New Orleans Pelicans",   past_teams:[{team:"New Orleans Pelicans",dur:"2 seasons"}],                                                                                                  jazz_years:"1 season" },
  { name:"Chaney Johnson",     position:"F", jersey:"23", height:"6ft 9in",  college:"Arizona",         country:"USA",       hometown:"Las Vegas, Nevada",            draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Nic Claxton",        position:"C", jersey:"33", height:"6ft 11in", college:"Georgia",         country:"USA",       hometown:"Conway, South Carolina",       draft_year:"2019", draft_pick:"31",        draft_team:"Brooklyn Nets",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Day'Ron Sharpe",     position:"C", jersey:"20", height:"6ft 11in", college:"North Carolina",  country:"USA",       hometown:"Sumter, South Carolina",       draft_year:"2021", draft_pick:"29",        draft_team:"Brooklyn Nets",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Noah Clowney",       position:"C", jersey:"21", height:"6ft 10in", college:"Alabama",         country:"USA",       hometown:"Rock Hill, South Carolina",    draft_year:"2023", draft_pick:"21",        draft_team:"Brooklyn Nets",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Danny Wolf",         position:"C", jersey:"16", height:"7ft 1in",  college:"Michigan",        country:"USA",       hometown:"Westport, Connecticut",        draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
];

const HORNETS_TEAM = {
  name: "Charlotte Hornets",
  city: "Charlotte",
  conference: "East",
  division: "Southeast",
  arena: "Spectrum Center",
  mascot: "Hugo the Hornet",
  colors: "Teal, Purple, White",
  championships: "0",
  lastTitle: "N/A",
  abbreviation: "CHA",
  coach: "Charles Lee",
  coachPrevTeam: { team: "Boston Celtics", role: "Assistant Coach" },
  coachSince: "2024"
};

const HORNETS_STARTING_LINEUP = { PG:"LaMelo Ball", SG:"Kon Knueppel", SF:"Brandon Miller", PF:"Miles Bridges", C:"Moussa Diabate" };

const HORNETS_ROSTER = [
  { name:"LaMelo Ball",          position:"G", jersey:"1",  height:"6ft 7in",  college:"None",            country:"USA",       hometown:"Chino Hills, California",      draft_year:"2020", draft_pick:"3",         draft_team:"Charlotte Hornets",      past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Coby White",           position:"G", jersey:"0",  height:"6ft 5in",  college:"North Carolina",  country:"USA",       hometown:"Goldsboro, North Carolina",    draft_year:"2019", draft_pick:"7",         draft_team:"Chicago Bulls",          past_teams:[{team:"Chicago Bulls",dur:"5 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Kon Knueppel",         position:"G", jersey:"7",  height:"6ft 7in",  college:"Duke",            country:"USA",       hometown:"Green Bay, Wisconsin",          draft_year:"2025", draft_pick:"6",         draft_team:"Charlotte Hornets",      past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tre Mann",             position:"G", jersey:"23", height:"6ft 5in",  college:"Florida",         country:"USA",       hometown:"Gainesville, Florida",         draft_year:"2021", draft_pick:"18",        draft_team:"Oklahoma City Thunder",  past_teams:[{team:"Oklahoma City Thunder",dur:"2 seasons"}],                                                                                                jazz_years:"1 season" },
  { name:"Tyus Jones",           position:"G", jersey:"21", height:"6ft 0in",  college:"Duke",            country:"USA",       hometown:"Apple Valley, Minnesota",      draft_year:"2015", draft_pick:"24",        draft_team:"Minnesota Timberwolves", past_teams:[{team:"Minnesota Timberwolves",dur:"2 seasons"},{team:"Memphis Grizzlies",dur:"4 seasons"},{team:"Washington Wizards",dur:"2 seasons"},{team:"Phoenix Suns",dur:"1 season"},{team:"Denver Nuggets",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Josh Green",           position:"G", jersey:"8",  height:"6ft 6in",  college:"Arizona",         country:"Australia", hometown:"Sydney, Australia",            draft_year:"2020", draft_pick:"18",        draft_team:"Dallas Mavericks",       past_teams:[{team:"Dallas Mavericks",dur:"4 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Antonio Reeves",       position:"G", jersey:"12", height:"6ft 6in",  college:"Illinois State",  country:"USA",       hometown:"Chicago, Illinois",            draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Los Angeles Lakers",dur:"1 season"}],                                                                                                   jazz_years:"1 season" },
  { name:"Brandon Miller",       position:"F", jersey:"24", height:"6ft 9in",  college:"Alabama",         country:"USA",       hometown:"Antioch, Tennessee",           draft_year:"2023", draft_pick:"2",         draft_team:"Charlotte Hornets",      past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Miles Bridges",        position:"F", jersey:"0",  height:"6ft 7in",  college:"Michigan State",  country:"USA",       hometown:"Flint, Michigan",              draft_year:"2018", draft_pick:"12",        draft_team:"LA Clippers",            past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Grant Williams",       position:"F", jersey:"2",  height:"6ft 6in",  college:"Tennessee",       country:"USA",       hometown:"Atlanta, Georgia",             draft_year:"2019", draft_pick:"22",        draft_team:"Boston Celtics",         past_teams:[{team:"Boston Celtics",dur:"4 seasons"},{team:"Dallas Mavericks",dur:"1 season"}],                                                              jazz_years:"1 season" },
  { name:"Pat Connaughton",      position:"F", jersey:"24", height:"6ft 5in",  college:"Notre Dame",      country:"USA",       hometown:"Arlington, Massachusetts",     draft_year:"2015", draft_pick:"41",        draft_team:"Portland Trail Blazers", past_teams:[{team:"Portland Trail Blazers",dur:"3 seasons"},{team:"Milwaukee Bucks",dur:"6 seasons"}],                                                    jazz_years:"1 season" },
  { name:"Tidjane Salaun",       position:"F", jersey:"10", height:"6ft 9in",  college:"None",            country:"France",    hometown:"Vichy, France",                draft_year:"2024", draft_pick:"6",         draft_team:"Charlotte Hornets",      past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Liam McNeeley",        position:"F", jersey:"5",  height:"6ft 7in",  college:"Connecticut",     country:"USA",       hometown:"Fairfield, Connecticut",       draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tosan Evbuomwan",      position:"F", jersey:"13", height:"6ft 8in",  college:"Princeton",       country:"Nigeria",   hometown:"Lagos, Nigeria",               draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"San Antonio Spurs",dur:"1 season"}],                                                                                                    jazz_years:"1 season" },
  { name:"Sion James",           position:"F", jersey:"4",  height:"6ft 7in",  college:"Duke",            country:"USA",       hometown:"Faison, North Carolina",       draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Houston Rockets",dur:"1 season"}],                                                                                                      jazz_years:"1 season" },
  { name:"Moussa Diabate",       position:"C", jersey:"23", height:"6ft 11in", college:"Michigan",        country:"France",    hometown:"Paris, France",                draft_year:"2022", draft_pick:"43",        draft_team:"LA Clippers",            past_teams:[{team:"LA Clippers",dur:"1 season"}],                                                                                                           jazz_years:"1 season" },
  { name:"Ryan Kalkbrenner",     position:"C", jersey:"11", height:"7ft 1in",  college:"Creighton",       country:"USA",       hometown:"St. Louis, Missouri",          draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"San Antonio Spurs",dur:"1 season"}],                                                                                                    jazz_years:"1 season" },
  { name:"P.J. Hall",            position:"C", jersey:"9",  height:"6ft 10in", college:"Auburn",          country:"USA",       hometown:"Myrtle Beach, South Carolina", draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"San Antonio Spurs",dur:"1 season"}],                                                                                                    jazz_years:"1 season" },
];

const BULLS_TEAM = {
  name: "Chicago Bulls",
  city: "Chicago",
  conference: "East",
  division: "Central",
  arena: "United Center",
  mascot: "Benny the Bull",
  colors: "Red, Black, White",
  championships: "6",
  lastTitle: "1998",
  abbreviation: "CHI",
  coach: "Billy Donovan",
  coachPrevTeam: { team: "Oklahoma City Thunder", role: "Head Coach" },
  coachSince: "2020"
};

const BULLS_STARTING_LINEUP = { PG:"Josh Giddey", SG:"Anfernee Simons", SF:"Isaac Okoro", PF:"Matas Buzelis", C:"Jalen Smith" };

const BULLS_ROSTER = [
  { name:"Josh Giddey",          position:"G", jersey:"3",  height:"6ft 8in",  college:"None",            country:"Australia", hometown:"Melbourne, Australia",         draft_year:"2021", draft_pick:"6",         draft_team:"Oklahoma City Thunder",  past_teams:[{team:"Oklahoma City Thunder",dur:"3 seasons"}],                                                                                                jazz_years:"1 season" },
  { name:"Anfernee Simons",      position:"G", jersey:"1",  height:"6ft 3in",  college:"IMG Academy",     country:"USA",       hometown:"Plantation, Florida",          draft_year:"2018", draft_pick:"24",        draft_team:"Portland Trail Blazers", past_teams:[{team:"Portland Trail Blazers",dur:"6 seasons"}],                                                                                                jazz_years:"1 season" },
  { name:"Jaden Ivey",           position:"G", jersey:"23", height:"6ft 4in",  college:"Purdue",          country:"USA",       hometown:"South Bend, Indiana",          draft_year:"2022", draft_pick:"5",         draft_team:"Detroit Pistons",        past_teams:[{team:"Detroit Pistons",dur:"2 seasons"}],                                                                                                      jazz_years:"1 season" },
  { name:"Tre Jones",            position:"G", jersey:"8",  height:"6ft 2in",  college:"Duke",            country:"USA",       hometown:"Apple Valley, Minnesota",      draft_year:"2020", draft_pick:"41",        draft_team:"San Antonio Spurs",      past_teams:[{team:"San Antonio Spurs",dur:"4 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Rob Dillingham",       position:"G", jersey:"0",  height:"6ft 1in",  college:"Kentucky",        country:"USA",       hometown:"Greenwood, South Carolina",    draft_year:"2024", draft_pick:"8",         draft_team:"San Antonio Spurs",      past_teams:[{team:"Minnesota Timberwolves",dur:"1 season"}],                                                                                                jazz_years:"1 season" },
  { name:"Collin Sexton",        position:"G", jersey:"2",  height:"6ft 1in",  college:"Alabama",         country:"USA",       hometown:"Marietta, Georgia",            draft_year:"2018", draft_pick:"8",         draft_team:"Cleveland Cavaliers",    past_teams:[{team:"Cleveland Cavaliers",dur:"4 seasons"},{team:"Utah Jazz",dur:"1 season"},{team:"Los Angeles Clippers",dur:"1 season"}],                   jazz_years:"1 season" },
  { name:"Jevon Carter",         position:"G", jersey:"5",  height:"6ft 2in",  college:"West Virginia",   country:"USA",       hometown:"Maywood, Illinois",            draft_year:"2018", draft_pick:"32",        draft_team:"Memphis Grizzlies",      past_teams:[{team:"Memphis Grizzlies",dur:"1 season"},{team:"Phoenix Suns",dur:"1 season"},{team:"Brooklyn Nets",dur:"1 season"},{team:"Milwaukee Bucks",dur:"2 seasons"},{team:"Miami Heat",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Matas Buzelis",        position:"F", jersey:"7",  height:"6ft 10in", college:"None",            country:"Lithuania", hometown:"Chicago, Illinois",            draft_year:"2024", draft_pick:"11",        draft_team:"Chicago Bulls",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Isaac Okoro",          position:"F", jersey:"4",  height:"6ft 6in",  college:"Auburn",          country:"USA",       hometown:"Marietta, Georgia",            draft_year:"2020", draft_pick:"5",         draft_team:"Cleveland Cavaliers",    past_teams:[{team:"Cleveland Cavaliers",dur:"4 seasons"}],                                                                                                  jazz_years:"1 season" },
  { name:"Patrick Williams",     position:"F", jersey:"44", height:"6ft 8in",  college:"Florida State",   country:"USA",       hometown:"Durham, North Carolina",       draft_year:"2020", draft_pick:"4",         draft_team:"Chicago Bulls",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Noa Essengue",         position:"F", jersey:"20", height:"6ft 9in",  college:"None",            country:"France",    hometown:"Paris, France",                draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Leonard Miller",       position:"F", jersey:"13", height:"6ft 10in", college:"None",            country:"Canada",    hometown:"Montreal, Quebec, Canada",     draft_year:"2023", draft_pick:"40",        draft_team:"Minnesota Timberwolves", past_teams:[{team:"Minnesota Timberwolves",dur:"1 season"}],                                                                                                jazz_years:"1 season" },
  { name:"Zach Collins",         position:"C", jersey:"23", height:"7ft 0in",  college:"Gonzaga",         country:"USA",       hometown:"Las Vegas, Nevada",            draft_year:"2017", draft_pick:"10",        draft_team:"Portland Trail Blazers", past_teams:[{team:"Portland Trail Blazers",dur:"4 seasons"},{team:"San Antonio Spurs",dur:"2 seasons"}],                                                      jazz_years:"1 season" },
  { name:"Nick Richards",        position:"C", jersey:"4",  height:"7ft 0in",  college:"Kentucky",        country:"Jamaica",   hometown:"Kingston, Jamaica",            draft_year:"2020", draft_pick:"42",        draft_team:"Charlotte Hornets",      past_teams:[{team:"Charlotte Hornets",dur:"4 seasons"},{team:"Phoenix Suns",dur:"1 season"}],                                                                 jazz_years:"1 season" },
  { name:"Jalen Smith",          position:"C", jersey:"7",  height:"6ft 10in", college:"Maryland",        country:"USA",       hometown:"Baltimore, Maryland",          draft_year:"2020", draft_pick:"10",        draft_team:"Phoenix Suns",           past_teams:[{team:"Phoenix Suns",dur:"1 season"},{team:"Indiana Pacers",dur:"2 seasons"},{team:"Brooklyn Nets",dur:"1 season"}],                             jazz_years:"1 season" },
  { name:"Guerschon Yabusele",   position:"C", jersey:"28", height:"6ft 8in",  college:"None",            country:"France",    hometown:"Savigny-sur-Orge, France",     draft_year:"2016", draft_pick:"16",        draft_team:"Boston Celtics",         past_teams:[{team:"Boston Celtics",dur:"2 seasons"},{team:"Philadelphia 76ers",dur:"1 season"}],                                                            jazz_years:"1 season" },
];

const CAVS_TEAM = {
  name: "Cleveland Cavaliers",
  city: "Cleveland",
  conference: "East",
  division: "Central",
  arena: "Rocket Mortgage FieldHouse",
  mascot: "Moondog",
  colors: "Wine, Gold, Black",
  championships: "1",
  lastTitle: "2016",
  abbreviation: "CLE",
  coach: "Kenny Atkinson",
  coachPrevTeam: { team: "Golden State Warriors", role: "Assistant Coach" },
  coachSince: "2023"
};

const CAVS_STARTING_LINEUP = { PG:"Donovan Mitchell", SG:"James Harden", SF:"Max Strus", PF:"Evan Mobley", C:"Jarrett Allen" };

const CAVS_ROSTER = [
  { name:"James Harden",        position:"G", jersey:"1",  height:"6ft 5in",  college:"Arizona State",   country:"USA",       hometown:"Los Angeles, California",      draft_year:"2009", draft_pick:"3",         draft_team:"Oklahoma City Thunder",  past_teams:[{team:"Oklahoma City Thunder",dur:"3 seasons"},{team:"Houston Rockets",dur:"8 seasons"},{team:"Brooklyn Nets",dur:"1 season"},{team:"Philadelphia 76ers",dur:"2 seasons"},{team:"LA Clippers",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Donovan Mitchell",     position:"G", jersey:"45", height:"6ft 1in",  college:"Louisville",      country:"USA",       hometown:"Elmsford, New York",           draft_year:"2017", draft_pick:"13",        draft_team:"Denver Nuggets",         past_teams:[{team:"Utah Jazz",dur:"5 seasons"}],                                                                                                            jazz_years:"1 season" },
  { name:"Dennis Schroder",      position:"G", jersey:"17", height:"6ft 1in",  college:"None",            country:"Germany",   hometown:"Braunschweig, Germany",        draft_year:"2013", draft_pick:"17",        draft_team:"Atlanta Hawks",          past_teams:[{team:"Atlanta Hawks",dur:"5 seasons"},{team:"Oklahoma City Thunder",dur:"1 season"},{team:"Los Angeles Lakers",dur:"1 season"},{team:"Boston Celtics",dur:"1 season"},{team:"Houston Rockets",dur:"1 season"},{team:"Los Angeles Lakers",dur:"1 season"},{team:"Toronto Raptors",dur:"1 season"},{team:"Brooklyn Nets",dur:"1 season"},{team:"Golden State Warriors",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Craig Porter Jr.",     position:"G", jersey:"9",  height:"6ft 3in",  college:"Wichita State",   country:"USA",       hometown:"Kansas City, Kansas",          draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tyrese Proctor",       position:"G", jersey:"0",  height:"6ft 5in",  college:"Duke",            country:"Australia", hometown:"Brisbane, Australia",          draft_year:"2023", draft_pick:"38",        draft_team:"San Antonio Spurs",      past_teams:[{team:"San Antonio Spurs",dur:"1 season"}],                                                                                                    jazz_years:"1 season" },
  { name:"Sam Merrill",          position:"G", jersey:"10", height:"6ft 5in",  college:"Utah State",      country:"USA",       hometown:"Logan, Utah",                  draft_year:"2020", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Milwaukee Bucks",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Max Strus",            position:"F", jersey:"1",  height:"6ft 6in",  college:"DePaul",          country:"USA",       hometown:"Island Lake, Illinois",        draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Miami Heat",dur:"3 seasons"}],                                                                                                          jazz_years:"1 season" },
  { name:"Dean Wade",            position:"F", jersey:"12", height:"6ft 9in",  college:"Kansas State",    country:"USA",       hometown:"Sterling, Colorado",           draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Keon Ellis",           position:"F", jersey:"23", height:"6ft 6in",  college:"Alabama",         country:"USA",       hometown:"Atlanta, Georgia",             draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Sacramento Kings",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Jaylon Tyson",         position:"F", jersey:"21", height:"6ft 7in",  college:"California",      country:"USA",       hometown:"Charlotte, North Carolina",    draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Larry Nance Jr.",      position:"F", jersey:"22", height:"6ft 8in",  college:"Wyoming",         country:"USA",       hometown:"Cuyahoga Falls, Ohio",         draft_year:"2015", draft_pick:"27",        draft_team:"Los Angeles Lakers",     past_teams:[{team:"Los Angeles Lakers",dur:"3 seasons"},{team:"Cleveland Cavaliers",dur:"3 seasons"},{team:"New Orleans Pelicans",dur:"2 seasons"},{team:"Portland Trail Blazers",dur:"1 season"},{team:"Atlanta Hawks",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Tristan Enaruna",      position:"F", jersey:"6",  height:"6ft 8in",  college:"Kansas",          country:"Netherlands",hometown:"Utrecht, Netherlands",        draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Utah Jazz",dur:"1 season"},{team:"Memphis Grizzlies",dur:"1 season"}],                                                                   jazz_years:"1 season" },
  { name:"Nae'Qwan Tomlin",      position:"F", jersey:"15", height:"6ft 8in",  college:"Kansas State",    country:"USA",       hometown:"Washington, D.C.",             draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Riley Minix",          position:"F", jersey:"11", height:"6ft 7in",  college:"Samford",         country:"USA",       hometown:"Pell City, Alabama",           draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Evan Mobley",          position:"C", jersey:"4",  height:"7ft 0in",  college:"USC",             country:"USA",       hometown:"Murrieta, California",         draft_year:"2021", draft_pick:"3",         draft_team:"Cleveland Cavaliers",    past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jarrett Allen",        position:"C", jersey:"31", height:"6ft 11in", college:"Texas",           country:"USA",       hometown:"Austin, Texas",                draft_year:"2017", draft_pick:"22",        draft_team:"Brooklyn Nets",          past_teams:[{team:"Brooklyn Nets",dur:"3 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Thomas Bryant",        position:"C", jersey:"13", height:"6ft 10in", college:"Indiana",         country:"USA",       hometown:"Rochester, New York",          draft_year:"2017", draft_pick:"42",        draft_team:"Utah Jazz",              past_teams:[{team:"Utah Jazz",dur:"1 season"},{team:"Washington Wizards",dur:"4 seasons"},{team:"Los Angeles Lakers",dur:"1 season"},{team:"Miami Heat",dur:"1 season"},{team:"Denver Nuggets",dur:"1 season"}], jazz_years:"1 season" },
];

const PISTONS_TEAM = {
  name: "Detroit Pistons",
  city: "Detroit",
  conference: "East",
  division: "Central",
  arena: "Little Caesars Arena",
  mascot: "Hooper",
  colors: "Red, Blue, Silver",
  championships: "3",
  lastTitle: "2004",
  abbreviation: "DET",
  coach: "JB Bickerstaff",
  coachPrevTeam: { team: "Cleveland Cavaliers", role: "Head Coach" },
  coachSince: "2023"
};

const PISTONS_STARTING_LINEUP = { PG:"Cade Cunningham", SG:"Duncan Robinson", SF:"Ausar Thompson", PF:"Tobias Harris", C:"Jalen Duren" };

const PISTONS_ROSTER = [
  { name:"Cade Cunningham",    position:"G", jersey:"2",  height:"6ft 6in",  college:"Oklahoma State",  country:"USA",       hometown:"Humble, Texas",                draft_year:"2021", draft_pick:"1",         draft_team:"Detroit Pistons",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Marcus Sasser",      position:"G", jersey:"21", height:"6ft 2in",  college:"Houston",         country:"USA",       hometown:"Pearland, Texas",              draft_year:"2023", draft_pick:"25",        draft_team:"Detroit Pistons",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Daniss Jenkins",      position:"G", jersey:"12", height:"6ft 4in",  college:"Connecticut",     country:"USA",       hometown:"West Orange, New Jersey",      draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Caris LeVert",        position:"G", jersey:"22", height:"6ft 6in",  college:"Michigan",        country:"USA",       hometown:"Columbus, Ohio",               draft_year:"2016", draft_pick:"20",        draft_team:"Brooklyn Nets",          past_teams:[{team:"Brooklyn Nets",dur:"4 seasons"},{team:"Indiana Pacers",dur:"1 season"},{team:"Cleveland Cavaliers",dur:"2 seasons"},{team:"Brooklyn Nets",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Wendell Moore Jr.",   position:"G", jersey:"0",  height:"6ft 5in",  college:"Duke",            country:"USA",       hometown:"Indian Trail, North Carolina", draft_year:"2022", draft_pick:"26",        draft_team:"Dallas Mavericks",       past_teams:[{team:"Dallas Mavericks",dur:"1 season"},{team:"Minnesota Timberwolves",dur:"1 season"}],                                                      jazz_years:"1 season" },
  { name:"Ausar Thompson",      position:"F", jersey:"5",  height:"6ft 7in",  college:"None",            country:"USA",       hometown:"Sacramento, California",       draft_year:"2023", draft_pick:"5",         draft_team:"Detroit Pistons",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tobias Harris",       position:"F", jersey:"12", height:"6ft 8in",  college:"Tennessee",       country:"USA",       hometown:"Islip, New York",              draft_year:"2011", draft_pick:"19",        draft_team:"Milwaukee Bucks",        past_teams:[{team:"Milwaukee Bucks",dur:"1 season"},{team:"Orlando Magic",dur:"2 seasons"},{team:"Detroit Pistons",dur:"1 season"},{team:"LA Clippers",dur:"3 seasons"},{team:"Philadelphia 76ers",dur:"4 seasons"}], jazz_years:"1 season" },
  { name:"Kevin Huerter",       position:"F", jersey:"5",  height:"6ft 7in",  college:"Maryland",        country:"USA",       hometown:"Clifton Park, New York",       draft_year:"2018", draft_pick:"19",        draft_team:"Atlanta Hawks",          past_teams:[{team:"Atlanta Hawks",dur:"4 seasons"},{team:"Sacramento Kings",dur:"2 seasons"}],                                                              jazz_years:"1 season" },
  { name:"Ron Holland",         position:"F", jersey:"5",  height:"6ft 8in",  college:"None",            country:"USA",       hometown:"Duncanville, Texas",           draft_year:"2024", draft_pick:"5",         draft_team:"Detroit Pistons",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Javonte Green",       position:"F", jersey:"36", height:"6ft 5in",  college:"Fayetteville State",country:"USA",     hometown:"Reidsville, North Carolina",   draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Boston Celtics",dur:"1 season"},{team:"Chicago Bulls",dur:"2 seasons"},{team:"Indiana Pacers",dur:"2 seasons"}],                        jazz_years:"1 season" },
  { name:"Jalen Duren",         position:"C", jersey:"0",  height:"6ft 11in", college:"Memphis",         country:"USA",       hometown:"Philadelphia, Pennsylvania",   draft_year:"2022", draft_pick:"13",        draft_team:"Charlotte Hornets",      past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Isaiah Stewart",      position:"C", jersey:"28", height:"6ft 9in",  college:"Washington",      country:"USA",       hometown:"Rochester, New York",          draft_year:"2020", draft_pick:"16",        draft_team:"Detroit Pistons",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Paul Reed",           position:"C", jersey:"44", height:"6ft 9in",  college:"DePaul",          country:"USA",       hometown:"Fort Lauderdale, Florida",     draft_year:"2020", draft_pick:"58",        draft_team:"Philadelphia 76ers",     past_teams:[{team:"Philadelphia 76ers",dur:"3 seasons"},{team:"Brooklyn Nets",dur:"1 season"}],                                                             jazz_years:"1 season" },
  { name:"Tolu Smith",          position:"C", jersey:"1",  height:"6ft 9in",  college:"Mississippi State",country:"USA",      hometown:"Waldorf, Maryland",            draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Duncan Robinson",      position:"G", jersey:"55", height:"6ft 7in",  college:"Michigan",         country:"USA",       hometown:"Williamstown, Massachusetts",  draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Miami Heat",dur:"5 seasons"}],                                                                                                                 jazz_years:"1 season" },
];

const PACERS_TEAM = {
  name: "Indiana Pacers",
  city: "Indianapolis",
  conference: "East",
  division: "Central",
  arena: "Gainbridge Fieldhouse",
  mascot: "Boomer",
  colors: "Gold, Blue, White",
  championships: "0",
  lastTitle: "N/A",
  abbreviation: "IND",
  coach: "Rick Carlisle",
  coachPrevTeam: { team: "Dallas Mavericks", role: "Head Coach" },
  coachSince: "2021"
};

const PACERS_STARTING_LINEUP = { PG:"Tyrese Haliburton", SG:"Andrew Nembhard", SF:"Aaron Nesmith", PF:"Pascal Siakam", C:"Ivica Zubac" };

const PACERS_ROSTER = [
  { name:"Tyrese Haliburton",  position:"G", jersey:"0",  height:"6ft 5in",  college:"Iowa State",      country:"USA",       hometown:"Oshkosh, Wisconsin",           draft_year:"2020", draft_pick:"12",        draft_team:"Sacramento Kings",       past_teams:[{team:"Sacramento Kings",dur:"1 season"}],                                                                                                     jazz_years:"1 season" },
  { name:"Andrew Nembhard",    position:"G", jersey:"2",  height:"6ft 5in",  college:"Gonzaga",         country:"Canada",    hometown:"Orlando, Florida",             draft_year:"2022", draft_pick:"31",        draft_team:"Indiana Pacers",         past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"T.J. McConnell",     position:"G", jersey:"9",  height:"6ft 1in",  college:"Arizona",         country:"USA",       hometown:"Pittsburgh, Pennsylvania",     draft_year:"2015", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Philadelphia 76ers",dur:"3 seasons"}],                                                                                                  jazz_years:"1 season" },
  { name:"Ben Sheppard",       position:"G", jersey:"26", height:"6ft 6in",  college:"Belmont",         country:"USA",       hometown:"Zionsville, Indiana",          draft_year:"2023", draft_pick:"26",        draft_team:"Indiana Pacers",         past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Ethan Thompson",     position:"G", jersey:"8",  height:"6ft 5in",  college:"Oregon State",    country:"Canada",    hometown:"Mississauga, Ontario, Canada", draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Charlotte Hornets",dur:"1 season"},{team:"Brooklyn Nets",dur:"1 season"}],                                                               jazz_years:"1 season" },
  { name:"Pascal Siakam",      position:"F", jersey:"43", height:"6ft 9in",  college:"New Mexico State",country:"Cameroon",  hometown:"Douala, Cameroon",             draft_year:"2016", draft_pick:"27",        draft_team:"Toronto Raptors",        past_teams:[{team:"Toronto Raptors",dur:"7 seasons"}],                                                                                                     jazz_years:"1 season" },
  { name:"Aaron Nesmith",      position:"F", jersey:"23", height:"6ft 6in",  college:"Vanderbilt",      country:"USA",       hometown:"Charlotte, North Carolina",    draft_year:"2020", draft_pick:"14",        draft_team:"Boston Celtics",         past_teams:[{team:"Boston Celtics",dur:"2 seasons"}],                                                                                                      jazz_years:"1 season" },
  { name:"Jarace Walker",      position:"F", jersey:"5",  height:"6ft 8in",  college:"Houston",         country:"USA",       hometown:"New York, New York",           draft_year:"2023", draft_pick:"8",         draft_team:"Indiana Pacers",         past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Obi Toppin",         position:"F", jersey:"1",  height:"6ft 9in",  college:"Dayton",          country:"USA",       hometown:"Brooklyn, New York",           draft_year:"2020", draft_pick:"8",         draft_team:"New York Knicks",        past_teams:[{team:"New York Knicks",dur:"3 seasons"}],                                                                                                     jazz_years:"1 season" },
  { name:"Kobe Brown",         position:"F", jersey:"0",  height:"6ft 7in",  college:"Missouri",        country:"USA",       hometown:"Rock Hill, South Carolina",    draft_year:"2023", draft_pick:"49",        draft_team:"Los Angeles Lakers",     past_teams:[{team:"Los Angeles Lakers",dur:"1 season"},{team:"Milwaukee Bucks",dur:"1 season"}],                                                           jazz_years:"1 season" },
  { name:"Johnny Furphy",      position:"F", jersey:"12", height:"6ft 8in",  college:"Kansas",          country:"Australia", hometown:"Melbourne, Australia",         draft_year:"2024", draft_pick:"28",        draft_team:"Indiana Pacers",         past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Quenton Jackson",    position:"F", jersey:"0",  height:"6ft 5in",  college:"Texas A&M",       country:"USA",       hometown:"Fort Worth, Texas",            draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Los Angeles Lakers",dur:"1 season"},{team:"Memphis Grizzlies",dur:"1 season"}],                                                          jazz_years:"1 season" },
  { name:"Kam Jones",          position:"G", jersey:"7",  height:"6ft 5in",  college:"Marquette",       country:"USA",       hometown:"Milwaukee, Wisconsin",         draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Ivica Zubac",        position:"C", jersey:"40", height:"7ft 0in",  college:"None",            country:"Croatia",   hometown:"Mostar, Bosnia",               draft_year:"2016", draft_pick:"32",        draft_team:"Los Angeles Lakers",     past_teams:[{team:"Los Angeles Lakers",dur:"2 seasons"},{team:"LA Clippers",dur:"6 seasons"}],                                                              jazz_years:"1 season" },
  { name:"James Huff",         position:"C", jersey:"15", height:"7ft 1in",  college:"High Point",      country:"USA",       hometown:"Charlotte, North Carolina",    draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tony Bradley",       position:"C", jersey:"13", height:"6ft 10in", college:"North Carolina",  country:"USA",       hometown:"Bartow, Florida",              draft_year:"2017", draft_pick:"28",        draft_team:"Utah Jazz",              past_teams:[{team:"Utah Jazz",dur:"2 seasons"},{team:"Philadelphia 76ers",dur:"1 season"},{team:"Oklahoma City Thunder",dur:"1 season"},{team:"Charlotte Hornets",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Micah Potter",       position:"C", jersey:"20", height:"6ft 10in", college:"Ohio State",      country:"USA",       hometown:"Maumee, Ohio",                 draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Milwaukee Bucks",dur:"1 season"},{team:"Chicago Bulls",dur:"1 season"}],                                                                   jazz_years:"1 season" },
  { name:"Jalen Slawson",      position:"C", jersey:"17", height:"6ft 9in",  college:"Furman",          country:"USA",       hometown:"Travelers Rest, South Carolina",draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",             past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
];

const HEAT_TEAM = {
  name: "Miami Heat",
  city: "Miami",
  conference: "East",
  division: "Southeast",
  arena: "Kaseya Center",
  mascot: "Burnie",
  colors: "Red, Black, Gold",
  championships: "3",
  lastTitle: "2013",
  abbreviation: "MIA",
  coach: "Erik Spoelstra",
  coachPrevTeam: { team: "Miami Heat", role: "Assistant Coach" },
  coachSince: "2008"
};

const HEAT_STARTING_LINEUP = { PG:"Davion Mitchell", SG:"Tyler Herro", SF:"Norman Powell", PF:"Pelle Larsson", C:"Bam Adebayo" };

const HEAT_ROSTER = [
  { name:"Tyler Herro",            position:"G", jersey:"14", height:"6ft 5in",  college:"Kentucky",        country:"USA",       hometown:"Pewaukee, Wisconsin",          draft_year:"2019", draft_pick:"13",        draft_team:"Miami Heat",             past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Davion Mitchell",        position:"G", jersey:"45", height:"6ft 2in",  college:"Baylor",          country:"USA",       hometown:"Hinesville, Georgia",          draft_year:"2021", draft_pick:"9",         draft_team:"Sacramento Kings",       past_teams:[{team:"Sacramento Kings",dur:"2 seasons"},{team:"Toronto Raptors",dur:"1 season"},{team:"New Orleans Pelicans",dur:"1 season"}],                jazz_years:"1 season" },
  { name:"Terry Rozier",           position:"G", jersey:"2",  height:"6ft 2in",  college:"Louisville",      country:"USA",       hometown:"Youngstown, Ohio",             draft_year:"2015", draft_pick:"16",        draft_team:"Boston Celtics",         past_teams:[{team:"Boston Celtics",dur:"4 seasons"},{team:"Charlotte Hornets",dur:"4 seasons"}],                                                            jazz_years:"1 season" },
  { name:"Norman Powell",          position:"G", jersey:"24", height:"6ft 4in",  college:"UCLA",            country:"USA",       hometown:"San Diego, California",        draft_year:"2015", draft_pick:"46",        draft_team:"Toronto Raptors",        past_teams:[{team:"Toronto Raptors",dur:"5 seasons"},{team:"Portland Trail Blazers",dur:"1 season"},{team:"LA Clippers",dur:"3 seasons"}],                   jazz_years:"1 season" },
  { name:"Dru Smith",              position:"G", jersey:"10", height:"6ft 4in",  college:"Missouri",        country:"USA",       hometown:"Anderson, Indiana",            draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Indiana Pacers",dur:"1 season"}],                                                                                                          jazz_years:"1 season" },
  { name:"Kasparas Jakucionis",    position:"G", jersey:"11", height:"6ft 5in",  college:"Illinois",        country:"Lithuania", hometown:"Prienai, Lithuania",           draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Pelle Larsson",          position:"G", jersey:"4",  height:"6ft 5in",  college:"Arizona",         country:"Sweden",    hometown:"Gothenburg, Sweden",           draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jahmir Young",           position:"G", jersey:"3",  height:"6ft 1in",  college:"Charlotte",       country:"USA",       hometown:"Baltimore, Maryland",          draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Charlotte Hornets",dur:"1 season"}],                                                                                                    jazz_years:"1 season" },
  { name:"Andrew Wiggins",         position:"F", jersey:"22", height:"6ft 7in",  college:"Kansas",          country:"Canada",    hometown:"Thornhill, Ontario, Canada",   draft_year:"2014", draft_pick:"1",         draft_team:"Cleveland Cavaliers",    past_teams:[{team:"Minnesota Timberwolves",dur:"6 seasons"},{team:"Golden State Warriors",dur:"4 seasons"}],                                                jazz_years:"1 season" },
  { name:"Jaime Jaquez Jr.",       position:"F", jersey:"11", height:"6ft 7in",  college:"UCLA",            country:"USA",       hometown:"Camarillo, California",        draft_year:"2023", draft_pick:"18",        draft_team:"Miami Heat",             past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Simone Fontecchio",      position:"F", jersey:"16", height:"6ft 8in",  college:"None",            country:"Italy",     hometown:"Rome, Italy",                  draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Utah Jazz",dur:"1 season"},{team:"Detroit Pistons",dur:"1 season"}],                                                                    jazz_years:"1 season" },
  { name:"Nikola Jovic",           position:"F", jersey:"5",  height:"6ft 10in", college:"None",            country:"Serbia",    hometown:"Sombor, Serbia",               draft_year:"2022", draft_pick:"27",        draft_team:"Miami Heat",             past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Keshad Johnson",         position:"F", jersey:"18", height:"6ft 7in",  college:"Arizona",         country:"USA",       hometown:"San Diego, California",        draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Myron Gardner",          position:"F", jersey:"6",  height:"6ft 7in",  college:"Alabama",         country:"USA",       hometown:"Memphis, Tennessee",           draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Bam Adebayo",            position:"C", jersey:"13", height:"6ft 9in",  college:"Kentucky",        country:"USA",       hometown:"Newark, New Jersey",           draft_year:"2017", draft_pick:"14",        draft_team:"Miami Heat",             past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Kel'el Ware",            position:"C", jersey:"7",  height:"7ft 1in",  college:"Indiana",         country:"USA",       hometown:"Junction City, Arkansas",      draft_year:"2024", draft_pick:"15",        draft_team:"Miami Heat",             past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Vladislav Goldin",       position:"C", jersey:"17", height:"7ft 1in",  college:"TCU",             country:"Russia",    hometown:"Saint Petersburg, Russia",     draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
];

const BUCKS_TEAM = {
  name: "Milwaukee Bucks",
  city: "Milwaukee",
  conference: "East",
  division: "Central",
  arena: "Fiserv Forum",
  mascot: "Bango",
  colors: "Green, Cream, White",
  championships: "2",
  lastTitle: "2021",
  abbreviation: "MIL",
  coach: "Doc Rivers",
  coachPrevTeam: { team: "Philadelphia 76ers", role: "Head Coach" },
  coachSince: "2023"
};

const BUCKS_STARTING_LINEUP = { PG:"Ryan Rollins", SG:"Kevin Porter Jr.", SF:"Kyle Kuzma", PF:"Giannis Antetokounmpo", C:"Myles Turner" };

const BUCKS_ROSTER = [
  { name:"Kevin Porter Jr.",           position:"G", jersey:"5",  height:"6ft 4in",  college:"USC",             country:"USA",       hometown:"Seattle, Washington",          draft_year:"2019", draft_pick:"30",        draft_team:"Cleveland Cavaliers",    past_teams:[{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Houston Rockets",dur:"3 seasons"},{team:"Los Angeles Clippers",dur:"1 season"}],       jazz_years:"1 season" },
  { name:"Gary Trent Jr.",             position:"G", jersey:"2",  height:"6ft 5in",  college:"Duke",            country:"USA",       hometown:"Columbus, Ohio",               draft_year:"2018", draft_pick:"37",        draft_team:"Sacramento Kings",       past_teams:[{team:"Portland Trail Blazers",dur:"3 seasons"},{team:"Toronto Raptors",dur:"2 seasons"},{team:"Philadelphia 76ers",dur:"1 season"},{team:"Minnesota Timberwolves",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Ryan Rollins",               position:"G", jersey:"11", height:"6ft 4in",  college:"Toledo",          country:"USA",       hometown:"Detroit, Michigan",            draft_year:"2022", draft_pick:"44",        draft_team:"Golden State Warriors",  past_teams:[{team:"Golden State Warriors",dur:"2 seasons"}],                                                                                                jazz_years:"1 season" },
  { name:"Cam Thomas",                 position:"G", jersey:"1",  height:"6ft 4in",  college:"LSU",             country:"USA",       hometown:"Columbus, Georgia",            draft_year:"2021", draft_pick:"27",        draft_team:"Brooklyn Nets",          past_teams:[{team:"Brooklyn Nets",dur:"3 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Gary Harris",                position:"G", jersey:"14", height:"6ft 4in",  college:"Michigan State",  country:"USA",       hometown:"Fishers, Indiana",             draft_year:"2014", draft_pick:"19",        draft_team:"Chicago Bulls",          past_teams:[{team:"Denver Nuggets",dur:"7 seasons"},{team:"Orlando Magic",dur:"2 seasons"},{team:"Portland Trail Blazers",dur:"1 season"},{team:"Philadelphia 76ers",dur:"1 season"}], jazz_years:"1 season" },
  { name:"AJ Green",                   position:"G", jersey:"14", height:"6ft 3in",  college:"Wisconsin-Green Bay",country:"USA",   hometown:"Green Bay, Wisconsin",         draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Cole Anthony",               position:"G", jersey:"50", height:"6ft 3in",  college:"North Carolina",  country:"USA",       hometown:"Portland, Oregon",             draft_year:"2020", draft_pick:"15",        draft_team:"Orlando Magic",          past_teams:[{team:"Orlando Magic",dur:"4 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Giannis Antetokounmpo",      position:"F", jersey:"34", height:"6ft 11in", college:"None",            country:"Greece",    hometown:"Athens, Greece",               draft_year:"2013", draft_pick:"15",        draft_team:"Milwaukee Bucks",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Kyle Kuzma",                 position:"F", jersey:"3",  height:"6ft 9in",  college:"Utah",            country:"USA",       hometown:"Flint, Michigan",              draft_year:"2017", draft_pick:"27",        draft_team:"Utah Jazz",              past_teams:[{team:"Los Angeles Lakers",dur:"4 seasons"},{team:"Washington Wizards",dur:"3 seasons"}],                                                    jazz_years:"1 season" },
  { name:"Ousmane Dieng",              position:"F", jersey:"13", height:"6ft 10in", college:"None",            country:"France",    hometown:"Bordeaux, France",             draft_year:"2022", draft_pick:"11",        draft_team:"New York Knicks",        past_teams:[{team:"New York Knicks",dur:"1 season"},{team:"Oklahoma City Thunder",dur:"1 season"}],                                                      jazz_years:"1 season" },
  { name:"Taurean Prince",             position:"F", jersey:"12", height:"6ft 6in",  college:"Baylor",          country:"USA",       hometown:"San Antonio, Texas",           draft_year:"2016", draft_pick:"12",        draft_team:"Atlanta Hawks",          past_teams:[{team:"Atlanta Hawks",dur:"3 seasons"},{team:"Brooklyn Nets",dur:"1 season"},{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Minnesota Timberwolves",dur:"1 season"},{team:"Los Angeles Lakers",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Andre Jackson Jr.",          position:"F", jersey:"5",  height:"6ft 6in",  college:"Connecticut",     country:"USA",       hometown:"Elmont, New York",             draft_year:"2023", draft_pick:"36",        draft_team:"Milwaukee Bucks",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Amir Coffey",                position:"F", jersey:"6",  height:"6ft 7in",  college:"Minnesota",       country:"USA",       hometown:"Burnsville, Minnesota",        draft_year:"2019", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"LA Clippers",dur:"4 seasons"},{team:"Houston Rockets",dur:"1 season"},{team:"Phoenix Suns",dur:"1 season"}],                         jazz_years:"1 season" },
  { name:"Alex Antetokounmpo",         position:"F", jersey:"15", height:"6ft 7in",  college:"None",            country:"Greece",    hometown:"Athens, Greece",               draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Thanasis Antetokounmpo",     position:"F", jersey:"43", height:"6ft 6in",  college:"None",            country:"Greece",    hometown:"Athens, Greece",               draft_year:"2014", draft_pick:"51",        draft_team:"New York Knicks",        past_teams:[{team:"New York Knicks",dur:"2 seasons"}],                                                                                                     jazz_years:"1 season" },
  { name:"Myles Turner",               position:"C", jersey:"33", height:"6ft 11in", college:"Texas",           country:"USA",       hometown:"Bedford, Texas",               draft_year:"2015", draft_pick:"11",        draft_team:"Indiana Pacers",         past_teams:[{team:"Indiana Pacers",dur:"9 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Bobby Portis",               position:"C", jersey:"9",  height:"6ft 11in", college:"Arkansas",        country:"USA",       hometown:"Little Rock, Arkansas",        draft_year:"2015", draft_pick:"22",        draft_team:"Chicago Bulls",          past_teams:[{team:"Chicago Bulls",dur:"3 seasons"},{team:"Washington Wizards",dur:"1 season"},{team:"New York Knicks",dur:"1 season"}],                   jazz_years:"1 season" },
  { name:"Jericho Sims",               position:"C", jersey:"5",  height:"6ft 10in", college:"Texas",           country:"USA",       hometown:"Houston, Texas",               draft_year:"2021", draft_pick:"58",        draft_team:"New York Knicks",        past_teams:[{team:"New York Knicks",dur:"3 seasons"}],                                                                                                     jazz_years:"1 season" },
  { name:"Pete Nance",                 position:"C", jersey:"8",  height:"6ft 10in", college:"Northwestern",    country:"USA",       hometown:"Madison, Wisconsin",           draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Charlotte Hornets",dur:"1 season"},{team:"Boston Celtics",dur:"1 season"}],                                                             jazz_years:"1 season" },
];

const KNICKS_TEAM = {
  name: "New York Knicks",
  city: "New York",
  conference: "East",
  division: "Atlantic",
  arena: "Madison Square Garden",
  mascot: "Spike",
  colors: "Blue, Orange, White",
  championships: "2",
  lastTitle: "1973",
  abbreviation: "NYK",
  coach: "Tom Thibodeau",
  coachPrevTeam: { team: "Minnesota Timberwolves", role: "Head Coach" },
  coachSince: "2020"
};

const KNICKS_STARTING_LINEUP = { PG:"Jalen Brunson", SG:"Josh Hart", SF:"Mikal Bridges", PF:"OG Anunoby", C:"Karl-Anthony Towns" };

const KNICKS_ROSTER = [
  { name:"Jalen Brunson",        position:"G", jersey:"11", height:"6ft 1in",  college:"Villanova",       country:"USA",       hometown:"Lincolnshire, Illinois",       draft_year:"2018", draft_pick:"33",        draft_team:"Dallas Mavericks",       past_teams:[{team:"Dallas Mavericks",dur:"4 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Jordan Clarkson",      position:"G", jersey:"0",  height:"6ft 5in",  college:"Missouri",        country:"Philippines",hometown:"San Antonio, Texas",           draft_year:"2014", draft_pick:"46",        draft_team:"Washington Wizards",     past_teams:[{team:"Los Angeles Lakers",dur:"4 seasons"},{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Utah Jazz",dur:"5 seasons"}],                jazz_years:"1 season" },
  { name:"Jose Alvarado",        position:"G", jersey:"15", height:"6ft 0in",  college:"Georgia Tech",    country:"USA",       hometown:"Brooklyn, New York",           draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"New Orleans Pelicans",dur:"3 seasons"}],                                                                                                jazz_years:"1 season" },
  { name:"Miles McBride",        position:"G", jersey:"2",  height:"6ft 2in",  college:"West Virginia",   country:"USA",       hometown:"Cincinnati, Ohio",             draft_year:"2021", draft_pick:"36",        draft_team:"New York Knicks",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tyler Kolek",          position:"G", jersey:"2",  height:"6ft 3in",  college:"Marquette",       country:"USA",       hometown:"Putnam, Connecticut",          draft_year:"2024", draft_pick:"34",        draft_team:"New York Knicks",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Landry Shamet",        position:"G", jersey:"20", height:"6ft 4in",  college:"Wichita State",   country:"USA",       hometown:"Kansas City, Missouri",        draft_year:"2018", draft_pick:"26",        draft_team:"Philadelphia 76ers",     past_teams:[{team:"Philadelphia 76ers",dur:"1 season"},{team:"LA Clippers",dur:"1 season"},{team:"Brooklyn Nets",dur:"1 season"},{team:"Phoenix Suns",dur:"2 seasons"},{team:"Washington Wizards",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Mikal Bridges",        position:"F", jersey:"25", height:"6ft 7in",  college:"Villanova",       country:"USA",       hometown:"Villanova, Pennsylvania",      draft_year:"2018", draft_pick:"10",        draft_team:"Philadelphia 76ers",     past_teams:[{team:"Phoenix Suns",dur:"5 seasons"},{team:"Brooklyn Nets",dur:"1 season"}],                                                                  jazz_years:"1 season" },
  { name:"OG Anunoby",           position:"F", jersey:"8",  height:"6ft 7in",  college:"Indiana",         country:"England",   hometown:"London, England",             draft_year:"2017", draft_pick:"23",        draft_team:"Toronto Raptors",        past_teams:[{team:"Toronto Raptors",dur:"6 seasons"}],                                                                                                     jazz_years:"1 season" },
  { name:"Josh Hart",            position:"F", jersey:"3",  height:"6ft 5in",  college:"Villanova",       country:"USA",       hometown:"Washington, D.C.",             draft_year:"2017", draft_pick:"30",        draft_team:"Los Angeles Lakers",     past_teams:[{team:"Los Angeles Lakers",dur:"2 seasons"},{team:"New Orleans Pelicans",dur:"1 season"},{team:"Portland Trail Blazers",dur:"2 seasons"}],  jazz_years:"1 season" },
  { name:"Pacome Dadiet",        position:"F", jersey:"13", height:"6ft 8in",  college:"None",            country:"France",    hometown:"Paris, France",                draft_year:"2024", draft_pick:"25",        draft_team:"New York Knicks",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Mohamed Diawara",      position:"F", jersey:"10", height:"6ft 7in",  college:"None",            country:"France",    hometown:"Paris, France",                draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Kevin McCullar Jr.",   position:"F", jersey:"1",  height:"6ft 6in",  college:"Kansas",          country:"USA",       hometown:"San Antonio, Texas",           draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jeremy Sochan",        position:"F", jersey:"10", height:"6ft 9in",  college:"Baylor",          country:"Poland",    hometown:"Guildford, England",           draft_year:"2022", draft_pick:"9",         draft_team:"San Antonio Spurs",      past_teams:[{team:"San Antonio Spurs",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Karl-Anthony Towns",   position:"C", jersey:"32", height:"7ft 0in",  college:"Kentucky",        country:"Dominican Republic",hometown:"Piscataway, New Jersey", draft_year:"2015", draft_pick:"1",        draft_team:"Minnesota Timberwolves", past_teams:[{team:"Minnesota Timberwolves",dur:"9 seasons"}],                                                                                                jazz_years:"1 season" },
  { name:"Mitchell Robinson",    position:"C", jersey:"23", height:"7ft 1in",  college:"None",            country:"USA",       hometown:"Pensacola, Florida",           draft_year:"2018", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Ariel Hukporti",       position:"C", jersey:"19", height:"7ft 1in",  college:"None",            country:"Germany",   hometown:"Krefeld, Germany",             draft_year:"2023", draft_pick:"40",        draft_team:"New York Knicks",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Trey Jemison III",     position:"C", jersey:"7",  height:"7ft 0in",  college:"Pittsburgh",      country:"USA",       hometown:"Birmingham, Alabama",          draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"New Orleans Pelicans",dur:"1 season"}],                                                                                                 jazz_years:"1 season" },
];

const MAGIC_TEAM = {
  name: "Orlando Magic",
  city: "Orlando",
  conference: "East",
  division: "Southeast",
  arena: "Kia Center",
  mascot: "Stuff the Magic Dragon",
  colors: "Blue, Black, Silver",
  championships: "0",
  lastTitle: "N/A",
  abbreviation: "ORL",
  coach: "Jamahl Mosley",
  coachPrevTeam: { team: "Dallas Mavericks", role: "Assistant Coach" },
  coachSince: "2021"
};

const MAGIC_STARTING_LINEUP = { PG:"Jalen Suggs", SG:"Desmond Bane", SF:"Franz Wagner", PF:"Paolo Banchero", C:"Wendell Carter Jr." };

const MAGIC_ROSTER = [
  { name:"Jalen Suggs",          position:"G", jersey:"4",  height:"6ft 4in",  college:"Gonzaga",         country:"USA",       hometown:"Minneapolis, Minnesota",       draft_year:"2021", draft_pick:"5",         draft_team:"Orlando Magic",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Anthony Black",        position:"G", jersey:"0",  height:"6ft 7in",  college:"Arkansas",        country:"USA",       hometown:"Coppell, Texas",               draft_year:"2023", draft_pick:"6",         draft_team:"Orlando Magic",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tyus Jones",           position:"G", jersey:"21", height:"6ft 0in",  college:"Duke",            country:"USA",       hometown:"Apple Valley, Minnesota",      draft_year:"2015", draft_pick:"24",        draft_team:"Minnesota Timberwolves", past_teams:[{team:"Minnesota Timberwolves",dur:"2 seasons"},{team:"Memphis Grizzlies",dur:"4 seasons"},{team:"Washington Wizards",dur:"2 seasons"},{team:"Phoenix Suns",dur:"1 season"},{team:"Denver Nuggets",dur:"1 season"},{team:"Charlotte Hornets",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Jevon Carter",         position:"G", jersey:"5",  height:"6ft 2in",  college:"West Virginia",   country:"USA",       hometown:"Maywood, Illinois",            draft_year:"2018", draft_pick:"32",        draft_team:"Memphis Grizzlies",      past_teams:[{team:"Memphis Grizzlies",dur:"1 season"},{team:"Phoenix Suns",dur:"1 season"},{team:"Brooklyn Nets",dur:"1 season"},{team:"Milwaukee Bucks",dur:"2 seasons"},{team:"Miami Heat",dur:"1 season"},{team:"Chicago Bulls",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Jase Richardson",      position:"G", jersey:"3",  height:"6ft 2in",  college:"Michigan State",  country:"USA",       hometown:"Malibu, California",           draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Alex Morales",         position:"G", jersey:"9",  height:"6ft 6in",  college:"North Carolina",  country:"Dominican Republic",hometown:"Santo Domingo, Dominican Republic", draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted", past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Paolo Banchero",       position:"F", jersey:"5",  height:"6ft 10in", college:"Duke",            country:"USA",       hometown:"Seattle, Washington",          draft_year:"2022", draft_pick:"1",         draft_team:"Orlando Magic",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Franz Wagner",         position:"F", jersey:"21", height:"6ft 10in", college:"Michigan",        country:"Germany",   hometown:"Berlin, Germany",              draft_year:"2021", draft_pick:"8",         draft_team:"Orlando Magic",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Desmond Bane",         position:"F", jersey:"22", height:"6ft 6in",  college:"TCU",             country:"USA",       hometown:"Richmond, Indiana",            draft_year:"2020", draft_pick:"30",        draft_team:"Memphis Grizzlies",      past_teams:[{team:"Memphis Grizzlies",dur:"4 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Jonathan Isaac",       position:"F", jersey:"1",  height:"6ft 11in", college:"Florida State",   country:"USA",       hometown:"Longwood, Florida",            draft_year:"2017", draft_pick:"6",         draft_team:"Orlando Magic",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tristan da Silva",     position:"F", jersey:"31", height:"6ft 8in",  college:"Colorado",        country:"Brazil",    hometown:"Sao Paulo, Brazil",            draft_year:"2024", draft_pick:"18",        draft_team:"Orlando Magic",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jett Howard",          position:"F", jersey:"13", height:"6ft 6in",  college:"Michigan",        country:"USA",       hometown:"Missoula, Montana",            draft_year:"2023", draft_pick:"11",        draft_team:"Orlando Magic",          past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Noah Penda",           position:"F", jersey:"17", height:"6ft 8in",  college:"None",            country:"France",    hometown:"Rouen, France",                draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jamal Cain",           position:"F", jersey:"10", height:"6ft 7in",  college:"Oakland",         country:"USA",       hometown:"Detroit, Michigan",            draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Golden State Warriors",dur:"1 season"},{team:"Houston Rockets",dur:"1 season"}],                                                           jazz_years:"1 season" },
  { name:"Wendell Carter Jr.",   position:"C", jersey:"34", height:"6ft 10in", college:"Duke",            country:"USA",       hometown:"Atlanta, Georgia",             draft_year:"2018", draft_pick:"7",         draft_team:"Chicago Bulls",          past_teams:[{team:"Chicago Bulls",dur:"3 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Goga Bitadze",         position:"C", jersey:"88", height:"7ft 0in",  college:"None",            country:"Georgia",   hometown:"Tbilisi, Georgia",             draft_year:"2019", draft_pick:"18",        draft_team:"Indiana Pacers",         past_teams:[{team:"Indiana Pacers",dur:"3 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Moritz Wagner",        position:"C", jersey:"21", height:"6ft 11in", college:"Michigan",        country:"Germany",   hometown:"Berlin, Germany",              draft_year:"2018", draft_pick:"25",        draft_team:"Los Angeles Lakers",     past_teams:[{team:"Los Angeles Lakers",dur:"1 season"},{team:"Washington Wizards",dur:"2 seasons"}],                                                         jazz_years:"1 season" },
  { name:"Orlando Robinson",     position:"C", jersey:"50", height:"6ft 11in", college:"Fresno State",    country:"USA",       hometown:"Philadelphia, Pennsylvania",   draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Miami Heat",dur:"2 seasons"}],                                                                                                           jazz_years:"1 season" },
];

const SIXERS_TEAM = {
  name: "Philadelphia 76ers",
  city: "Philadelphia",
  conference: "East",
  division: "Atlantic",
  arena: "Wells Fargo Center",
  mascot: "Franklin",
  colors: "Blue, Red, Silver",
  championships: "3",
  lastTitle: "1983",
  abbreviation: "PHI",
  coach: "Nick Nurse",
  coachPrevTeam: { team: "Toronto Raptors", role: "Head Coach" },
  coachSince: "2023"
};

const SIXERS_STARTING_LINEUP = { PG:"Tyrese Maxey", SG:"V.J. Edgecombe", SF:"Paul George", PF:"Kelly Oubre Jr.", C:"Joel Embiid" };

const SIXERS_ROSTER = [
  { name:"Tyrese Maxey",         position:"G", jersey:"0",  height:"6ft 2in",  college:"Kentucky",        country:"USA",       hometown:"Garland, Texas",               draft_year:"2020", draft_pick:"21",        draft_team:"Philadelphia 76ers",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Quentin Grimes",       position:"G", jersey:"5",  height:"6ft 5in",  college:"Houston",         country:"USA",       hometown:"The Woodlands, Texas",         draft_year:"2021", draft_pick:"25",        draft_team:"New York Knicks",        past_teams:[{team:"New York Knicks",dur:"3 seasons"},{team:"Dallas Mavericks",dur:"1 season"}],                                                             jazz_years:"1 season" },
  { name:"Cameron Payne",        position:"G", jersey:"1",  height:"6ft 2in",  college:"Murray State",    country:"USA",       hometown:"Memphis, Tennessee",           draft_year:"2015", draft_pick:"14",        draft_team:"Oklahoma City Thunder",  past_teams:[{team:"Oklahoma City Thunder",dur:"2 seasons"},{team:"Chicago Bulls",dur:"1 season"},{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Phoenix Suns",dur:"3 seasons"},{team:"Milwaukee Bucks",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Kyle Lowry",           position:"G", jersey:"7",  height:"6ft 0in",  college:"Villanova",       country:"USA",       hometown:"Philadelphia, Pennsylvania",   draft_year:"2006", draft_pick:"24",        draft_team:"Memphis Grizzlies",      past_teams:[{team:"Memphis Grizzlies",dur:"2 seasons"},{team:"Houston Rockets",dur:"2 seasons"},{team:"Toronto Raptors",dur:"9 seasons"},{team:"Miami Heat",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Tyrese Martin",        position:"G", jersey:"6",  height:"6ft 6in",  college:"Connecticut",     country:"USA",       hometown:"Elmont, New York",             draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Atlanta Hawks",dur:"1 season"},{team:"New Orleans Pelicans",dur:"1 season"}],                                                             jazz_years:"1 season" },
  { name:"Dalen Terry",          position:"G", jersey:"25", height:"6ft 7in",  college:"Arizona",         country:"USA",       hometown:"Phoenix, Arizona",             draft_year:"2022", draft_pick:"18",        draft_team:"Chicago Bulls",          past_teams:[{team:"Chicago Bulls",dur:"2 seasons"},{team:"Detroit Pistons",dur:"1 season"}],                                                                  jazz_years:"1 season" },
  { name:"Paul George",          position:"F", jersey:"8",  height:"6ft 8in",  college:"Fresno State",    country:"USA",       hometown:"Palmdale, California",         draft_year:"2010", draft_pick:"10",        draft_team:"Indiana Pacers",         past_teams:[{team:"Indiana Pacers",dur:"8 seasons"},{team:"Oklahoma City Thunder",dur:"1 season"},{team:"LA Clippers",dur:"5 seasons"}],                   jazz_years:"1 season" },
  { name:"Kelly Oubre Jr.",      position:"F", jersey:"12", height:"6ft 7in",  college:"Kansas",          country:"USA",       hometown:"New Orleans, Louisiana",       draft_year:"2015", draft_pick:"15",        draft_team:"Atlanta Hawks",          past_teams:[{team:"Washington Wizards",dur:"3 seasons"},{team:"Phoenix Suns",dur:"2 seasons"},{team:"Golden State Warriors",dur:"1 season"},{team:"Charlotte Hornets",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Justin Edwards",       position:"F", jersey:"1",  height:"6ft 7in",  college:"Kentucky",        country:"USA",       hometown:"Philadelphia, Pennsylvania",   draft_year:"2024", draft_pick:"15",        draft_team:"Philadelphia 76ers",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"V.J. Edgecombe",       position:"F", jersey:"4",  height:"6ft 5in",  college:"Baylor",          country:"Bahamas",   hometown:"Nassau, Bahamas",              draft_year:"2025", draft_pick:"5",         draft_team:"Philadelphia 76ers",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jabari Walker",        position:"F", jersey:"28", height:"6ft 8in",  college:"Colorado",        country:"USA",       hometown:"Portland, Oregon",             draft_year:"2022", draft_pick:"27",        draft_team:"Portland Trail Blazers", past_teams:[{team:"Portland Trail Blazers",dur:"2 seasons"}],                                                                                                jazz_years:"1 season" },
  { name:"MarJon Beauchamp",     position:"F", jersey:"0",  height:"6ft 7in",  college:"None",            country:"USA",       hometown:"Tacoma, Washington",           draft_year:"2022", draft_pick:"24",        draft_team:"Milwaukee Bucks",        past_teams:[{team:"Milwaukee Bucks",dur:"2 seasons"}],                                                                                                     jazz_years:"1 season" },
  { name:"Trendon Watford",      position:"F", jersey:"2",  height:"6ft 8in",  college:"LSU",             country:"USA",       hometown:"Birmingham, Alabama",          draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Portland Trail Blazers",dur:"2 seasons"},{team:"Brooklyn Nets",dur:"1 season"},{team:"Washington Wizards",dur:"1 season"}],                jazz_years:"1 season" },
  { name:"Joel Embiid",          position:"C", jersey:"21", height:"7ft 0in",  college:"Kansas",          country:"Cameroon",  hometown:"Yaounde, Cameroon",            draft_year:"2014", draft_pick:"3",         draft_team:"Philadelphia 76ers",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Andre Drummond",       position:"C", jersey:"1",  height:"6ft 10in", college:"Connecticut",     country:"USA",       hometown:"Mount Vernon, New York",       draft_year:"2012", draft_pick:"9",         draft_team:"Detroit Pistons",        past_teams:[{team:"Detroit Pistons",dur:"8 seasons"},{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Los Angeles Lakers",dur:"1 season"},{team:"Brooklyn Nets",dur:"1 season"},{team:"Chicago Bulls",dur:"1 season"}], jazz_years:"1 season" },
  { name:"Adem Bona",            position:"C", jersey:"3",  height:"6ft 10in", college:"UCLA",            country:"Nigeria",   hometown:"Lagos, Nigeria",               draft_year:"2023", draft_pick:"41",        draft_team:"Orlando Magic",          past_teams:[{team:"Orlando Magic",dur:"1 season"}],                                                                                                         jazz_years:"1 season" },
  { name:"Dominick Barlow",      position:"C", jersey:"7",  height:"6ft 9in",  college:"None",            country:"USA",       hometown:"Brooklyn, New York",           draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"San Antonio Spurs",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Johni Broome",         position:"C", jersey:"3",  height:"6ft 10in", college:"Auburn",          country:"USA",       hometown:"West Palm Beach, Florida",     draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
];

const RAPTORS_TEAM = {
  name: "Toronto Raptors",
  city: "Toronto",
  conference: "East",
  division: "Atlantic",
  arena: "Scotiabank Arena",
  mascot: "The Raptor",
  colors: "Red, Black, Gold",
  championships: "1",
  lastTitle: "2019",
  abbreviation: "TOR",
  coach: "Jordi Fernandez",
  coachPrevTeam: { team: "Sacramento Kings", role: "Assistant Coach" },
  coachSince: "2024"
};

const RAPTORS_STARTING_LINEUP = { PG:"Immanuel Quickley", SG:"RJ Barrett", SF:"Brandon Ingram", PF:"Scottie Barnes", C:"Jakob Poeltl" };

const RAPTORS_ROSTER = [
  { name:"Immanuel Quickley",       position:"G", jersey:"5",  height:"6ft 3in",  college:"Kentucky",        country:"USA",       hometown:"Hoover, Alabama",              draft_year:"2020", draft_pick:"25",        draft_team:"New York Knicks",        past_teams:[{team:"New York Knicks",dur:"3 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Ja'Kobe Walter",          position:"G", jersey:"1",  height:"6ft 5in",  college:"Baylor",          country:"USA",       hometown:"Little Rock, Arkansas",        draft_year:"2024", draft_pick:"19",        draft_team:"Toronto Raptors",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Gradey Dick",             position:"G", jersey:"1",  height:"6ft 6in",  college:"Kansas",          country:"USA",       hometown:"Wichita, Kansas",              draft_year:"2023", draft_pick:"13",        draft_team:"Toronto Raptors",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jamal Shead",             position:"G", jersey:"3",  height:"6ft 1in",  college:"Houston",         country:"Canada",    hometown:"Brampton, Ontario, Canada",    draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Chucky Hepburn",          position:"G", jersey:"3",  height:"6ft 2in",  college:"Wisconsin",       country:"USA",       hometown:"Omaha, Nebraska",              draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Boston Celtics",dur:"1 season"}],                                                                                                      jazz_years:"1 season" },
  { name:"A.J. Lawson",             position:"G", jersey:"16", height:"6ft 7in",  college:"South Carolina",  country:"Canada",    hometown:"Pickering, Ontario, Canada",   draft_year:"2022", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Dallas Mavericks",dur:"1 season"}],                                                                                                    jazz_years:"1 season" },
  { name:"Scottie Barnes",          position:"F", jersey:"4",  height:"6ft 8in",  college:"Florida State",   country:"Canada",    hometown:"West Palm Beach, Florida",     draft_year:"2021", draft_pick:"4",         draft_team:"Toronto Raptors",        past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"RJ Barrett",              position:"F", jersey:"9",  height:"6ft 7in",  college:"Duke",            country:"Canada",    hometown:"Mississauga, Ontario, Canada", draft_year:"2019", draft_pick:"3",         draft_team:"New York Knicks",        past_teams:[{team:"New York Knicks",dur:"4 seasons"}],                                                                                                     jazz_years:"1 season" },
  { name:"Brandon Ingram",          position:"F", jersey:"14", height:"6ft 8in",  college:"Duke",            country:"USA",       hometown:"Kinston, North Carolina",      draft_year:"2016", draft_pick:"2",         draft_team:"Los Angeles Lakers",     past_teams:[{team:"Los Angeles Lakers",dur:"3 seasons"},{team:"New Orleans Pelicans",dur:"5 seasons"}],                                                   jazz_years:"1 season" },
  { name:"Jamison Battle",          position:"F", jersey:"21", height:"6ft 7in",  college:"Ohio State",      country:"USA",       hometown:"Manassas, Virginia",           draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"New York Knicks",dur:"1 season"}],                                                                                                      jazz_years:"1 season" },
  { name:"Jonathan Mogbo",          position:"F", jersey:"15", height:"6ft 8in",  college:"Connecticut",     country:"USA",       hometown:"Memphis, Tennessee",           draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Collin Murray-Boyles",    position:"F", jersey:"0",  height:"6ft 7in",  college:"South Carolina",  country:"USA",       hometown:"Charlotte, North Carolina",    draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Alijah Martin",           position:"F", jersey:"8",  height:"6ft 4in",  college:"Florida Atlantic",country:"USA",       hometown:"Gainesville, Florida",         draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Miami Heat",dur:"1 season"}],                                                                                                           jazz_years:"1 season" },
  { name:"Jakob Poeltl",            position:"C", jersey:"19", height:"7ft 1in",  college:"Utah",            country:"Austria",   hometown:"Vienna, Austria",              draft_year:"2016", draft_pick:"9",         draft_team:"Toronto Raptors",        past_teams:[{team:"San Antonio Spurs",dur:"5 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Sandro Mamukelashvili",   position:"C", jersey:"54", height:"6ft 11in", college:"Seton Hall",      country:"Georgia",   hometown:"Tbilisi, Georgia",             draft_year:"2021", draft_pick:"54",        draft_team:"Milwaukee Bucks",        past_teams:[{team:"Milwaukee Bucks",dur:"2 seasons"},{team:"San Antonio Spurs",dur:"1 season"},{team:"Indiana Pacers",dur:"1 season"}],                   jazz_years:"1 season" },
  { name:"Trayce Jackson-Davis",    position:"C", jersey:"32", height:"6ft 9in",  college:"Indiana",         country:"USA",       hometown:"Greenwood, Indiana",           draft_year:"2023", draft_pick:"57",        draft_team:"Golden State Warriors",  past_teams:[{team:"Golden State Warriors",dur:"1 season"}],                                                                                                jazz_years:"1 season" },
];

const WIZARDS_TEAM = {
  name: "Washington Wizards",
  city: "Washington",
  conference: "East",
  division: "Southeast",
  arena: "Capital One Arena",
  mascot: "G-Wiz",
  colors: "Navy, Red, White",
  championships: "1",
  lastTitle: "1978",
  abbreviation: "WAS",
  coach: "Brian Keefe",
  coachPrevTeam: { team: "Washington Wizards", role: "Interim Head Coach" },
  coachSince: "2024"
};

const WIZARDS_STARTING_LINEUP = { PG:"Trae Young", SG:"Bilal Coulibaly", SF:"Kyshawn George", PF:"Anthony Davis", C:"Alex Sarr" };

const WIZARDS_ROSTER = [
  { name:"Trae Young",            position:"G", jersey:"11", height:"6ft 1in",  college:"Oklahoma",        country:"USA",       hometown:"Lubbock, Texas",               draft_year:"2018", draft_pick:"5",         draft_team:"Dallas Mavericks",       past_teams:[{team:"Atlanta Hawks",dur:"6 seasons"}],                                                                                                       jazz_years:"1 season" },
  { name:"Bub Carrington",        position:"G", jersey:"8",  height:"6ft 4in",  college:"Pittsburgh",      country:"USA",       hometown:"New York, New York",           draft_year:"2024", draft_pick:"15",        draft_team:"Washington Wizards",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tre Johnson",           position:"G", jersey:"3",  height:"6ft 5in",  college:"Texas",           country:"USA",       hometown:"Pearland, Texas",              draft_year:"2025", draft_pick:"6",         draft_team:"Washington Wizards",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Jaden Hardy",           position:"G", jersey:"6",  height:"6ft 4in",  college:"None",            country:"USA",       hometown:"Las Vegas, Nevada",            draft_year:"2022", draft_pick:"37",        draft_team:"Dallas Mavericks",       past_teams:[{team:"Dallas Mavericks",dur:"2 seasons"}],                                                                                                    jazz_years:"1 season" },
  { name:"Sharife Cooper",        position:"G", jersey:"3",  height:"6ft 1in",  college:"Auburn",          country:"USA",       hometown:"Stonecrest, Georgia",          draft_year:"2021", draft_pick:"48",        draft_team:"Cleveland Cavaliers",    past_teams:[{team:"Cleveland Cavaliers",dur:"1 season"},{team:"Sacramento Kings",dur:"1 season"}],                                                          jazz_years:"1 season" },
  { name:"D'Angelo Russell",      position:"G", jersey:"0",  height:"6ft 4in",  college:"Ohio State",      country:"USA",       hometown:"Louisville, Kentucky",         draft_year:"2015", draft_pick:"2",         draft_team:"Los Angeles Lakers",     past_teams:[{team:"Los Angeles Lakers",dur:"2 seasons"},{team:"Brooklyn Nets",dur:"2 seasons"},{team:"Golden State Warriors",dur:"1 season"},{team:"Minnesota Timberwolves",dur:"3 seasons"},{team:"Los Angeles Lakers",dur:"2 seasons"}], jazz_years:"1 season" },
  { name:"Bilal Coulibaly",       position:"F", jersey:"0",  height:"6ft 7in",  college:"None",            country:"France",    hometown:"Fontenay-sous-Bois, France",   draft_year:"2023", draft_pick:"7",         draft_team:"Washington Wizards",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Kyshawn George",        position:"F", jersey:"18", height:"6ft 7in",  college:"Miami",           country:"Switzerland",hometown:"Geneva, Switzerland",         draft_year:"2024", draft_pick:"19",        draft_team:"Washington Wizards",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Justin Champagnie",     position:"F", jersey:"1",  height:"6ft 7in",  college:"Pittsburgh",      country:"USA",       hometown:"Brooklyn, New York",           draft_year:"2021", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Toronto Raptors",dur:"2 seasons"},{team:"San Antonio Spurs",dur:"1 season"},{team:"Chicago Bulls",dur:"1 season"}],                       jazz_years:"1 season" },
  { name:"Jamir Watkins",         position:"F", jersey:"10", height:"6ft 6in",  college:"Florida State",   country:"USA",       hometown:"Charlotte, North Carolina",    draft_year:"2024", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Cam Whitmore",          position:"F", jersey:"4",  height:"6ft 7in",  college:"Villanova",       country:"USA",       hometown:"Bear, Delaware",               draft_year:"2023", draft_pick:"20",        draft_team:"Houston Rockets",        past_teams:[{team:"Houston Rockets",dur:"1 season"}],                                                                                                      jazz_years:"1 season" },
  { name:"Will Riley",            position:"F", jersey:"2",  height:"6ft 8in",  college:"Illinois",        country:"Canada",    hometown:"Windsor, Ontario, Canada",     draft_year:"2025", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Leaky Black",           position:"F", jersey:"1",  height:"6ft 8in",  college:"North Carolina",  country:"USA",       hometown:"Jonesboro, Georgia",           draft_year:"2023", draft_pick:"Undrafted", draft_team:"Undrafted",              past_teams:[{team:"Memphis Grizzlies",dur:"1 season"}],                                                                                                    jazz_years:"1 season" },
  { name:"Anthony Davis",         position:"C", jersey:"3",  height:"6ft 10in", college:"Kentucky",        country:"USA",       hometown:"Chicago, Illinois",            draft_year:"2012", draft_pick:"1",         draft_team:"New Orleans Hornets",    past_teams:[{team:"New Orleans Pelicans",dur:"7 seasons"},{team:"Los Angeles Lakers",dur:"5 seasons"}],                                                      jazz_years:"1 season" },
  { name:"Alex Sarr",             position:"C", jersey:"20", height:"7ft 1in",  college:"None",            country:"France",    hometown:"Bordeaux, France",             draft_year:"2024", draft_pick:"2",         draft_team:"Washington Wizards",     past_teams:"None",                                                                                                                                              jazz_years:"1 season" },
  { name:"Tristan Vukčević",      position:"C", jersey:"4",  height:"7ft 0in",  college:"None",            country:"Serbia",    hometown:"Novi Sad, Serbia",             draft_year:"2023", draft_pick:"27",        draft_team:"Portland Trail Blazers", past_teams:[{team:"Portland Trail Blazers",dur:"1 season"}],                                                                                                jazz_years:"1 season" },
];






























// TEST_ROSTER pulls from the live ROSTER array so they stay in sync
// (defined as a getter so it always reflects ROSTER at call time)
const TEST_ROSTER = new Proxy([], {
  get(_, prop) {
    if (prop === 'length') return ROSTER.length;
    if (prop === Symbol.iterator) return () => ROSTER[Symbol.iterator]();
    if (!isNaN(prop)) return ROSTER[prop] ? {
      name:       ROSTER[prop].name,
      team:       "Utah Jazz",
      position:   getPosLabel(ROSTER[prop]),
      jersey:     ROSTER[prop].jersey,
      height:     ROSTER[prop].height,
      college:    ROSTER[prop].college,
      country:    ROSTER[prop].country,
      hometown:   ROSTER[prop].hometown,
      past_teams: ROSTER[prop].past_teams,
      draft_year: ROSTER[prop].draft_year,
      draft_pick: ROSTER[prop].draft_pick,
      draft_team: ROSTER[prop].draft_team,
    } : undefined;
    // support .map, .forEach, etc.
    if (typeof ROSTER[prop] === 'function') {
      return (...args) => {
        const mapped = ROSTER.map(p => ({
          name:       p.name,
          team:       "Utah Jazz",
          position:   getPosLabel(p),
          jersey:     p.jersey,
          height:     p.height,
          college:    p.college,
          country:    p.country,
          hometown:   p.hometown,
          past_teams: p.past_teams,
          past_teams: p.past_teams,
          draft_year: p.draft_year,
          draft_pick: p.draft_pick,
          draft_team: p.draft_team,
        }));
        return mapped[prop](...args);
      };
    }
    return ROSTER[prop];
  }
});

