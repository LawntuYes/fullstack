export async function getPosts() {


    try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    return data;
        } catch (Error) {
        throw new Error('Network response was not ok');
    }
    

}