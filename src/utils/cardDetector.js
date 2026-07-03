export const detectCardType = (cardNumber) => {
    const cardPatterns = {
      'visa': /^4[0-9]{12}(?:[0-9]{3})?$/,
      'mastercard': /^5[1-5][0-9]{14}$/,
      'americanexpress': /^3[47][0-9]{13}$/,
      'discover': /^6(?:011|5[0-9]{2})[0-9]{12}$/,
      'jcb': /^(?:2131|1800|35\d{3})\d{11}$/,
      'dinersclub': /^3(?:0[0-5]|[68][0-9])\d{11}$/,
    };
  
    for (const [cardType, pattern] of Object.entries(cardPatterns)) {
      if (pattern.test(cardNumber)) {
        return cardType;
      }
    }
  
    return null; // If no card type matches
};
  
  
    