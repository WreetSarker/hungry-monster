document.getElementById('searchBtn').addEventListener('click', function () {
    let searchedName = document.getElementById('searchInput').value;
    console.log(searchedName);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedName}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data.meals);
            displayData(data.meals);
        });
});

function displayData(data) {
    const mealsDiv = document.getElementById('meals');
    if (data) {
        data.forEach((val) => {
            const mealDiv = document.createElement('div');
            mealDiv.className = 'meal'
            const mealInfo = `
            <img style="height:100px;width:100px;" src="${val.strMealThumb}" /><br>
            <h6 class="meal-name">${val.strMeal}</h6>
            `;
            mealDiv.innerHTML = mealInfo;
            mealDiv.addEventListener('click', function () {
                const id = val.idMeal;
                const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
                fetch(url)
                    .then(resp => resp.json())
                    .then(data => showMealInfo(data))
            });
            mealsDiv.appendChild(mealDiv);
        });
    } else {
        const failedInfo = `
        <h2> Sorry! Data not found! </h2>
        `;
        mealsDiv.innerHTML = failedInfo;
    }
}

function showMealInfo(data) {
    const val = data.meals[0];
    const ingredientsDiv = document.getElementById('ingredients');
    const ingredientInfo = `
        <img style="height:200px;width:200px;" src="${val.strMealThumb}" /><br>
        <h4 class="meal-name">${val.strMeal}</h6>
        <h6 class="mb-4"> Ingredients</h6>
        <p>${val.strIngredient1}</p>
        <p>${val.strIngredient2}</p>
        <p>${val.strIngredient3}</p>
        <p>${val.strIngredient4}</p>
        <p>${val.strIngredient5}</p>
        <p>${val.strIngredient6}</p>
        <p>${val.strIngredient7}</p>
        `;
    ingredientsDiv.innerHTML = ingredientInfo;
}