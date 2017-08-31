//+------------------------------------------------+
//| Módulo:  << Inicialização javascript >>        | 
//| Desc: Gerenciamento e consulta das informações |
//|       do CRUD.                                 |
//| Autor: EQUIPE CODEPLAN                    	   |
//| Data: 21/06/2017                               |
//+------------------------------------------------+
var dado_atual;
var dataTable;

//+------------------------------------------
//| Metodo auxiliar com as mensagens do sistema
//+------------------------------------------
function msg(data){
    alert(data);
};

//+------------------------------------------
//| Método auxiliar que inicializa o DataTable
//| parm: url 
//+------------------------------------------
function initDataTable(dataSet){
    dado_atual = dataSet;
    dataTable = $('#tabela').DataTable(
        {
            data: dataSet,
            lengthMenu: [20, 15, 10, 5]
        }
    );
};


//+------------------------------------------
//| Método auxiliar que atualiza o DataTable
//| parm: dataSet 
//+------------------------------------------
function atualizaDataTable(dataSet){
    dataTable.clear().rows.add(dataSet).draw();
};

//+------------------------------------------
//| Metodo auxiliar que realiza a requisição get
//| parm: url 
//+------------------------------------------
function getResponse (url, callback){
    $.get( url, function( data ) {
        n_dado = formataDados(data);
        callback(n_dado);
    });
};

//+------------------------------------------
//| Metodo auxiliar que realiza a requisição get
//| parm: url 
//+------------------------------------------
function carregarInformacao (url,parm){
    $.get( url, parm)
      .done(function( data ) {
        $("#idEdit").val(data[0].id);
        $("#nomeEdit").val(data[0].nome);
        $("#anoEdit").val(data[0].ano);
      });
};

//+------------------------------------------
//| Metodo auxiliar que realiza a requisição get
//| parm: url 
//+------------------------------------------
function getResponse2 (url, parm, callback){
    $.get( url, parm ).done(function( data ) {
        callback(parm);
        //alet('Item excluído com sucesso!');
    });
};

function postResponse(url, parm, callback){
    $.post( url, parm)
      .done(function( data ) {
        if (data.status) {
            callback(parm);    
        } else {
            alert('Erro na inserção do novo livro!');
        }
        
      });
}


// function atualizaListagem(parm){
//     var id = parm.id;
//     //alert(dado_atual);
//     for (var i = dado_atual.length - 1; i >= 0; i--) {
//         if(dado_atual[i][0]===id){
//             dado_atual.splice(i, 1);
//         }
//     }
//     atualizaDataTable(dado_atual);
//     msg("Item excluído com sucesso!");
// };


function atualizaListagem(){
    getResponse('http://10.73.7.87/livros', atualizaDataTable);
};


function atulizarDado(dado){
    var id = parm.id;
    alert(dado_atual);
};

function inserDado(dado){
    var id = parm.id;
    alert(dado_atual);
};

//+------------------------------------------
//| Metodo auxiliar de formatação dos dados
//| visualização no DataTable
//+------------------------------------------
function formataDados(dado){
    var retorno = [];
    for (var i = 0; i < dado.length; i++) {
        var dado_novo = [];
        //Cria dados        
        dado_novo = [ dado[i].id ,  dado[i].nome, dado[i].ano, '<button class="btn btn-danger" onclick="excluirItem('+ dado[i].id +')">Excluir <i class="fa fa-times"></i></button> <button class="btn btn-success" data-toggle="modal" data-target="#modalEdit" onclick="editarItem('+ dado[i].id +')">Editar <i class="fa fa-pencil"></i></button>'];
        retorno.push(dado_novo);
    }
    return retorno; 
};
function formataDado(dado){
	var retorno = [];
	for (var i = 0; i < dado.length; i++) {
		var dado_novo = [];
		//Cria dados 		
		dado_novo = [ dado[i].id ,  dado[i].nome, dado[i].ano ];
		retorno.push(dado_novo);
	}
	return retorno;	
};

//+------------------------------------------
//| Metodo auxiliar de exclusão de item
//+------------------------------------------
function excluirItem(id){
    if (confirm('Excluir livro '+id)) {
        //getResponse2('http://10.73.7.87/delete', {'id':id}, atualizaListagem);
        getResponse2('http://10.73.7.87/delete', {'id':id}, atualizaListagem);
    }
};

//+------------------------------------------
//| Metodo auxiliar de edição de item
//+------------------------------------------
function editarItem(id){
    //msg('Ação de editar item ' + id);
    carregarInformacao('http://10.73.7.87/livro',{'id':id});
};

function alterarItem(){

    var id = $("#idEdit").val();
    var nome = $("#nomeEdit").val();
    var ano = $("#anoEdit").val();

    dado = {'id':id, 'nome':nome, 'ano':ano};

    postResponse('http://10.73.7.87/alter_livro',dado,atualizaListagem)
}

function incluirItem(){

    var nome = $("#nomeNovo").val();
    var ano = $("#anoNovo").val();

    dado = {'nome':nome, 'ano':ano};

    postResponse('http://10.73.7.87/novo_livro',dado,atualizaListagem)
    //alert("inserir item = " + nome + " " + ano) ;

};


//Inicializa livros
getResponse('http://10.73.7.87/livros', initDataTable);