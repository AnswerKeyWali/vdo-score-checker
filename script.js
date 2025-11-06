// parse a pasted answers string — keep A,B,C,D,E only
function parseAnswers(input) {
  if (!input) return [];
  // Convert to uppercase and keep only A-E letters, commas, spaces, newlines
  input = input.toUpperCase().replace(/[^A-E,\s]/g, "");
  // If comma-separated or space-separated, split, otherwise treat as contiguous letters
  if (input.includes(",") || /\s/.test(input.trim())) {
    // split on comma or whitespace, filter empty
    return input.split(/[, \n\r\t]+/).filter(x => x !== "");
  } else {
    // contiguous like "ABCDEAB..." -> split into single letters
    return input.trim().split("").filter(ch => ch !== "");
  }
}
// Constants (verify these are present and correct)
const TOTAL_QUESTIONS = 160;
const MARK_PER_QUESTION = 1.25;
const NEGATIVE_MARK = MARK_PER_QUESTION / 3;
// scoring that treats E as intentional skip (0 marks) and blank as negative
function calculateScore(userAnswers) {
  // ensure correctAnswers array length equals TOTAL_QUESTIONS
  const correctAnswers = ANSWER_KEY.split("").map(c => c ? c.toUpperCase() : "");
  let right = 0, wrong = 0, skipped = 0, unmarked = 0;

  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const user = (userAnswers[i] || "").toUpperCase(); // may be undefined
    const correct = (correctAnswers[i] || "").toUpperCase();

    if (user === "E") {
      // E = intentionally skipped -> no penalty, no marks
      skipped++;
    } else if (!user) {
      // blank (no input at all) => negative marking
      unmarked++;
      wrong++; // count toward penalty
    } else if (user === correct && user !== "") {
      right++;
    } else {
      // user provided A-D and it's not equal to correct (or correct is blank),
      // that's a wrong answer -> negative mark
      wrong++;
    }
  }

  const total = right * MARK_PER_QUESTION - wrong * NEGATIVE_MARK;
  return { right, wrong, skipped, unmarked, total };
}
