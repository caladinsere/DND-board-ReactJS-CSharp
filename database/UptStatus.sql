CREATE PROC [dbo].[Stored_Procedure]
    @updtStatus [dbo].[UptStatus_TableType] READONLY
AS
BEGIN TRANSACTION; 

BEGIN TRY
    UPDATE Table
    SET Table.ProjStatusId = [@updtStatus].ProjStatusId
    FROM Table P
    JOIN @updtStatus
    ON P.Id = [@updtStatus].Id
    WHERE P.Id= [@updtStatus].Id
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