// ============================================================
// ================ LEAGUE-WIDE DATASETS ======================
// ============================================================

// All 30 NBA teams with the fields needed for League Knowledge modes
const NBA_TEAMS = [
  { name:"Atlanta Hawks",          city:"Atlanta",        conference:"East", division:"Southeast", abbreviation:"ATL", coach:"Quin Snyder",        coachPrevTeam:{ team:"Utah Jazz", role:"Head Coach" },                     coachSince:"2023", championships:"1",  lastTitle:"1958" },
  { name:"Boston Celtics",         city:"Boston",         conference:"East", division:"Atlantic",  abbreviation:"BOS", coach:"Joe Mazzulla",        coachPrevTeam:{ team:"Boston Celtics", role:"Interim Head Coach" },        coachSince:"2022", championships:"18", lastTitle:"2024" },
  { name:"Brooklyn Nets",          city:"Brooklyn",       conference:"East", division:"Atlantic",  abbreviation:"BKN", coach:"Jordi Fernandez",     coachPrevTeam:{ team:"Sacramento Kings", role:"Assistant Coach" },         coachSince:"2024", championships:"0",  lastTitle:"N/A" },
  { name:"Charlotte Hornets",      city:"Charlotte",      conference:"East", division:"Southeast", abbreviation:"CHA", coach:"Charles Lee",         coachPrevTeam:{ team:"Boston Celtics", role:"Assistant Coach" },           coachSince:"2024", championships:"0",  lastTitle:"N/A" },
  { name:"Chicago Bulls",          city:"Chicago",        conference:"East", division:"Central",   abbreviation:"CHI", coach:"Billy Donovan",       coachPrevTeam:{ team:"Oklahoma City Thunder", role:"Head Coach" },        coachSince:"2020", championships:"6",  lastTitle:"1998" },
  { name:"Cleveland Cavaliers",    city:"Cleveland",      conference:"East", division:"Central",   abbreviation:"CLE", coach:"Kenny Atkinson",      coachPrevTeam:{ team:"Golden State Warriors", role:"Assistant Coach" },    coachSince:"2023", championships:"1",  lastTitle:"2016" },
  { name:"Dallas Mavericks",       city:"Dallas",         conference:"West", division:"Southwest", abbreviation:"DAL", coach:"Jason Kidd",          coachPrevTeam:{ team:"Los Angeles Lakers", role:"Head Coach" },            coachSince:"2021", championships:"1",  lastTitle:"2011" },
  { name:"Denver Nuggets",         city:"Denver",         conference:"West", division:"Northwest", abbreviation:"DEN", coach:"David Adelman",       coachPrevTeam:{ team:"San Antonio Spurs", role:"Assistant Coach" },        coachSince:"2024", championships:"1",  lastTitle:"2023" },
  { name:"Detroit Pistons",        city:"Detroit",        conference:"East", division:"Central",   abbreviation:"DET", coach:"JB Bickerstaff",      coachPrevTeam:{ team:"Cleveland Cavaliers", role:"Head Coach" },          coachSince:"2023", championships:"3",  lastTitle:"2004" },
  { name:"Golden State Warriors",  city:"San Francisco",  conference:"West", division:"Pacific",   abbreviation:"GSW", coach:"Steve Kerr",          coachPrevTeam:{ team:"None", role:"First HC job" },                      coachSince:"2014", championships:"4",  lastTitle:"2022" },
  { name:"Houston Rockets",        city:"Houston",        conference:"West", division:"Southwest", abbreviation:"HOU", coach:"Ime Udoka",           coachPrevTeam:{ team:"Boston Celtics", role:"Head Coach" },               coachSince:"2022", championships:"2",  lastTitle:"1995" },
  { name:"Indiana Pacers",         city:"Indianapolis",   conference:"East", division:"Central",   abbreviation:"IND", coach:"Rick Carlisle",       coachPrevTeam:{ team:"Dallas Mavericks", role:"Head Coach" },             coachSince:"2021", championships:"0",  lastTitle:"N/A" },
  { name:"LA Clippers",            city:"Los Angeles",    conference:"West", division:"Pacific",   abbreviation:"LAC", coach:"Tyronn Lue",          coachPrevTeam:{ team:"Cleveland Cavaliers", role:"Head Coach" },          coachSince:"2020", championships:"0",  lastTitle:"N/A" },
  { name:"Los Angeles Lakers",     city:"Los Angeles",    conference:"West", division:"Pacific",   abbreviation:"LAL", coach:"JJ Redick",           coachPrevTeam:{ team:"None", role:"First HC job" },                      coachSince:"2024", championships:"17", lastTitle:"2020" },
  { name:"Memphis Grizzlies",      city:"Memphis",        conference:"West", division:"Southwest", abbreviation:"MEM", coach:"Taylor Jenkins",      coachPrevTeam:{ team:"Atlanta Hawks", role:"Assistant Coach" },           coachSince:"2019", championships:"0",  lastTitle:"N/A" },
  { name:"Miami Heat",             city:"Miami",          conference:"East", division:"Southeast", abbreviation:"MIA", coach:"Erik Spoelstra",      coachPrevTeam:{ team:"Miami Heat", role:"Assistant Coach" },              coachSince:"2008", championships:"3",  lastTitle:"2013" },
  { name:"Milwaukee Bucks",        city:"Milwaukee",      conference:"East", division:"Central",   abbreviation:"MIL", coach:"Doc Rivers",          coachPrevTeam:{ team:"Philadelphia 76ers", role:"Head Coach" },           coachSince:"2023", championships:"2",  lastTitle:"2021" },
  { name:"Minnesota Timberwolves", city:"Minneapolis",    conference:"West", division:"Northwest", abbreviation:"MIN", coach:"Chris Finch",         coachPrevTeam:{ team:"Houston Rockets", role:"Assistant Coach" },         coachSince:"2021", championships:"0",  lastTitle:"N/A" },
  { name:"New Orleans Pelicans",   city:"New Orleans",    conference:"West", division:"Southwest", abbreviation:"NOP", coach:"Willie Green",        coachPrevTeam:{ team:"Golden State Warriors", role:"Assistant Coach" },   coachSince:"2021", championships:"0",  lastTitle:"N/A" },
  { name:"New York Knicks",        city:"New York",       conference:"East", division:"Atlantic",  abbreviation:"NYK", coach:"Tom Thibodeau",       coachPrevTeam:{ team:"Minnesota Timberwolves", role:"Head Coach" },       coachSince:"2020", championships:"2",  lastTitle:"1973" },
  { name:"Oklahoma City Thunder",  city:"Oklahoma City",  conference:"West", division:"Northwest", abbreviation:"OKC", coach:"Mark Daigneault",     coachPrevTeam:{ team:"OKC Blue (G League)", role:"Head Coach" },         coachSince:"2020", championships:"1",  lastTitle:"1979" },
  { name:"Orlando Magic",          city:"Orlando",        conference:"East", division:"Southeast", abbreviation:"ORL", coach:"Jamahl Mosley",       coachPrevTeam:{ team:"Dallas Mavericks", role:"Assistant Coach" },        coachSince:"2021", championships:"0",  lastTitle:"N/A" },
  { name:"Philadelphia 76ers",     city:"Philadelphia",   conference:"East", division:"Atlantic",  abbreviation:"PHI", coach:"Nick Nurse",          coachPrevTeam:{ team:"Toronto Raptors", role:"Head Coach" },             coachSince:"2023", championships:"3",  lastTitle:"1983" },
  { name:"Phoenix Suns",           city:"Phoenix",        conference:"West", division:"Pacific",   abbreviation:"PHX", coach:"Mike Budenholzer",    coachPrevTeam:{ team:"Milwaukee Bucks", role:"Head Coach" },             coachSince:"2023", championships:"0",  lastTitle:"N/A" },
  { name:"Portland Trail Blazers", city:"Portland",       conference:"West", division:"Northwest", abbreviation:"POR", coach:"Chauncey Billups",    coachPrevTeam:{ team:"LA Clippers", role:"Assistant Coach" },            coachSince:"2021", championships:"1",  lastTitle:"1977" },
  { name:"Sacramento Kings",       city:"Sacramento",     conference:"West", division:"Pacific",   abbreviation:"SAC", coach:"Doug Christie",       coachPrevTeam:{ team:"Sacramento Kings", role:"Interim Head Coach" },    coachSince:"2025", championships:"1",  lastTitle:"1951" },
  { name:"San Antonio Spurs",      city:"San Antonio",    conference:"West", division:"Southwest", abbreviation:"SAS", coach:"Mitch Johnson",       coachPrevTeam:{ team:"San Antonio Spurs", role:"Interim Head Coach" },   coachSince:"2024", championships:"5",  lastTitle:"2014" },
  { name:"Toronto Raptors",        city:"Toronto",        conference:"East", division:"Atlantic",  abbreviation:"TOR", coach:"Jordi Fernandez",     coachPrevTeam:{ team:"Sacramento Kings", role:"Assistant Coach" },        coachSince:"2024", championships:"1",  lastTitle:"2019" },
  { name:"Utah Jazz",              city:"Salt Lake City", conference:"West", division:"Northwest", abbreviation:"UTA", coach:"Will Hardy",          coachPrevTeam:{ team:"Boston Celtics", role:"Assistant Coach" },          coachSince:"2022", championships:"0",  lastTitle:"N/A" },
  { name:"Washington Wizards",     city:"Washington",     conference:"East", division:"Southeast", abbreviation:"WAS", coach:"Brian Keefe",         coachPrevTeam:{ team:"Washington Wizards", role:"Interim Head Coach" },  coachSince:"2024", championships:"1",  lastTitle:"1978" },
];


