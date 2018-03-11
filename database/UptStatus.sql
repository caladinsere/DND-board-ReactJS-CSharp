create proc [dbo].[Stored_Procedure]
    @updtStatus [dbo].[UptStatus_TableType] READONLY
as
begin
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
end