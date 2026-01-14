function getPasswordStrength(password) {
  const suggestions = [];

  const lengthOK = password.length >= 8;
  const upperOK = /[A-Z]/.test(password);
  const lowerOK = /[a-z]/.test(password);
  const numberOK = /[0-9]/.test(password);
  const specialOK = /[^A-Za-z0-9]/.test(password);

  if (!lengthOK) suggestions.push("Use at least 8 characters.");
  if (!upperOK) suggestions.push("Add at least 1 uppercase letter (A-Z).");
  if (!lowerOK) suggestions.push("Add at least 1 lowercase letter (a-z).");
  if (!numberOK) suggestions.push("Add at least 1 number (0-9).");
  if (!specialOK) suggestions.push("Add at least 1 special symbol (!@#$...).");

  const score =
    (lengthOK ? 1 : 0) +
    (upperOK ? 1 : 0) +
    (lowerOK ? 1 : 0) +
    (numberOK ? 1 : 0) +
    (specialOK ? 1 : 0);

  let label = "Weak";
  if (score >= 4) label = "Strong";
  else if (score >= 3) label = "Medium";

  return {
    score,
    label,
    checks: { lengthOK, upperOK, lowerOK, numberOK, specialOK },
    suggestions
  };
}

module.exports = { getPasswordStrength };
