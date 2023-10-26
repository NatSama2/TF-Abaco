import { useState, useEffect } from "react";
import { Barrasuperior } from "../Components/Navbar/Index";
import { Navbar } from "../Components/Navbar/Index";
import { CreateButton } from "../Components/Button/Button";
import { obtenerConstancias } from "../servicios/servicios";
import { DonationInformation } from "../Components/DonationInformation/Index";
import { modificarEstadoConstanciaLogistica } from "../servicios/servicios";
import Group from "../assets/Group.png";

export function Records() {
  const [selectedOption, setSelectedOption] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [documentosFiltrados, setDocumentosFiltrados] = useState([]);
  const propiedadEmpresa = "Empresa";
  const rolUsuariologistica = "R_Logistica";
  const rolUsuarioCotabilidad = "R_Contabilidad";
  const rolUsuarioRevisorFiscal = "R_Fiscal";
  const aceptar = "SI"
  const identificadorDocumento = "7"
  const rechazar = "NO"

  useEffect(() => {
    obtenerConstancias()
      .then((documentos) => {
        setDocumentos(documentos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function filtrarDocumentos(documentos, rolUsuario, estado) {
    return new Promise((resolve) => {
      let documentosFiltrados = documentos;

      documentosFiltrados = documentos.filter(
        (documento) => !["#N/A", ""].includes(documento[propiedadEmpresa])
      );

      if (rolUsuario == rolUsuariologistica) {
        if (estado == "Pendientes") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuario] === ""
          );
        } else if (estado == "Aceptados") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuario].toUpperCase() === "SI"
          );
        } else if (estado == "Firmados") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuariologistica].toUpperCase() === "SI"
          );
        } else if (estado == "Rechazados") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuariologistica].toUpperCase() === "NO"
          );
        }
      }

      if (rolUsuario == rolUsuarioCotabilidad) {
        if (estado == "Pendientes") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuariologistica].toUpperCase() === "SI"
          );
        } else if (estado == "Aceptados") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuariologistica].toUpperCase() === "SI"
          );
        } else if (estado == "Firmados") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuariologistica].toUpperCase() === "SI"
          );
        } else if (estado == "Rechazados") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuariologistica].toUpperCase() === "NO"
          );
        }
      }

      if (rolUsuario == rolUsuarioRevisorFiscal) {
        if (estado == "Pendientes") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuariologistica].toUpperCase() === "SI"
          );
        } else if (estado == "Aceptados") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuariologistica].toUpperCase() === "SI"
          );
        } else if (estado == "Firmados") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuariologistica].toUpperCase() === "SI"
          );
        } else if (estado == "Rechazados") {
          documentosFiltrados = documentosFiltrados.filter(
            (documento) => documento[rolUsuariologistica].toUpperCase() === "NO"
          );
        }
      }
      documentosFiltrados = documentosFiltrados.map((documento) => {
        documento["Fecha Expedición"] = documento["Fecha de Expedición"];
        documento["EMPRESA "] = documento["Empresa"]
        return documento;
      });
      resolve(documentosFiltrados);
    });
  }

  function cambiarEstadoDocumento(nuevoEstado,identificadorDocumento){
    modificarEstadoConstanciaLogistica(nuevoEstado, identificadorDocumento)
  }

  const certificateStyle = {
    backgroundImage: `url(${Group})`,
    backgroundSize: "80% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "80%",
    marginTop: "-30%",
    height: "400px",
  };

  const handleButtonClick = (estadoDocumento) => {
    setSelectedOption(estadoDocumento);
    let promesaDocumentosFiltrados;
    promesaDocumentosFiltrados = filtrarDocumentos(
      documentos,
      rolUsuariologistica,
      estadoDocumento
    );
    promesaDocumentosFiltrados.then((documentosFiltrados) =>
      setDocumentosFiltrados(documentosFiltrados)
    );
  };
  return (
    <div>
      <Barrasuperior />
      <Navbar />
      <div
        style={certificateStyle}
        className="relative mt-5 flex flex-col items-center ml-40"
      >
        <div className="flex justify-center">
          <div className="mr-4">
            <CreateButton
              colorClass="bg-naranja h-20"
              selected={selectedOption === "Pendientes"}
              onClick={() => handleButtonClick("Pendientes")}
              text="Pendientes"
            ></CreateButton>
          </div>
          <div className="mr-4">
            <CreateButton
              colorClass="bg-verde-claro h-20"
              selected={selectedOption === "Aceptados"}
              onClick={() => handleButtonClick("Aceptados")}
              text="Aceptados"
            ></CreateButton>
          </div>
          <div className="mr-4">
            <CreateButton
              colorClass="bg-amarillo h-20"
              selected={selectedOption === "Firmados"}
              onClick={() => handleButtonClick("Firmados")}
              text="Firmados"
            ></CreateButton>
          </div>
          <div className="mr-4">
            <CreateButton
              colorClass="bg-gris-claro h-20"
              selected={selectedOption === "Rechazados"}
              onClick={() => handleButtonClick("Rechazados")}
              text="Rechazados"
            ></CreateButton>
          </div>

          <div className="mr-4">
          <CreateButton
            colorClass="bg-gris-claro w-fit h-20"
            selected={selectedOption === "SI"}
            onClick={() => cambiarEstadoDocumento(aceptar, identificadorDocumento)}
            text="si"
          ></CreateButton>
        </div>
        <div className="mr-4">
          <CreateButton
            colorClass="bg-gris-claro w-fit h-20"
            selected={selectedOption === "no"}
            onClick={() => cambiarEstadoDocumento(rechazar, identificadorDocumento)}
            text="NO"
          ></CreateButton>
        </div>


        </div>
        <div>
          <DonationInformation
            documentos={documentosFiltrados}
          ></DonationInformation>
        </div>
      </div>
    </div>
  );
}
