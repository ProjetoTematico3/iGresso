
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

    $("#app-page").on('keyup', '.i-price-igress', (e) => {
        let $current_input = $(e.currentTarget);
        if (!$current_input.val()) {
            $current_input.val('0');
            return;
        }
        let qtd_input = parseInt($current_input.val());
        if (qtd_input < 0) {
            $current_input.val('0');
            return;
        }
        let qtd_selected_prices = $('.i-price-igress').map((i, e) => { return parseInt($(e).val()) }).get().reduce((a, b) => a + b, 0);
        let qtd_selected_seats = getSelectedSeats().length;
        let qtd_available_seats = qtd_selected_seats - qtd_selected_prices;
        if (qtd_available_seats <= 0) {

        }


    });

    $("#app-page").on('keypress', '.i-price-igress', function (evt) {
        evt.preventDefault();
    });

    $("#app-page").on('click', '.create-order', (e) => {
        createOrder(e.currentTarget);
    });

    $("#app-page").on('click', '.btn-cancel-ingress', (e) => {
        cancelOrder($(e.currentTarget).data('id'));
    });

})

const cancelOrder = (id) => {

    bootbox.confirm({
        closeButton: false ,
        title: "Cancelar ingresso",
        message: `Deseja Cancelar o ingresso #${id}?`,
        buttons: {
            confirm: {
                label: 'Sim',
                className: 'btn-purple'
            },
            cancel: {
                label: 'Não',
                className: 'btn-info'
            }
        },
        callback: function (result) {
            if(result){
                $.getJSON('/ingress/cancel', {id: id}, (data) =>{
                    Alert(data.text, data.status);
                    if(data.status)
                        window.location.reload;
                })
            }
        }
    });

   

}

const createOrder = (elem) => {
    var order = {};
    const id_payment_method = parseInt($(elem).data('paymentmethod'));
    order.id_payment_method = id_payment_method;
    order.seats = getSelectedSeats();
    order.tipo_ingresso = getSelectedIngressType();
    order.combos = getSelectedCombos();
    order.id_filme = parseInt($('.card-movie').data('id'));
    order.id_cinema = $('#id_cinema').val();
    order.id_schedule = $('#id_schedule').val();

    $.post("/ingress/buy", { order: order }, (data) => { 

       
        if(data.status){
            Alert(data.text, data.status);
        }else if(data.unauthorized){
            window.location = "/Login?ConfirmOrder=true";
        }else
            Alert(data.text, data.status);
        
            

    }, 'json')


};

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

const getSelectedSeats = () => {
    let selectedSeats = $('.seat.selected').map((i, e) => {
        return $(e).data('id');
    }).get();
    return selectedSeats;
}

const getSelectedIngressType = () => {
    return $('.i-price-igress')
        .map((i, e) => {
            return {
                tipo_ingresso: $(e).data("tipoingresso"),
                qtd: parseInt($(e).val())
            }
        }).get().filter(s => s.qtd > 0);
};

const getSelectedCombos = () => {
    return $('.qtd-combo')
        .map((i, e) => {
            return {
                id_combo: $(e).data("idcombo"),
                qtd: parseInt($(e).val())
            }
        }).get().filter(s => s.qtd > 0);
};


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


    if (newsImage == undefined) {
        Alert("Insira uma imagem!!!", false);
        return;
    }

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
        success: function (data) {
            Alert(JSON.stringify(data.text), true);
            clearNews();
        },
        fail: function (data) {
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
        reader.onload = function () {
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