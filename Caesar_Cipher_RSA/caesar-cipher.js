function shift_cipher_encryption(plaintext, shift = 7) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let ciphertext = '';
    
    for (let i = 0; i < plaintext.length; i++) {
        const char = plaintext[i].toUpperCase();
        const index = alphabet.indexOf(char);
        
        if (index !== -1) {
            const newIndex = (index + shift) % 26;
            ciphertext += alphabet[newIndex];
        } else {
            ciphertext += char;
        }
    }
    
    return ciphertext;
}

function shift_cipher_decryption(ciphertext, shift = 7) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let plaintext = '';
    
    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i].toUpperCase();
        const index = alphabet.indexOf(char);
        
        if (index !== -1) {
            const newIndex = (index - shift + 26) % 26;
            plaintext += alphabet[newIndex];
        } else {
            plaintext += char;
        }
    }
    
    return plaintext;
}

// Alternative: Functions that always use key 7
function caesar_encrypt_key7(plaintext) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shift = 7;
    let ciphertext = '';
    
    for (let i = 0; i < plaintext.length; i++) {
        const char = plaintext[i].toUpperCase();
        const index = alphabet.indexOf(char);
        
        if (index !== -1) {
            const newIndex = (index + shift) % 26;
            ciphertext += alphabet[newIndex];
        } else {
            ciphertext += char;
        }
    }
    
    return ciphertext;
}

function caesar_decrypt_key7(ciphertext) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shift = 7;
    let plaintext = '';
    
    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i].toUpperCase();
        const index = alphabet.indexOf(char);
        
        if (index !== -1) {
            const newIndex = (index - shift + 26) % 26;
            plaintext += alphabet[newIndex];
        } else {
            plaintext += char;
        }
    }
    
    return plaintext;
}

function caesar_brute_force_decrypt(ciphertext) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const results = [];
    
    for (let shift = 1; shift < 26; shift++) {
        let plaintext = '';
        
        for (let i = 0; i < ciphertext.length; i++) {
            const char = ciphertext[i].toUpperCase();
            const index = alphabet.indexOf(char);
            
            if (index !== -1) {
                const newIndex = (index - shift + 26) % 26;
                plaintext += alphabet[newIndex];
            } else {
                plaintext += char;
            }
        }
        
        results.push({ shift, plaintext });
    }
    
    return results;
}

// Test the functions with your example
console.log("Testing with 'HELLO' and key 7:");
console.log("Encrypted:", caesar_encrypt_key7("HELLO")); // Should output: OLSSV
console.log("Decrypted:", caesar_decrypt_key7("OLSSV")); // Should output: HELLO

export { 
    shift_cipher_encryption, 
    shift_cipher_decryption, 
    caesar_brute_force_decrypt,
    caesar_encrypt_key7,
    caesar_decrypt_key7
};