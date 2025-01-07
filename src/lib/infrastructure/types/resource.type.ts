type IRelationships = {
  [key: string]: {
    data: {
      type: string;
      id: string;
    }
  }
}

export type IResource<TAttributes> = {
  id: string;
  type: string;
  attributes: TAttributes;
  relationships?: IRelationships;
  links?: {
    self: string;
  }
}

export type ICreateResource<TAttributes> = {
  type: string;
  attributes: TAttributes;
  relationships?: IRelationships;
}

export type IUpdateResource<TAttributes> = {
  id: string;
  type: string;
  attributes: TAttributes;
  relationships?: IRelationships;
}

export type IDeleteResource = {
  type: string;
  id: string;
}

