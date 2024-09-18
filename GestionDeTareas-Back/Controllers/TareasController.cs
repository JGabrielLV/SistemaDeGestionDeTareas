using GestionDeTareas.Models;
using GestionDeTareas.Models.DTOs;
using GestionDeTareas.Models.Shared;
using GestionDeTareas.Servicies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web.Http;

namespace GestionDeTareas.Controllers
{
    //[RoutePrefix("api/tareas")]
    public class TareasController : ApiController
    {
        private readonly SGTareasService _TareasServices;
        private TaskManagerEntities dba;
        public TareasController()
        {
            _TareasServices = new SGTareasService();
            dba = new TaskManagerEntities();
        }
        // GET: Tareas
        //public ActionResult Index()
        //{
        //    return View();
        //}

        [HttpGet]
        public OperationResult<ICollection<TareasDTO>> GetAllSGTareas()
        {
            try
            {
                ICollection<TareasDTO> _tareas = _TareasServices.GetAll();
                //return Json(new OperationResult<ICollection<TareasDTOs>>()
                //{
                //    Datos = _tareas
                //},
                //JsonRequestBehavior.AllowGet);
                return new OperationResult<ICollection<TareasDTO>>()
                {
                    Datos = _tareas
                };
            }
            catch (Models.Shared.HttpError ew)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Models.Shared.HttpError("Error general al traer usuarios ", ex);
            }
        }

        [HttpPost]
        public OperationResult<TareasDTO> PostSGTarea(TareasDTO tarea)
        {
            try
            {
                TareasDTO tareaTemp = _TareasServices.Post(tarea);
                return new OperationResult<TareasDTO>()
                {
                    MensajeUsuario = "Tarea agregada exitosamente",
                    Datos = tareaTemp
                };
            }
            catch (Models.Shared.HttpError ew)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Models.Shared.HttpError("Error al agregar tarea ", ex);
            }
        }
        [HttpPut]
        [Route("api/tareas/{IdTarea}")]
        public OperationResult<TareasDTO> PutSGTarea(int IdTarea,[FromBody] TareasDTO tarea)
        {
            try
            {
                Tareas tareaTemp = dba.Tareas.FirstOrDefault(x => x.Id == IdTarea);
                if (tareaTemp == null)
                {
                    throw new Models.Shared.HttpError("Tarea no existe. Verifique.");
                }
                TareasDTO tareaResult = _TareasServices.Put(tarea);
                return new OperationResult<TareasDTO>()
                {
                    MensajeUsuario =string.Concat( "Tarea actualizada exitosamente. " ),
                    Datos= tareaResult
                };
            }
            catch (Models.Shared.HttpError ew)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Models.Shared.HttpError("Error al actualizar tarea", ex);
            }
        }
        [HttpDelete]
        [Route("api/tareas/{IdTarea}")]
        public OperationResult<TareasDTO> DeleteSGTarea(int IdTarea)
        {
            try
            {
                Tareas tareaTemp = dba.Tareas.FirstOrDefault(x => x.Id == IdTarea);
                if (tareaTemp == null)
                {
                    throw new Models.Shared.HttpError("Tarea no existe. Verifique.");
                }
                string tareaResult = _TareasServices.Delete(IdTarea);
                return new OperationResult<TareasDTO>()
                {
                    MensajeUsuario = string.Concat("Tarea eliminada exitosamente. ")
                };
            }
            catch (Models.Shared.HttpError ew)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new Models.Shared.HttpError("Error al actualizar tarea", ex);
            }
        }
    }
}
