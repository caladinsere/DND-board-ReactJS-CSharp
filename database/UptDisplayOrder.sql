CREATE PROC [dbo].[Stored_Procedure]
    @updtdo [dbo].[Update_TableType] READONLY
AS
BEGIN TRANSACTION; 

BEGIN TRY
    UPDATE Table
    SET Table.DisplayOrder = [@updtdo].DisplayOrder
    FROM Table P
    JOIN  @updtdo
    ON P.Id = [@updtdo].Id
    WHERE P.Id= [@updtdo].Id
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