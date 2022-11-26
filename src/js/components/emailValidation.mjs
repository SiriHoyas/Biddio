export function emailValidation(emailInput) {
  if (emailInput.endsWith("@stud.noroff.no")) {
    return true;
  } else {
    return false;
  }
}
