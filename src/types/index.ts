export interface User {
  id: string;
  name: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  isAdmin: boolean;
}

enum Difficulty {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface Class {
  id: string;
  name: string;
  maxAttendees: number;
  date: Date;
  attendees: User[];
  difficulty: Difficulty;
}