// League-wide player pool for League Knowledge modes
// Sourced from the Jazz roster + representative players from all 30 teams
const NBA_PLAYERS = [
  // Utah Jazz (from ROSTER)
  ...ROSTER.map(p => ({ name:p.name, team:"Utah Jazz", jersey:p.jersey, height:p.height, college:p.college, country:p.country, position:getPosLabel(p) })),
  // Atlanta Hawks
  { name:"Trae Young",           team:"Atlanta Hawks",          jersey:"11", height:'6\'1"',  college:"Oklahoma",       country:"USA",          position:"Guard" },
  { name:"Dejounte Murray",      team:"Atlanta Hawks",          jersey:"5",  height:'6\'5"',  college:"None",           country:"USA",          position:"Guard" },
  { name:"Jalen Johnson",        team:"Atlanta Hawks",          jersey:"1",  height:'6\'9"',  college:"Duke",           country:"USA",          position:"Forward" },
  // Boston Celtics
  { name:"Jayson Tatum",         team:"Boston Celtics",         jersey:"0",  height:'6\'8"',  college:"Duke",           country:"USA",          position:"Forward" },
  { name:"Jaylen Brown",         team:"Boston Celtics",         jersey:"7",  height:'6\'6"',  college:"California",     country:"USA",          position:"Guard / Forward" },
  { name:"Jrue Holiday",         team:"Boston Celtics",         jersey:"4",  height:'6\'4"',  college:"UCLA",           country:"USA",          position:"Guard" },
  // Brooklyn Nets
  { name:"Cam Thomas",           team:"Brooklyn Nets",          jersey:"24", height:'6\'4"',  college:"LSU",            country:"USA",          position:"Guard" },
  { name:"Ben Simmons",          team:"Brooklyn Nets",          jersey:"10", height:'6\'10"', college:"LSU",            country:"Australia",    position:"Guard / Forward" },
  // Charlotte Hornets
  { name:"LaMelo Ball",          team:"Charlotte Hornets",      jersey:"2",  height:'6\'7"',  college:"None",           country:"USA",          position:"Guard" },
  { name:"Brandon Miller",       team:"Charlotte Hornets",      jersey:"24", height:'6\'9"',  college:"Alabama",        country:"USA",          position:"Forward" },
  // Chicago Bulls
  { name:"Zach LaVine",          team:"Chicago Bulls",          jersey:"8",  height:'6\'5"',  college:"UCLA",           country:"USA",          position:"Guard" },
  { name:"Nikola Vucevic",       team:"Chicago Bulls",          jersey:"9",  height:'7\'0"',  college:"USC",            country:"Montenegro",   position:"Center" },
  // Cleveland Cavaliers
  { name:"Donovan Mitchell",     team:"Cleveland Cavaliers",    jersey:"45", height:'6\'3"',  college:"Louisville",     country:"USA",          position:"Guard" },
  { name:"Evan Mobley",          team:"Cleveland Cavaliers",    jersey:"4",  height:'7\'0"',  college:"USC",            country:"USA",          position:"Center" },
  { name:"Darius Garland",       team:"Cleveland Cavaliers",    jersey:"10", height:'6\'1"',  college:"Vanderbilt",     country:"USA",          position:"Guard" },
  // Dallas Mavericks
  { name:"Luka Dončić",          team:"Dallas Mavericks",       jersey:"77", height:'6\'7"',  college:"None",           country:"Slovenia",     position:"Guard / Forward" },
  { name:"Kyrie Irving",         team:"Dallas Mavericks",       jersey:"11", height:'6\'2"',  college:"Duke",           country:"USA",          position:"Guard" },
  // Denver Nuggets
  { name:"Nikola Jokić",         team:"Denver Nuggets",         jersey:"15", height:'6\'11"', college:"None",           country:"Serbia",       position:"Center" },
  { name:"Jamal Murray",         team:"Denver Nuggets",         jersey:"27", height:'6\'5"',  college:"Kentucky",       country:"Canada",       position:"Guard" },
  { name:"Michael Porter Jr.",   team:"Denver Nuggets",         jersey:"1",  height:'6\'10"', college:"Missouri",       country:"USA",          position:"Forward" },
  // Detroit Pistons
  { name:"Cade Cunningham",      team:"Detroit Pistons",        jersey:"2",  height:'6\'6"',  college:"Oklahoma State", country:"USA",          position:"Guard / Forward" },
  { name:"Jalen Duren",          team:"Detroit Pistons",        jersey:"0",  height:'6\'11"', college:"Memphis",        country:"USA",          position:"Center" },
  // Golden State Warriors
  { name:"Stephen Curry",        team:"Golden State Warriors",  jersey:"30", height:'6\'2"',  college:"Davidson",       country:"USA",          position:"Guard" },
  { name:"Draymond Green",       team:"Golden State Warriors",  jersey:"23", height:'6\'6"',  college:"Michigan State", country:"USA",          position:"Forward" },
  { name:"Andrew Wiggins",       team:"Golden State Warriors",  jersey:"22", height:'6\'7"',  college:"Kansas",         country:"Canada",       position:"Forward" },
  // Houston Rockets
  { name:"Alperen Şengün",       team:"Houston Rockets",        jersey:"28", height:'6\'10"', college:"None",           country:"Turkey",       position:"Center" },
  { name:"Jalen Green",          team:"Houston Rockets",        jersey:"4",  height:'6\'5"',  college:"None",           country:"USA",          position:"Guard" },
  { name:"Fred VanVleet",        team:"Houston Rockets",        jersey:"5",  height:'6\'1"',  college:"Wichita State",  country:"USA",          position:"Guard" },
  // Indiana Pacers
  { name:"Tyrese Haliburton",    team:"Indiana Pacers",         jersey:"0",  height:'6\'5"',  college:"Iowa State",     country:"USA",          position:"Guard" },
  { name:"Pascal Siakam",        team:"Indiana Pacers",         jersey:"43", height:'6\'9"',  college:"None",           country:"Cameroon",     position:"Forward" },
  // LA Clippers
  { name:"Kawhi Leonard",        team:"LA Clippers",            jersey:"2",  height:'6\'7"',  college:"San Diego State",country:"USA",          position:"Forward" },
  { name:"James Harden",         team:"LA Clippers",            jersey:"1",  height:'6\'5"',  college:"Arizona State",  country:"USA",          position:"Guard" },
  // Los Angeles Lakers
  { name:"LeBron James",         team:"Los Angeles Lakers",     jersey:"23", height:'6\'9"',  college:"None",           country:"USA",          position:"Forward" },
  { name:"Anthony Davis",        team:"Los Angeles Lakers",     jersey:"3",  height:'6\'10"', college:"Kentucky",       country:"USA",          position:"Center / Forward" },
  // Memphis Grizzlies
  { name:"Ja Morant",            team:"Memphis Grizzlies",      jersey:"12", height:'6\'3"',  college:"Murray State",   country:"USA",          position:"Guard" },
  { name:"Desmond Bane",         team:"Memphis Grizzlies",      jersey:"22", height:'6\'5"',  college:"TCU",            country:"USA",          position:"Guard / Forward" },
  // Miami Heat
  { name:"Bam Adebayo",          team:"Miami Heat",             jersey:"13", height:'6\'9"',  college:"Kentucky",       country:"USA",          position:"Center" },
  { name:"Tyler Herro",          team:"Miami Heat",             jersey:"14", height:'6\'5"',  college:"Kentucky",       country:"USA",          position:"Guard" },
  // Milwaukee Bucks
  { name:"Giannis Antetokounmpo",team:"Milwaukee Bucks",        jersey:"34", height:'6\'11"', college:"None",           country:"Greece",       position:"Forward" },
  { name:"Damian Lillard",       team:"Milwaukee Bucks",        jersey:"0",  height:'6\'2"',  college:"Weber State",    country:"USA",          position:"Guard" },
  // Minnesota Timberwolves
  { name:"Anthony Edwards",      team:"Minnesota Timberwolves", jersey:"5",  height:'6\'4"',  college:"Georgia",        country:"USA",          position:"Guard" },
  { name:"Karl-Anthony Towns",   team:"Minnesota Timberwolves", jersey:"32", height:'7\'0"',  college:"Kentucky",       country:"Dominican Republic", position:"Center" },
  { name:"Rudy Gobert",          team:"Minnesota Timberwolves", jersey:"27", height:'7\'1"',  college:"None",           country:"France",       position:"Center" },
  // New Orleans Pelicans
  { name:"Zion Williamson",      team:"New Orleans Pelicans",   jersey:"1",  height:'6\'6"',  college:"Duke",           country:"USA",          position:"Forward" },
  { name:"Brandon Ingram",       team:"New Orleans Pelicans",   jersey:"14", height:'6\'7"',  college:"Duke",           country:"USA",          position:"Forward" },
  // New York Knicks
  { name:"Jalen Brunson",        team:"New York Knicks",        jersey:"11", height:'6\'1"',  college:"Villanova",      country:"USA",          position:"Guard" },
  { name:"Julius Randle",        team:"New York Knicks",        jersey:"30", height:'6\'8"',  college:"Kentucky",       country:"USA",          position:"Forward" },
  // Oklahoma City Thunder
  { name:"Shai Gilgeous-Alexander", team:"Oklahoma City Thunder", jersey:"2", height:'6\'6"', college:"Kentucky",      country:"Canada",       position:"Guard" },
  { name:"Chet Holmgren",        team:"Oklahoma City Thunder",  jersey:"7",  height:'7\'0"',  college:"Gonzaga",        country:"USA",          position:"Center / Forward" },
  { name:"Jalen Williams",       team:"Oklahoma City Thunder",  jersey:"8",  height:'6\'5"',  college:"Santa Clara",    country:"USA",          position:"Guard / Forward" },
  // Orlando Magic
  { name:"Paolo Banchero",       team:"Orlando Magic",          jersey:"5",  height:'6\'10"', college:"Duke",           country:"USA",          position:"Forward" },
  { name:"Franz Wagner",         team:"Orlando Magic",          jersey:"22", height:'6\'9"',  college:"Michigan",       country:"Germany",      position:"Forward" },
  // Philadelphia 76ers
  { name:"Joel Embiid",          team:"Philadelphia 76ers",     jersey:"21", height:'7\'0"',  college:"Kansas",         country:"Cameroon",     position:"Center" },
  { name:"Tyrese Maxey",         team:"Philadelphia 76ers",     jersey:"0",  height:'6\'2"',  college:"Kentucky",       country:"USA",          position:"Guard" },
  // Phoenix Suns
  { name:"Kevin Durant",         team:"Phoenix Suns",           jersey:"35", height:'6\'10"', college:"Texas",          country:"USA",          position:"Forward" },
  { name:"Devin Booker",         team:"Phoenix Suns",           jersey:"1",  height:'6\'5"',  college:"Kentucky",       country:"USA",          position:"Guard" },
  // Portland Trail Blazers
  { name:"Scoot Henderson",      team:"Portland Trail Blazers", jersey:"0",  height:'6\'2"',  college:"None",           country:"USA",          position:"Guard" },
  { name:"Anfernee Simons",      team:"Portland Trail Blazers", jersey:"1",  height:'6\'3"',  college:"None",           country:"USA",          position:"Guard" },
  // Sacramento Kings
  { name:"De'Aaron Fox",         team:"Sacramento Kings",       jersey:"5",  height:'6\'3"',  college:"Kentucky",       country:"USA",          position:"Guard" },
  { name:"Domantas Sabonis",     team:"Sacramento Kings",       jersey:"10", height:'6\'11"', college:"Gonzaga",        country:"Lithuania",    position:"Center" },
  // San Antonio Spurs
  { name:"Victor Wembanyama",    team:"San Antonio Spurs",      jersey:"1",  height:'7\'4"',  college:"None",           country:"France",       position:"Center / Forward" },
  { name:"Devin Vassell",        team:"San Antonio Spurs",      jersey:"24", height:'6\'6"',  college:"Florida State",  country:"USA",          position:"Guard / Forward" },
  // Toronto Raptors
  { name:"Scottie Barnes",       team:"Toronto Raptors",        jersey:"4",  height:'6\'8"',  college:"Florida State",  country:"Canada",       position:"Forward" },
  { name:"RJ Barrett",           team:"Toronto Raptors",        jersey:"9",  height:'6\'7"',  college:"Duke",           country:"Canada",       position:"Guard / Forward" },
  // Washington Wizards
  { name:"Kyle Kuzma",           team:"Washington Wizards",     jersey:"33", height:'6\'9"',  college:"Utah",           country:"USA",          position:"Forward" },
  { name:"Bilal Coulibaly",      team:"Washington Wizards",     jersey:"0",  height:'6\'7"',  college:"None",           country:"France",       position:"Forward" },
];

// -- Card factory --
function makeCard(front, back, hint) {
  return { front: String(front), back: String(back), hint: hint ? String(hint) : null };
}

