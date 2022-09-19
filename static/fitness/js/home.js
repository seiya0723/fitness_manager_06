window.addEventListener("load" , function (){

    //フィットネスメニューの追加と削除
    $(document).on("click",".menu_detail_create_row_add", function(){
        $(this).next(".menu_detail_create_form").append( $("#menu_detail_create_init").html() );
    });

    $(document).on("click",".menu_detail_create_delete",function(){ 
        //.remove()で要素自身を消す
        $(this).parents(".menu_detail_create_row").remove();
    });

    //MenuとMenuDetailの削除(この.menu_deleteも動的に追加される要素なので、documentから始める)
    $(document).on("click", "#menu_create_submit", function(){ menu_create(this); });
    $(document).on("click", ".menu_delete", function(){ menu_delete(this); });
    $(document).on("click", ".menu_edit_submit", function(){ menu_edit(this); });


    $(document).on("click", ".menu_start", function(){ menu_start(this); });


    //新規作成時・編集時の並び替え
    let elem    = document.getElementById('fitness_menu_area');
    let target  = new MutationObserver(function(){ detail_sortable() });
    target.observe(elem, { "childList":true });

    function detail_sortable(){
        console.log("並び替え化");
        let sort_area = $(".menu_detail_create_form");
        for (let area of sort_area ){
            new Sortable(area, {
                handle: '.handle', 
                animation: 150,
                ghostClass: 'menu_detail_dragging', //ドラッグ中のクラス名
            });
        }
    }
    detail_sortable()




    //手動記録追加時の日付フォーム
    let today   = new Date();

    let year    = String(today.getFullYear());
    let month   = ("0" + String(today.getMonth() + 1) ).slice(-2);
    let day     = ("0" + String(today.getDate()) ).slice(-2);

    let date    = year + "-" + month + "-" + day;

    let config_date = { 
        locale: "ja",
        dateFormat: "Y-m-d",
        defaultDate: date,
    }
    flatpickr("[name='exe_dt']",config_date);


});

function menu_create(elem){

    let form_elem   = $(elem).parents("form")

    let data        = new FormData( $(form_elem).get(0) );
    let url         = $(form_elem).prop("action");
    let method      = $(form_elem).prop("method");

    console.log("create")

    $.ajax({
        url: url,
        type: method,
        data: data,
        processData: false,
        contentType: false,
        dataType: 'json'
    }).done( function(data, status, xhr ) { 

        if (!data.error){
            console.log("新規作成");
            $("#fitness_menu_area").html(data.content)
        }
        else{
            console.log("ERROR");
        }

    }).fail( function(xhr, status, error) {
        console.log(status + ":" + error );
    }); 

}
function menu_delete(elem){

    if (!confirm("削除しますか？")){
        return false;
    }

    let form_elem   = $(elem).parents("form")

    let url         = $(form_elem).prop("action");
    let method      = "DELETE";

    $.ajax({
        url: url,
        type: method,
        dataType: 'json'
    }).done( function(data, status, xhr ) { 

        if (!data.error){
            console.log("削除");
            $("#fitness_menu_area").html(data.content)
        }
        else{
            console.log("ERROR");
        }

    }).fail( function(xhr, status, error) {
        console.log(status + ":" + error );
    }); 
}

function menu_edit(elem){

    let form_elem   = $(elem).parents("form")

    let data        = new FormData( $(form_elem).get(0) );
    let url         = $(form_elem).prop("action");
    let method      = "PUT";

    $.ajax({
        url: url,
        type: method,
        data: data,
        processData: false,
        contentType: false,
        dataType: 'json'
    }).done( function(data, status, xhr ) { 

        if (!data.error){
            console.log("編集");
            $("#fitness_menu_area").html(data.content)
        }
        else{
            console.log("ERROR");
        }

    }).fail( function(xhr, status, error) {
        console.log(status + ":" + error );
    }); 

}


//TODO:メニューをスタートするときの処理
function menu_start(elem){

    let form_elem   = $(elem).parents("form")

    let categories  = $(form_elem).children("[name='category']");
    let names       = $(form_elem).children("[name='category_name']");
    let times       = $(form_elem).children("[name='time']");

    let length      = categories.length;

    for (let i=0;i<length;i++){

        console.log(categories.eq(i).val());
        console.log(names.eq(i).val());
        console.log(times.eq(i).val());

    }

}
