let response = [];
export { response };
let query = '';
const apiKey = `B/h3bcauprFPt8/2UaeEOQ==bQqEEgbWkNbr4JXE`;
const url = "https://api.api-ninjas.com/v1/nutrition?query=";
const options = {
    method: 'GET' ,
    headers: {
         'X-Api-Key': apiKey,
        },
};    
export const GET = async function getFood(){
    try{
        const res = await fetch(url + query, options);
        if(!res.ok){
            throw new Error('HTTP Error!')
        }
            response = await res.json();
            if(response.length === 0){
                throw new Error('No data found. Check query or spelling.')
            }
            console.log(response);
        }
        catch (error) {
            console.error("Error:", error.message);}
        }