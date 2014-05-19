function encipher() {
    var plainText = $('#plaintext').val();
    var cipherText = '';
    if ($(':radio[value=caesar]').is(':checked')) {
        var direction = $('input[name=shiftDirection]:checked').val();
        var shift = parseInt($('#inputShift').val());
        cipherText = caesarCipher(direction, shift, plainText);
        console.log(cipherText);
        return;
    }
    if ($(':radio[value=subst]').is(':checked')) {
        cipherText = substCipher(plainText);
        console.log(cipherText);
        return;
    }
}

function substCipher(text) {
    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var alphaTemp = alpha;
    var randAlpha = '';
    var plainText = text.toUpperCase();
    var cipherText = '';

    //randomizes alphabet
    while (alphaTemp.length > 0) {
        var letter = alphaTemp.charAt(Math.floor(Math.random() * alphaTemp.length));
        randAlpha += letter;
        //remove letter from alphaTemp
        alphaTemp = alphaTemp.replace(letter, '', 'g');
    }

    for (var i = 0; i < plainText.length; i++) {
        var plainLetter = plainText.charAt(i);
        var alphaIndex = alpha.indexOf(plainLetter);
        if (alphaIndex >= 0) {
            cipherText += randAlpha.charAt(alphaIndex);
        }
        else {
            cipherText += plainLetter;
        }
    }
    return cipherText;
}

function caesarCipher(direction, shift, text) {
    var plainText = text.toUpperCase();
    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var cipherText = '';
    if (direction == "left") {
        shift = -shift;
    }
    for (var i = 0; i < plainText.length; i++) {
        var plainLetter = plainText.charAt(i);
        var alphaIndex = alpha.indexOf(plainLetter);
        if (alphaIndex >= 0) {
            alphaIndex = alphaIndex + alpha.length;
            cipherText += alpha.charAt((alphaIndex + shift) % alpha.length);
        }
        else {
            cipherText += plainLetter;
        }
    }
    return cipherText;
}