// -- Player deck builders (filter out blank/undefined answers) --
function buildPlayerToTeamDeck(roster)     { return roster.filter(p => p.team).map(p => makeCard(p.name, p.team,       'Which team does this player play for?')); }
function buildPlayerToPositionDeck(roster) { return roster.filter(p => p.position).map(p => makeCard(p.name, getPosLabel(p), 'What position does this player play?')); }
function buildPlayerToJerseyDeck(roster)   { return roster.filter(p => p.jersey).map(p => makeCard(p.name, '#' + p.jersey, "What is this player's jersey number?")); }
function buildPlayerToHeightDeck(roster)   { return roster.filter(p => p.height).map(p => makeCard(p.name, p.height,   "How tall is this player?")); }
function buildPlayerToCollegeDeck(roster)  { return roster.filter(p => p.college).map(p => makeCard(p.name, p.college, "Where did this player go to college?")); }
function buildPlayerToCountryDeck(roster)   { return roster.filter(p => p.country).map(p => makeCard(p.name, p.country,     "What country is this player from?")); }
function buildPlayerToCountryHometownDeck(roster) {
  return roster.filter(p => p.country || p.hometown).map(p => {
    const answer = '<div class="back-conf-block">' +
      '<span class="back-conf-label">Country</span>' +
      '<span class="back-conf-val">' + (p.country || '—') + '</span>' +
      '<span class="back-conf-label">Hometown</span>' +
      '<span class="back-conf-val" style="font-size:17px;">' + (p.hometown || '—') + '</span>' +
      '</div>';
    return makeCard(p.name, answer, "What country is this player from and where did they grow up?");
  });
}
function buildPlayerToPastTeamsDeck(roster) {
  return roster.filter(p => p && p.name).map(p => {
    const hasPastTeams = Array.isArray(p.past_teams) && p.past_teams.length > 0;
    const answer = hasPastTeams
      ? '<div class="back-career-block">' + p.past_teams.map(t =>
          '<div class="back-career-entry">' +
            '<span class="back-career-team">' + t.team + '</span>' +
            '<span class="back-career-dur">' + t.dur + '</span>' +
          '</div>'
        ).join('') + '</div>'
      : '<div class="back-career-block">' +
          '<div class="back-career-entry">' +
            '<span class="back-career-team">Utah Jazz</span>' +
            '<span class="back-career-dur">No previous NBA teams</span>' +
          '</div>' +
        '</div>';
    return makeCard(p.name, answer, "What previous NBA teams has this player been on?");
  });
}
function _rosterRowHTML(p, starterPos) {
  const pos = starterPos && starterPos[p.name];
  const isStarter = !!pos;
  const fullPos = getPosLabel(p);
  const meta = fullPos;
  const nameStyle = isStarter ? 'font-size:14px;font-weight:600;color:#ddc8ff;' : 'font-size:14px;font-weight:500;';
  return '<div class="back-career-entry">' +
    '<span class="back-career-team" style="' + nameStyle + '">' + p.name + '</span>' +
    '<span class="back-career-dur" style="font-size:10.5px;">' + meta + '</span>' +
    '</div>';
}
function _buildRosterHTML(teamName, rosterArr) {
  const starterPos = {};
  Object.entries(_activeLineup).forEach(([slot, name]) => { starterPos[name] = slot; });
  const starters = rosterArr.filter(p => starterPos[p.name]);
  const bench    = rosterArr.filter(p => !starterPos[p.name])
                            .slice().sort((a,b) => a.name.localeCompare(b.name));
  const starterLabel = '<span class="back-career-dur" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:2px;">Starters</span>';
  const benchLabel   = '<span class="back-career-dur" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-top:8px;margin-bottom:2px;">Bench</span>';
  const rows = starterLabel + starters.map(p => _rosterRowHTML(p, starterPos)).join('') +
               benchLabel   + bench.map(p => _rosterRowHTML(p, starterPos)).join('');
  return '<div class="back-career-block" style="gap:4px;">' + rows + '</div>';
}
const JAZZ_ROTATION = {
  starters: [
    { pos:'PG/SG', name:'Keyonte George' },
    { pos:'SG/SF', name:'Ace Bailey' },
    { pos:'SF/PF', name:'Lauri Markkanen' },
    { pos:'PF/C',  name:'Jaren Jackson Jr.' },
    { pos:'C',     name:'Walker Kessler' },
  ],
  bench: [
    { pos:'PG',    name:'Isaiah Collier' },
    { pos:'SG/SF', name:'Brice Sensabaugh' },
    { pos:'SF/SG', name:'Svi Mykhailiuk' },
    { pos:'PF/C',  name:'Kyle Filipowski' },
    { pos:'C',     name:'Jusuf Nurkic' },
  ]
};

function buildTeamToRosterDeck(team, roster) {
  // Use TEAM_ROTATIONS for any team that has rotation data defined
  const rotationMap = {
    'Utah Jazz':            typeof JAZZ_ROTATION    !== 'undefined' ? JAZZ_ROTATION    : null,
    'Dallas Mavericks':     typeof MAVS_ROTATION    !== 'undefined' ? MAVS_ROTATION    : null,
    'Denver Nuggets':       typeof NUGGETS_ROTATION !== 'undefined' ? NUGGETS_ROTATION : null,
    'Golden State Warriors':typeof GSW_ROTATION     !== 'undefined' ? GSW_ROTATION     : null,
  };
  const rotation = rotationMap[team.name];
  if (rotation) {
    const makeRows = (players) => players.map(p =>
      '<div class="top10-row">' +
        '<span class="top10-pos">' + p.pos + '</span>' +
        '<span class="top10-player">' + p.name + '</span>' +
      '</div>'
    ).join('');
    const answer =
      '<div class="top10-list">' +
        '<div class="top10-section-label">Starters</div>' +
        makeRows(rotation.starters) +
        '<div class="top10-section-label">Bench</div>' +
        makeRows(rotation.bench) +
      '</div>';
    return [makeCard(team.name, answer, '__LINEUP__')];
  }
  // Fallback for teams without rotation data
  const answer = _buildRosterHTML(team.name, Array.from(roster));
  return [makeCard(team.name, answer, "Who are the current players on this team's roster?")];
}
const TEAM_COACHING_STAFF = {
  "Utah Jazz": {
    head: "Will Hardy",
    assistants: ["Chad Forcier", "Scott Morrison", "Sean Sheldon", "Jason Terry"]
  },
  "Dallas Mavericks": {
    head: "Jason Kidd",
    assistants: ["Jared Dudley", "Sean Sweeney", "Jamahl Mosley", "Igor Kokoskov"]
  },
  "Denver Nuggets": {
    head: "David Adelman",
    assistants: ["Ognjen Stojakovic", "Micah Nori", "Ryan Saunders", "Jeff Bzdelik"]
  },
  "Houston Rockets": {
    head: "Ime Udoka",
    assistants: ["John Lucas", "Rick Higgins", "Micah Nori", "Keith Smart"]
  },
  "Golden State Warriors": {
    head: "Steve Kerr",
    assistants: ["Kenny Atkinson", "Jama Mahlalela", "Ron Adams", "Dejan Milojevic"]
  },
  "LA Clippers": {
    head: "Tyronn Lue",
    assistants: ["Chauncey Billups", "Brian Shaw", "Mike Penberthy", "Rex Kalamian"]
  },
  "Los Angeles Lakers": {
    head: "JJ Redick",
    assistants: ["Scott Brooks", "Nate McMillan", "Jordan Ott", "Phil Handy"]
  },
  "Memphis Grizzlies": {
    head: "Taylor Jenkins",
    assistants: ["Rex Walters", "Miles Simon", "Brad Jones", "Niele Ivey"]
  },
  "Minnesota Timberwolves": {
    head: "Chris Finch",
    assistants: ["Pablo Prigioni", "Micah Nori", "Darius Songaila", "Kris Benson"]
  },
  "New Orleans Pelicans": {
    head: "Willie Green",
    assistants: ["Jarron Collins", "Teresa Weatherspoon", "Fred Vinson", "Jamelle McMillan"]
  },
  "Oklahoma City Thunder": {
    head: "Mark Daigneault",
    assistants: ["Chip Engelland", "Dave Bliss", "Mike Wilks", "Mitch Johnson"]
  },
  "Phoenix Suns": {
    head: "Mike Budenholzer",
    assistants: ["Kevin Young", "Nate Tibbetts", "David Fizdale", "Roy Rogers"]
  },
  "Portland Trail Blazers": {
    head: "Chauncey Billups",
    assistants: ["David Vanterpool", "Scott Roth", "Roy Rogers", "Nate Tibbetts"]
  },
  "Sacramento Kings": {
    head: "Doug Christie",
    assistants: ["Jordi Fernandez", "Nate Tibbetts", "Rex Kalamian", "Bobby Jackson"]
  },
  "San Antonio Spurs": {
    head: "Mitch Johnson",
    assistants: ["Will Hardy", "Becky Hammon", "Tim Duncan", "Sean Marks"]
  },
  "Atlanta Hawks": {
    head: "Quin Snyder",
    assistants: ["Chris Finch", "Nate McMillan", "Mike Longabardi", "Jordi Fernandez"]
  },
  "Boston Celtics": {
    head: "Joe Mazzulla",
    assistants: ["Charles Lee", "Damon Stoudamire", "Sam Cassell", "Ben Sullivan"]
  },
  "Brooklyn Nets": {
    head: "Jordi Fernandez",
    assistants: ["Will Hardy", "Royal Ivey", "Rasheed Wallace", "Aleksandar Dzikic"]
  },
  "Charlotte Hornets": {
    head: "Charles Lee",
    assistants: ["Jay Larranaga", "Patrick Mutombo", "Scott Morrison", "Romain Sato"]
  },
  "Chicago Bulls": {
    head: "Billy Donovan",
    assistants: ["Chris Fleming", "Nate Tibbetts", "Damian Cotter", "Roy Rogers"]
  },
  "Cleveland Cavaliers": {
    head: "Kenny Atkinson",
    assistants: ["Antonio Lang", "Damon Jones", "Nate Bjorkgren", "Mike Gerrity"]
  },
  "Detroit Pistons": {
    head: "JB Bickerstaff",
    assistants: ["Rex Kalamian", "Mike Longabardi", "Sam Mitchell", "Lamont Evans"]
  },
  "Indiana Pacers": {
    head: "Rick Carlisle",
    assistants: ["Dan Burke", "Greg Foster", "Bill Bayno", "Brendan Suhr"]
  },
  "Miami Heat": {
    head: "Erik Spoelstra",
    assistants: ["Chris Quinn", "Caron Butler", "Malik Allen", "Dan Craig"]
  },
  "Milwaukee Bucks": {
    head: "Doc Rivers",
    assistants: ["Charles Lee", "Darvin Ham", "Terry Stotts", "Kevin Young"]
  },
  "New York Knicks": {
    head: "Tom Thibodeau",
    assistants: ["Johnnie Bryant", "Royal Ivey", "Howard Eisley", "Greg St. Jean"]
  },
  "Orlando Magic": {
    head: "Jamahl Mosley",
    assistants: ["Nate Tibbetts", "Tyrone Corbin", "Charles Lee", "Keith Smart"]
  },
  "Philadelphia 76ers": {
    head: "Nick Nurse",
    assistants: ["Dave Joerger", "Sam Cassell", "Kevin Young", "Octavio De La Grana"]
  },
  "Toronto Raptors": {
    head: "Jordi Fernandez",
    assistants: ["Will Hardy", "Nate Bjorkgren", "Patrick Mutombo", "Juan Mendez"]
  },
  "Washington Wizards": {
    head: "Brian Keefe",
    assistants: ["Pat Delany", "Mike Longabardi", "Jarell Eddie", "Chris Singleton"]
  }
};
function buildTeamToCoachingStaffDeck(team) {
  const staff = TEAM_COACHING_STAFF[team.name];
  if (!staff) return [makeCard(team.name, 'Coaching staff unavailable', "Who is on this team's current coaching staff?")];
  const headLabel = '<span class="back-career-dur" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:2px;">Head Coach</span>';
  const headRow = '<div class="back-career-entry"><span class="back-career-team" style="font-size:20px;font-weight:600;">' + staff.head + '</span></div>';
  const assistLabel = '<span class="back-career-dur" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-top:8px;margin-bottom:2px;">Assistants</span>';
  const assistRows = staff.assistants.map(a =>
    '<div class="back-career-entry"><span class="back-career-team" style="font-size:18px;font-weight:500;">' + a + '</span></div>'
  ).join('');
  const answer = '<div class="back-career-block" style="gap:6px;">' + headLabel + headRow + assistLabel + assistRows + '</div>';
  return [makeCard(team.name, answer, "Who is on this team's current coaching staff?")];
}
function buildPlayerToHometownDeck(roster)  { return roster.filter(p => p.hometown).map(p => makeCard(p.name, p.hometown,   "What is this player's hometown?")); }
function buildPlayerToDraftYearPickDeck(roster) {
  return roster.filter(p => p.draft_year && p.draft_pick).map(p => {
    const answer = p.draft_pick === 'Undrafted' ? 'Undrafted' : p.draft_year + ' — Pick ' + p.draft_pick;
    return makeCard(p.name, answer, "What year and pick was this player drafted?");
  });
}
function buildPlayerToDraftTeamDeck(roster) { return roster.filter(p => p.draft_team).map(p => makeCard(p.name, p.draft_team, "Which team originally drafted this player?")); }

