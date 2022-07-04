$(() => {


    $("#app-page").on('click', '#test_button', () => {
        alert("MIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU");

    });

    $("#app-page").on('click', '#btn-sync-images', () => {
        $.getJSON("/Admin/SyncImages", (data) => {
            Alert(data.text, data.status)
        });
    });

    $("#app-page").on('click', '.card-movie', (e) => {
        const id = $(e.currentTarget).data('id');
        window.location = `/Movie/${id}`;
    });

    $("#app-page").on('click', '#btn-insert-room', () => {
        $.getJSON("/Room/Create", () => {
            let param = $.param({ data }, true);
            let result = decodeURIComponent(param);
            console.log(result);
            //console.log(data);
            //console.log(data.text);
            //Alert(data.text, data.status)
        });
    });

    $("#app-page").on('keyup', '#search_movie_test', () => {
        return loadMovies();
    });

    $("#app-page").on('click', '.review-star', (e) => {
        return setMarker(e.currentTarget);
    });

    $("#app-page").on('click', '#btn-send-review', () => {
        return sendReview();
    });

    $("#app-page").on('click', '.btn-delete-review', (e) => {
        const id = $(e.currentTarget).data('review');
        return deleteReview(id);
    });


    $("#app-page").on('change', '#newsImage', (e) => {
        const image = $("#newsImage").get(0).files[0];
        setPreview(image);
    });

    $("#app-page").on('click', '#btn-insert-news', () => {
        sendNews();
    });

    $("#app-page").on('click', '#btn-clear-news', () => {
        clearNews();
    });


    $("#app-page").on('click', '.seat', (e) => {
        selectSeat(e.currentTarget);
    });





})

const selectSeat = (elem) => {
    if ($(elem).hasClass('selected'))
        $(elem).removeClass('selected');
    else
        $(elem).addClass('selected');

    return showSelectedSeats();
}

const showSelectedSeats = () => {
    $('.selected-seats').remove();
    let selectedSeats = $('.seat.selected').map((i, e) => {
        return $(e).html().trim();
    }).get();
    let strSeats = selectedSeats.join(', ');
    $('#v-pills-assentos-tab').append(`<span class="selected-seats">${strSeats}</span>`);
}


const summernoteInit = () => {
    $(() => {
        $('#summernote').summernote({
            tabsize: 1,
            minHeight: 150,
            placeholder: "Insira o contéudo da notícia",
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['insert', ['link', 'picture']],
                ['view', ['codeview', 'help']]
            ],
            "codemirror": {
                theme: "darkly"
            },
            // callbacks: {
            //     onImageUpload: function(image) {

            //         summernoteImages(image)

            //     }
            // }
        });
    });

}


// function summernoteImages(image) {
//     let arq = new FormData();
//     arq.append("image", image);
//     console.log(arq);
//     console.log(image);


//     $('#summernote').summernote("insertNode", image);
// }


const deleteReview = (id) => {

    $.getJSON('/deleteReview', { id: id }, (data) => {
        Alert(data.text, data.status);
        if (data.status)
            loadReviews(data.id_movie);


    });

}

const loadMovies = () => {
    const search = $('#search_movie_test').val();
    $('#movie_list').load('/movieList', { search: search });
}


const setMarker = (elem) => {
    const indexStar = $(elem).index();
    const parentElem = $(elem).parent();
    const indexLastMarked = parentElem.children('.review-star.marked').length;
    if ($(elem).hasClass('marked') && indexStar == indexLastMarked)
        parentElem.children('.review-star').removeClass('marked');
    else {
        parentElem.children('.review-star').removeClass('marked');
        parentElem.children('.review-star').slice(0, indexStar).addClass('marked');
    }
}

const sendReview = () => {
    const id_movie = $('#write-review').data('id');
    const text = $('#text-review').val();
    const rating = $('#write-review .review-star.marked').length;
    $.post('/Movie/AddReview', { text: text, rating: rating, id_movie: id_movie }, (data) => {
        Alert(data.text, data.status);
        $('#text-review').val('');
        src / public / content / app / app.js
        $('#write-review .review-star.marked').removeClass('marked');
        return loadReviews(id_movie);
    }, 'json');

}

const loadReviews = (id_movie) => {
    $('#movie-reviews-container').load('/reviewList', { id_movie: id_movie });
}

const sendNews = () => {
    const newsText = $("#content").val();
    const newsTitle = $("#news-title").val();
    const newsType = $("input[name=type]:checked").val();
    const newsImage = $("input[name=newsImage]")[0].files[0];

    const fd = new FormData();
    fd.append("newsText", newsText);
    fd.append("newsTitle", newsTitle);
    fd.append("newsType", newsType);
    fd.append("newsImage", newsImage);

    $.ajax({
        url: '/News/AddNews',
        data: fd,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        type: 'POST',
        success: function(data) {
            Alert(JSON.stringify(data.text), true);
            clearNews();
        },
        fail: function(data) {
            Alert(JSON.stringify(data.text), false);
        }
    });

}

const clearNews = () => {
    $('#news-insert').trigger("reset");
    $("#preview-image").val("");
    $("#preview").attr('hidden', true);
    $("input[name=type]:checked").attr('checked', false);
    $("#news-normal").attr('checked', true);
}


const setPreview = (image) => {
    if (image) {
        let reader = new FileReader();
        reader.onload = function() {
            $("#preview-image").attr("src", reader.result);
        }
        reader.readAsDataURL(image);
        $("#preview").removeAttr("hidden");
    }
}

const Alert = (text, status = false) => {
    const background = {
        success: "#167323",
        error: "#991f1f"
    }
    Toastify({
        text: text,
        backgroundColor: status ? background.success : background.error,
        duration: status ? 3000 : -1,
        close: status ? false : true

    }).showToast();
}