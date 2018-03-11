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
begin
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
end
        