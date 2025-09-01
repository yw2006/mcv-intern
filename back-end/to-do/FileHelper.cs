using System;
using System.IO;

static class FileHelper
{
    public static string Folder = "./tasks/";

    public static Exception GetAvailableFiles()
    {
        try
        {
            string[] files = Directory.GetFiles(Folder);

            foreach (var file in files)
            {
                Console.WriteLine(Path.GetFileName(file));
            }

            return null;
        }
        catch (Exception ex)
        {
            return ex;
        }
    }

    public static Exception CreateFile(string fileName)
    {
        try
        {
            // Ensure folder exists
            if (!Directory.Exists(Folder))
            {
                Directory.CreateDirectory(Folder);
            }
            if (File.Exists(Folder + fileName)){
                Console.WriteLine("⚠️ File already exists.");
                return null;
            }
            if (string.IsNullOrWhiteSpace(fileName)){
                Console.WriteLine("⚠️ File name cannot be empty.");
                return null;
            }
            FileStream fs = File.Create(Folder + fileName);
            Console.WriteLine("✅ File created.");


            return null;
        }
        catch (Exception ex)
        {
            return ex;
        }
    }
}


