// utils/testData.js
// Small helper so every test run uses a brand-new, unique email.
// Demo Web Shop does not let you register the same email twice,
// so this is important for the tests to be re-runnable.

function randomEmail() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `qa_student_${timestamp}_${random}@testmail.com`;
}

function newUser() {
  return {
    firstName: 'Rahim',
    lastName: 'Automation',
    email: randomEmail(),
    password: 'Test@1234',
  };
}

module.exports = { randomEmail, newUser };
