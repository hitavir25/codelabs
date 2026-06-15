// ============================================================
//  HitaVirTech — Student Access Allowlist
//  ------------------------------------------------------------
//  THIS IS THE ONLY FILE YOU EDIT TO CONTROL WHO GETS IN.
//
//  • Add a student:    add their Gmail to the right batch array.
//  • Remove a student: delete their line (takes effect on their
//                      NEXT page load — no waiting for a session
//                      to expire).
//  • New cohort:       add a new "B6-...": [ ... ] block.
//
//  After editing: commit + push. Cloudflare Pages redeploys
//  automatically and the change is live in ~1 minute.
//
//  Email case, dots, and +tags are ignored automatically, so
//  you do NOT need to match the exact spelling a student uses.
// ============================================================

export const BATCHES = {
  "B5-April-2026": [
    "iamawannadole@gmail.com",
    "adhyatmahawale1008@gmail.com",
    "khushiklad24@gmail.com",
    "vinayakard0204@gmail.com",
    "nrekha022@gmail.com",
    "spoortishekhargol@gmail.com",
    "omkar6467@gmail.com",
    "sairajwadkar0007@gmail.com",
    "saracuwic@gmail.com",
    "shraddhanemagoudar2003@gmail.com",
    "kamateradhika@gmail.com",
    "rahulshashidhar7@gmail.com",
    "dayanandhatti01@gmail.com",
    "jeevankoulapure@gmail.com",
    "shwetahuvannavar108@gmail.com",
    "shitalkumbhar930@gmail.com",
    "shreshthianeesh@gmail.com",
    "shivarajpp18@gmail.com",
    "shimpukadesahil@gmail.com",
    "Shruthikkr2009@gmail.com",
    "nbalagavi@gmail.com",
    "powarharsh07@gmail.com",
    "rutik17koli@gmail.com",
    "abhishekkonthe@gmail.com",
    "wagawadeabhinav@gmail.com",
    "pmalappavpujari@gmail.com",
    "aniketharale12@gmail.com",
    "meenakshitas25@gmail.com",
    "koleavadhut@gmail.com",
    "sharathpujari952@gmail.com", // corrected from ".co" — please confirm with student
    "indrajitawate1999@gmail.com",
    "patilvishwajit707@gmail.com",
    "ayushkole95@gmail.com",
    "sprahul8005@gmail.com",
    "abhishekkhichade7272@gmail.com",
    "babugoudapatil06@gmail.com",
    "parthshinge@gmail.com",
    "kumbharshubham700@gmail.com",
    "vishwanathchinchale18@gmail.com",
    "patilninganagouda100@gmail.com",
    "nishasorallikar@gmail.com",
    "satishsavadatti1998@gmail.com",
    "mahimokhashi96@gmail.com",
    "pooja.sb934@gmail.com",
  ],

  // To start the next cohort, copy the block above and rename:
  // "B6-July-2026": [
  //   "newstudent@gmail.com",
  // ],
};

// Admins always have access, regardless of batch (you + co-trainers).
export const ADMINS = [
  "iamawannadole@gmail.com",
];

// Shown to denied users so they know who to contact.
export const ADMIN_CONTACT = "iamawannadole@gmail.com";

// ---- lookup (do not edit below) ----------------------------------
import { normalizeEmail } from "./_auth.js";

const _allowed = new Set(
  [...Object.values(BATCHES).flat(), ...ADMINS].map(normalizeEmail)
);

export function isAllowed(email) {
  return _allowed.has(normalizeEmail(email));
}
