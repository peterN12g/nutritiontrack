<script context="module">

    let query = '';
    const apiKey = `B/h3bcauprFPt8/2UaeEOQ==bQqEEgbWkNbr4JXE`;
    const url = "https://api.api-ninjas.com/v1/nutrition?query=";
    const options = {
        method: 'GET' ,
        headers: {
             'X-Api-Key': apiKey,
            },
    };    
    async function getFood(){
           
        const res = await fetch(url + query, options);
            const response = await res.json();
            console.log(response);
        }

</script>
<main>
    <div class="top-nav">
        <a class="active" href="/">Home</a>
        <a href="calorie">BMR Calculator</a>
        <a href="diary">Food Diary</a>
    </div>
    <h1>
        Welcome to your Food Diary
    </h1>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="search">Enter your Food:</label>
    <input type="text" bind:value={query}>
    <p>{query}</p>
    <!-- svelte-ignore missing-declaration -->
    <button on:click={getFood}>Search</button>
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
        padding: 14px 260px;
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
    h1{
        font-size: 2.1rem;
        text-align: center;
    }
    button{
        align-self: center;
    }
  
</style>