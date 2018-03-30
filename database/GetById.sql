CREATE PROC [dbo].[Stored_Procedure]
    @Id int
AS
BEGIN TRY
    SELECT
        Id,
        ProjectId,
        Task,
        Instruction,
        CompletionGuidelines,
        EstCompDate,
        ProjStatusId,
        Milestone,
        DisplayOrder,
        CreatedDate,
        ModifiedDate,
        ModifiedBy
    FROM Table
    WHERE Id= @id;
END TRY
BEGIN CATCH
	SELECT  
        ERROR_NUMBER() AS ErrorNumber  
        ,ERROR_SEVERITY() AS ErrorSeverity  
        ,ERROR_STATE() AS ErrorState  
        ,ERROR_PROCEDURE() AS ErrorProcedure  
        ,ERROR_LINE() AS ErrorLine  
        ,ERROR_MESSAGE() AS ErrorMessage;  
END CATCH;  
GO  