export interface User {
  id: string;
  name: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  email: string;
  isAdmin: boolean;
}

export enum Difficulty {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface Class {
  id: string;
  name: string;
  maxAttendees: number;
  date: Date;
  attendees: string[];
  difficulty: Difficulty;
  isActive: boolean
}

export enum EmployeeRol {
  trainer = 'trainer',
  personal_trainer = 'personal_trainer',
  class_trainer = 'class_trainer',
  support = 'support'

}

export interface Employee {
  id: string
  name: string,
  lastName: string,
  isActive: boolean,
  role: EmployeeRol
}