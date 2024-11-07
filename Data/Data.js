// Data.js (for storing multiple users' data)
const usersData = [
    {
      student_number: "12345",
      student_name: "John Doe",
      scores: [10, 15, 10, 5, 10],  // Example scores from 5 rounds
    },
    {
      student_number: "67890",
      student_name: "Jane Smith",
      scores: [15, 15, 10, 10, 15],
    },
    // More user data...
  ];
  
  // Function to get all user data
  export const getAllUserData = () => {
    return usersData;
  };
  
  // Function to get a specific user's data by student number
  export const getUserDataByStudentNumber = (studentNumber) => {
    return usersData.find(user => user.student_number === studentNumber);
  };
  
  // Function to add new user data (if needed)
  export const addUserData = (studentNumber, studentName, scores) => {
    usersData.push({ student_number: studentNumber, student_name: studentName, scores });
  };
  
  // Function to calculate total score for each user
  export const calculateTotalScore = (scores) => {
    return scores.reduce((acc, score) => acc + score, 0);
  };
  