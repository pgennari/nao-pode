using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;

public class DynamoDbRepository
{
    private readonly DynamoDBContext _context;

    public DynamoDbRepository(IAmazonDynamoDB dynamoDbClient)
    {
        _context = new DynamoDBContext(dynamoDbClient);
    }

    public async Task<Usuario> AddItem(Usuario usuarioRequest)
    {

        await _context.SaveAsync(usuarioRequest);

        return usuarioRequest;
    }
}
