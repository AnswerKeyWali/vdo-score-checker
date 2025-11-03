function scoreAnswers() {
  const key = questions.map(q => q.correct); // correct answers
  let right = 0, wrong = 0, skipped = 0, unmarked = 0;

  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const u = answers[i]; // user's answer
    const c = key[i];     // correct answer

    if (u === "E") {
      // Candidate filled E = intentionally skipped
      skipped++;
    } else if (!u || u === "") {
      // Candidate left blank = negative marking
      unmarked++;
      wrong++; // counted in wrong for total penalty
    } else if (u === c) {
      right++;
    } else {
      wrong++;
    }
  }

  const marks = right * MARK_PER_QUESTION - wrong * NEGATIVE;
  return { right, wrong, skipped, unmarked, marks };
}

resultDiv.innerHTML = `
  <p>✅ सही उत्तर: ${r.right}</p>
  <p>❌ गलत उत्तर (निगेटिव सहित): ${r.wrong}</p>
  <p>⭕ छोड़े गए (E भरे): ${r.skipped}</p>
  <p>⚠️ खाली छोड़े (E नहीं भरे): ${r.unmarked}</p>
  <h3>🏁 कुल अंक: ${r.marks.toFixed(2)} / ${(TOTAL_QUESTIONS * MARK_PER_QUESTION).toFixed(2)}</h3>
`;


