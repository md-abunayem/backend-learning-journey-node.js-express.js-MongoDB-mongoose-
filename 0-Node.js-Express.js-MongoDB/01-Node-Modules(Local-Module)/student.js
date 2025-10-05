const getName = () => {
  return "Nayem";
};

function getAge() {
  return 29;
}

const cgpa = 3.99;

// exports.getName = getName;
// exports.getAge = getAge;
// exports.cgpa = cgpa;

//export all functions and variable using one statement
module.exports = {
  getName,
  getAge,
  cgpa,
};
