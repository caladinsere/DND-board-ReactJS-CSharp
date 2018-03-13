CREATE proc [dbo].[Stored_Procedure]
    @Id int,
    @Milestone int
as
begin try

declare @_modifiedDate datetime = getutcdate();
    update 
        Table
    set
        ModifiedDate = @_modifiedDate,
        Milestone = @Milestone
    where
        Id = @Id
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