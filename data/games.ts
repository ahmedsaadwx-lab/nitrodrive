export type GameType = 'local' | 'iframe' | 'external';

export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  banner?: string;
  category: string;
  subcategory?: string;
  tags: string[];
  gameType: GameType;
  gamePath?: string;
  gameUrl?: string;
  externalUrl?: string;
  embedUrl?: string;
  controls: string[];
  features: string[];
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  technology?: string;
  developer?: string;
  mobileSupported?: boolean;
  fullscreenSupported?: boolean;
  releaseYear?: number;
  multiplayer?: boolean;
  platform?: string;
  source?: string;
  status?: 'available' | 'unavailable';
  rating?: number;
  plays?: number;
  relatedGames?: string[];
  sourceRepository: string;
  sourceUrl?: string;
  sourceDemo?: string;
  license: string;
  featured?: boolean;
  trending?: boolean;
  isNew?: boolean;
  newGame?: boolean;
}

export const games: Game[] = [
  { id:'neon-highway', title:'Neon Highway', slug:'neon-highway', description:'Drive through a neon-lit highway, dodge traffic, chain close-call combos and use nitro to survive as long as possible.', thumbnail:'/images/games/neon-highway.svg', category:'Racing', tags:['racing','arcade','cars','neon','nitro'], gameType:'local', gamePath:'/games/neon-highway/play/index.html', controls:['Arrow keys or mouse to drive','Choose keyboard or mouse controls in the game'], features:['Dynamic weather','Nitro and combo systems','Canvas arcade racing'], sourceRepository:'https://github.com/mk-knight23/MK-NeonRush', sourceDemo:'https://25-game-js-car-racing.vercel.app/', license:'MIT', featured:true, trending:true },
  { id:'speed-racer', title:'Speed Racer', slug:'speed-racer', description:'Race through a circuit with direct controls, responsive handling and a compact browser-first racing loop.', thumbnail:'/images/games/speed-racer.svg', category:'Circuit Racing', tags:['racing','circuit','arcade','cars'], gameType:'local', gamePath:'/games/speed-racer/play/index.html', controls:['Left and right arrow keys to steer','Use the in-game controls to start and restart'], features:['Circuit racing','Responsive keyboard controls','No external dependencies'], sourceRepository:'https://github.com/Steve-IX/Speed_Racer_Game', sourceDemo:'https://speed-racer-game.vercel.app/', license:'MIT', featured:true },
  { id:'crash-car', title:'Crash Car', slug:'crash-car', description:'Avoid traffic, collect powerups and push your score higher in this escalating endless arcade racer.', thumbnail:'/images/games/crash-car.svg', category:'Arcade Racing', tags:['racing','arcade','endless','cars','powerups'], gameType:'local', gamePath:'/games/crash-car/play/index.html', controls:['Arrow keys or mouse to steer','Use the on-screen start and restart controls'], features:['Progressive difficulty','Powerups','Score and level system'], sourceRepository:'https://github.com/varunbudati/Crash_Car', license:'MIT', featured:true, trending:true },
  { id:'drive', title:'Drive', slug:'drive', description:'Switch lanes on a four-lane highway, avoid obstacles and collect gems in a focused arcade driving challenge.', thumbnail:'/images/games/drive.svg', category:'Highway Racing', tags:['highway','racing','arcade','lanes'], gameType:'local', gamePath:'/games/drive/play/index.html', controls:['Left and right arrow keys to switch lanes','Mouse or touch for menu controls'], features:['Four-lane highway','Progressive speed','Gem collection and revives'], sourceRepository:'https://github.com/jasonzli-DEV/Drive', license:'MIT', trending:true },
  { id:'outrun', title:'Outrun', slug:'outrun', description:'Settle into a retro-inspired road, insert a coin and guide your car through a pixel-art racing run.', thumbnail:'/images/games/outrun.svg', category:'Retro Racing', tags:['retro','racing','pixel','arcade'], gameType:'local', gamePath:'/games/outrun/play/index.html', controls:['C to insert a coin','Arrow keys to steer and move','M to mute music'], features:['Pixel-art presentation','Retro arcade controls','Lightweight HTML5 game'], sourceRepository:'https://github.com/Gamesflow/Outrun', sourceDemo:'https://outrun.onrender.com/', license:'MIT' },
  { id:'stunt-car-extreme', title:'Stunt Car Extreme', slug:'stunt-car-extreme', description:'Drive custom cars across stunt tracks, perform flips, collect coins and complete challenging courses.', thumbnail:'/images/games/stunt-car-extreme.svg', category:'Stunt Racing', tags:['stunt','racing','cars','flips'], gameType:'external', gameUrl:'https://poki.com/en/g/stunt-car-extreme', controls:[], features:[], sourceRepository:'https://poki.com/en/g/stunt-car-extreme', license:'External game on Poki', developer:'Poki', mobileSupported:true, fullscreenSupported:true, featured:true, isNew:true },
  { id:'3d-car-simulator', title:'3D Car Simulator', slug:'3d-car-simulator', description:'Drive different vehicles across large 3D maps with multiple vehicles, camera views and realistic driving.', thumbnail:'/images/games/3d-car-simulator.svg', category:'3D Driving', tags:['3d','driving','simulator','cars'], gameType:'external', gameUrl:'https://poki.com/en/g/3d-car-simulator', controls:[], features:[], sourceRepository:'https://poki.com/en/g/3d-car-simulator', license:'External game on Poki', developer:'Poki', mobileSupported:false, fullscreenSupported:true, featured:true, isNew:true },
  { id:'top-speed-3d', title:'Top Speed 3D', slug:'top-speed-3d', description:'Drive sports cars through city streets, customize vehicle specifications and complete high-speed trials.', thumbnail:'/images/games/top-speed-3d.svg', category:'3D Racing', tags:['3d','racing','sports cars','city'], gameType:'external', gameUrl:'https://poki.com/en/g/top-speed-3d', controls:[], features:[], sourceRepository:'https://poki.com/en/g/top-speed-3d', license:'External game on Poki', developer:'Poki', mobileSupported:false, fullscreenSupported:true, featured:true, trending:true, isNew:true },
  { id:'3d-arena-racing', title:'3D Arena Racing', slug:'3d-arena-racing', description:'Race muscle cars, SUVs and monster trucks on 3D tracks and explore free-roam areas.', thumbnail:'/images/games/3d-arena-racing.svg', category:'3D Racing', tags:['3d','racing','arena','monster trucks','free roam'], gameType:'external', gameUrl:'https://poki.com/en/g/3d-arena-racing', controls:[], features:[], sourceRepository:'https://poki.com/en/g/3d-arena-racing', license:'External game on Poki', developer:'Poki', mobileSupported:false, fullscreenSupported:true, featured:true, trending:true, isNew:true },
  { id:'racez-io', title:'Racez.io', slug:'racez-io', description:'Race through 3D tracks with physics-based driving, checkpoints, car colors and optional multiplayer parties.', thumbnail:'/images/games/racez-io.svg', banner:'/images/games/racez-io.svg', category:'Street Racing', tags:['3d','racing','multiplayer','street racing','physics'], gameType:'external', gameUrl:'https://racez.io/', controls:['WASD or arrow keys to drive','R to reset to the last checkpoint','Use the virtual joystick on mobile'], features:['Three.js 3D tracks','Physics-based driving','Checkpoints and party races'], difficulty:'Medium', technology:'Three.js / Ammo.js', developer:'Aadi Kulshrestha', sourceRepository:'https://github.com/MankyDanky/web-racing', sourceUrl:'https://github.com/MankyDanky/web-racing', license:'MIT', mobileSupported:true, fullscreenSupported:true, trending:true, isNew:true, newGame:true },
  { id:'threejs-kart-racing', title:'Three.js Kart Racing', slug:'threejs-kart-racing', description:'Drive a physics-based kart around a circular circuit, collect coins, hit boost pads and chase a high score.', thumbnail:'/images/games/threejs-kart-racing.svg', banner:'/images/games/threejs-kart-racing.svg', category:'3D Racing', tags:['3d','racing','kart','physics','coins'], gameType:'external', gameUrl:'https://threejs-car-demo.vercel.app/', controls:['WASD or arrow keys to drive','Space to jump','B to boost','P or Escape to pause'], features:['Circular 3D circuit','Coin collection','Boost pads and physics'], difficulty:'Medium', technology:'Three.js / Cannon-es', developer:'Chrysovalantis Constantinou', sourceRepository:'https://github.com/cconsta1/threejs_car_demo', sourceUrl:'https://github.com/cconsta1/threejs_car_demo', license:'MIT', mobileSupported:false, fullscreenSupported:true, featured:true, isNew:true, newGame:true },
  { id:'redline', title:'REDLINE', slug:'redline', description:'Race clean or wreck everything in a 3D arcade racer with race and vehicular-combat modes.', thumbnail:'/images/games/redline.svg', banner:'/images/games/redline.svg', category:'Street Racing', tags:['3d','racing','combat','multiplayer','street racing'], gameType:'external', gameUrl:'https://redline.victorgalvez.dev/', controls:['WASD or arrow keys to drive','Shift to boost','Space to jump','F to fire in Combat mode'], features:['Three.js 3D cars','Race and Combat modes','Lap timing and arena hazards'], difficulty:'Hard', technology:'Three.js / Cannon.js / Socket.IO', developer:'Victor Galvez', sourceRepository:'https://github.com/victorgalvez56/redline', sourceUrl:'https://github.com/victorgalvez56/redline', license:'MIT', mobileSupported:false, fullscreenSupported:true, trending:true, isNew:true, newGame:true },
  { id:'apex-formula', title:'APEX FORMULA', slug:'apex-formula', description:'Take part in a procedural Formula racing weekend with multiple circuits, AI drivers, weather and detailed vehicle physics.', thumbnail:'/images/games/apex-formula.svg', banner:'/images/games/apex-formula.svg', category:'Racing', tags:['3d','racing','formula','webgl','simulation'], gameType:'external', gameUrl:'https://bridge-mind.github.io/apex-formula/', controls:['WASD or arrow keys to drive','Space for DRS','R for ERS overtake','Escape to pause'], features:['Six procedural circuits','AI racecraft','Race weekend and weather systems'], difficulty:'Hard', technology:'Three.js / WebGL', developer:'BridgeMind', sourceRepository:'https://github.com/bridge-mind/apex-formula', sourceUrl:'https://github.com/bridge-mind/apex-formula', license:'MIT', mobileSupported:false, fullscreenSupported:true, featured:true, isNew:true, newGame:true },
  { id:'gravity-car', title:'HTML5 Gravity Car', slug:'gravity-car', description:'Drive a physics-based car across procedurally generated hills with suspension, terrain and a restart system.', thumbnail:'/images/games/gravity-car.svg', banner:'/images/games/gravity-car.svg', category:'Off-Road', tags:['off-road','physics','3d','webgl','driving'], gameType:'local', gamePath:'/games/gravity-car/index.html', controls:['A to brake or reverse','D to accelerate','R to restart if the car flips'], features:['Physics-based suspension','Procedural hills','HTML5 Canvas and WebGL'], difficulty:'Medium', technology:'Three.js / Box2DWeb', developer:'Joseph Chereshnovsky', sourceRepository:'https://github.com/webdevbyjoss/html5-gravity-car', sourceUrl:'https://github.com/webdevbyjoss/html5-gravity-car', license:'MIT', mobileSupported:false, fullscreenSupported:true, isNew:true, newGame:true },
  { id:'opendrive', title:'OpenDrive', slug:'opendrive', description:'Explore a browser-built 3D car racing experience made with Three.js and open-source game code.', thumbnail:'/images/games/opendrive.svg', banner:'/images/games/opendrive.svg', category:'3D Racing', tags:['3d','racing','driving','simulator','webgl'], gameType:'local', gamePath:'/games/opendrive/opendrive.html', controls:['Use the controls shown in the game'], features:['Three.js 3D driving','Local browser game','Open-source project'], difficulty:'Medium', technology:'Three.js / WebGL', developer:'Atharva Phadnis', sourceRepository:'https://github.com/atharvaphadnis-ai/opendrive', sourceUrl:'https://github.com/atharvaphadnis-ai/opendrive', license:'MIT', mobileSupported:false, fullscreenSupported:true, isNew:true, newGame:true },
  
];

export const categories = ['Racing','Drift','Stunt','3D Racing','Street Racing','Off-Road','Rally','Car Simulator','Parking','Police Chase','Monster Truck'];
export const pokiGames = games.filter(game => game.developer === 'Poki');
export const libraryGames = games.filter(game => game.gameType === 'external' || game.newGame);
export const getGame = (slug: string) => games.find(game => game.slug === slug);
export const getRelatedGames = (game: Game, limit = 4) => {
  const pool = game.newGame || game.gameType === 'external' ? libraryGames : games;
  return pool.filter(candidate => candidate.id !== game.id).map(candidate => ({ candidate, score: (candidate.category === game.category ? 5 : 0) + candidate.tags.filter(tag => game.tags.includes(tag)).length + (candidate.gameType === game.gameType ? 1 : 0) })).filter(item => item.score > 0).sort((a, b) => b.score - a.score || a.candidate.title.localeCompare(b.candidate.title)).slice(0, limit).map(item => item.candidate);
};
