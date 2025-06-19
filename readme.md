bcrypt

📆 Day 1: Project Setup
Initialize project: npm init -y

Install packages:

bash
Copy
Edit
npm install express mongoose dotenv bcryptjs jsonwebtoken cors
npm install --save-dev nodemon
Setup:

Basic Express server

Connect to MongoDB (mongoose.connect)

Folder structure:

arduino
Copy
Edit
models/
controllers/
routes/
middlewares/
config/
utils/
👤 Day 2: User Auth (Register/Login)
Create User model:

Fields: name, email, password

Hash passwords using bcryptjs

Auth controller:

POST /auth/register

POST /auth/login → returns JWT token

Add JWT_SECRET to .env

Auth middleware: verifyToken(req, res, next)

📝 Day 3: Task Model & CRUD Routes
Create Task model:

js
Copy
Edit
{
  title: String,
  description: String,
  dueDate: Date,
  completed: Boolean,
  priority: String,
  user: ObjectId (ref: 'User')
}
Task routes:

POST /tasks – create

GET /tasks – all tasks (for user)

GET /tasks/:id – single task

PUT /tasks/:id – update

DELETE /tasks/:id – delete

Protect all routes with JWT middleware

🛡️ Day 4: Security + Input Validation
Use express-validator to validate:

Emails, required fields, etc.

Return 400 errors on invalid input

Handle missing token or expired token in auth middleware

Optional: Add rate limiter

🔍 Day 5: Filtering, Sorting, Pagination
Add query support to GET /tasks:

bash
Copy
Edit
/tasks?completed=true&priority=high&sortBy=dueDate&limit=10&page=2
Use .find(), .sort(), .skip(), .limit() with query params

✅ Day 6: Toggle Completion + Categories
Add PATCH route:

PATCH /tasks/:id/toggle – toggle completed

Add optional category field to tasks

Add filtering by category

🧪 Day 7: Testing + Documentation
Use Postman to:

Test auth and all task routes

Test auth protection (401s)

Test edge cases (invalid IDs, empty inputs)

Add README with:

Routes

Sample .env

How to run the project

🧰 Example .env
env
Copy
Edit
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=supersecretkey
🗃️ Optional Extras
Email reminders (nodemailer)

Task recurrence

Admin user who can see all tasks

Export tasks as CSV

