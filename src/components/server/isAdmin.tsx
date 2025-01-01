"use server"
const team_id = JSON.parse(process.env.TEAM_ID || '[]');
console.log("team id:",team_id);

export async function isUserAdmin(session: any) {
    if (!session) {
        return false;
    }
    if (Array.isArray(team_id) && team_id.includes(session.user.id)) {
        return true;
    }
    return false;
}