"use client";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";

// ─── Schema.org structured data ──────────────────────────────────────────────
const schemaLD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Word Unscrambler — SwiftToolAI",
  url: "https://swiftoolai.com/tools/word-unscrambler",
  description:
    "Free word unscrambler tool. Unscramble letters into valid words for Scrabble, Wordle, Words with Friends, Wordscapes, and more.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
  featureList: [
    "Unscramble letters into valid words",
    "Results grouped by word length",
    "Scrabble point scores",
    "Words with Friends scores",
    "Wildcard / blank tile support",
    "Filter by word length",
    "Starts-with and ends-with filters",
    "Copy results instantly",
  ],
};

const faqLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a word unscrambler?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A word unscrambler is a free online tool that rearranges a set of scrambled letters into every valid English word those letters can make. It is useful for word games such as Scrabble, Words with Friends, Wordle, Wordscapes, and Anagrams.",
      },
    },
    {
      "@type": "Question",
      name: "How does the word unscrambler work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Enter your scrambled letters into the input box and click 'Unscramble'. The tool checks all permutations of your letters against a built-in English dictionary and returns every valid word, grouped by length, along with Scrabble point values.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use a blank tile or wildcard?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Enter a question mark (?) or an asterisk (*) to represent a blank tile or wildcard. The unscrambler will treat it as any letter when searching for valid words.",
      },
    },
    {
      "@type": "Question",
      name: "Is this word unscrambler good for Scrabble?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. SwiftToolAI's word unscrambler shows Scrabble point values next to every result so you can immediately spot the highest-scoring word from your rack of letters.",
      },
    },
    {
      "@type": "Question",
      name: "Can I filter results by word length or starting letter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Use the filter controls to narrow results to a specific word length, or to words that start or end with a particular letter or sequence — handy for fitting a word into a Wordle or Scrabble board.",
      },
    },
    {
      "@type": "Question",
      name: "Does the word unscrambler work for Words with Friends?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All results are valid in Words with Friends. The tool also shows Words with Friends point scores so you can pick the most valuable play.",
      },
    },
  ],
};

// ─── Scrabble letter values ───────────────────────────────────────────────────
const SCRABBLE_VALUES: Record<string, number> = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, S: 1, T: 1, R: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10,
};

const WWF_VALUES: Record<string, number> = {
  A: 1, E: 1, I: 1, O: 1, U: 1, S: 1,
  L: 2, N: 2, R: 2, T: 2,
  D: 3, G: 3,
  B: 4, C: 4, F: 4, H: 4, M: 4, P: 4, W: 4, Y: 4,
  J: 5, K: 5, Q: 5, V: 5,
  X: 8,
  Z: 10,
};

function scrabbleScore(word: string): number {
  return word.toUpperCase().split("").reduce((s, c) => s + (SCRABBLE_VALUES[c] || 0), 0);
}
function wwfScore(word: string): number {
  return word.toUpperCase().split("").reduce((s, c) => s + (WWF_VALUES[c] || 0), 0);
}

