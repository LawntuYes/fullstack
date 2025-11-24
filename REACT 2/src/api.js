export async function getUsers() {


    try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch('http://localhost:3000/api/users/get');
    const data = await response.json();

    return data;
        } catch (Error) {
        throw new Error('Network response was not ok');
    }
    

}