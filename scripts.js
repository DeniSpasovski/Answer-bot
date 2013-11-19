function processInput(text, targetDiv) {
    targetDiv.innerHTML += "<p class='you'>" + text + "</p>";
    text = text.replace(new RegExp("[^a-zA-Z ]", 'g'), " ");
    text = text.replace(new RegExp("[ ]{2,}", 'g'), " ");
    var _words = text.toLowerCase().split(" ");
    var _answers = [];
    if (_words.length == 0 || _words.toString() == '') { //if the input is empty
        _answers = SpecialContext['emptyInput'];
    } else {
        var _possibleAnswers = Findmatches(_words);
        if (_possibleAnswers.length == 0) { //if no answer found
            _answers = SpecialContext['wrongInput']
        }
        if (_possibleAnswers.length == 1) { //context recognized
            _answers = Content[_possibleAnswers[0]].values;
        }
        if (_possibleAnswers.length > 1) {
            WriteText(SpecialContext['rephrase'], targetDiv);
            for (var i = 0; i < _possibleAnswers.length; i++) {
                WriteText(Content[_possibleAnswers[i]].Description, targetDiv);
            }
        }
    }
    if (_answers.length > 0) {
        var _rand = Math.floor((Math.random() - 0.001) * _answers.length);
        WriteText(_answers[_rand], targetDiv);
    }
};

function WriteText(text, targetDiv) {
    targetDiv.innerHTML += "<p class='ai'>" + text + "</p>";
}

function Findmatches(words) {
    var foundKeywords = [];
    var _possibleAnswers = [];
    for (var i = 0; i < Keywords.length; i++) {
        foundKeywords[i] = 0;
        for (var j = 0; j < words.length; j++) {
            if (Keywords[i].keys.indexOf(words[j])>=0) {
                foundKeywords[i]++;
                if (foundKeywords[i] == Keywords[i].keys.length) {
                    return [Keywords[i].value];
                }
            }
        }
        if (foundKeywords[i] * 2 >= Keywords[i].keys.length) {
            _possibleAnswers.push(Keywords[i].value);
        }
    }
    return _possibleAnswers.filter(function (elem, pos) {
        return _possibleAnswers.indexOf(elem) == pos;
    });
}