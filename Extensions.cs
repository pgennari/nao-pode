
public  static class Extensions{
    public static string ReadAllTextSafe(this FileInfo file){
        if (file.Exists){
            return File.ReadAllText(file.FullName);
        }else{
            return "";
        }
    }
}