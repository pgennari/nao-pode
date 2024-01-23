using Microsoft.AspNetCore.OpenApi;
using Newtonsoft.Json;
using Amazon.DynamoDBv2;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAntiforgery();

builder.Configuration.GetAWSOptions();
builder.Services.AddAWSService<IAmazonDynamoDB>();
	
builder.Services.AddSingleton<DynamoDbRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAntiforgery();
app.UseHttpsRedirection();

app.MapGet("/ping", Ping);

app.MapPost("/usuario", async (HttpContext context) =>
{
    try
    {
        Usuario? usuario = await context.Request.ReadFromJsonAsync<Usuario>();

        if (usuario == null || !usuario.IsValid())
        {
            return Results.BadRequest("O objeto Usuario está inválido.");
        }

        // Capturando o IP
        var ip = context.Connection.RemoteIpAddress?.ToString();
        // Capturando o navegador
        var userAgent = context.Request.Headers["User-Agent"].ToString();

        return Results.Ok(usuario.GetUsuario("", ip, userAgent));
    }
    catch
    {
        throw;
    }
})
.WithName("PostUsuario")
.WithOpenApi();

app.MapGet("/usuario/{email}", (HttpContext context, string email, [FromQuery] string expand = "") =>
{
    try
    {
        if (string.IsNullOrEmpty(email))
        {
            return Results.BadRequest("O email não pode ser nulo ou vazio.");
        }

        // Capturando o IP
        var ip = context.Connection.RemoteIpAddress?.ToString();
        // Capturando o navegador
        var userAgent = context.Request.Headers["User-Agent"].ToString();

        return Results.Ok(new Usuario(email).GetUsuario(expand, ip, userAgent));
    }
    catch
    {
        throw;
    }
})
.WithName("GetUsuario")
.WithOpenApi();


app.MapGet("/usuarios", (HttpContext context, [FromQuery] string expand = "") =>
{
    try
    {

        return Results.Ok(Usuario.GetUsuarios(expand));
    }
    catch
    {
        throw;
    }
})
.WithName("GetUsuarios")
.WithOpenApi();

app.MapPost("/palavra", (List<Palavra> palavras) =>
{
    try
    {
        if (palavras == null || palavras.Count == 0)
        {
            return Results.BadRequest("O objeto Palavra está inválido.");
        }
        foreach (var palavra in palavras)
            palavra.Registrar();

        return Results.Created();
    }
    catch
    {
        throw;
    }
})
.WithName("PostPalavra")
.WithOpenApi();

app.MapGet("/palavras", (HttpContext context) =>
{
    try
    {
        List<Palavra> palavras= Palavra.GetPalavras();

        return Results.Ok(palavras);
    }
    catch
    {
        throw;
    }
})
.WithName("GetPalavras")
.WithOpenApi();

app.MapPost("/jogo", (Usuario usuario) =>
{
    try
    {
        if (usuario == null || !usuario.IsValid())
        {
            return Results.BadRequest("O objeto Usuario está inválido.");
        }

        var jogo = new Jogo(usuario);
        jogo.Criar();

        return Results.Ok(jogo);
    }
    catch
    {
        throw;
    }
})
.WithName("PostJogo")
.WithOpenApi();

app.MapGet("/jogo/{id}", (HttpContext context, string id) =>
{
    try
    {
        if (string.IsNullOrEmpty(id))
        {
            return Results.BadRequest("O id não pode ser nulo ou vazio.");
        }

        var jogo = new Jogo(id).GetJogo();

        return Results.Ok(jogo);
    }
    catch
    {
        throw;
    }
})
.WithName("GetJogo")
.WithOpenApi();

app.MapPatch("/jogo/{jogoId}/rodada/{rodadaId}", async (HttpContext context, string jogoId, string rodadaId) =>
{
    try
    {
        if (string.IsNullOrEmpty(jogoId))
        {
            return Results.BadRequest("O id do Jogo não pode ser nulo ou vazio.");
        }
        if (string.IsNullOrEmpty(rodadaId))
        {
            return Results.BadRequest("O id do Jogo não pode ser nulo ou vazio.");
        }

        PalavraSorteada? palavraSorteada = await context.Request.ReadFromJsonAsync<PalavraSorteada>();

        var jogo = new Jogo(jogoId).GetJogo();
        var rodadas = jogo.Rodadas ?? throw new Exception("Rodada não encontrada.");
        var rodadaAtual = rodadas.FirstOrDefault(r => r.Id == rodadaId) ?? throw new Exception("Rodada não encontrada.");

        rodadaAtual.RegistrarJogada(palavraSorteada);

        return Results.Ok(jogo);
    }
    catch
    {
        throw;
    }
})

app.Run();

static IResult Ping()
{
    return TypedResults.Ok("Sucesso");
}
