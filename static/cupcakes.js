const BASE_URL = "http://localhost:5000/api";

/** Create cupcake based on data and generate HTML */

function generateCupcakeHTML(cupcake) {
    return `
        <div data-cupcake-id=${cupcake.id}>
            <li>
                ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button class="delete-button">X</button>
            </li>
            <img class="cupcake-img"
                src="${cupcake.image}"
                alt="(no image provided)">
        </div>`;
}

/** Show cupcakes on index page */

async function showInitialCupcakes() {
    const res = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of res.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $("#cupcakes-list").append(newCupcake);
    }
}

/** form to handle adding new cupcake */

$("#new-cupcake-form").on("submit", async function(e) {
    e.preventDefault();

    let flavor = $('#form-flavor').val();
    let size = $('form-size').val();
    let rating = $('form-rating').val();
    let image = $('form-image').val();

    const newCupcakeResp = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        size,
        rating,
        image
    });

    let newCupcake = $(generateCupcakeHTML(newCupcakeResp.data.cupcake));

    $('#cupcakes-list').append(newCupcake);
    $('#new-cupcake-form').trigger("reset");
});

/** handle deleting a cupcake */

$("#cupcakes-list").on("click", ".delete-button", async function(e) {
    e.preventDefault();

    let $cupcake = $(e.target).closest('div');
    let cupcakeId = $cupcake.attr("data-cupcake-id")

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showInitialCupcakes);
