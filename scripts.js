function processInput(text, targetDiv) {
    targetDiv.innerHTML += "<p class='you'>" + text + "</p>";
    text = text.replace(new RegExp("[^a-zA-Z ]", 'g'), " ");
    text = text.replace(new RegExp("[ ]{2,}", 'g'), " ");
    var _words = text.toLowerCase().split(" ");
    var _answers = [];
	var _title = "";
    if (_words.length == 0 || _words.toString() == '') { //if the input is empty
        _answers = SpecialContext['emptyInput'];
		_title = SpecialContext['emptyInput'];
    } else {
        var _possibleAnswers = Findmatches(_words);
        if (_possibleAnswers.length == 0) { //if no answer found
            _answers = SpecialContext['wrongInput'];
			_title = SpecialContext['wrongInput'];
        }
        if (_possibleAnswers.length == 1) { //context recognized
            _answers = Content[_possibleAnswers[0]].values;
			_title = Content[_possibleAnswers[0]].description;
        }
        if (_possibleAnswers.length > 1) {
            WriteText(SpecialContext['rephrase'], targetDiv, SpecialContext['rephrase']);
            for (var i = 0; i < _possibleAnswers.length; i++) {
                WriteText(Content[_possibleAnswers[i]].description, targetDiv, Content[_possibleAnswers[i]].description);
            }
        }
    }
    if (_answers.length > 0) {
        var _rand = Math.floor((Math.random() - 0.001) * _answers.length);
        WriteText(_answers[_rand], targetDiv, _title);
    }
};

function WriteText(text, targetDiv, title) {
    targetDiv.innerHTML += "<p class='ai' title='" + title + "'>" + text + "</p>";
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