function longestStr(strArr){
    let str = strArr.split(','),
        max = 0,
        maxStr;
    str.forEach(e => {
        if(e.length > max){
            max = e.length;
            maxStr = e;
        }});
    return maxStr;
}

function mostFrequent(str){
    let charmap = {},
        max = 0,
        char;
    for (let key of str) {
        if(charmap[key]) charmap[key]++;
        else charmap[key] = 1;
    }
    for (let key in charmap) {
        if(charmap[key] > max){
            max = charmap[key];
            char = key;
        }
    }
    return char;
}

function mostFrequentReplace(str,char){
    let mf = mostFrequent(str),
        nstr = '';
    for (let item of str){
        if(item == mf){
            nstr += char;
            continue;
        }
        nstr += item;
    }
    return nstr;
}

function sort(str){
    return str.replace(/\s+/g,'') 
              .toLowerCase()
              .split('')
              .sort()
              .join('');
}
function isAnagram(str1, str2){
    return str1 === str2?   
    false : sort(str1) === sort(str2);
}

function execute(){
    let strArr = document.getElementById("strArr").value;
    document.getElementById('strArrOutput').textContent = longestStr(strArr);

    let strFreq = document.getElementById('strFreq').value;
    document.getElementById('strFreqOutput').textContent = mostFrequent(strFreq);

    let strChar = document.getElementById('strChar').value;
    document.getElementById('strCharOutput').textContent = mostFrequentReplace(strFreq,strChar);
    
    let str1 = document.getElementById('str1').value,
        str2 = document.getElementById('str2').value;
    document.getElementById('anagram').textContent = isAnagram(str1,str2);
}

let film = document.forms.film;