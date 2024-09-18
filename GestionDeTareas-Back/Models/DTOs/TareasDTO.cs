using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GestionDeTareas.Models.DTOs
{
    public class TareasDTO
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public System.DateTime FechaCreacion { get; set; }
        public bool Estado { get; set; }
    }
}