
export interface GroupResult {
  id: string;
  name: string;
  members: {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  }[];
  type: 'Group'; // Added type field
}

// Interface for a Member result
export interface MemberResult {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  type: 'User'; 
}

// Combined result type
export type SearchResult = GroupResult | MemberResult;