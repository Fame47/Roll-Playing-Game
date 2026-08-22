# BNP R.P.G. Firebase Leaderboard Setup

The game is already wired for three global Top-20 leaderboards:

- Roll-Play
- 3000
- 9000

The game will continue to work in **LOCAL TEST MODE** until Firebase is connected.

## 1. Create the BNP R.P.G. Firebase project

Go to Firebase Console and create a new project specifically for BNP R.P.G.

Do not reuse the Firebase project from another BNP game.

## 2. Add a Web App

Inside the Firebase project:

**Project Settings -> Your apps -> Add app -> Web**

Register the app. Firebase will show you a `firebaseConfig` object.

Open:

`firebase-config.js`

Replace the placeholder values with the values Firebase gives you.

## 3. Create Firestore

Open:

**Build -> Firestore Database -> Create database**

Choose your production location and create the database.

No leaderboard collections need to be created manually. The game creates the player's score document the first time a score is submitted.

## 4. Enable Anonymous Authentication

Open:

**Build -> Authentication -> Sign-in method**

Enable:

**Anonymous**

This gives every installed/browser copy of BNP R.P.G. its own Firebase UID without making the player create an account.

Each UID stores one personal-best score per mode.

## 5. Install the included Firestore Rules

Open:

**Firestore Database -> Rules**

Replace the rules with the contents of:

`firestore.rules`

Then click **Publish**.

These rules:
- allow everyone to read the public leaderboard
- require Firebase Authentication to submit scores
- only let a player write to their own leaderboard document
- only allow a player's score to stay the same or increase
- enforce the 13-character player-name limit
- reject unexpected document fields

## 6. Upload the whole build to GitHub

Keep these files in the repository root:

- `index.html`
- `firebase-config.js`
- `firebase-leaderboard.js`
- `firestore.rules`
- `assets/`
- the other existing BNP R.P.G. files

`firestore.rules` is for Firebase Console/deployment. It does not need to be loaded by the game.

## How the leaderboard works

Firestore collections:

- `leaderboards_rollplay`
- `leaderboards_3000`
- `leaderboards_9000`

Each player/device gets one anonymous Firebase UID.

For each mode, that UID can have one score document. If they beat their personal best, the document is updated. A lower score cannot replace the old one.

The game requests the highest 20 scores from each collection.

## Offline / setup fallback

If Firebase is not configured, unavailable, or temporarily offline, BNP R.P.G. keeps using its local leaderboard storage so gameplay is never blocked.

When Firebase connects later, the game attempts to sync the best local score for each mode.

## Before a worldwide prize leaderboard

This setup is good for testing and an early public leaderboard, but score values are still produced by the game client.

Before high-value prizes or competitive global events, move score verification/submission behind a trusted server or Firebase Cloud Function and enable Firebase App Check.
