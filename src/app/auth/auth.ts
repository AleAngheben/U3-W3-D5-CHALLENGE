export interface Auth {
  accessToken: string;
  user: {
    id: number;
    email: string;
    nome: string;
    cognome: string;
    imageProf: string;
  };
}
