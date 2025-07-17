// RSA Encryption and Decryption Functions
function fastModularExp(base, exponent, modulus) {
    if (modulus === 1) return 0;
    
    let result = 1;
    base = base % modulus;
    
    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }
    
    return result;
}

function letterToNumber(letter) {
    const code = letter.toUpperCase().charCodeAt(0) - 65;
    return code.toString().padStart(2, '0');
}

function numberToLetter(num) {
    return String.fromCharCode(parseInt(num) + 65);
}

function messageToNumbers(message) {
    return message.toUpperCase()
        .replace(/[^A-Z]/g, '')
        .split('')
        .map(letterToNumber)
        .join('');
}

function numbersToMessage(numString) {
    let message = '';
    for (let i = 0; i < numString.length; i += 2) {
        const num = numString.substr(i, 2);
        if (num.length === 2) {
            message += numberToLetter(num);
        }
    }
    return message.replace(/X+$/, ''); // Remove padding X's
}

function findBlockSize(n) {
    let blockSize = 2;
    let testNumber = '25';
    
    while (parseInt(testNumber) < n) {
        blockSize += 2;
        testNumber += '25';
    }
    
    return blockSize - 2;
}

function createBlocks(numString, blockSize) {
    const blocks = [];
    
    while (numString.length % blockSize !== 0) {
        numString += '23'; // X = 23
    }
    
    for (let i = 0; i < numString.length; i += blockSize) {
        blocks.push(numString.substr(i, blockSize));
    }
    
    return blocks;
}

function rsaEncrypt(message, keys) {
    const { e, n } = keys;
    
    const numString = messageToNumbers(message);
    const blockSize = findBlockSize(n);
    const blocks = createBlocks(numString, blockSize);
    
    const encryptedBlocks = blocks.map(block => {
        const m = parseInt(block);
        return fastModularExp(m, e, n);
    });
    
    return encryptedBlocks.join(' ');
}

function rsaDecrypt(encryptedMessage, keys) {
    const { d, n } = keys;
    
    const encryptedBlocks = encryptedMessage.split(' ').map(block => parseInt(block.trim()));
    const blockSize = findBlockSize(n);
    
    const decryptedBlocks = encryptedBlocks.map(block => {
        const decrypted = fastModularExp(block, d, n);
        return decrypted.toString().padStart(blockSize, '0');
    });
    
    const numString = decryptedBlocks.join('');
    return numbersToMessage(numString);
}

// Your existing event handlers with modifications
const rsaEncryptButton = document.getElementById('rsa-encrypt-btn');
const rsaEncryptInput = document.getElementById('rsa-encrypt-input');
const rsaKey_e = document.getElementById('rsa-encrypt-key-e');
const rsaKey_n = document.getElementById('rsa-encrypt-key-n');
const rsaEncryptResult = document.getElementById('rsa-encrypt-result');

rsaEncryptButton.addEventListener('click', () => {
  const message = rsaEncryptInput.value;
  const e = parseInt(rsaKey_e.value, 10);
  const n = parseInt(rsaKey_n.value, 10);

  if (!message || isNaN(e) || isNaN(n)) {
    rsaEncryptResult.textContent = 'Please provide a valid message and keys.';
    return;
  }

  try {
    const encryptedMessage = rsaEncrypt(message, { e, n });
    rsaEncryptResult.innerHTML = `<p class="w-[340px]"> Encrypted Message: ${encryptedMessage}</p>`;
  } catch (error) {
    console.error('Encryption error:', error);
    rsaEncryptResult.textContent = 'Encryption failed. Please check your input.';
  }
});

const rsaDecryptButton = document.getElementById('rsa-decrypt-btn');
const rsaDecryptInput = document.getElementById('rsa-decrypt-input');
const rsaKey_d = document.getElementById('rsa-decrypt-key-d');
const rsaKey_n_decrypt = document.getElementById('rsa-decrypt-key-n');
const rsaDecryptResult = document.getElementById('rsa-decrypt-result');

rsaDecryptButton.addEventListener('click', () => {
  const encryptedMessage = rsaDecryptInput.value;
  const d = parseInt(rsaKey_d.value, 10);
  const n = parseInt(rsaKey_n_decrypt.value, 10);

  if (!encryptedMessage || isNaN(d) || isNaN(n)) {
    rsaDecryptResult.textContent = 'Please provide a valid encrypted message and keys.';
    return;
  }

  try {
    const decryptedMessage = rsaDecrypt(encryptedMessage, { d, n });
    rsaDecryptResult.textContent = `Decrypted Message: ${decryptedMessage}`;
  } catch (error) {
    console.error('Decryption error:', error);
    rsaDecryptResult.textContent = 'Decryption failed. Please check your input.';
  }
});