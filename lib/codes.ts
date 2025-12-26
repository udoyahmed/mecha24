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
        "Code": "T883Q28d5aEnaa",
        "Password": 907235,
        "Quiz_Code": "OIg542sST2Kow0",
        "Quiz_Question": "https://i.postimg.cc/bJPk8V2h/eideqn.jpg",
        "Quiz_Answer": "reddit",
        "Secret_Word": 
        `[Part 1]

        Sherlock and Watson enter the crime scene

        Sherlock: So what seems to be the case?

        Cop: The person lying in front of you is D. Neighbors found him dead like this.

        Watson: Observing the body, I smell bitter almonds.
        
        Watson estimates the time of death`
    },
    {    
        "Code": "4mjiDm72b79s8Q",
        "Password": 179885,
        "Quiz_Code": "H0rPNq00mzua8M",
        "Quiz_Question": "https://i.postimg.cc/TwrP46h6/Screenshot-2025-12-23-034727-min.png",
        "Quiz_Answer": "isometric", 
        "Secret_Word": 
        `[Part 2]

        Sherlock and Watson check the call records of the victim, D

        Sherlock: D seemed to have called someone close to the time of his death. We should get in contact with whoever was on the other side of the phone.

        The person on the other side of the phone explained that D had gotten a ring at his door, which was supposedly the mailman.
        `
    },
    {
        "Code": "TN2j3k7cn6x19F",
        "Password": 246311,
        "Quiz_Code": "T92C943r7R3kKH",
        "Quiz_Question": "https://i.postimg.cc/bJPk8V2h/eideqn.jpg",
        "Quiz_Answer": "refrigerant", 
        "Secret_Word": 
        `[Part 3]

        All that burns leads to remains. Maybe chemistry can change that?
        `
    },
    {
        "Code": "85mz786bdzHd18",
        "Password": 341691,
        "Quiz_Code": "9SOx8ukPc6c4NX",
        "Quiz_Question": "https://i.postimg.cc/XN93K7RJ/9SOx8uk-Pc6c4NX.jpg",
        "Quiz_Answer": "advisor", 
        "Secret_Word": "Mecha Drawing CDI"
    },
    {           // complete
        "Code": "62c729OTIP60bR",
        "Password": 712396,
        "Quiz_Code": "52nX50XRt4EmIZ",
        "Quiz_Question": "https://i.postimg.cc/3xdg66Cp/52n-X50XRt4Em-IZ.jpg",
        "Quiz_Answer": "crucible", 
        "Secret_Word": 
        `[Part 4]

        Sherlock and Watson investigate D's workplace

        Manager: Due to recent budget cuts, a lot of people were laid off. However, not all of them were okay with accepting it. D was in charge of choosing who to fire.

        Sherlock: Who was notably unhappy with D because of it?

        Manager: E.

        Sherlock and Watson go to E's residence and see him dead—suicide—with a note confessing to his crime.

        Sherlock and Watson also find a piece of <b>paper</b>. It had the sentence "Swipe" written on it.
        `
    },
    {           // complete
        "Code": "Xwc8Z93B3SEg6X",
        "Password": 483518,
        "Quiz_Code": "al8INHy3vC79AB",
        "Quiz_Question": "https://i.postimg.cc/28CGH2K9/image.png",
        "Quiz_Answer": "gas welding",
        "Secret_Word": "Welding Shop CDI"
    },
];

export default treasureFlowDB;