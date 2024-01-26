<script>
    import {goto} from '$app/navigation';
    import {onMount} from 'svelte';
    var flag;
    if (typeof window !== 'undefined') {
        flag= JSON.parse(localStorage.getItem('darkMode')) ?? true;
    }
    function dark(){
        let change = document.getElementById("demo");
        flag = !flag;
        updateStyles();
        localStorage.setItem('darkMode', JSON.stringify(flag));
    }
    function updateStyles(){
        document.body.style.backgroundColor= flag ? "black" : "lightblue";
        document.body.style.color= flag ? "white" : "gray";
    }
    onMount(()=> {
        if(typeof window !== 'undefined') {
            updateStyles();
    }
});
</script>
<main>
    <div class="top-nav">
        <a class="active" href="/">Home</a>
        <a href="calorie">BMR Calculator</a>
        <a href="about">Food Diary</a>
    </div>
    <h1 id="text">Welcome to your food diary    </h1>
    <img class="health" src="fruit.png" alt=health image>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<button class="dark-button" on:click={dark}> Dark Mode</button>
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

    #text {
        font-size: 3rem;
        color:gray;
        font-style: italic;
        text-align: center
    }

    .health{
        display: block;
        height: 50%;
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        border-radius: 70%;
    }

    button{
        display: block;
        margin-bottom: 20px;
        align-self: center;
    }
        
    .dark-button{
        position:absolute;
        bottom: 0;
        right: 0;
        border-radius: 20px;
        padding: 8px 12px;
    }
</style>