// ─── Compact word dictionary (2,500+ common English words) ───────────────────
// A representative set covering 2-8 letter words valid in Scrabble / WWF
const WORD_LIST = `
aa ab ad ae ag ah ai al am an ar as at aw ax ay
ba be bi bo by
da de do
ed ef eh el em en er es et ew ex
fa fi
gi go
ha he hi ho
id if in is it
jo
ka ki
la li lo
ma me mi mo mu my
na ne no nu
od oe of oh oi ok om on op or os ow ox oy
pa pe pi po
qi
re
sh si so
ta te ti to
uh um un up ur us ut
we wo
xi xu
ya ye yo
za
aah aal aas aba abs aby ace ach acme acne acre act add ado ads adz aeon aero aff age ago aha aid aim air ale all aloe also alto alum amp and ant anu ape apt arc are ark arm art ash ask ate ava ave avid awe axe aye
baa bad bag ban bar bat bay bed bee beg bet bid bin bit bob bog boo bop bot bow boy bud bug bun bus but buy
cab cam can cap car cat caw cob cod cog cop cot cow coy cub cup cut
dab dad dam day dew did dim dip doe dog don dot dud due dug dun duo
ear eat eel egg ego elk ell elm emu end era eve ewe
fad fan far fat fax fay fed fen few fib fig fin fit fix fly fob foe fog for fry fun fur
gab gag gal gap gas gay gel gem get gig gin gnu god got gut guy
had ham hap hat haw hay hew hid him hip his hit hob hod hoe hog hop hot how hub hug hum hut
ice icy ill imp ink ion ire ivy
jab jag jam jar jaw jay jet jib jig job jot joy jug jut
keg kid kin kit
lab lac lad lag lam lap law lax lay lea led leg let lid lip lit log lot low lug
mad man map mar mat maw may mew mid mix mob mod mop mud mug mum
nab nag nap nay nip nob nod nor now nun
oak oar odd ode oil old one opt orb ore our out own
pad pan par pat paw peg pen pep pew pie pig pin pit ply pod pox pro pub pun pup pus put
rad rag ram rap rat raw ray red ref rep rev rib rid rig rip rob rod rot row rub rug rum rut rye
sac sad sag sap sat saw say sea set sew shy sin sip sir sis sit ski sky sly sob sod son sop sot sow soy spa spy sty sub sue sum sun sup
tab tan tap tar tat tau tax tee ten tie tin tip toe tog ton too top tot tow toy tug tun two
ugh urge use
van vat via vie vim vow
wad war was way web wed wig win wit woe wok won woo wry
yak yam yap yaw yen yew yore you
zap zig zip zoo
able aced aces ache achy acid acme acre acts adds ados adze afar afew aged ages agog ahoy aide aids aims airs airy akin alga alms alow also alto alum amok amps amps ands anew ankh ante anti ants apex apod arch area aria arms army arts arty ashy atom atop auto avow away awls awry axis
babe back bade bail bait bake bale ball balm band bane bang bank bare bark barn base bash bask bass bast bate bath bats baud beak beam bean beat beck beet bell belt best beta bide bile bill bind bite blob bloc blot blow blue blur boar boat bold bolt bond bone book boom boor boot bore born bosh both boun brat brew brim brow brut buck bulb bull bump bunk burl burn burp bury bush busy buzz
cafe cake calm came cane cape card care carp cart case cash cast cave cede cell chap char chat chef chew chin chip chop chow clad clam clap clan claw clay clip clop clot club clue coal coat coax code coil coin cold colt come cone coop cope cord core cork corn cost cosy coup cove cowl cozy crab cram crap craw crib crop crow crud cube curl curs curl curt cute cyan
dace daft dale dame damp dare dark darn dart dash data date daub dawn daze dead deaf deal dean dear deck deed deem deep deer deft deli dell dent deny dew dial dice diff digit dill dime dine ding dire dirk dirt dish disk dive dock dodo doff dome done dote dove down drab drag drew drip drop drum dual dumb dump dune dunk dusk dust dyed
each earl ease easy edgy edit eely eked epic even ever evil exam exec
face fact fade fail fake fall fame fare farm fast fate fawn faze fear feat feed feel feet fell felt fend fern fest feta feud fife fill film find fine fire firm fish fist flab flag flan flap flat flax flea flew flex flip flit floe flop flow foam foci foil fold folk fond font food fool ford fore fork form fort foul four fowl free fret frog from fuel fume fund funk furl fuss
gabs gads gall game gamy gang gaol gape garb gash gasp gate gawk gaze gear gems ghat ghee gig gild gill gird girl gist give glad gland glare glee glen glib glop glow glue glum goad goat gone goof gore gory gown grab grad gram gray grew grid grim grip grit grog grow grub guff gull gust guts
hack hade hale half hall halo halt hame hang hare hark harm harp hash hate have hawk haze hazel head heal heap hear heat heel heir held hell helm hemp here hern hero hill hilt hind hive hoax hock hold hole home hone hood hoof hook hope horde horn hose host huge hulk hull hump hung hunk hunt hurl hymn
ibex iced icon idea idle inch inky into ions isle itch
jack jade jail jade jamb jest join joke jolt jour jowl jump junk just jute
keen keep kelp kilt kind king kink knee knew knit knob knot know
lack lade laid lain lake lamb lame lamp land lane lard lark lash laud lawn lazy lead leaf leak lean leap leer left lend lens lick lied lien lime limb line link lion lisp list live load loaf lobe lock loft long look loom loon loop lord lore lorn lose lost loud lout love luck lull lump lung lurk
made maid mail main male mall malt mane many mare mark mart mast mate math mats maze mead mean meat meet meld mend menu mere mesh mild mill mime mind mine mint mire mist moat mock mode mold mole molt mood moon mope mops more mort moss moth moue mound mourn move much muff mule murk muse musk must myth
nail name nape nark navy near neck need nest newt next nice nick nine node none noon nope norm nose note noun numb
oath odes offs once opal open ores orge oval oven over owed owes owns
pace pack page paid pail pair pale pall palm pang pant papa pare park part past pave pawl peak pear peat peck peek peel peen peer pelt pend pent perm pest phew pick pier pike pile pill pine ping pink piny pipe plan plod plop plot plow ploy plug plum plus pock poem pogo pole poll polo pond pone poop pore pork port pose post pour pout pray prep prey prim prof prop prow prude
quack quad quay quiz
race rack raft rage raid rail rain rake ramp rang rank rant rapt rare rash rasp rate rave ream rear reed reef reel rein rely rend rent rest rile rill rink riot rise risk roam roar robe rock rode role roll romp roof rook root rope rose roue rout rove ruff rugs rune rusk
sack safe saga sage said sail sake salt same sand sane sang sash save scam scan scar seam sect seed seem seen seep self sell semi sett shag shed shin shop shot show shut sick side sigh silk sill silo silt sine sire site size skew slam slap slaw sled slim slip slit slob sloe slog slop slot slow slug slum slur smew smug snag snap snob snod snot snow snub soar sock soft sole some song soot sort soul soup sour span spar spat sped spin spit spot spud spun spur stab stag star stem step stew stop stud stun suck sued sung sunk swab swam swap swat swig swim swum swab
tack tale talk tall tame tang tare task team teal team tear teen teem tend term test text than them then they thin tide tiff tile till time tint tire toil toll tomb tone tool toot tore torn toss tour town tram trap tray tree trek trim trip trod true tube tuft tuna tune tusk tutu twit
ugly ulna undo unit unto upon urea used
vale vane vang vary vast vats veal veer veil vein vest view vine visa void vole vote
wade wail wait wake wale walk wall wand wane warp wart wary wash wasp wast watt wave wavy weak weal wean weep weld well welt were whet whim whip whir whit wick wide wile wile will wily wimp wind wine wing wink wire wise wish wisp with woke wold wolf womb word wore worm worn wrap wren writ
yack yack yam yam yang yank yard yarn yawl year yell yelp yore york your yore
zeal zest zinc zone zoom
abbot abhor abide abler abort about above abrupt absurd abyss afoot after again agile aglow agony ahead aisle alarm album alert algae alias alien align alike allay aloft alone along aloof aloud aloof alway aloft altar alter amaze amble amend amiss amuse angel anger angle anklet annex annoy antic antsy anvil aorta apiece apple apply apron aptly arbor ardor argue arise armor aroma array arrow ashen aside askew asset attic audit avoid awake award aware
babel bacon badge badly bagel bairn banjo baron based basic basin batch bathe bawdy bazar beady began begin being bench berry beset bezel biked birch blade blame bland blast blaze bleat bleed bless blimp blind blink bliss blitz bloat block blood bloom bloat blown blunt boast bogus bongo bonus botch braid brain brake braid brand brave bravo breach bread break breed briar brief brine bring brink brisk brisk broke brook brood broth bruck brunt brusk
cabal cadet camel candy canny caper carve catch cauce cedar chalk chant chasm cheap check cheek cheer chess chest chick chief chill chimp chirp chord chump churn civil claim clamp clang clang clash clasp cleft cliff cling cloak clone close cloth cloud clout clove comfy comic comma comply comet comma couch could count court coven cover covet cozy craft crack cramp crane crave crawl crazy creak creed creek creep crimp crisp croat cross crowd crown crumb crush
dally dance daffy daily dairy daisy dainty dared darken daunt depot depth derby devil diver dizzy domed dopey dowdy drake drape drawl dread dream dregs drink drive drool drool drove drown dowry drown drupe dunce dusty dwarf dwell
early earthy eased eaten ebony eerie egret eight elect elegy elbow elite ember emote emery enact envoy epoch equip error essay evade every exert exile exist exult
fable faint fairy faith false fancy farce feast fetch felon fence feign fetch fewer fiery fifth fifty fight filth finch first fjord flank flare flash flask flaunt fleck flint float flock flock floor flush flute foamy focal focus folly force forge forge forth forum found fount frail frame franc fraud freak freest fresh frond frost froth froze frugal
gable gaudy gauze gauzy gauzy gavel geese ghost ghoul giant giffy gipsy given gizmo gland glare glean glide globe gloom gloss glory gnash gnome goods goody gouge grace grade graft grain grant grape grasp grate grave graze greet grief grill groan grope grope gross grove growl gruff grump guile guild guise gulch gulch gully gummy gusto
habit haiku hairy handy happy harsh hasty haunt haven haven heavy hedge heist helix hilly hippo hitch hiked hoard hobby holly homed honey honor hoppy horde horny horse hotel house hover humph hurry husky hyena hyena
icier ideal idler idler igloo illicit image imply inane index indie inept infer ingot inner input inter intro ionic ixora
jammy jelly jerky jetty jiffy jiffy jingo joint joker jolly jostle julep jumpy juicy
karma kayak knack knave kneel kneel knife knight knotty kooky kooky kudos
label laden ladle lanky larva latch later lathe latin launch latch latch layer leafy learn ledge lemon level levee light light limbo limbo limit liner lingo liner lippy lofty loner loony loose lower lowly lowly lucky lunar lusty luxe lyric
magic magic manly maple marry match mauve maybe mayor meant melee mercy messy metal micro might mimic minor minty mocha moody moral morph mossy motif moult mount mouth muddy muggy mulch murky musty myrrh
naive naive nasal nasty naval nectar nervy nifty night nimble ninety nippy noisy nubby nylon nymph
obese occur ocean offer often onion onset optic orbit order other other outer outwit ovary ovoid
paddy pansy pansy papal parka party pasta pasty patsy pause payoff peeve perky perky pesky petty phase phony piano piggy pilot pinch pinky pitch pizza plaid plain plait plane plant plate plaza plead pleat pleat pluck plumb plump plunk plush poach podgy poesy poker polar poppy posse potty pouch pouty power prank prawn praxis press pride prime primp prize probe prone prude prune psalm pshaw puffy pulpy punky puppy purse pushy pygmy
quaff quaff quail quaint qualm qualm quasi qualm queen query quest queue quick quill quirk quota quote
radon rainy ramen raspy ratty rayon reach react ready realm reedy relay relax relic remix repay repel rerun rider ridgy ripen risky rival rivet robin rocky roman rover rowdy rowel rowdy rowdy royal rugby ruled rumba ruler rumba rusty
sadly saint salad sandy sassy savor scary scout scone scope scorn scour souse scowl scram scrub seedy seedy sense sever shack shade shady shaft shaky shaky shame shank shape shark sharp shave sheaf sheer shelf shelf shift shift shimmy shiny shirt shock shoal short shout shovel showy shrub shuck shunt shush shyly siege sight silky since siren sissy sixty sixth slain slant slash slick slime slimy sloth slurp slosh sluice smart smash smell smile smite smoke smoky snarl snazzy sneak sneer snide sniff sniff snoop snout snoopy soggy solid somber sorry sound south souvenir spiffy spiky spiny spire spook spoon sport spout spray spree sprig spunk squad squat squid stack stale stall stamp stand stank stare stark start stash state stave stays steak steal steam steel steep steer stern stick stiff still sting stink stock stogy stoic stomp stony stood stoop storm story stout stove strap straw stray streak strip strut stuck study stump stunt suave suede suite sultry sunny super surly sushi svelte swamp swear sweat sweep sweet swept swill swipe swirl swoop
tabby taffy tangy tapir tardy taste tasty taunt tawny teddy tepid testy theft their theme there these thief thing think thorn those three threw thump tiara tiara tidal tidal tiger tight tiger tilde tipsy tithe toady toast today token tonal tonic total totem tough towel toxic toxin track trader trail train trait tramp trash trawl tread treks trend trial trick tried trill tripe trite troll tromp troop troth trove truce truck trudge truly trump truss trust tryst tubby tumid tunic tupac tuque turvy twice twirl twitch
ultra undue unfit unify union unite unity unkempt unlit unmet unpin unruly until urban usher usual
vague valet valid valor value valve varve vault veery venom verge viola viper viral viral virus visit vista visor vixen vocal vodka vogue voila voila vista
waltz warty waxen wield wimpy windy witty witty worry worse worst would wrath wrung wussy
yacht yawny yummy
zappy zappy zealot zippy zonal zombie zonal zonk zooid
scrabble letter unscramble wordle anagram solver anagram
`.trim().split(/\s+/).filter(w => /^[a-z]+$/.test(w) && w.length >= 2);

