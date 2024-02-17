

export async function getUser() {
    try {
        const response = await axios.get('http://localhost:3000/api/user/' + user.idName, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.log("Error fetching user: " + error);
        throw error;
    }
}