// -- Team deck builders (single-team: Jazz) --
function buildTeamToCityDeck(team)         { return [makeCard(team.name, team.city,         'What city does this team play in?')]; }
function buildTeamToConferenceDeck(team)   { return [makeCard(team.name, team.conference,   'What conference is this team in?')]; }
function buildTeamToColorsDeck(team)       { return [makeCard(team.name, team.colors,       "What are this team's colors?")]; }
function buildTeamToDivisionDeck(team)     { return [makeCard(team.name, team.division,     'What division is this team in?')]; }
function buildTeamToChampsDeck(team)       { return [makeCard(team.name, team.championships,'How many championships has this team won?')]; }
function buildTeamToLastTitleDeck(team) {
  const answer = _legacyHTML(team.lastTitle, 'Last Title Year', null);
  return [makeCard(team.name, answer, 'When did this team last win a championship?')];
}

const TEAM_ROOKIES_OF_YEAR = {
  "Utah Jazz":                [ { player:"Darrell Griffith", year:1981 }, { player:"Karl Malone", year:1986 } ],
  "Dallas Mavericks":         [ { player:"Jason Kidd", year:1995 } ],
  "Denver Nuggets":           NUGGETS_ROSTER,
  "Houston Rockets":          [ { player:"Steve Francis", year:2000 }, { player:"Yao Ming", year:2003 } ],
  "Golden State Warriors":    [ { player:"Alvan Adams", year:1976 } ],
  "LA Clippers":              [ { player:"Terry Cummings", year:1983 } ],
  "Los Angeles Lakers":       [ { player:"Elgin Baylor", year:1959 }, { player:"Kareem Abdul-Jabbar", year:1970 } ],
  "Memphis Grizzlies":        [ { player:"Ja Morant", year:2020 } ],
  "Minnesota Timberwolves":   [ { player:"Isaiah Rider", year:1994 }, { player:"Kevin Love", year:2009 } ],
  "New Orleans Pelicans":     [ { player:"David West", year:2004 }, { player:"Tyreke Evans", year:2010 } ],
  "Oklahoma City Thunder":    [ { player:"Kevin Durant", year:2008 } ],
  "Phoenix Suns":             [ { player:"Connie Hawkins", year:1970 } ],
  "Portland Trail Blazers":   [ { player:"Geoff Petrie", year:1971 }, { player:"Sidney Wicks", year:1972 } ],
  "Sacramento Kings":         [ { player:"Mitch Richmond", year:1989 } ],
  "San Antonio Spurs":        [ { player:"David Robinson", year:1990 } ],
  "Atlanta Hawks":            [ { player:"Bob Pettit", year:1955 }, { player:"Dikembe Mutombo", year:1992 } ],
  "Boston Celtics":           [ { player:"Tom Heinsohn", year:1957 }, { player:"Dave Cowens", year:1971 } ],
  "Brooklyn Nets":            [],
  "Charlotte Hornets":        [ { player:"Larry Johnson", year:1992 } ],
  "Chicago Bulls":            [ { player:"Michael Jordan", year:1985 } ],
  "Cleveland Cavaliers":      [ { player:"LeBron James", year:2004 } ],
  "Detroit Pistons":          [],
  "Indiana Pacers":           [],
  "Miami Heat":               [ { player:"Dwyane Wade", year:2004 } ],
  "Milwaukee Bucks":          [ { player:"Kareem Abdul-Jabbar", year:1970 }, { player:"Bob Dandridge", year:1970 } ],
  "New York Knicks":          [ { player:"Willis Reed", year:1965 }, { player:"Patrick Ewing", year:1986 } ],
  "Orlando Magic":            [ { player:"Shaquille O'Neal", year:1993 } ],
  "Philadelphia 76ers":       [ { player:"Wilt Chamberlain", year:1960 }, { player:"Allen Iverson", year:1997 } ],
  "Toronto Raptors":          [ { player:"Damon Stoudamire", year:1996 }, { player:"Vince Carter", year:1999 } ],
  "Washington Wizards":       [ { player:"Wes Unseld", year:1969 } ],
};

function buildTeamToRookiesOfYearDeck(team) {
  const winners = TEAM_ROOKIES_OF_YEAR[team.name];
  if (!winners || !winners.length) return [makeCard(team.name, 'No Rookie of the Year winners yet', "Who are this franchise's Rookie of the Year winners?")];
  const entries = winners.map(w =>
    '<div class="back-career-entry">' +
      '<span class="back-career-team">' + w.player + '</span>' +
      '<span class="back-career-dur">' + w.year + '</span>' +
    '</div>'
  ).join('');
  const answer = '<div class="back-career-block">' + entries + '</div>';
  return [makeCard(team.name, answer, "Who are this franchise's Rookie of the Year winners?")];
}
function buildLeagueTeamToRookiesOfYearDeck() {
  return Object.keys(TEAM_ROOKIES_OF_YEAR).filter(k => TEAM_ROOKIES_OF_YEAR[k].length > 0).map(teamName => {
    const winners = TEAM_ROOKIES_OF_YEAR[teamName];
    const entries = winners.map(w =>
      '<div class="back-career-entry">' +
        '<span class="back-career-team">' + w.player + '</span>' +
        '<span class="back-career-dur">' + w.year + '</span>' +
      '</div>'
    ).join('');
    const answer = '<div class="back-career-block">' + entries + '</div>';
    return makeCard(teamName, answer, "Who are this franchise's Rookie of the Year winners?");
  });
}
function buildPlayerToYearsOnTeamDeck(roster) {
  return Array.from(roster).filter(p => p && p.name && p.jazz_years).map(p =>
    makeCard(p.name, p.jazz_years, 'How many seasons has this player been with the Jazz?')
  );
}
function buildPlayerToStarterBenchDeck(roster) {
  const starterNames = new Set(Object.values(_activeLineup));
  const teamName = _activeTeam ? _activeTeam.name : 'Utah Jazz';
  return Array.from(roster).filter(p => p && p.name).map(p => {
    const status = starterNames.has(p.name) ? 'Starter' : 'Bench';
    const front = p.name +
      '<div style="font-family:\'DM Sans\',sans-serif;font-size:13px;font-weight:400;letter-spacing:1px;color:rgba(255,255,255,0.55);margin-top:4px;text-transform:none;">' +
      teamName + '</div>';
    return makeCard(front, status, 'Is this player a starter or bench player?');
  });
}
function buildTeamToStartingPosDeck(teamName) {
  // Front: "Utah Jazz — Starting PG", Back: player name
  return Object.entries(_activeLineup).map(([slot, playerName]) =>
    makeCard(teamName + ' — Starting ' + slot, playerName, 'Who is the ' + slot + ' starter for this team?')
  );
}
function buildLeagueTeamToStartingPosDeck() {
  const cards = [];
  NBA_TEAMS.filter(t => LEAGUE_LINEUPS[t.name]).forEach(t => {
    const lineup = LEAGUE_LINEUPS[t.name];
    Object.entries(lineup).forEach(([slot, playerName]) => {
      cards.push(makeCard(t.name + ' — Starting ' + slot, playerName, 'Who is the ' + slot + ' starter for this team?'));
    });
  });
  return cards;
}
function buildTeamToStarting5Deck(team) {
  const posOrder = ['PG','SG','SF','PF','C'];
  const rows = posOrder.map(slot => {
    const name = _activeLineup[slot] || '—';
    return '<div class="top10-row">' +
      '<span class="top10-pos">' + slot + '</span>' +
      '<span class="top10-player">' + name + '</span>' +
    '</div>';
  }).join('');
  const front = team.name;
  const answer = '<div class="top10-list"><div class="top10-section-label">Starting 5</div>' + rows + '</div>';
  return [makeCard(front, answer, '__LINEUP__')];
}
function buildLeagueTeamToStarting5Deck() {
  const posOrder = ['PG','SG','SF','PF','C'];
  return NBA_TEAMS.filter(t => LEAGUE_LINEUPS[t.name]).map(t => {
    const lineup = LEAGUE_LINEUPS[t.name];
    const rows = posOrder.map(slot => {
      const name = lineup[slot] || '—';
      return '<div class="back-career-entry">' +
        '<span class="back-career-team" style="font-size:15px;font-weight:500;">' +
          '<span style="color:rgba(180,144,255,0.8);font-size:12px;letter-spacing:1px;margin-right:8px;">' + slot + '</span>' +
          name +
        '</span></div>';
    }).join('');
    const front = t.name;
    const answer = '<div class="back-career-block" style="gap:6px;">' + rows + '</div>';
    return makeCard(front, answer, '__LINEUP__');
  });
}
function buildLeagueTeamToBestPlayerDeck() {
  return NBA_TEAMS.filter(t => TEAM_BEST_PLAYER[t.name]).map(t =>
    makeCard(t.name, TEAM_BEST_PLAYER[t.name], "Who is this team's best player?")
  );
}
// ── Draft Year Top 10 dataset ───────────────────────────────────────────────
const DRAFT_YEAR_TOP_10 = [
  { year:'2010', picks:['1. John Wall – Washington Wizards','2. Evan Turner – Philadelphia 76ers','3. Derrick Favors – New Jersey Nets','4. Wesley Johnson – Minnesota Timberwolves','5. DeMarcus Cousins – Sacramento Kings','6. Ekpe Udoh – Golden State Warriors','7. Greg Monroe – Detroit Pistons','8. Al-Farouq Aminu – Los Angeles Clippers','9. Gordon Hayward – Utah Jazz','10. Paul George – Indiana Pacers'] },
  { year:'2011', picks:['1. Kyrie Irving – Cleveland Cavaliers','2. Derrick Williams – Minnesota Timberwolves','3. Enes Kanter – Utah Jazz','4. Tristan Thompson – Cleveland Cavaliers','5. Jonas Valanciunas – Toronto Raptors','6. Jan Vesely – Washington Wizards','7. Bismack Biyombo – Sacramento Kings','8. Brandon Knight – Detroit Pistons','9. Kemba Walker – Charlotte Bobcats','10. Jimmer Fredette – Milwaukee Bucks'] },
  { year:'2012', picks:['1. Anthony Davis – New Orleans Hornets','2. Michael Kidd-Gilchrist – Charlotte Bobcats','3. Bradley Beal – Washington Wizards','4. Dion Waiters – Cleveland Cavaliers','5. Thomas Robinson – Sacramento Kings','6. Damian Lillard – Portland Trail Blazers','7. Harrison Barnes – Golden State Warriors','8. Terrence Ross – Toronto Raptors','9. Andre Drummond – Detroit Pistons','10. Austin Rivers – New Orleans Hornets'] },
  { year:'2013', picks:['1. Anthony Bennett – Cleveland Cavaliers','2. Victor Oladipo – Orlando Magic','3. Otto Porter Jr. – Washington Wizards','4. Cody Zeller – Charlotte Bobcats','5. Alex Len – Phoenix Suns','6. Nerlens Noel – New Orleans Pelicans','7. Ben McLemore – Sacramento Kings','8. Kentavious Caldwell-Pope – Detroit Pistons','9. Trey Burke – Minnesota Timberwolves','10. CJ McCollum – Portland Trail Blazers'] },
  { year:'2014', picks:['1. Andrew Wiggins – Cleveland Cavaliers','2. Jabari Parker – Milwaukee Bucks','3. Joel Embiid – Philadelphia 76ers','4. Aaron Gordon – Orlando Magic','5. Dante Exum – Utah Jazz','6. Marcus Smart – Boston Celtics','7. Julius Randle – Los Angeles Lakers','8. Nik Stauskas – Sacramento Kings','9. Noah Vonleh – Charlotte Hornets','10. Elfrid Payton – Philadelphia 76ers'] },
  { year:'2015', picks:['1. Karl-Anthony Towns – Minnesota Timberwolves','2. D’Angelo Russell – Los Angeles Lakers','3. Jahlil Okafor – Philadelphia 76ers','4. Kristaps Porzingis – New York Knicks','5. Mario Hezonja – Orlando Magic','6. Willie Cauley-Stein – Sacramento Kings','7. Emmanuel Mudiay – Denver Nuggets','8. Stanley Johnson – Detroit Pistons','9. Frank Kaminsky – Charlotte Hornets','10. Justise Winslow – Miami Heat'] },
  { year:'2016', picks:['1. Ben Simmons – Philadelphia 76ers','2. Brandon Ingram – Los Angeles Lakers','3. Jaylen Brown – Boston Celtics','4. Dragan Bender – Phoenix Suns','5. Kris Dunn – Minnesota Timberwolves','6. Buddy Hield – New Orleans Pelicans','7. Jamal Murray – Denver Nuggets','8. Marquese Chriss – Sacramento Kings','9. Jakob Poeltl – Toronto Raptors','10. Thon Maker – Milwaukee Bucks'] },
  { year:'2017', picks:['1. Markelle Fultz – Philadelphia 76ers','2. Lonzo Ball – Los Angeles Lakers','3. Jayson Tatum – Boston Celtics','4. Josh Jackson – Phoenix Suns','5. De’Aaron Fox – Sacramento Kings','6. Jonathan Isaac – Orlando Magic','7. Lauri Markkanen – Minnesota Timberwolves','8. Frank Ntilikina – New York Knicks','9. Dennis Smith Jr. – Dallas Mavericks','10. Zach Collins – Sacramento Kings'] },
  { year:'2018', picks:['1. Deandre Ayton – Phoenix Suns','2. Marvin Bagley III – Sacramento Kings','3. Luka Doncic – Atlanta Hawks','4. Jaren Jackson Jr. – Memphis Grizzlies','5. Trae Young – Dallas Mavericks','6. Mo Bamba – Orlando Magic','7. Wendell Carter Jr. – Chicago Bulls','8. Collin Sexton – Cleveland Cavaliers','9. Kevin Knox – New York Knicks','10. Mikal Bridges – Philadelphia 76ers'] },
  { year:'2019', picks:['1. Zion Williamson – New Orleans Pelicans','2. Ja Morant – Memphis Grizzlies','3. RJ Barrett – New York Knicks','4. De’Andre Hunter – Los Angeles Lakers','5. Darius Garland – Cleveland Cavaliers','6. Jarrett Culver – Phoenix Suns','7. Coby White – Chicago Bulls','8. Jaxson Hayes – Atlanta Hawks','9. Rui Hachimura – Washington Wizards','10. Cam Reddish – Atlanta Hawks'] },
  { year:'2020', picks:['1. Anthony Edwards – Minnesota Timberwolves','2. James Wiseman – Golden State Warriors','3. LaMelo Ball – Charlotte Hornets','4. Patrick Williams – Chicago Bulls','5. Isaac Okoro – Cleveland Cavaliers','6. Onyeka Okongwu – Atlanta Hawks','7. Killian Hayes – Detroit Pistons','8. Obi Toppin – New York Knicks','9. Deni Avdija – Washington Wizards','10. Jalen Smith – Phoenix Suns'] },
  { year:'2021', picks:['1. Cade Cunningham – Detroit Pistons','2. Jalen Green – Houston Rockets','3. Evan Mobley – Cleveland Cavaliers','4. Scottie Barnes – Toronto Raptors','5. Jalen Suggs – Orlando Magic','6. Josh Giddey – Oklahoma City Thunder','7. Jonathan Kuminga – Golden State Warriors','8. Franz Wagner – Orlando Magic','9. Davion Mitchell – Sacramento Kings','10. Ziaire Williams – Memphis Grizzlies'] },
  { year:'2022', picks:['1. Paolo Banchero – Orlando Magic','2. Chet Holmgren – Oklahoma City Thunder','3. Jabari Smith Jr. – Houston Rockets','4. Keegan Murray – Sacramento Kings','5. Jaden Ivey – Detroit Pistons','6. Bennedict Mathurin – Indiana Pacers','7. Shaedon Sharpe – Portland Trail Blazers','8. Dyson Daniels – New Orleans Pelicans','9. Jeremy Sochan – San Antonio Spurs','10. Johnny Davis – Washington Wizards'] },
  { year:'2023', picks:['1. Victor Wembanyama – San Antonio Spurs','2. Brandon Miller – Charlotte Hornets','3. Scoot Henderson – Portland Trail Blazers','4. Amen Thompson – Houston Rockets','5. Ausar Thompson – Detroit Pistons','6. Anthony Black – Orlando Magic','7. Bilal Coulibaly – Indiana Pacers','8. Jarace Walker – Washington Wizards','9. Taylor Hendricks – Utah Jazz','10. Cason Wallace – Dallas Mavericks'] },
  { year:'2024', picks:['1. Zaccharie Risacher – Atlanta Hawks','2. Alex Sarr – Washington Wizards','3. Reed Sheppard – Houston Rockets','4. Stephon Castle – San Antonio Spurs','5. Ron Holland II – Detroit Pistons','6. Tidjane Salaun – Charlotte Hornets','7. Donovan Clingan – Portland Trail Blazers','8. Rob Dillingham – San Antonio Spurs','9. Zach Edey – Memphis Grizzlies','10. Cody Williams – Utah Jazz'] },
  { year:'2025', picks:['1. Cooper Flagg – Dallas Mavericks','2. Dylan Harper – San Antonio Spurs','3. VJ Edgecombe – Philadelphia 76ers','4. Kon Knueppel – Charlotte Hornets','5. Ace Bailey – Utah Jazz','6. Tre Johnson – Washington Wizards','7. Jeremiah Fears – New Orleans Pelicans','8. Egor Demin – Brooklyn Nets','9. Collin Murray-Boyles – Toronto Raptors','10. Khaman Maluach – Houston Rockets'] }
];

