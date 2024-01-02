//declare random number between 1 to 9
function randomSelection() {
  return Math.floor(Math.random() * 10 + 1).toString();
}

//declare random number between 1 to 99
function randomValue() {
  return Math.floor(Math.random() * 100 + 1).toString();
}

// declare all characters
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//declare random Phone Number
const phoneNumber = generateRandomPhoneNumber();

function generateRandomPhoneNumber() {
  let phoneNumber = "1"; // The leading '1' for the country code
  for (let i = 0; i < 9; i++) {
    phoneNumber += Math.floor(Math.random() * 10);
  }
  return phoneNumber;
}

module.exports = {
  randomSelection,
  randomValue,
  generateString,
};
