using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GestionDeTareas.Models.Shared
{
    public class OperationResult
    {
        public string MensajeUsuario { get; set; }
        public List<string> Detalles { get; set; }
    }
    public class OperationResult<T>
    {
        public OperationResult()
        { }
        public string MensajeUsuario { get; set; }
        public List<string> Detalles { get; set; }

        public T Datos { get; set; }
    }
}