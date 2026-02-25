function validateUser (data){
    const errors = [];

    // name validation
    if (!data.name || data.name.trim().length < 3) {
        errors.push("Name must be at least 3 characters");
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push("Invalid email address");
    }

    // psw validation
    if (!data.password || data.password.length < 6) {
        errors.push("Password must be at least 6 characters");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

module.exports = { validateUser };