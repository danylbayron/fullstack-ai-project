import { User } from "../types/user";

// Mock API function
export const fetchUsers = async (): Promise<User[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];
};

export const createUser = async (userData: Omit<User, "id">): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: Math.floor(Math.random() * 1000),
    ...userData,
  };
};
