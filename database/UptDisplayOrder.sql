create proc [dbo].[Stored_Procedure]
    @updtdo [dbo].[Update_TableType] READONLY
as
begin try
    Update 
        Table
    Set
        Table.DisplayOrder = [@updtdo].DisplayOrder
        From
            Table P
        Join
            @updtdo
        on
            P.Id = [@updtdo].Id
    Where
        P.Id= [@updtdo].Id
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
