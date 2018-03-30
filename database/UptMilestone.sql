CREATE PROC [dbo].[Stored_Procedure]
    @Id int,
    @Milestone int
AS
BEGIN TRANSACTION;  

BEGIN TRY
DECLARE @_modifiedDate DATETIME = GETUTCDATE();
    UPDATE Table
    SET
        ModifiedDate = @_modifiedDate,
        Milestone = @Milestone
    WHERE Id = @Id
END TRY  
BEGIN CATCH  
    SELECT   
        ERROR_NUMBER() AS ErrorNumber  
        ,ERROR_SEVERITY() AS ErrorSeverity  
        ,ERROR_STATE() AS ErrorState  
        ,ERROR_PROCEDURE() AS ErrorProcedure  
        ,ERROR_LINE() AS ErrorLine  
        ,ERROR_MESSAGE() AS ErrorMessage;  

    IF @@TRANCOUNT > 0  
        ROLLBACK TRANSACTION;  
END CATCH;  

IF @@TRANCOUNT > 0  
    COMMIT TRANSACTION;  
GO  