CREATE PROC [dbo].[Stored_Procedure]
    @Id int OUT,
    @ProjectId int,
    @Task nvarchar(50),
    @Instruction nvarchar(2048),
    @CompletionGuidelines nvarchar(MAX),
    @EstCompDate nchar(25),
    @ProjStatusId int,
    @Milestone int,
    @DisplayOrder int,
    @ModifiedBy nvarchar(128)
AS
BEGIN TRANSACTION; 

BEGIN TRY
    INSERT INTO Table(
        ProjectId,
        Task,
        Instruction,
        CompletionGuidelines,
        EstCompDate,
        ProjStatusId,
        Milestone,
        DisplayOrder,
        ModifiedBy
        )values(
        @ProjectId,
        @Task,
        @Instruction,
        @CompletionGuidelines,
        @EstCompDate,
        @ProjStatusId,
        @Milestone,
        @DisplayOrder,
        @ModifiedBy
        );

    SET @Id = SCOPE_IDENTITY();
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