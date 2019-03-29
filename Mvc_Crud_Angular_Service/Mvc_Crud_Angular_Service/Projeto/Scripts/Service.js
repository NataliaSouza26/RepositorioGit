app.service("crudAJService", function ($http) {


    this.getPessoas = function () {
        return $http.get("Home/GetTodasPessoas");
    };

    this.getPessoa = function (pessoaId) {
        var response = $http({
            method: "post",
            url: "Home/GetPessoaPorId",
            params: {
                id: JSON.stringify(pessoaId)
            }
        });
        return response;
    }

    this.AtualizarPessoa = function (pessoa) {
        var response = $http({
            method: "post",
            url: "Home/AtualizarPessoa",
            data: JSON.stringify(pessoa),
            dataType: "json"
        });
        return response;
    }

    this.AdicionarPessoa = function (pessoa) {
        var response = $http({
            method: "post",
            url: "Home/AdicionarPessoa",
            data: JSON.stringify(pessoa),
            dataType: "json"
        });
        return response;
    }
    this.DeletarPessoa = function (pessoaId) {
        var response = $http({
            method: "post",
            url: "Home/DeletarPessoa",
            params: {
                pessoaId: JSON.stringify(pessoaId)
            }
        });
        return response;
    }
});