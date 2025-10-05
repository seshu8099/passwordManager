function checkPasswordStrength(username, password) {
  let score = 0;

  if (!password) return 0;

  // 1️⃣ Length score (max 30 points)
  const lengthScore = Math.min(password.length, 12) * 2.5; // 12+ chars → full 30 pts
  score += Math.min(lengthScore, 30);

  // 2️⃣ Character diversity (max 40 points)
  let diversity = 0;
  if (/[a-z]/.test(password)) diversity++;  // lowercase
  if (/[A-Z]/.test(password)) diversity++;  // uppercase
  if (/\d/.test(password)) diversity++;     // numbers
  if (/[^a-zA-Z0-9]/.test(password)) diversity++;  // special chars
  score += diversity * 10; // 4 types = 40 points

  // 3️⃣ Penalty for similarity to username (max 30 points)
  // score+=30
  if (username) {
    const lowerUser = username.toLowerCase();
    const lowerPass = password.toLowerCase();
    if (lowerPass.includes(lowerUser) || lowerUser.includes(lowerPass)) {
      score -= 30; // too similar
    } else {
      // Partial match penalty: common substring
      const match = longestCommonSubstring(lowerUser, lowerPass);
      if (match.length >= 3) {
        score -= Math.min(match.length * 2, 20);
      }
    }
  }

  // 4️⃣ Bonus for extra-long passwords (>12 chars)
  if (password.length > 12) score += 5;
  if (password.length > 16) score += 5;

  // Clamp score between 0–100
  score = Math.max(0, Math.min(score, 100));

  return Math.round(score);
}

// Helper: find longest common substring between username & password
function longestCommonSubstring(a, b) {
  let max = 0;
  let end = 0;
  const dp = Array(a.length + 1).fill(0).map(() => Array(b.length + 1).fill(0));

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > max) {
          max = dp[i][j];
          end = i;
        }
      }
    }
  }

  return a.substring(end - max, end);
}

export { checkPasswordStrength, longestCommonSubstring };
