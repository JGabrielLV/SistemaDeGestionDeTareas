using System;
using System.Collections.Generic;
using System.Net;

namespace GestionDeTareas.Models.Shared
{
    public class HttpError : Exception
    {
        public HttpStatusCode CodigoError { get; set; }
        public string MensajeUsuario { get; set; }
        public List<string> Detalles { get; set; }
        public string MensajeDesarrollador { get; set; }
        public Object Datos { get; set; }


        public HttpError(HttpError _error)
        {
            this.CodigoError = _error.CodigoError;
            this.MensajeUsuario = _error.MensajeUsuario;
            this.Detalles = _error.Detalles;
            this.MensajeDesarrollador = _error.MensajeDesarrollador;
        }

        public HttpError(HttpStatusCode errorCode = HttpStatusCode.InternalServerError)
        {
            this.CodigoError = errorCode;
        }

        public HttpError(string mensaje, HttpStatusCode errorCode = HttpStatusCode.InternalServerError)
        {
            this.CodigoError = errorCode;
            this.MensajeUsuario = mensaje;
        }

        public HttpError(string mensaje, List<string> detalles, HttpStatusCode errorCode = HttpStatusCode.InternalServerError)
        {
            this.CodigoError = errorCode;
            this.MensajeUsuario = mensaje;
            this.Detalles = detalles ?? new List<string>();
        }


        public HttpError(string mensaje, Exception ex, HttpStatusCode errorCode = HttpStatusCode.InternalServerError)
        {
            this.CodigoError = errorCode;
            this.MensajeUsuario = mensaje;
            this.MensajeDesarrollador = ex.StackTrace + " => " + ex.Message;
        }

        public HttpError(string mensaje, Exception ex, List<string> detalles, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        {
            this.CodigoError = statusCode;
            this.MensajeUsuario = mensaje;
            this.Detalles = detalles ?? new List<string>();
            this.MensajeDesarrollador = ex.StackTrace + " => " + ex.Message;
        }
    }
}
