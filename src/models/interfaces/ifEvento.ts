export interface dateObj {
    year: number,
    month: number,
    date: number,
    isThisMonth: boolean,
    isToday?: boolean,
    isSelect?: boolean,
    isEvent?:boolean
}

export interface Evento{
  fecha: string;
  evento:string;
  descripcion:string;
}
