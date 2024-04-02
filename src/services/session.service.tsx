import { Session } from "@interfaces/session.interfaces";

const SESSION_KEY = "sessionData";

export const SessionService = {
  getSession() {
    const storedSession = localStorage.getItem(SESSION_KEY);
    return storedSession ? JSON.parse(storedSession) : null;
  },

  updateSession(sessionData?: Session) {
    if (sessionData) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
    return;
  },
};
