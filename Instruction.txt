Role-Based Access Control (RBAC) Documentation
In this system, access to certain routes is restricted based on the role of the user. The middleware functions validatetoken and validaterole ensure that users are authenticated and authorized to perform actions based on their roles.
Key Roles in the System:
•	Admin: Full access to all administrative features, such as managing agents, users, policies, and applications.
•	Agent: Access to certain features related to insurance policies and user management, but with restricted access compared to Admin.
•	User: Regular users who can apply for life insurance and manage their own profiles.

1.  Register Admin
•	Method: POST
•	Role(s): Admin
•	Middleware:
o	validatetoken: Ensures the request has a valid authentication token.
o	validaterole(['Admin']): Ensures only users with the "Admin" role can register new admins.
•	Function: Registers a new admin user.

2.  View All Agents
•	Method: GET
•	Role(s): Admin
•	Middleware:
o	validatetoken: Ensures the request has a valid authentication token.
o	validaterole(['Admin']): Ensures only admins can view all agents.
•	Function: Displays all agents in the system.

3. View All Users
•	Method: GET
•	Role(s): Admin
•	Middleware:
o	validatetoken: Ensures the request has a valid authentication token.
o	validaterole(['Admin']): Ensures only admins can view all users.
•	Function: Displays all users in the system.

4. Add Insurance Policy
•	Method: POST
•	Role(s): Admin
•	Middleware:
o	validatetoken: Ensures the request has a valid authentication token.
o	validaterole(['Admin']): Ensures only admins can add new policies.
•	Function: Allows admins to add a new life insurance policy to the system.

5. View Life Insurance Applications
•	Method: GET
•	Role(s): Admin, Agent
•	Middleware:
o	validatetoken: Ensures the request has a valid authentication token.
o	validaterole(['Admin', 'Agent']): Ensures only admins and agents can view life insurance applications.
•	Function: Displays all life insurance applications for the admin or agent to review.

6.  Update Life Insurance Status
•	Method: PUT
•	Role(s): Agent
•	Middleware:
o	validatetoken: Ensures the request has a valid authentication token.
o	validaterole(['Agent']): Ensures only agents can update the status of life insurance applications.
•	Function: Allows agents to update the status of life insurance applications (e.g., approve, deny).

7. Update Password
•	Method: PUT
•	Role(s): Admin, Agent, User
•	Middleware:
o	validatetoken: Ensures the request has a valid authentication token.
o	validaterole(['Admin', 'Agent', 'User']): Ensures that users, agents, or admins can update their password.
•	Function: Allows users, agents, or admins to change their password.

8.  Register User
•	Method: POST
•	Role(s): None (Public route)
•	Function: Registers a new user in the system. No specific role is required.

9.  Login
•	Method: POST
•	Role(s): None (Public route)
•	Function: Authenticates a user and returns a token for further requests. No specific role is required.

10. Apply for Life Insurance
•	Method: POST
•	Role(s): User
•	Middleware:
o	validatetoken: Ensures the request has a valid authentication token.
o	validaterole(['User']): Ensures that only users can apply for life insurance policies.
•	Function: Allows users to apply for a life insurance policy.
CONCLUSION
•	Admin: Has access to almost all administrative routes, such as managing users, agents, and policies.
•	Agent: Can view applications, update insurance statuses, and apply for insurance policies on behalf of users.
•	User: Can register, log in, and apply for life insurance.
All the backend functionality done using NODEJS and MYSQL 
NOTE :I have not deployed the sql and code so please run this in your localsystem by installing nodemodules please add one credentials in db  with admin role like admin@gmail.com admin@123 for accessing admin functions add manualy from in the sqlworkbench
In the frontend I had done only login register and for directing to the dashboards for easy access for the remaining functions there is only backendcode so run you can test the code in the postman and also in postman please add headers to while testing in postman x-token and token key and values 
