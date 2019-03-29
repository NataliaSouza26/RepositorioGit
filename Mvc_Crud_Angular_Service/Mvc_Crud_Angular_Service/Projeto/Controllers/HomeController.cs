using System;
using System.Linq;
using System.Web.Mvc;
using Mvc_Crud_Angular_Service.Models;

namespace Mvc_Crud_Angular_Service.Controllers
{
    public class HomeController : Controller
    {
       
        public ActionResult Index()
        {
            return View();
        }
          
       
        public JsonResult GetTodasPessoas()
        {
            using (PessoaContexto contextObj = new PessoaContexto())
            {
                try
                {
                    var listaPessoas = contextObj.pessoa.ToList();
                    return Json(listaPessoas, JsonRequestBehavior.AllowGet);
                }
                catch(Exception ex)
                {
                    throw ex;
                }
            }
        }

        public JsonResult GetPessoaPorId(string id)
        {
            using (PessoaContexto contextObj = new PessoaContexto())
            {
                try {
                    var pessoaId = Convert.ToInt32(id);
                    var getPessoaPorId = contextObj.pessoa.Find(pessoaId);
                    return Json(getPessoaPorId, JsonRequestBehavior.AllowGet);
                }
                catch(Exception ex)
                {
                    throw ex;
                }
            }
        }
        
        public string AtualizarPessoa(Pessoa pessoa)
        {
            if (pessoa != null)
            {
                 using (PessoaContexto contextObj = new PessoaContexto())
                 {
                    try
                    { 
                        int pessoaId = Convert.ToInt32(pessoa.Id);
                        Pessoa _pessoa = contextObj.pessoa.Where(b => b.Id == pessoaId).FirstOrDefault();
                        _pessoa.Nome = pessoa.Nome;
                        _pessoa.Email = pessoa.Email;
                        _pessoa.Telefone = pessoa.Telefone;
                       
                        contextObj.SaveChanges();
                        return "Registro atualizado com sucesso";
                    }
                    catch (Exception ex)
                    {
                        return "Erro ao tentar atualizar registro: " + ex.ToString(); ;
                    }
                }
            }
            else
            {
                return "Registro inválido";
            }
        }
       
        public string AdicionarPessoa(Pessoa pessoa)
        {
            if (pessoa != null)
            {
                using (PessoaContexto contextObj = new PessoaContexto())
                {
                    try
                    {
                        contextObj.pessoa.Add(pessoa);
                        contextObj.SaveChanges();
                        return "Registro adicionado com sucesso";
                    }
                    catch(Exception ex)
                    {
                        return "Erro ao registrar :" + ex.ToString();
                    }
                }
            }
            else
            {
                return "Registro inválido";
            }
        }
        
        public string DeletarPessoa(string pessoaId)
        {

            if (!String.IsNullOrEmpty(pessoaId))
            {
                try
                {
                    int _pessoaId = Int32.Parse(pessoaId);
                    using (PessoaContexto contextObj = new PessoaContexto())
                    {
                        var _pessoa = contextObj.pessoa.Find(_pessoaId);
                        contextObj.pessoa.Remove(_pessoa);
                        contextObj.SaveChanges();
                        return "Registro selecionado deletado com sucesso";
                    }
                }
                catch (Exception)
                {
                    return "Detalhes não encontrado";
                }
            }
            else
            {
                return "Operação inválida";
            }
        }
    }
}