// lib/codes.ts

// One structure handles both the password and the quiz for a given flow
export interface TreasureFlow {
    Code: string;          // The initial page identifier (e.g., "treasure1234")
    Password: number;      // The password to match
    Quiz_Code: string;     // The unique identifier for the quiz page (e.g., "quiz-A")
    Quiz_Question: string; // The question text
    Quiz_Answer: string;   // The correct answer for the quiz (store as string)
}

export const treasureFlowDB: TreasureFlow[] = [
    {
        "Code": "treasure1234",
        "Password": 12345,
        "Quiz_Code": "quiz-4564687",
        "Quiz_Question": "https://i.postimg.cc/bJPk8V2h/eideqn.jpg",
        "Quiz_Answer": "300",
    },
    // You can add other independent treasure flows here, if needed
    {
        "Code": "piratechest99",
        "Password": 67890,
        "Quiz_Code": "quiz-12345645",
        "Quiz_Question": "https://i.postimg.cc/bJPk8V2h/eideqn.jpg",
        "Quiz_Answer": "eid mubarak", // Example long string answer
    },
];

export default treasureFlowDB;