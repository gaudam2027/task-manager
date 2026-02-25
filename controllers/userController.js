const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const {validateUser} = require('../validators/validators')
const loadSignUp = async (req, res) => {
    try {
        res.render('auth/signup')
        
    } catch (error) {
        console.error("Error loading signup page:", error);
        res.status(500).send("Internal Server Error");
    }
};

const signUp = async (req, res) => {
    try {
        const {name,email,password} = req.body

        //validation
        const {isValid,errors} = validateUser({name,email,password})
        if(!isValid){
            return res.status(400).json({
                success: false,
                message: errors.join(", ")
            });
        } 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        //create user
        const user = await User.create({name,email,password: hashedPassword});
        console.log(user)

        req.session.userId = user._id;

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email }
        });

        
    } catch (error) {
        console.error("Error signup page:", error);
        res.status(500).send("Internal Server Error");
    }
};

const loadsignIn = async (req, res) => {
    try {
        res.render('auth/signin')
    } catch (error) {
        console.error("Sign-in error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const signIn = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        req.session.userId = user._id;
        console.log(req.session.userId)
        return res.status(200).json({ success: true, message: "Login successful", redirect: "/" });
    } catch (error) {
        console.error("Sign-in error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).send("Could not log out. Try again.");
        }
        res.clearCookie('connect.sid');
        res.redirect('/signin');
    });
};
module.exports = {
    loadSignUp,
    signUp,
    loadsignIn,
    signIn,
    logout
}