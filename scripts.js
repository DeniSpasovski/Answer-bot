/* AnswerBot is a stupid bot created by Deni Spasovski */
var answerBot = function () {
    var _this = this;
    _this.processInput = function (text) {
		updateUrl(text);
        var _result = "<p class='answerbot-input'>" + text + "</p>";
        text = text.replace(new RegExp("[^a-zA-Z ]", "g"), " ");
        text = text.replace(new RegExp("[ ]{2,}", "g"), " ");
        var _words = text.toLowerCase().split(" ");
        var _answers = [];
        var _title = "";
        if (_words.length === 0 || _words.toString() === '') { //if the input is empty
            _answers = _this.specialContext.emptyInput;
            _title = _this.specialContext.emptyInput;
        } else {
            var _possibleAnswers = findMatches(_words);
            if (_possibleAnswers.length === 0) { //if no answer found
                _answers = _this.specialContext.wrongInput;
                _title = _this.specialContext.wrongInput;
            }
            if (_possibleAnswers.length == 1) { //context recognized
                _answers = _this.answers[_possibleAnswers[0]].values;
                _title = _this.answers[_possibleAnswers[0]].description;
            }
            if (_possibleAnswers.length > 1) {
                _result += formatText(_this.specialContext.rephrase, _this.specialContext.rephrase);
                for (var i = 0; i < _possibleAnswers.length; i++) {
                    _result += formatText(_this.answers[_possibleAnswers[i]].description, _this.answers[_possibleAnswers[i]].description);
                }
            }
        }
        if (_answers.length > 0) {
            var _rand = Math.floor((Math.random() - 0.001) * _answers.length);
            _result += formatText(_answers[_rand], _title);
        }
        return _result;
    };

    function formatText(text, title) {
        return "<p class=\'answerbot-ai\' title=\'" + title + "\'>" + text + "</p>";
    }

    function findMatches(words) {
        var foundKeywords = [];
        var _possibleAnswers = [];
        for (var i = 0; i < _this.keywords.length; i++) {
            foundKeywords[i] = 0;
            for (var j = 0; j < words.length; j++) {
                if (_this.keywords[i].keys.indexOf(words[j]) >= 0) {
                    foundKeywords[i]++;
                    if (foundKeywords[i] == _this.keywords[i].keys.length) {
                        return [_this.keywords[i].value];
                    }
                }
            }
            if (foundKeywords[i] * 2 > _this.keywords[i].keys.length) {
                _possibleAnswers.push(_this.keywords[i].value);
            }
        }
        return _possibleAnswers.filter(function (elem, pos) {
            return _possibleAnswers.indexOf(elem) == pos;
        });
    }
	
	function updateUrl(text){
		history.pushState(null, null, "?question=" + encodeURIComponent(text));
		if(typeof ga === "function")//google analytics
			ga('send', 'pageview', 'page path');
	}
};