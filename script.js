// script.js

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyGZgU_Pl4NBtWgohhN92vKVGnHd2XHc1dLME1vNvjIgP4bwlQcY105WW7fW_FLefye/exec"; // paste from Apps Script

function parseAnswers(input) {
  input = input.toUpperCase().replace(/[^A-D]/g, "");
  return input.split("");
}

function calculateScore(userAnswers) {
  const correctAnswers = ANSWER_KEY.split("");
  let right = 0, wrong = 0, skipped = 0;

  for (let i = 0; i < TOTAL_QUESTIONS; i++) {
    const user = userAnswers[i];
    const correct = correctAnswers[i];
    if (!user) skipped++;
    else if (user === correct) right++;
    else wrong++;
  }

  const total = right * MARK_PER_QUESTION - wrong * NEGATIVE_MARK;
  return { right, wrong, skipped, total };
}

async function submitData(data) {
  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Submit error:", err);
  }
}

function checkScore() {
  const name = document.getElementById("name").value.trim();
  const rollno = document.getElementById("rollno").value.trim();
  const gender = document.getElementById("gender").value;
  const area = document.getElementById("area").value;
  const category = document.getElementById("category").value;
  const special = document.getElementById("special").value;
  const userInput = document.getElementById("answers").value;

  const userAnswers = parseAnswers(userInput);
  const result = calculateScore(userAnswers);

  const totalMarks = result.total.toFixed(2);

  // Display result
  document.getElementById("result").innerHTML = `
    <h3>📊 Your Result</h3>
    <p>✅ Correct: ${result.right}</p>
    <p>❌ Wrong: ${result.wrong}</p>
    <p>⭕ Skipped: ${result.skipped}</p>
    <h4>🏁 Total Marks: ${totalMarks} / 200</h4>
  `;

  // Send data to Google Sheet
  submitData({
    name, rollno, gender, area, category, special,
    right: result.right, wrong: result.wrong, skipped: result.skipped, total: totalMarks
  });
}