function buildLeagueDraftYearTop10Deck() {
  const cards = DRAFT_YEAR_TOP_10.map(d => {
    const rows = d.picks.map(pick => {
      // Split "N. Name – Team" into pick num, player name, team
      const m = pick.match(/^(\d+)\.\s+(.+?)\s+\u2013\s+(.+)$/);
      if (m) {
        return '<div class="draft-pick-row">' +
          '<span class="draft-pick-num">' + m[1] + '</span>' +
          '<span class="draft-pick-player">' + m[2] + '</span>' +
          '<span class="draft-pick-team">– ' + m[3] + '</span>' +
        '</div>';
      }
      return '<div class="draft-pick-row"><div class="draft-pick-main"><span class="draft-pick-player">' + pick + '</span></div></div>';
    }).join('');
    const answer = '<div class="draft-pick-list">' +
      '<div class="draft-pick-year-label">' + d.year + ' NBA Draft</div>' +
      rows + '</div>';
    return makeCard(d.year, answer, '🎟️ Top 10 picks from this draft class?');
  });
  // Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function buildTeamToCoachDeck(team)       { return [makeCard(team.name, team.coach,        "Who is this team's head coach?")]; }
function buildTeamToCoachPrevTeamDeck(team) {
  const prev = team.coachPrevTeam;
  let answer;
  if (!prev || (prev.team && prev.team === 'None') || prev === 'None') {
    answer = '<div class="back-career-block"><div class="back-career-entry"><span class="back-career-team" style="font-size:22px;font-weight:700;">None</span><span class="back-career-dur" style="font-size:13px;opacity:0.9;color:rgba(180,144,255,0.9);">First NBA coaching job</span></div></div>';
  } else if (typeof prev === 'object' && prev.team) {
    answer = '<div class="back-career-block"><div class="back-career-entry">' +
      '<span class="back-career-team" style="font-size:22px;font-weight:700;">' + prev.team + '</span>' +
      '<span class="back-career-dur" style="font-size:13px;opacity:0.9;color:rgba(180,144,255,0.9);">' + prev.role + '</span>' +
      '</div></div>';
  } else {
    answer = '<div class="back-career-block"><div class="back-career-entry"><span class="back-career-team" style="font-size:22px;font-weight:700;">' + String(prev) + '</span></div></div>';
  }
  return [makeCard(team.coach || team.name, answer, "What was this head coach's most recent previous NBA team?")];
}
function buildTeamToCoachSinceDeck(team) {
  const answer = team.coachSince
    ? '<div class="back-conf-block">' +
        '<span class="back-conf-label">Current Team</span>' +
        '<span class="back-conf-val">' + team.name + '</span>' +
        '<span class="back-conf-label">Head Coach Since</span>' +
        '<span class="back-conf-val" style="font-size:28px;">' + team.coachSince + '</span>' +
      '</div>'
    : 'N/A';
  return [makeCard(team.coach || team.name, answer, "What year did this head coach join this team?")];
}

// ── Franchise Records data ───────────────────────────────────────────────────
const TEAM_ALL_TIME_DEFENSIVE_LEADER = {
  "Utah Jazz": { name: "Mark Eaton", stat: "3,064 blk" },
  "Dallas Mavericks": { name: "Dirk Nowitzki", stat: "1,281 blk" },
  "Denver Nuggets": { name: "Dikembe Mutombo", stat: "1,706 blk" },
  "Houston Rockets": { name: "Hakeem Olajuwon", stat: "3,740 blk" },
  "Golden State Warriors": { name: "Nate Thurmond", stat: "1,171 blk" },
  "LA Clippers": { name: "DeAndre Jordan", stat: "1,172 blk" },
  "Los Angeles Lakers": { name: "Kareem Abdul-Jabbar", stat: "2,694 blk" },
  "Memphis Grizzlies": { name: "Marc Gasol", stat: "1,040 blk" },
  "Minnesota Timberwolves": { name: "Kevin Garnett", stat: "1,821 blk" },
  "New Orleans Pelicans": { name: "Anthony Davis", stat: "827 blk" },
  "Oklahoma City Thunder": { name: "Serge Ibaka", stat: "1,131 blk" },
  "Phoenix Suns": { name: "Alvan Adams", stat: "518 blk" },
  "Portland Trail Blazers": { name: "Mychal Thompson", stat: "762 blk" },
  "Sacramento Kings": { name: "Domantas Sabonis", stat: "382 blk" },
  "San Antonio Spurs": { name: "David Robinson", stat: "2,954 blk" },
  "Atlanta Hawks": { name: "Dikembe Mutombo", stat: "1,334 blk" },
  "Boston Celtics": { name: "Robert Parish", stat: "1,703 blk" },
  "Brooklyn Nets": { name: "Brook Lopez", stat: "1,268 blk" },
  "Charlotte Hornets": { name: "Alonzo Mourning", stat: "684 blk" },
  "Chicago Bulls": { name: "Artis Gilmore", stat: "1,029 blk" },
  "Cleveland Cavaliers": { name: "Zydrunas Ilgauskas", stat: "1,269 blk" },
  "Detroit Pistons": { name: "Ben Wallace", stat: "1,448 blk" },
  "Indiana Pacers": { name: "Mel Daniels", stat: "969 blk" },
  "Miami Heat": { name: "Alonzo Mourning", stat: "1,625 blk" },
  "Milwaukee Bucks": { name: "Kareem Abdul-Jabbar", stat: "2,199 blk" },
  "New York Knicks": { name: "Patrick Ewing", stat: "2,758 blk" },
  "Orlando Magic": { name: "Dwight Howard", stat: "1,344 blk" },
  "Philadelphia 76ers": { name: "Joel Embiid", stat: "1,564 blk" },
  "Toronto Raptors": { name: "Serge Ibaka", stat: "670 blk" },
  "Washington Wizards": { name: "Elvin Hayes", stat: "1,558 blk" }
};
const TEAM_ALL_TIME_REBOUNDS_LEADER = {
  "Utah Jazz": { name: "Karl Malone", stat: "14,601 reb" },
  "Dallas Mavericks": { name: "Dirk Nowitzki", stat: "11,489 reb" },
  "Denver Nuggets": { name: "Dikembe Mutombo", stat: "7,686 reb" },
  "Houston Rockets": { name: "Hakeem Olajuwon", stat: "13,382 reb" },
  "Golden State Warriors": { name: "Nate Thurmond", stat: "12,771 reb" },
  "LA Clippers": { name: "DeAndre Jordan", stat: "8,901 reb" },
  "Los Angeles Lakers": { name: "Kareem Abdul-Jabbar", stat: "17,440 reb" },
  "Memphis Grizzlies": { name: "Marc Gasol", stat: "6,108 reb" },
  "Minnesota Timberwolves": { name: "Kevin Garnett", stat: "14,662 reb" },
  "New Orleans Pelicans": { name: "Anthony Davis", stat: "5,765 reb" },
  "Oklahoma City Thunder": { name: "Kevin Durant", stat: "5,427 reb" },
  "Phoenix Suns": { name: "Amar'e Stoudemire", stat: "5,765 reb" },
  "Portland Trail Blazers": { name: "Bill Walton", stat: "4,177 reb" },
  "Sacramento Kings": { name: "Domantas Sabonis", stat: "5,765 reb" },
  "San Antonio Spurs": { name: "Tim Duncan", stat: "15,091 reb" },
  "Atlanta Hawks": { name: "Bob Pettit", stat: "12,849 reb" },
  "Boston Celtics": { name: "Robert Parish", stat: "14,715 reb" },
  "Brooklyn Nets": { name: "Buck Williams", stat: "7,576 reb" },
  "Charlotte Hornets": { name: "Emeka Okafor", stat: "4,477 reb" },
  "Chicago Bulls": { name: "Artis Gilmore", stat: "8,982 reb" },
  "Cleveland Cavaliers": { name: "Zydrunas Ilgauskas", stat: "8,055 reb" },
  "Detroit Pistons": { name: "Bill Laimbeer", stat: "9,430 reb" },
  "Indiana Pacers": { name: "Mel Daniels", stat: "7,643 reb" },
  "Miami Heat": { name: "Bam Adebayo", stat: "5,765 reb" },
  "Milwaukee Bucks": { name: "Kareem Abdul-Jabbar", stat: "7,161 reb" },
  "New York Knicks": { name: "Patrick Ewing", stat: "10,759 reb" },
  "Orlando Magic": { name: "Dwight Howard", stat: "8,072 reb" },
  "Philadelphia 76ers": { name: "Dolph Schayes", stat: "11,256 reb" },
  "Toronto Raptors": { name: "Chris Bosh", stat: "5,039 reb" },
  "Washington Wizards": { name: "Elvin Hayes", stat: "13,769 reb" }
};
const TEAM_ALL_TIME_SCORER = {
  "Utah Jazz": { name: "Karl Malone", stat: "36,374 pts" },
  "Dallas Mavericks": { name: "Dirk Nowitzki", stat: "31,560 pts" },
  "Denver Nuggets": { name: "Alex English", stat: "21,645 pts" },
  "Houston Rockets": { name: "Hakeem Olajuwon", stat: "26,511 pts" },
  "Golden State Warriors": { name: "Wilt Chamberlain", stat: "17,783 pts" },
  "LA Clippers": { name: "Randy Smith", stat: "12,735 pts" },
  "Los Angeles Lakers": { name: "Kareem Abdul-Jabbar", stat: "33,643 pts" },
  "Memphis Grizzlies": { name: "Zach Randolph", stat: "12,535 pts" },
  "Minnesota Timberwolves": { name: "Kevin Garnett", stat: "19,201 pts" },
  "New Orleans Pelicans": { name: "Anthony Davis", stat: "14,062 pts" },
  "Oklahoma City Thunder": { name: "Kevin Durant", stat: "17,566 pts" },
  "Phoenix Suns": { name: "Walter Davis", stat: "15,666 pts" },
  "Portland Trail Blazers": { name: "Clyde Drexler", stat: "18,040 pts" },
  "Sacramento Kings": { name: "Oscar Robertson", stat: "22,009 pts" },
  "San Antonio Spurs": { name: "Tim Duncan", stat: "26,496 pts" },
  "Atlanta Hawks": { name: "Dominique Wilkins", stat: "23,292 pts" },
  "Boston Celtics": { name: "John Havlicek", stat: "26,395 pts" },
  "Brooklyn Nets": { name: "Brook Lopez", stat: "10,859 pts" },
  "Charlotte Hornets": { name: "Dell Curry", stat: "9,839 pts" },
  "Chicago Bulls": { name: "Michael Jordan", stat: "21,541 pts" },
  "Cleveland Cavaliers": { name: "LeBron James", stat: "23,119 pts" },
  "Detroit Pistons": { name: "Isiah Thomas", stat: "18,822 pts" },
  "Indiana Pacers": { name: "Reggie Miller", stat: "18,041 pts" },
  "Miami Heat": { name: "Dwyane Wade", stat: "21,556 pts" },
  "Milwaukee Bucks": { name: "Kareem Abdul-Jabbar", stat: "14,211 pts" },
  "New York Knicks": { name: "Patrick Ewing", stat: "23,665 pts" },
  "Orlando Magic": { name: "Shaquille O'Neal", stat: "8,204 pts" },
  "Philadelphia 76ers": { name: "Hal Greer", stat: "21,586 pts" },
  "Toronto Raptors": { name: "DeMar DeRozan", stat: "16,024 pts" },
  "Washington Wizards": { name: "Elvin Hayes", stat: "15,551 pts" }
};
const TEAM_ALL_TIME_ASSISTS = {
  "Utah Jazz": { name: "John Stockton", stat: "15,806 ast" },
  "Dallas Mavericks": { name: "Jason Kidd", stat: "5,027 ast" },
  "Denver Nuggets": { name: "Fat Lever", stat: "3,208 ast" },
  "Houston Rockets": { name: "Calvin Murphy", stat: "4,402 ast" },
  "Golden State Warriors": { name: "Guy Rodgers", stat: "4,855 ast" },
  "LA Clippers": { name: "Gary Grant", stat: "3,008 ast" },
  "Los Angeles Lakers": { name: "Magic Johnson", stat: "10,141 ast" },
  "Memphis Grizzlies": { name: "Mike Conley", stat: "4,979 ast" },
  "Minnesota Timberwolves": { name: "Kevin Garnett", stat: "5,445 ast" },
  "New Orleans Pelicans": { name: "Rajon Rondo", stat: "2,169 ast" },
  "Oklahoma City Thunder": { name: "Russell Westbrook", stat: "6,812 ast" },
  "Phoenix Suns": { name: "Steve Nash", stat: "6,997 ast" },
  "Portland Trail Blazers": { name: "Terry Porter", stat: "5,319 ast" },
  "Sacramento Kings": { name: "Oscar Robertson", stat: "7,731 ast" },
  "San Antonio Spurs": { name: "Tony Parker", stat: "6,212 ast" },
  "Atlanta Hawks": { name: "Mookie Blaylock", stat: "5,557 ast" },
  "Boston Celtics": { name: "Bob Cousy", stat: "6,945 ast" },
  "Brooklyn Nets": { name: "Jason Kidd", stat: "4,620 ast" },
  "Charlotte Hornets": { name: "Muggsy Bogues", stat: "5,557 ast" },
  "Chicago Bulls": { name: "Michael Jordan", stat: "5,012 ast" },
  "Cleveland Cavaliers": { name: "LeBron James", stat: "7,825 ast" },
  "Detroit Pistons": { name: "Isiah Thomas", stat: "9,061 ast" },
  "Indiana Pacers": { name: "Reggie Miller", stat: "4,141 ast" },
  "Miami Heat": { name: "Dwyane Wade", stat: "5,765 ast" },
  "Milwaukee Bucks": { name: "Oscar Robertson", stat: "4,621 ast" },
  "New York Knicks": { name: "Walt Frazier", stat: "4,791 ast" },
  "Orlando Magic": { name: "Anfernee Hardaway", stat: "2,480 ast" },
  "Philadelphia 76ers": { name: "Maurice Cheeks", stat: "6,212 ast" },
  "Toronto Raptors": { name: "Kyle Lowry", stat: "4,761 ast" },
  "Washington Wizards": { name: "John Wall", stat: "4,474 ast" }
};

// ── Shared helper for legacy card HTML ────────────────────────────────────────
function _legacyHTML(mainText, subLabel, statText) {
  return '<div class="back-legacy-block">' +
    '<span class="back-legacy-main">' + mainText + '</span>' +
    '<span class="back-legacy-sub">' + subLabel + '</span>' +
    (statText ? '<span class="back-legacy-stat">' + statText + '</span>' : '') +
    '</div>';
}

// ── Team Mastery builders ───────────────────────────────────────────────────
function buildTeamToAllTimeDefensiveLeaderDeck(team) {
  const d = TEAM_ALL_TIME_DEFENSIVE_LEADER[team.name];
  if (!d) return [];
  return [makeCard(team.name, _legacyHTML(d.name, 'All-Time Defensive Leader', d.stat), "Who is this team's all-time defensive leader?")];
}
function buildTeamToAllTimeReboundsLeaderDeck(team) {
  const d = TEAM_ALL_TIME_REBOUNDS_LEADER[team.name];
  if (!d) return [];
  return [makeCard(team.name, _legacyHTML(d.name, 'All-Time Rebounds', d.stat), "Who is this team's all-time rebounds leader?")];
}
function buildTeamToAllTimeScorerDeck(team) {
  const d = TEAM_ALL_TIME_SCORER[team.name];
  if (!d) return [];
  return [makeCard(team.name, _legacyHTML(d.name, 'All-Time Points', d.stat), "Who is this team's all-time leading scorer?")];
}
function buildTeamToAllTimeAssistsDeck(team) {
  const d = TEAM_ALL_TIME_ASSISTS[team.name];
  if (!d) return [];
  return [makeCard(team.name, _legacyHTML(d.name, 'All-Time Assists', d.stat), "Who is this team's all-time assists leader?")];
}

// ── League Knowledge builders (Jazz-only for now) ──────────────────────────
function buildLeagueTeamToAllTimeDefensiveLeaderDeck() {
  return Object.keys(TEAM_ALL_TIME_DEFENSIVE_LEADER).map(name => {
    const d = TEAM_ALL_TIME_DEFENSIVE_LEADER[name];
    return makeCard(name, _legacyHTML(d.name, 'All-Time Defensive Leader', d.stat), "Who is this team's all-time defensive leader?");
  });
}
function buildLeagueTeamToAllTimeReboundsLeaderDeck() {
  return Object.keys(TEAM_ALL_TIME_REBOUNDS_LEADER).map(name => {
    const d = TEAM_ALL_TIME_REBOUNDS_LEADER[name];
    return makeCard(name, _legacyHTML(d.name, 'All-Time Rebounds', d.stat), "Who is this team's all-time rebounds leader?");
  });
}
function buildLeagueTeamToAllTimeScorerDeck() {
  return Object.keys(TEAM_ALL_TIME_SCORER).map(name => {
    const d = TEAM_ALL_TIME_SCORER[name];
    return makeCard(name, _legacyHTML(d.name, 'All-Time Points', d.stat), "Who is this team's all-time leading scorer?");
  });
}
function buildLeagueTeamToAllTimeAssistsDeck() {
  return Object.keys(TEAM_ALL_TIME_ASSISTS).map(name => {
    const d = TEAM_ALL_TIME_ASSISTS[name];
    return makeCard(name, _legacyHTML(d.name, 'All-Time Assists', d.stat), "Who is this team's all-time assists leader?");
  });
}

// -- League Knowledge Jazz-only history builders --
function buildLeaguePlayerPastTeamsDeck() {
  // Jazz-only for now — reuses same TEST_ROSTER source as Team Mastery
  return buildPlayerToPastTeamsDeck(TEST_ROSTER);
}
function buildLeagueTeamToChampsDeck() {
  return NBA_TEAMS.map(t =>
    makeCard(t.name, t.championships || '0', 'How many championships has this team won?')
  );
}
function buildLeagueTeamToLastTitleDeck() {
  return NBA_TEAMS.map(t =>
    makeCard(t.name, _legacyHTML(t.lastTitle || 'N/A', 'Last Title Year', null), 'When did this team last win a championship?')
  );
}

// -- League-wide team deck builders (all 30 teams) --
function buildLeagueTeamToCityDeck()         { return NBA_TEAMS.map(t => makeCard(t.name, t.city,         'What city does this team play in?')); }
function buildLeagueTeamToConferenceDeck()   { return NBA_TEAMS.map(t => makeCard(t.name, t.conference,   'What conference is this team in?')); }
function buildLeagueTeamToDivisionDeck()     { return NBA_TEAMS.map(t => makeCard(t.name, t.division,     'What division is this team in?')); }
function buildLeagueTeamToAbbreviationDeck() { return NBA_TEAMS.map(t => makeCard(t.name, t.abbreviation, 'What is the abbreviation for this team?')); }
function buildLeagueTeamToCoachDeck()       { return NBA_TEAMS.filter(t => t.coach).map(t => makeCard(t.name, t.coach, "Who is this team's head coach?")); }
function buildLeagueTeamToCoachPrevTeamDeck() {
  return NBA_TEAMS.filter(t => t.coach).map(t => {
    const prev = t.coachPrevTeam;
    let answer;
    if (!prev || (prev.team && prev.team === 'None') || prev === 'None') {
      answer = '<div class="back-career-block"><div class="back-career-entry"><span class="back-career-team" style="font-size:22px;font-weight:700;">None</span><span class="back-career-dur" style="font-size:13px;opacity:0.9;color:rgba(180,144,255,0.9);">First NBA coaching job</span></div></div>';
    } else if (typeof prev === 'object' && prev.team) {
      answer = '<div class="back-career-block"><div class="back-career-entry">' +
        '<span class="back-career-team" style="font-size:22px;font-weight:700;">' + prev.team + '</span>' +
        '<span class="back-career-dur" style="font-size:13px;opacity:0.9;color:rgba(180,144,255,0.9);">' + prev.role + '</span>' +
        '</div></div>';
    } else {
      answer = '<div class="back-career-block"><div class="back-career-entry"><span class="back-career-team" style="font-size:22px;font-weight:700;">' + String(prev) + '</span></div></div>';
    }
    return makeCard(t.coach, answer, "What was this head coach's most recent previous NBA team?");
  });
}
function buildLeagueTeamToCoachSinceDeck() {
  return NBA_TEAMS.filter(t => t.coach && t.coachSince).map(t => {
    const answer = '<div class="back-conf-block">' +
      '<span class="back-conf-label">Current Team</span>' +
      '<span class="back-conf-val">' + t.name + '</span>' +
      '<span class="back-conf-label">Head Coach Since</span>' +
      '<span class="back-conf-val" style="font-size:28px;">' + t.coachSince + '</span>' +
      '</div>';
    return makeCard(t.coach, answer, "What year did this head coach join their current team?");
  });
}
function buildLeagueTeamToCoachingStaffDeck() {
  return NBA_TEAMS.filter(t => TEAM_COACHING_STAFF[t.name]).map(t => {
    const staff = TEAM_COACHING_STAFF[t.name];
    const headLabel = '<span class="back-career-dur" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:2px;">Head Coach</span>';
    const headRow = '<div class="back-career-entry"><span class="back-career-team" style="font-size:20px;font-weight:600;">' + staff.head + '</span></div>';
    const assistLabel = '<span class="back-career-dur" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-top:8px;margin-bottom:2px;">Assistants</span>';
    const assistRows = staff.assistants.map(a =>
      '<div class="back-career-entry"><span class="back-career-team" style="font-size:18px;font-weight:500;">' + a + '</span></div>'
    ).join('');
    const answer = '<div class="back-career-block" style="gap:6px;">' + headLabel + headRow + assistLabel + assistRows + '</div>';
    return makeCard(t.name, answer, "Who is on this team's current coaching staff?");
  });
}
function buildLeagueTeamToRosterDeck() {
  return NBA_TEAMS.filter(t => LEAGUE_ROSTERS[t.name]).map(t => {
    const rosterArr = LEAGUE_ROSTERS[t.name];
    const lineup    = LEAGUE_LINEUPS[t.name] || {};
    const starterPos = {};
    Object.entries(lineup).forEach(([slot, name]) => { starterPos[name] = slot; });
    const starters = rosterArr.filter(p => p && starterPos[p.name]);
    const bench    = rosterArr.filter(p => p && !starterPos[p.name]).sort((a,b) => a.name.localeCompare(b.name));
    const starterLabel = '<span class="back-career-dur" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:2px;">Starters</span>';
    const benchLabel   = '<span class="back-career-dur" style="font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-top:8px;margin-bottom:2px;">Bench</span>';
    const rows = starterLabel + starters.map(p => _rosterRowHTML(p, starterPos)).join('') +
                 benchLabel   + bench.map(p => _rosterRowHTML(p, starterPos)).join('');
    const answer = '<div class="back-career-block" style="gap:4px;">' + rows + '</div>';
    return makeCard(t.name, answer, "Who are the current players on this team's roster?");
  });
}

// ── League-wide roster + lineup maps (for League Knowledge builders) ─────────
const LEAGUE_ROSTERS = {
  "Utah Jazz":                Array.from(TEST_ROSTER),
  "Dallas Mavericks":         MAVS_ROSTER,
  "Denver Nuggets":           NUGGETS_ROSTER,
  "Houston Rockets":          ROCKETS_ROSTER,
  "Golden State Warriors":    GSW_ROSTER,
  "LA Clippers":              CLIPPERS_ROSTER,
  "Los Angeles Lakers":       LAKERS_ROSTER,
  "Memphis Grizzlies":        GRIZZLIES_ROSTER,
  "Minnesota Timberwolves":   TWOLVES_ROSTER,
  "New Orleans Pelicans":     PELICANS_ROSTER,
  "Oklahoma City Thunder":    OKC_ROSTER,
  "Phoenix Suns":             SUNS_ROSTER,
  "Portland Trail Blazers":   BLAZERS_ROSTER,
  "Sacramento Kings":         KINGS_ROSTER,
  "San Antonio Spurs":        SPURS_ROSTER,
  "Atlanta Hawks":            HAWKS_ROSTER,
  "Boston Celtics":           CELTICS_ROSTER,
  "Brooklyn Nets":            NETS_ROSTER,
  "Charlotte Hornets":        HORNETS_ROSTER,
  "Chicago Bulls":            BULLS_ROSTER,
  "Cleveland Cavaliers":      CAVS_ROSTER,
  "Detroit Pistons":          PISTONS_ROSTER,
  "Indiana Pacers":           PACERS_ROSTER,
  "Miami Heat":               HEAT_ROSTER,
  "Milwaukee Bucks":          BUCKS_ROSTER,
  "New York Knicks":          KNICKS_ROSTER,
  "Orlando Magic":            MAGIC_ROSTER,
  "Philadelphia 76ers":       SIXERS_ROSTER,
  "Toronto Raptors":          RAPTORS_ROSTER,
  "Washington Wizards":       WIZARDS_ROSTER,
};

const LEAGUE_LINEUPS = {
  "Utah Jazz":                JAZZ_STARTING_LINEUP,
  "Dallas Mavericks":         MAVS_STARTING_LINEUP,
  "Denver Nuggets":           NUGGETS_STARTING_LINEUP,
  "Houston Rockets":          ROCKETS_STARTING_LINEUP,
  "Golden State Warriors":    GSW_STARTING_LINEUP,
  "LA Clippers":              CLIPPERS_STARTING_LINEUP,
  "Los Angeles Lakers":       LAKERS_STARTING_LINEUP,
  "Memphis Grizzlies":        GRIZZLIES_STARTING_LINEUP,
  "Minnesota Timberwolves":   TWOLVES_STARTING_LINEUP,
  "New Orleans Pelicans":     PELICANS_STARTING_LINEUP,
  "Oklahoma City Thunder":    OKC_STARTING_LINEUP,
  "Phoenix Suns":             SUNS_STARTING_LINEUP,
  "Portland Trail Blazers":   BLAZERS_STARTING_LINEUP,
  "Sacramento Kings":         KINGS_STARTING_LINEUP,
  "San Antonio Spurs":        SPURS_STARTING_LINEUP,
  "Atlanta Hawks":            HAWKS_STARTING_LINEUP,
  "Boston Celtics":           CELTICS_STARTING_LINEUP,
  "Brooklyn Nets":            NETS_STARTING_LINEUP,
  "Charlotte Hornets":        HORNETS_STARTING_LINEUP,
  "Chicago Bulls":            BULLS_STARTING_LINEUP,
  "Cleveland Cavaliers":      CAVS_STARTING_LINEUP,
  "Detroit Pistons":          PISTONS_STARTING_LINEUP,
  "Indiana Pacers":           PACERS_STARTING_LINEUP,
  "Miami Heat":               HEAT_STARTING_LINEUP,
  "Milwaukee Bucks":          BUCKS_STARTING_LINEUP,
  "New York Knicks":          KNICKS_STARTING_LINEUP,
  "Orlando Magic":            MAGIC_STARTING_LINEUP,
  "Philadelphia 76ers":       SIXERS_STARTING_LINEUP,
  "Toronto Raptors":          RAPTORS_STARTING_LINEUP,
  "Washington Wizards":       WIZARDS_STARTING_LINEUP,
};

function buildLeaguePlayerStarterBenchDeck() {
  const cards = [];
  NBA_TEAMS.filter(t => LEAGUE_ROSTERS[t.name] && LEAGUE_LINEUPS[t.name]).forEach(t => {
    const lineup   = LEAGUE_LINEUPS[t.name];
    const starterNames = new Set(Object.values(lineup));
    const roster   = LEAGUE_ROSTERS[t.name];
    Array.from(roster).filter(p => p && p.name).forEach(p => {
      const label  = starterNames.has(p.name) ? 'Starter' : 'Bench';
      const answer = label + ' — ' + t.name;
      cards.push(makeCard(p.name, answer, 'Is this player a starter or bench player?'));
    });
  });
  return cards;
}

// ── League Knowledge flat-mode builders ────────────────────────────────────
function buildLeagueStarterPlayerTeamDeck() {
  // 150 cards: each starter from each team's starting lineup → their team
  const cards = [];
  NBA_TEAMS.filter(t => LEAGUE_LINEUPS[t.name]).forEach(t => {
    const lineup = LEAGUE_LINEUPS[t.name];
    Object.values(lineup).forEach(playerName => {
      if (playerName && playerName !== '—') {
        cards.push(makeCard(playerName, t.name, 'Which team does this player start for?'));
      }
    });
  });
  // Shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

function buildLeagueMixedDeck() {
  // 270 cards: all 5 modes combined and shuffled
  const deck = [
    ...buildLeagueStarterPlayerTeamDeck(),   // 150
    ...buildLeagueTeamToStarting5Deck(),      // 30
    ...buildLeagueTeamToRosterDeck(),         // 30
    ...buildLeagueTeamToCoachDeck(),          // 30
    ...buildLeagueTeamToBestPlayerDeck(),     // 30
  ];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// ── New Team Mastery builder functions ──────────────────────────────────────
const TEAM_BEST_PLAYER = {
  "Phoenix Suns":              "Devin Booker",
  "Oklahoma City Thunder":     "Shai Gilgeous-Alexander",
  "Brooklyn Nets":             "Michael Porter Jr.",
  "Denver Nuggets":            "Nikola Jokic",
  "Portland Trail Blazers":    "Damian Lillard",
  "Orlando Magic":             "Paolo Banchero",
  "San Antonio Spurs":         "Victor Wembanyama",
  "Minnesota Timberwolves":    "Anthony Edwards",
  "Memphis Grizzlies":         "Ja Morant",
  "Cleveland Cavaliers":       "Donovan Mitchell",
  "Detroit Pistons":           "Cade Cunningham",
  "Atlanta Hawks":             "Jalen Johnson",
  "Indiana Pacers":            "Tyrese Haliburton",
  "Charlotte Hornets":         "LaMelo Ball",
  "LA Clippers":               "Kawhi Leonard",
  "New Orleans Pelicans":      "Zion Williamson",
  "Toronto Raptors":           "Scottie Barnes",
  "Philadelphia 76ers":        "Tyrese Maxey",
  "Dallas Mavericks":          "Cooper Flagg",
  "Boston Celtics":            "Jaylen Brown",
  "Houston Rockets":           "Kevin Durant",
  "Los Angeles Lakers":        "Luka Doncic",
  "Washington Wizards":        "Anthony Davis",
  "Utah Jazz":                 "Jaren Jackson Jr.",
  "Milwaukee Bucks":           "Giannis Antetokounmpo",
  "Golden State Warriors":     "Stephen Curry",
  "Miami Heat":                "Bam Adebayo",
  "New York Knicks":           "Jalen Brunson",
  "Sacramento Kings":          "Domantas Sabonis",
  "Chicago Bulls":             "Josh Giddey",
};

function buildTeamToBestPlayerDeck(team, lineup) {
  const best = TEAM_BEST_PLAYER[team.name] || Object.values(lineup || _activeLineup)[0] || 'N/A';
  return [makeCard(team.name, best, "Who is this team's best player?")];
}
// Maps full team names → nickname only, for compact draft info display.
// Covers all 30 NBA teams so this works for any future roster additions.
const TEAM_NICKNAME_MAP = {
  "Atlanta Hawks":"Hawks","Boston Celtics":"Celtics","Brooklyn Nets":"Nets",
  "Charlotte Hornets":"Hornets","Chicago Bulls":"Bulls","Cleveland Cavaliers":"Cavaliers",
  "Dallas Mavericks":"Mavericks","Denver Nuggets":"Nuggets","Detroit Pistons":"Pistons",
  "Golden State Warriors":"Warriors","Houston Rockets":"Rockets","Indiana Pacers":"Pacers",
  "LA Clippers":"Clippers","Los Angeles Clippers":"Clippers","Los Angeles Lakers":"Lakers",
  "Memphis Grizzlies":"Grizzlies","Miami Heat":"Heat","Milwaukee Bucks":"Bucks",
  "Minnesota Timberwolves":"Timberwolves","New Jersey Nets":"Nets",
  "New Orleans Pelicans":"Pelicans","New York Knicks":"Knicks",
  "Oklahoma City Thunder":"Thunder","Orlando Magic":"Magic",
  "Philadelphia 76ers":"76ers","Phoenix Suns":"Suns",
  "Portland Trail Blazers":"Trail Blazers","Sacramento Kings":"Kings",
  "San Antonio Spurs":"Spurs","Seattle SuperSonics":"SuperSonics",
  "Toronto Raptors":"Raptors","Utah Jazz":"Jazz","Washington Wizards":"Wizards",
};
function getDraftTeamNickname(fullName) {
  return TEAM_NICKNAME_MAP[fullName] || fullName;
}

function buildPlayerToDraftInfoDeck(roster) {
  return Array.from(roster).filter(p => p && p.name && p.draft_year).map(p => {
    const answer = (p.draft_pick === 'Undrafted' || p.draft_team === 'Undrafted')
      ? 'Undrafted'
      : p.draft_year + ' · ' + p.draft_pick + ' · ' + getDraftTeamNickname(p.draft_team);
    return makeCard(p.name, answer, "What were " + p.name + "'s draft year, pick, and team?");
  });
}
// ── End new Team Mastery builder functions ────────────────────────────────────

// Active team switcher — set by lpSelectTeamNew
let _activeTeam   = TEST_TEAM;
let _activeRoster = TEST_ROSTER;
let _activeLineup = JAZZ_STARTING_LINEUP;

// -- Mode registry --
const MODE_BUILDERS = {
  // Team Mastery — Player modes (Jazz roster)
  player_position:        () => buildPlayerToPositionDeck(_activeRoster),
  player_jersey:          () => buildPlayerToJerseyDeck(_activeRoster),
  player_height:          () => buildPlayerToHeightDeck(_activeRoster),
  player_college:         () => buildPlayerToCollegeDeck(_activeRoster),
  player_team:            () => buildPlayerToTeamDeck(_activeRoster),
  player_country_hometown: () => buildPlayerToCountryHometownDeck(_activeRoster),
  player_past_teams:      () => buildPlayerToPastTeamsDeck(_activeRoster),
  team_roster:            () => buildTeamToRosterDeck(_activeTeam, _activeRoster),
  player_starter_bench:   () => buildPlayerToStarterBenchDeck(_activeRoster),
  player_years_on_team:   () => buildPlayerToYearsOnTeamDeck(_activeRoster),
  team_starting_pos:      () => buildTeamToStartingPosDeck(_activeTeam.name),
  team_starting_5:        () => buildTeamToStarting5Deck(_activeTeam),
  team_coaching_staff:    () => buildTeamToCoachingStaffDeck(_activeTeam),
  player_draft_year_pick: () => buildPlayerToDraftYearPickDeck(_activeRoster),
  player_draft_team:      () => buildPlayerToDraftTeamDeck(_activeRoster),
  // Team Mastery — Team modes (Jazz)
  team_city:              () => buildTeamToCityDeck(_activeTeam),
  team_conference:        () => buildTeamToConferenceDeck(_activeTeam),
  team_colors:            () => buildTeamToColorsDeck(_activeTeam),
  team_division:          () => buildTeamToDivisionDeck(_activeTeam),
  team_champs:            () => buildTeamToChampsDeck(_activeTeam),
  team_last_title:        () => buildTeamToLastTitleDeck(_activeTeam),
  team_rookies_of_year:   () => buildTeamToRookiesOfYearDeck(_activeTeam),
  team_all_time_defensive_leader: () => buildTeamToAllTimeDefensiveLeaderDeck(_activeTeam),
  team_all_time_rebounds_leader:  () => buildTeamToAllTimeReboundsLeaderDeck(_activeTeam),
  team_all_time_scorer:           () => buildTeamToAllTimeScorerDeck(_activeTeam),
  team_all_time_assists:          () => buildTeamToAllTimeAssistsDeck(_activeTeam),
  team_best_player:       () => buildTeamToBestPlayerDeck(_activeTeam, _activeLineup),
  player_draft_info:      () => buildPlayerToDraftInfoDeck(_activeRoster),
  team_coach:             () => buildTeamToCoachDeck(_activeTeam),
  team_coach_prev_team:   () => buildTeamToCoachPrevTeamDeck(_activeTeam),
  team_coach_since:       () => buildTeamToCoachSinceDeck(_activeTeam),
  // League Knowledge — Player modes (all teams)
  league_player_past_teams:   () => buildLeaguePlayerPastTeamsDeck(),
  league_player_jersey:   () => buildPlayerToJerseyDeck(NBA_PLAYERS),
  league_player_country_hometown: () => buildPlayerToCountryHometownDeck(NBA_PLAYERS),
  league_player_height:   () => buildPlayerToHeightDeck(NBA_PLAYERS),
  league_player_college:  () => buildPlayerToCollegeDeck(NBA_PLAYERS),
  league_player_team:     () => buildPlayerToTeamDeck(NBA_PLAYERS),
  league_player_position: () => buildPlayerToPositionDeck(NBA_PLAYERS),
  // League Knowledge — Team modes (all 30 teams)
  // League Knowledge — simplified flat modes
  league_starter_player_team: () => buildLeagueStarterPlayerTeamDeck(),
  league_mixed:               () => buildLeagueMixedDeck(),
  league_team_city:           () => buildLeagueTeamToCityDeck(),
  league_team_conference:     () => buildLeagueTeamToConferenceDeck(),
  league_team_division:       () => buildLeagueTeamToDivisionDeck(),
  league_team_coach:          () => buildLeagueTeamToCoachDeck(),
  league_team_coach_prev_team: () => buildLeagueTeamToCoachPrevTeamDeck(),
  league_team_coach_since:     () => buildLeagueTeamToCoachSinceDeck(),
  league_team_champs:             () => buildLeagueTeamToChampsDeck(),
  league_team_last_title:         () => buildLeagueTeamToLastTitleDeck(),
  league_team_rookies_of_year:   () => buildLeagueTeamToRookiesOfYearDeck(),
  league_team_all_time_defensive_leader: () => buildLeagueTeamToAllTimeDefensiveLeaderDeck(),
  league_team_all_time_rebounds_leader:  () => buildLeagueTeamToAllTimeReboundsLeaderDeck(),
  league_team_all_time_scorer:           () => buildLeagueTeamToAllTimeScorerDeck(),
  league_team_all_time_assists:          () => buildLeagueTeamToAllTimeAssistsDeck(),
  league_team_coaching_staff: () => buildLeagueTeamToCoachingStaffDeck(),
  league_team_roster:         () => buildLeagueTeamToRosterDeck(),
  league_team_starting_pos:   () => buildLeagueTeamToStartingPosDeck(),
  league_team_starting_5:     () => buildLeagueTeamToStarting5Deck(),
  league_team_best_player:    () => buildLeagueTeamToBestPlayerDeck(),
  league_draft_top10:         () => buildLeagueDraftYearTop10Deck(),
  league_player_starter_bench: () => buildLeaguePlayerStarterBenchDeck(),
};

// -- Mode display titles --
const SESSION_MODE_TITLES = {
  player_position:        'Player → Position',
  player_jersey:          'Player → Jersey #',
  player_height:          'Player → Height',
  player_college:         'Player → College',
  player_team:            'Player → Team',
  player_country_hometown: 'Player → Country & Hometown',
  player_past_teams:      'Player → Past Teams',
  team_roster:            'Team → Rotation (10)',
  player_starter_bench:   'Player → Starter/Bench',
  player_years_on_team:   'Player → Years on Team',
  team_starting_pos:      'Team → Starting Position',
  team_starting_5:        'Team → Starting 5',
  team_coaching_staff:    'Team → Coaching Staff',
  player_draft_year_pick: 'Player → Draft Year & Pick',
  player_draft_team:      'Player → Draft Team',
  team_city:              'Team → City',
  team_conference:        'Team → Conference',
  team_colors:            'Team → Colors',
  team_division:          'Team → Division',
  team_champs:            'Team → Championships',
  team_last_title:        'Team → Last Title Year',
  team_rookies_of_year:   'Team → Rookies of the Year',
  team_all_time_defensive_leader: 'Team → All-Time Defensive Leader',
  team_all_time_rebounds_leader:  'Team → All-Time Rebounds Leader',
  team_all_time_scorer:           'Team → All-Time Scorer',
  team_all_time_assists:          'Team → All-Time Assists Leader',
  team_best_player:       'Team → Best Player',
  player_draft_info:      'Player → Draft Info',
  team_coach:             'Team → Head Coach',
  team_coach_prev_team:   'Head Coach → Previous Team',
  team_coach_since:       'Head Coach → Team Since',
  league_player_jersey:   'Player → Jersey Number',
  league_player_country_hometown: 'Player → Country & Hometown',
  league_player_height:   'Player → Height',
  league_player_college:  'Player → College',
  league_player_team:     'Player → Team',
  league_player_position: 'Player → Position',
  league_starter_player_team: 'Player → Team',
  league_mixed:               'Random Mode',
  league_team_city:         'Team → City',
  league_team_conference:     'Team → Conference',
  league_team_division:       'Team → Division',
  league_team_coach:           'Team → Head Coach',
  league_team_coach_prev_team: 'Head Coach → Previous Team',
  league_team_coach_since:     'Head Coach → Team Since',
  league_player_past_teams:       'Player → Past Teams',
  league_team_champs:             'Team → Championships',
  league_team_last_title:         'Team → Last Title Year',
  league_team_rookies_of_year:   'Team → Rookies of the Year',
  league_team_all_time_defensive_leader: 'Team → All-Time Defensive Leader',
  league_team_all_time_rebounds_leader:  'Team → All-Time Rebounds Leader',
  league_team_all_time_scorer:           'Team → All-Time Scorer',
  league_team_all_time_assists:          'Team → All-Time Assists Leader',
  league_team_coaching_staff: 'Team → Coaching Staff',
  league_team_roster:         'Team → Roster',
  league_team_starting_pos:   'Team → Starting Position',
  league_team_starting_5:     'Team → Starting 5',
  league_team_best_player:    'Team → Best Player',
  league_draft_top10:         '🎟️ Draft Year → Top 10 Picks',
  league_player_starter_bench: 'Player → Starter/Bench',
};

// -- Session state for the generic card engine --
