CREATE proc [dbo].[Stored_Procedure]
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
as
begin try
    insert into Table(
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

    set @Id = SCOPE_IDENTITY();
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
        