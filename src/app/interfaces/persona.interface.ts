export interface Persona {
    id:         number;
    usuario:    string;
    email:      string;
    nombre:     string;
    apellido:   string;
    estado:     Estado

}

export enum Estado {
    activo = 'activo',
    inactivo = 'inactivo'
}
