// Function to check if a password has been pwned using the Have I Been Pwned API.
// It uses the k-Anonymity model to protect the user's password.

async function checkPwnedPassword(password) {
  if (!password) {
    return false;
  }

  // 1. Hash the password using SHA-1. The browser's built-in crypto library is used.
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // 2. Split the hash into a prefix (first 5 chars) and a suffix.
  const prefix = hashHex.substring(0, 5);
  const suffix = hashHex.substring(5).toUpperCase();

  // 3. Query the HIBP API with the prefix.
  try {
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) {
      throw new Error('Failed to fetch from HIBP API');
    }
    const text = await response.text();
    const lines = text.split('\n');

    // 4. Check if any of the returned hash suffixes match our password's hash suffix.
    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix === suffix) {
        // Found a match, the password is pwned.
        console.log(`Password pwned! Found ${count} times.`);
        return true;
      }
    }

    // No match found.
    return false;
  } catch (error) {
    console.error('Error checking pwned password:', error);
    // In case of an error, assume it's not pwned to avoid false positives.
    return false;
  }
}

export { checkPwnedPassword };
