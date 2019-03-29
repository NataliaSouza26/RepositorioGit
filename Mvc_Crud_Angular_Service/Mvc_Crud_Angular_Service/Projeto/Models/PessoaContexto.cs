using System.Data.Entity;

namespace Mvc_Crud_Angular_Service.Models
{
    public class PessoaContexto : DbContext
    {
        public DbSet<Pessoa> pessoa { get; set; }
    }
}