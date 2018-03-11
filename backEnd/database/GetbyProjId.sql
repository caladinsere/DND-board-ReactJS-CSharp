CREATE proc [dbo].[Stored_Procedure]
	@ProjectId int
as
begin
	select 
		Id,
		Name,
		DateStart,
		Description,
		IsApproved
	from Table
	where 
		Id= @projectId;

	select 
		Id,
		DisplayName,
		Description,
		DisplayOrder
	from Table2
	order by DisplayOrder

	select 
		Id,
		DisplayName,
		Description,
		DisplayOrder
	from Table3

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
		ModifiedDate
	from Table4
	where
		ProjectId = @projectId
	order by DisplayOrder
end