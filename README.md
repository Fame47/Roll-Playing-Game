# BNP's R.P.G. GitHub Build

This build restores the original v32 fixed portrait look.

- The game NEVER expands wider than 520px.
- Desktop and tablets keep the same centered portrait game.
- Red background can show around the game frame.
- Body/page scrolling is locked.
- Mobile portrait orientation is requested where the browser allows it.
- All large media lives in /assets so index.html stays small.

Upload every file and the entire assets folder to the repository root.

## v36 phone fit
Real-phone width fixes keep the top bar, five-dice rows, board, buttons, and menu art inside the original portrait frame. Desktop/tablet remain capped at the original 520px width.

## v37 gameplay/shop cleanup
- Stickers removed from Shop.
- Every solid Hero Dice color is now a FREE individual Shop unlock.
- Boards still use six-character redemption codes.
- Orange, Pink, Light Brown, Light Grey, and Black rolling dice are active in gameplay.
- Custom Dice added to Special Modes. Save a five-color Hero Dice preset, then select CUSTOM before Roll-Play, 3000, or 9000.

## v38 shop polish
- Shop category buttons now match the main/special-mode arcade UI.
- Stickers remain removed from Shop.
- All ten Hero Dice colors are locked again and use 6-character test codes.
- One-time v38 migration clears the free-test dice unlocks while preserving board unlocks.
- Custom Dice presets can only be selected when every color in that preset is currently unlocked.

## v39 special Hero Dice
- Galaxy, Fire, Halloween, Gold, and Snow added under the Dice Shop redeem system.
- Each special set has its own shop case art and rolling in-game style.
- Redeemed special sets also become available to Custom Dice presets.
- Current local test codes: GALAXY, FIRE25, HWEEN1, GOLD25, SNOW25.

## v41 main menu polish
- Removed the decorative hand from the bottom of the main menu.
- Added Stand On Nerd Business as looping main-menu music at 30% volume.
- Music begins on the first player interaction when mobile autoplay is blocked.
- Music fades out when gameplay launches and fades back in on return to menu.

## v42 continuous music controls
- Default music volume is 15% for fresh players and persists after adjustment.
- Music continues through menus and gameplay.
- Main menu has a volume slider + Skip under Shop.
- In-game hamburger opens Music / Skip Track / Main Menu controls instead of immediately quitting.
- FULL NERD warning is words-only with the caution banner/border removed.
- Playlist order: Stand On Nerd Business, Midtown Funk, Midnight Bourbon, Roll Play With Me, Midnight Parade.

## v43 full playlist
- All five menu/game music tracks are bundled.
- Playlist order: Stand On Nerd Business → Midtown Funk → Midnight Bourbon → Roll Play With Me → Midnight Parade.
- Music starts at 15% for fresh players, follows the saved volume slider, continues through menus/gameplay, and supports Skip Track.

## v44 Hero Dice brand cleanup
- Replaced all ten standard Hero Dice Shop images with the new BNP's RPG HERO DICE logo cases.
- Standard cases now consistently show 5 colored dice plus the white blank die in the top-middle position.
- Replaced Galaxy, Fire, Gold and Snow with their new-logo case art.
- Halloween remains hidden behind Holiday Edition blur and now uses new-logo placeholder art instead of the retired design.
- Deleted the fifteen retired Hero Dice Shop artwork files from the game package.

## v45 Firebase leaderboards
- Leaderboard now tracks Roll-Play, 3000, and 9000.
- Added optional Firebase/Firestore global Top-20 leaderboard support.
- Added Anonymous Auth integration so players do not need accounts.
- Added firebase-config.js, firebase-leaderboard.js, firestore.rules, and FIREBASE_SETUP.md.
- Local leaderboards remain as an offline/setup fallback.
