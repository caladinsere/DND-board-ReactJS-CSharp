create proc [dbo].[Stored_Procedure]
    @updtdo [dbo].[Update_TableType] READONLY
as
begin
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
end
