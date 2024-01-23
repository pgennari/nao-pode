using Newtonsoft.Json;

public class Usuario
{
    public string Email { get; private set; }
    public string? Nome { get; set; }
    public DateTime DataCriacao { get; set; }
    public DateTime DataUltimoLogin { get; set; }
    public List<Acesso>? Acessos { get; set; }

    public Usuario(string email)
    {
        Email = email;
    }

    public static List<Usuario> GetUsuarios(string expand)
    {
        var usuarios = JsonConvert.DeserializeObject<List<Usuario>>(
            new FileInfo("data/usuarios.json").ReadAllTextSafe()
        );

        if (usuarios == null)  usuarios = new List<Usuario>();

        if (expand.ToLower().Contains("acessos"))
        {
            var acessos = JsonConvert.DeserializeObject<List<Acesso>>(
                new FileInfo("data/acessos.json").ReadAllTextSafe()
            );

            foreach (var usuario in usuarios)
            {
                if (acessos == null)
                    usuario.Acessos = new List<Acesso>();
                else
                    usuario.Acessos = acessos.Where(a => a.Email == usuario.Email).ToList();
            }
        }

        return usuarios;
    }

    public Usuario GetUsuario(string expand, string? ip, string? navegador)
    {
        if (string.IsNullOrEmpty(Email))
            throw new ArgumentException("Email não pode ser nulo ou vazio");

        var usuarios = JsonConvert.DeserializeObject<List<Usuario>>(
            new FileInfo("data/usuarios.json").ReadAllTextSafe()
        );

        if (usuarios == null)  usuarios = new List<Usuario>();
        
        var usuario = usuarios.Where(u => u.Email == Email).FirstOrDefault();

        if (usuario == null)
        {
            new Acesso(Email, ip, navegador).Registrar();
            return CriarUsuario();
        }
        else
        {
            usuario.DataUltimoLogin = DateTime.Now;
            AtualizarUsuario(usuario);
        }

        new Acesso(Email, ip, navegador).Registrar();

        if (expand.ToLower().Contains("acessos"))
        {
            var acessos = JsonConvert.DeserializeObject<List<Acesso>>(
                new FileInfo("data/acessos.json").ReadAllTextSafe()
            );
            if (acessos == null)
                usuario.Acessos = new List<Acesso>();
            else
                usuario.Acessos = acessos.Where(a => a.Email == Email).ToList();
        }

        return usuario;
    }

    private void AtualizarUsuario(Usuario usuarioAlterado)
    {
        var usuarios = JsonConvert.DeserializeObject<List<Usuario>>(
            new FileInfo("data/usuarios.json").ReadAllTextSafe()
        );
        if (usuarios == null)  usuarios = new List<Usuario>();

        usuarios.RemoveAll(u => u.Email == usuarioAlterado.Email);
        usuarios.Add(usuarioAlterado);

        File.WriteAllText("data/usuarios.json", JsonConvert.SerializeObject(usuarios));
    }

    private Usuario CriarUsuario()
    {
        var usuarios = JsonConvert.DeserializeObject<List<Usuario>>(
            new FileInfo("data/usuarios.json").ReadAllTextSafe()
        );
        if (usuarios == null) usuarios = new List<Usuario>();

        DataCriacao = DateTime.Now;
        DataUltimoLogin = DateTime.Now;

        usuarios.Add(this);

        File.WriteAllText("data/usuarios.json", JsonConvert.SerializeObject(usuarios));

        return this;
    }

    internal bool IsValid()
    {
        if (string.IsNullOrEmpty(Email))
            return false;

        return true;
    }
}
