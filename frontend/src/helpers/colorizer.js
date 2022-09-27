export function bubbleColorizer(letter) {
  letter = letter.toLowerCase();

  const blueLetters = ["a", "g", "m", "s", "y"];
  const redLetters = ["b", "h", "n", "t", "z"];
  const greenLetters = ["c", "i", "o", "u"];
  const purpleLetters = ["d", "j", "p", "v"];
  const limeLetters = ["e", "k", "q", "w"];
  const pinkLetters = ["f", "l", "r", "x"];

  if (blueLetters.find((e) => e == letter)) {
    return "bubble-blue";
  } else if (redLetters.find((e) => e == letter)) {
    return "bubble-red";
  } else if (greenLetters.find((e) => e == letter)) {
    return "bubble-purple";
  } else if (purpleLetters.find((e) => e == letter)) {
    return "bubble-orange";
  } else if (limeLetters.find((e) => e == letter)) {
    return "bubble-lime";
  } else if (pinkLetters.find((e) => e == letter)) {
    return "bubble-pink";
  }
}

export function preferenceColorizer(type) {
  switch (type) {
    case "purchase":
      return "preference-green";
    case "refinance":
      return "preference-pink";
    case "equity loan":
      return "preference-orange";
  }
}

export function completionColorizer(percentage) {
  if (percentage <= 49) {
    return "completion-red";
  } else if (percentage > 99) {
    return "completion-green";
  } else {
    return "completion-orange";
  }
}

export function documentStatusColorizer(type) {
  if (type=="approved") {
    return "document-status-green";
  } else if (type=="denied") {
    return "document-status-red";
  } else if (type=="waiting") {
    return "document-status-blue";
  } else {
    return "document-status-orange";
  }
}