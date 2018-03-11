CREATE proc [dbo].[Stored_Procedure]
    @Id int
as
begin
    delete 
        Table    
    where
        Id= @Id;
end