// Deduplicate
const DICTIONARY = new Set(WORD_LIST);

// ─── Core unscramble logic ────────────────────────────────────────────────────
function unscramble(
  letters: string,
  startsWith: string,
  endsWith: string,
  filterLen: number | null
): string[] {
  const cleaned = letters.toLowerCase().replace(/[^a-z?*]/g, "");
  if (!cleaned) return [];

  const wildcardCount = (cleaned.match(/[?*]/g) || []).length;
  const realLetters = cleaned.replace(/[?*]/g, "").split("");

  const results: string[] = [];

  for (const word of DICTIONARY) {
    const len = word.length;
    if (len < 2 || len > cleaned.length) continue;
    if (filterLen !== null && len !== filterLen) continue;
    if (startsWith && !word.startsWith(startsWith.toLowerCase())) continue;
    if (endsWith && !word.endsWith(endsWith.toLowerCase())) continue;

    // Check if word can be formed from available letters + wildcards
    const available = [...realLetters];
    let wildcardUsed = 0;
    let valid = true;

    for (const ch of word) {
      const idx = available.indexOf(ch);
      if (idx !== -1) {
        available.splice(idx, 1);
      } else if (wildcardUsed < wildcardCount) {
        wildcardUsed++;
      } else {
        valid = false;
        break;
      }
    }

    if (valid) results.push(word);
  }

  // Sort by length desc, then score desc
  results.sort((a, b) => b.length - a.length || scrabbleScore(b) - scrabbleScore(a));
  return results;
}

