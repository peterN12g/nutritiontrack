<script>
    export let data;
    console.log(data)

    async function handle() {
        const resp = await fetch("/about");
        console.log(await resp.text())
    }

    import {goto} from '$app/navigation';
    let query = ''
    let nutrie = ''
    let nutrient= ''
    let calories = 0
    let totFat = 0
    let satFat= 0
    let sodium = 0
    let potassium = 0
    let cholesterol = 0
    let carbs = 0
    let fiber = 0
    let sugar = 0
    let protein = 0;
    let response = [];
    let BMR = '';
    let carbGoal= '';
    let fatGoal= '';
    let proteinGoal= '';
    let calLeft = '';
    let carbLeft = '';
    let fatLeft = '';
    let proteinLeft = '';
    const apiKey = `B/h3bcauprFPt8/2UaeEOQ==bQqEEgbWkNbr4JXE`;
    const url = "https://api.api-ninjas.com/v1/nutrition?query=";
    const options = {
        method: 'GET' ,
        headers: {
             'X-Api-Key': apiKey,
            },
    };    

    async function getFood(){

        await fetch("/about", { method: "POST" })

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
                const targetElement = document.querySelector('ul');
                targetElement.innerHTML= '';
                nutrie = '';
                nutrient = '';
                if(response.length>1){
                    nutrie= 'Only enter one food at a time!';
                }
                else {
                    response.forEach(name => {
                        const markup = `
                        <li>Name: ${response[0].name}</li>
                        <li>Serving Size: ${response[0].serving_size_g + "g"}</li>
                        <li>Calories: ${response[0].calories}</li>
                        <li>Total Fat: ${response[0].fat_total_g}</li>
                        <li>Saturated Fat: ${response[0].fat_saturated_g}</li>
                        <li>Sodium: ${response[0].sodium_mg}</li>
                        <li>Potassium: ${response[0].potassium_mg}</li>
                        <li>Cholesterol: ${response[0].cholesterol_mg}</li>
                        <li>Carbohydrate: ${response[0].carbohydrates_total_g}</li>
                        <li>Fiber: ${response[0].fiber_g}</li>
                        <li>Sugar: ${response[0].sugar_g}</li>
                        <li>Protein: ${response[0].protein_g}</li>
                        `;
                        if(response[0].calories > 550){
                            nutrie = "Warning! Your food contains a lot of calories at: "+ response[0].calories + " calories!\n";
                        } 
                        if (response[0].fat_total_g>25){
                            nutrie += "Warning! Your meal contains a lot of total fat at: " + response[0].fat_total_g+ " grams! Your daily recommendation is  between 44-70g!\n" 
                        } 
                        if (response[0].fat_saturated_g>10){
                            nutrie += "Warning! Your meal contains a lot of saturated fat at: " + response[0].fat_saturated_g+ " grams! Your daily intake is 30g!\n" 
                        } 
                        if (response[0].sodium_mg>650){
                            nutrie += "Warning! Your meal contains a lot of sodium at: " + response[0].sodium_mg+ " mg! Your daily intake is 2500mg!\n" 
                        } 
                        if (response[0].cholesterol_mg>100){
                            nutrie += "Warning! Your meal contains a lot of cholesterol at: " + response[0].cholesterol_mg+ " mg! Your daily intake is 300mg!\n" 
                        } 
                        if (response[0].sugar_g>12){
                            nutrie += "Warning! Your meal contains a lot of sugar at: " + response[0].sugar_g+ " grams!\n" 
                        }
                        if (response[0].fiber_g>25){
                            nutrient += "Good job! Your meal contains a lot of fiber at: " + response[0].fiber_g+ " grams!\n" 
                        } 
                        if (response[0].potassium_mg>500){
                            nutrient += "Good job! Your meal contains a lot of potassium at: " + response[0].potassium_mg+ " mg!\n" 
                        } 
                        if (response[0].protein_g>25){
                            nutrient += "Good job! Your meal contains a lot of protein at: " + response[0].protein_g+ " grams!\n" 
                        }
                    
                    document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
                    });
                } 
            } catch (error) {
                    console.error("Error:", error.message);
                }
        }
        function addFood(response) {
            if (response.length > 0) {
                calories += response[0].calories;
                totFat += response[0].fat_total_g;
                satFat += response[0].fat_saturated_g;
                sodium += response[0].sodium_mg;
                potassium += response[0].potassium_mg;
                cholesterol += response[0].cholesterol_mg;
                carbs += response[0].carbohydrates_total_g;
                fiber += response[0].fiber_g;
                sugar += response[0].sugar_g;
                protein += response[0].protein_g;
                calLeft -= calories;
                calLeft = Math.round(calLeft);
                carbLeft -= carbs;
                carbLeft = Math.round(carbLeft);
                fatLeft -= totFat;
                fatLeft = Math.round(fatLeft);
                proteinLeft -= protein;
                proteinLeft = Math.round(proteinLeft);
        }
        }
        function logInfo(){
            carbGoal = Math.round((BMR*.5)/4);
            fatGoal = Math.round((BMR*.2)/9);
            proteinGoal = Math.round((BMR*.3)/4);
            carbLeft = carbGoal
            fatLeft = fatGoal;
            calLeft = BMR;
            proteinLeft = proteinGoal;

        }
        
        
