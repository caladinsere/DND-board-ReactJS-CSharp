CREATE proc [dbo].[Stored_Procedure]
    @Id int,
    @Milestone int
as
begin

declare @_modifiedDate datetime = getutcdate();
    update 
        Table
    set
        ModifiedDate = @_modifiedDate,
        Milestone = @Milestone
    where
        Id = @Id
end