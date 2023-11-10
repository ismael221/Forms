//Esconde a mensagem de erro ao consulta cep
$(document).ready(function () {
    $('.alert-danger').hide();
    $('.alert-success').hide();
});



//Pega o valor do input cep e dispara uma request com retorno dos dados do cep
$(document).ready(function(){
   $(".bi-search").click(function (){
    let cep = document.querySelector(".Cep").value;
        $.ajax({
            url: 'https://brasilapi.com.br/api/cep/v2/' + cep,
            type: 'GET',
            success: function(data){  
                const {state: estado,city:cidade,street:rua,neighborhood:bairro} = data
                document.querySelector(".rua").value = rua
                document.querySelector(".estado").value = estado
                document.querySelector(".cidade").value = cidade
                document.querySelector(".bairro").value = bairro
                $('.alert-danger').hide();
            }
        })
        .fail(function(msg){
            $('.alert-danger').show();
        })
   })
})

//Limpa todos os campos
$(document).ready(function(){
    $(".limpar").click(function(){
        document.querySelector(".form-control").value = ''
    })
})

//Envia o formulario
$(document).ready(function () {
    $("form").submit(function (event) {

        // Impede o envio normal do formulário
      event.preventDefault();

        //Serializa os valores de controle de formulário enviados
        //para serem enviados ao servidor da Web com a solicitação 
      var formValues = $(this).serialize();

      $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/clientes',
            data: formValues
        })
     .done(function (data) {
            // enviar mensagem de registro salvo
            console.log(data);
            $('.alert-success').show();
        })
      .fail(function (msg) {
            // caso a solicitacao de POST tenha falhado
            alert("Falha no POST" + msg);
        });
    });
});