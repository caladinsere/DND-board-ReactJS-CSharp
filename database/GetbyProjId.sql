CREATE PROC [dbo].[Stored_Procedure]
	@ProjectId int
AS
BEGIN TRY
	SELECT 
		Id,
		Name,
		DateStart,
		Description,
		IsApproved
	FROM Table
	WHERE Id= @projectId;

	SELECT 
		Id,
		DisplayName,
		Description,
		DisplayOrder
	FROM Table2
	ORDER BY DisplayOrder

	SELECT 
		Id,
		DisplayName,
		Description,
		DisplayOrder
	FROM Table3

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
		ModifiedDate
	FROM Table4
	WHERE ProjectId = @projectId
	ORDER BY DisplayOrder
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