// Data to populate the select element
const studentData = [];

// Function to populate the select element
async function populateSelect() {
  const selectElement = document.getElementById("student");

  const response = await fetch("http://localhost:3000/students"); // Replace with your API endpoint
  const studentData = await response.json();

  // Create and append new options
  studentData.forEach((student) => {
    const option = document.createElement("option");
    option.value = student.id;
    option.textContent = student.name + " " + student.id;
    selectElement.appendChild(option);
  });
}
populateSelect();

async function setSessionData(studentId) {
  try {
    const response = await fetch("/set-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    });
    const result = await response.json();
    console.log(result.message); // 'Session data set'
    console.log("Student ID:", result.studentId); // Check the studentId set in session
  } catch (error) {
    console.error("Error setting session data:", error);
  }
}

async function getSessionData() {
  try {
    const response = await fetch("/get-session");
    const data = await response.json();
    console.log("Session Data:", data.studentId); // Should print the studentId
    return data.studentId; // Return session data for further use
  } catch (error) {
    console.error("Error getting session data:", error);
  }
}

// Example usage
getSessionData().then((studentId) => {
  if (studentId) {
    console.log(`Student ID from session: ${studentId}`);
  } else {
    console.log("No student ID in session");
  }
});
// Call the function to populate the select element

function goClassPage() {
  const studentId = document.getElementById("student").value;
  if (studentId == 0) {
    alert("Please Select Student");
  } else {
    setSessionData(studentId);
  }
}
