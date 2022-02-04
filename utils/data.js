const usernames = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];

const thoughts = [
    "when will it all end",
    "im good",
    "look at all those chickens",
    "im really happy for you, ima let you finish but beyonce had one of the best videos of all time",
    "josh, where's the bass?",
    "you may be talented but you're not kanye west",
    "im not even gon lie to you. i love me so much right now",
    "I no longer have a manager. I can't be managed",
    "I need a room full of mirros so I can be surounded by winners",
    "I'm nice at ping pong",
    "Sometimes I push the door close button on people running towards the elevator. I just need my own elevator sometimes. My sanctuary",
    "How to NOT kill yourself pt 1: Avoid being around people who make you want to kill yourself",
    "Lil baby my favourite rapper but wont do a song with me",
    "In Jesus name  No more cap",
    "I cant finish the album because there's a bee in the studio",
    "I have to dress Kim everyday so she doesnt embarrass me",
    "I hate when im on a flight and I wake up with a water bottle next to me like oh great now I gotta be responsible for this water bottle",
    "I'm gonna get everybody their masters back except Drake",
    "I leave my emojis bart Simpson color",
    "my disappointment is immeasurable, and my day is ruined"
];

const reactions = [
    "wow",
    "cool",
    "like",
    "dislike",
    "nothing",
    "happy",
    "sad",
    "whack",
    "that's crazy, say it again"
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = () =>
  `${getRandomArrItem(usernames)}${getRandomArrItem(usernames)}`;

// Function to generate random thoughts that we can add to user object.
const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughts),
        username: getRandomUsername(),
        reactions: [...getReactions(2)]
      });
    }
    return results;
};

// Function to generate a random reaction associated with a random user to a thought
const getReactions = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        reactionBody: getRandomArrItem(reactions),
        username: getRandomUsername(),
      });
    }
    return results;
};

module.exports = { getRandomUsername, getRandomThoughts }

