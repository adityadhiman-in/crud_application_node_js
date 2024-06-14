import express from 'express';
import User from '../models/users.js';
import multer from 'multer';
import fs from "fs";

const router = express.Router();

//Image Upload
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) { // Corrected "filename" spelling
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: storage,
}).single('image');

//Routes

//Insert User
router.post("/add",upload, (req, res)=>{
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        image:req.file.filename,
    });
   
    user.save()
    .then(() => {
        req.session.message = {
            type: 'success',
            message: 'User added successfully'
        };
        res.redirect("/");
    })
    .catch((err) => {
        res.json({ message: err.message, type: "danger" });
        res.redirect("/"); 
    });

});

//Read Routs
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.render("index", {
            title: "Home",
            users: users
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).render("error", {
            title: "Error",
            message: "An error occurred while fetching users. Please try again later."
        });
    }
});

//Edit Users
router.get("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        
        if (!user) {
            // User not found
            return res.redirect("/");
        }

        // Render the edit user page with the retrieved user data
        res.render("edit_users", {
            title: "Edit User",
            user: user
        });
    } catch (error) {
        // Handle errors gracefully, such as rendering an error page or providing a flash message
        console.error("Error editing user:", error);
        res.status(500).render("error", { message: "Error editing user" });
    }
});

// Update Users
router.post("/update/:id", upload, async (req, res) => {
    try {
        const id = req.params.id;
        let new_image = "";

        // If a new image is uploaded, delete the old image
        if (req.file) {
            new_image = req.file.filename;
            try {
                fs.unlinkSync("./uploads/" + req.body.old_image);
                console.log("Old image deleted successfully");
            } catch (err) {
                console.error("Error deleting old image:", err);
            }
        } else {
            new_image = req.body.old_image;
        }

        // Update user information in the database
        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image
        });

        // Set session message and redirect to home page
        req.session.message = {
            type: "success",
            message: "User updated successfully"
        };
        res.redirect("/");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", type: "danger" });
    }
});

//Delete User

router.get("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.redirect("/");
        }

        await User.findByIdAndDelete(id);

        if (user.image) {
            fs.unlink("./uploads/"+ user.image, (err) => {
                if (err) {
                    console.error("Error deleting user image:", err);
                } else {
                    console.log("User image deleted successfully");
                }
            });
        }

        req.session.message = {
            type: "success",
            message: "User deleted successfully"
        };

        res.redirect("/");
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user", type: "danger" });
    }
});


//Basic Routes
router.get("/add", (req, res)=>{
    res.render("addUsers", {title: "Add Users"})
});

router.post("/add", (req, res)=>{
    
});

router.get("/contact", (req, res)=>{
    res.render("contact", {title: "Contact Us"})
})
 
export default router;