# 🚀 StackStories – Full Stack Blog Platform

StackStories is a modern full-stack blogging platform where users can create, share, and interact with content.  
It provides a complete blogging experience with authentication, post management, image uploads, and a comment system.

---

## 🌐 Live Demo

👉 https://stackstories-blog.vercel.app/

---

## 📌 Project Overview

StackStories was built to simulate a real-world content platform where multiple users can:

- Create and manage their own blog posts  
- Interact with other users through comments  
- Upload images and format content  
- Experience a clean and responsive UI  

This project focuses not only on features but also on solving real-world development challenges such as authentication flow, session handling, and role-based permissions.

---

## ⚙️ Tech Stack

### Frontend
- React.js  
- Redux Toolkit  
- Tailwind CSS  

### Backend / BaaS
- Appwrite (Authentication, Database, Storage)  

### Editor
- TinyMCE (Rich text editor for formatted content)

### Deployment
- Vercel  

---

## ✨ Features

### 🔐 Authentication System
- User signup and login using email & password  
- Session management using Appwrite  
- Persistent login state across refresh  

---

### 📝 Post Management (CRUD)
- Create new blog posts  
- Edit existing posts  
- Delete posts  
- View all posts  

---

### 🖼️ Image Upload
- Upload featured images for posts  
- Stored and served using Appwrite Storage  

---

### 💬 Comment System
- Add comments on posts  
- View all comments for a post  
- Delete comments  

---

### 🔒 Role-Based Permissions
- Only post author can edit/delete posts  
- Comment owner can delete their comment  
- Post owner can also delete any comment on their post  

---

### 🎨 UI/UX
- Responsive design using Tailwind CSS  
- Clean and modern layout  
- Separate landing page for non-logged users  
- Dashboard-style homepage for logged-in users  

---

## 🧠 Key Learning & Challenges

This project involved solving several real-world issues:

### 1. Session Handling
- Faced issues like:
  > "Creation of a session is prohibited when a session is active"
- Learned how to properly manage sessions and authentication flow

---

### 2. User Identity Bugs
- Confusion between `$id` and `id`
- Fixed authorization logic by standardizing user identity usage

---

### 3. State Synchronization
- UI breaking on refresh due to async state loading  
- Solved using proper loading states and conditional rendering  

---

### 4. Permission Logic
- Implemented role-based UI behavior  
- Ensured only authorized users can perform actions  

---

🙌 Acknowledgment

This project was inspired by the full-stack project from Chai aur Code, with additional features and improvements implemented independently.


⭐ Final Note

This project represents my journey into full-stack development, where I focused on not just building features but also understanding real-world application behavior and problem-solving.
