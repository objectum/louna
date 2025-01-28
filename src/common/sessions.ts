// todo: redis?
const sessions = {
    testSessionId: 1,
}

export function addUserSession(sessionId: string, userId: number) {
    sessions[sessionId] = userId
}

export function getSessionUserId(sessionId: string) {
    return sessions[sessionId]
}
