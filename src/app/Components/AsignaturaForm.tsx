import { useState, useEffect } from "react";
import { IAsignatura } from "../Models/Iasignatura";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onAgregar: (newAsignatura: IAsignatura) => void;
}

export const AsignaturaForm: React.FC<Props> = ({
  open,
  onClose,
  onAgregar,
}) => {
  
  const [newAsignatura, setNewAsignatura] = useState<IAsignatura>({
    asignaturaId: 0,
    codigo: "",
    nombre: "",
    cargaHoraria: 0,
  });


  const [isFormValid, setIsFormValid] = useState(false);

  // Validar que los campos no estén vacíos
  useEffect(() => {
    const isValid =
      newAsignatura.codigo.trim() !== "" &&
      newAsignatura.nombre.trim() !== "" &&
      newAsignatura.cargaHoraria > 0;
    setIsFormValid(isValid);
  }, [newAsignatura]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAsignatura({ ...newAsignatura, [name]: value });
  };

  const handleSubmit = () => {
    if (isFormValid) {
      onAgregar(newAsignatura);
      setNewAsignatura({ asignaturaId: 0, codigo: "", nombre: "", cargaHoraria: 0 });
      onClose(); // Cerrar modal después de agregar
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Asignatura</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Código"
          name="codigo"
          fullWidth
          value={newAsignatura.codigo}
          onChange={handleInputChange}
          error={newAsignatura.codigo.trim() === ""}
          helperText={
            newAsignatura.codigo.trim() === "" ? "El código es obligatorio" : ""
          }
        />
        <TextField
          margin="dense"
          label="Nombre"
          name="nombre"
          fullWidth
          value={newAsignatura.nombre}
          onChange={handleInputChange}
          error={newAsignatura.nombre.trim() === ""}
          helperText={
            newAsignatura.nombre.trim() === "" ? "El nombre es obligatorio" : ""
          }
        />
        <TextField
          margin="dense"
          label="Carga Horaria"
          name="carga_horaria"
          type="number"
          fullWidth
          value={newAsignatura.cargaHoraria}
          onChange={handleInputChange}
          error={newAsignatura.cargaHoraria <= 0}
          helperText={
            newAsignatura.cargaHoraria <= 0
              ? "La carga horaria debe ser mayor que 0"
              : ""
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={!isFormValid}
        >
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
};