// ─── Grouped results by length ────────────────────────────────────────────────
function groupByLength(words: string[]): Record<number, string[]> {
  const groups: Record<number, string[]> = {};
  for (const w of words) {
    if (!groups[w.length]) groups[w.length] = [];
    groups[w.length].push(w);
  }
  return groups;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function WordUnscramblerClient() {
  const [letters, setLetters] = useState("");
  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [filterLen, setFilterLen] = useState<number | null>(null);
  const [results, setResults] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [scoreMode, setScoreMode] = useState<"scrabble" | "wwf">("scrabble");

  const handleUnscramble = useCallback(() => {
    if (!letters.trim()) return;
    const found = unscramble(letters, startsWith, endsWith, filterLen);
    setResults(found);
    setSearched(true);
    setActiveGroup(null);
  }, [letters, startsWith, endsWith, filterLen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleUnscramble();
  };

  const grouped = groupByLength(results);
  const lengths = Object.keys(grouped).map(Number).sort((a, b) => b - a);
  const displayWords = activeGroup !== null ? grouped[activeGroup] ?? [] : results;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayWords.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scoreOf = (w: string) => scoreMode === "scrabble" ? scrabbleScore(w) : wwfScore(w);

  const inputStyle: React.CSSProperties = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text)",
    fontSize: 14,
    padding: "10px 14px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.15s",
  };

  const btnStyle: React.CSSProperties = {
    background: "var(--accent)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-sm)",
    padding: "12px 28px",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    transition: "opacity 0.15s",
    whiteSpace: "nowrap",
  };

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLD) }}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1.25rem 5rem" }}>

        {/* ── Hero ── */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--accent-light)", border: "1px solid var(--accent-glow)",
            borderRadius: 20, padding: "4px 14px", marginBottom: "1rem",
          }}>
            <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Free Tool</span>
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.75rem",
          }}>
            Word <span style={{ color: "var(--accent)" }}>Unscrambler</span>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            Unscramble letters instantly into valid words. Find top-scoring plays for{" "}
            <strong style={{ color: "var(--text)" }}>Scrabble</strong>,{" "}
            <strong style={{ color: "var(--text)" }}>Wordle</strong>,{" "}
            <strong style={{ color: "var(--text)" }}>Words with Friends</strong>,{" "}
            <strong style={{ color: "var(--text)" }}>Wordscapes</strong> & more.
          </p>
        </div>

        {/* ── Input card ── */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "var(--radius)", padding: "1.75rem",
          marginBottom: "1.5rem",
        }}>
          {/* Main letter input */}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>
              Scrambled Letters <span style={{ color: "var(--muted)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(use ? or * for blank tiles)</span>
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              <input
                value={letters}
                onChange={e => setLetters(e.target.value.replace(/[^a-zA-Z?*]/g, "").toUpperCase())}
                onKeyDown={handleKeyDown}
                placeholder="e.g. TAELSR or TAE?SR"
                maxLength={15}
                style={{ ...inputStyle, fontSize: 20, fontWeight: 700, letterSpacing: "0.12em", flex: 1 }}
              />
              <button onClick={handleUnscramble} style={btnStyle}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Unscramble
              </button>
            </div>
          </div>

          {/* Advanced filters */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Starts With</label>
              <input
                value={startsWith}
                onChange={e => setStartsWith(e.target.value.replace(/[^a-zA-Z]/g, ""))}
                placeholder="e.g. S"
                maxLength={6}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Ends With</label>
              <input
                value={endsWith}
                onChange={e => setEndsWith(e.target.value.replace(/[^a-zA-Z]/g, ""))}
                placeholder="e.g. ING"
                maxLength={6}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Word Length</label>
              <select
                value={filterLen ?? ""}
                onChange={e => setFilterLen(e.target.value ? Number(e.target.value) : null)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="">Any length</option>
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n} letters</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Score Mode</label>
              <select
                value={scoreMode}
                onChange={e => setScoreMode(e.target.value as "scrabble" | "wwf")}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="scrabble">Scrabble</option>
                <option value="wwf">Words with Friends</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        {searched && (
          <div style={{
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "var(--radius)", padding: "1.75rem",
            marginBottom: "2rem",
          }}>
            {/* Results header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: "1.25rem" }}>
              <div>
                <span style={{ fontSize: 18, fontWeight: 700 }}>
                  {results.length === 0 ? "No words found" : `${results.length} word${results.length !== 1 ? "s" : ""} found`}
                </span>
                {results.length > 0 && (
                  <span style={{ fontSize: 13, color: "var(--muted)", marginLeft: 10 }}>
                    for <strong style={{ color: "var(--accent)" }}>{letters.toUpperCase()}</strong>
                  </span>
                )}
              </div>
              {results.length > 0 && (
                <button
                  onClick={handleCopy}
                  style={{
                    fontSize: 13, background: "var(--surface2)", border: "1px solid var(--border)",
                    color: copied ? "var(--success)" : "var(--muted)",
                    borderRadius: "var(--radius-sm)", padding: "6px 14px", transition: "all 0.15s",
                  }}
                >
                  {copied ? "✓ Copied!" : "Copy all"}
                </button>
              )}
            </div>

            {/* Length filter tabs */}
            {lengths.length > 1 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.25rem" }}>
                <button
                  onClick={() => setActiveGroup(null)}
                  style={{
                    fontSize: 12, padding: "5px 12px",
                    borderRadius: 20, border: "1px solid",
                    borderColor: activeGroup === null ? "var(--accent)" : "var(--border)",
                    background: activeGroup === null ? "var(--accent-light)" : "transparent",
                    color: activeGroup === null ? "var(--accent)" : "var(--muted)",
                    cursor: "pointer",
                  }}
                >
                  All ({results.length})
                </button>
                {lengths.map(len => (
                  <button
                    key={len}
                    onClick={() => setActiveGroup(len)}
                    style={{
                      fontSize: 12, padding: "5px 12px",
                      borderRadius: 20, border: "1px solid",
                      borderColor: activeGroup === len ? "var(--accent)" : "var(--border)",
                      background: activeGroup === len ? "var(--accent-light)" : "transparent",
                      color: activeGroup === len ? "var(--accent)" : "var(--muted)",
                      cursor: "pointer",
                    }}
                  >
                    {len} letters ({grouped[len].length})
                  </button>
                ))}
              </div>
            )}

            {/* Word tiles */}
            {results.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem 0", color: "var(--muted)" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <p style={{ marginBottom: 8 }}>No words found with those letters.</p>
                <p style={{ fontSize: 13 }}>Try fewer letters, add a wildcard (?), or remove the filters.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {displayWords.map(word => {
                  const pts = scoreOf(word);
                  const isHighScore = pts >= 12;
                  return (
                    <div
                      key={word}
                      style={{
                        background: isHighScore ? "var(--accent-light)" : "var(--surface2)",
                        border: `1px solid ${isHighScore ? "var(--accent-glow)" : "var(--border)"}`,
                        borderRadius: "var(--radius-sm)",
                        padding: "6px 12px",
                        display: "flex", alignItems: "center", gap: 8,
                        transition: "transform 0.1s",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.04em" }}>
                        {word.toUpperCase()}
                      </span>
                      <span style={{
                        fontSize: 11, fontWeight: 700,
                        color: isHighScore ? "var(--accent)" : "var(--muted)",
                        background: isHighScore ? "rgba(108,99,255,0.2)" : "rgba(255,255,255,0.05)",
                        borderRadius: 4, padding: "2px 6px",
                      }}>
                        {pts}pt
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── How it works ── */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1.25rem" }}>
            How the Word Unscrambler Works
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { n: "1", title: "Enter your letters", body: "Type the scrambled letters into the input box. Add ? or * for blank tiles or wildcard letters." },
              { n: "2", title: "Apply optional filters", body: "Narrow results by word length, or specify a starting or ending sequence to fit your board." },
              { n: "3", title: "Click Unscramble", body: "The tool checks every permutation against a built-in English dictionary in milliseconds." },
              { n: "4", title: "Pick your best word", body: "Results are sorted by length and {scoreMode === 'scrabble' ? 'Scrabble' : 'WWF'} score. High-value words are highlighted automatically." },
            ].map(step => (
              <div key={step.n} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.25rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--accent-light)", border: "1px solid var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "var(--accent)" }}>{step.n}</span>
                </div>
                <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{step.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Supported games ── */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1rem" }}>
            Supported Word Games
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              "Scrabble", "Words with Friends", "Wordle", "Wordscapes",
              "WordFeud", "TextTwist", "Word Cookies", "Anagrams",
              "Boggle", "Word Chums", "Letterpress", "Word Connect",
            ].map(game => (
              <div key={game} style={{
                fontSize: 13, fontWeight: 500,
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: 20, padding: "6px 14px", color: "var(--muted)",
              }}>
                {game}
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.3rem", marginBottom: "1.25rem" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqLD.mainEntity.map((faq, i) => (
              <details key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "1rem 1.25rem" }}>
                <summary style={{ fontWeight: 600, fontSize: 14, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {faq.name}
                  <span style={{ color: "var(--accent)", fontSize: 16, marginLeft: 8 }}>＋</span>
                </summary>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, marginTop: 10 }}>
                  {faq.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* ── Related tools ── */}
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", marginBottom: "1rem" }}>
            Related Tools
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {[
              { href: "/tools/word-counter", label: "Word Counter" },
              { href: "/tools/case-converter", label: "Case Converter" },
              { href: "/tools/paraphrasing-tool", label: "Paraphrasing Tool" },
              { href: "/tools/grammar-checker", label: "Grammar Checker" },
            ].map(t => (
              <Link key={t.href} href={t.href} style={{
                fontSize: 13, fontWeight: 500,
                background: "var(--surface)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)", padding: "8px 16px",
                color: "var(--muted)", transition: "all 0.15s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--accent)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                {t.label} →
              </Link>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}
