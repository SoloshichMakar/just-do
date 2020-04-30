function taskElementValid(element) {
    if (element !== null && element !== undefined && element !== '') {
        return true;
    }
    return false;
}

function completeValid(completed) {
    if (taskElementValid(completed) && (completed === true || completed === false)) {
        return true;
    }
    return false;
}


module.exports = {

    taskCreateValidation(args) {
        const {name, description, userId} = args;

        if ((taskElementValid(name))
            && (taskElementValid(description))
            && (taskElementValid(userId))) {
            next();
        } else {
            throw new Error('Invalid task');
        }
    },

    taskUpdateValidation(args) {
        const { name, description, completed, userId } = args;

        if (((name === undefined || taskElementValid(name))
            && (description === undefined || taskElementValid(description)))
            && (completed === undefined || completeValid(completed))
            && (userId === undefined)) {
            next();
        } else {
            throw new Error('Invalid task');
        }
    },
};