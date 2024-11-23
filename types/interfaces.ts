export interface OrganizadorProps {
    id: string;
    nome: string;
    organizador: {
        id: string;
        nome: string;
    }


}

export interface EventoProps {
    id?: string;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;
    banner: string;
    organizador_id: string;
    atividades: AtividadesProps[];
    organizadores: OrganizadorProps[]
}

export interface TypesEventsProps {
    id?: string;
    nome: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    horario: string;
    local: string;
    image?: File | null;
    organizador_id?: string;
}

export interface InscritosProps {
    participante: {
        nome: string;
    };
}

export interface AtividadesProps {
    id: string;
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    eventoId: string;
    createdAt: string;
    concomitante: boolean;
    organizadores: OrganizadorProps[];
    inscricoes: InscritosProps[];
    ch: number;
}

export interface CreateAtividadesProps {
    id?: string;
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    eventoId: string;
    concomitante: boolean;
    ch: number;
}

export interface ParticipantesProps {
    id: string;
    nome: string;
    email: string;
    idade: number;
    sexo: "M" | "F";
}

export interface ActivitiesProps {
    horario: string;
    nome: string;
    local: string;
    descricao: string;
    vagas: number;
    concomitante: boolean;
    ch: number;
    evento_id: string | null;
}

export interface CreateColabProps {
    organizador_id: string;
    atividade_id: string;
}

export interface User {
    id: string;
    nome: string;
    email: string;
    senha: string;
    createdAt: string;
    updatedAt: string;
    googleId: string | null;
    role: string;
}
export interface InscriptionProps {
    id: string;
    atividade_id: string;
    atividade: {
        horario: string,
        nome: string,
        local: string,
        descricao: string,
        vagas: number
    }
}
