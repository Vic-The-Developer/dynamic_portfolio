var express = require('express');
var router = express.Router();

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

router.post('/add_skill', (req, res)=>{
    
})

router.post('/update_skill', (req, res)=>{

})

router.post('/delete_skill', (req, res)=>{

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

router.post('/add_project', (req, res)=>{
    
})

router.post('/update_project', (req, res)=>{

})

router.post('/delete_project', (req, res)=>{

})


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

router.post('/add_user_info', (req, res)=>{
    
})

router.post('/update_user_info', (req, res)=>{

})

router.post('/delete_user_info', (req, res)=>{

})

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


module.exports = router;