using Newtonsoft.Json;

public class Acesso
{
    public string Email { get; set; }
    public DateTime DataAcesso { get; set; }
    public string? Ip { get; set; }
    public string? Navegador { get; set; }

    public Acesso(string email, string? ip, string? navegador)
    {
        Email = email;
        DataAcesso = DateTime.Now;
        Ip = ip;
        Navegador = navegador;
    }
    public void Registrar()
    {
        var acessos = JsonConvert.DeserializeObject<List<Acesso>>(
            new FileInfo("data/acessos.json").ReadAllTextSafe()
        );
        if (acessos == null)
            acessos = new List<Acesso>();

        acessos.Add(this);

        File.WriteAllText("data/acessos.json", JsonConvert.SerializeObject(acessos));
    }

}