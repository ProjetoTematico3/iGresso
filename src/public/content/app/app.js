
$(()=>{


    $("#app-page").on('click', '#test_button', () =>{
        alert("MIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU");
    
    });

    $("#app-page").on('click', '#btn-sync-images', () =>{
        $.getJSON("/Admin/SyncImages", (data) => {
            Alert(data.text,data.status)
        });
    });

    $("#app-page").on('click', '.card-movie', (e) =>{
        const id = $(e.currentTarget).data('id');
        window.location = `/Movie/${id}`;
    });

    

    
    

})


const Alert = (text, status = false) => {
    const background = {
        success:"#167323",
        error:"#991f1f"
    }
    Toastify({
        text: text,
        backgroundColor: status ? background.success : background.error,
        duration: status ? 3000 : -1,
        close: status ? false : true
        
    }).showToast();
}
