// lib/codes.ts

// One structure handles both the password and the quiz for a given flow
export interface TreasureFlow {
    Code: string;          // The initial page identifier (e.g., "treasure1234")
    Password: number;      // The password to match
    Quiz_Code: string;     // The unique identifier for the quiz page (e.g., "quiz-A")
    Quiz_Question: string; // The question text
    Quiz_Answer: string;   // The correct answer for the quiz (store as string)
    Secret_Word: string;
}

export const treasureFlowDB: TreasureFlow[] = [
    {
        "Code": "indiagateitis",
        "Password": 12345,
        "Quiz_Code": "quiz-4564687",
        "Quiz_Question": "https://i.postimg.cc/bJPk8V2h/eideqn.jpg",
        "Quiz_Answer": "300",
        "Secret_Word": "EEE CDI"
    },
    {       // complete
        "Code": "bestbuildingbuet",
        "Password": 67890,
        "Quiz_Code": "sherlockholmes200915900",
        "Quiz_Question": "https://i.postimg.cc/TwrP46h6/Screenshot-2025-12-23-034727-min.png",
        "Quiz_Answer": "isometric", 
        "Secret_Word": "Mecha Drawing CDI"
    },
    {
        "Code": "upsidewasdown",
        "Password": 67890,
        "Quiz_Code": "quiz-12345645",
        "Quiz_Question": "https://i.postimg.cc/bJPk8V2h/eideqn.jpg",
        "Quiz_Answer": "eid mubarak", 
        "Secret_Word": "Mecha Drawing CDI"
    },
    {
        "Code": "buetbrsbutnotbrs",
        "Password": 67890,
        "Quiz_Code": "quiz-12345645",
        "Quiz_Question": "https://i.postimg.cc/bJPk8V2h/eideqn.jpg",
        "Quiz_Answer": "eid mubarak", 
        "Secret_Word": "Mecha Drawing CDI"
    },
    {
        "Code": "doorcoloredred",
        "Password": 67890,
        "Quiz_Code": "quiz-12345645",
        "Quiz_Question": "https://i.postimg.cc/bJPk8V2h/eideqn.jpg",
        "Quiz_Answer": "eid mubarak", 
        "Secret_Word": "Mecha Drawing CDI"
    },
    {
        "Code": "archfflookup",
        "Password": 67890,
        "Quiz_Code": "quiz-code-12345645",
        "Quiz_Question": "https://i.postimg.cc/kGD39Ccj/cake-f.jpg",
        "Quiz_Answer": "gas welding",
        "Secret_Word": "Welding Shop CDI"
    },
];

export default treasureFlowDB;