//모든 유저의 데이터를 받아봅시다!
const usersData = [
    {
      student_number: "12345",
      student_name: "John Doe",
      scores: [10, 15, 10, 5, 10],  // 걍 5판마다 점수인거에요 예시임
    },
    {
      student_number: "67890",
      student_name: "Jane Smith",
      scores: [15, 15, 10, 10, 15],
    },
    // 그렇게해서 더 받아봅시다
  ];a
  
  
  // 하지만 데이터를 받는 함수가 있어야겠죠?
  export const getAllUserData = () => {
    return usersData;
  };
  
  // 그리고 학번 이름이 같은지 확인도 해야합니다.
  export const getUserDataByStudentNumber = (studentNumber) => {
    return usersData.find(user => user.student_number === studentNumber);
  };
  
  // 이건 학번 이름 점수 추가하는거에요
  export const addUserData = (studentNumber, studentName, scores) => {
    usersData.push({ student_number: studentNumber, student_name: studentName, scores });
  };
  
  // 그래서 토탈 점수를 계산해서 저장합니다아!
  export const calculateTotalScore = (scores) => {
    return scores.reduce((acc, score) => acc + score, 0);
  };
  