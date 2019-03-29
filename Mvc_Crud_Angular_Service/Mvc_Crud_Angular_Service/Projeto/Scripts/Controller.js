app.controller("mvcCRUDCtrl", function ($scope, crudAJService) {

    $scope.divPessoa = false;
    GetTodasPessoas();

    function GetTodasPessoas() {
      debugger;
        var getDadosPessoa = crudAJService.getPessoas();
        getDadosPessoa.then(function (pessoa) {
            $scope.pessoas = pessoa.data;
        }, function () {
            alert('Erro ao tentar obter os registros ');
        });
    }

    $scope.editarPessoa = function (pessoa) {
        var getDadosPessoa = crudAJService.getPessoa(pessoa.Id);
        getDadosPessoa.then(function (_pessoa) {
            $scope.pessoa = _pessoa.data;
            $scope.pessoaId = pessoa.Id;
            $scope.PessoaNome = pessoa.Nome;
            $scope.PessoaEmail = pessoa.Email;
            $scope.PessoaTelefone = pessoa.Telefone;        
            $scope.Action = "Atualizar";
            $scope.divPessoa = true;
        }, function () {
            alert('Erro ao tentar obter os registros');
        });
    }
  
    $scope.AdicionarAtualizarPessoa =function () {
        var Pessoa = {
            Nome: $scope.PessoaNome,
            Email: $scope.PessoaEmail,
            Telefone: $scope.PessoaTelefone       
        };
        var getPessoaAction = $scope.Action;

        if (getPessoaAction == "Atualizar") {           
            Pessoa.Id = $scope.pessoaId;    
            var getDadosPessoa= crudAJService.AtualizarPessoa(Pessoa);
            getDadosPessoa.then(function (msg) {
                GetTodasPessoas();
                alert(msg.data);
                $scope.divPessoa= false;
            }, function () {
                alert('Erro ao tentar atualizar os registros');
            });
        } else {
            var getDadosPessoa = crudAJService.AdicionarPessoa(Pessoa);
            getDadosPessoa.then(function (msg) {
                GetTodasPessoas();
                alert(msg.data);
                $scope.divPessoa = false;
            }, function () {
                alert('Erro ao adicionar');
            });
        }
    }

    $scope.AdicionarPessoaDiv = function () {
        LimpaCampos();
        $scope.Action = "Adicionar";
        $scope.divPessoa = true;
    }

    $scope.deletarPessoa = function (pessoa) {
        var getDadosPessoa = crudAJService.DeletarPessoa(pessoa.Id);
        getDadosPessoa.then(function (msg) {
            alert(msg.data);
            GetTodasPessoas();
        }, function () {
            alert('Erro ao tentar excluir');
        });
    }

    function LimpaCampos() {
        $scope.pessoaId = "";
        $scope.PessoaNome = "";
        $scope.PessoaEmail = "";
        $scope.PessoaTelefone= "";  
    }
    $scope.Cancel = function () {
        $scope.divPessoa = false;
    };
});