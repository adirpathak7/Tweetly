Sure! Here’s a well-structured prompt for GitHub Copilot to help you create a React frontend that integrates with your existing Tweetly Node.js backend:

---

**Prompt for GitHub Copilot:**

**Project Overview:**

I am building a frontend for my Node.js REST API project called **Tweetly**. Tweetly manages users, posts, and comments with JWT-based authentication and role-based access control (RBAC). I need to create a fully responsive, modern, and intuitive React frontend using **Tailwind CSS**, which supports both **dark mode and light mode** with a toggle.

**Features to Implement:**

1. **Authentication:**

   * User Registration and Login.
   * Store JWT token in cookies for secure storage.
   * Send JWT token in request headers for authentication on protected API routes.

2. **Role-based Access Control:**

   * Use the JWT token to determine if the user has `ADMIN` or `USER` roles.
   * Show/Hide specific features based on user roles. For example, Admins can promote users or delete users.

3. **Posts & Comments:**

   * Display a list of posts and allow users to view individual posts and comments.
   * CRUD functionality for posts and comments with ownership checks (only the owner or an admin can update/delete posts and comments).
   * Create forms to add/edit posts and comments.

4. **UI/UX Design:**

   * Make the UI modern, responsive, and intuitive.
   * Implement a **dark mode** and **light mode** toggle.
   * Use **Tailwind CSS** for styling (ensure responsiveness on all screen sizes).
   * Ensure the design is user-friendly, especially for mobile users.

5. **API Integration:**

   * Integrate with the backend API endpoints to fetch data (e.g., posts, comments, users).
   * Handle API errors gracefully, showing user-friendly messages when something goes wrong.
   * Use proper loading states when fetching data from the API.

6. **Routing:**

   * Use **React Router** for navigation between pages like login, register, dashboard, posts, etc.

7. **State Management:**

   * Use **React Context** or **Redux** (if required) to manage user authentication state and posts.

8. **Security:**

   * Ensure JWT tokens are sent securely in request headers for protected routes.
   * Store JWT token in cookies with HttpOnly flag to prevent client-side access.

**File Structure:**
The file structure should follow industry standards, such as:

* `components/`: For reusable UI components like buttons, form elements, etc.
* `pages/`: For different page views like login, register, dashboard, etc.
* `services/`: For functions to make API calls.
* `context/` (or `redux/`): For managing global state like authentication.
* `utils/`: For utility functions like cookie management.

**Extra Features/Requests:**

* Implement a loading spinner or skeleton loaders while fetching posts and comments.
* Add a 404 page for unknown routes.
* Include proper error handling and display error messages where necessary.
* Show a **profile page** where the logged-in user can see their details and posts.
* Include a **logout** functionality that clears JWT cookies and redirects the user to the login page.

---

This prompt gives Copilot a comprehensive set of instructions for creating the frontend of your app with all the necessary features and functionalities. You can just copy-paste this into the editor, and Copilot should help you get started on creating a solid and fully functional React frontend for your backend.

If you need any changes or further guidance on specific parts of the prompt, just let me know!
