const textarea = document.querySelector('.text-area');
let isEnglish_prev = null;

textarea.addEventListener('keyup', (e) => {
    // console.log(e.keyCode)
    const text = textarea.value;
    document.querySelector('#counter').innerText = updateCounter(text, e.keyCode == 13);
});

function updateCounter(text, is_last_return) {
    if (text == '') { return 0; }
    text = text.replace(/^[\s\n]*/, ''); // for first \n
    // console.log(text)
    let isEnglish = is_last_return ? isEnglish_prev : isEngString(text);
    isEnglish_prev = isEnglish;

    if (isEnglish) {
        const textArray = text.split(/[ \n]/).filter((e) => { return e != '' });
        return textArray.length;
    } else {
        return text.replace(/\n/g, '').length;
    }
}

function isEngString(string) {
    function _isEngChar(char) {
        // ' ' ~ '~'
        return 32 <= char.charCodeAt(0) && char.charCodeAt(0) <= 126 || char == '\n';
    }
    return _isEngChar(string[0]) && _isEngChar(string.slice(-1));
}

// Test
const testList = [[`
it's a   beautiful   day outside.
birds are singing, flowers are blooming...
`, 11],[`
外はいい天気だ。　鳥は楽しげに歌い、　花は美しく咲きほこる・・・。
`, 33]];

for (let i=0; i<testList.length; i++) {
    console.assert(
        updateCounter(testList[i][0]) == testList[i][1]
        , {value: updateCounter(testList[i][0])});
}