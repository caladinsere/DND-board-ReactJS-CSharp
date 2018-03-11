namespace Project.Services
{
    public class ProjectService : BaseService, IProjectService
    {
        public MStoneBoard GetBoardSetup(int id)
        {
            Dictionary<int, TaskStatus> statusList = new Dictionary<int, TaskStatus>();
            Dictionary<int, Milestones> mStroneDict = new Dictionary<int, Milestones>();
            MStoneBoard model = new MStoneBoard { milestoneList = new List<Milestones>() };

            this.DataProvider.ExecuteCmd(
                "Stored_Procedure",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@ProjectId", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int index = 0;
                    switch (set)
                    {
                        case 0:
                            index = 0;
                            model.Id = reader.GetSafeInt32(index++);
                            model.Name = reader.GetSafeString(index++);
                            model.DateStart = reader.GetSafeDateTime(index++);
                            model.Description = reader.GetSafeString(index++);
                            model.IsApproved = reader.GetSafeBool(index++);
                            break;
                        case 1:
                            Milestones milestoneModel = new Milestones();
                            index = 0;
                            milestoneModel.Id = reader.GetSafeInt32(index++);
                            milestoneModel.DisplayName = reader.GetSafeString(index++);
                            milestoneModel.Description = reader.GetSafeString(index++);
                            milestoneModel.DisplayOrder = reader.GetSafeInt32(index++);
                            model.milestoneList.Add(milestoneModel);
                            // Add the milestone list to the model
                            mStroneDict.Add(milestoneModel.Id, milestoneModel);
                            break;
                        case 2:
                            TaskStatus statusModel = new TaskStatus();
                            index = 0;
                            statusModel.Id = reader.GetSafeInt32(index++);
                            statusModel.DisplayName = reader.GetSafeString(index++);
                            statusModel.Description = reader.GetSafeString(index++);
                            statusModel.DisplayOrder = reader.GetSafeInt32(index++);
                            statusList.Add(statusModel.Id, statusModel);
                            break;
                        case 3:
                            taskView taskModel = new taskView();
                            index = 0;
                            taskModel.Id = reader.GetSafeInt32(index++);
                            taskModel.ProjectId = reader.GetSafeInt32(index++);
                            taskModel.Task = reader.GetSafeString(index++);
                            taskModel.Instruction = reader.GetSafeString(index++);
                            taskModel.CompletionGuidelines = reader.GetSafeString(index++);
                            taskModel.EstCompDate = reader.GetSafeString(index++);
                            taskModel.ProjStatusId = reader.GetSafeInt32(index++);
                            taskModel.Milestone = reader.GetSafeInt32(index++);
                            taskModel.DisplayOrder = reader.GetSafeInt32(index++);
                            taskModel.ModifiedDate = reader.GetSafeDateTime(index++);

                            TaskStatus status = statusList[taskModel.ProjStatusId];
                            taskModel.Status = status;

                            // Find the Status in which the Milestone model belongs to
                            Milestones mStoneMilestoneModel = mStroneDict[taskModel.Milestone];
                        
                            if (mStoneMilestoneModel.taskList == null)
                            {
                                // create a new list if needed
                                mStoneMilestoneModel.taskList = new List<taskView>();
                            }
                            // Add the Milestone model to the appropriate status item
                            mStoneMilestoneModel.taskList.Add(taskModel);
                            break;
                    }
                }
            );
            return model;
        }

        public int Insert(MStonesAdd model)
        {
            int id = 0;
            this.DataProvider.ExecuteNonQuery(
                    "Stored_Procedure",
                    inputParamMapper: delegate (SqlParameterCollection paramCol)
                    {
                        SqlParameter parm = new SqlParameter();
                        parm.ParameterName = "@Id";
                        parm.SqlDbType = System.Data.SqlDbType.Int;
                        parm.Direction = System.Data.ParameterDirection.Output;
                        paramCol.Add(parm);

                        paramCol.AddWithValue("@ProjectId", model.ProjectId);
                        paramCol.AddWithValue("@Task", model.Task);
                        paramCol.AddWithValue("@Instruction", model.Instruction);
                        paramCol.AddWithValue("@CompletionGuidelines", model.CompletionGuidelines);
                        paramCol.AddWithValue("@EstCompDate", model.EstCompDate);
                        paramCol.AddWithValue("@ProjstatusId", model.ProjstatusId);
                        paramCol.AddWithValue("@Milestone", model.Milestone);
                        paramCol.AddWithValue("@DisplayOrder", model.DisplayOrder);
                        paramCol.AddWithValue("@ModifiedBy", model.ModifiedBy);
                    },
                    returnParameters: delegate (SqlParameterCollection paramCol)
                    {
                        id = (int)paramCol["@id"].Value;
                    }
                );
            return id;
        }

        public MStonesMod GetById(int id)
        {
            MStonesMod model = null;
            this.DataProvider.ExecuteCmd(
                "Stored_Procedure",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    model = Mapper(reader);
                }
            );
            return model;
        }

        public void Update(MStonesUpt model)
        {
            this.DataProvider.ExecuteNonQuery(
                "Stored_Procedure",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", model.Id);
                    paramCol.AddWithValue("@ProjectId", model.ProjectId);
                    paramCol.AddWithValue("@Task", model.Task);
                    paramCol.AddWithValue("@Instruction", model.Instruction);
                    paramCol.AddWithValue("@CompletionGuidelines", model.CompletionGuidelines);
                    paramCol.AddWithValue("@EstCompDate", model.EstCompDate);
                    paramCol.AddWithValue("@ProjstatusId", model.ProjstatusId);
                    paramCol.AddWithValue("@Milestone", model.Milestone);
                    paramCol.AddWithValue("@DisplayOrder", model.DisplayOrder);
                    paramCol.AddWithValue("@ModifiedBy", model.ModifiedBy);
                }
            );
        }
       
        public void UpdateDisplayOrder(List<MStnsUptDO> model)
        {
            this.DataProvider.ExecuteNonQuery(
                "Stored_Procedure",
                inputParamMapper: delegate(SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@updtdo", CreateDataTable(model));
                }
            );
        }
    
        public void UpdateStatus(List<MStnsUptStatus> model)
        {
            this.DataProvider.ExecuteNonQuery(
                "Stored_Procedure",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@updtStatus", CreateDataTable2(model));
                }
            );
        }

        public void UpdateMileStone(MStnsUptMilestone model)
        {
            this.DataProvider.ExecuteNonQuery(
                "Stored_Procedure",
                inputParamMapper: delegate(SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", model.Id);
                    paramCol.AddWithValue("@Milestone", model.Milestone);
                    
                }
            );
        }

        public void Delete(int id)
        {
            this.DataProvider.ExecuteNonQuery(
                "Stored_Procedure",
                inputParamMapper: delegate (SqlParameterCollection paramCol)
                {
                    paramCol.AddWithValue("@Id", id);
                }
            );
        }

        private MStonesMod Mapper(IDataReader reader)
        {
            MStonesMod model = new MStonesMod();
            int index = 0;
            model.Id = reader.GetSafeInt32(index++);
            model.ProjectId = reader.GetSafeInt32(index++);
            model.Task = reader.GetSafeString(index++);
            model.Instruction = reader.GetSafeString(index++);
            model.CompletionGuidelines = reader.GetSafeString(index++);
            model.EstCompDate = reader.GetSafeString(index++);
            model.ProjstatusId = reader.GetSafeInt32(index++);
            model.Milestone = reader.GetSafeInt32(index++);
            model.DisplayOrder = reader.GetSafeInt32(index++);
            model.CreatedDate = reader.GetDateTime(index++);
            model.ModifiedDate = reader.GetDateTime(index++);
            model.ModifiedBy = reader.GetSafeString(index++);
           
            return model;
        }

        private static DataTable CreateDataTable(List<MStnsUptDO> models)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("DisplayOrder", typeof(int));
            foreach (MStnsUptDO model in models)
            {
                table.Rows.Add(model.Id, model.DisplayOrder);
            }
            return table;
        }

        private static DataTable CreateDataTable2(List<MStnsUptStatus> models)
        {
            DataTable table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("ProjStatusId", typeof(int));
            foreach (MStnsUptStatus model in models)
            {
                table.Rows.Add(model.Id, model.ProjStatusId);
            }
            return table;
        }
    }
}