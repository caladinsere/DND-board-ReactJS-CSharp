CREATE proc [dbo].[Stored_Procedure]
    @Id int
as
begin try
    select
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
    from
        Table
    where
        Id= @id;
    commit
end try
begin catch
	IF @@TRANCOUNT > 0
		Rollback

	declare @ErrMsg nvarchar(4000), @ErrSeverity int
	select @ErrMsg = ERROR_MESSAGE(),
			@ErrSeverity = ERROR_SEVERITY()

	RAISERROR(@ErrMsg, @ErrSeverity, 1)
end catch