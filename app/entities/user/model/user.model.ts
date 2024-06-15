export interface User {
    id: number;
    profile: {
        name: string;
        surname?: string;
        photo?: string;
    }
}