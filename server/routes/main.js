var express = require('express');
var router = express.Router();

/**
 * Load main page
 */
router.get('/dashboard', (req, res)=>{
    res.render('admin/dash', {
        title: "Main Dashboard page"
    })
})

/**
 * Load Skills Page
 */
router.get('/skills', (req, res)=>{
    res.render('admin/skills')
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
    res.render('admin/projects')
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
    res.render('admin/userInfo')
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
    res.render('admin/testimonials')
})

router.post('/add_testimonial', (req, res)=>{
    
})

router.post('/update_testimonial', (req, res)=>{

})

router.post('/delete_testimonial', (req, res)=>{

})


module.exports = router;