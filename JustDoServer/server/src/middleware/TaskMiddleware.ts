function taskElementValid(element) {
  return element !== null && element !== undefined && element !== "";
}

function completeValid(completed) {
  return taskElementValid(completed) && typeof completed === "boolean";
}

module.exports = {
  taskCreateValidation(args) {
    const { name, description, userId } = args;

    if (
      taskElementValid(name) &&
      taskElementValid(description) &&
      taskElementValid(userId)
    ) {
    } else {
      throw new Error("Invalid task");
    }
  },

  taskUpdateValidation(args) {
    const { name, description, completed, userId } = args;

    if (
      (name === undefined || taskElementValid(name)) &&
      (description === undefined || taskElementValid(description)) &&
      (completed === undefined || completeValid(completed)) &&
      userId === undefined
    ) {
    } else {
      throw new Error("Invalid task");
    }
  },
};
