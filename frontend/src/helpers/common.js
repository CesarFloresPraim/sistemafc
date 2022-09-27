export function getPasswordValidationRules() {
  let map = {
    specialOrNumber: new RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
    ),
    length: new RegExp(/.{8,}/),
  };

  return map;
}
