<script>
    import {goto} from '$app/navigation';
    let height = '';
    let weight = '';
    let age = '';
    let calories = 0;
    let maintain = ' ';
    let gain = '';
    let loss = '';
    let chooseGain= ''; // Calories to Gain Weight
    let gains= ''; 
    let chooseLose= ''; // Calories to Lose Weight
    let lose= ''; 
    let result= '';
    let choice = '';
    let temp = false;
    function calculateBMR() {
            // Calculate BMR using the modified Harris-Benedict Equation
        calories= Math.round(88.362+(4.536*weight)+(15.879*height) - (5.677*age));
        maintain= "Maintenance: "+calories+" calories";
        choice = true;
        result = '';
    }
    function gainW(){
        gains= Math.round(calories+500);
        result= "To gain one lb a week eat " + gains + " calories";
    }
    function loseW(){
        lose= Math.round(calories-500);
        result= "To lose one lb a week eat " + lose + " calories";
    }


</script>
<main>
    <div class="top-nav">
        <a class="active" href="/">Home</a>
        <a href="calorie">BMR Calculator</a>
        <a href="about">Food Diary</a>
    </div>
    <h1>Maintenance Calorie Calculator </h1>
    <p>Calculate Your BMR</p>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>Enter Age:</label>
    <input type="text" bind:value={age}>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>Enter Height(inches):</label>
    <input type="text" bind:value={height}>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label>Enter Weight(pounds):</label>
    <input type="text" bind:value={weight}>
    <button on:click={calculateBMR}>Calculate</button>
    <p3>{maintain}</p3>
    {#if choice}
    <div class="additional buttons">
        <button on:click={gainW}>Gain Weight</button>
        <button on:click={loseW}>Lose Weight</button>
        <p4>{result}</p4>
    </div>
{/if}

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
        font-size: 1.5rem;
        font-style: normal;
        text-align: center;
    }
    label{
        font-size: 1rem;
        display: block;
        margin-bottom: 2px;
        text-align: center;
    }
    button{
        display: block;
        margin-bottom: 8px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5px;
    }
    p3{
        display: block;
        text-align: center;
    }
    p4{
        display: block;
        text-align: center;
    }
    input{
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

</style>