</script>

<button on:click={handle}></button>

<main>
    <div class="top-nav">
        <a class="active" href="/">Home</a>
        <a href="calorie">BMR Calculator</a>
        <a href="about">Food Diary</a>
    </div>
    <h1>
        Welcome to your Food Diary
    </h1>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="search">Enter your Food:</label>
    <input type="text" bind:value={query}>
    <button on:click={getFood}>Search</button>
    <button class="Add-food" on:click={()=> addFood(response)}>Add Food</button>
    <p>
        <span class="warnings">{nutrie}</span>
        <span class="good-job">{nutrient}</span>
    </p>
    <p class="individual">
        Enter your BMR Calculated Before
        <input class= "individual" type="text" bind:value={BMR}>
        <button class="macro" on:click={logInfo}>Macro Breakdown</button>
        Your Fat Goal is: {(fatGoal)}
        Your Carb Goal is: {(carbGoal)}
        Your Protein Goal is: {(proteinGoal)}
    </p>
    <p class="remaining">You have {calLeft} calories, {carbLeft} grams of carbs, {fatLeft} grams of fat left. You still need to eat {proteinLeft} grams of protein. </p>
    <p class="header">Nutrition Facts</p>
    <div class="header"> 
        <span class= li>Total Nutrients</span>
        <span class=li>Calories: {Math.round(calories)}</span> 
        <span class=li>Total Fat: {Math.round(totFat)}</span> 
        <span class=li>Saturated Fat: {Math.round(satFat)}</span>
        <span class=li>Sodium: {Math.round(sodium)} </span>
        <span class=li>Potassium: {Math.round(potassium)}</span>
        <span class=li>Cholesterol: {Math.round(cholesterol)}</span>
        <span class=li>Carbs: {Math.round(carbs)}</span>
        <span class=li>Fiber: {Math.round(fiber)} </span>
        <span class=li>Sugar: {Math.round(sugar)}</span>
        <span class=li>Protein: {Math.round(protein)}</span>
    </div>
    <ul></ul>
    
</main>
<style>
    .top-nav{
        overflow: hidden;
        background-color: black;
    }
    .top-nav a{
        float: left;
        color: #f2f2f2;
        text-align: center;
        padding: 14px 200px;
        text-decoration: none;
        font-size: 17px;
    }
    .top-nav a:hover{
        background-color: #ddd;
        color: black;
    }
    .top-nav a.active {
        background-color: white;
        color: black;
    }
    
    @media only screen and (max-width:768px) {
    .top-nav a{
        padding: 14px;
        text-align: center;
    }
}
    h1 {
        font-size: 2rem;
        color:gray;
        font-style: normal;
        text-align: center;
    }

    p{
        margin: 0;
        font-style: normal;
        text-align: left;
    }
    p.header {
        margin-top: .5em;
        font-size: 1.5rem;
        color: black;
        background-color: white;
        width: 12%;
        text-align: center;
    }
    p.individual{
        text-align: center;
        
    }
    p.remaining {
        text-align: center;
    }
    button.macro{
        margin-left: auto;
        margin-right: auto;
    }
    p{
        text-align: center;
    }
    input.individual{
        margin-left: 42%;
        width: 250px;

    }
    
    label{
        font-size: 1rem;
        display: block;
        margin-bottom: 2px;
        text-align: left;
    }
    input{
        display: block;
        margin-left: 0;
        
    }
    button{
        display: block;
        margin-left: 0;
    }
    button.Add-food {
        margin-top: 5px;
    }
    ul {
        font-size: 1.2rem;
    display: block;
    flex-direction: column; /*Display items vertically */
    justify-content: left;
    align-items: center;
    color: black;
    width: 10%;
    background-color: white;
    list-style-type: none;
    margin: auto;
    margin-top: -120px;
    margin-left: 0;
    position: absolute;
    }
    span.warnings{
        color: red;
        font: bold;
       text-align: center;
    }
    span.good-job{
        color: green;
        font: bold;
        margin-left: auto;
        margin-right: auto;
    }
    span.li  {
        display: list-item;
        text-align: right;
        margin: 0;
        font-size: 1.1rem;
        margin-right: 1em;
    }
    div.header{
        display: block;
        float: right;
        clear: left;
        background-color: white;
        color: black;
        list-style: none;
    }

</style>