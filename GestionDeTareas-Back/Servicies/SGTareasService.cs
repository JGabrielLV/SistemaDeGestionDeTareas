using GestionDeTareas.Models;
using GestionDeTareas.Models.DTOs;
using GestionDeTareas.Models.Shared;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Threading;
using System.Web;

namespace GestionDeTareas.Servicies
{
    public  class SGTareasService
    {
        private TaskManagerEntities dba;
        public SGTareasService()
        {
            dba = new TaskManagerEntities();
        }
        /// <summary>
        /// Método que sirve para obtener todas las tareas
        /// </summary>
        /// <returns> regresa el listado de las tareas</returns>
        public ICollection<TareasDTO>  GetAll()
        {
            dba = new TaskManagerEntities();
            var tareas = dba.Tareas.ToList();
            ICollection<TareasDTO> resltTareasDTOs=new HashSet<TareasDTO>();
            foreach (var item in tareas)
            {
                resltTareasDTOs.Add(new TareasDTO()
                {
                    Id = item.Id,
                    Titulo = item.Titulo,
                    Descripcion= item.Descripcion,
                    FechaCreacion= item.FechaCreacion,
                    Estado= item.Estado
                });
            }

            //throw new HttpError("Error general al traer usuarios ");
            return resltTareasDTOs;
        }

        /// <summary>
        /// Método que sirve para agregar una nueva tarea
        /// </summary>
        /// <param name="_tarea">objeto que contiene los datos de la nueva tarea</param>
        /// <returns> regresa el objetos de la nueva tarea agregada con el Id actualizado</returns>
        public TareasDTO Post(TareasDTO _tarea)
        {
            string result = "";
            Tareas tareaTemp = new Tareas()
            {
                Titulo = _tarea.Titulo,
                Descripcion = _tarea.Descripcion,
                Estado = _tarea.Estado,
                FechaCreacion = DateTime.Now
            };
            dba.Tareas.Add(tareaTemp);;
            dba.SaveChanges();
            _tarea.Id= tareaTemp.Id;
            return _tarea;
        }
        /// <summary>
        /// Método que sirve para actualizar una tarea ya existente
        /// </summary>
        /// <param name="_tarea">objeto que contiene los datos de la tarea a actualizar</param>
        /// <returns>regresa el objeto con los datos que se actualizaron de la tarea</returns>
        public TareasDTO Put(TareasDTO _tarea)
        {
            string result = "";

            Tareas tareaTemp = dba.Tareas.FirstOrDefault(x => x.Id == _tarea.Id);
            tareaTemp.Titulo= _tarea.Titulo;
            tareaTemp.Descripcion= _tarea.Descripcion;
            tareaTemp.Estado = _tarea.Estado;
            dba.Tareas.AddOrUpdate(tareaTemp);
            dba.SaveChanges();
            //dba.Tareas.Add(new Tareas()
            //{
            //    Titulo = _tarea.Titulo,
            //    Descripcion = _tarea.Descripcion,
            //    Estado = false,
            //    FechaCreacion = DateTime.Now
            //}); ;
            //dba.SaveChanges();
            return _tarea;
        }

        /// <summary>
        /// Método que sirve para eliminar una tarea existente
        /// </summary>
        /// <param name="IdTarea"> Id de la tarea a eliminar</param>
        /// <returns> mensaje si se realizo correctamente</returns>
        public string Delete(int IdTarea)
        {
            string result = "false";

            Tareas tareaTemp = dba.Tareas.FirstOrDefault(x => x.Id == IdTarea);
            dba.Tareas.Remove(tareaTemp);
            dba.SaveChanges();
            //dba.Tareas.Add(new Tareas()
            //{
            //    Titulo = _tarea.Titulo,
            //    Descripcion = _tarea.Descripcion,
            //    Estado = false,
            //    FechaCreacion = DateTime.Now
            //}); ;
            //dba.SaveChanges();
            result = "true";
            return result;
        }
    }
}