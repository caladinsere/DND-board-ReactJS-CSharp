create proc [dbo].[Stored_Procedure]
    @updtStatus [dbo].[UptStatus_TableType] READONLY
as
begin try
    Update 
        Table
    Set
        Table.ProjStatusId = [@updtStatus].ProjStatusId
        From
            Table P
        Join
            @updtStatus
        on
            P.Id = [@updtStatus].Id
    Where
        P.Id= [@updtStatus].Id
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