var QuoraEasyTool = new Object();

var Storage = function(storageType){

	this.store = storageType || chrome.storage.local;

	this.set = function(key,value){

		this.store.set( {key : value}, function(result){
		});

	};

	this.get = function(key){

		var value = null;
		this.store.get(key, function(result){
			value = result[key] || null;
		});

		return value;

	};

	this.remove = function(key){

		this.store.remove(key, function(result){
		});

	};

	this.update = function(key,value){

		this.set(key,value);

	};

	this.clear = function(){

		this.store.clear();

	};

};


var BookmarkQuestion = function(store){

	this.KEY_BOOKMARK_QUESTION = "BookmarkQuestions";
	this.questions = null;
	this.store = store;

	this.init = function(){

		this.questions = this.store.get(this.KEY_BOOKMARK_QUESTION) || {};

	};

	this.updateStoredQuestions = function(){

		this.store.update(this.KEY_BOOKMARK_QUESTION, this.questions);

	};

	this.__getQuestionTopicFromURL = function(questionURL){

		var topic = null;

		questionURL = questionURL.split("//")[1];
		var splitURL = questionURL.split("/");
		
		if(splitURL.length == 3){
			topic = splitURL[1];
		}

		return topic;

	};

	this.__getQuestionFromURL = function(questionURL){

		var question = null;

		questionURL = questionURL.split("//")[1];
		var splitURL = questionURL.split("/");

		question = splitURL[splitURL.length - 1];
		question = question.split("-").join(" ");

		return question;

	};

	this.addQuestion = function(questionURL){

		var newQuestion = {};
		newQuestion['topic'] = this.__getQuestionTopicFromURL(questionURL);
		newQuestion['question'] = this.__getQuestionFromURL(questionURL);

		this.questions[questionURL] = newQuestion;
		this.updateStoredQuestions();

	};

	this.removeQuestion = function(questionURL){

		delete this.questions[questionURL];
		this.updateStoredQuestions();

	};

	this.checkIfQuestionExists = function(){

	};

	this.checkIfValidQuestion = function(){

	};

};


document.addEventListener('DOMContentLoaded', function () {

	chrome.tabs.getSelected(null, function(tab) {
		var url = tab.url;

		url = url.split("//")[1];
		var splitURL = url.split("/");
		console.log(splitURL);

		console.log(splitURL.length);
		topic = splitURL[1];

		var question = splitURL[splitURL.length - 1];
		question = question.split("-").join(" ");

		console.log(topic);
		console.log(question);
	});

});