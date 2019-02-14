export interface Vacuna {
  idVacuna: number;
  nombre: string;
  descripcion: string;
  dosis: number;
  vacunado:boolean;
}

export interface FechaVacuna {
  strimg : string;
  idFecha: number;
  titulo: string;
}

export interface VacunaxInfante{
  vacunado:boolean;
  fechaVacuna: string;
  idVacuna: number;
  dosis: number;
}
