var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var passport = require('passport');
const flash = require('connect-flash');

const User = require('../models/user')

/**
 * Load main page
 */
router.get('/dashboard', (req, res)=>{

    const successMessage = req.flash('success');

    res.render('admin/dash', {
        title: "Main Dashboard page",
        successMessage
    })
})

/**
 * Load Skills Page
 */
router.get('/skills', (req, res)=>{

    const successMessage = req.flash('success');

    res.render('admin/skills', {
        title: "Admin | Skills Page",
        successMessage
    })
})

router.post('/add_skill', async (req, res)=>{
    const { email, skillname, percentage } = req.body;

    try {
        // Check if the user with the given userId exists
        const user = await User.find({email: email});

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the new skill to the user's skills array
        user.skills.push({
            skillname,
            percentage,
        });

        // Save the updated user to the database
        await user.save();

        // Respond with a success message or any additional information you want to send
        req.flash('success', 'skill added')
        res.redirect('/admin/skills')
    } catch (error) {
        console.error(error);
        req.flash('success', 'Error occured adding skill')
        res.redirect('/admin/skills')
    }
})

router.post('/update_skill', async (req, res)=>{
    const { email, skillname, percentage } = req.body;

    try {
        // Check if the user with the given email exists
        const user = await User.findOne({ email });

        if (!user) {
            req.flash('success', 'User not found')
        res.redirect('/admin/skills')
        }

        // Find the skill in the user's skills array based on skillname
        const skillToUpdate = user.skills.find(skill => skill.skillname === skillname);

        if (!skillToUpdate) {
            req.flash('success', 'Skill not found')
        res.redirect('/admin/skills')
        }

        // Update the existing skill
        skillToUpdate.percentage = percentage;

        // Save the updated user to the database
        await user.save();

        // Respond with a success message or any additional information you want to send
        req.flash('success', 'Skill updated successfully!')
        res.redirect('/admin/skills')
    } catch (error) {
        console.error(error);
        req.flash('success', 'Error updating skills')
        res.redirect('/admin/skills')
    }
})

router.post('/delete_skill', async (req, res)=>{
    const { email, skillname } = req.body;

    try {
        // Check if the user with the given email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the index of the skill in the user's skills array based on skillname
        const skillIndex = user.skills.findIndex(skill => skill.skillname === skillname);

        if (skillIndex === -1) {
            return res.status(404).json({ error: 'Skill not found' });
        }

        // Remove the skill from the user's skills array
        user.skills.splice(skillIndex, 1);

        // Save the updated user to the database
        await user.save();

        // Respond with a success message or any additional information you want to send
        res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


/**
 * Load Projects Page
 */
router.get('/projects', (req, res)=>{

    const successMessage = req.flash('success');

    res.render('admin/projects', {
        title: "Admin | Projects Page",
        successMessage
    })
})

router.post('/add_project', async (req, res) => {
    const { email, projectname, imageurl, description, projecturl } = req.body;

    try {
        // Check if the user with the given email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Add the new project to the user's projects array
        user.projects.push({
            projectname,
            imageurl,
            description,
            projecturl,
        });

        // Save the updated user to the database
        await user.save();

        // Respond with a success message or any additional information you want to send
        res.status(200).json({ message: 'Project added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/update_project', async (req, res) => {
    const { email, projectName, updatedProject } = req.body;

    try {
        // Check if the user with the given email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the project in the user's projects array based on projectName
        const projectToUpdate = user.projects.find(project => project.projectname === projectName);

        if (!projectToUpdate) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update the existing project
        projectToUpdate.projectname = updatedProject.projectname || projectToUpdate.projectname;
        projectToUpdate.imageurl = updatedProject.imageurl || projectToUpdate.imageurl;
        projectToUpdate.description = updatedProject.description || projectToUpdate.description;
        projectToUpdate.projecturl = updatedProject.projecturl || projectToUpdate.projecturl;

        // Save the updated user to the database
        await user.save();

        // Respond with a success message or any additional information you want to send
        res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/delete_project', async (req, res) => {
    const { email, projectName } = req.body;

    try {
        // Check if the user with the given email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the index of the project in the user's projects array based on projectName
        const projectIndex = user.projects.findIndex(project => project.projectname === projectName);

        if (projectIndex === -1) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Remove the project from the user's projects array
        user.projects.splice(projectIndex, 1);

        // Save the updated user to the database
        await user.save();

        // Respond with a success message or any additional information you want to send
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


/**
 * Load Personal Information Page
 */
router.get('/user_info', (req, res)=>{

    const successMessage = req.flash('success');

    res.render('admin/userInfo', {
        title: "Admin | User Information",
        successMessage
    })
})

router.post('/add_user_info', async (req, res) => {
    const { email, name, age, additionalInfo } = req.body;

    try {
        // Check if the user with the given email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user information
        user.name = name || user.name;
        user.age = age || user.age;
        user.additionalInfo = additionalInfo || user.additionalInfo;

        // Save the updated user to the database
        await user.save();

        // Respond with a success message or any additional information you want to send
        res.status(200).json({ message: 'User information added/updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/update_user_info', async (req, res) => {
    const { email, updatedUserInfo } = req.body;

    try {
        // Check if the user with the given email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user information based on the provided object
        if (updatedUserInfo.name) {
            user.name = updatedUserInfo.name;
        }

        if (updatedUserInfo.age) {
            user.age = updatedUserInfo.age;
        }

        if (updatedUserInfo.additionalInfo) {
            user.additionalInfo = updatedUserInfo.additionalInfo;
        }

        // Save the updated user to the database
        await user.save();

        // Respond with a success message or any additional information you want to send
        res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/delete_user_info', async (req, res) => {
    const { email, infoToDelete } = req.body;

    try {
        // Check if the user with the given email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete specific user information based on the provided object
        if (infoToDelete === 'name') {
            user.name = undefined;
        } else if (infoToDelete === 'age') {
            user.age = undefined;
        } else if (infoToDelete === 'additionalInfo') {
            user.additionalInfo = undefined;
        } else {
            return res.status(400).json({ error: 'Invalid information to delete' });
        }

        // Save the updated user to the database
        await user.save();

        // Respond with a success message or any additional information you want to send
        res.status(200).json({ message: 'User information deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * Load Testimonial Page
 */
router.get('/testimonials', (req, res)=>{

    const successMessage = req.flash('success');

    res.render('admin/testimonials', {
        title: "Admin | Testimonials",
        successMessage
    })
})

router.post('/add_testimonial', (req, res)=>{
    
})

router.post('/update_testimonial', (req, res)=>{

})

router.post('/delete_testimonial', (req, res)=>{

})


/**
 * Signup & login Page
 */
router.get('/signup', (req, res)=>{
    res.render('signup')
})
router.post('/signup', async (req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log(username, email, password)

    // Validate input
    if (!username || !email || !password) {
        req.flash('success', 'All fields are required')
        res.redirect('/admin/signup')
    }

    try {
        // Check if the user with the given email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('success', 'Email already in use!');
            res.redirect('/admin/signup')
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user using the User model
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message or any additional information you want to send
        req.flash('success', 'User registered')
        res.redirect('/admin/login')
    } catch (error) {
        console.error(error);
        req.flash('success', 'Error registering user!')
        res.redirect('/admin/signup')
    }
})


router.get('/login', (req, res)=>{
    res.render('login')
})
router.post('/login', (req, res, next)=>{
    // If validation passes, proceed to authentication
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true,
    })(req, res, next);
})
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }

      req.flash('success', 'You are logged out!');
      res.redirect('/admin/login');
    });
});


module.exports = router;