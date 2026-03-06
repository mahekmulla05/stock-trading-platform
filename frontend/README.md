# SB Stock Frontend

This is the standalone frontend for the SB Stock Trading platform. It is designed to work independently of the backend folder, communicating via a REST API.

## 🚀 frontend

### 1. Configuration (.env)
The frontend uses a `.env` file to know where the backend server is running. 
- Open the `.env` file in the root directory.
- Update `REACT_APP_API_URL` to your local backend address (e.g., `http://localhost:6001`).

```env
REACT_APP_API_URL=http://your-backend-url:port
```

### 2. Getting Started
1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Start the Frontend**:
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

### 3. API Integration Notes
- **Authentication**: The frontend expects JSON responses for `/login` and `/register`. It stores user details and a JWT `token` in `localStorage`.
- **Role Redirection**: Redirection logic is handled in `src/RouteProtectors/PublicRoute.js` based on the `userType` stored in `localStorage`.
- **Central Config**: All API calls use the `API_URL` exported from `src/config.js`, which reads from your `.env` file.

---
## Standard Create React App Scripts
### `npm start`
Runs the app in the development mode.
### `npm run build`
Builds the app for production to the `build` folder.

