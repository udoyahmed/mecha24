// lib/codes.ts

// Define a type for your treasure data
export interface TreasureCode {
    Code: string;       // The unique identifier for the page (e.g., "treasure1234")
    Password: number;   // The password to match
}

const db: TreasureCode[] = [
    {
        "Code": "treasure1234",
        "Password": 12345,
    },
    {
        "Code": "piratechest99",
        "Password": 67890,
    },
    {
        "Code": "goldskeleton",
        "Password": 54321,
    },
];

export default db;