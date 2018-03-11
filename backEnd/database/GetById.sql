CREATE proc [dbo].[Stored_Procedure]
    @Id int
as
begin
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
end