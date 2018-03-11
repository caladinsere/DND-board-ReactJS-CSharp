namespace Controllers.Api
{
    [RoutePrefix("api/endpoint")]
    public class ProjectController : ApiController
    {
        private IProjectService _service;
        private static readonly ILog log = LogManager.GetLogger(typeof(ProjectController));


        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetBoardSetup(int id)
        {
            try
            {
                ItemResponse<MStoneBoard> resp = new ItemResponse<MStoneBoard>();
                resp.Item = _service.GetProjectWithMilestones(id);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Error("Error getting the board setup", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route, HttpPost]
        public HttpResponseMessage Post(TaskAdd model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int id = _service.Insert(model);
                    ItemResponse<int> resp = new ItemResponse<int>();
                    resp.Item = id;
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                log.Error("Error adding a task", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            try
            {
                ItemResponse<MStoneMod> resp = new ItemResponse<MStoneMod>();
                resp.Item = _service.GetById(id);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Error("Error getting 1 task", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Put(int id, MStoneUpdt model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _service.Update(model);
                    SuccessResponse resp = new SuccessResponse();
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                log.Error("Error updating a task", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("route"), HttpPut]
        public HttpResponseMessage Put(List<MStnUptDO> model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _service.UpdateDisplayOrder(model);
                    SuccessResponse resp = new SuccessResponse();
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                log.Error("Error updating a display order on a task", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        
        }

        [Route("diffroute"), HttpPut]
        public HttpResponseMessage Put(List<MStnUptStatus> model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _service.UpdateStatus(model);
                    SuccessResponse resp = new SuccessResponse();
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                log.Error("Error updating a status on a task", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }

        }

        [Route("anotherroute/{id:int}"), HttpPut]
        public HttpResponseMessage Put(int id, MStnUptMilestone model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    _service.UpdateMileStone(model);
                    SuccessResponse resp = new SuccessResponse();
                    return Request.CreateResponse(HttpStatusCode.OK, resp);

                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                log.Error("Error updating a is completed, display column, date completed on a milestone", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                _service.Delete(id);
                SuccessResponse resp = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                log.Error("Error deleting a task", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        public ProjectController(IProjectService service)
        {
            _service = service;
        }
    }
}