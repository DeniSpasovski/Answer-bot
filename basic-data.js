var Keywords = [
    { "keys": ["hi"], "value": 0 },
    { "keys": ["hello"], "value": 0 },
    { "keys": ["life", "universe", "everything"], "value": 1 },
    { "keys": ["software", "development"], "value": 2 },
    { "keys": ["software", "engineering"], "value": 2 },
    { "keys": ["software", "sales"], "value": 3 },
    { "keys": ["whatever", "sales"], "value": 3 }
];

var Content = [
{
    "description": "Did you mean hello?",
    "values": ["I'm good how are you?", "Hi how can I help you today?"]
},
{
    "description": "The answer to life the universe and everything?",
    "values": ["42!"]
},
{
    "description": "What is software development?",
    "values": ["Programming! Do you speak it?"]
},
{
    "description": "What is sales?",
    "values": ["Cashing out!"]
}
];

SpecialContext = {
    'wrongInput': ["I don't understand you.", "Could you rephrase the question?"],
    'emptyInput': ["Please say something", "Speak louder", "Well i can't read minds."],
    'rephrase': ["Can you tell me if your question was about one of the following things:"]
};